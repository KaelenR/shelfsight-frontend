/**
 * Runs once before every Playwright run. Resets the backend DB to the
 * canonical seeded state so specs never leak mutations into each other.
 * The /__test__/reset route is only mounted when NODE_ENV !== 'production'.
 */
export default async function globalSetup() {
  const res = await fetch('http://localhost:3001/__test__/reset', { method: 'POST' });
  if (!res.ok) {
    throw new Error(`DB reset failed: ${res.status} ${await res.text()}`);
  }
}
