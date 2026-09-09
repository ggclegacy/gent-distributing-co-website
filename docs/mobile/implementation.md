# Mobile cinematic presentation

The mobile entrance now becomes an immersive portrait presentation after “Enter the Experience.” The existing 45-second score, narrative, desktop camera keyframes, and desktop layout are preserved.

## Implementation

- The cinematic root fills the dynamic viewport with a fixed, opaque layer above the site. It remains mounted in the same React tree, preserving WebGL state and playback continuity.
- The presentation helper hides and makes surrounding content inert, neutralizes ancestor containing blocks, preserves the original page space, traps keyboard focus inside the cinematic, and restores those changes on exit or unmount.
- Fullscreen is requested directly from the activation/replay gesture where the standard API is available. Missing support or a rejected request leaves the fixed overlay working. Native fullscreen exit also ends playback. No orientation lock is requested.
- The existing IntroDirector remains the sole owner of scroll locking and the 45-second timeline. Completion, skip, Escape, reduced motion, and renderer failure use the existing completion path. The mobile helper restores the page and sends focus to its explore link.
- Portrait camera distance, vertical offset, projection FOV, national-network scale, and transport positioning are authored independently. Short phones receive an additional vertical framing adjustment so Louisiana clears the caption.
- React Three Fiber measures the actual Canvas container. Zero resize debounce responds to viewport/fullscreen/orientation changes; the camera aspect and projection matrix update from those measured dimensions. Portrait horizontal coverage stays consistent across tall phone proportions.
- Mobile scene layouts use a top caption area, a large central subject, readable product information, and a bottom control area. The distribution sequence becomes a vertical maker → Gent → channels → people composition. Product labels that would shrink with image transforms are omitted during immersive playback; the main narrative retains readable labels.
- `viewport-fit=cover` and safe-area-aware caption/control offsets keep essential content clear of device cutouts. Text zoom is not disabled. Mobile entry buttons remain at least 72px tall with at least 14px label text.

## Verification

The browser suite is `tests/mobile-cinematic.spec.ts`, configured by `playwright.mobile.config.ts`. It covers 320×568, 360×800, 375×812, 390×844, 393×852, 412×915, and 430×932, plus landscape rotation and shorter viewport heights. It also checks entry, rejected-fullscreen fallback, inert background, minimum text size, viewport bounds, skip, replay, Escape, scroll restoration, full natural completion, reduced motion, simulated WebGL context loss, and desktop presentation.

The 390px case additionally tests keyboard focus containment and simulated 47px top / 34px bottom safe areas. These simulations complement browser engine testing; they do not replace testing on a physical iPhone with browser chrome and a notch.

`npm run build -- --webpack` and TypeScript checking passed. The isolated review copy uses Webpack because its dependency directory is linked to the main project, which Turbopack rejects outside its filesystem root. This is a review-environment choice; the website’s build scripts and dependency versions were not changed.

Run visual capture separately with `node scripts/mobile-review.mjs` while the development server runs on port 3101. Final scene captures are in this directory. The script samples the development-only cinematic seek interface; production does not expose that interface.

A development-cache error during a concurrent production build and browser review interrupted an intermediate batch. The isolated development cache was reset before final verification. Screenshot capture in Chromium was also slow, so scene capture and functional assertions are separate.

## References

- [Fullscreen request behavior and rejection conditions](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen)
- [React Three Fiber Canvas sizing](https://r3f.docs.pmnd.rs/api/canvas)
- [React Three Fiber measured size and camera state](https://r3f.docs.pmnd.rs/api/hooks)

No publication or production deployment is part of this change.
