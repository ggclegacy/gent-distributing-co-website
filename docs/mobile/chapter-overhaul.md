# Mobile chapter compositions

Continues the existing homepage fullscreen implementation. The new chapter grid applies below 700px and preserves the original desktop containing blocks through `display: contents`.

- Viewport-height minimums use `dvh` with `vh` fallback and safe-area padding. Content can grow for enlarged text.
- The global header and motion control share a compact row; the menu retains collection and other destinations.
- Each chapter has a heading, dedicated subject area, content-sized information card, 44px phase controls and status line.
- The opening beat leads with the large chapter statement. Later beats lead with the phase message. Full opening copy remains in the expandable details.
- Collection products settle centrally between phase transitions. Existing scene assets, desktop movement, native scroll director and reduced-motion records remain intact.

Verification uses `playwright.mobile-chapters.config.ts`. Use `localhost:3101` for this development preview: the Next.js development server blocks the HMR connection through 127.0.0.1, which prevented hydration during the first attempt.

The initial visual sweep sampled all four beats of four chapters at 320×568, 390×844, 412×915, 768×1024 and 1440×900. All 80 frames had no horizontal overflow or out-of-bounds foreground regions after layout corrections. Physical iOS browser chrome has not been tested.

Final checks: all 18 mobile chapter tests passed in WebKit and Chromium, covering six phone sizes plus tablet and desktop. Two existing homepage WebKit smoke tests passed (390px portrait playback and reduced-motion / WebGL failure recovery). ESLint, TypeScript, production Webpack build and git whitespace checks passed. Changes were applied to the existing Desktop repository without replacing prior uncommitted homepage work. No deployment was performed.
