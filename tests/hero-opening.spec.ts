import { test, expect } from '@playwright/test';

for (const [width,height] of [[320,568],[375,667],[390,844],[430,932],[768,1024],[1024,768],[1440,900]]) {
 test(`emblem leads the first frame with clear controls at ${width}x${height}`,async({page})=>{
  await page.setViewportSize({width,height});await page.goto('/');
  await expect(page.locator('[data-cinema]')).toHaveAttribute(width>=1000 && height>=700 ? 'data-cinema-ready' : 'data-native-cinema',width>=1000 && height>=700 ? 'desktop' : 'true');
  await expect(page.locator('.engine-caliber')).toBeInViewport();
  const composition=await page.evaluate(()=>{
   const icon=document.querySelector('.exchange-aperture')!.getBoundingClientRect();
   const assembly=document.querySelector('.engine-assembly')!.getBoundingClientRect();
   const copy=document.querySelector('.hero-copy')!.getBoundingClientRect();
   const header=document.querySelector('header')!.getBoundingClientRect();
   return {center:assembly.x+assembly.width/2,top:assembly.top,bottom:assembly.bottom,copyTop:copy.top,headerBottom:header.bottom,iconBottom:icon.bottom,overflow:document.documentElement.scrollWidth>innerWidth};
  });
  expect(Math.abs(composition.center-width/2)).toBeLessThan(20);
  expect(composition.top).toBeGreaterThan(composition.headerBottom);
  expect(composition.iconBottom).toBeLessThan(height);
  expect(composition.copyTop).toBeGreaterThan(composition.iconBottom);
  expect(composition.overflow).toBe(false);
  await page.locator('.engine-controls summary').focus();await page.keyboard.press('Enter');
  await page.getByRole('button',{name:'Wellness',exact:true}).click();
  await expect(page.locator('#engine-category-detail')).toContainText('future direction');
 });
}

test('portrait opening pins for a complete extended reveal, reverses, and releases cleanly',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 await expect(page.locator('.pin-spacer')).toHaveCount(1);
 const runway=await page.locator('.pin-spacer').evaluate(el=>el.getBoundingClientRect().height-innerHeight);
 expect(runway/844).toBeGreaterThan(6);expect(runway/844).toBeLessThan(8);
 const panel=page.locator('.exchange-panel').first();
 // WebKit exposes GSAP's SVG movement on the transform attribute, while its
 // computed CSS transform may remain 'none'. Inspect the SVG matrix itself.
 const pose=()=>panel.evaluate(el=>{
  const m=(el as SVGGraphicsElement).transform.baseVal.consolidate()?.matrix;
  return m ? [m.a,m.b,m.c,m.d,m.e,m.f].map(n=>Math.round(n*1000)/1000) : [1,0,0,1,0,0];
 });
 const initial=await pose();
 await page.evaluate(()=>scrollTo({top:2200,behavior:'instant'}));
 await expect.poll(pose).not.toEqual(initial);
 await expect.poll(()=>page.locator('.hero').evaluate(el=>Math.abs(el.getBoundingClientRect().top))).toBeLessThan(2);
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
 await expect.poll(pose).toEqual(initial);
 await page.locator('.hero-actions').getByRole('link',{name:'Follow our roots'}).click();
 await expect(page.locator('#origin-title')).toBeInViewport();
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.pin-spacer')).toHaveCount(0);
 await expect(page.locator('.engine-atmosphere')).toHaveCSS('animation-name','none');
 await expect(page.locator('[inert]')).toHaveCount(0);
});

test('resizing across the pinning breakpoint does not retain stale pins',async({page})=>{
 await page.goto('/');await expect(page.locator('[data-cinema]')).toHaveAttribute('data-cinema-ready','desktop');
 await page.setViewportSize({width:390,height:844});await expect(page.locator('[data-cinema]')).not.toHaveAttribute('data-cinema-ready');
 await expect(page.locator('.pin-spacer')).toHaveCount(1);
 await page.setViewportSize({width:844,height:390});await expect(page.locator('.pin-spacer')).toHaveCount(0);
 await page.setViewportSize({width:1440,height:900});await expect(page.locator('[data-cinema]')).toHaveAttribute('data-cinema-ready','desktop');
 await expect(page.locator('.pin-spacer')).toHaveCount(1);
});

for (const width of [390,1440]) {
 test(`all category objects emerge before the handoff and rewind at ${width}`,async({page})=>{
  await page.setViewportSize({width,height:900});await page.goto('/');
  await expect(page.locator('.pin-spacer')).toHaveCount(1);
  const products=page.locator('.exchange-released-product');
  await expect(products).toHaveCount(6);
  await expect(products.first()).toHaveCSS('opacity','0');
  const runway=width<1000 ? await page.locator('.pin-spacer').evaluate(el=>el.getBoundingClientRect().height-innerHeight) : 8.45*900*.85;
  await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),runway*.86);
  for (const product of await products.all()) {
   await expect(product).toHaveCSS('opacity','1');
   const box=await product.boundingBox();
   expect(box!.x).toBeGreaterThan(0);expect(box!.x+box!.width).toBeLessThan(width);
   expect(box!.y).toBeGreaterThan(88);expect(box!.y+box!.height).toBeLessThan(900);
  }
  await expect.poll(()=>page.locator('.hero').evaluate(el=>Math.abs(el.getBoundingClientRect().top))).toBeLessThan(2);
  if(width>=1000) await expect(page.locator('[data-cinema]')).toHaveAttribute('data-active-scene','0');
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  for (const product of await products.all()) await expect(product).toHaveCSS('opacity','0');
  await expect(page.locator('.hero-copy')).toHaveCSS('opacity','1');
 });
}
