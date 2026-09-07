import { categories, type Category, type BusinessLayer, type BrandId, type Audience } from "./portfolio";
export type { Category } from "./portfolio";
export type Product = {
  handle: string;
  name: string;
  category: Category;
  subcategory: string;
  explorerLabel: string;
  chapter: string;
  description: string;
  detail: string;
  status: "coming-soon" | "preorder" | "available";
  visibility: "preview" | "published" | "planned";
  featured: boolean;
  brandId?: BrandId;
  businessLayer?: BusinessLayer;
  audiences: Audience[];
  origin: { status: "pending" | "confirmed"; label?: string; country?: string; region?: string; producer?: string };
  visual: { kind: "coffee" | "honey" | "seasonings" | "sauces" | "bundles" | "editorial"; label: string };
  variantId?: string;
  sellingPlanId?: string;
};
export const products: Product[] = [
  {
    handle: "gent-coffee", name: "Gent Coffee", category: "provisions", subcategory: "coffee", explorerLabel: "Coffee",
    chapter: "Our first release", description: "Our first release. For the cup you come back to.",
    detail: "Gent Coffee is in development under our own label. We’re starting with something that earns a place in daily life: a good cup of coffee. We’ll share the origin, roast, format, and price before the first release.",
    status: "coming-soon", visibility: "preview", featured: true, brandId: "gent", businessLayer: "gent-developed",
    audiences: ["personal", "retail", "hospitality"], origin: { status: "pending" }, visual: { kind: "coffee", label: "COFFEE" },
  },
  {
    handle: "gent-honey", name: "Gent Honey", category: "provisions", subcategory: "honey", explorerLabel: "Honey",
    chapter: "A source worth knowing", description: "A pantry staple. Selected with care.",
    detail: "Our honey sourcing reaches beyond Louisiana, to another U.S. state. Quality and care bring it into the Gent story. We’ll introduce the producer, state of origin, format, and price before release.",
    status: "coming-soon", visibility: "preview", featured: true,
    audiences: ["personal", "retail", "hospitality"], origin: { status: "confirmed", country: "US", label: "USA · outside Louisiana" }, visual: { kind: "honey", label: "HONEY" },
  },
  {
    handle: "gent-seasonings", name: "Gent Seasonings", category: "provisions", subcategory: "seasonings", explorerLabel: "Seasonings",
    chapter: "At the table", description: "For the meals you make your own.",
    detail: "We’re exploring seasonings for the Gent pantry, with the home cook in mind. The aim is flavor you’ll reach for often, with ingredients you can get to know. Blends, sourcing, and release details are still in development.",
    status: "coming-soon", visibility: "preview", featured: true,
    audiences: ["personal", "retail", "hospitality"], origin: { status: "pending" }, visual: { kind: "seasonings", label: "SEASONINGS" },
  },
  {
    handle: "gent-sauces", name: "Gent Sauces", category: "provisions", subcategory: "sauces", explorerLabel: "Sauces",
    chapter: "The first provisions", description: "A little more character at the table.",
    detail: "Sauces are part of our opening provisions direction. We’re considering goods with a clear reason to belong, from Louisiana and beyond. Makers, recipes, ingredients, and release details will be introduced as selections are confirmed.",
    status: "coming-soon", visibility: "preview", featured: true,
    audiences: ["personal", "retail", "hospitality"], origin: { status: "pending" }, visual: { kind: "sauces", label: "SAUCES" },
  },
  {
    // Preserve the existing URL as an editorial preview; it is not an empty launch tab.
    handle: "gent-collection", name: "The Gent Collection", category: "provisions", subcategory: "curated", explorerLabel: "Curated goods",
    chapter: "Selected by Gent", description: "Our own goods. Independent identities. One standard.",
    detail: "The collection begins with provisions and is built to grow across categories. It brings together products we develop, brands we represent, and carefully selected wholesale goods. Each future release will introduce what it is, who’s behind it, where it comes from, and how it belongs in the house.",
    status: "coming-soon", visibility: "preview", featured: false,
    audiences: ["personal", "retail", "hospitality", "commercial"], origin: { status: "pending" }, visual: { kind: "editorial", label: "THE COLLECTION" },
  },
];
export const publicProducts = products.filter((p) => p.visibility !== "planned");
export const featuredProducts = publicProducts.filter((p) => p.featured);
/** Future category navigation is derived from real public entries, never the registry alone. */
export function getVisibleCategories(catalog: readonly Product[] = publicProducts) {
  return Object.entries(categories).filter(([id]) => catalog.some((p) => p.visibility !== "planned" && p.category === id))
    .map(([id, value]) => ({ id: id as Category, ...value }));
}
export function getProduct(handle: string) { return publicProducts.find((p) => p.handle === handle); }
export function originLabel(product: Product) {
  return product.origin.status === "confirmed" ? product.origin.label ?? "Origin details forthcoming" : "Origin to be confirmed before release";
}
