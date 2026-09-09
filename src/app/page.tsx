import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import Link from "next/link";
import { ExchangeHero } from "@/components/exchange/exchange-hero";
import { SceneMotion } from "@/components/scene-motion";
import { IntelligenceScene } from "@/components/intelligence-scene";
import { intelligenceRecords } from "@/lib/intelligence";
import { StoryEnvironment as MaterialEnvironment } from "@/components/story-environment";
import "./gent-story.css";
import "./exchange-film.css";
import "./product-story.css";
import "./intelligence.css";
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
      <ExchangeHero />
      <div className="cinema-stage">
        {intelligenceRecords.map(record => <IntelligenceScene key={record.id} record={record} />)}
        <section className="material-scene journey-closing" id="welcome" data-scene="doorway" aria-labelledby="welcome-title">
          <MaterialEnvironment scene="arrival" />
          <div className="scene-content material-content">
            <div className="material-copy"><p className="eyebrow">FROM OUR HOUSE TO YOURS</p><h2 id="welcome-title">Come in.<br /><em>Find your good.</em></h2><Link className="button button-outline" href="#collection">Explore the collection <span aria-hidden="true">↗</span></Link></div>
          </div>
        </section>
        <div className="lens-column" aria-hidden="true" />
      </div>
    </main>
  );
}
