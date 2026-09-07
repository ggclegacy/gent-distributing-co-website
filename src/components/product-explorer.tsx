"use client";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ProductObject } from "./product-object";
import { products } from "@/lib/catalog";
const labels = ["Coffee", "Honey", "Seasonings", "Curated goods"];
export function ProductExplorer() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = useRef<HTMLDivElement>(null);
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
  function tilt(e: PointerEvent<HTMLDivElement>) {
    if (
      e.pointerType !== "mouse" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "paused"
    )
      return;
    const box = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width - 0.5) * 12;
    const y = ((e.clientY - box.top) / box.height - 0.5) * -8;
    stage.current?.style.setProperty("--tilt-x", `${y}deg`);
    stage.current?.style.setProperty("--tilt-y", `${x}deg`);
  }
  function reset() {
    stage.current?.style.setProperty("--tilt-x", "0deg");
    stage.current?.style.setProperty("--tilt-y", "0deg");
  }
  return (
    <div className="product-explorer">
      <div
        className="collection-tabs"
        role="tablist"
        aria-label="Explore product categories"
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
            {labels[i]}
            <span className="tab-dot" />
          </button>
        ))}
      </div>
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
            <div className={`explorer-content explore-${product.category}`}>
              <div
                className="product-theater"
                onPointerMove={tilt}
                onPointerLeave={reset}
              >
                <div className="theater-grid" />
                <div className="theater-orbit orbit-one" />
                <div className="theater-orbit orbit-two" />
                <div className="theater-product" ref={stage}>
                  <ProductObject kind={product.category} large />
                </div>
                <span className="theater-caption">
                  GENT / PRODUCT CONCEPT 0{i + 1}
                </span>
                <span className="theater-corner" aria-hidden="true">
                  +
                </span>
              </div>
              <div className="explorer-copy" key={product.handle}>
                <p className="eyebrow">
                  <span className="status-dot" /> IN DEVELOPMENT
                </p>
                <h3>{product.name}</h3>
                <p className="product-tagline">{product.description}</p>
                <p className="product-description">{product.detail}</p>
                <div className="product-meta">
                  <span>COLLECTION 0{i + 1}</span>
                  <span>IN DEVELOPMENT</span>
                </div>
                <Link className="button" href={`/products/${product.handle}`}>
                  Explore {labels[i].toLowerCase()}{" "}
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
