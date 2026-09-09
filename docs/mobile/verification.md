# Mobile cinematic verification

Verified September 9, 2026 in an isolated copy of the Gent Reserve Co. website.

| Check | Result |
| --- | --- |
| 320×568, 360×800, 375×812, 390×844, 393×852, 412×915, 430×932 | Passed in Chromium and WebKit across verification batches |
| Fixed overlay covers the viewport after entry | Passed |
| Fullscreen request rejection retains the overlay | Passed |
| Surrounding navigation is hidden and inert | Passed |
| Captions and visible UI remain in bounds with readable font sizes | Passed at all seven widths |
| Landscape rotation and dynamic height reduction | Passed |
| Pause, skip, replay, Escape, original scroll position and navigation restoration | Passed |
| 47px top / 34px bottom safe-area simulation at 390px | Passed in Chromium and WebKit |
| Keyboard focus stays inside the cinematic | Passed in Chromium and WebKit |
| Natural completion of the 45-second sequence | Passed in Chromium and WebKit |
| Native fullscreen exit where available, overlay exit otherwise | Passed |
| Reduced motion and simulated WebGL context loss | Passed in Chromium and WebKit |
| Desktop remains in the original page presentation | Passed in Chromium and WebKit |
| Production build (Webpack) | Passed, including static page generation |
| TypeScript and ESLint | Passed |
| Original narrative, timing, camera keyframe data, scene assets, and desktop CSS checksums | Unchanged |

The final clean Chromium batch passed all seven remaining tests. Earlier batches passed its 320/360/375px cases. The first WebKit batch passed all seven widths and natural completion; its final focused checks passed safe areas, fallback behavior, and desktop presentation after the development-preview reset. The desktop WebKit check waits for the document and then asserts the visible, interactive CTA; waiting for every background asset had timed out.

Visual review covered origin, discovery, development, collection, distribution, arrival, and brand resolution at 320px and 390px. The smallest-phone origin frame was adjusted downward to clear the caption, and small labels attached to scaled product images were removed from immersive playback to avoid collisions.

## Review images

- `entry-390.png`: mobile invitation and CTA.
- `review-320-0.035.png`: compact-phone Louisiana composition.
- `review-390-0.18.png`: readable product discovery.
- `review-390-0.71.png`: vertical distribution composition.
- `review-320-0.96.png`: compact-phone brand resolution.

The full scene capture set is included alongside this report.

## Limits

These are desktop browser-engine tests at phone viewport sizes, not physical-device tests. Browser chrome, actual notches, and iPhone Safari hardware behavior still merit a physical-device check. Native fullscreen remains a progressive enhancement; the fixed dynamic-viewport fallback is explicitly tested.

Intermediate test runs encountered slow Chromium screenshots and a transient development-cache/error-overlay issue while building and reviewing concurrently. The preview was reset, code updates were stopped, visual capture was separated, and affected functional cases were rerun. No application code was changed to hide browser errors.

This delivery updates local website source. It does not publish or deploy the website.
