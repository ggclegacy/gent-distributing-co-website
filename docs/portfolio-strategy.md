# Gent Distribution Co. — portfolio strategy

Current positioning, September 7, 2026. This guide and brand-voice.md supersede earlier copy in historical visual-verification and hero concept notes.

Gent is a modern premium multi-category distribution house that discovers, develops, curates and distributes exceptional goods. Lafayette / Acadiana is its origin, identity and relationship advantage. Louisiana remains an important source, never a sourcing or category restriction. The standard determines what belongs in the network.

## Launch and expansion

The homepage focuses on four provisions previews: coffee, honey, seasonings and sauces. All remain in development, with no ordering or enrollment simulation. The former collection URL is preserved as an editorial overview, removed from the launch tabs. The house page explains the three business layers and future direction; future category names are not empty navigation destinations.

`src/lib/portfolio.ts` separates category, brand, business layer and customer audience. The category registry includes provisions, grooming/personal care, wellness/performance, apparel/goods, watches/accessories, home/lifestyle and hospitality/commercial. New categories can be registered without altering the page templates. Hospitality can also be an audience for products in other categories.

`src/lib/catalog.ts` separates those dimensions from subcategory, provenance, availability, editorial visibility, homepage feature status and visual presentation. A planned product is excluded from public lookup, generated routes, featured products and category discovery. An explicitly public preview is labeled as development content. Adding a registry category alone never produces a storefront link. `getVisibleCategories` is the source for future category navigation; do not enumerate the whole registry into a menu.

The explorer reads labels and visuals from each featured product, with responsive wrapping rather than a four-column dependency. Every product route uses the same template. New categories can use the neutral editorial visual until approved imagery exists; category names must not choose packaging. No real third-party product should receive Gent packaging by default.

Business layers are Gent-developed/private-label, represented/distributed brands, and selected wholesale/resale goods. These do not imply exclusivity. Unknown relationships remain unset. Groomed Gent Co. is registered as planned and described as a future direction, not a current Gent storefront offering.

## Provenance

The owner identified honey as U.S.-sourced outside Louisiana. That is the only confirmed geographic product fact introduced here; the exact state and producer remain unannounced. Coffee origin remains pending even though Gent is the brand. Company location, brand ownership, production origin and ingredient origin must not be conflated. Before release, add the actual producer, origin, formats, ingredients/materials, price and terms. Never infer origins or certifications from a category or company address.

## Cinematic narrative

Preserve the live Louisiana sculpture, interactive craft/business/customer destinations, route wake-up and six-scene GSAP sequence. The opening becomes “Rooted here. Built to move further.” The second narrative beat widens to new categories and origins; the regional sculpture resolves into the latest three outcome stories: care for craft, opportunity for business and everyday favorites. Their copy broadens the story to outside origins and future categories. This is a vision illustration, not a coverage map. Mobile, reduced motion and no-JavaScript visitors receive the same meaning in the origin story.

## Metadata and operations

Shared brand metadata and Organization structured data describe Lafayette as company location, with no geographic service-area or product-origin implication. No Offer schema, inventory, reviews, partner roster or exclusivity is invented. Existing Shopify infrastructure is preserved; enabling real commerce requires the integration work already recorded in README.
