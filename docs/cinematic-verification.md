# Cinematic homepage verification

Verified 7 September 2026 against local production builds.

## Automated checks

- `npm run build`: passes, including TypeScript and all 11 generated pages.
- `npm run lint` and `git diff --check`: pass.
- Complete regression suite: **36 passed** against the production build.
- After the final advance-image-loading change: **8 material-scene tests passed again** in Chromium and WebKit.
- WebKit iPhone 13 profile: 390×844, DPR 3, mobile viewport, touch input and iOS user agent. Menu → collection → honey detail → return, workshop, arrival card and membership route all pass without page errors.
- Responsive visual matrix: Chromium and WebKit at 320, 390, 768, 844 landscape and 1440 pixels; four post-hero scenes each. **40 scene checks, no horizontal overflow, no page errors.** The broader regression suite also covers 1024px desktop.
- Checked direct hashes, reversible scrolling, active-scene keyboard focus, previous/next controls, product keyboard tabs, motion-switch persistence, responsive cleanup, reduced motion, JavaScript-disabled narrative, catalog provenance and existing routes.

## Performance sample

Local production build; Chromium with a 390×844 mobile viewport at DPR 3, cold cache, 4× CPU slowdown, 1.6 Mbps download and 100 ms latency:

| Measurement | Result |
| --- | ---: |
| First contentful paint | 1.464 s |
| Largest contentful paint | 2.980 s |
| Cumulative layout shift | 0 |
| Initial resource transfer (resource entries, excluding main document) | 304,062 bytes |
| Scene image requests during initial sample | 1 |
| WebGL/canvas elements | 0 |

The first immediate jump-and-scroll sample included image decoding: median frame interval 33.3 ms, p95 283.3 ms. This is recorded rather than hidden; rapid cold jumps on constrained devices can still stall while decoding assets.

With the archive images loaded, a separate two-second scrolling sample measured:

| CPU setting | Median interval | p95 interval |
| --- | ---: | ---: |
| Native host speed | 16.7 ms | 16.7 ms |
| 4× CPU slowdown | 16.7 ms | 33.4 ms |

This demonstrates approximately 60 fps steady-state on the test host, with occasional slower frames under heavy CPU simulation. It does **not** establish sustained performance, battery usage or thermal behavior on physical iPhone hardware. A physical iPhone Safari pass is still recommended before production promotion.

## Review evidence

See `cinema-review/` for selected desktop scenes, fully loaded iPhone captures, the 40-check matrix and raw performance measurements. Generated asset prompts and provenance are documented in `cinematic-image-prompts.json` and `cinematic-homepage.md`.

The approved Origin component and its interactive sculpture remain unchanged relative to checkpoint `6052937`. The implementation uses the existing GSAP stage and server-rendered content, with no additional animation/runtime dependencies.
