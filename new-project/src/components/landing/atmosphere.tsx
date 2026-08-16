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

    const dots = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      s: Math.random() * 0.12 + 0.03,
      a: Math.random() * 0.45 + 0.12,
    }));

    let frame = 0;
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
      for (let i = 0; i < dots.length; i += 1) {
        const a = dots[i];
        if (!a) continue;
        a.y -= a.s / 1200;
        if (a.y < 0) a.y = 1;
        for (let j = i + 1; j < dots.length; j += 1) {
          const b = dots[j];
          if (!b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0.12) continue;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(125, 211, 252, ${0.09 - dist * 0.45})`;
          ctx.lineWidth = 0.7 * window.devicePixelRatio;
          ctx.moveTo(a.x * w, a.y * h);
          ctx.lineTo(b.x * w, b.y * h);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(180, 160, 255, ${a.a})`;
        ctx.arc(a.x * w, a.y * h, a.r * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }
      frame += 1;
      if (frame % 2 === 0) {
        /* keep it light */
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
      <div className="aurora absolute -left-1/4 -top-1/4 h-[70vw] w-[70vw] rounded-full bg-[#6d3bff]/35 blur-[120px]" />
      <div className="aurora-2 absolute -right-1/5 top-0 h-[55vw] w-[55vw] rounded-full bg-[#4d6fff]/28 blur-[130px]" />
      <div className="aurora absolute bottom-[-20%] left-[20%] h-[40vw] w-[50vw] rounded-full bg-[#ff5ad9]/18 blur-[140px]" />
      <div className="aurora-2 absolute right-[10%] top-[40%] h-[30vw] w-[30vw] rounded-full bg-[#4df0ff]/16 blur-[110px]" />
      <canvas ref={ref} className="absolute inset-0 opacity-80" />
    </div>
  );
}
