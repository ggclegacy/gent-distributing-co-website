# Louisiana Network — final verification

Verified September 7, 2026 in the existing Desktop website project. Git origin confirmed as https://github.com/ggclegacy/gent-distributing-co-website.git. Existing unrelated local edits were preserved. No commit, push or public deployment was performed.

- Production build: PASS, all routes prerendered successfully.
- ESLint: PASS.
- TypeScript: PASS.
- Git whitespace check: PASS.
- Final production browser suite: 21/21 PASS (1.7 minutes), Chromium, two isolated test workers, http://localhost:3002.
- Responsive visual review: 1440×900, 768×1024, 390×844, 320×667 and 844×390. No horizontal overflow; readable primary copy and controls. Short landscape uses normal document flow.
- Browser page errors and console errors during the five-viewport production capture: none.
- Verified six-scene forward/reverse scrolling without stage gaps; all direct scene links; scene navigation and active-scene accessibility; collection tabs and product navigation; phone camera descent and responsive cleanup; motion pause persistence; dynamic system reduced-motion changes; no-JavaScript fallback.
- Verified routes progressively draw from Lafayette, reverse on upward scrolling, display completely when motion is disabled, and hide product pulses when paused. Outgoing terrain labels fade away before the origin diagram takes over.
- Visually reviewed opening, route wake-up, origin story and Gent Standard Scene 2. Refined desktop partner-label placement, mobile image-edge blending, origin heading wrapping and bottom spacing.

The first development-server run had one readiness timeout during recompilation; that navigation check passed independently against production and again in the complete final production run.

Performance design: one 172,428-byte WebP environment, responsive image delivery, server-rendered content, lazy optional GSAP motion, no WebGL/canvas dependency, no continuous particle loop and no per-frame React state updates. These are implementation safeguards; no real-device frame-rate or Core Web Vitals claim is made. Browser testing used Chromium viewport emulation, not physical devices or Safari.

## Saved evidence

- louisiana-1440.png, louisiana-768.png, louisiana-390.png, louisiana-320.png, louisiana-844.png
- louisiana-routes-awake.png
- louisiana-origins.png
- louisiana-scene-two.png
- louisiana-browser-results.json
- tests/cinema.spec.ts contains the repeatable regression checks.

Artwork generation method, exact final prompt and asset path: [louisiana-network.md](louisiana-network.md).
