import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { OfferJsonLd } from "@/components/pay/offer-json-ld";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { HOUSE_PRICE_SHORT, HOUSE_PRODUCT_NAME } from "@/lib/commerce";
import { housePriceLabel } from "@/lib/payments";

export const metadata: Metadata = {
  title: `Pay ${HOUSE_PRICE_SHORT} to use LocalLaunch`,
  description: `Pay ${HOUSE_PRICE_SHORT} for ${HOUSE_PRODUCT_NAME} through Stripe. After payment, this browser unlocks the platform.`,
};

export default function PayPage() {
  const label = housePriceLabel();

  return (
    <div className="border-b border-border">
      <OfferJsonLd />
      <Container className="max-w-2xl py-16 sm:py-24">
        <div className="glass-lit rounded-[1.6rem] p-8 sm:p-10">
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Ready to put the team to work?
        </p>
        <h1 className="font-display display-2 mt-6 text-ice">
          {HOUSE_PRICE_SHORT} once.
        </h1>
        <p className="mt-5 text-base leading-7 text-slate">
          Secure checkout through Stripe. Apple Pay, Google Pay, Link or a card.
          We never see your card number. After payment, Stripe should send you
          back and this browser unlocks the desk.
        </p>
        <p className="mt-4 text-sm text-slate">{label}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <StripePayLink arrow>Build my AI team — {HOUSE_PRICE_SHORT}</StripePayLink>
          <ButtonLink href="/#pricing" variant="secondary">
            See what’s included
          </ButtonLink>
        </div>
        <details className="mt-12 border-t border-white/10 pt-6">
          <summary className="cursor-pointer text-sm font-medium text-ice">What happens after payment?</summary>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-slate">
            <li>01 Complete secure checkout.</li>
            <li>02 Return to LocalLaunch.</li>
            <li>03 This browser unlocks the workspace.</li>
            <li>04 Start building customer-getting drafts.</li>
          </ol>
        </details>
        </div>
      </Container>
    </div>
  );
}
