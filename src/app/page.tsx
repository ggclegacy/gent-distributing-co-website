import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { ExchangeHero } from "@/components/exchange/exchange-hero";
import { SceneMotion } from "@/components/scene-motion";
import { IntelligenceScene, ClosingScene } from "@/components/intelligence-scene";
import { intelligenceRecords } from "@/lib/intelligence";
import "./gent-story.css";
import "./exchange-film.css";
import "./product-story.css";
import "./hero-elevation.css";
import "./intelligence.css";
import "./chapters.css";
import "./mobile-cinematic.css";
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
        <ClosingScene />
        <div className="lens-column" aria-hidden="true" />
      </div>
    </main>
  );
}
