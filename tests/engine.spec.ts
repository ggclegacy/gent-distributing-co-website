import {test,expect} from '@playwright/test';
for(const width of [390,1440]){
 test(`Exchange preserves collection and product navigation at ${width}`,async({page})=>{
  await page.setViewportSize({width,height:900});await page.goto('/');await expect(page.locator('canvas')).toBeVisible();
  await page.getByRole('link',{name:'Go to collection'}).click();
  const tab=page.getByRole('tab',{name:'02 Honey',exact:true});await tab.scrollIntoViewIfNeeded();await tab.click();
  await page.getByRole('link',{name:'Explore honey',exact:true}).click();await expect(page).toHaveURL(/products\/gent-honey/);await expect(page.locator('canvas')).toHaveCount(0);
 });
}
test('reduced motion and no JavaScript retain the campaign and complete document',async({page,browser})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await expect(page.locator('canvas')).toHaveCount(0);await expect(page.locator('.pin-spacer')).toHaveCount(0);
 await expect.poll(()=>page.locator('.exchange-poster img').first().evaluate((el:HTMLImageElement)=>el.naturalWidth)).toBeGreaterThan(0);
 const context=await browser.newContext({javaScriptEnabled:false});const staticPage=await context.newPage();await staticPage.goto('/');
 for(const id of ['hero-title','origins','philosophy','collection','ecosystem','membership','welcome'])await expect(staticPage.locator('#'+id)).toBeVisible();
 await context.close();
});
