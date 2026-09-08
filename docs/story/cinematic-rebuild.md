# The Gent film

This is a scene rebuild within the existing Next.js/GSAP homepage, not a new site. Navigation, product routes, catalog tabs, membership route, and prelaunch restrictions remain intact. The mechanism-first hero and its bounded atmospheric rendering are preserved from the completed hero revision.

## Visual story

1. **The Machine:** the existing proprietary mechanism awakens over 6.8 mobile viewports with damped, reversible counter-rotation, category unlocking and Lafayette expansion.
2. **The Standard:** a consumer-product development table, ingredient samples and packaging prototypes; separate formulation and packaging trackers; five criteria groups progress into advance/evaluate outcomes. No numeric scores or commercial metrics are fabricated.
3. **The Collection:** ten visible product categories in a product-library setting. Legacy Reserve is the first owned concept. Partner product forms use distinct packages; the portfolio HUD distinguishes owned concepts from future maker relationships.
4. **The Network:** mixed-product Gent totes and purposeful inspection/packing. A scroll-owned route grows from Lafayette through Acadiana, Louisiana and the Gulf South toward national reach. Barbershop, specialty retail, wellness, hospitality and customer channels appear sequentially.
5. **The Exchange:** makers demonstrate products to buyers and customers; identities connect product discovery to retail. The existing closing invitation remains an editorial coda in the same environment.

## Composition and motion

Eight original photographs were generated with built-in image_gen: four 1536×1024 landscapes and four separately composed 1024×1536 portraits. `picture` and `getImageProps` select the portrait only for small portrait devices; no desktop center-crop supplies a phone image. Optimized WebP originals total approximately 1.4 MB; a device selects four scene images, not all eight. Nearby scenes warm through the existing image decode mechanism.

Tracking graphics are DOM text and CSS lines on the same camera plane as the photograph. They are intentionally quiet and decorative. The photo descriptions remain accessible. Scene copy is server-rendered. The camera moves only a few percent on phones, and data emerges in a reversible GSAP timeline without timers, React frame updates, or an independent animation loop. Reduced motion and paused motion return to native document flow.

The oversized floating coffee, membership card, traveling case cutout and arbitrary chart bars are removed from the homepage. Physical contact points now stay within the photographs. The existing detail-page environment remains unchanged.

## Art limitations and status

These are photographic concept environments, not a claim that the depicted facilities, network, maker partnerships or product range currently exist. Scene footnotes and HUD labels state this. Packaging is illustrative; small generated print is not production label artwork. The gallery uses individual foreground stone product plinths rather than ten occupied background niches.

Exact generation prompts are in `image-prompts.json`; source inspection notes are in `image-inspection.md`. Final image assets live in `public/images/story/`.

## Verification

Run `npm run lint`, `npm run build -- --webpack`, and the browser tests against a running preview. `playwright.story.config.ts` isolates the scene suite for Chromium and WebKit. The default Playwright suite retains hero, portfolio and cinema regressions.
