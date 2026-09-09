import {test,expect} from '@playwright/test';
for(const width of [320,375,390,430,1440]) test(`readable entrance and story at ${width}`,async({page})=>{
 await page.setViewportSize({width,height:width===320?568:width===1440?900:844});
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.locator('.network-entrance')).toHaveAttribute('data-renderer','webgl');
 const button=page.getByRole('button',{name:/ACTIVATE THE NETWORK|ENTER THE EXPERIENCE/});
 const box=await button.boundingBox();expect(box!.height).toBeGreaterThanOrEqual(64);expect(box!.width).toBeGreaterThan(260);
 expect(await button.evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(14);
 expect(await page.locator('.network-invitation').evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(16);
 await button.click();await expect(page.locator('.network-entrance')).toHaveAttribute('data-state','PLAYING');
 await page.getByRole('button',{name:'PAUSE FILM'}).click();
 const paused=await page.locator('.network-entrance').getAttribute('data-progress');await page.waitForTimeout(150);expect(await page.locator('.network-entrance').getAttribute('data-progress')).toBe(paused);
 for(const p of [.035,.085,.18,.27,.40,.55,.71,.83,.96]){
  await page.evaluate(p=>window.dispatchEvent(new CustomEvent('gent-film-seek',{detail:p})),p);
  await page.waitForTimeout(60);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const issues=await page.locator('.network-entrance').evaluate(root=>{
   const visible=(e:Element):boolean=>{for(let x:Element|null=e;x&&x!==root;x=x.parentElement){const s=getComputedStyle(x);if(s.display==='none'||s.visibility==='hidden'||Number(s.opacity)<.5)return false;}return true;};
   return [...root.querySelectorAll<HTMLElement>('span,small,dt,dd,figcaption,p,strong,h1,h2,h3,button,a')].filter(e=>e.childElementCount===0&&e.textContent?.trim()&&visible(e)&&!e.closest('.network-live-status')).flatMap(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return parseFloat(s.fontSize)<12||r.left<0||r.right>innerWidth+1||r.bottom>innerHeight+1?[`${e.className||e.tagName}: ${s.fontSize}, ${Math.round(r.left)},${Math.round(r.top)},${Math.round(r.bottom)} ${e.textContent}`]:[];});
  });expect(issues,`frame ${p}`).toEqual([]);
 }
 await page.getByRole('button',{name:'SKIP INTRO'}).click();await expect(page.locator('.network-entrance')).toHaveAttribute('data-state','EXPLORE');expect(await page.evaluate(()=>document.body.style.position)).toBe('');
 await page.getByRole('link',{name:'ENTER GENT RESERVE CO.'}).click();await expect(page.locator('#philosophy')).toBeInViewport();expect(errors).toEqual([]);
});
test('reduced motion offers static entry, skip and native navigation',async({page})=>{await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:320,height:568});await page.goto('/');await expect(page.locator('canvas')).toHaveCount(0);await page.getByRole('button',{name:/ACTIVATE THE NETWORK|ENTER THE EXPERIENCE/}).click();await expect(page.locator('.network-entrance')).toHaveAttribute('data-state','EXPLORE');await page.getByRole('link',{name:'ENTER GENT RESERVE CO.'}).click();await expect(page.locator('#philosophy')).toBeInViewport();});
test('one activation completes the complete film and releases scrolling',async({page})=>{await page.goto('/');await expect(page.locator('.network-entrance')).toHaveAttribute('data-renderer','webgl');await page.getByRole('button',{name:/ACTIVATE THE NETWORK|ENTER THE EXPERIENCE/}).click();await expect(page.locator('.network-entrance')).toHaveAttribute('data-state','EXPLORE',{timeout:65000});expect(await page.locator('.network-entrance').getAttribute('data-progress')).toBe('1.0000');expect(await page.evaluate(()=>document.body.style.position)).toBe('');await page.getByRole('button',{name:'REPLAY NETWORK'}).click();await expect(page.locator('.network-entrance')).toHaveAttribute('data-state','PLAYING');await page.keyboard.press('Escape');await expect(page.locator('.network-entrance')).toHaveAttribute('data-state','EXPLORE');});
