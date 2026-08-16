"use client";

import { useEffect, useState } from "react";

const agents = [
  { name: "Alex", job: "Lead", status: "Prospecting", className: "left-[8%] top-[12%] float-a" },
  { name: "Max", job: "Ads", status: "Writing copy", className: "right-[6%] top-[16%] float-b" },
  { name: "Sophie", job: "Social", status: "Drafting posts", className: "right-[4%] bottom-[28%] float-c" },
  { name: "Charlie", job: "Bookings", status: "First reply", className: "left-[3%] bottom-[26%] float-b" },
  { name: "Grace", job: "Front desk", status: "Review ask", className: "left-[22%] bottom-[6%] float-a" },
  { name: "Scout", job: "Search", status: "Public page", className: "right-[20%] bottom-[8%] float-c" },
];

const story = [
  { title: "New Instagram enquiry", detail: "“How much for a new roof in Sale?”", agent: "Sophie" },
  { title: "Sales desk qualifying", detail: "Home or commercial · postcode · timing.", agent: "Alex" },
  { title: "Lead marked ready", detail: "Home, M33, wants a quote this month.", agent: "Alex" },
  { title: "Appointment pack written", detail: "First reply and a booking line, ready to send.", agent: "Charlie" },
  { title: "Consultation drafted", detail: "Tuesday 10:30 — you still send it from your phone.", agent: "Charlie" },
];

export function CommandCentre() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = window.setInterval(() => {
      setStep((current) => (current + 1) % story.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  const active = story[step] ?? story[0];

  return (
    <figure className="product-frame relative min-h-[32rem] overflow-hidden rounded-[1.5rem] p-4 sm:min-h-[36rem] sm:p-6">
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <p className="ml-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate">
            Command centre
          </p>
        </div>
        <p className="rounded-full border border-cyan/40 bg-cyan/10 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-cyan">
          Live demonstration
        </p>
      </div>

      <div className="scene relative mx-auto mt-6 hidden h-[22rem] w-full max-w-lg sm:block sm:h-[24rem]">
        <div className="ring orbit h-[18rem] w-[18rem] sm:h-[22rem] sm:w-[22rem]" />
        <div className="ring orbit-rev h-[13rem] w-[13rem] border-cyan/20 sm:h-[16rem] sm:w-[16rem]" />
        <div className="ring orbit h-[8rem] w-[8rem] border-magenta/30 sm:h-[10rem] sm:w-[10rem]" />
        <div className="core absolute left-1/2 top-1/2 z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-32 sm:w-32">
          <span className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/80">
              Your
            </span>
            <span className="font-display text-sm text-white sm:text-base">business</span>
          </span>
        </div>
        {agents.map((agent) => (
          <div
            key={agent.name}
            className={`absolute z-20 w-[7.6rem] rounded-2xl border border-white/15 bg-black/45 px-3 py-2 backdrop-blur-md ${agent.className} ${
              active.agent === agent.name ? "shadow-[0_0_24px_rgb(77_240_255_/_0.35)]" : ""
            }`}
          >
            <p className="text-[0.62rem] uppercase tracking-[0.14em] text-cyan">{agent.job}</p>
            <p className="font-display text-sm text-ice">{agent.name}</p>
            <p className="text-[0.65rem] text-slate">{agent.status}</p>
          </div>
        ))}
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-2 sm:hidden">
        {agents.map((agent) => (
          <li
            key={`m-${agent.name}`}
            className="rounded-xl border border-white/12 bg-black/40 px-3 py-2"
          >
            <p className="text-[0.62rem] uppercase tracking-[0.14em] text-cyan">{agent.job}</p>
            <p className="font-display text-sm text-ice">{agent.name}</p>
          </li>
        ))}
      </ul>

      <figcaption className="relative z-10 mt-2 min-h-[4.8rem] rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-magenta">
          {active.title}
        </p>
        <p className="mt-1 text-sm leading-6 text-ice">{active.detail}</p>
      </figcaption>
    </figure>
  );
}
