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
    <div className="border-b border-border">
      <OfferJsonLd />
      <Container className="max-w-3xl py-16 sm:py-24">
        <p className="kicker">Stripe checkout</p>
        <h1 className="font-display mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
          Pay {HOUSE_PRICE_SHORT}. Then start getting customers.
        </h1>
        <p className="mt-5 text-base leading-7 text-muted">
          You leave this site and pay on Stripe. Apple Pay, Google Pay, Link, or
          a card. We never see your card number. After payment, Stripe should
          send you back here and this browser unlocks the desk.
        </p>
        <p className="mt-4 text-lg">{label}</p>
        <p className="mt-3 text-sm leading-6 text-muted">
          {HOUSE_PRODUCT_DESCRIPTION}
        </p>
        <ul className="mt-8 list-disc space-y-3 pl-5 text-sm leading-6 text-foreground">
          {includedAfterPay.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-10 border border-border p-6">
          <h2 className="font-display text-2xl">Leave your email first</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Optional. We save it for later products, and Stripe can open with it
            filled in.
          </p>
          <div className="mt-6">
            <EmailCapture source="pay" />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <StripePayLink>Continue to Stripe · {HOUSE_PRICE_SHORT}</StripePayLink>
          <ButtonLink href="/#value" variant="secondary">
            Read why it is worth {HOUSE_PRICE_SHORT}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
