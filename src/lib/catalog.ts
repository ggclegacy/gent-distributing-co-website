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
    chapter: "Our first release",
    description: "Our first release. For the cup you come back to.",
    detail:
      "Gent Coffee is in development under our own label. We’re starting with something that earns a place in daily life: a good cup of coffee. We’ll share the origin, roast, format, and price before the first release, so you can choose with confidence.",
    status: "coming-soon",
  },
  {
    handle: "gent-honey",
    name: "Gent Honey",
    category: "honey",
    chapter: "From hive to table",
    description: "A pantry staple with a source worth knowing.",
    detail:
      "Honey is one of the next goods we’re exploring for the Gent pantry. The producer and the place matter as much as what’s in the jar. Sourcing is still being considered; producer, origin, and product details will come before any release.",
    status: "coming-soon",
  },
  {
    handle: "gent-seasonings",
    name: "Gent Seasonings",
    category: "seasonings",
    chapter: "At the table",
    description: "For the meals you make your own.",
    detail:
      "We’re exploring seasonings for the Gent pantry, with the home cook in mind. The aim is flavor you’ll reach for often, with ingredients you can get to know. Blends, sourcing, and release details are still in development.",
    status: "coming-soon",
  },
  {
    handle: "gent-collection",
    name: "The Gent Collection",
    category: "bundles",
    chapter: "Selected by Gent",
    description: "Our own goods. Independent makers. One standard.",
    detail:
      "A place for discoveries beyond our own label: selected goods from independent makers, future collaborations, and goods brought together for giving or keeping. Pantry and lifestyle goods are both part of the direction. Selections and partnerships are still taking shape; every release will introduce what it is, who’s behind it, and why it belongs here.",
    status: "coming-soon",
  },
];
export function getProduct(handle: string) {
  return products.find((p) => p.handle === handle);
}
