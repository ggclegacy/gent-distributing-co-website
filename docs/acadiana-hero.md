# Acadiana homepage opening

The opening establishes Lafayette and Acadiana through a live oak landscape at first light. “Rooted here. Built to move.” leads into a camera approach, a gold Lafayette origin, six drawn regional connections, and local goods shared with the community. The existing collection, makers, membership, and closing chapters remain available.

## Implementation

- Server-rendered `AcadianaHero` keeps content and links available without JavaScript.
- The existing dynamically loaded GSAP/ScrollTrigger system owns the animation. No additional animation dependency, video, WebGL, or animation-driven React renders.
- The integrated master timeline treats landscape and origins as beats inside the opening scene, then transitions to the standard and remaining homepage scenes. The master timeline owns responsive scene navigation and content panning.
- System reduced motion and the existing motion toggle revert the animation and show the complete narrative as normal sections.
- `#origins` seeks the completed route/product reveal. Collection links continue to bypass the opening.
- The six routes illustrate the distribution concept; they do not claim actual delivery coverage or vendor locations.

## Landscape asset

Saved asset: `public/images/acadiana-first-light.webp` (1672 × 941, 266,056 bytes). Generated using the built-in image-generation tool, then encoded to WebP for delivery through Next.js responsive image optimization. It is an evocative brand environment, not documentary photography of a particular landmark.

Generation prompt:

> Use case: ads-marketing. Asset type: photorealistic cinematic homepage background for Gent Distribution Co., a premium locally rooted distribution company in Lafayette, Acadiana, Louisiana. Generate a wide 16:9 landscape, ideally 2560x1440. Ancient sprawling South Louisiana live oak with naturally hanging subtle Spanish moss, huge sculptural trunk in right half, canopy arching over upper frame. A quiet grassy path and a small suggestion of bayou water leading into humid dawn haze, distant cypress trees. First light from center-right catching moss and grass in restrained natural warm gold, deep near-black forest greens and black shadows. Refined premium spirits campaign photography, filmic realistic textures, grounded and atmospheric, not fantasy. Left half has quiet darker negative space for large website headline; enough readable environmental detail, do not crush all shadows. Landscape must still compose gracefully cropped to a vertical view centered on tree. No text, no logos, no trucks, no warehouse, no fleur-de-lis, no Louisiana outline, no tourism cliché, no neon circles or artificial graphics. This is an evocative commissioned brand environment, not a documentary claim of a specific landmark.

## Integrated verification

The master timeline contracts the gold ring into Lafayette, reveals the routes and local goods, then continues into the full six-scene experience. Landscape movement is restrained to preserve image quality. Desktop, phone, compact phone, reversed scrolling, reduced motion, and no-JavaScript behavior are covered by the shared browser suite in `tests/cinema.spec.ts`. See `docs/cinematic-experience.md` for the complete architecture and verification commands.
