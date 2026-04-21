import { test, expect } from './fixtures';

/**
 * KAN-61: search inputs should debounce — typing 10 characters quickly
 * should NOT fire 10 API calls. This test counts the number of requests
 * to /api/books?search=... while typing fast and asserts it stays small.
 * Teammate commit 5e2e41a landed the circulation-side debounce; this is
 * the regression guard for catalog + circulation.
 */
test.describe('Search debouncing — KAN-61', () => {
  test('catalog search does not fire one request per keystroke', async ({ page, request, loginAs }) => {
    await loginAs(page, 'admin');

    const searchRequests: string[] = [];
    page.on('request', (req) => {
      const url = req.url();
      if (url.includes('/books') && url.includes('search=')) {
        searchRequests.push(url);
      }
    });

    await page.goto('/catalog');
    await page.waitForLoadState('networkidle');

    // Clear any calls from the initial fetch.
    searchRequests.length = 0;

    // Find the search input — typical shadcn pattern uses placeholder "Search".
    const searchInput = page.getByPlaceholder(/search/i).first();
    await searchInput.waitFor({ state: 'visible', timeout: 15_000 });

    // Type a 10-char query quickly.
    const query = 'playwrght';
    await searchInput.fill(''); // clear
    for (const ch of query) {
      await searchInput.type(ch, { delay: 40 });
    }

    // Wait longer than the debounce window (300-500ms is typical).
    await page.waitForTimeout(700);

    // With debouncing, we expect <= 3 requests (usually 1).
    // Without debouncing, we'd see one per character (≥9).
    expect(
      searchRequests.length,
      `Expected debounced search to fire few requests; saw ${searchRequests.length}: ${searchRequests.slice(0, 15).join('\n')}`,
    ).toBeLessThanOrEqual(3);
  });
});
