# Gent visual experience: research and implementation

## Direction

An architectural, futuristic product house built entirely from black, emerald green, and gold. Gold-tinted text provides readable contrast without white or parchment panels. The visual language uses precision, scale, material detail, and restraint.

## Research translated into design

- [Apple's iPhone Pro presentation](https://www.apple.com/iphone-17-pro/) organizes its story into product highlights, close material inspection, and focused feature chapters. Gent translates that approach into a cinematic entrance, a focused product theater, a connected-ecosystem chapter, and membership. This is an interpretation of the presentation pattern, not an attempt to copy Apple's identity.
- [Vercel's Web Interface Guidelines](https://vercel.com/design/guidelines) emphasize keyboard support, visible focus, responsive interactions, intentional motion, and performance. Gent's category selector has arrow-key/Home/End navigation, proper tab relationships, and immediate feedback. The menu supports Escape with focus return.
- [web.dev's animation performance guide](https://web.dev/articles/animations-guide) recommends favoring transform and opacity and avoiding animation that repeatedly triggers layout or paint. Gent uses native scroll timelines for the hero, transform-based product tilt, and opacity/transform reveals. The initial visual rebuild added no animation runtime; a concurrent cinematic-motion task subsequently introduced optional GSAP transitions.
- [web.dev's reduced-motion guidance](https://web.dev/articles/prefers-reduced-motion) informs the device preference handling and explicit motion control. Content remains visible and useful when motion is disabled.
- [Next.js font optimization](https://nextjs.org/docs/app/getting-started/fonts) informs the local variable-font setup with preload and fallback handling.

## Implemented

- One palette across home, product routes, membership, navigation, footer, and 404.
- Bespoke AI-generated gold portal and emerald architectural hero, optimized to a 78 KB WebP source.
- Locally hosted Manrope variable font, approximately 24 KB, replacing four 93 KB font files in the active page load.
- Native scroll depth, progressive reveals, pointer-based product tilt, and reduced-motion behavior.
- Four-category product explorer, semantic keyboard controls, and direct product-detail navigation.
- A connected ecosystem illustration and dimensional membership card.
- Server-rendered pages, static product generation, isolated client interactions, responsive image delivery, with the visual baseline adding no runtime dependencies. The concurrent cinema enhancement adds GSAP.

## Boundaries

The site is a prelaunch brand and discovery experience. Product packaging is conceptual. Shopify checkout, real inventory, customer accounts, membership enrollment, and operational distribution systems are separate integrations; this design does not simulate live operations or claim existing scale.

Concurrent brand-copy work is preserved. The latest copy is intentionally independent from this visual and interaction system.
