# Gent Distribution Co.

Custom Next.js App Router / TypeScript storefront, designed for Vercel and a Shopify commerce backend.

## Run

```sh
npm install
npm run dev
npm run lint
npm run build
```

## Current release

A prelaunch immersive experience with a live dimensional Louisiana sculpture hero, five editorial chapters, a keyboard-accessible product explorer, persistent responsive navigation, reduced-motion controls, product detail routes, and a dedicated umbrella membership page. Packaging is an original CSS concept, not final product photography. Product descriptions deliberately avoid unverified origin, certification, roast, pricing, or delivery claims.

## Architecture

- `src/app`: server-rendered pages and global design tokens.
- `src/components`: shared shell, conceptual packaging, and isolated client interactions.
- `src/lib/catalog.ts` and `portfolio.ts`: product stories, scalable categories, business layers, brands, provenance, audience, visibility and future Shopify references.
- `src/lib/shopify.ts`: server-only Storefront API client and validated cart creation foundation.
- `public/images/gent-portal.webp`: bespoke AI-generated architectural hero, optimized to approximately 78 KB and served from a fingerprinted static asset URL. The former forest asset remains unused.

## Commerce and membership launch

Copy `.env.example` to `.env.local` and configure a Shopify store domain and Storefront access token on the server. No tokens go into browser bundles. The adapter targets Storefront API 2026-07. Product data is currently editorial preview data; the adapter is intentionally not exposed as a public purchase endpoint.

Before enabling sales: map real catalog variants, source prices and inventory from Shopify, implement a persistent cart with line updates/removals and error states, connect checkoutUrl, and verify a complete test purchase. Confirm pre-order shipping and payment terms. Recurring items need Shopify selling plans. Membership enrollment, entitlement enforcement, member discounts, and customer accounts still need a chosen Shopify membership/subscription integration. No signup data is collected and no membership or order confirmations are simulated.

## Vercel

Import this GitHub repository as a Next.js project. Default build (`npm run build`) and output detection apply. Set server environment variables in the appropriate Vercel environment when commerce is ready. No deployment is configured by this initial implementation.

## Brand language

See [the brand voice guide](docs/brand-voice.md) for positioning, messaging hierarchy, claim standards, and copy ownership. Gent is a modern premium multi-category distribution house, born in Lafayette and built to reach beyond Louisiana. See [portfolio strategy](docs/portfolio-strategy.md) for the catalog model, business layers, launch scope and provenance rules.

## Design

Obsidian #050806, emerald #0c2a1d, metallic gold #c5a66a, and pale gold text #ecdfbd. Every page uses dark brand surfaces. A locally hosted Manrope variable font (approximately 24 KB) is served through next/font; its license is in `public/fonts`. Transform-based pointer response and progressive motion preserve a readable static experience. A lazily loaded GSAP master timeline carries visitors through one continuous stage: Acadiana, the standard, collection, makers, membership, and an open doorway. Mobile retains connected scenes with shorter camera moves and readable content travel. Device reduced-motion preferences and a session-persistent motion control are supported. See [the cinematic experience guide](docs/cinematic-experience.md) for research, scene architecture, verification, and future asset needs. Run `npm run test:e2e` for the browser regressions (first install the browser with `npx playwright install chromium`).
