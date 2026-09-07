# Continuous cinematic experience

## What changed

The homepage is one persistent camera stage, not independently pinned sections. A single GSAP timeline owns every entrance, exit, and reading interval. The next environment replaces the current environment inside the viewport, so native scrolling never exposes gaps between scenes. Product and membership detail routes retain their focused reading and commerce layouts.

The concurrent Acadiana hero work is integrated: its landscape, Lafayette origin, illuminated routes, and local goods form the opening movement. The full sequence is:

1. **Acadiana / arrival:** camera push into the first-light landscape, departing typography, the Lafayette origin and drawn distribution routes, then the local-goods reveal.
2. **The standard / chamber:** pass from the landscape into layered green arches. The principles occupy the room, then the walls spread and the copy moves toward the camera.
3. **The collection / display:** a horizontal aperture opens into the product theater. Products, tabs, and details remain live DOM controls. A lateral tracking shot carries the display away.
4. **The makers / network:** a foreground column crosses the lens; the connected world arrives from the side. Its center expands into the next room.
5. **Membership / vault:** a circular aperture reveals the card turning into gold light. The card passes the camera as the room departs.
6. **Come in / doorway:** paired doors open into the invitation, followed by the ordinary footer after the film ends.

## Research behind the architecture

[GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) recommends animating children rather than the pinned element and does not support nested pinning. The implementation therefore pins only `.cinema-stage`, with all scene layers inside it. There is no replacement scroller, wheel interception, scroll snapping, or WebGL engine.

[GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()) scopes animations and restores styles when responsive conditions change. [ScrollTrigger getTween](https://gsap.com/docs/v3/Plugins/ScrollTrigger/getTween/) lets direct scene navigation finish the scrub immediately, preventing an anchor jump from waiting for the camera to catch up.

The installed Next.js server/client component guidance supports keeping narrative markup on the server and loading the motion engine only in the narrow client controller. Text, links, headings, and initial product information remain server-rendered.

## Reusable parts

- `src/lib/cinema.ts`: one master film; `enter` coordinates overlapping scene transitions; `hold` allocates reading time and optional camera travel for tall content. Named timeline labels define direct navigation destinations. `#origins` addresses the completed opening narrative.
- `src/components/scene-atmosphere.tsx`: reusable architectural depth, floor, light, haze, and door layers. They are decorative, lightweight CSS rather than additional image/video downloads.
- `src/components/scene-motion.tsx`: deferred engine loading, lifecycle cleanup, progress, scene stepping, skip, and motion controls.
- `src/components/acadiana-hero.tsx` and `src/app/acadiana-hero.css`: authored Lafayette landscape and origin narrative, supplied by the coordinated hero task.
- `data-scene` identifies stage children. `data-active-scene` identifies the current readable act. Only that act is interactive; other scenes are inert and hidden from assistive technology until reached. Previous/next scene buttons and ordinary navigation links let keyboard and assistive-technology users choose a destination directly.

## Mobile and accessibility

Mobile uses the same connected stage with shorter scroll distances and lighter camera transforms. When content is taller than the viewport, its reading interval pans the content far enough to expose the complete copy and controls. Keyboard focus also seeks a visible camera position for off-screen controls.

Screens shorter than 600 CSS pixels use the readable document layout. Reduced motion, the persistent motion-off control, and missing JavaScript also show the full story in document order. Turning motion off removes the stage pin and all inert/hidden state. Browser resize, preference changes, and route unmount clean up animations and listeners.

No new video or WebGL dependency was added. Hidden acts are not painted, motion updates avoid React state, and the animation chunk is skipped for reduced-motion visitors. The Acadiana image is supplied by the hero task; see `docs/acadiana-hero.md` for its provenance. Other environments use CSS/SVG and existing product concepts. Final product and maker photography remain optional future improvements, not blockers.

## Verification

`npm run lint`, `npm run build`, and `npm run test:e2e` are the verification commands. Install the test browser once with `npx playwright install chromium`. `PLAYWRIGHT_BASE_URL` selects an already-running test server.

The browser suite verifies continuous native-scroll travel through all six scenes, one pin throughout, reverse travel, direct scene links, active/inactive accessibility state, scene stepping, category keyboard interaction, product navigation and route cleanup, mobile control visibility, short-screen fallback, resizing, motion preference persistence, live reduced motion, and no-JavaScript content. Screenshots capture each act at desktop and mobile sizes.

Desktop/mobile browser emulation verifies layout and behavior; it does not claim physical-device frame rates or a production Core Web Vitals score.
