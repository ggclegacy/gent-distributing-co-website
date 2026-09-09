import { test, expect } from "@playwright/test";
const scenes = ["philosophy", "collection", "ecosystem", "membership"];
for (const [width, height] of [
  [320, 568],
  [390, 844],
  [430, 932],
  [768, 1024],
  [844, 390],
  [1440, 900],
]) {
  test(`intelligence is readable and interactive at ${width}x${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/#philosophy");
    for (const id of scenes) {
      const scene = page.locator("#" + id);
      await scene.scrollIntoViewIfNeeded();
      await expect(scene.locator(".environment-image")).toBeVisible();
      const buttons = scene.locator(".il-phase-nav button");
      for (let i = 0; i < 4; i++) {
        await buttons.nth(i).click();
        await expect(buttons.nth(i)).toHaveAttribute("aria-pressed", "true");
        await expect(scene.locator(".il-records article").nth(i)).toBeVisible();
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await scene.screenshot({
        path: `test-results/intelligence-${width}-${id}.png`,
      });
    }
    await page.locator("#membership .il-link").click();
    await expect(page).toHaveURL(/\/membership$/);
    await page.goto("/#collection");
    await page.locator(".il-collection-index summary").click();
    await page.getByRole("tab", { name: /02 Honey/ }).click();
    await page
      .getByRole("link", { name: "Explore honey", exact: true })
      .click();
    await expect(page).toHaveURL(/gent-honey/);
    expect(errors).toEqual([]);
  });
}
for (const width of [390, 1440]) {
  test(`scroll advances and reverses intelligence at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#philosophy");
    await expect(page.locator(".pin-spacer")).toHaveCount(width < 1000 ? 0 : 1);
    if (width < 1000)
      await page.getByRole("button", { name: "Menu", exact: true }).click();
    await page.getByRole("link", { name: "Our standard", exact: true }).click();
    const scene = page.locator("#philosophy");
    await expect(scene).toHaveAttribute("data-phase", "0");
    const start = await page.evaluate(() => scrollY);
    await page.evaluate(
      (y) => scrollTo({ top: y, behavior: "instant" }),
      start + (width === 390 ? 650 : 1800),
    );
    await expect(scene).toHaveAttribute("data-phase", "3");
    await page.evaluate(
      (y) => scrollTo({ top: y, behavior: "instant" }),
      start,
    );
    await expect(scene).toHaveAttribute("data-phase", "0");
    await page.locator(".cinema-tools .motion-control").click();
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expect(page.locator("[inert]")).toHaveCount(0);
    await scene.locator(".il-phase-nav button").last().click();
    await expect(scene).toHaveAttribute("data-phase", "3");
  });
}
test("without JavaScript all phase records and product navigation remain available", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/#collection");
  await expect(page.locator("#collection .il-records article")).toHaveCount(4);
  for (const article of await page
    .locator("#collection .il-records article")
    .all())
    await expect(article).toBeVisible();
  await page.getByRole("link", { name: "Explore Legacy Reserve" }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/gent-coffee/);
  await context.close();
});
