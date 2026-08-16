"use client";

import Link from "next/link";
import { useState } from "react";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { generateForTool } from "@/lib/copy";
import { DEFAULT_FACEBOOK_STYLES } from "@/lib/types";
import { specialists } from "@/lib/sales";

const stories: Record<
  string,
  { steps: string[]; tool: "enquiry-reply" | "ads-copy" | "customer-plan" | "facebook-post-generator" | "google-review-desk" | "seo-brief"; values: Parameters<typeof generateForTool>[1] }
> = {
  alex: {
    steps: ["People you already know", "14-day plan", "Referral ask", "Neighbour introduction"],
    tool: "customer-plan",
    values: {
      businessName: "Ridge & Rain",
      businessType: "roofing",
      location: "Manchester",
      offer: "roof repairs and new roofs",
      tone: "professional",
      callToAction: "Call or message for a quote",
      length: "standard",
      includeHashtags: false,
      facebookStyles: [...DEFAULT_FACEBOOK_STYLES],
    },
  },
  max: {
    steps: ["Campaign", "Spend stays with you", "Copy drafted", "You paste it"],
    tool: "ads-copy",
    values: {
      businessName: "Elm Dental",
      businessType: "dental practice",
      location: "Leeds",
      offer: "check-ups and hygienist visits",
      tone: "professional",
      callToAction: "Book a consultation",
      length: "standard",
      includeHashtags: false,
      facebookStyles: [...DEFAULT_FACEBOOK_STYLES],
    },
  },
  sophie: {
    steps: ["Offer", "Post drafted", "First reply drafted", "You publish"],
    tool: "facebook-post-generator",
    values: {
      businessName: "Harbour & Hearth",
      businessType: "cafe",
      location: "Falmouth",
      offer: "weekend brunch",
      tone: "friendly",
      callToAction: "Message us",
      length: "standard",
      includeHashtags: false,
      facebookStyles: ["helpful"],
    },
  },
  charlie: {
    steps: ["Missed call", "Text drafted", "Qualification", "Booking line"],
    tool: "enquiry-reply",
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
  grace: {
    steps: ["Job finished", "Review ask drafted", "You send it", "Reply if needed"],
    tool: "google-review-desk",
    values: {
      businessName: "Ash & Lime",
      businessType: "building",
      location: "Nottingham",
      offer: "extensions and repairs",
      tone: "professional",
      callToAction: "Message for a site visit",
      length: "standard",
      includeHashtags: false,
      facebookStyles: [...DEFAULT_FACEBOOK_STYLES],
    },
  },
  scout: {
    steps: ["Stranger arrives", "Public page", "Local titles", "Open door for ads"],
    tool: "seo-brief",
    values: {
      businessName: "Hart & Vale",
      businessType: "solicitors",
      location: "York",
      offer: "residential conveyancing",
      tone: "professional",
      callToAction: "Enquire to book a consultation",
      length: "standard",
      includeHashtags: false,
      facebookStyles: [...DEFAULT_FACEBOOK_STYLES],
    },
  },
};

export function AgentShowroom() {
  const [active, setActive] = useState(specialists[3]?.id ?? "charlie");
  const spec = specialists.find((s) => s.id === active) ?? specialists[0];
  const story = spec ? stories[spec.id] : undefined;
  const draft = story ? generateForTool(story.tool, story.values)[0] : undefined;

  return (
    <section id="agents" aria-labelledby="agents-heading" className="border-y border-border py-24 sm:py-32">
      <Container>
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          One team
        </p>
        <h2 id="agents-heading" className="font-display display-2 mt-6 max-w-3xl text-ice">
          One team.
          <br />
          Specialists for every stage of growth.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate">
          Not six chatbots. One connected marketing department working from the
          same business facts.
        </p>
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
          <ol className="space-y-1">
            {specialists.map((agent, index) => {
              const on = agent.id === active;
              return (
                <li key={agent.id}>
                  <button
                    type="button"
                    onClick={() => setActive(agent.id)}
                    className={`flex w-full items-baseline gap-4 rounded-xl px-4 py-3 text-left transition ${
                      on ? "bg-white/5 text-ice" : "text-slate hover:text-ice"
                    }`}
                  >
                    <span className="font-mono text-xs text-titanium">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-display text-xl">{agent.name}</span>
                      <span className="text-sm text-slate">{agent.title}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          {spec ? (
            <div className="titanium rounded-[1.5rem] p-6 sm:p-8">
              <p className="label">{spec.name} · {spec.title}</p>
              <h3 className="font-display display-3 mt-3 text-ice">{spec.job}</h3>
              <p className="mt-3 text-sm leading-6 text-slate">{spec.outcome}</p>
              <p className="mt-2 text-sm leading-6 text-slate">{spec.doesNot}</p>
              {story ? (
                <ol className="mt-8 flex flex-wrap gap-2">
                  {story.steps.map((step, i) => (
                    <li
                      key={step}
                      className="rounded-full border border-titanium/25 px-3 py-1 text-xs text-titanium"
                    >
                      {i + 1}. {step}
                    </li>
                  ))}
                </ol>
              ) : null}
              {draft ? (
                <pre className="mt-6 max-h-56 overflow-auto whitespace-pre-wrap font-sans text-sm leading-7 text-ice">
                  {draft.text.length > 620 ? `${draft.text.slice(0, 620).trim()}…` : draft.text}
                </pre>
              ) : null}
              <p className="mt-4 text-xs text-slate">Demonstration output. After you pay, this desk uses your facts.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={`/${spec.slug}`} arrow>
                  See {spec.name}
                </ButtonLink>
                <Link href={spec.deskHref} className="inline-flex items-center text-sm text-titanium hover:text-ice">
                  Open the desk →
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
