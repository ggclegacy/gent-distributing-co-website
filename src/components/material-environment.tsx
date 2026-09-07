import Image from "next/image";
import { scenePlaceholders } from "@/lib/scene-placeholders";

const rooms = { workshop: "innovation-lab", vault: "reveal-chamber", network: "distribution-center", arrival: "private-network" };

type Scene = "workshop" | "vault" | "network" | "arrival";
/** Responsive photographic architecture plus separately animated physical objects.
 * The room plane keeps object contact points aligned at every aspect ratio. */
export function MaterialEnvironment({ scene }: { scene: Scene }) {
  return <div className={`material-environment environment-${scene}`} aria-hidden="true">
    <div className="environment-camera">
      <div className="room-plane">
        <Image src={`/images/cinema/${rooms[scene]}.webp`} alt="" fill sizes="(max-width: 999px) 120vh, 100vw" quality={75} placeholder="blur" blurDataURL={scenePlaceholders[scene]} loading="lazy" className="environment-image" />
        {scene === "vault" && <div className="physical-coffee"><Image src="/images/cinema/coffee-object.webp" alt="" fill sizes="(max-width: 999px) 220px, 18vw" className="coffee-cutout" /><div className="coffee-glint" /></div>}
        {scene === "network" && <div className="resting-case network-case"><TransitCase /></div>}
        {scene === "arrival" && <><div className="resting-case arrival-case"><TransitCase /></div><div className="physical-card"><Image src="/images/cinema/card-object.webp" alt="" fill sizes="(max-width: 999px) 280px, 30vw" className="card-cutout" /><div className="card-glint" /></div></>}
      </div>
    </div>
    <div className="facility-interface"><span>GENT / {scene === "workshop" ? "DEVELOPMENT" : scene === "vault" ? "RELEASE SYSTEM" : scene === "network" ? "CONNECTED REACH" : "PRIVATE ACCESS"}</span><div className="facility-data">{[38, 72, 53, 91, 64, 85, 100].map((value, i) => <i key={i} style={{ height: `${value}%` }} />)}</div><div className="facility-route"><i /><i /><i /><i /></div><small>{scene === "workshop" ? "SOURCE / TEST / REFINE" : scene === "vault" ? "ONE STANDARD. MANY POSSIBILITIES." : scene === "network" ? "ORIGIN → OPPORTUNITY" : "DISCOVER / CONNECT / BELONG"}</small></div>
    <div className="facility-sweep" />
    <div className="environment-shade" />
    <div className="environment-light" />
    <div className="environment-foreground" />
  </div>;
}
/** This case remains mounted between the distribution hall and the arrival table. */
export function TransitCase() {
  return <div className="transit-case"><Image src="/images/cinema/precision-case.webp" alt="" fill sizes="(max-width: 999px) 240px, 25vw" className="case-cutout" /><div className="case-glint" /></div>;
}
