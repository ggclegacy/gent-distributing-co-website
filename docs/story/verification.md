# Verified cinematic rebuild

- Production build: `npm run build -- --webpack` passed (all 11 generated pages).
- Lint: `npm run lint` passed without warnings.
- Full production browser regression: **66 checks passing** after merging the final hero revision (65 passed in the full 4.3-minute run; one inherited timing expectation was updated for the longer opening and passed on a targeted rerun), Chromium and WebKit. Command: `PLAYWRIGHT_BASE_URL=http://localhost:3251 npx playwright test --workers=2 --output=production-merged-results`.
- Scene coverage at 320, 390, 768 and 1440px: distinct portrait/landscape source selection, loaded images, zero horizontal overflow, product tabs, detail links, membership navigation, paused/reduced-motion flow.
- Hero coverage: 320×568, 375×667, 390×844, 430×932, 768×1024, 1024×768, 1440×900; 6–8-screen portrait runway, reverse transforms, resize cleanup and reachable controls.
- Scene navigation and direct fragments: visible scene, accessible focus, no stale inert content, no blank stage gaps.
- Scene-specific animation: Lafayette route progress reverses; vault bays reveal; lab criteria are present.
- JavaScript disabled: scene photographs and native product links remain usable; keyboard navigation verified in both engines. Chromium's automated mouse stability check stalled in the no-script context despite identical measured link rectangles, so the fallback test uses native keyboard activation.
- Visually inspected eight source images plus desktop and phone screenshots for all four replacement scenes. Revised desktop vault plane preserves all ten product forms within the composition.

These are local browser simulations, not physical iPhone or production network measurements. Images are concept environments, and generated microprint is not final packaging artwork. No deployment or remote publication was performed.
