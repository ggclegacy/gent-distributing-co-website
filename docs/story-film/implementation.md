# Gent product story implementation

The cinematic hero now follows a complete product journey: origin, discovery, development, selection, collection reveal, distribution, arrival and brand resolution. Its authored duration is 45 seconds, including a three-second living hero hold. The timeline has named beats and movement/settle intervals, with a single shared progress signal and global time-scale control.

Legacy Reserve uses the existing coffee artwork. Honey and seasonings use newly generated Gent packaging concepts with preserved transparency. The blank green product blocks have been removed. A physical case opens beneath the composited products; they spread into the collection and pull back as the maker/Gent/retail/hospitality/people diagram assembles. The final act returns to the products and the Gent brand statement.

A dedicated pause/resume control supplements skip, replay and Motion off. Explicit pause survives tab hiding and returning. Reduced motion, renderer failure and saved-session entry expose the completed product collection without waiting through the film. Native no-JavaScript navigation remains available. Existing product availability, membership and downstream content are preserved.

## Assets and concept status

- Original: `public/images/cinema/coffee-object.webp`.
- New: `public/images/story-film/gent-honey.png` and `gent-seasonings.png`.
- Exact generation prompts and method: `image-prompts.md`.
- Product and packaging images are concepts, and the distribution diagram is a business vision rather than live shipment tracking or established national coverage.

## Review

Run the development server and use `scripts/story-review.cjs` for named desktop/mobile scene captures. The development-only frame event is omitted from production behavior. `playwright.storyfilm.config.ts` covers complete playback, all eight story states, final hold, pause ownership, mobile skip/replay, reduced motion, direct entry and no JavaScript. Playwright records the complete checked journeys under `test-results/`.

## Validation results

- Three focused Chromium journey tests passed, including uninterrupted story completion, explicit pause ownership, final hold and delayed CTA, mobile replay/skip, reduced motion, no JavaScript and direct hash entry.
- Desktop and phone scene captures produced no browser errors.
- Additional 320×568 and 844×390 layout captures checked overflow and compact controls.
- The full checked journey is saved as `full-journey-review.webm` (includes pause/resume testing and final navigation).
- Physical-device Safari was not tested.
