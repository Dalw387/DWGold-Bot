"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { workforceAgents } from "@/lib/workforce";
import {
  getNanoSnapshot,
  getServerNanoSnapshot,
  hydrateNano,
  intentBars,
  subscribeNano,
} from "@/lib/nano-growth";

const story = [
  {
    title: "Signal in",
    detail: "Instagram enquiry: “How much for a new roof in Sale?”",
    agent: "Sophie",
    lock: "SOPHIE · SOCIAL",
  },
  {
    title: "Nano Growth reads it",
    detail: "Lead intent. Home job. Needs a first reply, not a caption.",
    agent: "Alex",
    lock: "ALEX · LEADS",
  },
  {
    title: "Alex qualifies",
    detail: "Home, M33, wants a quote this month. Passed to bookings.",
    agent: "Alex",
    lock: "ALEX · QUALIFY",
  },
  {
    title: "Charlie writes the booking pack",
    detail: "First reply and booking line. You still send it.",
    agent: "Charlie",
    lock: "CHARLIE · APPOINT",
  },
  {
    title: "Memory stored",
    detail: "The next quiet week starts from this, not from a blank page.",
    agent: "Scout",
    lock: "SCOUT · MEMORY",
  },
];

const positions = [
  "left-[1%] top-[8%] float-a",
  "right-[1%] top-[10%] float-b",
  "right-[-2%] bottom-[32%] float-c",
  "left-[-2%] bottom-[30%] float-b",
  "left-[16%] bottom-[0%] float-a",
  "right-[14%] bottom-[1%] float-c",
];

