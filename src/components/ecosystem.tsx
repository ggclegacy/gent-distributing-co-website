import { BrandMark } from "./brand-mark";
export function Ecosystem() {
  return (
    <div
      className="ecosystem-map"
      role="img"
      aria-label="Gent brings makers and goods to more people through selection, storytelling, commerce, and distribution"
    >
      <svg
        className="network-lines"
        viewBox="0 0 700 500"
        fill="none"
        aria-hidden="true"
      >
        <ellipse
          cx="350"
          cy="250"
          rx="270"
          ry="165"
          stroke="currentColor"
          strokeOpacity=".18"
        />
        <ellipse
          cx="350"
          cy="250"
          rx="200"
          ry="225"
          stroke="currentColor"
          strokeOpacity=".1"
          transform="rotate(55 350 250)"
        />
        <path
          d="M110 155Q250 160 350 250T585 365M585 130Q425 130 350 250T135 380"
          stroke="currentColor"
          strokeOpacity=".4"
        />
        <path
          d="M110 155Q320 15 585 130M135 380Q350 470 585 365"
          stroke="currentColor"
          strokeOpacity=".15"
          strokeDasharray="3 8"
        />
        <circle
          cx="350"
          cy="250"
          r="82"
          stroke="currentColor"
          strokeOpacity=".2"
        />
        <circle
          cx="350"
          cy="250"
          r="110"
          stroke="currentColor"
          strokeOpacity=".08"
        />
      </svg>
      <div className="network-core">
        <BrandMark />
      </div>
      <span className="network-node node-origin">
        <i />
        KNOW THE MAKER
      </span>
      <span className="network-node node-house">
        <i />
        SELECT WITH CARE
      </span>
      <span className="network-node node-distribution">
        <i />
        TELL THE STORY
      </span>
      <span className="network-node node-member">
        <i />
        BRING IT TO MORE PEOPLE
      </span>
      <span className="map-caption">THE GENT APPROACH / BUILT ON TRUST</span>
    </div>
  );
}
