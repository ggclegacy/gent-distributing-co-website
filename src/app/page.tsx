import type { Metadata } from "next";
import Link from "next/link";
import { AcadianaHero } from "@/components/acadiana-hero";
import { SceneAtmosphere } from "@/components/scene-atmosphere";
import { SceneMotion } from "@/components/scene-motion";
import { ProductExplorer } from "@/components/product-explorer";
import { MembershipCard } from "@/components/membership-card";
import { Ecosystem } from "@/components/ecosystem";
export const metadata: Metadata = {
  title: "Gent Distribution Co. — Rooted here. Built to move.",
  description:
    "Premium goods born in Acadiana. Distributed with purpose. Based in Lafayette, Louisiana, Gent connects local makers, exceptional goods, and our community.",
};

export default function Home() {
  return (
    <main id="main" data-cinema>
      <SceneMotion />
      <div className="cinema-stage">
        <div className="homecoming-scene" id="arrival" data-scene="hero">
          <AcadianaHero />
          <div className="portal-light" aria-hidden="true" />
        </div>
        <section
          className="standard-section section-pad"
          id="philosophy"
          data-scene="chamber"
        >
          <SceneAtmosphere kind="chamber" />
          <div className="scene-content">
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
                Exceptional goods deserve a wider audience. People deserve to
                know what they’re bringing home. Gent exists to make that
                connection. We believe in quality you can explain, a handshake
                that means something, and a reputation earned by keeping your
                word.
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
          </div>
        </section>
        <section
          className="collection-scene section-pad"
          id="collection"
          data-scene="display"
        >
          <SceneAtmosphere kind="display" />
          <div className="scene-content">
            <div className="section-index">
              <span>02 / THE COLLECTION</span>
              <span>OUR OWN GOODS & INDEPENDENT FINDS</span>
            </div>
            <div className="section-heading" data-reveal>
              <div>
                <p className="eyebrow">TAKING SHAPE</p>
                <h2>
                  First, coffee. <br />
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
          </div>
        </section>
        <section
          className="ecosystem-section section-pad"
          id="ecosystem"
          data-scene="network"
        >
          <SceneAtmosphere kind="network" />
          <div className="scene-content">
            <div className="section-index">
              <span>03 / FOR MAKERS & PARTNERS</span>
              <span>ROOTED IN RELATIONSHIPS</span>
            </div>
            <div className="ecosystem-grid">
              <div className="scene-copy" data-reveal>
                <p className="eyebrow">
                  A WIDER AUDIENCE. A PERSONAL APPROACH.
                </p>
                <h2>
                  More reach.
                  <br />
                  Same <em>soul.</em>
                </h2>
                <p>
                  You’ve put something of yourself into what you make. That
                  should travel with it. Our approach brings storytelling,
                  commerce, and distribution together to reach more shelves,
                  tables, and homes. We believe local can go further without
                  losing where it came from.
                </p>
                <Link className="text-link" href="#philosophy">
                  Get to know our standard <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <Ecosystem />
            </div>
          </div>
        </section>
        <section
          className="membership-scene section-pad"
          id="membership"
          data-scene="vault"
        >
          <SceneAtmosphere kind="vault" />
          <div className="scene-content">
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
                  We’re shaping a membership that brings you closer to Gent and
                  the people behind the collection as it grows.
                </p>
                <div className="benefit-tags">
                  <span>New discoveries</span>
                  <span>Closer connections</span>
                  <span>Shared standards</span>
                </div>
                <Link className="button" href="/membership">
                  See the membership plans <span aria-hidden="true">↗</span>
                </Link>
                <p className="micro">
                  IN DEVELOPMENT · ENROLLMENT NOT YET OPEN
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="closing section-pad"
          id="welcome"
          data-scene="doorway"
        >
          <SceneAtmosphere kind="doorway" />
          <div className="scene-content">
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
          </div>
        </section>
        <div className="lens-column" aria-hidden="true" />
      </div>
    </main>
  );
}
