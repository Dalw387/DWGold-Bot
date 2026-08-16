"use client";

import { Container } from "@/components/container";
import { ViewportSignal } from "@/components/nano/viewport-signal";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { Button } from "@/components/button";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { AGENT_COUNT_WORDS, ROOM_COUNT_WORDS } from "@/lib/counts";
import { includedAfterPay } from "@/lib/offer";
import { openBuildTeam } from "@/lib/sales";

export function TeamPricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-24 sm:py-32">
      <ViewportSignal kind="pricing" />
      <Container className="max-w-3xl">
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          One payment
        </p>
        <h2 id="pricing-heading" className="font-display display-2 mt-6 text-ice">
          You’ve seen what the team can do.
          <br />
          Now build yours.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate">
          One product. One payment. The full writing house: {ROOM_COUNT_WORDS}{" "}
          rooms and {AGENT_COUNT_WORDS} named desks. We will not invent monthly
          tiers we cannot run.
        </p>
        <article className="titanium-lit mt-12 rounded-[1.5rem] p-8 sm:p-10">
          <p className="label">Complete AI marketing team</p>
          <p className="font-display mt-4 text-6xl tracking-tight text-ice">{HOUSE_PRICE_SHORT}</p>
          <p className="mt-2 text-sm text-slate">one-off · no monthly subscription for this product</p>
          <ul className="mt-8 grid gap-2 text-sm leading-6 text-slate sm:grid-cols-2">
            {includedAfterPay.slice(0, 8).map((item) => (
              <li key={item} className="pr-4">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <StripePayLink arrow>Buy now — {HOUSE_PRICE_SHORT}</StripePayLink>
            <Button type="button" variant="secondary" onClick={() => openBuildTeam()}>
              Build My AI Team
            </Button>
          </div>
          <p className="mt-4 text-xs leading-5 text-slate">
            Secure checkout via Stripe. Apple Pay, Google Pay, Link or card where
            available. One payment. LocalLaunch does not store your card number.
          </p>
        </article>
        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="label">Coming later</p>
          <h3 className="font-display mt-3 text-2xl text-ice">Live workforce</h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate">
            Phone, CRM, Ads Manager and 24/7 sending. That is a different future
            product. It is not included in the {HOUSE_PRICE_SHORT} purchase.
          </p>
        </div>
      </Container>
    </section>
  );
}
