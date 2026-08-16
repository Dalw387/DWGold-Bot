"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
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
  "Interaction",
  "Signal",
  "Analysis",
  "Personalisation",
  "Lead",
  "Conversion",
  "Learning",
];

const layers = [
  { n: "01", name: "Signal mesh", live: true, line: "Meaningful clicks on this site become first-party signals in this browser." },
  { n: "02", name: "Adaptive emphasis", live: true, line: "Pages you open change which specialist and sample the site shows next." },
  { n: "03", name: "Share engine", live: true, line: "A real AI marketing score you can copy. Curiosity, not a fake social post." },
  { n: "04", name: "Referral DNA", live: true, line: "Optional /audit?r= codes stored locally so a share can be attributed here." },
  { n: "05", name: "Ads feedback brain", live: false, line: "Designed for permitted server-side conversion data. Not connected to Ads Manager today." },
  { n: "06", name: "Lookalike intelligence", live: false, line: "Designed to spot patterns in data you are allowed to use. Not live audiences." },
  { n: "07", name: "Content multiplication", live: true, line: "One set of facts already becomes posts, ads, replies, plans and print." },
  { n: "08", name: "Trend radar", live: false, line: "Designed to watch permitted public sources. Not scraping competitors today." },
  { n: "09", name: "Performance memory", live: true, line: "After you pay, the proof ledger remembers real enquiries — not likes." },
  { n: "10", name: "Controlled experiments", live: false, line: "Designed for measured headline tests. The site does not secretly change prices." },
];

export function GrowthLayer() {
  const state = useSyncExternalStore(subscribeNano, getNanoSnapshot, getServerNanoSnapshot);

  useEffect(() => {
    hydrateNano();
  }, []);

  const intent = intentBars(state);
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = state.signals.filter((s) => s.at.slice(0, 10) === today).length;
  const high = intent.filter((row) => row.score >= 40).length;

  const stats = [
    { k: "Growth signals today", v: String(todayCount) },
    { k: "Intent profile in this browser", v: state.signals.length ? "1" : "0" },
    { k: "High-intent topics", v: String(high) },
    { k: "Learning cycles", v: String(state.signals.length) },
    { k: "Audit scores stored", v: String(state.audits.length) },
    { k: "Referral visitors", v: String(state.referrals.length) },
  ];

  return (
    <section id="nano" className="relative overflow-hidden border-y border-border py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 hud-grid opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,141,239,.16),transparent_62%)]" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan/80">
          Proprietary layer · Nano Growth™
        </p>
        <h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
          Every click makes your marketing smarter.
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate">
          Nano Growth is the shared intelligence under LocalLaunch — not a separate gadget, and not
          nanotechnology. Every meaningful action becomes a signal. Those signals feed every desk:
          what Scout writes for search, Max writes for ads, Sophie writes for social. That is how
          one customer can help create the next — through a shareable score and a clearer story, not
          through bots or fake clicks.
        </p>

        <div className="mt-10 overflow-x-auto">
          <div className="flex min-w-max items-center gap-2">
            {journey.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-100">
                  {step}
                </span>
                {i < journey.length - 1 ? (
                  <span className="h-px w-6 bg-gradient-to-r from-cyan/70 to-indigo/40" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-sm text-slate">
          Then a completed customer can branch: referral → new visitor → their own audit. Mathematical
          compounding, not guaranteed virality.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <NanoMesh />
          <div className="rounded-[28px] border border-cyan/20 bg-black/40 p-6 backdrop-blur-md">
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan/70">
              Live session · this browser only
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate">
              These numbers are yours, not invented platform totals. They update as you click around
              this site.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="font-display text-2xl font-semibold text-white">{s.v}</p>
                  <p className="mt-1 text-[11px] leading-snug text-slate">{s.k}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-3">
              {state.signals.length ? (
                intent.map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs text-slate">
                      <span>{row.label}</span>
                      <span className="text-white">{row.score}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan to-indigo"
                        style={{ width: `${row.score}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate">
                  Open an agent, the calculator, or the audit and this profile will fill in.
                </p>
              )}
            </div>
            <Link
              href="/audit"
              className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#07040f]"
            >
              Run the AI marketing score
            </Link>
          </div>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2">
          {layers.map((layer) => (
            <li
              key={layer.n}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-sm text-ice">
                  <span className="mr-2 text-cyan/70">{layer.n}</span>
                  {layer.name}
                </p>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                    layer.live
                      ? "border border-emerald/30 bg-emerald/10 text-emerald"
                      : "border border-white/15 text-slate"
                  }`}
                >
                  {layer.live ? "Live in this product" : "Designed for"}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate">{layer.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
