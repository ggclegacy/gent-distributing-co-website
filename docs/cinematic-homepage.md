# Gent cinematic homepage

## Implementation

The homepage follows Origin → Standard → Product → Distribution → Community, with a short final invitation in the same arrival room. The approved Origin component and its interactive Exchange remain unchanged from the preserved local baseline. Existing navigation, product URLs, partner route, membership route, catalog visibility rules and prelaunch commerce behavior remain intact.

The post-hero experience extends the existing `SceneMotion` / `mountCinema` architecture. There is one desktop stage and one reversible GSAP ScrollTrigger playhead. No Three.js, additional canvas, video, postprocessing stack or rendering dependency was added. Rooms are optimized photographic planes; product, case, card, lighting and foreground architecture are separately composited DOM layers. This is layered photographic cinema, not a navigable 3D model.

### Chapters

- **Maker’s Workshop:** charred timber and walnut, raw coffee, brass scoop, tools, scale and finished pouch. Camera framing advances through Source → Maker → Worth while physical placards catch light. The camera moves toward the finished pouch before entering the archive.
- **Gent Vault:** dark stone, smoked glass, architectural brass light and empty rear plinths. An independently framed Legacy Reserve Signature Blend Coffee pouch sits on the central pedestal. Light activation and a restrained turn reveal the foil. Four keyboard-accessible product tabs and a fifth curated-goods link preserve browsing; unreleased categories are explicitly in development.
- **Distribution:** the archive pulls wider into steel racking, walnut cases and a packing hall, with foreground architecture occluding the transition. A persistent walnut Gent case travels through Maker → Gent → Business → Customer. Engraved-style location plates establish Lafayette → Acadiana → Louisiana → Gulf South → Beyond as roots and growing direction, not an assertion of current delivery coverage.
- **Arrival:** the same case settles on the walnut table beside a separate black-and-gold membership card. Camera movement and card rotation quiet down. Membership stays explicitly in development and links to the existing plans page.

### Responsive and accessible behavior

Phones and short landscape screens use native document scrolling. The workshop and distribution environments remain sticky behind readable, dark-backed content. Every room still receives a bounded scroll-controlled camera/light sequence. No canvas pixel ratio or continuous render loop is allocated. Images are responsive Next.js images with lazy loading, correctly sized for the actual room plane rather than only viewport width. The object contact points share the same 3:2 room coordinates.

Reduced motion and the session motion switch revert the GSAP context, remove desktop pinning and inactive-scene state, and expose the entire static document. With JavaScript disabled, story content and links remain server-rendered. Desktop scene controls support forward/backward stepping, direct hashes and keyboard focus. A WebKit-specific initial hash reconciliation runs after fonts and load settle.

### Routes and assets

Legacy Reserve now uses the approved identity and photographic archive presentation at the existing `/products/gent-coffee` URL. The partner page’s former orbit illustration is replaced by the distribution architecture. Standalone membership card stripe decoration is removed. No ordering, billing or enrollment behavior was introduced.

Production images are in `public/images/cinema/`. They were created with the built-in image generation tool. The exact environment and layer prompts are in `docs/cinematic-image-prompts.json`. Product packaging and environments are concepts, not documentary photographs of finalized goods or actual premises. Generated opaque product backgrounds are excluded at presentation time with CSS silhouettes; source pixels remain intact. Original master images remain in the local generation output directory.

## Verification

See `docs/cinematic-verification.md` for final test results, browser matrix and measured performance. WebKit is automated desktop engine testing with phone-sized viewports; it is not a physical iPhone thermal or battery benchmark.

## Workflow

The existing local Origin/portfolio work is preserved in its own checkpoint commit, followed by the cinematic implementation on `codex/cinematic-homepage`. Old local research screenshots remain untracked; they are not part of the deployment bundle.

Confirmed Vercel project: `gent-distributing-co-website` (`prj_WXUZqouoHwPqKw8RkWbo9xHKtkLs`), connected to `ggclegacy/gent-distributing-co-website`. It uses Next.js and Node 24. The production build generates all existing routes successfully. This change does not require new environment variables. Production promotion remains separate from the review branch.
