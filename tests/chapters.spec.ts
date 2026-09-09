import {test,expect,type Page} from '@playwright/test';
const ids=['philosophy','collection','ecosystem','membership','welcome'];
async function seek(page:Page,id:string,p:number){await page.evaluate(({id,p})=>window.dispatchEvent(new CustomEvent('gent-chapter-seek',{detail:{id,p}})),{id,p});await expect.poll(()=>page.locator(`#${id}`).getAttribute('data-progress')).toBe(p.toFixed(4));}
for(const width of [320,375,390,430,768,1440])test(`chapters remain readable and reversible at ${width}`,async({page})=>{
 await page.setViewportSize({width,height:width===320?568:width===1440?900:844});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#philosophy');await expect(page.locator('[data-chapter-director]')).toHaveCount(1);
 for(const id of ids){
  for(const p of [.05,.55,.90,.05]){await seek(page,id,p);const chapter=page.locator(`#${id}`);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await expect(chapter.locator('.chapter-viewport')).toBeInViewport();
   if(id!=='welcome'){await expect(chapter).toHaveAttribute('data-phase',String(Math.min(3,Math.floor(p*4))));const bounds=await chapter.locator('.chapter-narrative').boundingBox();expect(bounds!.x).toBeGreaterThanOrEqual(0);expect(bounds!.x+bounds!.width).toBeLessThanOrEqual(width+1);expect(bounds!.y).toBeGreaterThanOrEqual(120);expect(bounds!.y+bounds!.height).toBeLessThanOrEqual((width===320?568:width===1440?900:844)-40);}
  }
 }
 expect(errors).toEqual([]);
});
test('chapter controls seek scroll, collection dialog restores focus, links work',async({page})=>{
 await page.goto('/#collection');await expect(page.locator('[data-chapter-director]')).toHaveCount(1);
 const collection=page.locator('#collection');await collection.getByRole('button',{name:'PROFILE',exact:true}).click();await expect(collection).toHaveAttribute('data-phase','2');
 await collection.getByRole('button',{name:'Explore all categories'}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.getByRole('tab',{name:'02 Honey'}).click();await expect(page.getByRole('link',{name:'Explore honey',exact:true})).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();await expect(collection.getByRole('button',{name:'Explore all categories'})).toBeFocused();
 await page.getByRole('link',{name:'Meet Legacy Reserve'}).click();await expect(page).toHaveURL(/products\/gent-coffee/,{timeout:30000});
});
test('normal swipe scroll changes the chapter pose',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/#philosophy');await expect(page.locator('[data-chapter-director]')).toHaveCount(1);
 const start=await page.locator('.craft-package').evaluate(e=>getComputedStyle(e).transform);await page.mouse.wheel(0,1200);await expect.poll(()=>page.locator('.craft-package').evaluate(e=>getComputedStyle(e).transform)).not.toBe(start);
 expect(await page.evaluate(()=>document.body.style.position)).toBe('');
});
test('reduced motion keeps all story information and navigation available',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/#philosophy');await expect(page.locator('[data-chapter-director]')).toHaveCount(0);await expect(page.locator('#philosophy')).toHaveAttribute('data-animated','false');
 for(const id of ids.slice(0,4)){await expect(page.locator(`#${id} .chapter-static-records article`)).toHaveCount(4);await expect(page.locator(`#${id} .chapter-static-records`)).toBeVisible();}
 await page.locator('#membership').getByRole('link',{name:'Explore the membership vision'}).click();await expect(page).toHaveURL(/\/membership$/);
});
test('motion off releases sticky runways and motion on restores them',async({page})=>{
 await page.goto('/#philosophy');await expect(page.locator('[data-chapter-director]')).toHaveCount(1);await page.locator('.cinema-tools .motion-control').click();await expect(page.locator('#philosophy')).toHaveAttribute('data-animated','false');await expect(page.locator('[data-chapter-director]')).toHaveCount(0);await page.locator('.cinema-tools .motion-control').click();await expect(page.locator('[data-chapter-director]')).toHaveCount(1);
});
test('no JavaScript preserves every chapter and product destination',async({browser})=>{
 const page=await browser.newPage({javaScriptEnabled:false});await page.goto(`${process.env.PLAYWRIGHT_BASE_URL||'http://127.0.0.1:3099'}/#philosophy`,{waitUntil:'domcontentloaded'});for(const id of ids.slice(0,4))await expect(page.locator(`#${id} .chapter-static-records article`)).toHaveCount(4);await page.getByRole('link',{name:'Meet Legacy Reserve'}).click();await expect(page).toHaveURL(/products\/gent-coffee/,{timeout:30000});await page.close();
});

test('intro skip hands off to native cinematic chapters',async({page})=>{
 await page.goto('/');await page.locator('.network-skip').click();
 await expect(page.locator('[data-chapter-director]')).toHaveCount(1);
 await page.locator('.cinema-skip').click();await expect(page).toHaveURL(/#collection$/);
 await expect(page.locator('#collection .chapter-viewport')).toBeInViewport();
 expect(await page.evaluate(()=>document.body.style.position)).toBe('');
});
