import type { Metadata } from "next";
import { Suspense } from "react";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { HouseReturnMarker } from "@/components/pay/house-return-marker";
import { firstHour } from "@/lib/offer";

export const metadata: Metadata = {
  title: "You are in",
  description:
    "Returned from Stripe. The LocalLaunch platform is unlocked in this browser. Run the named desks and log only real enquiries.",
};

export default function PayThanksPage() {
  return (
    <Container className="max-w-2xl py-16 sm:py-24">
      <p className="kicker">Payment</p>
      <h1 className="font-display mt-3 text-4xl font-medium tracking-tight text-foreground">
        You are inside. Start getting customers.
      </h1>
      <p className="mt-4 text-base leading-7 text-muted">
        If Stripe took the £197, this browser now opens the platform. Spend the
        next hour on the list below. Type your business, or run the owner trial,
        then publish only what is true. This page does not invent a lead count.
      </p>
      <Suspense>
        <HouseReturnMarker />
      </Suspense>
      <h2 className="font-display mt-10 text-2xl text-foreground">Your first hour</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-muted">
        {firstHour.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/operations" variant="gold">
          Open House Operations
        </ButtonLink>
        <ButtonLink href="/tools/google-review-desk" variant="secondary">
          Google review desk
        </ButtonLink>
        <ButtonLink href="/tools/off-hours" variant="secondary">
          Off-hours texts
        </ButtonLink>
      </div>
    </Container>
  );
}
