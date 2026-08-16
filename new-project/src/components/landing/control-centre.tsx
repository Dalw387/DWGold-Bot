"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BrandMark } from "@/components/logo";
import { AGENT_COLOURS, DEMO_ENQUIRY, DEMO_WORKSPACE, colourForAgent } from "@/lib/agent-identity";
import { generateForTool } from "@/lib/copy";
import { specialists, type SpecialistId } from "@/lib/sales";
import type { ToolSlug } from "@/lib/types";

type NavId =
  | "overview"
  | "leads"
  | "appointments"
  | "reviews"
  | "advertising"
  | "social"
  | "search"
  | "customers"
  | "proof";

type Activity = {
  id: string;
  time: string;
  title: string;
  agent: SpecialistId | "system";
  nav: NavId;
  tool?: ToolSlug;
  note?: string;
};

const nav = [
  { id: "overview", label: "Overview" },
  { id: "leads", label: "Leads" },
  { id: "appointments", label: "Appointments" },
  { id: "reviews", label: "Reviews" },
  { id: "advertising", label: "Advertising" },
  { id: "social", label: "Social" },
  { id: "search", label: "Search" },
  { id: "customers", label: "Customers" },
  { id: "proof", label: "Proof" },
] as const;

const activities: Activity[] = [
  {
    id: "enquiry",
    time: "09:14",
    title: "New enquiry detected",
    agent: "system",
    nav: "overview",
    note: DEMO_ENQUIRY,
  },
  {
    id: "charlie",
    time: "09:15",
    title: "Charlie prepared response",
    agent: "charlie",
    nav: "appointments",
    tool: "enquiry-reply",
  },
  {
    id: "alex",
    time: "09:18",
    title: "Alex created follow-up sequence",
    agent: "alex",
    nav: "leads",
    tool: "follow-up",
  },
  {
    id: "max",
    time: "09:24",
    title: "Max prepared Google Ads campaign",
    agent: "max",
    nav: "advertising",
    tool: "ads-copy",
  },
  {
    id: "sophie",
    time: "09:31",
    title: "Sophie created social posts",
    agent: "sophie",
    nav: "social",
    tool: "facebook-post-generator",
  },
  {
    id: "grace",
    time: "10:02",
    title: "Grace prepared review request",
    agent: "grace",
    nav: "reviews",
    tool: "google-review-desk",
  },
  {
    id: "scout",
    time: "10:17",
    title: "Scout completed visibility check",
    agent: "scout",
    nav: "search",
    tool: "seo-brief",
  },
];

const navToAgent: Partial<Record<NavId, SpecialistId>> = {
  leads: "alex",
  appointments: "charlie",
  reviews: "grace",
  advertising: "max",
  social: "sophie",
  search: "scout",
  customers: "grace",
};

