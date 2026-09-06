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

A prelaunch editorial experience with four environmental chapters, responsive navigation, accessible reduced-motion behavior, product detail routes, and a dedicated umbrella membership page. Packaging is an original CSS concept, not final product photography. Product descriptions deliberately avoid unverified origin, certification, roast, pricing, or delivery claims.

## Architecture

- `src/app`: server-rendered pages and global design tokens.
- `src/components`: shared shell, conceptual packaging, and isolated client interactions.
- `src/lib/catalog.ts`: typed product stories, category/status, future Shopify variant and selling-plan references.
- `src/lib/shopify.ts`: server-only Storefront API client and validated cart creation foundation.
- `public/images/forest.jpg`: atmospheric forest image from Unsplash (photo-1448375240586-882707db888b).

## Commerce and membership launch

Copy `.env.example` to `.env.local` and configure a Shopify store domain and Storefront access token on the server. No tokens go into browser bundles. The adapter targets Storefront API 2026-07. Product data is currently editorial preview data; the adapter is intentionally not exposed as a public purchase endpoint.

Before enabling sales: map real catalog variants, source prices and inventory from Shopify, implement a persistent cart with line updates/removals and error states, connect checkoutUrl, and verify a complete test purchase. Confirm pre-order shipping and payment terms. Recurring items need Shopify selling plans. Membership enrollment, entitlement enforcement, member discounts, and customer accounts still need a chosen Shopify membership/subscription integration. No signup data is collected and no membership or order confirmations are simulated.

## Vercel

Import this GitHub repository as a Next.js project. Default build (`npm run build`) and output detection apply. Set server environment variables in the appropriate Vercel environment when commerce is ready. No deployment is configured by this initial implementation.

## Design

Ink #0b100e, forest #152e24, antique gold #c6aa71, parchment #ece8dc. Locally hosted Cormorant Garamond and Manrope with system fallbacks; licenses are in `public/fonts`. Native scrolling and progressive CSS scroll animation avoid a heavy animation runtime. Interactive elements support keyboard focus; motion follows reduced-motion preferences.
