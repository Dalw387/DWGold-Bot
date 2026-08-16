"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { WorkforceCore } from "@/components/landing/workforce-core";
import { generateForTool } from "@/lib/copy";
import { colourForAgent } from "@/lib/agent-identity";
import { recordSignal } from "@/lib/nano-growth";
import { ViewportSignal } from "@/components/nano/viewport-signal";
import { DEFAULT_FACEBOOK_STYLES, type GeneratorFormValues } from "@/lib/types";

const jobs: {
  prompt: string;
  agents: string[];
  values: GeneratorFormValues;
}[] = [
  {
    prompt: "Find potential roofing customers around Manchester.",
    agents: ["Alex", "Charlie", "Scout"],
    values: {
      businessName: "Ridge & Rain",
      businessType: "roofing",
      location: "Manchester",
      offer: "roof repairs, new roofs, and gutter work for homes in Greater Manchester",
      tone: "professional",
      callToAction: "Call or message for a quote",
      length: "standard",
      includeHashtags: false,
      facebookStyles: [...DEFAULT_FACEBOOK_STYLES],
    },
  },
  {
    prompt: "Create a campaign for my dental practice.",
    agents: ["Max", "Scout", "Sophie"],
    values: {
      businessName: "Elm Dental",
      businessType: "dental practice",
      location: "Leeds",
      offer: "check-ups, hygienist visits, and cosmetic dentistry by appointment",
      tone: "professional",
      callToAction: "Book a consultation",
      length: "standard",
      includeHashtags: false,
      facebookStyles: [...DEFAULT_FACEBOOK_STYLES],
    },
  },
  {
    prompt: "Help my estate agency turn enquiries into viewings.",
    agents: ["Charlie", "Alex", "Grace"],
    values: {
      businessName: "Harbour & Field",
      businessType: "estate agency",
      location: "Bristol",
      offer: "sales and lettings for homes in Bristol and North Somerset",
      tone: "professional",
      callToAction: "Book a valuation or viewing",
      length: "standard",
      includeHashtags: false,
      facebookStyles: [...DEFAULT_FACEBOOK_STYLES],
    },
  },
  {
    prompt: "Create this week’s social media content.",
    agents: ["Sophie", "Grace", "Scout"],
    values: {
      businessName: "Harbour & Hearth",
      businessType: "cafe",
      location: "Falmouth",
      offer: "weekend brunch",
      tone: "friendly",
      callToAction: "Message us",
      length: "standard",
      includeHashtags: false,
      facebookStyles: [...DEFAULT_FACEBOOK_STYLES],
    },
  },
  {
    prompt: "Build a follow-up sequence for yesterday’s leads.",
    agents: ["Alex", "Charlie", "Grace"],
    values: {
      businessName: "Ridge & Rain",
      businessType: "roofing",
      location: "Manchester",
      offer: "roof repairs",
      tone: "professional",
      callToAction: "Call or message for a quote",
      length: "standard",
      includeHashtags: false,
      facebookStyles: [...DEFAULT_FACEBOOK_STYLES],
    },
  },
];

