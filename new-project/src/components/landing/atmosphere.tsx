"use client";

import { useEffect, useRef } from "react";

export function Atmosphere() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const dots = Array.from({ length: 56 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.15 + 0.2,
      s: Math.random() * 0.09 + 0.02,
      a: Math.random() * 0.32 + 0.08,
      hue: i % 5,
    }));

    let raf = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }

    function colour(hue: number, a: number) {
      if (hue === 0) return `rgba(73, 230, 255, ${a})`;
      if (hue === 1) return `rgba(139, 92, 255, ${a})`;
      if (hue === 2) return `rgba(228, 71, 209, ${a})`;
      if (hue === 3) return `rgba(82, 119, 255, ${a})`;
      return `rgba(255, 77, 184, ${a * 0.7})`;
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      for (const dot of dots) {
        dot.y -= dot.s / 1500;
        if (dot.y < 0) dot.y = 1;
        ctx.beginPath();
        ctx.fillStyle = colour(dot.hue, dot.a);
        ctx.arc(dot.x * w, dot.y * h, dot.r * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = window.requestAnimationFrame(draw);
    }

    resize();
    raf = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-[-18%] top-[-22%] h-[42vw] w-[42vw] rounded-full bg-cyan/12 blur-[140px]" />
      <div className="absolute right-[-16%] top-[6%] h-[28vw] w-[28vw] rounded-full bg-violet/16 blur-[130px]" />
      <div className="absolute bottom-[-18%] left-[18%] h-[26vw] w-[34vw] rounded-full bg-magenta/10 blur-[150px]" />
      <canvas ref={ref} className="absolute inset-0 opacity-80" />
    </div>
  );
}
