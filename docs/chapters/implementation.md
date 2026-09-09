# Gent Reserve cinematic chapters

The approved intro source and assets are preserved. Five distinct scenes follow it:

- **The Gent Standard:** ingredient macro, packaging drawing and assembly, inspection, then a gold approval signature.
- **The Collection:** a lateral camera move through coffee, honey, seasonings and the wider collection, with an accessible product browser.
- **Makers & Partners:** a physical product travels from the maker through Gent’s preparation case toward a customer setting.
- **Community / Membership:** architectural doors open, the light warms and an invitation card settles into place. Benefits remain described as planned, not available.
- **Come In:** a slower, quiet threshold with collection and partner destinations.

## Motion and access

Existing GSAP ScrollTrigger drives absolute CSS scene poses from native document scrolling. Each scene has its own sticky viewport and scroll distance; no new page-wide pinned container, wheel interception or animation dependency was added. Forward and reverse scrolling use the same pose. Phase buttons seek the matching document position. The intro retains its separate single-interaction director.

Reduced motion, Motion Off, data saving and low-memory settings use readable static chapter records. Server-rendered content and product links remain available without JavaScript. Phone layouts use shorter captions with full detail available in expandable records, and retain 16px narrative text. The collection dialog supports keyboard tabs, Escape and focus return.

## Generated asset

- Final asset: `public/images/chapters/coffee-study.webp`
- Method: built-in image generation, inspected visually, converted to WebP with the existing Sharp dependency. No new dependency.
- Source: `/Users/neilstutes/.codex/generated_images/01a08652-c295-7132-8dbc-88ace4ed5456/exec-3dd131ab-4ce2-478d-91f0-514d3f53a106.png`
- Prompt direction: Photorealistic luxury cinematic macro still for Gent Reserve Co.’s product workshop. Roasted coffee beans and a small sample bowl on dark green stone, a restrained brass tool, rich obsidian shadows and warm gold side lighting. Substance and craftsmanship, tactile detail, sparse composition with deep negative space on the left for readable copy. No text, logos or fabricated product claims.

## Verification

- ESLint passes.
- All 12 dedicated WebKit checks pass against the production build; all 11 original Chromium chapter checks passed across the initial run and targeted rerun. The added intro handoff was verified in WebKit.
- Applied files were hash-verified in the existing repository; 12 approved hero source/style files were verified unchanged. `git diff --check` passes.
- Production build passes using `npx next build --webpack` in the isolated working copy. The default Turbopack build rejects its external node_modules symlink; this is specific to the review copy.
- Dedicated browser suite: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100 npx playwright test --config=playwright.chapters.config.ts`.
- Tests cover 320, 375, 390, 430, 768 and 1440px widths; forward/reverse scene seeking; native scrolling; product browsing and navigation; reduced motion; Motion Off; no JavaScript; and intro skip handoff.
- Visual captures reviewed in this directory include phone collection/partner/membership scenes and desktop workshop/partner scenes.
- Earlier suites containing `.il-*` panel selectors or the former page-wide pin architecture describe superseded behavior; they were not used as evidence for this pass. The new chapter suite covers the replacement behavior.

The implementation is local and has not been published.
