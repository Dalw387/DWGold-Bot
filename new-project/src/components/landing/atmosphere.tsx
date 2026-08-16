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

    const count = window.innerWidth < 768 ? 28 : 64;
    const dots = Array.from({ length: count }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.25,
      s: Math.random() * 0.1 + 0.02,
      a: Math.random() * 0.34 + 0.1,
      hue: i % 5,
    }));
    const mouse = { x: 0.5, y: 0.2 };

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
      return `rgba(255, 77, 184, ${a * 0.75})`;
    }

    function onMove(event: PointerEvent) {
      mouse.x = event.clientX / window.innerWidth;
      mouse.y = event.clientY / window.innerHeight;
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const dpr = window.devicePixelRatio;
      const glow = ctx.createRadialGradient(mouse.x * w, mouse.y * h, 0, mouse.x * w, mouse.y * h, 320 * dpr);
      glow.addColorStop(0, "rgba(73, 230, 255, 0.12)");
      glow.addColorStop(0.45, "rgba(139, 92, 255, 0.05)");
      glow.addColorStop(1, "rgba(73, 230, 255, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < dots.length; i += 1) {
        const a = dots[i];
        if (!a) continue;
        a.x += (mouse.x - a.x) * 0.0018;
        a.y -= a.s / 1600;
        if (a.y < 0) a.y = 1;
        const mx = a.x - mouse.x;
        const my = a.y - mouse.y;
        const mouseDist = Math.hypot(mx, my);
        if (mouseDist < 0.18) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(228, 71, 209, ${0.16 - mouseDist * 0.7})`;
          ctx.lineWidth = 1.1 * dpr;
          ctx.moveTo(a.x * w, a.y * h);
          ctx.lineTo(mouse.x * w, mouse.y * h);
          ctx.stroke();
        }
        for (let j = i + 1; j < dots.length; j += 1) {
          const b = dots[j];
          if (!b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0.14) continue;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(73, 230, 255, ${0.16 - dist * 0.7})`;
          ctx.lineWidth = 0.8 * dpr;
          ctx.moveTo(a.x * w, a.y * h);
          ctx.lineTo(b.x * w, b.y * h);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.fillStyle = colour(a.hue, a.a);
        ctx.arc(a.x * w, a.y * h, a.r * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = window.requestAnimationFrame(draw);
    }

    resize();
    raf = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="aurora absolute left-[-18%] top-[-22%] h-[42vw] w-[42vw] rounded-full bg-cyan/14 blur-[140px]" />
      <div className="aurora-delay absolute right-[-16%] top-[6%] h-[28vw] w-[28vw] rounded-full bg-violet/18 blur-[130px]" />
      <div className="aurora absolute bottom-[-18%] left-[18%] h-[26vw] w-[34vw] rounded-full bg-magenta/12 blur-[150px]" />
      <canvas ref={ref} className="absolute inset-0 opacity-85" />
    </div>
  );
}