export function JobDemo() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(jobs[0]?.prompt ?? "");
  const [running, setRunning] = useState(false);
  const [stage, setStage] = useState(-1);
  const [output, setOutput] = useState<{ who: string; label: string; text: string }[]>([]);
  const [highlight, setHighlight] = useState<string | null>(null);

  useEffect(() => {
    if (running) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = window.setInterval(() => {
      setIndex((current) => {
        const next = (current + 1) % jobs.length;
        const job = jobs[next];
        if (job) setTyped(job.prompt);
        return next;
      });
    }, 4200);
    return () => window.clearInterval(id);
  }, [running]);

  async function run(jobIndex: number) {
    const job = jobs[jobIndex];
    if (!job) return;
    setRunning(true);
    setIndex(jobIndex);
    setTyped(job.prompt);
    setOutput([]);
    setStage(0);
    for (let i = 0; i < job.agents.length; i += 1) {
      setHighlight(job.agents[i] ?? null);
      setStage(i);
      await new Promise((resolve) => window.setTimeout(resolve, 520));
    }
    const reply = generateForTool("enquiry-reply", job.values)[0];
    const ads = generateForTool("ads-copy", job.values)[0];
    const social = generateForTool("facebook-post-generator", job.values)[0];
    const follow = generateForTool("follow-up", job.values)[0];
    recordSignal("demo", job.values.businessType);
    setOutput(
      [
        reply ? { who: "Charlie", label: "First reply", text: reply.text } : null,
        follow ? { who: "Alex", label: "Follow-up", text: follow.text } : null,
        ads ? { who: "Max", label: "Ads opening", text: ads.text } : null,
        social ? { who: "Sophie", label: "Social draft", text: social.text } : null,
      ].filter((item): item is { who: string; label: string; text: string } => Boolean(item)),
    );
    setStage(-1);
    setHighlight(null);
    setRunning(false);
  }

  const job = jobs[index] ?? jobs[0];

  return (
    <section id="how" aria-labelledby="demo-heading" className="py-20 sm:py-28">
      <ViewportSignal kind="demo" />
      <Container>
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Command the workforce
        </p>
        <h2 id="demo-heading" className="font-display display-2 mt-6 max-w-3xl text-ice">
          What would you like your AI team to do?
        </h2>
        <p className="prose-narrow mt-4 text-sm leading-7 text-slate">
          Demonstration jobs. The words come from the same desks you unlock after
          you pay.
        </p>
        <div className="glass-lit mt-10 overflow-hidden rounded-[1.6rem] p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cyan">
              <span className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
                <span className="traffic bg-[#ff5f57] text-[#ff5f57]" />
                <span className="traffic bg-[#febc2e] text-[#febc2e]" />
                <span className="traffic bg-[#28c840] text-[#28c840]" />
              </span>
              Command console
            </p>
            <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-scout">
              <span className="status-dot" />
              {running ? "Executing" : "Ready"}
            </p>
          </div>
          <label className="block">
            <span className="label">Command input</span>
            <span className="relative block">
              <input
                value={typed}
                onChange={(event) => {
                  setTyped(event.target.value);
                  setRunning(true);
                }}
                className="field font-display text-lg"
              />
            </span>
          </label>
          <div className="mt-4 flex flex-wrap gap-2">
            {jobs.map((item, i) => (
              <button
                key={item.prompt}
                type="button"
                onClick={() => {
                  setIndex(i);
                  setTyped(item.prompt);
                }}
                className={`rounded-full px-3 py-1.5 text-xs ${
                  index === i ? "bg-cyan/20 text-ice" : "border border-white/12 text-titanium hover:text-ice"
                }`}
              >
                {item.prompt}
              </button>
            ))}
          </div>
          <Button type="button" className="mt-5" arrow disabled={running} onClick={() => void run(index)}>
            {running ? "Team working…" : "Run job"}
          </Button>
        </div>
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <WorkforceCore highlight={highlight} />
          <div className="space-y-3">
            {job ? (
              <p className="text-sm text-titanium">
                {running ? `${job.agents[Math.max(stage, 0)] ?? job.agents[0]} is on it.` : "The correct specialists light up, then write."}
              </p>
            ) : null}
            {output.length ? (
              output.map((item, i) => (
                <article
                  key={item.label}
                  className="glass live-cascade rounded-2xl p-4"
                  style={{ animationDelay: `${i * 90}ms`, boxShadow: `inset 3px 0 0 ${colourForAgent(item.who)}` }}
                >
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em]" style={{ color: colourForAgent(item.who) }}>
                    {item.who} · {item.label}
                  </p>
                  <pre className="mt-2 max-h-36 overflow-auto whitespace-pre-wrap font-sans text-sm leading-6 text-silver">
                    {item.text.length > 360 ? `${item.text.slice(0, 360).trim()}…` : item.text}
                  </pre>
                </article>
              ))
            ) : (
              <p className="text-sm text-slate">Run a job. Watch the workforce activate.</p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
