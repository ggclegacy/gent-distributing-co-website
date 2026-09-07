# Acadiana Network hero

Replaces the tree photograph in the existing homepage, retaining Gent's current premium typography, navigation, copy, palette, collection links, and remaining scenes.

## Artwork

Server-rendered SVG relief with 30 contour bands, recessed waterways, six brass distribution paths, raised destination blocks, and an illuminated Lafayette source. This is an abstract geographic interpretation, not survey elevation or a claim about current delivery coverage. The relative arrangement of the Vermilion, Bayou Teche, and the Atchafalaya Basin follows the [USGS Louisiana basin map](https://pubs.usgs.gov/fs/fs-019-99/pdf/fs01999.pdf). Relief height and routes are art-directed.

A short arrival sequence reveals terrain, ignites Lafayette, draws routes, and sends two passes of light along them. The movement then settles; no perpetual rendering loop or added 3D dependency is used. The previous 260 KB source photograph is no longer imported or preloaded by the hero.

## Scroll and fallbacks

Desktop uses the existing single GSAP/ScrollTrigger playhead. The camera advances toward Lafayette and expands its node into the origin-story aperture; the remaining scene sequence, hash links, navigation, and reverse scrolling remain intact.

Phones and tablets retain the site's existing native document flow, with a bounded camera descent and node expansion. Short landscape viewports use the static composition. Reduced motion and the existing Motion off control remove scroll enhancement and leave the complete artwork, all routes, and all content visible. SVG is server-rendered and remains available without JavaScript or WebGL.

## Verification

Production build, TypeScript, ESLint, and the browser suite cover the connected desktop stage; deep links; next/previous and collection navigation; product interactions; 320, 390, 768, and 1440 pixel layouts; mobile scroll camera; resize cleanup; motion toggling and persistence; system reduced motion; and JavaScript-disabled content.

The mobile tests previously asserted a pinned stage even though the premium implementation already disabled mobile pinning. These expectations now check natural document flow, visible content, and the lightweight camera behavior.

Implementation lives in src/components/acadiana-terrain.tsx, src/components/acadiana-hero.tsx, src/app/acadiana-network.css, and src/lib/cinema.ts. Styling is loaded after premium.css. No production deployment is performed by this change.

Mobile history regression fixed: the persistent collection shortcut and hero scroll cue now use Next Link. A native hash anchor created a null history state, causing Back from product details to update the URL without restoring the homepage. The browser suite verifies the complete journey.
