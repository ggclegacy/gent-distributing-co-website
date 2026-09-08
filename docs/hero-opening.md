# Gent Exchange opening

The existing SVG mechanism now leads the homepage above the fold. A centered, responsive sculpture occupies approximately 60–65% of a portrait phone's width; a smaller two-line headline and short introduction support it below. Category buttons are retained in a keyboard-operable native disclosure, preserving category selection and live descriptions without crowding the opening.

## Motion

The GSAP system remains the sole scroll playhead. The 8.45-unit opening occupies approximately 7.2 viewport heights on desktop and 6.8 pinned hero heights on portrait mobile. The final fully revealed composition holds before the existing origin interlude and subsequent scenes. Short screens below 600px remain in native flow.

The sequence progresses through Lafayette ignition, core illumination, slow counter-rotation (+52/-68 degrees), staggered housing unlock, aperture separation, six independently emerging category silhouettes, and outward distribution routes. Released products live outside the panel clip paths. Mobile has its own scale, separation distance, and 0.65-second damping. Desktop uses the existing one-second damping. Captions support four chapters without crowding the mechanism. Future categories remain explicitly described as a vision rather than currently available inventory.

A terminal hold provides room for the damped pose to settle during ordinary scrolling. This is native scroll, not a forced movie playback: a deliberate jump or extreme fling can still skip narrative time. The entire sequence rewinds through the same timeline. No wheel/touch interception or artificial input locking is introduced.

Obsidian, brushed edges, gold and green gradients, and shadows retain the original emblem identity. A nine-second CSS opacity breath adds restrained idle light inside a bounded 240px layer. Oversized masked environment layers, screen-blended reflections and the inherited moving SVG drop-shadow filter are disabled; the sculpture retains its vector cast shadow and material gradients. The sequence adds no dependencies, image assets, WebGL context, canvas, or per-frame React state. Dust/grid/transit decorations are hidden in the opening. Desktop idle atmosphere pauses beyond the first scene.

## Accessibility and browser behavior

The server-rendered first frame is visible before JavaScript. System reduced motion and the existing persisted motion control remove pinning and reveal the full document. Native disclosure, touch-sized category controls, focus outlines and live category descriptions remain available. Existing scene keyboard navigation, deep links, product tabs and detail routes are preserved. Small viewport height units stabilize iOS browser toolbar layout. The mobile pin is removed and reconstructed by the existing responsive GSAP context.

## Verification

Production build, TypeScript, lint, browser screenshots and automated interaction coverage accompany this revision. Hero regression tests cover first-frame hierarchy, pin runway, category keyboard input, scrolling backward, origins navigation, reduced motion and orientation/breakpoint cleanup. Chromium and WebKit coverage includes phone, tablet and desktop sizes. WebKit is Safari-engine coverage; physical iPhone hardware was not available.
