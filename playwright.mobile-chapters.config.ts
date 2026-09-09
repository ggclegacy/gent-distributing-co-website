import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests',testMatch:/mobile-chapters\.spec\.ts/,timeout:90000,expect:{timeout:20000},workers:1,use:{baseURL:'http://localhost:3101',launchOptions:{args:['--use-gl=angle','--use-angle=metal']}},projects:[{name:'webkit',use:{browserName:'webkit'}},{name:'chromium',use:{browserName:'chromium'}}]});
