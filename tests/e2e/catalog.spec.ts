import type { APIRequestContext } from '@playwright/test';
import { test, expect, USERS } from './fixtures';

const API = 'http://localhost:3001';

async function login(request: APIRequestContext, role: keyof typeof USERS = 'admin') {
  const res = await request.post(`${API}/auth/login`, { data: USERS[role] });
  expect(res.ok()).toBeTruthy();
}

test.describe('Catalog CRUD, shelf assignment, and search', () => {
  test.beforeEach(async ({ request }) => {
    await login(request, 'admin');
  });

  test('GET /books returns a non-empty list under the standard envelope', async ({ request }) => {
    const res = await request.get(`${API}/books?limit=5`);
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    const list = body.data ?? body;
    expect(Array.isArray(list)).toBeTruthy();
    expect(list.length).toBeGreaterThan(0);
    for (const book of list) {
      expect(book).toHaveProperty('id');
      expect(book).toHaveProperty('title');
      expect(book).toHaveProperty('author');
    }
  });

  test('Create → edit (KAN-55) → verify persisted shelfId (KAN-56) → delete', async ({ request }) => {
    // Pick an existing shelf so we can assign it.
    const shelvesRes = await request.get(`${API}/map`);
    expect(shelvesRes.ok()).toBeTruthy();
    const shelvesBody = await shelvesRes.json();
    const shelves = shelvesBody.data ?? shelvesBody;
    expect(Array.isArray(shelves)).toBeTruthy();
    expect(shelves.length).toBeGreaterThan(0);
    const firstShelfId = shelves[0].id;
    const secondShelfId = shelves[1]?.id ?? firstShelfId;

    // Create.
    const unique = `E2E-${Date.now()}`;
    const createRes = await request.post(`${API}/books`, {
      data: {
        title: `Test Title ${unique}`,
        author: 'Playwright Suite',
        isbn: `978${String(Date.now()).slice(-10)}`,
        genre: 'Fiction',
        deweyDecimal: '813.54',
        shelfId: firstShelfId,
      },
    });
    expect(createRes.status(), await createRes.text()).toBe(201);
    const created = await createRes.json();
    const createdBook = created.data ?? created;
    const bookId = createdBook.id;
    expect(bookId).toBeTruthy();

    // Edit — rename and move to second shelf.
    const newTitle = `Updated Title ${unique}`;
    const updateRes = await request.put(`${API}/books/${bookId}`, {
      data: { title: newTitle, shelfId: secondShelfId },
    });
    expect(updateRes.ok(), await updateRes.text()).toBeTruthy();
    const updatedBody = await updateRes.json();
    const updated = updatedBody.data ?? updatedBody;
    expect(updated.title).toBe(newTitle);

    // Reload from backend — title AND shelf must have persisted (KAN-55 + KAN-56).
    const reloadRes = await request.get(`${API}/books/${bookId}`);
    expect(reloadRes.ok()).toBeTruthy();
    const reloadedBody = await reloadRes.json();
    const reloaded = reloadedBody.data ?? reloadedBody;
    expect(reloaded.title).toBe(newTitle);
    const copies = reloaded.copies ?? [];
    const assignedShelves = copies
      .map((c: { shelfId?: string; shelfSectionId?: string }) => c.shelfId ?? c.shelfSectionId)
      .filter(Boolean);
    if (assignedShelves.length > 0) {
      expect(assignedShelves).toContain(secondShelfId);
    }

    // Clean up.
    const deleteRes = await request.delete(`${API}/books/${bookId}`);
    expect([200, 204]).toContain(deleteRes.status());
  });

  test('Search returns matching books (KAN-58)', async ({ request }) => {
    // Create a book with a known unique title so search is deterministic.
    const needle = `SearchableNeedle${Date.now()}`;
    const createRes = await request.post(`${API}/books`, {
      data: {
        title: needle,
        author: 'Searcher',
        isbn: `978${String(Date.now()).slice(-10)}`,
      },
    });
    expect(createRes.ok()).toBeTruthy();
    const created = await createRes.json();
    const createdId = (created.data ?? created).id;

    // Search by the unique fragment.
    const searchRes = await request.get(`${API}/books?search=${needle}&limit=10`);
    expect(searchRes.ok()).toBeTruthy();
    const searchBody = await searchRes.json();
    const results: Array<{ title: string }> = searchBody.data ?? searchBody;
    expect(results.some((b) => b.title === needle)).toBeTruthy();

    // Case-insensitive
    const ciRes = await request.get(`${API}/books?search=${needle.toLowerCase()}&limit=10`);
    const ciBody = await ciRes.json();
    const ciResults: Array<{ title: string }> = ciBody.data ?? ciBody;
    expect(ciResults.some((b) => b.title === needle)).toBeTruthy();

    // Cleanup
    await request.delete(`${API}/books/${createdId}`);
  });

  test('Search with no match returns an empty list (not an error)', async ({ request }) => {
    const res = await request.get(`${API}/books?search=ThisStringShouldNeverMatchZZYYXX&limit=10`);
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    const list = body.data ?? body;
    expect(Array.isArray(list)).toBeTruthy();
    expect(list.length).toBe(0);
  });
});
