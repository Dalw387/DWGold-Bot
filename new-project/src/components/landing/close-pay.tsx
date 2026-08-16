import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { BrandMark } from "@/components/logo";

export function ClosePay() {
  return (
    <section id="pay" aria-labelledby="pay-heading" className="band-close relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <BrandMark className="h-[32rem] w-[32rem] opacity-[0.12]" />
      </div>
      <Container className="relative max-w-3xl">
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Your team is ready
        </p>
        <h2 id="pay-heading" className="font-display display-1 mt-6 text-ice">
          Give them something worth working on.
        </h2>
        <p className="mt-5 max-w-lg text-lg text-silver">
          Six specialists. One payment. The work starts when you do.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <StripePayLink arrow>Build my AI team — {HOUSE_PRICE_SHORT}</StripePayLink>
          <ButtonLink href="/#control" variant="secondary">
            Explore the Control Centre
          </ButtonLink>
        </div>
        <p className="mt-6 text-xs text-silver">
          Secure checkout · Card · Apple Pay · Google Pay where available · {HOUSE_PRICE_SHORT} once
        </p>
      </Container>
    </section>
  );
}
