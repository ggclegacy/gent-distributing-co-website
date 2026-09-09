import {webkit} from '@playwright/test';
const browser=await webkit.launch();
try {
 const page=await browser.newPage({viewport:{width:390,height:844}});
 page.setDefaultTimeout(60000);
 await page.goto('http://127.0.0.1:3101');await page.waitForSelector('[data-renderer="webgl"]');
 await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:'docs/mobile/entry-390.png'});
 await page.getByRole('button',{name:'ENTER THE EXPERIENCE'}).click();await page.getByRole('button',{name:'PAUSE FILM'}).click();
 for (const [width,height] of [[390,844],[320,568]]) {
  await page.setViewportSize({width,height});
  for (const p of [.035,.18,.27,.55,.71,.83,.96]) {
   await page.evaluate(p=>window.dispatchEvent(new CustomEvent('gent-film-seek',{detail:p})),p);await page.waitForTimeout(700);
   await page.screenshot({path:`docs/mobile/review-${width}-${p}.png`});
  }
  console.log('Captured',width);
 }
} finally {await browser.close()}
