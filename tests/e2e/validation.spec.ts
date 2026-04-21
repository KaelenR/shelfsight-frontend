import { test, expect, USERS } from './fixtures';

const API = 'http://localhost:3001';

/**
 * KAN-59: every mutating endpoint should reject invalid input with a 400
 * and a structured error body. Pre-fix many of these may 500 or silently
 * succeed; the assertions below codify post-fix expectations.
 */
test.describe('Input validation — KAN-59', () => {
  test.beforeEach(async ({ request }) => {
    const res = await request.post(`${API}/auth/login`, { data: USERS.admin });
    expect(res.ok()).toBeTruthy();
  });

  test('POST /books rejects missing required fields', async ({ request }) => {
    const res = await request.post(`${API}/books`, { data: {} });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error?.code).toBeTruthy();
  });

  test('POST /books rejects malformed ISBN', async ({ request }) => {
    const res = await request.post(`${API}/books`, {
      data: { title: 'T', author: 'A', isbn: 'not-an-isbn' },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error?.code).toBeTruthy();
  });

  test('POST /users rejects malformed email', async ({ request }) => {
    const res = await request.post(`${API}/users`, {
      data: { name: 'X', email: 'not-an-email', password: 'password123', role: 'PATRON' },
    });
    expect(res.status()).toBe(400);
  });

  test('POST /users rejects too-short password', async ({ request }) => {
    const res = await request.post(`${API}/users`, {
      data: { name: 'X', email: `v-${Date.now()}@example.com`, password: 'x', role: 'PATRON' },
    });
    expect(res.status()).toBe(400);
  });

  test('POST /loans/checkout rejects missing bookCopyId', async ({ request }) => {
    const res = await request.post(`${API}/loans/checkout`, { data: {} });
    expect(res.status()).toBe(400);
  });

  test('POST /loans/checkin rejects missing loanId', async ({ request }) => {
    const res = await request.post(`${API}/loans/checkin`, { data: {} });
    expect(res.status()).toBe(400);
  });
});
