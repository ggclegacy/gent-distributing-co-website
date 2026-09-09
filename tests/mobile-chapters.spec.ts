import {test,expect} from '@playwright/test';
for(const [width,height] of [[320,568],[360,800],[375,812],[390,844],[412,915],[430,932],[768,1024],[1440,900]]){
 test(`chapter frames fit ${width}x${height}`,async({page})=>{
  await page.setViewportSize({width,height});await page.goto('/#philosophy',{waitUntil:'domcontentloaded'});
  await expect(page.locator('[data-chapter-director]')).toHaveCount(1);
  for(const id of ['philosophy','collection','ecosystem','membership'])for(const p of [.05,.3,.55,.8]){
   await page.evaluate(({id,p})=>window.dispatchEvent(new CustomEvent('gent-chapter-seek',{detail:{id,p}})),{id,p});
   const scene=page.locator(`#${id}`);await expect(scene).toHaveAttribute('data-phase',String(Math.floor(p*4)));
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   if(width<700){
    for(const selector of ['.chapter-narrative','.chapter-progress','.chapter-status',...(p===.05?['.chapter-heading']:[])]){
     const box=await scene.locator(selector).boundingBox();expect(box!.x).toBeGreaterThanOrEqual(0);expect(box!.x+box!.width).toBeLessThanOrEqual(width+1);expect(box!.y).toBeGreaterThanOrEqual(56);expect(box!.y+box!.height).toBeLessThanOrEqual(height+1);
    }
    const subject=await scene.locator('.chapter-subject').boundingBox();const card=await scene.locator('.chapter-narrative').boundingBox();expect(subject!.y+subject!.height).toBeLessThanOrEqual(card!.y);
   }
  }
 });
}
test('mobile details, menu and reduced motion remain usable',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/#collection',{waitUntil:'domcontentloaded'});await expect(page.locator('[data-chapter-director]')).toHaveCount(1);
 const scene=page.locator('#collection');await scene.locator('[data-selected="true"] summary').click();await expect(scene.locator('details[open]')).toBeVisible();await scene.locator('details[open] summary').click();
 await scene.getByRole('button',{name:'Explore all categories'}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(scene.getByRole('button',{name:'Explore all categories'})).toBeFocused();
 await page.getByRole('button',{name:'Menu'}).click();await expect(page.getByRole('navigation',{name:'Main navigation'})).toBeVisible();await page.keyboard.press('Escape');
 await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('[data-chapter-director]')).toHaveCount(0);await expect(scene.locator('.chapter-static-records')).toBeVisible();
});
