import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testMatch: /(hero-opening|engine|materials|portfolio|cinema)\.spec\.ts/,
  timeout: 120000,
  expect: { timeout: 45000 },
  workers: 1,
  reporter: [
    ["list"],
    [
      "json",
      {
        outputFile:
          process.env.NETWORK_REPORT || "test-results/network-results.json",
      },
    ],
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3077",
    viewport: { width: 1440, height: 900 },
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    {
      name: "webkit",
      testMatch: /(hero-opening|engine)\.spec\.ts/,
      use: { browserName: "webkit" },
    },
  ],
});
