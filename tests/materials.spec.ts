import { test, expect } from '@playwright/test';
const scenes = ['philosophy', 'collection', 'ecosystem', 'membership'];

for (const width of [320, 390, 768, 1440]) {
  test(`cinematic evidence survives ${width}px, motion changes and navigation`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/#philosophy');
    for (const id of scenes) {
      await page.evaluate(hash => { location.hash = hash; }, id);
      const section = page.locator(`#${id}`);
      await expect(section).toBeInViewport();
      const photograph = section.locator('.environment-image');
      await expect.poll(() => photograph.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
      await expect.poll(() => photograph.evaluate((img: HTMLImageElement) => decodeURIComponent(img.currentSrc))).toContain(width < 700 ? '-portrait.webp' : '-landscape.webp');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `test-results/story-${width}-${id}.png` });
    }
    await page.locator('#membership .button').scrollIntoViewIfNeeded();
    await page.locator('#membership .button').click();
    await expect(page).toHaveURL(/\/membership$/);
    await page.goto('/#collection');
    await page.getByRole('tab', { name: '02 Honey', exact: true }).click();
    await page.getByRole('link', { name: 'Explore honey', exact: true }).click();
    await expect(page).toHaveURL(/\/products\/gent-honey/);
    await page.goto('/#ecosystem');
    await page.locator('.cinema-tools .motion-control').click();
    await expect(page.locator('.pin-spacer')).toHaveCount(0);
    await expect(page.locator('[data-scene][inert]')).toHaveCount(0);
    await page.locator('#ecosystem').scrollIntoViewIfNeeded();
    await expect(page.locator('#ecosystem .environment-image')).toBeInViewport();
    expect(errors).toEqual([]);
  });
}

test('lab evaluation, vault reveal and Lafayette routes scrub and reverse', async ({ page }) => {
  await page.goto('/#ecosystem');
  const route = page.locator('#ecosystem .route-segment').last();
  await expect(page.locator('[data-cinema]')).toHaveAttribute('data-active-scene', '3');
  const initial = await route.evaluate(el => getComputedStyle(el).transform);
  const top = await page.evaluate(() => scrollY);
  await page.evaluate(y => scrollTo({ top: y + 900, behavior: 'instant' }), top);
  await expect.poll(() => route.evaluate(el => getComputedStyle(el).transform)).not.toBe(initial);
  await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), top);
  await expect.poll(() => route.evaluate(el => getComputedStyle(el).transform)).toBe(initial);
  await page.getByRole('button', { name: 'Previous scene', exact: true }).click();
  await expect(page.locator('[data-cinema]')).toHaveAttribute('data-active-scene', '2');
  const bay = page.locator('#collection .vault-bay').last();
  const before = await bay.evaluate(el => getComputedStyle(el).opacity);
  await page.evaluate(() => scrollBy({ top: 650, behavior: 'instant' }));
  await expect.poll(() => bay.evaluate(el => getComputedStyle(el).opacity)).not.toBe(before);
  await page.getByRole('button', { name: 'Previous scene', exact: true }).click();
  await expect(page.locator('[data-cinema]')).toHaveAttribute('data-active-scene', '1');
  await expect(page.locator('#philosophy .evaluation-row')).toHaveCount(5);
});

for (const width of [390, 1440]) {
 test(`reduced motion has complete readable imagery at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#collection');
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  for (const id of scenes) {
   await page.locator('#' + id).scrollIntoViewIfNeeded();
   await expect.poll(() => page.locator('#' + id + ' .environment-image').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  await expect(page.locator('#collection .vault-bay')).toHaveCount(10);
  await expect(page.locator('#ecosystem .route-system')).toContainText('LAFAYETTE');
  await expect(page.locator('#ecosystem .route-system')).toContainText('NATIONAL');
 });
}

test('server-rendered product story works without JavaScript', async ({ browser }) => {
 const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
 const page = await context.newPage();
 await page.goto('/#collection');
 await expect(page.locator('#collection')).toBeInViewport();
 await expect.poll(() => page.locator('#collection .environment-image').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
 // Keyboard navigation also covers the native link with script execution disabled.
 await page.getByRole('link', { name: 'Explore coffee', exact: true }).focus();
 await page.keyboard.press('Enter');
 await expect(page).toHaveURL(/\/products\/gent-coffee/);
 await context.close();
});
