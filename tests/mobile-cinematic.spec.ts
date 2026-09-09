import {test,expect} from '@playwright/test';
const sizes = [[320,568],[360,800],[375,812],[390,844],[393,852],[412,915],[430,932]];
for (const [width,height] of sizes) test(`portrait playback ${width}x${height}`,async({page})=>{
 await page.setViewportSize({width,height});
 const errors:string[]=[]; page.on('pageerror',e=>errors.push(e.message));
 // Exercise the fixed-viewport path even on browsers that support fullscreen.
 await page.addInitScript(()=>{Element.prototype.requestFullscreen=()=>Promise.reject(new Error('Fullscreen unavailable'));});
 await page.goto('/');const root=page.locator('.network-entrance');
 await expect(root).toHaveAttribute('data-renderer','webgl');
 await expect(page.locator('meta[name="viewport"]')).toHaveAttribute('content',/viewport-fit=cover/);
 const entry=page.getByRole('button',{name:'ENTER THE EXPERIENCE'});
 const box=await entry.boundingBox();expect(box!.height).toBeGreaterThanOrEqual(64);expect(box!.x).toBeGreaterThanOrEqual(0);expect(box!.x+box!.width).toBeLessThanOrEqual(width);
 await page.evaluate(()=>window.scrollTo({top:80,behavior:'instant'}));
 await entry.click();const savedScroll=await page.evaluate(()=>-parseFloat(document.body.style.top || '0'));await expect(root).toHaveAttribute('data-immersive','true');
 await expect(root).toHaveAttribute('data-state','PLAYING');
 await page.getByRole('button',{name:'PAUSE FILM'}).click();
 if(width===390){
  await root.evaluate(e=>{(e as HTMLElement).style.setProperty('--mobile-top','47px');(e as HTMLElement).style.setProperty('--mobile-bottom','34px');});
  await page.getByRole('button',{name:'SKIP INTRO'}).focus();await page.keyboard.press('Tab');
  await expect(page.getByRole('button',{name:'RESUME FILM'})).toBeFocused();
  await page.keyboard.press('Shift+Tab');await expect(page.getByRole('button',{name:'SKIP INTRO'})).toBeFocused();
  expect((await page.locator('.network-caption').boundingBox())!.y).toBeGreaterThanOrEqual(47);
  const controls=await page.locator('.network-bottom').boundingBox();expect(controls!.y+controls!.height).toBeLessThanOrEqual(height-34);
 }
 expect(await page.evaluate(()=>document.body.style.position)).toBe('fixed');
 expect(await page.locator('header').first().evaluate(e=>getComputedStyle(e).visibility)).toBe('hidden');
 for (const p of [.035,.18,.27,.40,.55,.71,.83,.96]) {
  await page.evaluate(p=>window.dispatchEvent(new CustomEvent('gent-film-seek',{detail:p})),p);
  await page.waitForTimeout(100);
  const bounds=await root.boundingBox();expect(bounds).toEqual({x:0,y:0,width,height});
  const issues=await root.evaluate(root=>{
   const visible=(e:Element)=>{for(let x:Element|null=e;x&&x!==root;x=x.parentElement){const s=getComputedStyle(x);if(s.display==='none'||s.visibility==='hidden'||Number(s.opacity)<.5)return false;}return true;};
   return Array.from(root.querySelectorAll<HTMLElement>('span,small,dt,dd,figcaption,p,strong,h2,h3,button')).filter(e=>e.childElementCount===0&&e.textContent?.trim()&&visible(e)&&!e.closest('.network-live-status')).flatMap(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return parseFloat(s.fontSize)<12||r.left<0||r.right>innerWidth+1||r.top<0||r.bottom>innerHeight+1?[`${e.className||e.tagName}: ${s.fontSize}, ${r.x},${r.y},${r.bottom}: ${e.textContent}`]:[];});
  });expect(issues,`frame ${p}`).toEqual([]);
 }
 await page.setViewportSize({width:height,height:width});await page.waitForTimeout(250);
 expect(await root.boundingBox()).toEqual({x:0,y:0,width:height,height:width});
 await page.setViewportSize({width,height:height-80});await page.waitForTimeout(250);
 expect(await root.boundingBox()).toEqual({x:0,y:0,width,height:height-80});
 await page.getByRole('button',{name:'SKIP INTRO'}).click();await expect(root).toHaveAttribute('data-state','EXPLORE');
 await expect(root).not.toHaveAttribute('data-immersive','true');expect(await page.evaluate(()=>document.body.style.position)).toBe('');
 expect(await page.locator('header').first().evaluate(e=>getComputedStyle(e).visibility)).toBe('visible');
 expect(await page.evaluate(()=>document.querySelectorAll('[inert]').length)).toBe(0);
 expect(await page.evaluate(()=>scrollY)).toBe(savedScroll);
 await page.getByRole('button',{name:'REPLAY NETWORK'}).click();await expect(root).toHaveAttribute('data-immersive','true');
 await page.keyboard.press('Escape');await expect(root).toHaveAttribute('data-state','EXPLORE');
 await page.getByRole('link',{name:'ENTER GENT RESERVE CO.'}).click();await expect(page.locator('#philosophy')).toBeInViewport();
 expect(errors).toEqual([]);
});
test('natural completion and fullscreen exit restore the site',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 const root=page.locator('.network-entrance');await expect(root).toHaveAttribute('data-renderer','webgl');
 await page.getByRole('button',{name:'ENTER THE EXPERIENCE'}).click();
 await expect(root).toHaveAttribute('data-state','EXPLORE',{timeout:75000});
 await expect(root).not.toHaveAttribute('data-immersive','true');expect(await page.evaluate(()=>document.body.style.position)).toBe('');
 expect(await page.evaluate(()=>document.fullscreenElement===null)).toBe(true);
 await page.getByRole('button',{name:'REPLAY NETWORK'}).click();
 await expect(root).toHaveAttribute('data-state','PLAYING');
 if (await page.evaluate(()=>!!document.fullscreenElement)) await page.evaluate(()=>document.exitFullscreen());
 else await page.keyboard.press('Escape');
 await expect(root).toHaveAttribute('data-state','EXPLORE');
});
test('reduced motion and WebGL failure release immersion',async({page})=>{
 await page.setViewportSize({width:320,height:568});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 await page.getByRole('button',{name:'ENTER THE EXPERIENCE'}).click();
 await expect(page.locator('.network-entrance')).toHaveAttribute('data-state','EXPLORE');
 expect(await page.evaluate(()=>document.querySelector('[data-immersive]')===null&&document.body.style.position==='')).toBe(true);
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.evaluate(()=>sessionStorage.clear());await page.reload();
 await expect(page.locator('.network-entrance')).toHaveAttribute('data-renderer','webgl');
 await page.getByRole('button',{name:'ENTER THE EXPERIENCE'}).click();
 await expect(page.locator('canvas')).toBeVisible();
 await page.locator('canvas').evaluate(e=>e.dispatchEvent(new Event('webglcontextlost',{cancelable:true})));
 await expect(page.locator('.network-entrance')).toHaveAttribute('data-state','EXPLORE');
 expect(await page.evaluate(()=>document.body.style.position)).toBe('');
});
test('desktop remains in its original page presentation',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.getByRole('button',{name:'ACTIVATE THE NETWORK'})).toBeVisible();
 await page.getByRole('button',{name:'ACTIVATE THE NETWORK'}).click();
 await expect(page.locator('.network-entrance')).not.toHaveAttribute('data-immersive','true');
 expect(await page.locator('.network-entrance').evaluate(e=>getComputedStyle(e).position)).not.toBe('fixed');
 await page.keyboard.press('Escape');
});
