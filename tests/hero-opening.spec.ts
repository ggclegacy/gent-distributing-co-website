import { test, expect } from "@playwright/test";
const hero = ".network-entrance";
const activate = async (page: import("@playwright/test").Page) => {
  await page.getByRole("button", { name: "ACTIVATE THE NETWORK" }).click();
};
const progress = async (page: import("@playwright/test").Page) =>
  page
    .locator(hero)
    .evaluate((el) => Number((el as HTMLElement).dataset.progress));
for (const [width, height] of [
  [320, 568],
  [390, 844],
  [768, 1024],
  [1440, 900],
  [2560, 1080],
]) {
  test(`one-viewport entrance, time authority, skip and replay at ${width}`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await expect(page.locator(hero)).toHaveAttribute("data-renderer", "webgl");
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Born in Louisiana.",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/network-dormant-${width}.png`,
    });
    const started = Date.now();
    await activate(page);
    await expect(page.locator(hero)).toHaveAttribute("data-state", "PLAYING");
    // A second activation and a large wheel delta cannot seek the time playhead.
    await page.locator(".network-activate").dispatchEvent("click");
    await page.mouse.wheel(0, 3200);
    const snapshot = await page.evaluate(() => ({
      y: scrollY,
      position: document.body.style.position,
      p: Number(
        document.querySelector<HTMLElement>(".network-entrance")?.dataset
          .progress,
      ),
    }));
    expect(snapshot.y).toBe(0);
    expect(snapshot.position).toBe("fixed");
    expect(snapshot.p).toBeGreaterThan(0);
    expect(snapshot.p).toBeLessThanOrEqual(
      Math.min(1, (Date.now() - started) / 10500 + 0.1),
    );
    await page.getByRole("button", { name: "SKIP INTRO" }).click();
    await expect(page.locator(hero)).toHaveAttribute("data-state", "EXPLORE");
    await expect(page.locator(hero)).toHaveAttribute("data-progress", "1.0000");
    await expect(
      page.getByRole("link", { name: "ENTER GENT RESERVE CO." }),
    ).toBeFocused();
    expect(await page.evaluate(() => document.body.style.position)).toBe("");
    expect(
      await page.locator(hero).evaluate((el) => el.getBoundingClientRect().top),
    ).toBe(0);
    await page.screenshot({
      path: `test-results/network-complete-${width}.png`,
    });
    await page.getByRole("button", { name: "REPLAY NETWORK" }).click();
    await expect(page.locator(hero)).toHaveAttribute("data-state", "PLAYING");
    expect(await progress(page)).toBeLessThan(0.2);
    await page.keyboard.press("Escape");
    await expect(page.locator(hero)).toHaveAttribute("data-state", "EXPLORE");
    await page.reload();
    await expect(page.locator(hero)).toHaveAttribute("data-state", "EXPLORE");
    await page.getByRole("link", { name: "ENTER GENT RESERVE CO." }).click();
    await expect(page.locator("#philosophy")).toBeInViewport();
    expect(errors).toEqual([]);
  });
}
test("full authored film completes without input or layout movement", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(hero)).toHaveAttribute("data-renderer", "webgl");
  await activate(page);
  const start = Date.now();
  await expect(page.locator(hero)).toHaveAttribute("data-state", "RESOLVING", {
    timeout: 65000,
  });
  expect(await progress(page)).toBeGreaterThan(0.82);
  await expect(page.locator(hero)).toHaveAttribute("data-state", "EXPLORE");
  expect(Date.now() - start).toBeGreaterThan(43000);
  expect(Date.now() - start).toBeLessThan(65000);
  expect(await page.evaluate(() => scrollY)).toBe(0);
  expect(
    await page
      .locator(hero)
      .evaluate((el) => el.getBoundingClientRect().height),
  ).toBe(900);
  await expect(page.locator("[data-cinema]")).toHaveAttribute(
    "data-cinema-ready",
    "desktop",
  );
  await page.mouse.wheel(0, 500);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);
  await expect(page.locator(hero)).toHaveAttribute("data-progress", "1.0000");
});
test("orientation preserves time and rebuilds downstream only after handoff", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(hero)).toHaveAttribute("data-renderer", "webgl");
  await activate(page);
  let previous = 0;
  for (const [width, height] of [
    [390, 844],
    [844, 390],
    [768, 1024],
    [1440, 900],
  ]) {
    await page.setViewportSize({ width, height });
    await expect(page.locator(hero)).toHaveAttribute(
      "data-state",
      /PLAYING|RESOLVING|EXPLORE/,
    );
    const p = await progress(page);
    expect(p).toBeGreaterThanOrEqual(previous);
    previous = p;
  }
  await page.keyboard.press("Escape");
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await page.getByRole("link", { name: "ENTER GENT RESERVE CO." }).click();
  await expect(page.locator("#philosophy")).toBeInViewport();
});
test("early Activate acknowledges immediately and waits for renderer", async ({
  page,
}) => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/_next/static/chunks/*.js", async (route) => {
    const response = await route.fetch();
    const body = await response.text();
    if (body.includes("WebGLRenderer")) await gate;
    await route.fulfill({ response });
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await activate(page);
  await expect(page.locator(hero)).toHaveAttribute("data-state", "PREPARING");
  expect(
    await page.locator(hero).evaluate((e) => ({
      p: (e as HTMLElement).dataset.progress,
      status: document.querySelector("[role=status]")?.textContent,
    })),
  ).toEqual({ p: "0.0000", status: "INITIALIZING NETWORK" });
  release();
  await expect(page.locator(hero)).toHaveAttribute("data-state", "PLAYING");
  await page.keyboard.press("Escape");
});
for (const fallback of [
  "reduced",
  "motion-off",
  "save-data",
  "weak-device",
  "webgl-failure",
]) {
  test(`${fallback} preserves an accessible short entrance and native page`, async ({
    page,
  }) => {
    if (fallback === "reduced")
      await page.emulateMedia({ reducedMotion: "reduce" });
    if (fallback === "motion-off")
      await page.addInitScript(() =>
        sessionStorage.setItem("gent-motion", "paused"),
      );
    if (fallback === "save-data")
      await page.addInitScript(() =>
        Object.defineProperty(navigator, "connection", {
          value: { saveData: true },
        }),
      );
    if (fallback === "weak-device")
      await page.addInitScript(() =>
        Object.defineProperty(navigator, "deviceMemory", { value: 2 }),
      );
    if (fallback === "webgl-failure")
      await page.addInitScript(() => {
        const original = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (
          this: HTMLCanvasElement,
          ...args: Parameters<typeof original>
        ) {
          if (String(args[0]).includes("webgl")) return null;
          return original.apply(this, args);
        } as typeof original;
      });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(hero)).toHaveAttribute(
      "data-mode",
      fallback === "reduced" || fallback === "motion-off"
        ? "reduced"
        : "fallback",
    );
    await activate(page);
    await expect(page.locator(hero)).toHaveAttribute("data-state", "EXPLORE", {
      timeout: 3500,
    });
    await expect(page.locator("canvas")).toHaveCount(0);
    expect(await page.evaluate(() => document.body.style.position)).toBe("");
    await page.getByRole("link", { name: "ENTER GENT RESERVE CO." }).click();
    await expect(page.locator("#philosophy")).toBeInViewport();
  });
}
test("Motion Off and context loss safely release a running film", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(hero)).toHaveAttribute("data-renderer", "webgl");
  await activate(page);
  await page.locator(".cinema-tools .motion-control").click();
  await expect(page.locator(hero)).toHaveAttribute("data-state", "EXPLORE");
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.locator(".cinema-tools .motion-control").click();
  await expect(page.locator(hero)).toHaveAttribute("data-renderer", "webgl");
  await page.getByRole("button", { name: "REPLAY NETWORK" }).click();
  await page.locator("canvas").dispatchEvent("webglcontextlost");
  await expect(page.locator(hero)).toHaveAttribute("data-mode", "fallback");
  await expect(page.locator(hero)).toHaveAttribute("data-state", "EXPLORE");
  expect(await page.evaluate(() => document.body.style.position)).toBe("");
});
test("navigation during playback ends film and reaches the requested destination", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(hero)).toHaveAttribute("data-renderer", "webgl");
  await activate(page);
  await page.getByRole("link", { name: "Go to collection" }).click();
  await expect(page.locator("#collection")).toBeInViewport();
  await expect(page.locator(hero)).toHaveAttribute("data-state", "EXPLORE");
  expect(await page.evaluate(() => document.body.style.position)).toBe("");
  await page.locator(".il-collection-index summary").click();
  await page.getByRole("tab", { name: "02 Honey", exact: true }).click();
  await page.getByRole("link", { name: "Explore honey", exact: true }).click();
  await expect(page).toHaveURL(/products\/gent-honey/);
});
test("the GPU settles in dormant and completed poses", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(hero)).toHaveAttribute("data-renderer", "webgl");
  const canvas = page.locator("canvas");
  await page.waitForTimeout(400);
  const initial = await canvas.getAttribute("data-frames");
  await page.waitForTimeout(400);
  expect(await canvas.getAttribute("data-frames")).toBe(initial);
  await page.getByRole("button", { name: "SKIP INTRO" }).click();
  await expect(page.locator(hero)).toHaveAttribute("data-state", "EXPLORE");
  await page.waitForTimeout(600);
  const finished = await canvas.getAttribute("data-frames");
  await page.waitForTimeout(400);
  expect(await canvas.getAttribute("data-frames")).toBe(finished);
});
test("native touch gestures cannot move or seek a playing entrance", async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "CDP sends native touch gestures in Chromium.",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(hero)).toHaveAttribute("data-renderer", "webgl");
  await activate(page);
  const beforeTouch = await progress(page);
  const touchStarted = Date.now();
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 180, y: 620 }],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: 180, y: 170 }],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  expect(await page.evaluate(() => scrollY)).toBe(0);
  const elapsed = (Date.now() - touchStarted) / 10500;
  expect(await progress(page)).toBeLessThanOrEqual(
    Math.min(1, beforeTouch + elapsed + 0.12),
  );
  await page.keyboard.press("Escape");
  expect(await page.evaluate(() => document.body.style.position)).toBe("");
  await cdp.detach();
});
test("stalled renderer initializes the static fallback and unlocks", async ({
  page,
}) => {
  await page.route("**/_next/static/chunks/*.js", async (route) => {
    const response = await route.fetch();
    const body = await response.text();
    if (body.includes("WebGLRenderer")) return new Promise<void>(() => {});
    await route.fulfill({ response });
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await activate(page);
  await expect(page.locator(hero)).toHaveAttribute("data-state", "PREPARING");
  await expect(page.locator(hero)).toHaveAttribute("data-state", "EXPLORE", {
    timeout: 13000,
  });
  await expect(page.locator(hero)).toHaveAttribute("data-mode", "fallback");
  expect(await page.evaluate(() => document.body.style.position)).toBe("");
  await expect(page.locator(".network-completed-poster")).toHaveCSS(
    "opacity",
    "1",
  );
});
test("a completed session uses the poster until Replay requests the renderer", async ({
  page,
}) => {
  await page.addInitScript(() =>
    sessionStorage.setItem("gent-network-complete", "yes"),
  );
  await page.goto("/");
  await expect(page.locator(hero)).toHaveAttribute("data-state", "EXPLORE");
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.getByRole("button", { name: "REPLAY NETWORK" }).click();
  await expect(page.locator(hero)).toHaveAttribute("data-state", "PLAYING");
  await expect(page.locator(hero)).toHaveAttribute("data-renderer", "webgl");
  await page.keyboard.press("Escape");
  await expect(page.locator(hero)).toHaveAttribute("data-state", "EXPLORE");
});
