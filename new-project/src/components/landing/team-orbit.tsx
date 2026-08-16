"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BrandMark } from "@/components/logo";
import { AGENT_COLOURS } from "@/lib/agent-identity";
import { workforceAgents } from "@/lib/workforce";

const cycle = [
  {
    title: "New enquiry",
    detail: "“I need a quote for a new roof.”",
    agent: "core",
  },
  {
    title: "Charlie · first reply prepared",
    detail: "Qualify the job. Ask the facts that change the quote.",
    agent: "Charlie",
  },
  {
    title: "Alex · follow-up scheduled",
    detail: "Day 1, day 3, day 7 — the enquiry is not left overnight.",
    agent: "Alex",
  },
  {
    title: "Grace · review journey ready",
    detail: "After the job, the review ask is already written.",
    agent: "Grace",
  },
];

export function TeamOrbit() {
  const [step, setStep] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = window.setInterval(() => {
      setStep((current) => (current + 1) % cycle.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  const active = cycle[step] ?? cycle[0];
  const satellites = useMemo(
    () =>
      workforceAgents.map((agent, index) => {
        const angle = (index / workforceAgents.length) * Math.PI * 2 - Math.PI / 2;
        return {
          agent,
          x: 50 + Math.cos(angle) * 38,
          y: 50 + Math.sin(angle) * 38,
        };
      }),
    [],
  );

  return (
    <figure
      className="glass-lit relative min-h-[30rem] overflow-hidden rounded-[1.75rem] p-5 sm:min-h-[34rem] sm:p-7"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5,
        });
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <p className="label">Live product demonstration</p>
      <div className="relative mx-auto mt-3 aspect-square w-full max-w-[30rem]">
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
          <circle cx="50" cy="50" r="31" fill="none" stroke="rgba(139,92,255,0.28)" strokeDasharray="1.4 3.2" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(73,230,255,0.16)" />
          {satellites.map(({ agent, x, y }) => {
            const on = active.agent === agent.name;
            return (
              <line
                key={agent.name}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke={on ? agent.colour : "rgba(73,230,255,0.16)"}
                strokeWidth={on ? 0.7 : 0.28}
                className={on ? "signal-travel" : ""}
              />
            );
          })}
        </svg>
        <div
          className="core node-breathe absolute left-1/2 top-1/2 z-10 grid h-[5.4rem] w-[5.4rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full sm:h-24 sm:w-24"
          style={{ transform: `translate(calc(-50% + ${pointer.x * 8}px), calc(-50% + ${pointer.y * 8}px))` }}
        >
          <BrandMark className="h-10 w-10" />
        </div>
        {satellites.map(({ agent, x, y }) => {
          const on = active.agent === agent.name;
          return (
            <Link
              key={agent.name}
              href={`/${agent.slug}`}
              className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-2.5 py-1.5 text-left backdrop-blur-md transition ${
                on ? "bg-void/80 text-ice" : "bg-void/55 text-titanium hover:text-ice"
              }`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                borderColor: on ? agent.colour : "rgba(73,230,255,0.18)",
                boxShadow: on ? `0 0 22px ${agent.colour}55` : undefined,
                transform: `translate(calc(-50% + ${pointer.x * 10}px), calc(-50% + ${pointer.y * 10}px))`,
              }}
            >
              <span className="block text-[0.72rem] font-semibold leading-none">{agent.name}</span>
              <span className="mt-1 block text-[0.58rem] uppercase tracking-[0.12em]" style={{ color: agent.colour }}>
                {agent.desk}
              </span>
            </Link>
          );
        })}
      </div>
      <figcaption className="relative mt-2 text-center">
        <p className="label" style={{ color: colourForStep(active.agent) }}>
          {active.title}
        </p>
        <p className="mt-2 text-sm leading-6 text-ice">{active.detail}</p>
      </figcaption>
    </figure>
  );
}

function colourForStep(agent: string) {
  if (agent === "Charlie") return AGENT_COLOURS.charlie;
  if (agent === "Alex") return AGENT_COLOURS.alex;
  if (agent === "Grace") return AGENT_COLOURS.grace;
  return AGENT_COLOURS.alex;
}
