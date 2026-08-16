"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { DEMO_ENQUIRY, DEMO_WORKSPACE } from "@/lib/agent-identity";
import { generateForTool } from "@/lib/copy";
import { specialists, type SpecialistId } from "@/lib/sales";

const workflow: {
  id: SpecialistId;
  verb: string;
  tool: "enquiry-reply" | "follow-up" | "google-review-desk" | "facebook-post-generator" | "seo-brief" | "ads-copy";
  caption?: string;
}[] = [
  { id: "charlie", verb: "Responds", tool: "enquiry-reply" },
  { id: "alex", verb: "Follows up", tool: "follow-up", caption: "Day 1 · Day 3 · Day 7" },
  { id: "grace", verb: "Requests review", tool: "google-review-desk", caption: "After the job" },
  { id: "sophie", verb: "Turns it into content", tool: "facebook-post-generator" },
  { id: "scout", verb: "Strengthens visibility", tool: "seo-brief" },
  { id: "max", verb: "Feeds advertising", tool: "ads-copy" },
];

export function AgentShowroom() {
  const [active, setActive] = useState<SpecialistId>("charlie");
  const [lit, setLit] = useState(1);
  const spec = specialists.find((s) => s.id === active) ?? specialists[0];
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = window.setInterval(() => {
      setLit((current) => (current + 1) % (workflow.length + 1));
    }, 1600);
    return () => window.clearInterval(id);
  }, []);
  const drafts = useMemo(
    () =>
      workflow.map((step) => ({
        ...step,
        agent: specialists.find((s) => s.id === step.id),
        draft: generateForTool(step.tool, DEMO_WORKSPACE)[0],
      })),
    [],
  );
  const tileDraft = spec
    ? generateForTool(
        spec.id === "max"
          ? "ads-copy"
          : spec.id === "scout"
            ? "seo-brief"
            : spec.id === "alex"
              ? "customer-plan"
              : spec.id === "grace"
                ? "google-review-desk"
                : spec.id === "sophie"
                  ? "facebook-post-generator"
                  : "enquiry-reply",
        DEMO_WORKSPACE,
      )[0]
    : undefined;

  return (
    <section id="agents" aria-labelledby="agents-heading" className="band-team py-24 sm:py-32">
      <Container>
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Operations floor
        </p>
        <h2 id="agents-heading" className="font-display display-2 mt-6 max-w-3xl text-ice">
          Your marketing department.
          Already assembled.
        </h2>
        <p className="prose-narrow mt-5 text-base leading-7 text-slate">
          Six specialists. Different responsibilities. One shared understanding of
          your business.
        </p>

        <div className="glass mt-14 overflow-hidden rounded-[1.6rem] p-5 sm:p-8">
          <div className="mb-6 h-px overflow-hidden bg-white/8">
            <span className="load-bar block h-px w-full">
              <span />
            </span>
          </div>
          <p className="label">Customer enquiry</p>
          <p className="mt-3 max-w-2xl font-serif text-2xl leading-snug text-ice sm:text-3xl">
            “{DEMO_ENQUIRY}”
          </p>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {drafts.map((step, index) => {
              const on = index <= lit - 1;
              return (
              <li
                key={step.id}
                className="rounded-2xl border bg-void/40 p-4 transition"
                style={{
                  borderColor: on ? step.agent?.colour : "rgba(255,255,255,0.08)",
                  boxShadow: on
                    ? `inset 3px 0 0 ${step.agent?.colour ?? "#49E6FF"}, 0 0 24px ${step.agent?.colour ?? "#49E6FF"}33`
                    : `inset 3px 0 0 ${step.agent?.colour ?? "#49E6FF"}`,
                  opacity: on ? 1 : 0.55,
                }}
              >
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em]" style={{ color: step.agent?.colour }}>
                  {step.agent?.name} · {step.verb}
                </p>
                {step.caption ? <p className="mt-2 text-xs text-titanium">{step.caption}</p> : null}
                <p className="mt-3 line-clamp-5 text-sm leading-6 text-silver">
                  {step.draft?.text}
                </p>
              </li>
            );
            })}
          </ol>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {specialists.map((agent, index) => {
            const on = agent.id === active;
            const featured = index === 0;
            return (
              <button
                key={agent.id}
                type="button"
                onClick={() => setActive(agent.id)}
                className={`glass rounded-[1.35rem] p-5 text-left transition ${
                  featured ? "sm:col-span-2 xl:col-span-1 xl:row-span-1" : ""
                } ${on ? "glass-lit" : "hover:border-cyan/30"}`}
                style={{ boxShadow: on ? `0 0 0 1px ${agent.colour}66, inset 0 1px 0 rgb(255 255 255 / 0.1)` : undefined }}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-display text-2xl text-ice">{agent.name}</span>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: agent.colour, boxShadow: `0 0 12px ${agent.colour}` }} />
                </span>
                <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.14em]" style={{ color: agent.colour }}>
                  {agent.desk}
                </span>
                <span className="mt-3 block text-sm leading-6 text-slate">{agent.job}</span>
              </button>
            );
          })}
        </div>

        {spec ? (
          <div className="glass-lit mt-8 rounded-[1.5rem] p-6 sm:p-8">
            <p className="label" style={{ color: spec.colour }}>
              {spec.name} · {spec.title}
            </p>
            <h3 className="font-display display-3 mt-3 text-ice">{spec.job}</h3>
            <p className="prose-narrow mt-3 text-sm leading-7 text-slate">{spec.outcome}</p>
            <p className="prose-narrow mt-2 text-sm leading-7 text-slate">{spec.doesNot}</p>
            {tileDraft ? (
              <pre className="mt-6 max-h-48 overflow-auto whitespace-pre-wrap font-sans text-sm leading-7 text-ice">
                {tileDraft.text.length > 580 ? `${tileDraft.text.slice(0, 580).trim()}…` : tileDraft.text}
              </pre>
            ) : null}
            <p className="mt-4 text-xs text-titanium">Demonstration output. After you pay, this desk uses your facts.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={`/${spec.slug}`} arrow>
                See {spec.name}
              </ButtonLink>
              <Link href={spec.deskHref} className="inline-flex items-center text-sm text-cyan hover:text-ice">
                Open the desk →
              </Link>
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
