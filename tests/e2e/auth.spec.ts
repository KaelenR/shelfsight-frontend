import { test, expect, USERS } from './fixtures';

const API = 'http://localhost:3001';

test.describe('Authentication', () => {
  test('POST /auth/login with valid credentials sets a cookie', async ({ request }) => {
    const res = await request.post(`${API}/auth/login`, { data: USERS.admin });
    expect(res.ok()).toBeTruthy();
    expect(res.headers()['set-cookie']).toMatch(/token=/);
    const body = await res.json();
    expect(body.user?.email ?? body.data?.user?.email).toBe(USERS.admin.email);
  });

  test('POST /auth/login with wrong password rejects with 401', async ({ request }) => {
    const res = await request.post(`${API}/auth/login`, {
      data: { email: USERS.admin.email, password: 'wrong-password' },
    });
    expect(res.status()).toBe(401);
  });

  test('GET /auth/me requires authentication', async ({ request }) => {
    const res = await request.get(`${API}/auth/me`);
    expect(res.status()).toBe(401);
  });

  test('GET /auth/me returns the current user while authenticated', async ({ request, context, loginAs, page }) => {
    await loginAs(page, 'staff');
    const cookieHeader = (await context.cookies()).map((c) => `${c.name}=${c.value}`).join('; ');
    const res = await request.get(`${API}/auth/me`, { headers: { cookie: cookieHeader } });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    const user = body.user ?? body.data?.user ?? body.data ?? body;
    expect(user.email).toBe(USERS.staff.email);
    expect(user.role).toBe('STAFF');
  });

  test('POST /auth/logout ends the session', async ({ request, context, loginAs, page }) => {
    await loginAs(page, 'admin');
    const cookieHeader = (await context.cookies()).map((c) => `${c.name}=${c.value}`).join('; ');
    const logoutRes = await request.post(`${API}/auth/logout`, { headers: { cookie: cookieHeader } });
    expect(logoutRes.ok()).toBeTruthy();
    const meRes = await request.get(`${API}/auth/me`);
    expect(meRes.status()).toBe(401);
  });

  test('login page renders and the form submits successfully', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText(/welcome back/i)).toBeVisible({ timeout: 15_000 });
    await page.fill('#email', USERS.admin.email);
    await page.fill('#password', USERS.admin.password);
    await page.getByRole('button', { name: /sign in/i }).click();
    // First-hit dashboard compile with webpack dev can take 30-60s; the API
    // auth already asserts the backend side, so this test is only verifying
    // the UI navigation completes eventually.
    await page.waitForURL('**/dashboard', { timeout: 75_000 });
    await expect(page).toHaveURL(/\/dashboard$/);
  });

  test('invalid credentials surface an inline error on the login page', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText(/welcome back/i)).toBeVisible({ timeout: 15_000 });
    await page.fill('#email', USERS.admin.email);
    await page.fill('#password', 'wrong-password');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page.getByText(/invalid email or password/i)).toBeVisible({ timeout: 15_000 });
  });

  test('hitting a dashboard route without a cookie redirects to the login page', async ({ browser }) => {
    const context = await browser.newContext(); // fresh context — no cookies
    const page = await context.newPage();
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForURL((url) => url.pathname === '/' || url.pathname === '', { timeout: 15_000 });
    await expect(page).toHaveURL(/\/$/);
    await context.close();
  });
});
