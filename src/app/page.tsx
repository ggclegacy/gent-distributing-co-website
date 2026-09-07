import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import Link from "next/link";
import { AcadianaHero } from "@/components/acadiana-hero";
import { SceneMotion } from "@/components/scene-motion";
import { ProductExplorer } from "@/components/product-explorer";
import { MaterialEnvironment, TransitCase } from "@/components/material-environment";
export const metadata: Metadata = {
  title: { absolute: brand.title },
  description: brand.description,
  openGraph: { title: brand.title, description: brand.description, siteName: brand.name, type: "website" },
  twitter: { card: "summary", title: brand.title, description: brand.description },
};


export default function Home() {
  return (
    <main id="main" data-cinema className="gent-journey">
      <SceneMotion />
      <div className="cinema-stage">
        <div className="homecoming-scene" id="arrival" data-scene="hero">
          <AcadianaHero />
          <div className="portal-light" aria-hidden="true" />
        </div>
        <section className="material-scene workshop-scene" id="philosophy" data-scene="chamber" aria-labelledby="standard-title">
          <MaterialEnvironment scene="workshop" />
          <div className="scene-content material-content">
            <div className="section-index"><span>02 / THE GENT STANDARD</span><span>PRODUCT DEVELOPMENT LAB</span></div>
            <div className="material-copy">
              <p className="eyebrow">NOT EVERYTHING EARNS A PLACE.</p>
              <h2 id="standard-title">Worth knowing.<br /><em>Worth having.</em></h2>
              <p>Source with intent. Develop with precision. Test what matters. Everything that carries our name must earn its place.</p>
            </div>
            <div className="workshop-stations">
              {[
                ["01 / SOURCE", "Start with substance.", "Exceptional ingredients. Considered partners. Clear origins."],
                ["02 / DEVELOP", "Refine the idea.", "Formulate, test and sharpen every detail."],
                ["03 / VET", "Prove its worth.", "Quality, purpose and experience. Nothing overlooked."],
                ["04 / APPROVE", "Earn the name.", "Only what meets the standard moves forward."],
              ].map(([n, title, copy]) => <article className="station-placard" key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}
            </div>
            <span className="environment-note">SOURCE → DEVELOP → VET → APPROVE</span>
          </div>
        </section>
        <section className="material-scene collection-scene" id="collection" data-scene="display" aria-labelledby="collection-title">
          <MaterialEnvironment scene="vault" />
          <div className="scene-content material-content">
            <div className="section-index"><span>03 / THE COLLECTION</span><span>PRODUCT REVEAL / 01</span></div>
            <div className="vault-heading"><p className="eyebrow">COFFEE IS CHAPTER ONE.</p><h2 id="collection-title">A first release.<br /><em>A larger world.</em></h2></div>
            <p className="category-horizon">Coffee · Foods · Beverages · Supplements · Lifestyle</p>
            <ProductExplorer />
          </div>
        </section>
        <section className="material-scene distribution-scene" id="ecosystem" data-scene="network" aria-labelledby="distribution-title">
          <MaterialEnvironment scene="network" />
          <div className="scene-content material-content">
            <div className="section-index"><span>04 / FOR MAKERS & PARTNERS</span><span>THE NETWORK</span></div>
            <div className="material-copy">
              <p className="eyebrow">ORIGIN TRAVELS WITH IT.</p>
              <h2 id="distribution-title">Rooted here.<br /><em>Built to travel.</em></h2>
              <p>Built with makers. Designed for scale. We connect product development, brand and distribution to carry exceptional goods from Louisiana toward a national—and wider—world.</p>
              <Link className="text-link" href="/approach">Explore the house <span aria-hidden="true">↗</span></Link>
            </div>
            <ol className="distribution-stops" aria-label="The journey of a Gent case">
              {[["MAKER", "Made with purpose"], ["GENT", "Selected. Sealed. Carried."], ["BUSINESS", "A place on the shelf"], ["CUSTOMER", "A place in daily life"]].map(([name,copy],i)=><li key={name}><span>0{i+1}</span><strong>{name}</strong><p>{copy}</p></li>)}
            </ol>
            <div className="location-plates" aria-label="Our reach, beginning in Lafayette">
              {["Lafayette", "Louisiana", "Gulf South", "National", "Global ambition"].map((name,i)=><span key={name}><small>0{i+1}</small>{name}</span>)}
            </div>
            <p className="reach-note">LOUISIANA IS OUR ORIGIN. POSSIBILITY SETS OUR HORIZON.</p>
          </div>
        </section>
        <section className="material-scene arrival-scene" id="membership" data-scene="vault" aria-labelledby="membership-title">
          <MaterialEnvironment scene="arrival" />
          <div className="scene-content material-content">
            <div className="section-index"><span>05 / COMMUNITY</span><span>THE PRIVATE NETWORK</span></div>
            <div className="material-copy">
              <p className="eyebrow">ACCESS TO WHAT COMES NEXT.</p>
              <h2 id="membership-title">Good taste.<br /><em>Better company.</em></h2>
              <p>Early releases. New makers. Shared experiences. A closer connection to the products, people and possibilities taking shape at Gent.</p>
              <Link className="button" href="/membership">See the membership plans <span aria-hidden="true">↗</span></Link>
              <p className="micro">IN DEVELOPMENT · ENROLLMENT NOT YET OPEN</p>
            </div>
            <span className="environment-note">PRODUCTS. PEOPLE. WHAT COMES NEXT.</span>
          </div>
        </section>
        <section className="material-scene journey-closing" id="welcome" data-scene="doorway" aria-labelledby="welcome-title">
          <MaterialEnvironment scene="arrival" />
          <div className="scene-content material-content">
            <div className="material-copy"><p className="eyebrow">FROM OUR HOUSE TO YOURS</p><h2 id="welcome-title">Come in.<br /><em>Find your good.</em></h2><Link className="button button-outline" href="#collection">Explore the collection <span aria-hidden="true">↗</span></Link></div>
          </div>
        </section>
        <div className="journey-cargo" aria-hidden="true"><TransitCase /></div>
        <div className="lens-column" aria-hidden="true" />
      </div>
    </main>
  );
}
