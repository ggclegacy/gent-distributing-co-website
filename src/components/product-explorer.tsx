"use client";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";

import { featuredProducts as products } from "@/lib/catalog";

export function ProductExplorer() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const product = products[selected];
  function keydown(e: KeyboardEvent<HTMLButtonElement>) {
    let next = selected;
    if (e.key === "ArrowRight") next = (selected + 1) % products.length;
    else if (e.key === "ArrowLeft")
      next = (selected + products.length - 1) % products.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = products.length - 1;
    else return;
    e.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }
  return (
    <div className="product-explorer" data-archive-selected={selected}>
      <div
        className="collection-tabs"
        role="tablist"
        aria-label="Explore the first provisions"
      >
        {products.map((p, i) => (
          <button
            key={p.handle}
            ref={(node) => {
              tabs.current[i] = node;
            }}
            role="tab"
            id={`category-${i}`}
            aria-controls={`product-panel-${i}`}
            aria-selected={selected === i}
            tabIndex={selected === i ? 0 : -1}
            onClick={() => setSelected(i)}
            onKeyDown={keydown}
          >
            <span className="tab-number">0{i + 1}</span>
            {p.explorerLabel}
            <span className="bay-status" aria-hidden="true">{i === 0 ? "CHAPTER ONE" : "IN DEVELOPMENT"}</span>
          </button>
        ))}
      </div>
      <Link className="future-bay" href="/products/gent-collection"><span>05</span> Future releases <small>CURATED GOODS ↗</small></Link>
      {products.map((p, i) => (
        <div
          key={p.handle}
          role="tabpanel"
          id={`product-panel-${i}`}
          aria-labelledby={`category-${i}`}
          hidden={selected !== i}
          tabIndex={0}
        >
          {selected === i ? (
            <div className={`explorer-content explore-${product.visual.kind}`}>
              <div className="archive-object-caption">
                <span>ARCHIVE / 01</span><span>LEGACY RESERVE</span><small>CONCEPT PACKAGING · IN DEVELOPMENT</small>
              </div>
              <div className="explorer-copy" key={product.handle}>
                <p className="eyebrow">
                  <span className="status-dot" /> IN DEVELOPMENT
                </p>
                <h3>{selected === 0 ? <>Legacy Reserve<span className="blend-name">Signature Blend Coffee</span></> : product.name}</h3>
                <p className="product-tagline">{product.description}</p>
                <p className="product-description">{selected === 0 ? "Our own label begins here. A daily ritual, held to the Gent standard. Origin, roast, format and release details will be shared before orders open." : product.detail}</p>
                <div className="product-meta">
                  <span>COLLECTION 0{i + 1}</span>
                  <span>IN DEVELOPMENT</span>
                </div>
                <Link className="button" href={`/products/${product.handle}`}>
                  Explore {product.explorerLabel.toLowerCase()}{" "}
                  <span aria-hidden="true">↗</span>
                </Link>
                <span className="micro">
                  PRODUCT DETAILS BEFORE PREORDERS
                </span>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
