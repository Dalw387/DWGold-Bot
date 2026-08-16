"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BrandMark } from "@/components/logo";
import { WORKFORCE_CORE, colourForAgent } from "@/lib/agent-identity";

const floats = ["float-a", "float-b", "float-c", "float-b", "float-a", "float-c"];

export function WorkforceCore({
  highlight,
}: {
  highlight?: string | null;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = window.setInterval(() => {
      setCycle((current) => (current + 1) % WORKFORCE_CORE.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  const satellites = useMemo(
    () =>
      WORKFORCE_CORE.map((agent, index) => {
        const angle = (index / WORKFORCE_CORE.length) * Math.PI * 2 - Math.PI / 2;
        return {
          agent,
          x: 50 + Math.cos(angle) * 39,
          y: 50 + Math.sin(angle) * 39,
          float: floats[index] ?? "float-a",
        };
      }),
    [],
  );

  const focusedName = hover ?? highlight ?? WORKFORCE_CORE[cycle]?.name ?? "Alex";
  const focused = WORKFORCE_CORE.find((agent) => agent.name === focusedName) ?? WORKFORCE_CORE[0];

  return (
    <figure className="relative mx-auto min-h-[30rem] w-full max-w-[36rem] pb-16 sm:min-h-[36rem]">
      <div className="hud-scan rounded-[2rem]" aria-hidden="true" />
      <div className="ring orbit h-[22rem] w-[22rem] border border-dashed border-cyan/20 sm:h-[28rem] sm:w-[28rem]" />
      <div className="ring orbit-rev h-[15.5rem] w-[15.5rem] border border-violet/25 sm:h-[20rem] sm:w-[20rem]" />
      <div className="ring h-[9.5rem] w-[9.5rem] border border-magenta/20 sm:h-[12rem] sm:w-[12rem]" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {satellites.map(({ agent, x, y }) => {
          const on = focused?.name === agent.name;
          const colour = colourForAgent(agent.id);
          return (
            <g key={agent.id}>
              <line
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke={on ? colour : "rgba(73,230,255,0.16)"}
                strokeWidth={on ? 0.55 : 0.22}
                className={on ? "signal-travel" : ""}
              />
              <circle r={on ? 1.35 : 0.85} fill={colour} opacity={on ? 1 : 0.55}>
                <animateMotion
                  dur={on ? "1.6s" : "3.4s"}
                  repeatCount="indefinite"
                  path={`M50,50 L${x},${y}`}
                />
              </circle>
            </g>
          );
        })}
      </svg>

      <div className="core node-breathe absolute left-1/2 top-1/2 z-10 grid h-[5.6rem] w-[5.6rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full sm:h-[6.6rem] sm:w-[6.6rem]">
        <BrandMark className="h-11 w-11 sm:h-12 sm:w-12" />
      </div>

      {satellites.map(({ agent, x, y, float }) => {
        const on = focused?.name === agent.name;
        const colour = colourForAgent(agent.id);
        return (
          <Link
            key={agent.id}
            href={`/${agent.slug}`}
            className={`absolute z-20 w-[7.6rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-2.5 py-2 text-left backdrop-blur-md transition sm:w-[8.6rem] ${float} ${
              on ? "bg-void/85 text-ice" : "bg-void/55 text-titanium hover:text-ice"
            }`}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              borderColor: on ? colour : "rgba(73,230,255,0.16)",
              boxShadow: on ? `0 0 28px ${colour}66` : undefined,
            }}
            onPointerEnter={() => setHover(agent.name)}
            onPointerLeave={() => setHover(null)}
            onFocus={() => setHover(agent.name)}
            onBlur={() => setHover(null)}
          >
            <span className="flex items-center gap-1.5">
              <span className="status-dot" style={{ background: colour, boxShadow: `0 0 10px ${colour}` }} />
              <span className="text-[0.72rem] font-semibold leading-none">{agent.name}</span>
            </span>
            <span className="mt-1 block text-[0.58rem] uppercase tracking-[0.12em]" style={{ color: colour }}>
              {agent.desk}
            </span>
            {on ? (
              <span className="mt-1.5 block text-[0.65rem] leading-4 text-ice">{agent.doing}</span>
            ) : (
              <span className="mt-1.5 block text-[0.58rem] uppercase tracking-[0.14em] text-scout">Active</span>
            )}
          </Link>
        );
      })}

      <figcaption className="absolute inset-x-0 bottom-0 text-center">
        <p className="label" style={{ color: colourForAgent(focused?.id ?? "alex") }}>
          {focused?.name} · {focused?.desk}
        </p>
        <p className="mt-1 text-sm text-ice">{focused?.doing}</p>
      </figcaption>
    </figure>
  );
}
