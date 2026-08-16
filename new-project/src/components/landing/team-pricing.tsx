import { Container } from "@/components/container";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { AGENT_COUNT_WORDS, ROOM_COUNT_WORDS } from "@/lib/counts";
import { includedAfterPay } from "@/lib/offer";

export function TeamPricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="border-b border-border py-20 sm:py-28">
      <Container>
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Pricing
        </p>
        <h2
          id="pricing-heading"
          className="font-display mt-6 max-w-3xl text-4xl font-medium leading-[1.02] text-ice sm:text-5xl"
        >
          The complete AI team. One payment.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate">
          We do not sell a thin £19 toy, and we will not invent monthly tiers we
          cannot run. You hire the full house: {ROOM_COUNT_WORDS} rooms and{" "}
          {AGENT_COUNT_WORDS} named desks, {HOUSE_PRICE_SHORT} once on Stripe.
        </p>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <article className="surface rounded-2xl p-6 opacity-70">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">Specialist</p>
            <h3 className="font-display mt-3 text-2xl text-ice">One desk</h3>
            <p className="mt-3 text-sm leading-6 text-slate">
              Not sold separately. The value is the department working from the
              same facts.
            </p>
          </article>
          <article className="surface-lit rounded-2xl p-8 lg:-translate-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
              Recommended · Complete AI team
            </p>
            <p className="font-display mt-4 text-5xl text-ice">{HOUSE_PRICE_SHORT}</p>
            <p className="mt-1 text-sm text-slate">one-off · full suite</p>
            <ul className="mt-6 space-y-2 text-sm leading-6 text-slate">
              {includedAfterPay.slice(0, 6).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <StripePayLink className="mt-8 w-full" arrow>
              Build my AI team
            </StripePayLink>
          </article>
          <article className="surface rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">Enterprise</p>
            <h3 className="font-display mt-3 text-2xl text-ice">Live workforce</h3>
            <p className="mt-3 text-sm leading-6 text-slate">
              Phone, Ads Manager, CRM and 24/7 sending. That is the long-term
              product. It is not this purchase. Leave your email if you want it
              later.
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
}
