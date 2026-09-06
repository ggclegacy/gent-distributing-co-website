import Link from "next/link";
import Image from "next/image";
import { ProductObject } from "@/components/product-object";
import { SceneMotion } from "@/components/scene-motion";
import { products } from "@/lib/catalog";
export default function Home() {
  return (
    <main id="main">
      <SceneMotion />
      <section className="hero scene" aria-labelledby="hero-title">
        <Image
          className="hero-landscape"
          src="/images/forest.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-atmosphere" />
        <div className="hero-copy">
          <p className="eyebrow">
            A MODERN PRODUCT HOUSE <span>EST. WITH INTENTION</span>
          </p>
          <h1 id="hero-title">
            Exceptional
            <br />
            by <em>nature.</em>
          </h1>
          <p className="intro">
            Extraordinary goods. Everyday rituals.
            <br />A world curated with purpose.
          </p>
          <Link className="button" href="#collection">
            Discover the collection <span>↗</span>
          </Link>
        </div>
        <div className="hero-product">
          <span className="orbit-label">INTRODUCING THE FIRST CHAPTER</span>
          <ProductObject large />
          <div className="hero-product-caption">
            <span>01 / GENT COFFEE</span>
            <span>COMING SOON</span>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#collection">
            SCROLL TO EXPLORE <span>↓</span>
          </a>
          <span>QUALITY WITHOUT COMPROMISE.</span>
          <span className="scene-count">
            01 <i /> 04
          </span>
        </div>
      </section>
      <section className="manifesto" id="philosophy">
        <p className="eyebrow">THE GENT STANDARD</p>
        <h2 data-reveal>
          Not just well made.
          <br />
          <em>Well considered.</em>
        </h2>
        <p data-reveal>
          What we bring into our lives matters. We’re building a house of
          exceptional products, connected by a simple belief: the everyday
          deserves something extraordinary.
        </p>
        <div className="values">
          <span>01 &nbsp; Intentional selection</span>
          <span>02 &nbsp; Uncompromising character</span>
          <span>03 &nbsp; Lasting relationships</span>
        </div>
      </section>
      <section className="coffee-scene scene" id="collection">
        <div className="chapter-line">
          <span>THE COLLECTION</span>
          <span>CHAPTER 01 / THE DAILY RITUAL</span>
        </div>
        <div className="coffee-art">
          <div className="coffee-halo" />
          <ProductObject large />
          <span className="vertical-note">THE BEGINNING OF SOMETHING GOOD</span>
        </div>
        <div className="scene-copy" data-reveal>
          <p className="eyebrow">FIRST LIGHT. FIRST POUR.</p>
          <h2>
            Make room
            <br />
            for <em>ritual.</em>
          </h2>
          <p>
            A quiet moment. A deliberate beginning. Gent Coffee is the first
            expression of our standard—and the first chapter in a much larger
            story.
          </p>
          <Link href="/products/gent-coffee" className="text-link">
            Explore Gent Coffee <span>↗</span>
          </Link>
          <p className="micro">FIRST RELEASE IN DEVELOPMENT</p>
        </div>
      </section>
      <section className="collection-scene">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">THE WORLD IS OPENING UP</p>
            <h2>
              Good things.
              <br />
              <em>On the horizon.</em>
            </h2>
          </div>
          <p>
            From the first cup to the last detail.
            <br />A growing collection, held to one standard.
          </p>
        </div>
        <div className="product-grid">
          {products.slice(1).map((product, i) => (
            <Link
              className={`editorial-card card-${product.category}`}
              href={`/products/${product.handle}`}
              key={product.handle}
            >
              <div className="card-top">
                <span>
                  0{i + 2} / {product.chapter}
                </span>
                <span>↗</span>
              </div>
              <ProductObject kind={product.category} />
              <div className="card-copy">
                <span className="eyebrow">COMING SOON</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="membership-scene scene" id="membership">
        <div className="membership-emblem" aria-hidden="true">
          <span>G</span>
          <i>THE INNER WORLD OF GENT</i>
        </div>
        <div className="scene-copy" data-reveal>
          <p className="eyebrow">GENT MEMBERSHIP</p>
          <h2>
            Good taste.
            <br />
            <em>Better company.</em>
          </h2>
          <p>
            One membership. The whole world of Gent. A closer connection to the
            goods, releases, and rituals you love.
          </p>
          <div className="benefit-tags">
            <span>Early access</span>
            <span>Member pricing</span>
            <span>Limited releases</span>
          </div>
          <Link className="button" href="/membership">
            Discover membership <span>↗</span>
          </Link>
          <p className="micro">A NEW CHAPTER. COMING SOON.</p>
        </div>
      </section>
      <section className="closing" data-reveal>
        <p className="eyebrow">FROM OUR HOUSE TO YOUR EVERYDAY</p>
        <h2>
          A higher standard.
          <br />A wider <em>world.</em>
        </h2>
        <p>
          Products with character. Partnerships with purpose.
          <br />
          This is Gent Distribution Co.
        </p>
        <Link href="#collection" className="text-link">
          Your discovery starts here ↗
        </Link>
      </section>
    </main>
  );
}
