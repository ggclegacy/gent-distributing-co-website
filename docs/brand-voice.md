# Gent Distribution Co. — Brand voice

## Foundation
Gent is a modern premium multi-category distribution house. Distribution is the mechanism; trust, discovery, curation, quality, provenance, and relationships are the reason to care. We discover, develop, curate, and distribute exceptional goods through our own products, brands we represent, and carefully selected wholesale/resale goods. Lafayette / Acadiana is our origin, identity, relationship advantage, and an important source of products. It never restricts sourcing or categories. Never imply all goods are Louisiana-made.

Exceptional products and their makers deserve more reach. Customers deserve substance and a clear reason to choose. Good business rests on reputation, relationships, a meaningful handshake, and keeping your word. Premium does not mean pretentious. Local does not mean small. Growth should preserve what makes a product special.

## Voice
Write with humble confidence: capable, curious, grounded, disciplined, and warm. Think a sophisticated merchant who knows the goods and welcomes you in. Southern hospitality lives in the welcome, not a forced dialect. Masculine luxury comes through restraint and standards, not exclusivity or superiority.

Use short, intentional sentences and concrete nouns. Name the product, person, place, or decision whenever facts are available. Pair an evocative headline with supporting copy that explains something. Keep the black, gold, and deep green scene-based experience; let the copy give it substance.

Avoid corporate logistics jargon, startup promises, empty luxury adjectives, invented heritage, and ornate prose. Do not imply years of history, confirmed makers, origins, certifications, taste profiles, scarcity, shipping dates, or membership benefits without evidence.

## Messaging hierarchy
- Hero: “Rooted here. Built to move further.” State what Gent does immediately beneath it. This is the primary brand line, not a refrain for every section.
- Our standard / story: explain why the house exists and how trust is earned. The three questions are “Know where it came from. Know who made it. Know why it’s worth having.” Use them as an editorial test, not decorative repetition.
- Coffee / collection explorer: introduce the first Gent-owned product. Explain what is in development and what buyers will know before release.
- Collection: launch with provisions previews; introduce future categories only when there is real content to explore. Each product needs its own reason to belong.
- Makers and partners: more reach with the product’s identity intact. Explain storytelling, commerce, relationships, and distribution in human terms. Do not invent a partner roster or contact route.
- Membership: connection and discovery first. Planned benefits must read as proposals until approved. State enrollment status clearly.
- CTAs: name the destination or action: “Explore Gent Coffee,” “See the membership plans,” “Get to know our standard.” Use “Buy,” “Preorder,” or “Join” only when that action works.
- Footer / utility copy: a warm sign-off and clear navigation. Error messages should identify the problem before offering a way forward.
- Metadata: describe the page accurately, including development status where relevant. Avoid generic luxury keyword lists.

## Copy ownership
Homepage narrative: `src/app/page.tsx`. Shared shell: `src/components/navigation.tsx` and `footer.tsx`. Product names, introductions, and stories: `src/lib/catalog.ts` (shared by cards, detail pages, and product metadata). Membership: `src/app/membership/page.tsx`. Site metadata: `src/app/layout.tsx`. Concept package language: `src/components/product-object.tsx`. The interactive collection uses `src/components/product-explorer.tsx`; maker and membership visuals use `ecosystem.tsx` and `membership-card.tsx`.

Keep product facts in the catalog rather than duplicating them on new pages. Keep layout-specific narrative beside its scene. Update this guide when positioning changes; do not create a second, unsynchronized copy inventory.

## Before publishing copy
Can a visitor tell what Gent does? Does each section add something? Is every factual claim supported? Are plans clearly distinguished from available goods and benefits? Does the CTA lead where it promises? Read it aloud: it should sound like someone with taste and a kept word, not a template.

## Portfolio source of truth
See [portfolio-strategy.md](portfolio-strategy.md) for taxonomy, business relationships, product provenance, visibility rules and expansion. Older hero/verification documents preserve design history, not current positioning.
