import Image from "next/image";

/** Art-directed planes share one playhead with the physical origin and presentation case. */
export function ProductStory() {
  return <div className="product-story" aria-hidden="true">
    <div className="story-studio story-environment">
      <Image unoptimized src="/images/story/product-intelligence-lab-landscape.webp" alt="" fill sizes="100vw" />
    </div>
    <div className="story-arrival story-environment">
      <Image unoptimized src="/images/story/gent-exchange-landscape.webp" alt="" fill sizes="100vw" />
      <div className="story-arrival-caption"><span>FROM OUR HOUSE TO YOURS</span><strong>Good things.<br/>In the right hands.</strong></div>
    </div>
    <div className="story-light" />
    <div className="story-floor"><i /><i /><i /></div>
    <div className="story-products">
      <figure className="story-good story-honey">
        <Image unoptimized src="/images/story-film/gent-honey.png" alt="" fill sizes="(max-width:699px) 32vw, 300px" />
        <figcaption>02 / HONEY</figcaption>
      </figure>
      <figure className="story-good story-seasonings">
        <Image unoptimized src="/images/story-film/gent-seasonings.png" alt="" fill sizes="(max-width:699px) 32vw, 300px" />
        <figcaption>03 / SEASONINGS</figcaption>
      </figure>
      <figure className="story-good story-coffee">
        <Image unoptimized src="/images/cinema/coffee-object.webp" alt="" fill sizes="(max-width:699px) 45vw, 400px" priority />
        <figcaption>01 / LEGACY RESERVE</figcaption>
      </figure>
      <div className="story-scan"><div /><i /><span>THE GENT STANDARD</span></div>
    </div>
    <div className="story-dossier">
      <div className="story-dossier-index"><span>G / 001</span><i /> PRODUCT IDENTITY</div>
      <h3>Legacy<br/><em>Reserve.</em></h3>
      <p>Signature Blend Coffee</p>
      <div className="story-dossier-rule" />
      <dl><div><dt>HOUSE</dt><dd>Gent developed</dd></div><div><dt>COLLECTION</dt><dd>Provisions</dd></div><div><dt>RELEASE</dt><dd>In development</dd></div></dl>
      <div className="story-detail-list"><span>01 <b>Source & character</b></span><span>02 <b>Formulation & craft</b></span><span>03 <b>Packaging & presentation</b></span></div>
    </div>
    <div className="story-instrument">
      <span>PRODUCT DEVELOPMENT</span>
      <svg viewBox="0 0 140 140"><circle cx="70" cy="70" r="62"/><circle cx="70" cy="70" r="49"/><path d="M70 0V24M70 116V140M0 70H24M116 70H140M33 33L47 47M93 93L107 107M107 33L93 47M47 93L33 107"/><path className="story-instrument-sweep" d="M70 8A62 62 0 0 1 132 70"/></svg>
      <strong>Consider.<br/>Refine.<br/>Earn the name.</strong>
    </div>
    <div className="story-distribution">
      <div className="story-network-heading"><span>THE GENT RESERVE NETWORK</span><p>One standard. Every connection.</p></div>
      <svg className="story-route-map" viewBox="0 0 1000 400" preserveAspectRatio="none">
        <defs><linearGradient id="gent-route-gold"><stop stopColor="#597a61"/><stop offset=".5" stopColor="#dcc184"/><stop offset="1" stopColor="#a7894d"/></linearGradient></defs>
        <g className="story-route-grid"><path d="M0 100H1000M0 200H1000M0 300H1000M125 0V400M375 0V400M625 0V400M875 0V400"/></g>
        <path className="story-route source-route" pathLength="1" d="M65 200H405"/>
        <path className="story-route branch-route" pathLength="1" d="M405 200C545 200 525 75 675 75M405 200C545 200 525 325 675 325"/>
        <path className="story-route destination-route" pathLength="1" d="M675 75C810 75 785 200 935 200M675 325C810 325 785 200 935 200"/>
        <g className="story-route-nodes"><circle cx="65" cy="200" r="6"/><circle cx="405" cy="200" r="13"/><circle cx="675" cy="75" r="6"/><circle cx="675" cy="325" r="6"/><circle cx="935" cy="200" r="6"/></g>
        <path className="story-route-pulse" d="M65 200H405C545 200 525 75 675 75C810 75 785 200 935 200"/>
      </svg>
      <div className="story-node story-node-maker"><small>01 / ORIGIN</small><b>Makers</b><span>Ideas. Craft. Character.</span></div>
      <div className="story-node story-node-gent"><small>02 / THE CONNECTION</small><b>GENT</b><span>Develop · Select · Distribute</span></div>
      <div className="story-node story-node-retail"><small>03 / CHANNEL</small><b>Retail</b></div>
      <div className="story-node story-node-hospitality"><small>03 / CHANNEL</small><b>Hospitality</b></div>
      <div className="story-node story-node-people"><small>04 / DESTINATION</small><b>People</b><span>The reason it moves.</span></div>
      <span className="story-network-footnote">LOUISIANA ORIGIN / A VISION FOR WIDER REACH</span>
    </div>
    <div className="story-brand-mark"><svg viewBox="0 0 48 48" fill="none"><path d="M37 14L30 7H17L7 17V31L17 41H31L41 31V23H24V30H33L28 35H20L14 29V20L20 14H28L32 18" stroke="currentColor" strokeWidth="1.6"/></svg><span>GENT</span><small>RESERVE CO.</small></div>
    <div className="story-concept-note">THE GENT VISION / PRODUCT & PACKAGING CONCEPTS</div>
    <div className="story-chapter-rail">{["Origin","Discover","Develop","Select","Reveal","Connect","Arrive","Gent"].map((label,i)=><div key={label} data-story-step={i}><i/><span>{label}</span></div>)}</div>
  </div>;
}
