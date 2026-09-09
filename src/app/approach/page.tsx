import { pageMetadata } from "@/lib/brand";
import Link from "next/link";
import { businessLayers } from "@/lib/portfolio";
import { Ecosystem } from "@/components/ecosystem";

export const metadata = pageMetadata("The house — One standard, room to grow", "How Gent Reserve Co. connects product development, curation, commerce and logistics. Louisiana heritage. Exceptional goods across categories.");
export default function Approach() {
  return (
    <main id="main" className="house-page section-pad">
      <div className="house-intro">
        <p className="eyebrow">GENT RESERVE CO. / THE HOUSE</p>
        <h1>One standard.<br /><em>Room to grow.</em></h1>
        <p>Gent Reserve Co. is a premium commerce, curation, distribution, logistics and brand platform. We discover, develop, carry and distribute exceptional goods. Born in Lafayette, we select for quality, purpose and the people behind each product.</p>
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
          <p>Our opening focus is coffee, honey, sauces, seasonings, and provisions. Over time, the house can extend into grooming and personal care, wellness and supplements, apparel, watches and accessories, home and lifestyle, and hospitality and commercial goods.</p>
          <p>Groomed Gent Co. is part of the grooming direction we’re considering. Future categories and brands will be introduced when there is a real collection to explore. They are not available through this site today.</p>
        </div>
        <Ecosystem />
      </section>
      <section className="house-roots">
        <p className="eyebrow">OUR ORIGIN. OUR ADVANTAGE.</p>
        <h2>Born in Lafayette.<br /><em>Open to what’s exceptional.</em></h2>
        <p>Louisiana shapes our identity and relationships. Our selection reaches further. We favor USA-made goods where they fit; quality and brand fit guide every decision. We name each product’s origin clearly, wherever it is made.</p>
        <Link className="text-link" href="/#philosophy">Get to know our standard <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
