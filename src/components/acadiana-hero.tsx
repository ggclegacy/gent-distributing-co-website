import "../app/acadiana-hero.css";
import Image from "next/image";
import Link from "next/link";
import landscape from "../../public/images/acadiana-first-light.webp";

const routes = [
  "M300 240 C270 180 195 205 150 145 S100 90 75 90",
  "M300 240 C280 180 330 150 300 70",
  "M300 240 C380 225 390 155 495 135",
  "M300 240 C380 255 400 335 510 350",
  "M300 240 C290 295 235 310 240 410",
  "M300 240 C215 245 160 320 70 300",
];

/** The entire narrative is server-rendered; cinema progressively layers these scenes. */
export function AcadianaHero() {
  return (
    <div className="homecoming-stage">
      <section className="hero scene" aria-labelledby="hero-title">
        <div className="hero-visual">
          <Image src={landscape} alt="" fill sizes="(max-aspect-ratio: 16/9) 178svh, 100vw" preload placeholder="blur" />
        </div>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> LAFAYETTE, LOUISIANA</p>
          <h1 id="hero-title">Rooted here.<br /><em>Built to move.</em></h1>
          <p className="hero-description">Premium goods born in Acadiana.<br />Distributed with purpose.</p>
          <div className="hero-actions">
            <Link className="button" href="#collection">Explore the collection <span aria-hidden="true">↗</span></Link>
            <Link className="quiet-link" href="#origins">Follow our roots <span aria-hidden="true">↓</span></Link>
          </div>
          <p className="hero-categories">Coffee <b>·</b> Honey <b>·</b> Seasoning <b>·</b> Sauces <b>·</b> Local Goods</p>
        </div>
        <div className="landscape-caption" aria-hidden="true"><span>ROOTED IN ACADIANA</span> SOUTH LOUISIANA / FIRST LIGHT</div>
        <div className="hero-bottom">
          <a href="#origins"><span className="scroll-line" /> SCROLL TO FOLLOW THE STORY</a>
          <span>OUR ROOTS RUN DEEP. OUR REACH GROWS.</span>
          <span>EST. IN ACADIANA</span>
        </div>
      </section>
      <section className="origin-story" id="origins" aria-labelledby="origin-title">
        <div className="origin-story-copy">
          <p className="eyebrow">01 / THE PLACE. &nbsp; 02 / THE CONNECTION.</p>
          <h2 id="origin-title">Deep roots.<br /><em>New routes.</em></h2>
          <p>From Lafayette, we connect the people who make exceptional goods with the communities that make this place home.</p>
          <p className="origin-method">Local relationships. Modern distribution.</p>
        </div>
        <div className="acadiana-network" role="img" aria-label="An illustrative network radiates from Lafayette to makers, neighborhood shelves, and tables across Acadiana.">
          <svg viewBox="0 0 600 480" aria-hidden="true">
            <defs>
              <radialGradient id="origin-halo"><stop stopColor="#C4912F" stopOpacity=".24" /><stop offset="1" stopColor="#C4912F" stopOpacity="0" /></radialGradient>
            </defs>
            <circle cx="300" cy="240" r="190" fill="url(#origin-halo)" />
            <g className="route-contours" fill="none" stroke="currentColor">
              <ellipse cx="300" cy="240" rx="240" ry="185" /><ellipse cx="300" cy="240" rx="175" ry="135" />
              <path d="M35 240H565M300 25V450" strokeDasharray="2 10" />
            </g>
            <g className="origin-routes" fill="none" stroke="currentColor" strokeWidth="1.4">
              {routes.map((d) => <path key={d} d={d} />)}
            </g>
            <g className="route-destinations" fill="currentColor">
              {[[75,90],[300,70],[495,135],[510,350],[240,410],[70,300]].map(([cx,cy]) => <circle key={cx} cx={cx} cy={cy} r="3" />)}
            </g>
            <circle className="origin-ring" cx="300" cy="240" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle className="origin-core" cx="300" cy="240" r="4" fill="#efce8d" />
            <g className="origin-map-label" fill="#eddec0" textAnchor="middle"><text x="300" y="278">LAFAYETTE</text><text className="origin-map-subtitle" x="300" y="297">LOUISIANA · OUR ORIGIN</text></g>
            <g className="destination-labels" fill="#c2b89f"><text x="65" y="70">LOCAL MAKERS</text><text x="395" y="115">NEIGHBORHOOD SHELVES</text><text x="345" y="380">ACADIANA TABLES</text></g>
          </svg>
          <p className="network-caption">ONE LOCAL ORIGIN. A REGION OF POSSIBILITIES.</p>
        </div>
        <div className="origin-products">
          <p className="eyebrow">03 / LOCAL GOODS. &nbsp; 04 / OUR REGION.</p>
          <p className="origin-product-line">Coffee. Honey. Seasoning. Sauces.<br /><em>Made here. Meant to be shared.</em></p>
          <span>From the maker’s hands to the places we gather.</span>
        </div>
      </section>
    </div>
  );
}
