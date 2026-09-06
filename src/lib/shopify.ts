import "server-only";
/** Server-only foundation. Enable only after verified products and launch terms are ready. */
export function commerceConfigured() {
  return Boolean(
    process.env.SHOPIFY_STORE_DOMAIN &&
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  );
}
export async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!domain || !token) throw new Error("Shopify commerce is not configured");
  if (!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(domain))
    throw new Error("Invalid Shopify store domain");
  const response = await fetch(`https://${domain}/api/2026-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error("Commerce service unavailable");
  const result = (await response.json()) as { data: T; errors?: unknown[] };
  if (result.errors?.length) throw new Error("Commerce request failed");
  return result.data;
}
export async function createCart(
  lines: { merchandiseId: string; quantity: number; sellingPlanId?: string }[],
) {
  if (
    !lines.length ||
    lines.length > 50 ||
    lines.some(
      (l) =>
        !Number.isInteger(l.quantity) ||
        l.quantity < 1 ||
        l.quantity > 99 ||
        !l.merchandiseId.startsWith("gid://shopify/ProductVariant/"),
    )
  )
    throw new Error("Invalid cart lines");
  const data = await storefront<{
    cartCreate: {
      cart: { id: string; checkoutUrl: string } | null;
      userErrors: { message: string }[];
    };
  }>(
    `mutation CreateCart($input: CartInput!) { cartCreate(input: $input) { cart { id checkoutUrl } userErrors { message } } }`,
    { input: { lines } },
  );
  if (data.cartCreate.userErrors.length || !data.cartCreate.cart)
    throw new Error("Unable to create cart");
  return data.cartCreate.cart;
}
