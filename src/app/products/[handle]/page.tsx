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
  return { title: product?.name ?? "Product not found" };
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
            PACKAGING CONCEPT · FINAL DETAILS TO COME
          </span>
        </div>
        <div>
          <p className="eyebrow">{product.chapter}</p>
          <h1>{product.name}</h1>
          <p className="detail-lead">{product.description}</p>
          <p>{product.detail}</p>
          <div className="release-note">
            <span className="status-dot" /> IN DEVELOPMENT — COMING SOON
          </div>
          <p>
            Purchasing and pre-orders will open with confirmed product details.
            No orders or payments are being accepted yet.
          </p>
          <Link className="button" href="/membership">
            Explore the Gent membership ↗
          </Link>
          <details>
            <summary>Future purchase options</summary>
            <p>
              The collection is being built to support individual purchases,
              curated bundles, limited pre-orders, and recurring products where
              offered. Availability and terms will be shown at release.
            </p>
          </details>
        </div>
      </div>
    </main>
  );
}
