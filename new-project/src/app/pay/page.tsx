import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PayButton } from "@/components/pay-button";
import { housePriceLabel, stripePaymentLink } from "@/lib/payments";

export const metadata: Metadata = {
  title: "Pay for House Operations",
  description:
    "Pay for LocalLaunch House Operations through Stripe. Apple Pay, Google Pay, Link, and cards go to the connected Stripe account.",
};

export default function PayPage() {
  const link = stripePaymentLink();
  const label = housePriceLabel();

  return (
    <div className="ink-hero border-b border-[rgba(176,137,79,0.25)]">
      <Container className="max-w-3xl py-16 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d7c4a1]">
          Stripe checkout
        </p>
        <h1 className="font-display mt-4 text-4xl font-medium tracking-tight text-[#f6f1e8] sm:text-5xl">
          Pay for House Operations
        </h1>
        <p className="mt-5 text-base leading-7 text-[#e8dcc8]">
          Payment is handled by Stripe, not by a form we built to store cards.
          When checkout is connected, Apple Pay, Google Pay, Link, and cards
          settle straight into the LocalLaunch Stripe account.
        </p>
        {label ? (
          <p className="mt-4 text-lg text-[#f6f1e8]">{label}</p>
        ) : (
          <p className="mt-4 text-sm text-[#b3a28c]">
            The live amount is the one set on your Stripe Payment Link or Price.
            This page will not invent a figure.
          </p>
        )}
        <ul className="mt-8 space-y-3 text-sm leading-6 text-[#e8dcc8]">
          <li>Apple Pay and Google Pay appear on Stripe Checkout when you enable wallets and verify the domain.</li>
          <li>Link is Stripe’s saved-details checkout, if you switch it on in the Stripe dashboard.</li>
          <li>House Operations drafts SEO, ads, and social work. Ad spend at Meta or Google is separate and paid to them.</li>
        </ul>
        <div className="mt-10">
          <PayButton tone="ink">Continue to Stripe</PayButton>
        </div>
        {!link ? (
          <p className="mt-6 text-sm leading-6 text-[#b3a28c]">
            If the button reports that checkout is not connected, open Stripe,
            create a Payment Link with wallets on, and add it as
            NEXT_PUBLIC_STRIPE_PAYMENT_LINK on Vercel.
          </p>
        ) : null}
      </Container>
    </div>
  );
}
