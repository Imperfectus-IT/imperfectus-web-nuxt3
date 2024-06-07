import { defineConfig, devices } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'

const devicesToTest = [
  'Desktop Chrome',
  'Mobile Chrome',
] satisfies Array<string | typeof devices[string]>

/* See https://playwright.dev/docs/test-configuration. */
export default defineConfig<ConfigOptions>({
  testDir: './tests/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

    actionTimeout: 0,
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'on',
    // if true then the browser will be launched in headless mode. Defaults to true unless the devtools option is true.
    headless: true,
  },
  projects: devicesToTest.map(p => typeof p === 'string' ? ({ name: p, use: devices[p] }) : p),
  webServer: {
    command: 'npm run dev',
    port: 3001,
  },
})
