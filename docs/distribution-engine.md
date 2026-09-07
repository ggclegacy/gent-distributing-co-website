# The Gent Exchange

The hero now uses six fitted obsidian housing sections around a selection aperture. Brushed surfaces, recessed gold connections, embedded product glimpses and a structural extension of the Gent G replace the prior watch markings, exposed gears and orbit rings. Gold confluence ribbons and subtle waterways connect the sculpture to the illuminated Lafayette origin.

Scroll behavior: incoming connections draw toward Gent; the housing separates and the aperture opens for selection; the mechanism settles and pulls back as outgoing relationships extend to businesses, retail, hospitality and customers. Category controls illuminate their matching housing recess and explain the opening portfolio versus future directions. The network remains a conceptual expression of the house, not a claim of physical infrastructure.

The implementation preserves server-rendered SVG, layered CSS perspective, event-driven pointer response and the existing lazy GSAP sequence. It adds no dependencies, texture or model downloads, canvas context, or continuous animation loop. Phones retain native scroll. Reduced motion, pause, keyboard interactions and the no-JavaScript narrative remain supported.

Earlier house-caliber screenshots and documentation describe the previous design. Exchange verification evidence accompanies this revision.

## Verification

- Production build, TypeScript and ESLint passed. All 27 homepage/portfolio browser tests passed, including aperture opening and reversal, category-to-housing selection, direct links, all six homepage sections, responsive cleanup, motion controls, reduced motion and no JavaScript.
- Chromium and WebKit inspected at 1440x900, 1024x768, 768x1024, 390x844, 320x667 and 844x390: no page/console errors or horizontal overflow. The final incoming-path fade is a visual-only adjustment, rebuilt and reviewed separately.
- Single-run local unthrottled loading observations: Chromium LCP 800-1580 ms, WebKit 1053-2718 ms; CLS 0-0.018. Approximately 241-249 KB subresource transfer, excluding main HTML. These are diagnostic observations with concurrent testing, not field guarantees. Browser sizes are emulated.
- Existing work was preserved by comparing target files to the pre-edit snapshot. No commit, push or public deployment.

## Cinematic awakening revision

The opening stays still, including pointer tilt, until scroll begins. The shared playhead now immediately banks and turns the whole Exchange, moves the camera closer, separates the six housing sections, opens the aperture further and sweeps a reflection across its face. Reach pulls back after a broad rotation. Layered emerald atmosphere, a perspective floor, horizon arcs, sparse foreground flecks, waterways and route highlights move at different rates to give the scene depth. All effects stop with the scroll playhead and reverse. There are no autonomous particle loops.

The same choreography is scaled for native-scroll tablet, phone and short landscape layouts. Reduced motion and the existing pause control remove the atmospheric motion.

Research: GSAP ScrollTrigger documentation (https://gsap.com/docs/v3/Plugins/ScrollTrigger/) supports a shared scrubbed timeline; web.dev animation guidance (https://web.dev/articles/animations-guide) favors transforms and opacity; reduced-motion guidance (https://web.dev/articles/prefers-reduced-motion) informs the static alternative.

Validation: production build, TypeScript and lint passed. All 28 tests passed across the full run and focused reruns. Two test assertions were corrected: scroll sampling now waits for the existing 300 ms scrub, and matrix comparison allows subpixel rounding. New coverage verifies no idle motion, first-80-pixel activation, housing movement and a return to the initial pose.

WebKit checks at 1440x900, 390x844 and 844x390 confirmed first-scroll activation with no page errors or horizontal overflow.
