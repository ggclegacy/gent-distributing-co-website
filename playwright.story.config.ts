import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir: './tests', testMatch: /materials\.spec\.ts/, timeout: 60000,
 expect: { timeout: 15000 }, workers: 2,
 use: { baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3250', viewport: { width: 1440, height: 900 }, trace: 'retain-on-failure' },
 projects: [{ name: 'chromium', use: { browserName: 'chromium' } }, { name: 'webkit', use: { browserName: 'webkit' } }],
});
