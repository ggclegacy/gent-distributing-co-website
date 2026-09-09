# Gent Intelligence Layer

The approved main hero and its WebGL assets remain unchanged. Four post-hero scenes now share a foreground smoked-glass interface over the existing responsive photographs.

## Architecture

- `src/lib/intelligence.ts`: typed editorial phase records. Process principles, product development status, conceptual distribution relationships, and proposed membership benefits are explicit; no simulated live business metrics.
- `src/components/intelligence-scene.tsx`: shared shell, phase controls, semantic records, product reveal, process seal, network and credential. Every phase can be selected using native keyboard/touch buttons. The existing product explorer is available through “Explore all categories.”
- `src/app/intelligence.css`: responsive glass composition, depth, process and route indicators, and short-screen fallback.
- `src/lib/cinema.ts`: existing desktop film sends phase progress through a scoped scene event. Hero playback and its timing are preserved. Native scenes own their lightweight, intersection-gated scroll sampling, with no additional GSAP pins.

## Motion and accessibility

Desktop uses the existing single film owner. Native layouts use a modest sticky interval only when the entire interface fits the viewport; taller interfaces use document flow. Upward scrolling reverses phase progress. Motion off and device reduced-motion preferences stop decorative transforms and scroll-driven phase changes while keeping phase buttons available. No-JavaScript rendering exposes every record. Effects, observers and listeners clean up on unmount.

## Truthful content

Legacy Reserve origin, roast, format and release details remain unannounced. Orders and membership enrollment are not open. Membership benefits are planned or under consideration. Gulf South and national expansion are labeled ambitions. Existing portrait and landscape environments and coffee artwork are reused.

## Verification

Regression coverage in `tests/materials.spec.ts` includes phone, tablet, landscape and desktop compositions; all phase controls; product and membership navigation; motion reversal and cleanup; and no-JavaScript records. Existing product navigation tests now open the category index before selecting a category.

### Final validation

- Production build, ESLint, TypeScript and whitespace checks passed.
- All 38 Chromium regression checks passed across the full production run and two corrected-test reruns. This includes all original hero sizes, orientation changes, portal handoff, motion persistence, category/product navigation, all six responsive intelligence layouts, phase reversal, and no-JavaScript access.
- Three WebKit checks passed: 390px and 430px phase/product/membership interactions, and no-JavaScript access.
- Headed Chromium was used for the final production checks because the headless software WebGL renderer caused resource-related timeouts. Test readiness now waits for the measured film range, and the no-JavaScript link check uses native keyboard navigation.
- Local production review: http://localhost:3013/#philosophy. No remote deployment or Git push was performed.
