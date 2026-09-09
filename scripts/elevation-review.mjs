import {chromium} from '@playwright/test';
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try {
const page=await browser.newPage({viewport:{width:390,height:844}});page.setDefaultTimeout(120000);page.on('pageerror',e=>console.log('ERROR',e.message));await page.goto('http://127.0.0.1:3098');await page.waitForSelector('[data-renderer="webgl"]');await page.evaluate(()=>document.fonts.ready);
for(const width of [390,320,375,430,1440]){await page.setViewportSize({width,height:width===320?568:width===1440?900:844});
for(const p of [0,.035,.095,.27,.55,.71,1]){await page.evaluate(p=>window.dispatchEvent(new CustomEvent('gent-film-seek',{detail:p})),p);await page.waitForTimeout(450);await page.screenshot({path:`docs/elevation/${width}-${p===0?'opening':p}.png`,timeout:120000});}console.log('captured',width);}
} finally {await browser.close();}
