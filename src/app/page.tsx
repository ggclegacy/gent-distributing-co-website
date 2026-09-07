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
            <div className="section-index"><span>02 / THE GENT STANDARD</span><span>THE MAKER’S WORKSHOP</span></div>
            <div className="material-copy">
              <p className="eyebrow">NOT EVERYTHING EARNS A PLACE.</p>
              <h2 id="standard-title">Worth knowing.<br /><em>Worth having.</em></h2>
              <p>Know where it came from. Who made it. Why it deserves to exist. Before anything carries our name, it has to meet our standard.</p>
            </div>
            <div className="workshop-stations">
              {[
                ["01 / SOURCE", "Know the source.", "The place. The material. The beginning of the story."],
                ["02 / MAKER", "Know the maker.", "The hands, the process, and the care behind the goods."],
                ["03 / WORTH", "Know its worth.", "A place on the shelf is earned by what’s inside."],
              ].map(([n, title, copy]) => <article className="station-placard" key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}
            </div>
            <span className="environment-note">MATERIAL → CRAFT → CHARACTER</span>
          </div>
        </section>
        <section className="material-scene collection-scene" id="collection" data-scene="display" aria-labelledby="collection-title">
          <MaterialEnvironment scene="vault" />
          <div className="scene-content material-content">
            <div className="section-index"><span>03 / THE COLLECTION</span><span>THE GENT VAULT</span></div>
            <div className="vault-heading"><p className="eyebrow">COFFEE IS CHAPTER ONE.</p><h2 id="collection-title">A first release.<br /><em>A larger world.</em></h2></div>
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
              <p>From a maker’s hands to more shelves, tables, homes and businesses. We bring curation, storytelling and distribution together—so exceptional goods can go further without losing their identity.</p>
              <Link className="text-link" href="/approach">Explore the house <span aria-hidden="true">↗</span></Link>
            </div>
            <ol className="distribution-stops" aria-label="The journey of a Gent case">
              {[["MAKER", "Made with purpose"], ["GENT", "Selected. Sealed. Carried."], ["BUSINESS", "A place on the shelf"], ["CUSTOMER", "A place in daily life"]].map(([name,copy],i)=><li key={name}><span>0{i+1}</span><strong>{name}</strong><p>{copy}</p></li>)}
            </ol>
            <div className="location-plates" aria-label="Our reach, beginning in Lafayette">
              {["Lafayette", "Acadiana", "Louisiana", "Gulf South", "Beyond"].map((name,i)=><span key={name}><small>0{i+1}</small>{name}</span>)}
            </div>
            <p className="reach-note">OUR ROOTS. OUR DIRECTION. OUR GROWING REACH.</p>
          </div>
        </section>
        <section className="material-scene arrival-scene" id="membership" data-scene="vault" aria-labelledby="membership-title">
          <MaterialEnvironment scene="arrival" />
          <div className="scene-content material-content">
            <div className="section-index"><span>05 / COMMUNITY</span><span>THE ARRIVAL</span></div>
            <div className="material-copy">
              <p className="eyebrow">THE JOURNEY ENDS IN GOOD COMPANY.</p>
              <h2 id="membership-title">Good taste.<br /><em>Better company.</em></h2>
              <p>For people who enjoy the find as much as the goods themselves. A closer connection to Gent, to the makers, and to what comes next.</p>
              <Link className="button" href="/membership">See the membership plans <span aria-hidden="true">↗</span></Link>
              <p className="micro">IN DEVELOPMENT · ENROLLMENT NOT YET OPEN</p>
            </div>
            <span className="environment-note">A PLACE AT THE TABLE.</span>
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
