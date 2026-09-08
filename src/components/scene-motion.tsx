"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ExperienceControls } from "./experience-controls";

/** Progressive enhancement: the server-rendered story is readable without GSAP. */
export function SceneMotion() {
  const rail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let revert: (() => void) | undefined;
    let generation = 0;
    const root = document.querySelector<HTMLElement>("[data-cinema]");
    if (!root) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = async () => {
      const ticket = ++generation;
      revert?.();
      revert = undefined;
      if (
        location.hash === "#origins" ||
        root.dataset.exchangeRenderer !== "webgl" ||
        reduced.matches ||
        document.documentElement.dataset.motion === "paused"
      )
        return;
      try {
        const { mountCinema } = await import("@/lib/cinema");
        if (disposed || ticket !== generation) return;
        revert = mountCinema(root, rail.current);
      } catch {
        // A failed optional motion chunk must never hide the content.
        root.removeAttribute("data-cinema-ready");
      }
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    const rendererObserver = new MutationObserver(sync);
    rendererObserver.observe(root, {attributes:true, attributeFilter:["data-exchange-renderer"]});
    reduced.addEventListener("change", sync);
    void sync();
    return () => {
      disposed = true;
      generation++;
      observer.disconnect();
      rendererObserver.disconnect();
      reduced.removeEventListener("change", sync);
      revert?.();
    };
  }, []);
  return (
    <div className="cinema-tools" ref={rail}>
      <div className="cinema-position" aria-hidden="true">
        <span data-act-label>01 / ROOTED HERE</span>
        <span className="cinema-track">
          <i data-act-progress />
        </span>
      </div>
      <Link href="#collection" className="cinema-skip">
        Go to collection ↗
      </Link>
      <nav className="scene-stepping" aria-label="Scene navigation">
        <button
          data-scene-prev
          aria-label="Previous scene"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("gent-scene-step", { detail: -1 }),
            )
          }
        >
          ←
        </button>
        <button
          data-scene-next
          aria-label="Next scene"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("gent-scene-step", { detail: 1 }),
            )
          }
        >
          →
        </button>
      </nav>
      <ExperienceControls />
    </div>
  );
}
