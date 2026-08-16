"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { NanoMesh } from "@/components/nano/nano-mesh";
import {
  getNanoSnapshot,
  getServerNanoSnapshot,
  hydrateNano,
  intentBars,
  subscribeNano,
} from "@/lib/nano-growth";

const journey = [
  "Visitor",
  "Enquiry",
  "Reply",
  "Appointment",
  "Customer",
  "Review",
  "Referral",
  "New visitor",
];

export function GrowthLayer() {
  const state = useSyncExternalStore(subscribeNano, getNanoSnapshot, getServerNanoSnapshot);
  const [lit, setLit] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    hydrateNano();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        const ratio = entry.intersectionRatio;
        setLit(Math.min(journey.length, Math.max(1, Math.round(ratio * journey.length))));
      },
      { threshold: [0.15, 0.3, 0.45, 0.6, 0.75, 0.9] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const intent = intentBars(state);
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = state.signals.filter((s) => s.at.slice(0, 10) === today).length;
  const highIntent = state.signals.filter((s) => s.kind === "pricing" || s.kind === "cta" || s.kind === "calculator").length;

  const stats = [
    { k: "Signals", v: String(state.signals.length || todayCount) },
    { k: "High-intent topics", v: String(highIntent) },
    { k: "Intent profile", v: state.signals.length ? "1" : "0" },
    { k: "Learning cycles", v: String(state.signals.length) },
  ];

  return (
    <section id="nano" ref={ref} className="band-nano overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Nano Growth™
        </p>
        <h2 className="font-display display-2 mt-6 max-w-3xl text-ice">
          Every interaction makes your marketing smarter.
        </h2>
        <p className="prose-narrow mt-5 text-base leading-7 text-slate">
          Shared intelligence under the desks — not nanotechnology, and not a
          promise that a post goes viral. Every meaningful action becomes a
          first-party signal in this browser.
        </p>
        <ol className="mt-8 flex flex-wrap gap-2">
          {journey.map((step, index) => (
            <li
              key={step}
              className={`rounded-full border px-3 py-1 text-xs ${
                index < lit
                  ? "border-cyan/50 bg-cyan/10 text-ice"
                  : "border-white/10 text-titanium"
              }`}
            >
              {step}
            </li>
          ))}
        </ol>
        <div className="mt-12 grid items-stretch gap-0 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)]">
          <div className="mesh-breathe relative -mx-5 min-h-[22rem] lg:mx-0 lg:-ml-8 lg:min-h-[28rem]">
            <NanoMesh />
          </div>
          <div className="glass-lit rounded-[1.5rem] p-6">
            <p className="label">Live intelligence</p>
            <p className="mt-2 text-sm leading-6 text-slate">This browser only. No fake platform statistics.</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.k}>
                  <p className="font-display text-3xl text-ice">{s.v}</p>
                  <p className="mt-1 text-xs text-slate">{s.k}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[0.62rem] uppercase tracking-[0.16em] text-cyan">Current intent</p>
            <div className="mt-4 space-y-3">
              {state.signals.length ? (
                intent.map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs text-slate">
                      <span>{row.label === "Google Ads" ? "Advertising" : row.label === "Social media" ? "Social" : row.label}</span>
                      <span className="text-ice">{row.score}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full"
                        style={{
                          width: `${row.score}%`,
                          background: "linear-gradient(90deg, #49E6FF, #E447D1)",
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate">Open an agent or the score and this fills in.</p>
              )}
            </div>
            <Link href="/audit" className="mt-6 inline-flex text-sm text-cyan hover:text-ice">
              Run the AI marketing score →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
