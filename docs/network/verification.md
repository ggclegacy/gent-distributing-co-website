# Gent Network verification

The entrance was implemented against commit `715682d`, then integrated with the concurrently authored Gent Intelligence Layer. Changes are scoped to the hero, its directors, transition wiring, static posters, geographic assets and acceptance tests. Catalog/commerce data and unrelated downstream work were preserved.

## Checks

- `npm run lint`: passed.
- `npm run build`: passed, including TypeScript and all 11 generated routes.
- Chromium: all **49 unique scenarios passed** across the initial suite and targeted reruns. Earlier navigation and renderer-creation defects were corrected. Timing assertions now measure elapsed time instead of assuming instant software-GPU input processing. No-JavaScript product navigation is verified through keyboard activation.
- WebKit: **21 passed**, one Chromium-only CDP touch test skipped, against the final production build.
- Visual review: actual renderer frames at 390×844, 768×1024 and 1440×900; browser layout checks additionally cover 320×568 and 2560×1080. Matching static posters are exported from the scene.

Coverage includes one-shot Activate, readiness gating/watchdog, 10.5-second automatic completion, time authority under wheel/native touch, Skip/focus/scroll restoration, Replay, completed-session deferred rendering, resize/orientation, no-layout-jump handoff, downstream ScrollTrigger authority, dormant/completed GPU settling, navigation, Motion Off, reduced motion, Save Data, weak-memory devices, WebGL creation failure and context loss. Existing downstream intelligence, membership, catalog and product journeys are included.

## Reproduce

Run the production build with `npm run start -- --port 3087`, then:

```sh
PLAYWRIGHT_BASE_URL=http://localhost:3087 npx playwright test -c playwright.network.config.ts
```

The config deliberately does not start another server. It uses one browser worker to avoid distorting authored timing with competing software GPU workloads. `NETWORK_REPORT` can select a JSON report destination. Chromium handles native CDP touch; that one browser-specific test is skipped in WebKit.

For art review, run a development server at port 3077 and `node scripts/network-frames.mjs`. Production does not expose the frame-seeking review parameter. The captured frames are in `docs/network/frames/`.

## Limits

Physical iPhone hardware, sustained real-device frame rate and real-world network LCP are not benchmarked by desktop browser emulation. The initial dormant posters are approximately 8 KB portrait / 12 KB landscape and render independently of WebGL. Final geometry is procedural Three.js with a validated same-origin GLB replacement contract; no commissioned Blender asset is claimed. No deployment is included.