export function CommandCentre() {
  const [step, setStep] = useState(0);
  const [clock, setClock] = useState("--:--:--");
  const nano = useSyncExternalStore(subscribeNano, getNanoSnapshot, getServerNanoSnapshot);

  useEffect(() => {
    hydrateNano();
  }, []);

  useEffect(() => {
    const clockId = window.setInterval(() => {
      setClock(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    }, 1000);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => window.clearInterval(clockId);
    }
    const storyId = window.setInterval(() => {
      setStep((current) => (current + 1) % story.length);
    }, 2400);
    return () => {
      window.clearInterval(storyId);
      window.clearInterval(clockId);
    };
  }, []);

  const active = story[step] ?? story[0];
  const loop = ["Visitor", "Signal", "Analysis", "Draft", "You send", "Memory"];
  const bars = intentBars(nano);
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = nano.signals.filter((s) => s.at.slice(0, 10) === today).length;

  return (
    <figure className="product-frame hud-grid relative min-h-[36rem] overflow-hidden rounded-[1.5rem] p-3 sm:min-h-[42rem] sm:p-5">
      <span className="hud-bracket left-3 top-3 border-l border-t" />
      <span className="hud-bracket right-3 top-3 border-r border-t" />
      <span className="hud-bracket bottom-3 left-3 border-b border-l" />
      <span className="hud-bracket bottom-3 right-3 border-b border-r" />
      <div className="hud-scan" aria-hidden="true" />
      <div className="hud-radar" aria-hidden="true" />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
        <p className="font-display text-[0.68rem] uppercase tracking-[0.24em] text-cyan">
          JARVIS // command centre
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <p className="rounded-full border border-cyan/40 bg-cyan/10 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.14em] text-cyan">
            Nano Growth mesh · live session
          </p>
          <p className="font-mono text-[0.62rem] tabular-nums text-cyan/80">{clock}</p>
        </div>
      </div>

      <div className="relative z-10 mt-3 grid gap-3 lg:grid-cols-[8rem_minmax(0,1fr)_9rem]">
        <aside className="hidden space-y-2.5 text-[0.6rem] uppercase tracking-[0.14em] text-cyan/80 lg:block">
          <HudStat label="Mesh" value="Online" hot />
          <HudStat label="Desks" value="08 / 08" />
          <HudStat label="Signals" value={String(todayCount).padStart(2, "0")} />
          <HudStat label="Agents seen" value={String(nano.agents.length).padStart(2, "0")} />
          <HudStat label="Proof" value="Ledger" />
          <p className="pt-1 text-emerald">Write-ready</p>
        </aside>

        <div className="scene relative mx-auto h-[21rem] w-full max-w-lg sm:h-[26rem]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400" aria-hidden="true">
            <defs>
              <radialGradient id="hud-core-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4df0ff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#4d6fff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="96" fill="url(#hud-core-glow)" />
            <circle
              cx="200"
              cy="200"
              r="178"
              fill="none"
              stroke="rgba(77,240,255,0.16)"
              strokeDasharray="2 10"
              className="hud-arc origin-center"
            />
            <circle cx="200" cy="200" r="142" fill="none" stroke="rgba(139,92,255,0.32)" />
            <circle cx="200" cy="200" r="108" fill="none" stroke="rgba(77,240,255,0.12)" strokeDasharray="1 6" />
            {Array.from({ length: 24 }).map((_, i) => {
              const a = (i / 24) * Math.PI * 2;
              const x = 200 + Math.cos(a) * 158;
              const y = 200 + Math.sin(a) * 158;
              return (
                <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 2.1 : 1.2} fill="#4df0ff" opacity={0.55 + (i % 3) * 0.12}>
                  <animate
                    attributeName="opacity"
                    values="0.25;0.9;0.25"
                    dur={`${2.4 + (i % 5) * 0.35}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              );
            })}
            {Array.from({ length: 6 }).map((_, i) => {
              const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
              return (
                <line
                  key={`spoke-${i}`}
                  x1="200"
                  y1="200"
                  x2={200 + Math.cos(a) * 142}
                  y2={200 + Math.sin(a) * 142}
                  stroke="rgba(77,240,255,0.18)"
                  strokeWidth="0.6"
                  className="pulse-line"
                />
              );
            })}
          </svg>
          <div className="ring orbit h-[16.5rem] w-[16.5rem] sm:h-[21rem] sm:w-[21rem]" />
          <div className="ring orbit-rev h-[11.5rem] w-[11.5rem] border-cyan/25 sm:h-[15rem] sm:w-[15rem]" />
          <div className="core node-breathe absolute left-1/2 top-1/2 z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-28 sm:w-28">
            <span className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white/80">
                Nano
              </span>
              <span className="font-display text-xs text-white sm:text-sm">Growth</span>
            </span>
          </div>
          {workforceAgents.map((agent, index) => {
            const pos = positions[index] ?? positions[0];
            const on = active.agent === agent.name;
            return (
              <Link
                key={agent.name}
                href={`/${agent.slug}`}
                className={`absolute z-20 w-[8.2rem] rounded-lg border px-2.5 py-2 backdrop-blur-md ${pos} ${
                  on
                    ? "border-cyan bg-cyan/15 shadow-[0_0_28px_rgb(77_240_255_/_0.45)]"
                    : "border-white/15 bg-black/50"
                }`}
              >
                <p className="text-[0.58rem] uppercase tracking-[0.14em] text-cyan">{agent.title}</p>
                <p className="font-display text-sm text-ice">{agent.name}</p>
                <p className="text-[0.62rem] text-slate">{on ? "Target lock" : "Ready"}</p>
              </Link>
            );
          })}
        </div>

        <aside className="hidden text-[0.62rem] leading-5 text-slate lg:block">
          <p className="uppercase tracking-[0.16em] text-cyan">Loop</p>
          <ol className="mt-2 space-y-1">
            {loop.map((item, index) => (
              <li key={item} className={index === step % loop.length ? "text-ice" : ""}>
                {String(index + 1).padStart(2, "0")} {item}
              </li>
            ))}
          </ol>
          <p className="mt-4 uppercase tracking-[0.16em] text-cyan">Visitor intent</p>
          <ul className="mt-2 space-y-2">
            {bars.map((bar) => (
              <li key={bar.label}>
                <div className="flex justify-between gap-2">
                  <span>{bar.label}</span>
                  <span className="text-ice">{bar.score}%</span>
                </div>
                <span className="mt-1 block h-1 overflow-hidden rounded-full bg-white/10">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-cyan to-indigo"
                    style={{ width: `${bar.score}%` }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="relative z-10 mt-4 flex flex-wrap gap-2 sm:hidden">
        {workforceAgents.map((agent) => (
          <Link
            key={`m-${agent.slug}`}
            href={`/${agent.slug}`}
            className="rounded-md border border-cyan/25 px-2 py-1 text-[0.65rem] text-ice"
          >
            {agent.name}
          </Link>
        ))}
      </div>

      <figcaption className="relative z-10 mt-3 rounded-lg border border-cyan/20 bg-black/40 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cyan">
            {active.title}
          </p>
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-cyan/80">
            Lock · {active.lock}
          </p>
        </div>
        <p className="mt-1 text-sm leading-6 text-ice">{active.detail}</p>
        <p className="mt-2 text-[0.7rem] text-slate">
          Click a specialist. You get a real sample on their page. After you pay, that desk writes
          the pack for your business — not a demo of someone else’s.
        </p>
      </figcaption>
    </figure>
  );
}

function HudStat({ label, value, hot = false }: { label: string; value: string; hot?: boolean }) {
  return (
    <p className="flex items-baseline justify-between gap-2">
      <span>{label}</span>
      <span className={hot ? "text-emerald" : "text-ice"}>{value}</span>
    </p>
  );
}
