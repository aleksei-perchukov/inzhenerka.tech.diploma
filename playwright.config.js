import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: 'globalSetup.js',
  timeout: process.env.CI ? 40 * 1000 : 60 * 1000,
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  workers: process.env.CI ? 4 : 1,
  run_headless: process.env.HEADLESS,
  reporter: [["line"], ["allure-playwright",
    {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: true,
      environmentInfo: {
        node_version: process.version,
        run_trace: true,
        run_headless: process.env.HEADLESS
      },
    },
  ]
  ],
  use: {
    baseURL: 'https://dev.topklik.online/',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ],
});
