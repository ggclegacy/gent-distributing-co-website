import {webkit} from '@playwright/test';
const browser=await webkit.launch();
try {
 const page=await browser.newPage();
 await page.goto(`${process.env.PLAYWRIGHT_BASE_URL||'http://127.0.0.1:3099'}/#philosophy`,{waitUntil:'domcontentloaded'});
 await page.waitForSelector('[data-chapter-director]');
 for(const [width,height,id,p] of [[320,568,'collection',.55],[390,844,'collection',.55],[390,844,'ecosystem',.55],[390,844,'membership',.9],[1440,900,'philosophy',.9],[1440,900,'ecosystem',.55]]){
  await page.setViewportSize({width,height});await page.waitForTimeout(500);
  await page.evaluate(({id,p})=>window.dispatchEvent(new CustomEvent('gent-chapter-seek',{detail:{id,p}})),{id,p});
  await page.waitForTimeout(700);await page.screenshot({path:`docs/chapters/final-${width}-${id}.png`});
 }
}finally{await browser.close();}
