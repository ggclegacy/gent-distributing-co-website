import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, publicProducts, originLabel } from "@/lib/catalog";
import { categories, businessLayers, brands } from "@/lib/portfolio";
import { ProductObject } from "@/components/product-object";
export function generateStaticParams() {
  return publicProducts.map((p) => ({ handle: p.handle }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = getProduct(handle);
  return {
    title: product?.name ?? "Product not found",
    description: product
      ? `${product.description} ${product.detail}`
      : undefined,
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();
  return (
    <main id="main" className="detail-page">
      <Link className="text-link" href="/#collection">
        ← The collection
      </Link>
      <div className="detail-grid">
        <div className={`detail-art card-${product.visual.kind}`}>
          <ProductObject kind={product.visual.kind} label={product.visual.label} large />
          <span className="micro">
            {product.visual.kind === "editorial" ? "COLLECTION DIRECTION · IN DEVELOPMENT" : "CONCEPT PACKAGING · PRODUCT IN DEVELOPMENT"}
          </span>
        </div>
        <div>
          <p className="eyebrow">{product.chapter}</p>
          <h1>{product.name}</h1>
          <p className="detail-lead">{product.description}</p>
          <p>{product.detail}</p>
          <dl className="product-provenance">
            <div><dt>Category</dt><dd>{categories[product.category].label}</dd></div>
            <div><dt>Origin</dt><dd>{originLabel(product)}</dd></div>
            <div><dt>In the house</dt><dd>{product.businessLayer ? businessLayers[product.businessLayer].label : "Relationship to be confirmed before release"}</dd></div>
            {product.brandId && <div><dt>Brand</dt><dd>{brands[product.brandId].name}</dd></div>}
          </dl>
          <div className="release-note">
            <span className="status-dot" /> IN DEVELOPMENT
          </div>
          <p>
            Still taking shape. Orders and preorders are not open. We’ll share
            confirmed product details, pricing, and timing before asking you to
            buy.
          </p>
          <Link className="button" href="/membership">
            See the membership plans ↗
          </Link>
          <details>
            <summary>Before you order</summary>
            <p>
              Each release will make availability, pricing, and delivery terms
              clear. If we offer preorders, bundles, or repeat deliveries,
              you’ll see the payment terms and any recurring commitment before
              choosing.
            </p>
          </details>
        </div>
      </div>
    </main>
  );
}
