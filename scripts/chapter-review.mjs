import {chromium} from '@playwright/test';
const b=await chromium.launch({headless:true});
try {const p=await b.newPage();p.setDefaultTimeout(60000);p.on('pageerror',e=>console.log('ERROR',e.message));await p.goto(`${process.env.PLAYWRIGHT_BASE_URL||'http://127.0.0.1:3099'}/#philosophy`,{timeout:90000});await p.waitForSelector('[data-chapter-director]');
for(const width of [1440,390,320]){await p.setViewportSize({width,height:width===320?568:width===1440?900:844});await p.waitForTimeout(600);
for(const id of ['philosophy','collection','ecosystem','membership','welcome']){for(const progress of [.05,.55,.9]){await p.evaluate(({id,progress})=>window.dispatchEvent(new CustomEvent('gent-chapter-seek',{detail:{id,p:progress}})),{id,progress});await p.waitForTimeout(500);await p.screenshot({path:`docs/chapters/${width}-${id}-${progress}.png`});}console.log('captured',width,id);}}
}finally{await b.close();}
