import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
const baseURL = `http://localhost:${PORT}`;
const CI = !!process.env.CI;

/*
 * Every journey in e2e/ runs in both projects: a desktop viewport and an
 * iPhone (390px wide, below the 768px breakpoint, so the mobile layout).
 *
 * The web server is the production build. CI builds in an earlier step and only
 * starts it here; locally the config builds first. If a server is already
 * listening on :3000 (for example `npm run dev`) it is reused instead.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  // One worker locally: against a reused `npm run dev` server, two parallel
  // WebKit workers time out while routes compile.
  workers: CI ? undefined : 1,
  reporter: CI ? [["github"], ["html", { open: "never" }]] : [["list"], ["html", { open: "never" }]],
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
    {
      name: "phone-webkit",
      use: { ...devices["iPhone 14"] },
    },
  ],
  webServer: {
    command: CI ? `npm run start -- --port ${PORT}` : `npm run build && npm run start -- --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !CI,
    timeout: 300_000,
  },
});
