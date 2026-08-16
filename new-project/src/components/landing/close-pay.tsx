import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { BrandMark } from "@/components/logo";

export function ClosePay() {
  return (
    <section id="pay" aria-labelledby="pay-heading" className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <BrandMark className="h-[28rem] w-[28rem] opacity-[0.04]" />
      </div>
      <Container className="relative max-w-3xl">
        <h2 id="pay-heading" className="font-display display-1 text-ice">
          Your competition isn’t waiting for AI.
        </h2>
        <p className="mt-6 max-w-lg text-lg leading-8 text-slate">
          Build the capability before it becomes the expectation.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <StripePayLink arrow>Build My AI Team →</StripePayLink>
          <ButtonLink href="/#pricing" variant="secondary">
            See what’s included
          </ButtonLink>
        </div>
        <p className="mt-6 text-xs text-slate">
          Secure checkout · Card · Apple Pay · Google Pay where available · {HOUSE_PRICE_SHORT} once
        </p>
      </Container>
    </section>
  );
}
