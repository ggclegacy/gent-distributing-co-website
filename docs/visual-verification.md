# Immersive redesign verification — 2026-09-06

## Technical and visual checks

- Production build, TypeScript, lint, and diff whitespace checks pass.
- Inspected desktop at 1440 × 1000, mobile at 390 × 844, and narrow mobile at 320 × 740.
- Visually checked portal hero, product theater, maker ecosystem, membership environment, membership page, and product details.
- All backgrounds use black or deep green; gold and pale-gold accents/text carry the brand throughout, including the 404 page.
- Product categories respond to clicks and arrow-key navigation, with correctly associated panels.
- Mobile menu supports Escape and returns focus to its trigger.
- Narrow mobile homepage has no horizontal overflow or clipped headline.
- System reduced-motion mode leaves all reveal content visible and accurately identifies the device-controlled preference.
- Browser error checks reported no errors in the inspected interactions.
- Homepage, membership, and all four products returned 200. Missing-page behavior was verified earlier; a later temporary production-server check encountered a stale chunk after a concurrent rebuild, so that server was stopped. The live development app was then rechecked and returned 404 for an unknown product.

## Performance findings

The visual-rebuild snapshot, before the concurrent GSAP cinema changes, scored the following in the default mobile Lighthouse audit:

| Category       | Score |
| -------------- | ----: |
| Performance    |    70 |
| Accessibility  |   100 |
| Best practices |   100 |
| SEO            |   100 |

FCP: 1.1 s. LCP: 3.2 s. Speed Index: 2.8 s. Total Blocking Time: 1,040 ms. Cumulative Layout Shift: 0.

The machine's benchmark varied materially across runs. Earlier browser captures also had a cropped viewport; the final run explicitly sized the browser window. These are local simulated mobile results, not field metrics or a claim of top-tier production performance. Initial JavaScript execution under CPU throttling remains the main performance concern. Validate again on the eventual Vercel preview and collect field measurements after launch.

Implemented optimizations: 24,836-byte variable font, 77,802-byte WebP hero, high fetch priority, fingerprinted immutable asset URL, static server rendering, isolated client controls, and no added animation runtime in the measured snapshot. A concurrent task subsequently introduced an optional GSAP cinema layer; those newer changes need their own audit. Detailed values are in `performance-summary.json`.

## Scope

The redesign preserves the concurrent merchant-house copy updates. Commerce, payments, membership enrollment, and production hosting are not activated by this visual upgrade.
