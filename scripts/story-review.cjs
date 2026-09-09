/* eslint-disable @typescript-eslint/no-require-imports -- Browser review harness. */
const {chromium}=require('@playwright/test');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:900}});
 const page=await context.newPage(); const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3093',{timeout:90000});await page.locator('[data-renderer=webgl]').waitFor({timeout:60000});
 console.log('Loaded',await page.title());
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:width===1440?900:844});
  for(const [name,p] of [['discover',.20],['develop',.32],['reveal',.595],['distribute',.755],['arrival',.845],['brand',1]]){
   await page.evaluate(p=>window.dispatchEvent(new CustomEvent('gent-film-seek',{detail:p})),p);
   await page.waitForTimeout(700);
   await page.screenshot({path:`${__dirname}/../docs/story-film/${name}-${width}.png`});
   console.log(name,width);
  }
 }
 console.log({errors});await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
