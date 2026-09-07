# Cinematic homepage

The premium black, metallic gold, and deep green design remains the foundation. The opening changes from a scrolling illustration to a camera-directed portal, followed by distinct acts using the existing DOM, SVG, and CSS product artwork.

## Research and decisions

- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) supports native-scroll pinning, reversible scrubbed timelines, and refreshed measurements. The implementation uses native viewport scrolling with a short 0.35-second scrub catch-up. No wheel/touch interception, smooth-scroll replacement, snapping, or WebGL runtime.
- [GSAP matchMedia](<https://gsap.com/docs/v3/GSAP/gsap.matchMedia()>) automatically reverts scoped animation state when responsive conditions change. The scene owner also reverts on route unmount and motion-preference changes.
- The installed Next.js 16.3.4 server/client component guide recommends narrow client boundaries. Homepage copy, headings, and commerce links remain server-rendered. Only the optional choreography is dynamically imported after hydration and when motion is enabled.

## Story beats

1. **The open door → the Gent standard:** a pinned camera approach into the existing portal, outgoing typography, a soft gold light bloom, then the standard appears on the same stage. Desktop distance: 2.3 viewport heights.
2. **The collection:** a center-out display reveal and lateral heading movement. The animation finishes as the section enters the viewport; product tabs and links retain their independent keyboard and pointer behavior.
3. **Makers:** a pinned SVG route drawing, emerging nodes, and a gentle map orbit. Desktop distance: 1.05 viewport heights.
4. **Membership:** a pinned perspective turn of the existing card with a gold reflection passing across its surface. Desktop distance: 0.95 viewport heights.
5. **Come in:** a rising oversized wordmark behind the final invitation, returning to unpinned document flow.

## Ownership and extension

- `src/components/scene-motion.tsx` owns lazy loading, preferences, cleanup, and the persistent skip/motion controls.
- `src/lib/cinema.ts` owns choreography. Its scoped `timeline` primitive standardizes pinning, scroll distance, easing, and refresh behavior. Each act uses its own local selectors and timeline; do not animate one property from multiple timelines.
- `.opening-act` holds both opening scenes. `[data-cinema-ready]` enables enhanced layout only after the engine is ready; the default layout remains readable without JavaScript or when the optional chunk fails.
- The existing motion control broadcasts preference changes so the fixed and footer controls stay synchronized. Turning motion off removes all pin spacers and restores normal layout rather than merely freezing the animation.
- Chapter links use native anchors with enhanced scroll destinations for pinned acts. Browser history and direct hashes remain supported. Motion controls and collection skip are always available.

## Responsive and accessibility behavior

Full staging requires at least 1000px width and 760px height. Smaller viewports use one short hero pin (0.65 viewport heights), lighter transforms, and document-flow content for all later acts. Resizing between modes reverts and rebuilds timelines.

Reduced-motion preference, including a live OS change, disables the motion engine. A session preference can also disable it. No JavaScript still exposes all story text, the initial product, navigation links, and product-detail links. Product category switching requires JavaScript as before.

## Performance and asset needs

The existing portal is approximately 78 KB; no new raster assets, video sequences, canvas, or 3D dependencies are added. The opening asset retains its eager loading for first paint. GSAP and the scene module are deferred to an optional chunk; reduced-motion visitors skip it. The existing product tilt and CSS packaging remain intact. Do not add per-frame React state updates or extra full-screen blur layers.

No new asset is required for this implementation. Future upgrades could use approved final product photography and real maker/location imagery. The current packaging and membership card remain concepts; do not imply they are final products. Higher-resolution layered portal imagery could improve close-up realism if later needed. Any video or image sequence should have a static poster, a mobile budget, and a measured benefit before inclusion.

## Verification

Run `npm run lint`, `npm run build`, and `npm run test:e2e`. Install the browser once with `npx playwright install chromium`. The test suite reuses a running local app or starts one on port 3000.

Nine browser regressions cover reversible desktop camera staging, chapter navigation, keyboard category selection and product routes, route cleanup, persistent and synchronized motion controls, live reduced-motion changes, mobile/landscape and responsive resize, direct links, and no-JavaScript content. Desktop and mobile screenshots are written to ignored `test-results/` when those tests run.

Visual checks use desktop 1440 × 900 and mobile 390 × 844. Automated viewport checks additionally include 844 × 390. Browser emulation does not replace physical low-end Android/iOS device profiling; no frame-rate or Core Web Vitals score is claimed.
