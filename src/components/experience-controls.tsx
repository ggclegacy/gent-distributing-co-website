"use client";
import { useEffect, useState } from "react";
export function ExperienceControls() {
  const [paused, setPaused] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      let stored = document.documentElement.dataset.motion === "paused";
      try {
        stored = sessionStorage.getItem("gent-motion") === "paused";
      } catch {}
      const next = media.matches || stored;
      setPaused(next);
      setSystemReduced(media.matches);
      document.documentElement.dataset.motion = next ? "paused" : "on";
    };
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("gent-motion-change", sync);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("gent-motion-change", sync);
    };
  }, []);
  function toggle() {
    const next = !paused;
    setPaused(next);
    document.documentElement.dataset.motion = next ? "paused" : "on";
    try {
      sessionStorage.setItem("gent-motion", next ? "paused" : "on");
    } catch {}
    window.dispatchEvent(new Event("gent-motion-change"));
  }
  return (
    <button
      className="motion-control"
      onClick={toggle}
      disabled={systemReduced}
      aria-pressed={paused}
      aria-label={
        systemReduced
          ? "Motion reduced by device preference"
          : paused
            ? "Motion off: enable visual motion"
            : "Motion on: pause visual motion"
      }
    >
      <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
      <span>Motion {systemReduced ? "reduced" : paused ? "off" : "on"}</span>
    </button>
  );
}
