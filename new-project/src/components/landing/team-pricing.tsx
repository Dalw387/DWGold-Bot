"use client";

import { useState } from "react";
import { Container } from "@/components/container";
import { ViewportSignal } from "@/components/nano/viewport-signal";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { Button } from "@/components/button";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { specialists, openBuildTeam } from "@/lib/sales";

const extras = [
  "Review desk",
  "Missed-call pack",
  "14-day plan",
  "Proof ledger",
  "Nano Growth",
  "Marketing Score",
];

export function TeamPricing() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="band-pricing py-24 sm:py-32">
      <ViewportSignal kind="pricing" />
      <Container className="max-w-4xl">
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          The complete LocalLaunch workforce
        </p>
        <h2 id="pricing-heading" className="font-display display-2 mt-6 text-ice">
          One product. One payment.
        </h2>
        <p className="prose-narrow mt-5 text-base leading-7 text-slate">
          The full writing house: six specialists, twenty-four work rooms, one
          connected workspace. We will not invent monthly tiers we cannot run.
        </p>
        <article
          className="glass-lit relative mt-12 overflow-hidden rounded-[1.8rem] p-8 sm:p-12"
          onPointerMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
            const y = ((event.clientY - rect.top) / rect.height - 0.5) * -6;
            setTilt({ x, y });
          }}
          onPointerLeave={() => setTilt({ x: 0, y: 0 })}
          style={{ transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
        >
          <p className="font-display text-[clamp(4.2rem,10vw,7.5rem)] leading-none tracking-tight text-ice">
            {HOUSE_PRICE_SHORT}
          </p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan">One payment</p>
          <p className="mt-8 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-titanium">
            6 specialists · 24 work rooms · 1 connected workspace
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {specialists.map((agent) => (
              <li
                key={agent.id}
                className="rounded-2xl border border-white/10 bg-void/40 px-4 py-3"
                style={{ boxShadow: `inset 3px 0 0 ${agent.colour}` }}
              >
                <p className="font-display text-lg text-ice">{agent.name}</p>
                <p className="text-xs uppercase tracking-[0.14em]" style={{ color: agent.colour }}>
                  {agent.desk}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-magenta">Plus</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {extras.map((item) => (
              <li key={item} className="rounded-full border border-cyan/20 px-3 py-1 text-xs text-silver">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <StripePayLink arrow>Unlock LocalLaunch — {HOUSE_PRICE_SHORT}</StripePayLink>
            <Button type="button" variant="secondary" onClick={() => openBuildTeam()}>
              Build My AI Team
            </Button>
          </div>
          <p className="mt-5 text-xs leading-5 text-slate">
            One payment · Stripe checkout · no monthly subscription for this product.
            Apple Pay, Google Pay, Link or card where available. LocalLaunch does not
            store your card number.
          </p>
        </article>
        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="label">Coming later</p>
          <h3 className="font-display mt-3 text-2xl text-ice">Live workforce</h3>
          <p className="prose-narrow mt-3 text-sm leading-6 text-slate">
            Phone, CRM, Ads Manager and 24/7 sending. That is a different future
            product. It is not included in the {HOUSE_PRICE_SHORT} purchase.
          </p>
        </div>
      </Container>
    </section>
  );
}
