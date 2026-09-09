/** Portfolio taxonomy is independent of launch assortment, geography and packaging. */
export const categories = {
  provisions: { label: "Food & Provisions" },
  "grooming-personal-care": { label: "Grooming & Personal Care" },
  "wellness-performance": { label: "Wellness & Performance" },
  "apparel-goods": { label: "Apparel & Goods" },
  "watches-accessories": { label: "Watches & Accessories" },
  "home-lifestyle": { label: "Home & Lifestyle" },
  "hospitality-commercial": { label: "Hospitality & Commercial" },
} as const;
export type Category = keyof typeof categories;

export const businessLayers = {
  "gent-developed": {
    label: "Developed by Gent",
    title: "Our own goods.",
    description: "Products developed for Gent Reserve Co., from concept to brand and packaging. Legacy Reserve coffee begins this chapter; sourcing and release details come first.",
  },
  represented: {
    label: "Represented by Gent",
    title: "Independent identities.",
    description: "A place for brands we represent and distribute, with their names, makers, and stories intact. Each relationship and its scope will be made clear as it is established.",
  },
  selected: {
    label: "Selected by Gent",
    title: "A considered selection.",
    description: "Exceptional goods selected to carry alongside our own. Quality, usefulness and brand fit earn a place; each maker keeps their identity.",
  },
} as const;
export type BusinessLayer = keyof typeof businessLayers;

export const brands = {
  gent: { name: "Gent Reserve Co.", status: "in-development" },
  "groomed-gent": { name: "Groomed Gent Co.", status: "planned" },
} as const;
export type BrandId = keyof typeof brands;

export const audiences = {
  retail: "Retail", hospitality: "Hospitality", commercial: "Commercial", personal: "Everyday use",
} as const;
export type Audience = keyof typeof audiences;
