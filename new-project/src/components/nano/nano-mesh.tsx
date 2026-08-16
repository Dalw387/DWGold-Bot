"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  kind: "visitor" | "share" | "lead" | "customer";
};

const KINDS: Node["kind"][] = ["visitor", "share", "lead", "customer"];

export function NanoMesh() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const nodes: Node[] = Array.from({ length: 42 }, (_, i) => ({
      x: 0.18 + Math.random() * 0.64,
      y: 0.18 + Math.random() * 0.64,
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.00035,
      r: i === 0 ? 3.2 : Math.random() * 1.4 + 0.7,
      kind: KINDS[i % KINDS.length] ?? "visitor",
    }));
    nodes[0] = { x: 0.5, y: 0.5, vx: 0, vy: 0, r: 3.6, kind: "customer" };

    let raf = 0;
    let pulse = 0;

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? 640;
      const h = Math.max(parent?.clientHeight ?? 360, 340);
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }

    function colour(kind: Node["kind"], a: number) {
      if (kind === "customer") return `rgba(77, 240, 255, ${a})`;
      if (kind === "lead") return `rgba(167, 139, 250, ${a})`;
      if (kind === "share") return `rgba(255, 90, 217, ${a})`;
      return `rgba(157, 180, 255, ${a})`;
    }

    function draw() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (!reduce) {
        pulse += 0.012;
        for (const node of nodes) {
          if (node === nodes[0]) continue;
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0.08 || node.x > 0.92) node.vx *= -1;
          if (node.y < 0.1 || node.y > 0.82) node.vy *= -1;
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          if (!a || !b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0.22) continue;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(125, 211, 252, ${0.22 - dist})`;
          ctx.lineWidth = 1 * dpr;
          ctx.moveTo(a.x * w, a.y * h);
          ctx.lineTo(b.x * w, b.y * h);
          ctx.stroke();
        }
      }

      const origin = nodes[0];
      if (origin) {
        const pr = (18 + Math.sin(pulse) * 8) * dpr;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(167, 139, 250, ${0.35 + Math.sin(pulse) * 0.15})`;
        ctx.lineWidth = 1.2 * dpr;
        ctx.arc(origin.x * w, origin.y * h, pr, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (const node of nodes) {
        ctx.beginPath();
        ctx.fillStyle = colour(node.kind, 0.85);
        ctx.shadowColor = colour(node.kind, 0.8);
        ctx.shadowBlur = 12 * dpr;
        ctx.arc(node.x * w, node.y * h, node.r * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
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
    <div className="titanium relative overflow-hidden rounded-[1.5rem]">
      <canvas ref={ref} className="block min-h-[340px] w-full" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight via-midnight/70 to-transparent p-6">
        <p className="font-display text-xl text-ice">Every interaction creates another opportunity.</p>
        <p className="mt-1 text-xs uppercase tracking-[0.22em] text-cyan/70">Powered by Nano Growth™</p>
        <p className="mt-3 max-w-md text-xs leading-5 text-slate">
          1 customer → interactions → shares → visitors → leads → customers. A visualisation of the
          loop. Not a live count of other people’s businesses.
        </p>
      </div>
    </div>
  );
}
