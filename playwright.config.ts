import { defineConfig, devices } from '@playwright/test';

/**
 * Task 4 end-to-end tests.
 *
 * Assumes the backend is already running on :3001 (via `npm run dev` in
 * shelfsight-backend). The config boots the Next.js dev server on :3000
 * and runs all specs in tests/e2e/ against it. `globalSetup` resets the
 * database via the backend's POST /__test__/reset helper.
 *
 * Run:
 *   npm run test:e2e          # headless, all specs
 *   npm run test:e2e:ui       # Playwright UI
 */
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 120_000, // Next 16 first-page compile is slow
  expect: { timeout: 10_000 },
  fullyParallel: false, // tests share a single DB; serialize to avoid races
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  globalSetup: './tests/e2e/global-setup.ts',
  use: {
    baseURL: 'http://localhost:3002',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    navigationTimeout: 60_000,
    actionTimeout: 15_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // Next 16's Turbopack OOMs compiling all the routes during an E2E run
    // (https://github.com/vercel/next.js — known issue on Node 23 + larger
    // apps). Force the webpack dev compiler and bump the heap.
    command: 'NODE_OPTIONS="--max-old-space-size=8192" PORT=3002 npx next dev --webpack',
    url: 'http://localhost:3002',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
