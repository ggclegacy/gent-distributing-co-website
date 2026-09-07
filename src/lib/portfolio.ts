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
    description: "Products developed or private-labeled for the house. Gent Coffee begins this chapter, with sourcing and product details shared before release.",
  },
  represented: {
    label: "Represented by Gent",
    title: "Independent identities.",
    description: "A place for brands we represent and distribute, with their names, makers, and stories intact. Each relationship and its scope will be made clear as it is established.",
  },
  selected: {
    label: "Selected by Gent",
    title: "A considered selection.",
    description: "Carefully chosen wholesale and resale goods that meet our standard. Selection is distinct from ownership or exclusive representation.",
  },
} as const;
export type BusinessLayer = keyof typeof businessLayers;

export const brands = {
  gent: { name: "Gent Distribution Co.", status: "in-development" },
  "groomed-gent": { name: "Groomed Gent Co.", status: "planned" },
} as const;
export type BrandId = keyof typeof brands;

export const audiences = {
  retail: "Retail", hospitality: "Hospitality", commercial: "Commercial", personal: "Everyday use",
} as const;
export type Audience = keyof typeof audiences;
