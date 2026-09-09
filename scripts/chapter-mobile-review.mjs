import {webkit} from 'playwright';
const b=await webkit.launch();
const page=await b.newPage();
for(const [width,height] of [[320,568],[390,844],[412,915],[768,1024],[1440,900]]){
 await page.setViewportSize({width,height});await page.goto('http://localhost:3101/#philosophy',{waitUntil:'domcontentloaded'});await page.waitForSelector('[data-chapter-director]');
 for(const id of ['philosophy','collection','ecosystem','membership'])for(const p of [.05,.3,.55,.8]){
 await page.evaluate(({id,p})=>window.dispatchEvent(new CustomEvent('gent-chapter-seek',{detail:{id,p}})),{id,p});
 await page.waitForTimeout(150);
 const bounds=await page.locator(`#${id} .chapter-viewport`).evaluate(e=>({height:innerHeight,overflow:document.documentElement.scrollWidth>innerWidth,parts:[...e.children].filter(x=>/chapter-(heading|subject|narrative|progress|status)/.test(x.className)).map(x=>({name:x.className,y:Math.round(x.getBoundingClientRect().y),bottom:Math.round(x.getBoundingClientRect().bottom)}))}));
 console.log(JSON.stringify({width,id,p,...bounds}));
 if((width===320||width===390)&&p===.3)await page.screenshot({path:`docs/mobile/chapter-${id}-${width}.png`});
 }
}
await b.close();
