"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { StoryEnvironment } from "./story-environment";
import { MembershipCard } from "./membership-card";
import { ProductExplorer } from "./product-explorer";
import type { IntelligenceRecord } from "@/lib/intelligence";

/** One intelligence plane, one selected record, one motion owner per viewport. */
export function IntelligenceScene({ record }: { record: IntelligenceRecord }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const scene = root.current!;
    const journey = scene.closest("[data-cinema]")!;
    let frame = 0;
    let visible = false;
    let last = -1;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = (progress: number) => {
      const phase = Math.min(3, Math.floor(Math.max(0, progress) * 4));
      if (phase !== last) {
        last = phase;
        setActive(phase);
      }
      scene.style.setProperty("--il-progress", String(progress));
    };
    const read = () => {
      frame = 0;
      if (
        !visible ||
        journey.hasAttribute("data-cinema-ready") ||
        media.matches ||
        document.documentElement.dataset.motion === "paused"
      )
        return;
      const rect = scene.getBoundingClientRect();
      update(
        Math.max(
          0,
          Math.min(
            1,
            (145 - rect.top) / Math.max(1, rect.height - innerHeight + 145),
          ),
        ),
      );
    };
    const scroll = () => {
      if (!frame && visible) frame = requestAnimationFrame(read);
    };
    const film = (event: Event) =>
      update((event as CustomEvent<number>).detail);
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible) scroll();
      },
      { rootMargin: "100px" },
    );
    observer.observe(scene);
    const sizeObserver = new ResizeObserver(() => {
      scene.classList.toggle(
        "il-tall",
        scene.querySelector(".il-composition")!.getBoundingClientRect().height >
          innerHeight,
      );
    });
    sizeObserver.observe(scene.querySelector(".il-composition")!);
    const mutation = new MutationObserver(scroll);
    mutation.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    scene.addEventListener("gent-intelligence-progress", film);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    media.addEventListener("change", scroll);
    return () => {
      observer.disconnect();
      sizeObserver.disconnect();
      mutation.disconnect();
      cancelAnimationFrame(frame);
      scene.removeEventListener("gent-intelligence-progress", film);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      media.removeEventListener("change", scroll);
    };
  }, []);
  const isCollection = record.scene === "vault";
  return (
    <section
      ref={root}
      id={record.id}
      className={`material-scene il-scene il-${record.scene}`}
      data-scene={record.scene}
      data-intelligence
      data-phase={active}
      aria-labelledby={`${record.id}-title`}
    >
      <div className="il-viewport">
        <noscript>
          <style>{`.il-records article[hidden]{display:block;margin-top:28px}.il-phase-nav{display:none}.il-viewport{position:relative}.il-scene{min-height:auto!important}`}</style>
        </noscript>
        <StoryEnvironment scene={record.scene} instrumentation={false} />
        <div className="il-composition">
          <div className="il-scene-label">
            <span>
              {record.number} / {record.name}
            </span>
            <span>GENT INTELLIGENCE LAYER</span>
          </div>
          <div className="il-plane">
            <div className="il-system">
              <span>
                <i /> {record.eyebrow}
              </span>
              <span>0{active + 1} / 04</span>
            </div>
            <h2 id={`${record.id}-title`}>{record.title}</h2>
            <div className="il-phase-nav" aria-label={`${record.name} phases`}>
              {record.phases.map((phase, i) => (
                <button
                  key={phase.label}
                  aria-pressed={active === i}
                  aria-controls={`${record.id}-record-${i}`}
                  onClick={() => setActive(i)}
                >
                  <span>0{i + 1}</span>
                  {phase.label}
                  <i
                    style={
                      {
                        "--node-complete": i <= active ? 1 : 0,
                      } as CSSProperties
                    }
                  />
                </button>
              ))}
            </div>
            <div
              className={`il-body ${record.scene !== "network" ? "il-with-object" : ""}`}
            >
              <div className="il-records">
                {record.phases.map((phase, i) => (
                  <article
                    key={phase.label}
                    id={`${record.id}-record-${i}`}
                    hidden={i !== active}
                  >
                    <p className="il-kicker">
                      {phase.label} / INTELLIGENCE RECORD
                    </p>
                    <h3>{phase.title}</h3>
                    <p className="il-description">{phase.copy}</p>
                    <dl>
                      {phase.fields.map(([label, value]) => (
                        <div key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </article>
                ))}
              </div>
              {record.scene === "workshop" && (
                <div
                  className="il-standard-seal"
                  aria-label={`Standard phase ${active + 1} of 4: ${record.phases[active].label}`}
                >
                  <svg viewBox="0 0 240 240" aria-hidden="true">
                    <circle
                      cx="120"
                      cy="120"
                      r="99"
                      className="il-seal-track"
                    />
                    {record.phases.map((phase, i) => (
                      <circle
                        key={phase.label}
                        cx="120"
                        cy="120"
                        r="99"
                        pathLength="100"
                        strokeDasharray="23 77"
                        strokeDashoffset={-i * 25}
                        className={i <= active ? "il-seal-lit" : ""}
                      />
                    ))}
                    <circle
                      cx="120"
                      cy="120"
                      r="82"
                      className="il-seal-inner"
                    />
                  </svg>
                  <div>
                    <small>THE GENT STANDARD</small>
                    <strong>
                      {active === 3 ? "GENT" : "0" + (active + 1)}
                    </strong>
                    <span>
                      {active === 3 ? "APPROVED" : record.phases[active].label}
                    </span>
                  </div>
                </div>
              )}
              {isCollection && (
                <div className="il-product">
                  <div className="il-orbit" aria-hidden="true" />
                  <Image
                    src="/images/cinema/coffee-object.webp"
                    alt="Legacy Reserve coffee bag, concept packaging"
                    width={700}
                    height={900}
                    sizes="(max-width: 699px) 130px, 280px"
                  />
                  <span>
                    01 / LEGACY RESERVE<small>CONCEPT PACKAGING</small>
                  </span>
                </div>
              )}
              {record.scene === "arrival" && (
                <div className="il-credential">
                  <MembershipCard />
                  <span>
                    PRIVATE NETWORK / PREVIEW
                    <small>ACCESS VISION · NOT AN ACTIVE CREDENTIAL</small>
                  </span>
                </div>
              )}
            </div>
            {record.scene === "network" && (
              <div
                className="il-network-graph"
                aria-label="Makers connect through Gent to retail and hospitality, reaching customers"
              >
                {["MAKER", "GENT", "RETAIL / HOSPITALITY", "CUSTOMER"].map(
                  (name, i) => (
                    <div key={name} data-connected={i <= active}>
                      <i />
                      <strong>{name}</strong>
                      <small>
                        {
                          [
                            "Craft + origin",
                            "Develop + distribute",
                            "Business channels",
                            "Daily life",
                          ][i]
                        }
                      </small>
                    </div>
                  ),
                )}
              </div>
            )}
            {record.scene === "network" && (
              <div
                className="il-reach"
                aria-label="Origin and expansion ambition"
              >
                {[
                  "LAFAYETTE",
                  "ACADIANA",
                  "LOUISIANA",
                  "GULF SOUTH",
                  "NATIONAL",
                ].map((place, i) => (
                  <span key={place} data-reached={i <= active + 1}>
                    {place}
                    {i > 2 && <small>AMBITION</small>}
                  </span>
                ))}
              </div>
            )}
            <div className="il-resolution">
              <span>
                {active === 3 ? record.conclusion : "ONE HOUSE. ONE STANDARD."}
              </span>
              <span>
                {active === 3 ? "04 / RESOLVED" : "SCROLL TO EXPLORE ↓"}
              </span>
            </div>
            {record.scene === "network" && (
              <Link className="il-link" href="/approach">
                Explore the house ↗
              </Link>
            )}
            {record.scene === "arrival" && (
              <Link className="il-link" href="/membership">
                See the membership plans ↗
              </Link>
            )}
            {isCollection && (
              <Link className="il-link" href="/products/gent-coffee">
                Explore Legacy Reserve ↗
              </Link>
            )}
          </div>
          <div className="il-peripheral">
            <span>{record.status}</span>
            <span>
              {record.scene === "network"
                ? "LAFAYETTE → ACADIANA → LOUISIANA → BEYOND"
                : "GENT / WORTH KNOWING. WORTH HAVING."}
            </span>
          </div>
          {isCollection && (
            <details className="il-collection-index">
              <summary>
                Explore all categories <span>+</span>
              </summary>
              <ProductExplorer />
            </details>
          )}
        </div>
      </div>
    </section>
  );
}
