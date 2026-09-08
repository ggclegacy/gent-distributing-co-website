import { test, expect } from "@playwright/test";

for (const width of [320,390,768,1024,1440]) {
 test(`engine composition, categories and complete homepage at ${width}px`,async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:900});await page.goto('/');
  await expect(page.locator('.engine-caliber')).toBeVisible();
  await expect(page.locator('#louisiana-silhouette, .engine-orbit, .engine-rotor')).toHaveCount(0);
  await expect(page.locator('.exchange-panel')).toHaveCount(6);
  await expect(page.locator('.engine-product')).toHaveCount(6);
  await expect(page.getByRole('heading',{level:1})).toHaveText('Rooted here.Built to move further.');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:`test-results/engine-${width}.png`});
  await page.locator('.engine-controls summary').click();
  const wellness=page.getByRole('button',{name:'Wellness',exact:true});
  await wellness.focus();await page.keyboard.press('Enter');
  await expect(wellness).toHaveAttribute('aria-expanded','true');
  await expect(page.locator('#engine-category-detail')).toContainText('future direction');
  await expect(page.locator('.exchange-panel[data-selected="true"]')).toHaveAttribute('data-panel','2');
  await page.getByRole('button',{name:'Apparel & goods',exact:true}).click();
  await expect(page.locator('#engine-category-detail')).toContainText('intend to explore');
  await page.getByRole('link',{name:'Go to collection'}).click();
  // On phones the physical archive establishes the scene before its controls.
  if (width < 1000) {
   await expect(page.locator('#collection')).toBeInViewport();
   await page.waitForFunction(()=>Math.abs(document.querySelector('#collection')!.getBoundingClientRect().top) < 150);
   await page.getByRole('tab',{name:'01 Coffee'}).scrollIntoViewIfNeeded();
  }
  await expect(page.getByRole('tab',{name:'01 Coffee'})).toBeInViewport();
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  for(const id of ['philosophy','collection','ecosystem','membership','welcome']) {
   await page.locator('#'+id).scrollIntoViewIfNeeded();
   await expect(page.locator('#'+id)).toBeInViewport();
   await page.screenshot({path:`test-results/engine-${width}-${id}.png`});
  }
  expect(errors).toEqual([]);
 });
}

test('opening ignition, unlock and distribution reveal in order, then reverse',async({page})=>{
 await page.goto('/');await expect(page.locator('[data-cinema]')).toHaveAttribute('data-cinema-ready','desktop');
 const panel=page.locator('.exchange-panel').first();
 const initialPanel=await panel.evaluate(el=>getComputedStyle(el).transform);
 const route=page.locator('.engine-paths path').first();
 await expect(route).toHaveCSS('stroke-dashoffset','1px');
 // Desktop maps each authored timeline unit to 0.85 viewport heights.
 const seek = async (time:number) => page.evaluate(t=>scrollTo({top:t*innerHeight*.85,behavior:'instant'}),time);
 await seek(.8);
 await expect(page.locator('.hero-copy')).toHaveCSS('opacity','1');
 await expect(route).toHaveCSS('stroke-dashoffset','1px');
 await seek(3);
 await expect(page.locator('.hero-copy')).toHaveCSS('opacity','0');
 await expect.poll(()=>panel.evaluate(el=>getComputedStyle(el).transform)).not.toBe(initialPanel);
 await page.screenshot({path:'test-results/engine-selected.png'});
 await seek(7.2);
 await expect.poll(()=>route.evaluate(el=>parseFloat(getComputedStyle(el).strokeDashoffset))).toBeLessThan(.1);
 await expect.poll(()=>page.locator('.engine-expansion').evaluate(el=>+getComputedStyle(el).opacity)).toBeGreaterThan(.3);
 await page.screenshot({path:'test-results/engine-further.png'});
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
 await expect(page.locator('.hero-copy')).toHaveCSS('opacity','1');await expect(route).toHaveCSS('stroke-dashoffset','1px');
 await page.locator('.cinema-tools .motion-control').click();
 await expect(route).toHaveCSS('stroke-dashoffset','0px');
 await expect(page.locator('.engine-flow-story')).toBeVisible();
});

test('static sculpture and full narrative survive unavailable JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto('/');
 await expect(page.locator('.engine-caliber')).toBeVisible();await expect(page.locator('.engine-flow-story')).toBeVisible();
 await expect(page.locator('.engine-origin')).toBeVisible();await expect(page.locator('.engine-paths path').first()).toHaveCSS('stroke-dashoffset','0px');
 await page.getByRole('link',{name:'Explore the collection',exact:true}).first().click();await expect(page.locator('#collection')).toBeInViewport();await context.close();
});

test('opening holds its pose, the first scroll wakes the camera, and reverse restores it', async ({page}) => {
 await page.goto('/');
 await expect(page.locator('[data-cinema]')).toHaveAttribute('data-cinema-ready','desktop');
 const read = () => page.evaluate(() => ({
  camera: Array.from(new DOMMatrix(getComputedStyle(document.querySelector('.engine-tilt')!).transform).toFloat64Array(), n => Number(n.toFixed(3)) || 0),
  panel: Array.from(new DOMMatrix(getComputedStyle(document.querySelector('.exchange-panel')!).transform).toFloat64Array(), n => Number(n.toFixed(3)) || 0),
 }));
 const still = await read();
 await page.waitForTimeout(600);
 expect(await read()).toEqual(still);
 await page.mouse.move(1050,350);
 expect(await read()).toEqual(still);
 await page.evaluate(()=>scrollTo({top:80,behavior:'instant'}));
 await expect.poll(async()=>(await read()).camera).not.toEqual(still.camera);
 expect((await read()).panel).toEqual(still.panel);
 await page.screenshot({path:'test-results/exchange-first-scroll.png'});
 await page.evaluate(()=>scrollTo({top:1150,behavior:'instant'}));
 await expect.poll(async()=>(await read()).camera).not.toEqual(still.camera);
 await page.screenshot({path:'test-results/exchange-camera-bank.png'});
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
 await expect.poll(read).toEqual(still);
});
