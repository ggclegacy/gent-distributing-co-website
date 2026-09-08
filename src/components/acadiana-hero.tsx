import Link from "next/link";
import { DistributionEngine } from "./distribution-engine";

/** The entire narrative is server-rendered; cinema progressively layers these scenes. */
export function AcadianaHero() {
  return (
    <div className="homecoming-stage gent-engine-hero">
      <section className="hero scene" aria-labelledby="hero-title">
        <div className="hero-visual" role="group" aria-label="The Gent Exchange: sources converge through a selection aperture into purposeful distribution, beginning in Lafayette">
          <DistributionEngine />
        </div>
        <div className="hero-shade" />
        <div className="network-threshold" aria-hidden="true" />
        <p className="engine-opening-label" aria-hidden="true">GENT DISTRIBUTION CO. <span>THE EXCHANGE / 01</span></p>
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> 01 / ROOTED HERE</p>
          <h1 id="hero-title">Rooted here.<br /><em>Built to move further.</em></h1>
          <p className="hero-description">Born in Lafayette. We discover, develop, curate and distribute exceptional goods—from Louisiana and beyond.</p>
          <div className="hero-actions">
            <Link className="button" href="#collection">Explore the collection <span aria-hidden="true">↗</span></Link>
            <Link className="quiet-link" href="#origins">Follow our roots <span aria-hidden="true">↓</span></Link>
          </div>
          <p className="hero-categories">A MODERN DISTRIBUTION HOUSE. <b>/</b> ONE STANDARD.</p>
        </div>
        <div className="exchange-chapters" aria-hidden="true">
          <p className="exchange-chapter" data-chapter="0"><span>01 / THE IGNITION</span>Everything begins in Lafayette.</p>
          <p className="exchange-chapter" data-chapter="1"><span>02 / THE OPENING</span>A place in our house is earned.</p>
          <p className="exchange-chapter" data-chapter="2"><span>03 / THE CATEGORY VISION</span>Different categories. One standard.<small>Provisions first. New possibilities ahead.</small></p>
          <p className="exchange-chapter" data-chapter="3"><span>04 / THE REACH</span>Rooted here. Built to move further.</p>
        </div>
        <div className="network-story" aria-hidden="true">
          <div className="network-beat network-beat-origin"><p className="eyebrow">02 / SELECTED WITH PURPOSE</p><h2>Different categories.<br /><em>One standard.</em></h2><p>Discover. Develop. Curate.<br />A place in our house is earned.</p></div>
          <div className="network-beat network-beat-reach"><p className="eyebrow">03 / BUILT TO MOVE FURTHER</p><h2>One origin.<br /><em>Wider horizons.</em></h2><p>Exceptional goods. Wherever we find them.<br />New categories. The same standard.</p></div>
        </div>
        <div className="landscape-caption" aria-hidden="true"><span>SOURCING → SELECTION → GENT</span><span className="landscape-caption-detail">DISTRIBUTION → PEOPLE & PLACES.</span></div>
        <div className="hero-bottom">
          <Link href="#origins"><span className="scroll-line" /> SCROLL TO FOLLOW THE STORY</Link>
          <span>OUR ROOTS RUN DEEP. OUR REACH GROWS.</span>
          <span>EST. IN ACADIANA</span>
        </div>
      </section>
      <div className="engine-flow-story"><article><p className="eyebrow">02 / SELECTED WITH PURPOSE</p><h2>Different categories.<br/><em>One standard.</em></h2><p>Discover. Develop. Curate. From provisions to personal care, wellness, apparel and accessories, every new category must earn its place.</p></article><article><p className="eyebrow">03 / BUILT TO MOVE FURTHER</p><h2>One origin.<br/><em>Wider horizons.</em></h2><p>We’re building connections between exceptional goods and businesses, retail, hospitality and customers. Louisiana is where our story begins.</p></article></div>
      <section className="origin-story" id="origins" aria-labelledby="origin-title">
        <div className="origin-story-copy">
          <p className="eyebrow">01 / THE PLACE. &nbsp; 02 / THE CONNECTION.</p>
          <h2 id="origin-title">Deep roots.<br /><em>New routes.</em></h2>
          <p>Lafayette is home. Acadiana gives us our character, our first relationships, and a place to begin. From here, we’re building a distribution house for exceptional goods from Louisiana and beyond.</p>
          <p className="origin-method">Our roots guide how we do business. Our standard guides what we bring in.</p>
        </div>
        <div className="acadiana-network connection-outcomes">
          <article><span>01 / CARE FOR THE CRAFT</span><h3>Worth discovering.</h3><p>Exceptional goods from Louisiana and beyond, with thoughtful materials, careful work, and a story worth knowing.</p></article>
          <article><span>02 / OPPORTUNITY FOR BUSINESS</span><h3>Room to grow.</h3><p>Help local businesses stand out through a distinctive offering and meaningful product connections.</p></article>
          <article><span>03 / SOMETHING TO COME BACK FOR</span><h3>A new favorite.</h3><p>From provisions to future categories, give customers products that earn a place in everyday life.</p></article>
        </div>
        <div className="origin-products">
          <p className="eyebrow">03 / THE FIRST CHAPTER. &nbsp; 04 / ROOM TO GROW.</p>
          <p className="origin-product-line">Coffee. Honey. Sauces. Seasonings.<br /><em>A beginning. One lasting standard.</em></p>
          <span>We begin with provisions. Every new category must earn its place.</span>
        </div>
      </section>
    </div>
  );
}
