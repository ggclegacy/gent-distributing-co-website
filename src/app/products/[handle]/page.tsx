import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, products } from "@/lib/catalog";
import { ProductObject } from "@/components/product-object";
export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
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
        <div className={`detail-art card-${product.category}`}>
          <ProductObject kind={product.category} large />
          <span className="micro">
            CONCEPT PACKAGING · PRODUCT IN DEVELOPMENT
          </span>
        </div>
        <div>
          <p className="eyebrow">{product.chapter}</p>
          <h1>{product.name}</h1>
          <p className="detail-lead">{product.description}</p>
          <p>{product.detail}</p>
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
