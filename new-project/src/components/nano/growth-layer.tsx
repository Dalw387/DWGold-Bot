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

const journey = ["Visitor", "Enquiry", "Reply", "Appointment", "Customer", "Review", "Referral"];

export function GrowthLayer() {
  const state = useSyncExternalStore(subscribeNano, getNanoSnapshot, getServerNanoSnapshot);

  useEffect(() => {
    hydrateNano();
  }, []);

  const intent = intentBars(state);
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = state.signals.filter((s) => s.at.slice(0, 10) === today).length;

  const stats = [
    { k: "Signals today", v: String(todayCount) },
    { k: "This browser", v: state.signals.length ? "1 profile" : "Waiting" },
    { k: "Learning cycles", v: String(state.signals.length) },
    { k: "Audit scores", v: String(state.audits.length) },
  ];

  return (
    <section id="nano" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Nano Growth™
        </p>
        <h2 className="font-display display-2 mt-6 max-w-3xl text-ice">
          Every interaction makes your marketing smarter.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate">
          Shared intelligence under the desks — not nanotechnology, and not a
          promise that a post goes viral. Every meaningful action becomes a
          first-party signal in this browser.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {journey.map((step) => (
            <span key={step} className="rounded-full border border-titanium/25 px-3 py-1 text-xs text-titanium">
              {step}
            </span>
          ))}
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <NanoMesh />
          <div className="titanium rounded-[1.5rem] p-6">
            <p className="label">Live session · this browser only</p>
            <p className="mt-2 text-sm leading-6 text-slate">
              These numbers are yours, not invented platform totals.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.k}>
                  <p className="font-display text-2xl text-ice">{s.v}</p>
                  <p className="mt-1 text-xs text-slate">{s.k}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              {state.signals.length ? (
                intent.map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs text-slate">
                      <span>{row.label}</span>
                      <span className="text-ice">{row.score}%</span>
                    </div>
                    <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full bg-cyan" style={{ width: `${row.score}%` }} />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate">Open an agent or the score and this fills in.</p>
              )}
            </div>
            <Link href="/audit" className="mt-6 inline-flex text-sm text-ice hover:text-cyan">
              Run the AI marketing score →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
