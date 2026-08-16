"use client";

import { useMemo, useState } from "react";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { copyText } from "@/lib/clipboard";
import { DEMO_ENQUIRY, DEMO_WORKSPACE } from "@/lib/agent-identity";
import { generateForTool } from "@/lib/copy";
import type { ToolSlug } from "@/lib/types";

const tabs: {
  id: string;
  label: string;
  who: string;
  incoming?: string;
  tool: ToolSlug;
  deskHref: string;
}[] = [
  {
    id: "lead",
    label: "Lead response",
    who: "Charlie / first response",
    incoming: DEMO_ENQUIRY,
    tool: "enquiry-reply",
    deskHref: "/tools/enquiry-reply",
  },
  {
    id: "follow",
    label: "Follow-up",
    who: "Alex / follow-up",
    tool: "follow-up",
    deskHref: "/tools/follow-up",
  },
  {
    id: "google",
    label: "Google Ads",
    who: "Max / Google Ads",
    tool: "ads-copy",
    deskHref: "/tools/ads-copy",
  },
  {
    id: "meta",
    label: "Meta ads",
    who: "Max / Meta ads",
    tool: "ads-copy",
    deskHref: "/tools/ads-copy",
  },
  {
    id: "social",
    label: "Social",
    who: "Sophie / social",
    tool: "facebook-post-generator",
    deskHref: "/tools/facebook-post-generator",
  },
  {
    id: "reviews",
    label: "Reviews",
    who: "Grace / reviews",
    tool: "google-review-desk",
    deskHref: "/tools/google-review-desk",
  },
  {
    id: "search",
    label: "Search",
    who: "Scout / search",
    tool: "seo-brief",
    deskHref: "/tools/seo-brief",
  },
  {
    id: "plan",
    label: "14-day plan",
    who: "Alex / 14-day plan",
    tool: "customer-plan",
    deskHref: "/tools/customer-plan",
  },
];

export function OutputPreviews() {
  const [tabId, setTabId] = useState(tabs[0]?.id ?? "lead");
  const [copied, setCopied] = useState(false);
  const tab = tabs.find((item) => item.id === tabId) ?? tabs[0];
  const draft = useMemo(() => {
    if (!tab) return undefined;
    const pack = generateForTool(tab.tool, DEMO_WORKSPACE);
    if (tab.id === "meta") return pack.find((item) => item.id.includes("facebook") || item.label.toLowerCase().includes("facebook") || item.label.toLowerCase().includes("meta")) ?? pack[0];
    if (tab.id === "google") return pack.find((item) => item.label.toLowerCase().includes("google")) ?? pack[1] ?? pack[0];
    return pack[0];
  }, [tab]);

  async function copy() {
    if (!draft) return;
    const ok = await copyText(draft.text);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  }

  return (
    <section id="work" aria-labelledby="work-heading" className="py-24 sm:py-28">
      <Container>
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Don’t take our word for it
        </p>
        <h2 id="work-heading" className="font-display display-2 mt-6 max-w-3xl text-ice">
          Read the work.
        </h2>
        <p className="prose-narrow mt-5 text-base leading-7 text-slate">
          Real LocalLaunch drafts from the same demo business. Labelled as example
          output — not a customer story.
        </p>
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((item) => {
            const on = item.id === tabId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTabId(item.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm ${
                  on ? "bg-cyan/20 text-ice" : "border border-white/10 text-titanium hover:text-ice"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        {tab && draft ? (
          <article className="glass-lit mt-8 overflow-hidden rounded-[1.5rem]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan/15 px-5 py-3">
              <p className="label">{tab.who}</p>
              <p className="rounded-full border border-magenta/30 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-pink">
                Example output
              </p>
            </div>
            {tab.incoming ? (
              <div className="border-b border-cyan/10 px-5 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.14em] text-titanium">Input</p>
                <p className="mt-2 text-sm leading-7 text-ice">“{tab.incoming}”</p>
              </div>
            ) : (
              <div className="border-b border-cyan/10 px-5 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.14em] text-titanium">Input</p>
                <p className="mt-2 text-sm leading-7 text-ice">
                  {DEMO_WORKSPACE.businessName} · {DEMO_WORKSPACE.location} · {DEMO_WORKSPACE.offer}
                </p>
              </div>
            )}
            <div className="border-b border-cyan/10 px-5 py-3">
              <p className="text-[0.62rem] uppercase tracking-[0.14em] text-cyan">AI process</p>
              <p className="mt-1 text-sm text-silver">Same business facts → named desk → finished draft you can copy.</p>
            </div>
            <div className="document-surface m-4 rounded-2xl px-5 py-5 sm:m-6">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-black/50">Draft</p>
              <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-7 text-[#1b1a16]">{draft.text}</pre>
            </div>
            <div className="flex flex-wrap gap-3 px-5 pb-5">
              <button type="button" onClick={() => void copy()} className="rounded-xl border border-cyan/30 px-4 py-2 text-sm text-ice hover:border-cyan">
                {copied ? "Copied" : "Copy"}
              </button>
              <ButtonLink href={tab.deskHref} variant="secondary">
                Edit in the desk
              </ButtonLink>
            </div>
          </article>
        ) : null}
      </Container>
    </section>
  );
}
