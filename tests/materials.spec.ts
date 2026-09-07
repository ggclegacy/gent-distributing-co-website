import { test, expect } from "@playwright/test";

test.describe("material journey", () => {

    test("physical scenes load, scrub reversibly, and remain accessible after motion is disabled", async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", e => errors.push(e.message));
      await page.goto("/#collection");
      await expect(page.locator("[data-cinema]")).toHaveAttribute("data-active-scene", "2");
      const coffee = page.locator(".physical-coffee");
      await expect(coffee).toBeInViewport();
      await expect.poll(() => coffee.locator("img").evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
      const before = await coffee.evaluate(el => getComputedStyle(el).transform);
      await page.evaluate(() => scrollBy({top: 250, behavior: "instant"}));
      await expect.poll(() => coffee.evaluate(el => getComputedStyle(el).transform)).not.toBe(before);
      await page.getByRole("link", {name: "For partners", exact: true}).click();
      await expect(page.locator("[data-cinema]")).toHaveAttribute("data-active-scene", "3");
      await expect(page.locator(".journey-cargo")).toBeVisible();
      await expect(page.locator(".distribution-stops")).toContainText("CUSTOMER");
      await expect(page.locator(".location-plates")).toContainText("Gulf South");
      await page.getByRole("button", {name: "Next scene", exact: true}).click();
      await expect(page.locator(".physical-card").first()).toBeInViewport();
      await expect(page.locator(".journey-cargo")).toBeVisible();
      await page.locator(".cinema-tools .motion-control").click();
      await expect(page.locator("[data-scene][inert]")).toHaveCount(0);
      await expect(page.locator(".pin-spacer")).toHaveCount(0);
      await page.locator("#membership").scrollIntoViewIfNeeded();
      await expect(page.locator("#membership .resting-case")).toBeVisible();
      expect(errors).toEqual([]);
    });

    for (const width of [320, 390, 768]) {
      test(`native ${width}px layout has sharp assets, no overflow and working collection links`, async ({page}) => {
        await page.setViewportSize({width,height:844});
        await page.goto("/#collection");
        await expect(page.locator(".pin-spacer")).toHaveCount(0);
        const coffee = page.locator(".physical-coffee");
        await expect(coffee).toBeInViewport();
        await expect.poll(() => coffee.locator("img").evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await page.getByRole("tab", {name:"02 Honey",exact:true}).click();
        await page.getByRole("link", {name:"Explore honey",exact:true}).click();
        await expect(page).toHaveURL(/products\/gent-honey/);
        await page.goto("/#membership");
        await expect(page.locator("#membership .physical-card")).toBeInViewport();
        await page.locator("#membership").getByRole("link",{name:"See the membership plans"}).click();
        await expect(page).toHaveURL(/\/membership$/);
      });
    }
});
