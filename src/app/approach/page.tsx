import Link from "next/link";
import { businessLayers } from "@/lib/portfolio";
import { Ecosystem } from "@/components/ecosystem";

export const metadata = {
  title: "The house — One standard, room to grow",
  description: "Gent’s approach to developing products, representing brands, and selecting wholesale goods. Rooted in Lafayette, with a portfolio built to grow beyond provisions and Louisiana.",
};
export default function Approach() {
  return (
    <main id="main" className="house-page section-pad">
      <div className="house-intro">
        <p className="eyebrow">GENT DISTRIBUTION CO. / THE HOUSE</p>
        <h1>One standard.<br /><em>Room to grow.</em></h1>
        <p>Gent is a modern premium distribution house. We discover, develop, curate, and distribute exceptional goods. Lafayette is where the story begins. Quality, usefulness, and the people behind a product determine where it goes next.</p>
        <Link className="button button-outline" href="/#collection">Explore the first provisions <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="section-index"><span>THREE WAYS INTO THE HOUSE</span><span>ONE SHARED STANDARD</span></div>
      <div className="house-layers">
        {Object.entries(businessLayers).map(([id, layer], index) => <article key={id}>
          <p className="eyebrow">0{index + 1} / {layer.label}</p>
          <h2>{layer.title}</h2><p>{layer.description}</p>
        </article>)}
      </div>
      <section className="house-horizon">
        <div>
          <p className="eyebrow">THE NEXT CHAPTERS / UNDER CONSIDERATION</p>
          <h2>The goods evolve.<br /><em>The standard stays.</em></h2>
          <p>Our opening focus is coffee, honey, sauces, seasonings, and provisions. Over time, the house can extend into grooming and personal care, wellness and performance, apparel, watches and accessories, home and lifestyle, and hospitality and commercial goods.</p>
          <p>Groomed Gent Co. is part of the grooming direction we’re considering. Future categories and brands will be introduced when there is a real collection to explore. They are not available through this site today.</p>
        </div>
        <Ecosystem />
      </section>
      <section className="house-roots">
        <p className="eyebrow">OUR ORIGIN. OUR ADVANTAGE.</p>
        <h2>Born in Lafayette.<br /><em>Open to what’s exceptional.</em></h2>
        <p>Louisiana remains part of our identity, our relationships, and an important source of goods. We celebrate local makers where a product is local, and name other origins just as clearly. Our honey sourcing already reaches into another U.S. state. Every product deserves its own honest story.</p>
        <Link className="text-link" href="/#philosophy">Get to know our standard <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
