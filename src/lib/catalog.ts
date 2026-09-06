export type Category =
  "coffee" | "honey" | "seasonings" | "curated" | "bundles";
export type Product = {
  handle: string;
  name: string;
  category: Category;
  chapter: string;
  description: string;
  detail: string;
  status: "coming-soon" | "preorder" | "available";
  variantId?: string;
  sellingPlanId?: string;
};
export const products: Product[] = [
  {
    handle: "gent-coffee",
    name: "Gent Coffee",
    category: "coffee",
    chapter: "The daily ritual",
    description: "A better beginning. A moment worth making.",
    detail:
      "Our first chapter starts with coffee. A considered collection for the quiet before the day begins. Roast profiles, origins, formats, and launch pricing will be announced with the first release.",
    status: "coming-soon",
  },
  {
    handle: "gent-honey",
    name: "Gent Honey",
    category: "honey",
    chapter: "Nature, elevated",
    description: "Something golden is on the horizon.",
    detail:
      "An exploration of honey, provenance, and the simple pleasure of exceptional ingredients. Producers and release details are being considered.",
    status: "coming-soon",
  },
  {
    handle: "gent-seasonings",
    name: "Gent Seasonings",
    category: "seasonings",
    chapter: "Depth of character",
    description: "For the meals that become memories.",
    detail:
      "A future collection of seasonings made to bring more character to the table. Blends and sourcing details will be shared ahead of launch.",
    status: "coming-soon",
  },
  {
    handle: "gent-collection",
    name: "The Gent Collection",
    category: "bundles",
    chapter: "Better together",
    description: "Considered goods. Unexpected discoveries.",
    detail:
      "Future curated goods, giftable bundles, and limited collaborations. Each release will have its own story, availability, and membership benefits.",
    status: "coming-soon",
  },
];
export function getProduct(handle: string) {
  return products.find((p) => p.handle === handle);
}
