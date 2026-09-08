import {test,expect} from '@playwright/test';
test.setTimeout(180000);
for(const [width,height] of [[320,568],[390,844],[430,932],[768,1024],[1440,900]]){
 test(`Exchange framing, reversible film and motion cleanup at ${width}`,async({page})=>{
  await page.setViewportSize({width,height});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');await expect(page.locator('.exchange-film')).toHaveAttribute('data-renderer','webgl');
  await expect(page.locator('canvas')).toBeVisible();
  const pinned=height>=600||height>width;await expect(page.locator('.pin-spacer')).toHaveCount(pinned?1:0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  if(pinned){
   const runway=width<1000?height*9:height*12*.85;
   for(const [p,beat] of [[.12,'recognition'],[.24,'precision'],[.34,'discovery'],[.43,'discovery'],[.52,'discovery'],[.6,'network'],[.68,'collection'],[.79,'reassembly'],[.89,'campaign']] as const){
    await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),runway*p);
    await expect(page.locator('.exchange-film')).toHaveAttribute('data-beat',beat);
    await expect.poll(()=>page.locator('.exchange-film').evaluate(el=>Number((el as HTMLElement).dataset.progress))).toBeGreaterThan(p-.005);
   }
   const copy=await page.locator('.hero-copy').boundingBox();expect(copy!.x).toBeGreaterThanOrEqual(0);expect(copy!.x+copy!.width).toBeLessThanOrEqual(width+1);
   await expect(page.locator('#hero-title')).toBeVisible();
   await page.screenshot({path:`test-results/exchange-campaign-${width}.png`});
   await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await expect(page.locator('.exchange-film')).toHaveAttribute('data-progress','0.0000');
  }
  await page.locator('.cinema-tools .motion-control').click();await expect(page.locator('canvas')).toHaveCount(0);await expect(page.locator('.pin-spacer')).toHaveCount(0);
  await expect(page.locator('#hero-title')).toBeVisible();await expect(page.locator('[inert]')).toHaveCount(0);
  await page.reload();await expect(page.locator('canvas')).toHaveCount(0);expect(errors).toEqual([]);
 });
}
test('orientation changes cleanly rebuild the single pin',async({page})=>{
 await page.goto('/');await expect(page.locator('.pin-spacer')).toHaveCount(1);
 for(const [width,height,pins] of [[390,844,1],[844,390,0],[1440,900,1]]){
  await page.setViewportSize({width,height});await expect(page.locator('.pin-spacer')).toHaveCount(pins);
 }
 await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('canvas')).toHaveCount(0);await expect(page.locator('.pin-spacer')).toHaveCount(0);
});
test('portal opens into the next scene and reverses without a blank stage',async({page})=>{
 await page.goto('/');await expect(page.locator('.pin-spacer')).toHaveCount(1);
 await page.evaluate(()=>scrollTo({top:12*900*.85*1.045,behavior:'instant'}));
 await expect(page.locator('#philosophy')).toHaveCSS('visibility','visible');await expect(page.locator('#philosophy .environment-image')).toBeVisible();
 await page.evaluate(()=>scrollTo({top:12*900*.85*.89,behavior:'instant'}));await expect(page.locator('.exchange-film')).toHaveAttribute('data-beat','campaign');
});
test('portrait portal hands off at the same viewport without repeating the room',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await expect(page.locator('.pin-spacer')).toHaveCount(1);
 await page.evaluate(()=>scrollTo({top:9*844,behavior:'instant'}));
 await expect(page.locator('.hero')).toHaveCSS('visibility','hidden');
 const box=await page.locator('#philosophy').boundingBox();expect(Math.abs(box!.y)).toBeLessThan(3);
 await page.evaluate(()=>scrollTo({top:9*844*.89,behavior:'instant'}));await expect(page.locator('.hero')).toHaveCSS('visibility','visible');
 await expect(page.locator('.exchange-film')).toHaveAttribute('data-beat','campaign');
});
