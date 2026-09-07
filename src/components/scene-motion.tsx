"use client";
import { useEffect } from "react";
export function SceneMotion() {
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    if (!media.matches) {
      nodes.forEach((node) => {
        node.classList.add("reveal-ready");
        observer.observe(node);
      });
    }
    return () => {
      observer.disconnect();
      nodes.forEach((node) => node.classList.remove("reveal-ready"));
    };
  }, []);
  return null;
}
