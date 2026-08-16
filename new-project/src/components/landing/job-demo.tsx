"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { generateForTool } from "@/lib/copy";
import { recordSignal } from "@/lib/nano-growth";
import { ViewportSignal } from "@/components/nano/viewport-signal";
import { DEFAULT_FACEBOOK_STYLES, type GeneratorFormValues } from "@/lib/types";

const jobs: { prompt: string; values: GeneratorFormValues }[] = [
  {
    prompt: "Find me potential roofing customers around Manchester.",
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
];

const stages = [
  "Understanding the objective…",
  "Building the local audience picture…",
  "Drafting the first reply and the ads lines…",
  "Preparing the pack…",
];

export function JobDemo() {
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState(-1);
  const [output, setOutput] = useState<{ label: string; text: string }[]>([]);

  async function run(jobIndex: number) {
    const job = jobs[jobIndex];
    if (!job) return;
    setIndex(jobIndex);
    setOutput([]);
    for (let i = 0; i < stages.length; i += 1) {
      setStage(i);
      await new Promise((resolve) => window.setTimeout(resolve, 420));
    }
    const reply = generateForTool("enquiry-reply", job.values)[0];
    const ads = generateForTool("ads-copy", job.values)[0];
    const plan = generateForTool("customer-plan", job.values)[0];
    recordSignal("demo", job.values.businessType);
    setOutput(
      [
        reply ? { label: "Appointment Agent · first reply", text: reply.text } : null,
        ads ? { label: "Ads Agent · opening lines", text: ads.text } : null,
        plan ? { label: "Lead Agent · 14-day plan (opening)", text: plan.text } : null,
      ].filter((item): item is { label: string; text: string } => Boolean(item)),
    );
    setStage(-1);
  }

  const job = jobs[index] ?? jobs[0];

  return (
    <section id="how" aria-labelledby="demo-heading" className="border-b border-border py-20 sm:py-28">
      <ViewportSignal kind="demo" />
      <Container>
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Demonstration — real drafts from this desk
        </p>
        <h2
          id="demo-heading"
          className="font-display mt-6 max-w-3xl text-4xl font-medium leading-[1.02] text-ice sm:text-5xl"
        >
          Give your AI agent a job.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate">
          These are example businesses, labelled as a demonstration. The words
          come from the same desk you unlock after you pay — not a live scrape
          of Manchester, and not a robot logging into ads accounts.
        </p>
        <div className="mt-10 flex flex-col gap-3 lg:flex-row">
          {jobs.map((item, i) => (
            <button
              key={item.prompt}
              type="button"
              onClick={() => void run(i)}
              className={`rounded-2xl border px-4 py-4 text-left text-sm leading-6 transition duration-200 ${
                index === i
                  ? "border-cobalt/50 bg-cobalt/10 text-ice"
                  : "border-white/10 bg-elevated text-slate hover:border-cobalt/30"
              }`}
            >
              {item.prompt}
            </button>
          ))}
        </div>
        <div className="surface mt-8 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate">{job.prompt}</p>
            <Button type="button" onClick={() => void run(index)} arrow>
              Run this job
            </Button>
          </div>
          {stage >= 0 ? (
            <p className="mt-6 text-sm text-cyan" role="status">
              {stages[stage]}
            </p>
          ) : null}
          {output.length > 0 ? (
            <div className="mt-8 grid gap-6">
              {output.map((item) => (
                <article key={item.label}>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
                    {item.label}
                  </h3>
                  <pre className="mt-3 max-h-56 overflow-auto whitespace-pre-wrap font-sans text-sm leading-7 text-ice">
                    {item.text.length > 700 ? `${item.text.slice(0, 700).trim()}…` : item.text}
                  </pre>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-slate">
              Choose a job. The team writes in this tab.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