export function ControlCentre() {
  const [navId, setNavId] = useState<NavId>("overview");
  const [agentFilter, setAgentFilter] = useState<SpecialistId | "all">("all");
  const [selectedId, setSelectedId] = useState("charlie");
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const id = window.setInterval(() => {
      setClock(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const visible = useMemo(() => {
    return activities.filter((item) => {
      if (navId === "proof") return item.nav === "proof" || item.id === "enquiry";
      if (navId !== "overview" && item.nav !== navId && item.agent !== navToAgent[navId]) {
        if (!(navId === "customers" && item.agent === "grace")) return false;
      }
      if (agentFilter !== "all" && item.agent !== agentFilter && item.agent !== "system") return false;
      return true;
    });
  }, [agentFilter, navId]);

  const selected = activities.find((item) => item.id === selectedId) ?? activities[1];
  const spec = selected && selected.agent !== "system" ? specialists.find((s) => s.id === selected.agent) : undefined;
  const draft =
    selected?.tool ? generateForTool(selected.tool, DEMO_WORKSPACE)[0] : undefined;

  return (
    <section id="control" aria-labelledby="control-heading" className="band-control py-20 sm:py-28">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          LocalLaunch Control Centre
        </p>
        <h2 id="control-heading" className="font-display display-2 mt-6 max-w-3xl text-ice">
          Six specialists.
          <br />
          One business.
          Everything connected.
        </h2>
        <p className="prose-narrow mt-5 text-base leading-7 text-slate">
          Give LocalLaunch your business, location and offer. Each specialist takes
          responsibility for a different part of customer growth — while working
          from the same context.
        </p>

        <div className="os-shell relative mt-12 overflow-hidden rounded-[1.6rem]">
          <div className="hud-scan" aria-hidden="true" />
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan/10 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <BrandMark className="h-7 w-7" />
              <div>
                <p className="font-display text-sm text-ice">LocalLaunch</p>
                <p className="text-[0.62rem] uppercase tracking-[0.16em] text-cyan">Control Centre</p>
              </div>
            </div>
            <p className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-magenta/30 bg-magenta/10 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-pink">
                Demo workspace
              </span>
              <span className="font-mono text-[0.68rem] tabular-nums text-cyan">{clock}</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-[11.5rem_minmax(0,1fr)_13.5rem]">
            <aside className="border-b border-cyan/10 p-3 lg:border-b-0 lg:border-r">
              <p className="px-2 pb-2 text-[0.58rem] uppercase tracking-[0.16em] text-titanium">Desks</p>
              <nav aria-label="Control Centre desks" className="flex gap-1 overflow-x-auto lg:flex-col">
                {nav.map((item) => {
                  const on = navId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setNavId(item.id);
                        const mapped = navToAgent[item.id];
                        if (mapped) {
                          setAgentFilter(mapped);
                          const first = activities.find((row) => row.agent === mapped);
                          if (first) setSelectedId(first.id);
                        } else {
                          setAgentFilter("all");
                        }
                      }}
                      className={`shrink-0 rounded-lg px-3 py-2 text-left text-sm ${
                        on ? "bg-white/8 text-ice" : "text-slate hover:text-ice"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>
              <p className="mt-4 hidden items-center gap-2 px-2 text-[0.68rem] text-scout lg:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-scout shadow-[0_0_8px_#55E6C1]" />
                6 specialists available
              </p>
            </aside>

            <div className="min-w-0 border-b border-cyan/10 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between px-4 py-3">
                <p className="label">Today</p>
                <p className="text-[0.62rem] uppercase tracking-[0.14em] text-titanium">
                  {DEMO_WORKSPACE.businessName} · {DEMO_WORKSPACE.location}
                </p>
              </div>
              {navId === "proof" ? (
                <div className="px-4 pb-5">
                  <p className="text-sm leading-6 text-slate">
                    The proof ledger only moves when you log a real enquiry, call,
                    visit or sale after purchase. This demo workspace does not invent
                    platform totals.
                  </p>
                  <Link href="/proof" className="mt-4 inline-flex text-sm text-cyan hover:text-ice">
                    Open the proof ledger →
                  </Link>
                </div>
              ) : (
                <ul>
                  {visible.map((item, index) => {
                    const on = item.id === selectedId;
                    const colour = item.agent === "system" ? AGENT_COLOURS.alex : colourForAgent(item.agent);
                    const who = item.agent === "system" ? "SYSTEM" : item.agent.toUpperCase();
                    return (
                      <li key={item.id} className="feed-in" style={{ animationDelay: `${index * 120}ms` }}>
                        <button
                          type="button"
                          onClick={() => setSelectedId(item.id)}
                          className={`flex w-full items-start gap-4 border-t border-white/5 px-4 py-3.5 text-left transition ${
                            on ? "bg-white/6" : "hover:bg-white/3"
                          }`}
                        >
                          <span className="font-mono text-xs tabular-nums text-titanium">{item.time}</span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.14em]" style={{ color: colour }}>
                              {who}
                            </span>
                            <span className="mt-1 block text-sm text-ice">{item.title}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
              {draft ? (
                <article className="m-4 overflow-hidden rounded-2xl document-surface">
                  <div className="flex items-center justify-between gap-3 border-b border-black/8 px-4 py-2.5">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-black/55">
                      Example output · {spec?.name} · {draft.label}
                    </p>
                    {spec ? (
                      <Link href={spec.deskHref} className="text-[0.68rem] font-semibold text-black/70 hover:text-black">
                        Open desk →
                      </Link>
                    ) : null}
                  </div>
                  <pre className="max-h-56 overflow-auto whitespace-pre-wrap px-4 py-4 font-sans text-sm leading-7 text-[#1b1a16]">
                    {draft.text.length > 720 ? `${draft.text.slice(0, 720).trim()}…` : draft.text}
                  </pre>
                </article>
              ) : selected?.note ? (
                <p className="m-4 rounded-2xl border border-cyan/20 bg-void/50 px-4 py-4 text-sm leading-7 text-ice">
                  Incoming: “{selected.note}”
                </p>
              ) : null}
            </div>

            <aside className="p-4">
              <p className="label">Your team</p>
              <ul className="mt-4 space-y-2">
                {specialists.map((agent) => {
                  const on = agentFilter === agent.id;
                  return (
                    <li key={agent.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setAgentFilter(on ? "all" : agent.id);
                          setNavId("overview");
                          const first = activities.find((row) => row.agent === agent.id);
                          if (first) setSelectedId(first.id);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left ${
                          on ? "bg-white/6" : "border-white/8 hover:border-white/16"
                        }`}
                        style={{ borderColor: on ? agent.colour : undefined }}
                      >
                        <span>
                          <span className="block text-sm text-ice">{agent.name}</span>
                          <span className="text-[0.68rem] uppercase tracking-[0.12em] text-titanium">{agent.desk}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.12em] text-scout">
                          <span className="status-dot" style={{ background: agent.colour, boxShadow: `0 0 10px ${agent.colour}` }} />
                          Active
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>

          <div className="grid gap-3 border-t border-cyan/10 px-4 py-4 sm:grid-cols-5">
            <p className="text-[0.62rem] uppercase tracking-[0.16em] text-titanium sm:col-span-1">
              Today’s output
              <span className="mt-1 block text-[0.58rem] text-magenta">Demo workspace</span>
            </p>
            {[
              ["6", "drafts"],
              ["3", "follow-ups"],
              ["1", "campaign"],
              ["2", "customer actions"],
            ].map(([n, label]) => (
              <p key={label} className="text-sm text-ice">
                <span className="font-display text-2xl">{n}</span>
                <span className="ml-2 text-titanium">{label}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
