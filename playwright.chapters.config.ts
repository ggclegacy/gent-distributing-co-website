import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests',testMatch:/chapters\.spec\.ts/,timeout:120000,expect:{timeout:20000},workers:1,use:{baseURL:process.env.PLAYWRIGHT_BASE_URL||'http://127.0.0.1:3099',trace:'retain-on-failure'},projects:[{name:'chromium',use:{browserName:'chromium'}},{name:'webkit',use:{browserName:'webkit'}}]});
