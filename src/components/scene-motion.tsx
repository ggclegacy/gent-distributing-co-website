"use client";
import { useEffect } from "react";
export function SceneMotion() {
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    nodes.forEach((n) => {
      n.classList.add("reveal-ready");
      observer.observe(n);
    });
    return () => {
      observer.disconnect();
      nodes.forEach((n) => n.classList.remove("reveal-ready"));
    };
  }, []);
  return null;
}
