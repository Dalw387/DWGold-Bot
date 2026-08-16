"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { workforceAgents } from "@/lib/workforce";

const story = [
  { title: "New website enquiry", detail: "“How much for a new roof in Sale?”", agent: "Sophie" },
  { title: "Charlie prepares the first reply", detail: "Qualify the job. Ask the facts that change the quote.", agent: "Charlie" },
  { title: "Qualified", detail: "Home, M33, wants a quote this month.", agent: "Alex" },
  { title: "Appointment offered", detail: "Tuesday 10:30 — you still send the message.", agent: "Charlie" },
];

export function AiCore() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = window.setInterval(() => {
      setStep((current) => (current + 1) % story.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  const active = story[step] ?? story[0];
  const satellites = workforceAgents.map((agent, index) => {
    const angle = (index / workforceAgents.length) * Math.PI * 2 - Math.PI / 2;
    return { agent, x: 50 + Math.cos(angle) * 38, y: 50 + Math.sin(angle) * 38 };
  });

  return (
    <figure className="titanium relative min-h-[28rem] overflow-hidden rounded-[1.5rem] p-6 sm:min-h-[32rem] sm:p-8">
      <div className="relative mx-auto aspect-square w-full max-w-[28rem]">
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
          {satellites.map(({ agent, x, y }) => (
            <line
              key={agent.name}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke={active.agent === agent.name ? "rgba(54,216,255,0.55)" : "rgba(174,185,200,0.2)"}
              strokeWidth="0.35"
              className={active.agent === agent.name ? "pulse-line" : ""}
            />
          ))}
          <circle cx="50" cy="50" r="11" fill="none" stroke="rgba(174,185,200,0.28)" strokeWidth="0.35" />
        </svg>
        <div className="core node-breathe absolute left-1/2 top-1/2 z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-24 sm:w-24" />
        <p className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-center text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ice">
          Local
          <br />
          Launch
        </p>
        {satellites.map(({ agent, x, y }) => {
          const on = active.agent === agent.name;
          return (
            <Link
              key={agent.name}
              href={`/${agent.slug}`}
              className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 text-[0.68rem] backdrop-blur-md ${
                on
                  ? "border-cyan/50 bg-cyan/15 text-ice"
                  : "border-titanium/25 bg-midnight/70 text-titanium"
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {agent.name}
            </Link>
          );
        })}
      </div>
      <figcaption className="relative mt-4 text-center">
        <p className="label">{active.title}</p>
        <p className="mt-2 text-sm leading-6 text-ice">{active.detail}</p>
      </figcaption>
    </figure>
  );
}
