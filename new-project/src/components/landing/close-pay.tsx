import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { housePriceLabel } from "@/lib/payments";

export function ClosePay() {
  const label = housePriceLabel();

  return (
    <section id="pay" aria-labelledby="pay-heading" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 hero-light" aria-hidden="true" />
      <Container className="relative max-w-3xl">
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          If you are happy
        </p>
        <h2
          id="pay-heading"
          className="font-display mt-6 text-4xl font-medium leading-[1.02] text-ice sm:text-6xl"
        >
          Build the team. Then start getting customers.
        </h2>
        <p className="mt-5 text-base leading-7 text-slate">
          Apple Pay, Google Pay, Link, or a card. You leave this page and pay on
          Stripe. After payment, Stripe should send you back. This browser then
          unlocks the platform. {label}.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <StripePayLink arrow>Build my AI team · {HOUSE_PRICE_SHORT}</StripePayLink>
          <ButtonLink href="/pay" variant="secondary">
            Full checkout page
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
