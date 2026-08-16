"use client";

import { useState } from "react";
import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { AGENT_COUNT_WORDS, ROOM_COUNT_WORDS } from "@/lib/counts";

const items = [
  {
    q: "What exactly am I buying?",
    a: `${HOUSE_PRICE_SHORT} once on Stripe. That unlocks ${ROOM_COUNT_WORDS} drafting rooms, ${AGENT_COUNT_WORDS} named desks, the concierge, a 14-day plan, review and missed-call packs, and the proof ledger. It is not Facebook or Google ad spend, and it is not a promise of a full diary.`,
  },
  {
    q: "How does the AI team actually work?",
    a: "You type the facts. Named desks write the drafts in this browser. You check them and you send them. They do not scrape prospects, answer the live phone, post to Instagram, or log into Ads Manager.",
  },
  {
    q: "Can LocalLaunch guarantee more customers?",
    a: "No — and we would not make that promise. LocalLaunch helps create and organise the marketing work involved in generating, following up and converting opportunities. Results still depend on your market, offer, advertising, execution and customer demand.",
  },
  {
    q: "Does it connect to Google or Meta?",
    a: "Not in this product. Max and Mia draft the ads. You paste them. You set the limit. Live Ads Manager connections are a later workforce.",
  },
  {
    q: "Can I approve work before anything is published?",
    a: "Yes. Nothing leaves this browser unless you copy it. You stay the publisher.",
  },
  {
    q: "What happens after I purchase?",
    a: "Pay on Stripe. Stripe should send you back here. This browser then opens the studio. Use the same phone or computer you paid on. There is no separate login yet.",
  },
  {
    q: "Can I talk to a person?",
    a: "Yes. Use Talk to a human, or leave your email on the list. The guide will never trap you inside a chat.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<string | null>(items[0]?.q ?? null);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24 sm:py-32">
      <Container className="max-w-3xl">
        <h2 id="faq-heading" className="font-display display-2 text-ice">
          Straight answers.
        </h2>
        <p className="mt-4 text-base leading-7 text-slate">The important stuff, without the sales pitch.</p>
        <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {items.map((item) => {
            const expanded = open === item.q;
            return (
              <div key={item.q} className="py-5">
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-6 text-left"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : item.q)}
                >
                  <span className="font-display text-xl text-ice">{item.q}</span>
                  <span className="text-titanium">{expanded ? "–" : "+"}</span>
                </button>
                {expanded ? (
                  <p className="mt-3 max-w-[46rem] text-sm leading-7 text-slate">{item.a}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
