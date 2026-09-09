import {test,expect} from '@playwright/test';
const heroSelector='.network-entrance';
test('complete product story, pause ownership, final hold and entry',async({page})=>{
 test.setTimeout(150000);
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');const hero=page.locator(heroSelector);
 await expect(hero).toHaveAttribute('data-renderer','webgl',{timeout:60000});
 await expect(page.locator('.story-good img')).toHaveCount(3);
 expect(await page.locator('.story-good img').evaluateAll(imgs=>imgs.every(i=>(i as HTMLImageElement).complete && (i as HTMLImageElement).naturalWidth>100))).toBe(true);
 await page.evaluate(()=>{
  const el=document.querySelector<HTMLElement>('.network-entrance')!;
  const record:{beats:string[],entryDuringHold?:boolean}={beats:[]};
  (window as unknown as {storyRecord:typeof record}).storyRecord=record;
  new MutationObserver(()=>{
   if(el.dataset.beat && !record.beats.includes(el.dataset.beat)) record.beats.push(el.dataset.beat);
   if(el.dataset.progress==='1.0000' && record.entryDuringHold===undefined) record.entryDuringHold=!document.querySelector<HTMLAnchorElement>('.network-explore')!.hidden;
  }).observe(el,{attributes:true});
 });
 await page.getByRole('button',{name:'ACTIVATE THE NETWORK'}).click();
 await page.getByRole('button',{name:'PAUSE FILM'}).click();
 const paused=await hero.getAttribute('data-progress');
 await page.waitForTimeout(1000);expect(await hero.getAttribute('data-progress')).toBe(paused);
 // Visibility may not resume an explicitly paused film.
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'));});
 await page.waitForTimeout(500);expect(await hero.getAttribute('data-progress')).toBe(paused);
 await page.getByRole('button',{name:'RESUME FILM'}).click();
 await expect(hero).toHaveAttribute('data-state','EXPLORE',{timeout:75000});
 const record=await page.evaluate(()=>(window as unknown as {storyRecord:{beats:string[],entryDuringHold:boolean}}).storyRecord);
 expect(record.beats).toEqual(expect.arrayContaining(['origin','discovery','development','the gent standard','the collection','distribution','arrival','gent']));
 expect(record.entryDuringHold).toBe(false);
 const hold=await page.evaluate(()=>performance.getEntriesByName('gent:intro-complete').at(-1)!.startTime-performance.getEntriesByName('gent:hero-hold').at(-1)!.startTime);
 expect(hold).toBeGreaterThan(1900);expect(hold).toBeLessThan(5000);
 await expect(page.getByRole('heading',{name:'LOUISIANA BORN. BUILT TO MOVE FURTHER.'})).toBeVisible();
 await page.screenshot({path:'docs/story-film/verified-desktop.png'});
 await page.getByRole('link',{name:'ENTER GENT RESERVE CO.'}).click();await expect(page.locator('#philosophy')).toBeInViewport();
 expect(errors).toEqual([]);
});
test('phone replay, skip, reduced motion and final product layout',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');const hero=page.locator(heroSelector);
 await expect(hero).toHaveAttribute('data-renderer','webgl',{timeout:60000});
 await page.getByRole('button',{name:'ACTIVATE THE NETWORK'}).click();await page.keyboard.press('Escape');
 await expect(page.getByRole('link',{name:'ENTER GENT RESERVE CO.'})).toBeFocused();
 await page.getByRole('button',{name:'REPLAY NETWORK'}).click();await expect(hero).toHaveAttribute('data-state','PLAYING');
 await page.emulateMedia({reducedMotion:'reduce'});await expect(hero).toHaveAttribute('data-state','EXPLORE');await expect(page.locator('canvas')).toHaveCount(0);
 expect(await page.evaluate(()=>document.body.style.position)).toBe('');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await expect(page.locator('.story-products')).toHaveCSS('opacity','1');
 await page.screenshot({path:'docs/story-film/verified-mobile-reduced.png'});
 await page.getByRole('link',{name:'ENTER GENT RESERVE CO.'}).click();await expect(page.locator('#philosophy')).toBeInViewport();
});
test('direct entry and no-JavaScript retain the site',async({browser,baseURL})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto(baseURL!);await page.getByRole('link',{name:'EXPLORE GENT',exact:false}).click();await expect(page).toHaveURL(/#philosophy/);await context.close();
 const live=await browser.newPage();await live.goto(`${baseURL}/#collection`);await expect(live.locator(heroSelector)).toHaveAttribute('data-state','EXPLORE');await expect(live.locator('#collection')).toBeInViewport();await live.close();
});
