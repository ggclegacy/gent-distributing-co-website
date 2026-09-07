import Image from "next/image";
import { BrandMark } from "./brand-mark";
import { scenePlaceholders } from "@/lib/scene-placeholders";

type Scene = "workshop" | "vault" | "network" | "arrival";
/** Responsive photographic architecture plus separately animated physical objects.
 * The room plane keeps object contact points aligned at every aspect ratio. */
export function MaterialEnvironment({ scene }: { scene: Scene }) {
  return <div className={`material-environment environment-${scene}`} aria-hidden="true">
    <div className="environment-camera">
      <div className="room-plane">
        <Image src={`/images/cinema/${scene === "workshop" ? scene : scene + "-room"}.webp`} alt="" fill sizes="(max-width: 999px) 120vh, 100vw" quality={75} placeholder="blur" blurDataURL={scenePlaceholders[scene]} loading="lazy" className="environment-image" />
        {scene === "vault" && <div className="physical-coffee"><Image src="/images/cinema/coffee-object.webp" alt="" fill sizes="(max-width: 999px) 220px, 18vw" className="coffee-cutout" /><div className="coffee-glint" /></div>}
        {scene === "network" && <div className="resting-case network-case"><TransitCase /></div>}
        {scene === "arrival" && <><div className="resting-case arrival-case"><TransitCase /></div><div className="physical-card"><Image src="/images/cinema/card-object.webp" alt="" fill sizes="(max-width: 999px) 280px, 30vw" className="card-cutout" /><div className="card-glint" /></div></>}
      </div>
    </div>
    <div className="environment-shade" />
    <div className="environment-light" />
    <div className="environment-foreground" />
  </div>;
}
/** This case remains mounted between the distribution hall and the arrival table. */
export function TransitCase() {
  return <div className="transit-case"><Image src="/images/cinema/case-object.webp" alt="" fill sizes="(max-width: 999px) 240px, 25vw" className="case-cutout" /><span className="case-seal"><BrandMark /></span><div className="case-glint" /></div>;
}
