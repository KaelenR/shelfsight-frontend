import { test, expect, USERS, type Role } from './fixtures';

const API = 'http://localhost:3001';

type Case = { role: Role; expected: number };

test.describe('RBAC matrix', () => {
  for (const role of ['admin', 'staff', 'patron'] as const) {
    test(`${role} can reach /auth/me after login`, async ({ request }) => {
      const login = await request.post(`${API}/auth/login`, { data: USERS[role] });
      expect(login.ok()).toBeTruthy();
      const me = await request.get(`${API}/auth/me`);
      expect(me.ok()).toBeTruthy();
      const body = await me.json();
      const user = body.user ?? body.data?.user ?? body.data ?? body;
      expect(user.role).toBe(USERS[role].role);
    });
  }

  test('only ADMIN can list users', async ({ request }) => {
    const cases: Case[] = [
      { role: 'admin', expected: 200 },
      { role: 'staff', expected: 403 },
      { role: 'patron', expected: 403 },
    ];
    for (const { role, expected } of cases) {
      await request.post(`${API}/auth/login`, { data: USERS[role] });
      const res = await request.get(`${API}/users`);
      expect(res.status(), `${role} → GET /users`).toBe(expected);
    }
  });

  test('only ADMIN can create users', async ({ request }) => {
    const payload = () => ({
      name: 'E2E User',
      email: `e2e-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`,
      password: 'password123',
      role: 'PATRON' as const,
    });

    await request.post(`${API}/auth/login`, { data: USERS.patron });
    expect((await request.post(`${API}/users`, { data: payload() })).status()).toBe(403);

    await request.post(`${API}/auth/login`, { data: USERS.staff });
    expect((await request.post(`${API}/users`, { data: payload() })).status()).toBe(403);

    await request.post(`${API}/auth/login`, { data: USERS.admin });
    const okRes = await request.post(`${API}/users`, { data: payload() });
    expect([200, 201]).toContain(okRes.status());
  });

  test('PATRON cannot create books; STAFF and ADMIN can', async ({ request }) => {
    const payload = () => ({
      title: `Role Test ${Date.now()}`,
      author: 'RBAC',
      isbn: `978${String(Date.now()).slice(-10)}`,
    });

    await request.post(`${API}/auth/login`, { data: USERS.patron });
    const patronRes = await request.post(`${API}/books`, { data: payload() });
    expect(patronRes.status()).toBe(403);

    await request.post(`${API}/auth/login`, { data: USERS.staff });
    const staffRes = await request.post(`${API}/books`, { data: payload() });
    expect([200, 201]).toContain(staffRes.status());

    await request.post(`${API}/auth/login`, { data: USERS.admin });
    const adminRes = await request.post(`${API}/books`, { data: payload() });
    expect([200, 201]).toContain(adminRes.status());
  });
});
