import type { Metadata } from "next";
import { ButtonAnchor, ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { OfferJsonLd } from "@/components/pay/offer-json-ld";
import {
  HOUSE_PRICE_SHORT,
  HOUSE_PRODUCT_DESCRIPTION,
  HOUSE_PRODUCT_NAME,
} from "@/lib/commerce";
import { housePriceLabel, stripePaymentLink } from "@/lib/payments";

export const metadata: Metadata = {
  title: `Pay ${HOUSE_PRICE_SHORT} for House Operations`,
  description: `Pay ${HOUSE_PRICE_SHORT} for ${HOUSE_PRODUCT_NAME} through Stripe. Apple Pay, Google Pay, Link, and cards go to the LocalLaunch Stripe account.`,
};

const included = [
  "The House Operations desk: SEO, Facebook/Instagram ads drafts, Google Ads drafts, a week of social starting points, and a measurement plan",
  "A public homepage draft so strangers are not stopped by a login wall",
  "The proof ledger, so you only count real enquiries",
  "The free studio stays free: thirteen rooms, concierge, copy and download",
  "You still publish the words. Facebook and Google ad spend is extra and paid to them",
];

export default function PayPage() {
  const link = stripePaymentLink();
  const label = housePriceLabel();

  return (
    <div className="ink-hero border-b border-[rgba(176,137,79,0.25)]">
      <OfferJsonLd />
      <Container className="max-w-3xl py-16 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d7c4a1]">
          Stripe checkout
        </p>
        <h1 className="font-display mt-4 text-4xl font-medium tracking-tight text-[#f6f1e8] sm:text-5xl">
          Pay {HOUSE_PRICE_SHORT} for House Operations
        </h1>
        <p className="mt-5 text-base leading-7 text-[#e8dcc8]">
          You leave this site and pay on Stripe. Apple Pay, Google Pay, Link, or
          a card. The money goes to the LocalLaunch Stripe account. We never see
          your card number.
        </p>
        <p className="mt-4 text-lg text-[#f6f1e8]">{label}</p>
        <p className="mt-3 text-sm leading-6 text-[#b3a28c]">
          {HOUSE_PRODUCT_DESCRIPTION}
        </p>
        <ul className="mt-8 space-y-3 text-sm leading-6 text-[#e8dcc8]">
          {included.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          {link ? (
            <ButtonAnchor href={link} variant="gold" rel="noreferrer">
              Continue to Stripe · {HOUSE_PRICE_SHORT}
            </ButtonAnchor>
          ) : null}
          <ButtonLink href="/guide" variant="secondary" className="text-[#f6f1e8]">
            How it works first
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm leading-6 text-[#b3a28c]">
          After you pay, come back and open House Operations, then log real
          enquiries in the proof ledger. In the Stripe Payment Link, set “After
          payment” to your live site’s /pay/thanks page when you have a public
          web address.
        </p>
      </Container>
    </div>
  );
}
