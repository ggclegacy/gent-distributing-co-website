import { test, expect } from "@playwright/test";

test("desktop camera pins, enters the second scene, and reverses", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("[data-cinema]")).toHaveAttribute(
    "data-cinema-ready",
    "desktop",
  );
  await expect(page.locator(".pin-spacer")).toHaveCount(3);
  await page.evaluate(() => window.scrollTo({ top: 850, behavior: "instant" }));
  await expect
    .poll(() =>
      page
        .locator(".hero-copy")
        .evaluate((el) => +getComputedStyle(el).opacity),
    )
    .toBeLessThan(0.05);
  expect(Math.abs((await page.locator(".hero").boundingBox())!.y)).toBeLessThan(
    2,
  );
  await page.evaluate(() =>
    window.scrollTo({ top: 1950, behavior: "instant" }),
  );
  await expect(page.locator("#philosophy")).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator("#philosophy")
        .evaluate((el) => +getComputedStyle(el).opacity),
    )
    .toBeGreaterThan(0.95);
  await page.screenshot({ path: "test-results/desktop-standard.png" });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect
    .poll(() =>
      page
        .locator(".hero-copy")
        .evaluate((el) => +getComputedStyle(el).opacity),
    )
    .toBeGreaterThan(0.95);
  expect(errors).toEqual([]);
});

test("chapter links bypass pinning and collection keeps keyboard navigation", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("[data-cinema]")).toHaveAttribute(
    "data-cinema-ready",
    "desktop",
  );
  await page.getByRole("link", { name: "Our standard", exact: true }).click();
  await expect
    .poll(() =>
      page
        .locator("#philosophy")
        .evaluate((el) => +getComputedStyle(el).opacity),
    )
    .toBeGreaterThan(0.95);
  await page.getByRole("link", { name: "Go to collection" }).click();
  await expect
    .poll(() =>
      page
        .locator("#collection")
        .evaluate((el) => Math.abs(el.getBoundingClientRect().top - 96)),
    )
    .toBeLessThan(5);
  const coffee = page.getByRole("tab", { name: "01 Coffee" });
  await coffee.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "02 Honey" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page.getByRole("link", { name: "Explore honey", exact: true }).click();
  await expect(page).toHaveURL(/products\/gent-honey/);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await page.goBack();
  await expect(page.locator(".pin-spacer")).toHaveCount(3);
});

test("motion toggle removes every pin and synchronizes both controls", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".pin-spacer")).toHaveCount(3);
  await page.locator(".cinema-tools button").click();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator("#philosophy")).toBeVisible();
  await expect(page.locator("footer button")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.reload();
  await expect(page.locator(".cinema-tools button")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await page.locator(".cinema-tools button").click();
  await expect(page.locator(".pin-spacer")).toHaveCount(3);
});

test("system reduced motion works initially and when changed live", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".cinema-tools button")).toBeDisabled();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator("#philosophy")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".pin-spacer")).toHaveCount(3);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});

test("mobile and short viewports use one brief pin and retain all content", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("[data-cinema]")).toHaveAttribute(
    "data-cinema-ready",
    "small",
  );
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  await page.screenshot({ path: "test-results/mobile-hero.png" });
  await page.getByRole("button", { name: "Menu" }).click();
  await page.getByRole("link", { name: "Our standard", exact: true }).click();
  await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("link", { name: "Go to collection" }).click();
  await page.getByRole("tab", { name: "03 Seasonings" }).click();
  await expect(
    page.getByRole("heading", { name: "Gent Seasonings" }),
  ).toBeVisible();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator(".pin-spacer")).toHaveCount(3);
  await page.setViewportSize({ width: 844, height: 390 });
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("deep links land on the standard after layout initializes", async ({
  page,
}) => {
  await page.goto("/#philosophy");
  await expect(page.locator("[data-cinema]")).toHaveAttribute(
    "data-cinema-ready",
    "desktop",
  );
  await expect
    .poll(() =>
      page
        .locator("#philosophy")
        .evaluate((el) => +getComputedStyle(el).opacity),
    )
    .toBeGreaterThan(0.95);
});

test("without JavaScript all story content and links remain in normal flow", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("#philosophy")).toBeVisible();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "First, coffee. Then, more." }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await context.close();
});

for (const [hash, selector] of [
  ["ecosystem", ".network-node"],
  ["membership", "#membership .member-card"],
] as const) {
  test(`direct ${hash} links land in the settled act`, async ({ page }) => {
    await page.goto("/#" + hash);
    await expect(page.locator(".pin-spacer")).toHaveCount(3);
    if (hash === "ecosystem") {
      await expect
        .poll(() =>
          page
            .locator(selector)
            .first()
            .evaluate((el) => +getComputedStyle(el).opacity),
        )
        .toBeGreaterThan(0.95);
    }
    expect(
      await page
        .locator("#" + hash)
        .evaluate((el) => Math.abs(el.getBoundingClientRect().top)),
    ).toBeLessThan(5);
    await page.screenshot({ path: `test-results/desktop-${hash}.png` });
  });
}
