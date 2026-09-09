import { test, expect } from "@playwright/test";
const ids = [
  "arrival",
  "philosophy",
  "collection",
  "ecosystem",
  "membership",
  "welcome",
];
async function ready(page: import("@playwright/test").Page) {
  await expect(page.locator(".network-entrance")).toHaveAttribute(
    "data-beat",
    /.+/,
  );
  if (
    (await page.locator("[data-cinema]").getAttribute("data-intro-state")) !==
    "EXPLORE"
  )
    await page.locator(".network-skip").click();
  await expect(page.locator(".network-entrance")).toHaveAttribute(
    "data-state",
    "EXPLORE",
  );
  const viewport = page.viewportSize();
  if (viewport && (viewport.width < 1000 || viewport.height < 700)) {
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    return;
  }
  await expect(page.locator("[data-cinema]")).toHaveAttribute(
    "data-cinema-ready",
    "desktop",
  );
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
}

test("five downstream scenes share one scroll stage independently of the entrance", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await ready(page);
  await expect(page.locator("[data-cinema]")).toHaveAttribute(
    "data-active-scene",
    "1",
  );
  const end = await page
    .locator(".pin-spacer")
    .evaluate((el) => el.getBoundingClientRect().height - innerHeight);
  const seen = new Set<string>();
  for (let y = 900; y < end + 900; y += 650) {
    await page.evaluate((top) => scrollTo({ top, behavior: "instant" }), y);
    // Allow the 300 ms scrub interpolation to settle before sampling the scene.
    await page.waitForTimeout(1100);
    const state = await page.evaluate(() => ({
      active:
        document.querySelector<HTMLElement>("[data-cinema]")!.dataset
          .activeScene!,
      top: document.querySelector(".cinema-stage")!.getBoundingClientRect().top,
      visible: [...document.querySelectorAll("[data-scene]")].some(
        (el) =>
          getComputedStyle(el).visibility === "visible" &&
          +getComputedStyle(el).opacity > 0.15,
      ),
    }));
    seen.add(state.active);
    expect(Math.abs(state.top)).toBeLessThan(2);
    expect(state.visible).toBe(true);
  }
  await expect(page.locator("[data-cinema]")).toHaveAttribute(
    "data-active-scene",
    "5",
  );
  expect(seen.size).toBe(5);
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await expect(page.locator("[data-cinema]")).toHaveAttribute(
    "data-active-scene",
    "1",
  );
  await expect(page.locator(".exchange-film")).toHaveAttribute(
    "data-progress",
    "1.0000",
  );
  expect(errors).toEqual([]);
});

test("scene navigation exposes only the active scene and maintains product interaction", async ({
  page,
}) => {
  await page.goto("/");
  await ready(page);
  for (let i = 1; i < ids.length; i++) {
    await expect(page.locator("[data-cinema]")).toHaveAttribute(
      "data-active-scene",
      String(i),
    );
    await expect(page.locator("#" + ids[i])).not.toHaveAttribute("inert");
    expect(await page.locator("[data-scene][inert]").count()).toBe(4);
    if (i >= 3)
      await expect(page.locator(".lens-column")).toHaveCSS("opacity", "0");
    await page.screenshot({ path: `test-results/scene-${i}-desktop.png` });
    if (i < 5)
      await page
        .getByRole("button", { name: "Next scene", exact: true })
        .click();
  }
  await expect(
    page.getByRole("button", { name: "Next scene", exact: true }),
  ).toBeDisabled();
  await page.getByRole("link", { name: "Go to collection" }).click();
  await page.locator(".il-collection-index summary").click();
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
  await ready(page);
});

for (const [index, id] of ids.entries()) {
  test(`direct link to ${id} lands on its visible scene`, async ({ page }) => {
    await page.goto("/#" + id);
    await ready(page);
    await expect(page.locator("[data-cinema]")).toHaveAttribute(
      "data-active-scene",
      String(Math.max(1, index)),
    );
    await expect(page.locator("#" + id)).toHaveCSS("opacity", "1");
    expect(
      Math.abs((await page.locator("#" + id).boundingBox())!.y),
    ).toBeLessThan(2);
  });
}

test("motion preference restores a readable document and persists", async ({
  page,
}) => {
  await page.goto("/");
  await ready(page);
  await page.locator(".cinema-tools .motion-control").click();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator("[data-scene][inert]")).toHaveCount(0);
  for (const id of ids) await expect(page.locator("#" + id)).toBeVisible();
  await expect(page.locator("footer .motion-control")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.reload();
  await expect(page.locator(".cinema-tools .motion-control")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.locator(".cinema-tools .motion-control").click();
  await ready(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator(".cinema-tools .motion-control")).toBeDisabled();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await ready(page);
});

test("mobile entrance remains one viewport and preserves native product controls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await ready(page);
  const initial = await page
    .locator(".exchange-film")
    .getAttribute("data-progress");
  await page.evaluate(() => scrollTo({ top: 400, behavior: "instant" }));
  await expect
    .poll(() => page.locator(".exchange-film").getAttribute("data-progress"))
    .toBe(initial);
  for (const id of ids) {
    await expect(page.locator("#" + id)).toBeVisible();
    await expect(page.locator("#" + id)).not.toHaveAttribute("inert");
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("link", { name: "Go to collection" }).click();
  await page.locator(".il-collection-index summary").click();
  await page.getByRole("tab", { name: "03 Seasonings" }).click();
  await page
    .getByRole("link", { name: "Explore seasonings", exact: true })
    .click();
  await expect(page).toHaveURL(/products\/gent-seasonings/);
  await expect(
    page.getByRole("heading", { name: "Gent Seasonings", exact: true }),
  ).toBeVisible();
  await page.goBack();
  await expect(page.locator("[data-cinema]")).toBeVisible();
  await page.setViewportSize({ width: 844, height: 390 });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await page.setViewportSize({ width: 1440, height: 900 });
  await ready(page);
});

test("no JavaScript and system reduced-motion expose every scene in order", async ({
  browser,
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".cinema-tools .motion-control")).toBeDisabled();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto("/");
  for (const id of ids)
    await expect(staticPage.locator("#" + id)).toBeVisible();
  await expect(staticPage.locator(".pin-spacer")).toHaveCount(0);
  await context.close();
});

for (const width of [320, 390]) {
  test(`compact ${width}px phone retains an accessible Louisiana entrance`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 667 });
    await page.goto("/");
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
    await expect(
      page.getByRole("button", { name: /ACTIVATE THE NETWORK|ENTER THE EXPERIENCE/ }),
    ).toBeInViewport();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}
