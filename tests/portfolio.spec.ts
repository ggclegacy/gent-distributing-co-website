import { test, expect } from "@playwright/test";
import { products, featuredProducts, getVisibleCategories, type Product } from "../src/lib/catalog";

test("future categories remain hidden until a public product earns a place", () => {
  const future: Product = { ...products[0], handle: "future-grooming", category: "grooming-personal-care", visibility: "planned", featured: true, visual: {kind:"editorial",label:"GROOMING"} };
  expect(getVisibleCategories([...products, future]).map(p => p.id)).toEqual(["provisions"]);
  expect(getVisibleCategories([...products, {...future, visibility:"published"}]).map(p => p.id)).toEqual(["provisions", "grooming-personal-care"]);
  expect(featuredProducts.map(p => p.subcategory)).toEqual(["coffee", "honey", "seasonings", "sauces"]);
});

test("provenance and business relationships are explicit without invented local claims", async ({page}) => {
  await page.goto("/products/gent-honey");
  await expect(page.locator(".product-provenance")).toContainText("USA · outside Louisiana");
  await expect(page.locator(".product-provenance")).toContainText("Relationship to be confirmed");
  await page.goto("/products/gent-coffee");
  await expect(page.locator(".product-provenance")).toContainText("Developed by Gent");
  await expect(page.locator(".product-provenance")).toContainText("Origin to be confirmed");
  await page.goto("/products/gent-sauces");
  await expect(page.getByRole("heading", {name:"Gent Sauces",exact:true})).toBeVisible();
  await page.goto("/products/gent-collection");
  await expect(page.locator(".editorial-object")).toBeVisible();
  expect((await page.goto("/products/future-grooming"))?.status()).toBe(404);
});

for (const width of [320, 768, 1440]) {
 test(`strategy, launch focus and partner journey at ${width}px`, async ({page}) => {
  await page.setViewportSize({width,height:900});
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Built to move exceptional things.");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /rooted in Louisiana with a wider reach/);
  await expect(page.locator("main")).not.toContainText("Made here.");
  await page.locator(".il-collection-index summary").click();
  await expect(page.getByRole("tab")).toHaveCount(4);
  await page.getByRole("tab", {name:"04 Sauces"}).click();
  await page.getByRole("link",{name:"Explore sauces",exact:true}).click();
  await expect(page).toHaveURL(/gent-sauces/);
  await page.goto("/approach");
  await expect(page.locator(".house-layers article")).toHaveCount(3);
  await expect(page.locator("main")).toContainText("Groomed Gent Co.");
  await expect(page.locator("main")).toContainText("not available through this site today");
  expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({path:`test-results/house-${width}.png`,fullPage:true});
 });
}
