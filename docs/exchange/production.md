# THE EXCHANGE

The homepage now renders its opening as a lazily loaded React Three Fiber / Three.js scene. The existing GSAP film remains the single scroll owner. `exchangeSignal.progress` is normalized 0–1; it drives every camera, component, product, light and caption. Existing later scenes, catalog, membership, navigation and commerce behavior are retained.

## Direction and timing

The opening lasts 12 authored timeline units. Mobile uses nine viewport heights of native scroll; desktop retains the shared full-site timeline. No wheel/touch interception or snapping is added. The film is reversible and uses demand rendering: stationary scroll does not keep rendering. Mobile portrait, tablet and desktop have separate camera tracks in `src/lib/exchange-film.ts`.

- 0–.08: macro artifact, light discovering the metal.
- .08–.17: Lafayette origin and engineered recognition.
- .17–.28: staggered depth separation of armor, chambers, rings and connectors.
- .28–.55: coffee, personal care and wellness close-ups; other categories remain in depth.
- .55–.64: physical outbound channels toward businesses, retail, hospitality and customers.
- .64–.73: editorial collection with different depths and scales.
- .73–.84: sequenced chambers, ring alignment, gold seams and final core seating.
- .84–.94: campaign composition and “Rooted here. Built to move further.”
- .94–1: the camera passes through the open core. Desktop directly reveals the existing Scene 02 through a narrow aperture; mobile uses the same Scene 02 environment as an arrival frame before native document flow resumes.

`?animatic` renders gray materials for camera/choreography review. This is a review switch, not a user-facing mode.

## Model contract

The supplied geometry is procedural, not a final commissioned Blender asset. Products are packaging/category concepts, not assertions of a launched six-category catalog. Coffee remains the first release in the unchanged collection section.

Hierarchy: `exchange_root` → `core` → `monogram`; `outer_armor`; `inner_ring`; `distribution_ring`; `category_provisions`, `category_personalcare`, `category_wellness`, `category_pantry`, `category_apparel`, `category_accessories`; `connector_0` through `connector_5`; `gold_channels`. Products have `product_0`–`product_5` anchors. Units are meters, front is +Z, up +Y, and the spindle is at the origin.

To replace the mechanism set `NEXT_PUBLIC_EXCHANGE_GLB` to a same-origin public GLB URL. `exchange-assets.ts` validates required named nodes before applying any replacement; visuals sit beneath existing animation pivots. Export each node at its intentional local pivot with applied scale. Include `monogram` so portal visibility remains controlled. Keep a clear central aperture. Failed optional asset loads retain the procedural scene. Meshopt-compressed GLBs are supported without an external decoder service. Draco and KTX2 are not configured because this pass has no asset requiring them; do not add network decoder dependencies without a measured need.

Products are isolated in `createExchange` and can be replaced at their named anchors without changing choreography. Product label textures and material grain are generated locally, with no third-party font or image request. Future final assets should bake restrained brushed-metal roughness, product paper creases and approved packaging text, with 1K mobile texture atlases and 2K hero maps only where macro inspection justifies them.

## Fallback and lifecycle

Desktop uses a maximum DPR of 1.5. Standard/mobile reduces ring segments and indices and caps DPR at 1.25. Neither tier uses expensive postprocessing. Reduced motion, saved Motion Off, Save Data and reported device memory <=2GB use the pre-rendered campaign and native HTML. Render errors/context loss also restore the readable campaign and remove cinema pinning. Switching motion destroys the optional canvas; effect cleanup removes the signal subscriber and context listener, and disposes geometry, materials, textures and the PMREM environment. The photo fallback is generated from the actual campaign pose and has separate landscape/portrait framing.

The existing source repo is `/Users/neilstutes/Desktop/gent-distribution-co-website`, remote `ggclegacy/gent-distributing-co-website`. Its existing uncommitted later-scene work was included in the working copy and must remain untouched by a broad reset or commit. There is no local `.vercel` project link or Sites hosting config. This change does not imply a public deployment.
