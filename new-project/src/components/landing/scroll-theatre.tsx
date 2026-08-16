"use client";

import { useEffect } from "react";

export function ScrollTheatre() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const nodes = Array.from(document.querySelectorAll("main section")).slice(1);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    for (const node of nodes) {
      node.classList.add("theatre");
      observer.observe(node);
    }
    return () => observer.disconnect();
  }, []);

  return null;
}
