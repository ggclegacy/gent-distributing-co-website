import { getImageProps } from "next/image";
import type { CSSProperties } from "react";

type Scene = "workshop" | "vault" | "network" | "arrival";
const scenes = {
  workshop: { file: "product-intelligence-lab", title: "PRODUCT INTELLIGENCE", alt: "Concept of Gent’s product studio: developers evaluate sauce, coffee, honey, grooming formulations and packaging at a dark stone development table." },
  vault: { file: "product-vault", title: "PORTFOLIO / IN DEVELOPMENT", alt: "Concept of the Gent product vault: ten individually lit categories, from Legacy Reserve coffee to sauces, honey, grooming, wellness and lifestyle goods." },
  network: { file: "gent-network", title: "ORIGIN / CONNECTED REACH", alt: "Concept of Gent operations: mixed-category transport totes, operators inspecting and scanning products, and purposeful packing and distribution stations." },
  arrival: { file: "gent-exchange", title: "THE GENT EXCHANGE", alt: "Concept of a Louisiana Gent product salon: makers pour and demonstrate samples while retailers, hospitality operators and customers discover exceptional goods." },
};
const categories = ["COFFEE", "SAUCE", "SEASONING", "HONEY", "CANE / PANTRY", "SNACKS", "GROOMING", "WELLNESS", "BEVERAGE", "LIFESTYLE"];
const mobileCoordinates = [[44,57],[10,63],[23,85],[24,64],[42,88],[67,69],[6,89],[60,92],[77,90],[85,72]];
const coordinates = [[49,70],[92,65],[77,82],[68,73],[60,61],[82,58],[15,70],[23,70],[29,72],[36,67]];

/** Real picture sources: the phone receives a separate vertically composed photograph.
 * The tracking layer shares the camera plane; DOM text stays sharp at every density.
 * All operational displays are explicitly conceptual, never live inventory or scores. */
export function StoryEnvironment({ scene }: { scene: Scene }) {
  const info = scenes[scene];
  const shared = { alt: info.alt, sizes: "100vw", quality: 75, loading: "lazy" as const };
  const desktop = getImageProps({ ...shared, src: `/images/story/${info.file}-landscape.webp`, width: 1536, height: 1024 }).props;
  const portrait = getImageProps({ ...shared, src: `/images/story/${info.file}-portrait.webp`, width: 1024, height: 1536 }).props;
  return <div className={`material-environment story-environment environment-${scene}`}>
    <div className="environment-camera">
      <div className="room-plane">
        <picture>
          <source media="(max-width: 699px) and (orientation: portrait)" srcSet={portrait.srcSet} sizes="100vw" />
          {/* getImageProps supplies the optimized fallback, intrinsic size and responsive srcset. */}
          <img {...desktop} alt={info.alt} className="environment-image" />
        </picture>
        <div className={`gent-intelligence intelligence-${scene}`} aria-hidden="true">
          <div className="intelligence-heading"><span>GENT / {info.title}</span><small>VISION IN DEVELOPMENT</small></div>
          {scene === "workshop" && <>
            <div className="evaluation-record">
              <span className="record-ref">EVALUATION / CONSUMER GOODS</span>
              {[["ORIGIN / INGREDIENTS", "TRACE"], ["QUALITY / FORMULATION", "TEST"], ["COST / MARGIN", "MODEL"], ["PACKAGING / SHELF FIT", "REFINE"], ["MARKET / GENT SCORE", "REVIEW"]].map(([label, status]) => <div className="evaluation-row" key={label}><span>{label}</span><b>{status}</b><i /></div>)}
              <div className="evaluation-outcomes"><span className="evaluation-pass">✓ ADVANCE</span><span className="evaluation-hold">◌ UNDER EVALUATION</span></div>
            </div>
            <span className="object-tracker tracker-formulation">FORMULATION <small>SAUCE / SAMPLE SERIES</small></span>
            <span className="object-tracker tracker-package">PACKAGING <small>MATERIAL / SHELF FIT</small></span>
          </>}
          {scene === "vault" && <>
            <div className="vault-index">{categories.map((category, i) => <span className="vault-bay" key={category} style={{ "--bay-x": `${coordinates[i][0]}%`, "--bay-y": `${coordinates[i][1]}%`, "--bay-mx": `${mobileCoordinates[i][0]}%`, "--bay-my": `${mobileCoordinates[i][1]}%`, "--bay-index": i } as CSSProperties}><i /><small>{String(i + 1).padStart(2, "0")} / {category}</small></span>)}</div>
            <div className="portfolio-record"><span>GENT / OWNED <b>LEGACY RESERVE</b><small>FIRST PRODUCT CONCEPT</small></span><span>GENT / PARTNER <b>EXCEPTIONAL MAKERS</b><small>FUTURE PORTFOLIO</small></span></div>
          </>}
          {scene === "network" && <>
            <div className="route-system">
              <div className="route-origin"><i /><span>LAFAYETTE<small>30.2241° N / 92.0198° W</small></span></div>
              <div className="route-reach">{["ACADIANA", "LOUISIANA", "GULF SOUTH", "NATIONAL"].map((place, i) => <span className="route-destination" key={place}><i className="route-segment" /><b>{String(i + 1).padStart(2, "0")}</b>{place}</span>)}</div>
              <span className="route-caption">ORIGIN → EXPANSION / THE AMBITION</span>
            </div>
            <div className="cargo-scan" />
            <div className="channel-system"><span>MAKER → GENT</span><div>{["BARBERSHOP", "SPECIALTY RETAIL", "WELLNESS", "HOSPITALITY", "CUSTOMER"].map(name => <span className="channel-destination" key={name}>{name}</span>)}</div></div>
            <span className="object-tracker tracker-cargo">MIXED CATEGORY / CONSOLIDATE<small>INSPECT → SCAN → PACK → ROUTE</small></span>
          </>}
          {scene === "arrival" && <>
            <span className="object-tracker exchange-identity identity-maker">MAKER / PROVISIONS<small>ORIGIN → RELATIONSHIP</small></span>
            <span className="object-tracker exchange-identity identity-buyer">DISCOVERY / SPECIALTY RETAIL<small>PRODUCT → SHELF</small></span>
            <div className="exchange-record"><span>THE FUTURE EXCHANGE</span><b>MAKERS × PRODUCTS × PEOPLE</b><small>DISCOVER THROUGH GENT</small></div>
          </>}
        </div>
      </div>
    </div>
    <div className="environment-shade" aria-hidden="true" />
    <div className="environment-light" aria-hidden="true" />
    <div className="environment-foreground" aria-hidden="true" />
    <span className="scene-concept-note">THE GENT VISION / CONCEPT ENVIRONMENT</span>
  </div>;
}
