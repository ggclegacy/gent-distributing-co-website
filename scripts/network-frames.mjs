import { webkit } from "@playwright/test";
import fs from "node:fs/promises";
import sharp from "sharp";
await fs.mkdir("docs/network/frames", { recursive: true });
const browser = await webkit.launch();
for (const [width, height] of [
  [1440, 900],
  [390, 844],
  [768, 1024],
]) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  page.on("pageerror", (e) => console.log("ERROR", e.message));
  for (const p of process.env.POSTERS_ONLY
    ? [0, 1]
    : [0, 0.21, 0.45, 0.63, 0.79, 1]) {
    await page.goto(`http://localhost:3077/?network-frame=${p}`);
    await page.locator('[data-renderer="webgl"]').waitFor({ timeout: 60000 });
    await page.waitForTimeout(900);
    await page.screenshot({
      path: `docs/network/frames/frame-${width}-${p}.png`,
    });
    if ((p === 0 || p === 1) && width !== 768) {
      const clean = await page.addStyleTag({
        content:
          ".site-header,.cinema-tools,.network-edition,.network-intro-copy,.network-caption,.network-hud,.network-categories,.network-resolution,.network-bottom,.network-live-status,.network-vignette,.exchange-poster,.network-completed-poster,nextjs-portal{opacity:0!important;visibility:hidden!important;transition:none!important;animation:none!important}",
      });
      const buffer = await page.locator(".exchange-webgl canvas").screenshot();
      await clean.evaluate((el) => el.remove());
      await sharp(buffer)
        .webp({ quality: 88 })
        .toFile(
          `public/images/exchange/network-${p === 0 ? "dormant" : "complete"}${width === 390 ? "-portrait" : ""}.webp`,
        );
    }
    console.log(
      width,
      p,
      await page.locator(".network-entrance").getAttribute("data-progress"),
    );
  }
  await context.close();
}
await browser.close();
await fs.writeFile(
  "docs/network/frames/README.txt",
  "Desktop, portrait and tablet frames captured using the local-only director review mode.\n",
);
