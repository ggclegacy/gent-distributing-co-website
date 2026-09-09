import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests',testMatch:/(pacing|hero-opening)\.spec\.ts/,workers:1,timeout:90000,expect:{timeout:25000},use:{baseURL:process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3091',viewport:{width:1440,height:900}},projects:[{name:'chromium',use:{browserName:'chromium'}}]});
