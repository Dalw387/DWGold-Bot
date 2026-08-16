import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { EmailCapture } from "@/components/landing/email-capture";
import { OfferJsonLd } from "@/components/pay/offer-json-ld";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import {
  HOUSE_PRICE_SHORT,
  HOUSE_PRODUCT_DESCRIPTION,
  HOUSE_PRODUCT_NAME,
} from "@/lib/commerce";
import { includedAfterPay } from "@/lib/offer";
import { housePriceLabel } from "@/lib/payments";

export const metadata: Metadata = {
  title: `Pay ${HOUSE_PRICE_SHORT} to use LocalLaunch`,
  description: `Pay ${HOUSE_PRICE_SHORT} for ${HOUSE_PRODUCT_NAME} through Stripe. After payment, this browser unlocks the platform.`,
};

export default function PayPage() {
  const label = housePriceLabel();

  return (
    <div className="ink-hero border-b border-[rgba(176,137,79,0.25)]">
      <OfferJsonLd />
      <Container className="max-w-3xl py-16 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d7c4a1]">
          Stripe checkout
        </p>
        <h1 className="font-display mt-4 text-4xl font-medium tracking-tight text-[#f6f1e8] sm:text-5xl">
          Pay {HOUSE_PRICE_SHORT}. Unlock the desk that is aimed at more customers.
        </h1>
        <p className="mt-5 text-base leading-7 text-[#e8dcc8]">
          You leave this site and pay on Stripe. Apple Pay, Google Pay, Link, or
          a card. The money goes to the LocalLaunch Stripe account. We never see
          your card number. After payment, Stripe should send you back here and
          this browser unlocks the studio.
        </p>
        <p className="mt-4 text-lg text-[#f6f1e8]">{label}</p>
        <p className="mt-3 text-sm leading-6 text-[#b3a28c]">
          {HOUSE_PRODUCT_DESCRIPTION}
        </p>
        <ul className="mt-8 space-y-3 text-sm leading-6 text-[#e8dcc8]">
          {includedAfterPay.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-10 rounded-3xl border border-[rgba(176,137,79,0.3)] p-6">
          <h2 className="font-display text-2xl text-[#f6f1e8]">Leave your email first</h2>
          <p className="mt-2 text-sm leading-6 text-[#e8dcc8]">
            Optional, but useful. We save it for later products, and Stripe can
            open with it filled in.
          </p>
          <div className="mt-6">
            <EmailCapture tone="ink" source="pay" />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <StripePayLink>Continue to Stripe · {HOUSE_PRICE_SHORT}</StripePayLink>
          <ButtonLink href="/#help" variant="secondary" className="text-[#f6f1e8]">
            Read the full offer first
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
