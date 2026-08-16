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

    const dots = Array.from({ length: 42 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.1 + 0.25,
      s: Math.random() * 0.08 + 0.02,
      a: Math.random() * 0.28 + 0.08,
    }));

    let raf = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      for (const dot of dots) {
        dot.y -= dot.s / 1400;
        if (dot.y < 0) dot.y = 1;
        ctx.beginPath();
        ctx.fillStyle = `rgba(174, 185, 200, ${dot.a})`;
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
      <div className="absolute -left-1/4 top-[-18%] h-[58vw] w-[58vw] rounded-full bg-[#3475ff]/18 blur-[140px]" />
      <div className="absolute right-[-12%] top-[8%] h-[36vw] w-[36vw] rounded-full bg-[#36d8ff]/10 blur-[130px]" />
      <div className="absolute bottom-[-22%] left-[28%] h-[32vw] w-[40vw] rounded-full bg-[#725cff]/8 blur-[150px]" />
      <canvas ref={ref} className="absolute inset-0 opacity-70" />
    </div>
  );
}
