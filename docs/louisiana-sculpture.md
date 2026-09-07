# Louisiana, engineered to move

This supersedes the earlier basin-image hero. The active homepage no longer references the swamp artwork. Implementation remains in the existing Gent website and preserves the surrounding design system, collection, navigation and six-scene film.

## Art direction

A live dimensional Louisiana silhouette: layered obsidian/green body, restrained gold bevel, etched waterways, a moving glass highlight and fine surface markings. Lafayette is the origin; six partner categories illuminate across the state. The form is SVG with CSS perspective and layered extrusion, not a video, raster mockup or WebGL mesh. This keeps it crisp and readable without optional animation.

State geometry is derived from the Census-based US Atlas 3 dataset, with a simple local projection and art-directed route curves. These connections illustrate Gent's direction, not current coverage or confirmed partners. Source: https://github.com/topojson/us-atlas and https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json. License saved as us-atlas-LICENSE.txt. The local outline module is approximately 5.3 KB; no runtime geographic service is needed.

## Scroll film

1. ROOTED HERE. BUILT TO MOVE. State silhouette, precision bevel and Lafayette origin establish the brand.
2. GOOD THINGS. GREATER REACH. The camera rotates toward the surface; gold routes draw, destination nodes illuminate, and finite product pulses travel from the hub.
3. ONE LOCAL ORIGIN. A WIDER HORIZON. The connected state holds as the story expands to relationships and future reach.
4. Camera approaches Lafayette; the outgoing form fades cleanly into Deep roots / New routes, followed by the existing Gent Standard Scene 2.

The sequence reverses when scrolling upward. Phones/tablets retain native scrolling with lighter camera motion and route activation, followed by the existing semantic origin narrative. Desktop interstitial statements are decorative duplicates of that narrative and do not interrupt screen readers. Reduced motion, paused motion, JavaScript failure and short viewports retain the complete static sculpture and document flow. There is no perpetual animation loop or per-frame React state.

## Validation

Production build, ESLint and TypeScript passed. All 22 Chromium browser tests passed, including six-scene reversible scrolling, navigation and product controls, direct scene links, motion preference persistence, no-JavaScript fallback, responsive cleanup, route wake-up/reversal and the two new brand-story beats. After the final spacing-only refinement, responsive/story checks were rerun and screenshots refreshed.

Visual review covers 1440×900, 1024×768, 768×1024, 390×844, 320×667 and 844×390. Production captures recorded zero browser errors and no horizontal overflow. Evidence: sculpture-browser-results.json and sculpture-*.png in this directory. These are browser-emulated viewports, not physical-device or Safari validation.

The previous basin artwork and its historical notes remain as unused design history. No public deployment or GitHub push was performed.
