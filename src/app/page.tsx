import Link from "next/link";
import Image from "next/image";
import portal from "../../public/images/gent-portal.webp";
import { SceneMotion } from "@/components/scene-motion";
import { ProductExplorer } from "@/components/product-explorer";
import { MembershipCard } from "@/components/membership-card";
import { Ecosystem } from "@/components/ecosystem";
export default function Home() {
  return (
    <main id="main" data-cinema>
      <SceneMotion />
      <div className="opening-act">
        <section className="hero scene" aria-labelledby="hero-title">
          <div className="hero-visual">
            <Image
              src={portal}
              alt=""
              fill
              loading="eager"
              fetchPriority="high"
              unoptimized
              sizes="(max-width: 700px) 210vw, 100vw"
              quality={85}
            />
          </div>
          <div className="hero-shade" />
          <div className="portal-light" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> A MODERN MERCHANT HOUSE
            </p>
            <h1 id="hero-title">
              Good things
              <br />
              deserve to <em>travel.</em>
            </h1>
            <p className="hero-description">
              We discover, develop, and bring exceptional goods to more people.
              From our own label to independent makers we believe in.
            </p>
            <div className="hero-actions">
              <Link className="button" href="#collection">
                Explore the collection <span aria-hidden="true">↗</span>
              </Link>
              <Link className="quiet-link" href="#philosophy">
                Meet the house <span aria-hidden="true">↓</span>
              </Link>
            </div>
          </div>
          <div className="portal-label" aria-hidden="true">
            <span className="crosshair">+</span> GOOD GOODS. KEPT WORD.
          </div>
          <div className="hero-bottom">
            <a href="#philosophy">
              <span className="scroll-line" /> SCROLL TO DISCOVER
            </a>
            <span>
              DISCOVERY &nbsp; / &nbsp; QUALITY &nbsp; / &nbsp; RELATIONSHIPS
            </span>
            <span>01 — 05</span>
          </div>
        </section>
        <section className="standard-section section-pad" id="philosophy">
          <div className="section-index">
            <span>01 / THE GENT STANDARD</span>
            <span>TRUST IS EARNED</span>
          </div>
          <div className="standard-intro">
            <p className="eyebrow" data-reveal>
              WHY WE’RE HERE
            </p>
            <h2 data-reveal>
              Worth knowing.
              <br />
              <em>Worth having.</em>
            </h2>
            <p data-reveal>
              Exceptional goods deserve a wider audience. People deserve to know
              what they’re bringing home. Gent exists to make that connection.
              We believe in quality you can explain, a handshake that means
              something, and a reputation earned by keeping your word.
            </p>
          </div>
          <div className="principle-grid">
            {[
              [
                "01",
                "Know the source.",
                "Know where it came from. The place and the process belong in the story.",
              ],
              [
                "02",
                "Know the maker.",
                "Know who made it. Good business starts with people and grows through trust.",
              ],
              [
                "03",
                "Know its worth.",
                "Know why it’s worth having. A place on the shelf should be earned by what’s inside.",
              ],
            ].map(([n, title, copy]) => (
              <article key={n} data-reveal>
                <span className="principle-number">{n}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <span className="principle-line" />
              </article>
            ))}
          </div>
        </section>
      </div>
      <section className="collection-scene section-pad" id="collection">
        <div className="section-index">
          <span>02 / THE COLLECTION</span>
          <span>OUR OWN GOODS & INDEPENDENT FINDS</span>
        </div>
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">TAKING SHAPE</p>
            <h2>
              First, coffee.
              <br />
              <em>Then, more.</em>
            </h2>
          </div>
          <p>
            Our own label begins with Gent Coffee.
            <br />
            Pantry goods and independent discoveries are next.
          </p>
        </div>
        <ProductExplorer />
      </section>
      <section className="ecosystem-section section-pad" id="ecosystem">
        <div className="section-index">
          <span>03 / FOR MAKERS & PARTNERS</span>
          <span>ROOTED IN RELATIONSHIPS</span>
        </div>
        <div className="ecosystem-grid">
          <div className="scene-copy" data-reveal>
            <p className="eyebrow">A WIDER AUDIENCE. A PERSONAL APPROACH.</p>
            <h2>
              More reach.
              <br />
              Same <em>soul.</em>
            </h2>
            <p>
              You’ve put something of yourself into what you make. That should
              travel with it. Our approach brings storytelling, commerce, and
              distribution together to reach more shelves, tables, and homes. We
              believe local can go further without losing where it came from.
            </p>
            <Link className="text-link" href="#philosophy">
              Get to know our standard <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <Ecosystem />
        </div>
      </section>
      <section className="membership-scene section-pad" id="membership">
        <div className="section-index">
          <span>04 / GENT MEMBERSHIP</span>
          <span>GOOD COMPANY. SHARED TASTE.</span>
        </div>
        <div className="membership-grid">
          <MembershipCard />
          <div className="scene-copy" data-reveal>
            <p className="eyebrow">A CLOSER CONNECTION</p>
            <h2>
              Good taste.
              <br />
              <em>Better company.</em>
            </h2>
            <p>
              For people who enjoy the find as much as the goods themselves.
              We’re shaping a membership that brings you closer to Gent and the
              people behind the collection as it grows.
            </p>
            <div className="benefit-tags">
              <span>New discoveries</span>
              <span>Closer connections</span>
              <span>Shared standards</span>
            </div>
            <Link className="button" href="/membership">
              See the membership plans <span aria-hidden="true">↗</span>
            </Link>
            <p className="micro">IN DEVELOPMENT · ENROLLMENT NOT YET OPEN</p>
          </div>
        </div>
      </section>
      <section className="closing section-pad">
        <div className="section-index">
          <span>05 / OUR DOOR IS OPEN</span>
          <span>GENT DISTRIBUTION CO.</span>
        </div>
        <div className="closing-inner" data-reveal>
          <p className="eyebrow">FROM OUR HOUSE TO YOURS</p>
          <h2>
            Come in.
            <br />
            <em>Find your good.</em>
          </h2>
          <Link className="button button-outline" href="#collection">
            Explore the collection <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <span className="closing-word" aria-hidden="true">
          GENT
        </span>
      </section>
    </main>
  );
}
