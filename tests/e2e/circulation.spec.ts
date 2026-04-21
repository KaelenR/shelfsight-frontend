import { test, expect, USERS } from './fixtures';

const API = 'http://localhost:3001';

test.describe('Circulation — checkout and checkin', () => {
  test.beforeEach(async ({ request }) => {
    const res = await request.post(`${API}/auth/login`, { data: USERS.admin });
    expect(res.ok()).toBeTruthy();
  });

  test('checkout → loan created → checkin → loan closed', async ({ request }) => {
    // Find an available copy.
    const booksRes = await request.get(`${API}/books?limit=25`);
    const booksBody = await booksRes.json();
    const books: Array<{ id: string; copies?: Array<{ id: string; status: string; barcode?: string }> }> =
      booksBody.data ?? booksBody;

    let availableCopyId: string | undefined;
    for (const book of books) {
      const copy = (book.copies ?? []).find((c) => c.status === 'AVAILABLE');
      if (copy) {
        availableCopyId = copy.id;
        break;
      }
    }
    if (!availableCopyId) test.skip(true, 'No AVAILABLE copy in seed data — cannot exercise circulation');

    // Find a patron to check out to.
    const patronsRes = await request.get(`${API}/users?role=PATRON&limit=1`);
    if (!patronsRes.ok()) test.skip(true, 'Could not load patrons');
    const patronsBody = await patronsRes.json();
    const patrons = patronsBody.data ?? patronsBody;
    const patronId = patrons[0]?.id;
    expect(patronId).toBeTruthy();

    // Checkout.
    const checkoutRes = await request.post(`${API}/loans/checkout`, {
      data: { bookCopyId: availableCopyId, userId: patronId },
    });
    expect(checkoutRes.ok(), await checkoutRes.text()).toBeTruthy();
    const checkoutBody = await checkoutRes.json();
    const loan = checkoutBody.data ?? checkoutBody;
    const loanId = loan.id;
    expect(loanId).toBeTruthy();

    // Loan appears in the active list.
    const activeRes = await request.get(`${API}/loans?status=active&limit=100`);
    const activeBody = await activeRes.json();
    const activeLoans: Array<{ id: string }> = activeBody.data ?? activeBody;
    expect(activeLoans.some((l) => l.id === loanId)).toBeTruthy();

    // Checkin.
    const checkinRes = await request.post(`${API}/loans/checkin`, { data: { loanId } });
    expect(checkinRes.ok(), await checkinRes.text()).toBeTruthy();

    // Copy should be AVAILABLE again.
    const reloadBooksRes = await request.get(`${API}/books?limit=25`);
    const reloadBooksBody = await reloadBooksRes.json();
    const reloadedBooks: typeof books = reloadBooksBody.data ?? reloadBooksBody;
    const reloadedCopy = reloadedBooks
      .flatMap((b) => b.copies ?? [])
      .find((c) => c.id === availableCopyId);
    expect(reloadedCopy?.status).toBe('AVAILABLE');
  });
});
