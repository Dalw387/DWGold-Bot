"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { ButtonLink } from "@/components/button";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import {
  getAccessSnapshot,
  getServerAccessSnapshot,
  hydrateAccessStore,
  subscribeAccess,
} from "@/lib/access-storage";
import { stripePaymentLink } from "@/lib/payments";

export function PlatformGate({ children }: { children: ReactNode }) {
  const access = useSyncExternalStore(
    subscribeAccess,
    getAccessSnapshot,
    getServerAccessSnapshot,
  );
  useEffect(() => {
    hydrateAccessStore();
  }, []);

  if (!access.hydrated) {
    return (
      <Container className="py-16">
        <p className="text-sm text-muted">Opening the desk.</p>
      </Container>
    );
  }

  if (access.unlocked) return children;

  const link = stripePaymentLink();

  return (
    <div className="border-b border-border">
      <Container className="max-w-2xl py-16 sm:py-24">
        <p className="kicker">Members’ desk</p>
        <h1 className="font-display mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
          Pay {HOUSE_PRICE_SHORT} to come inside
        </h1>
        <p className="mt-5 text-base leading-7 text-muted">
          The studio, the named desks, the concierge, and the proof ledger open
          after Stripe takes payment. Read the offer, or look at the Falmouth
          sample, then pay if it is a fit.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          {link ? (
            <StripePayLink>Continue to Stripe · {HOUSE_PRICE_SHORT}</StripePayLink>
          ) : null}
          <ButtonLink href="/sample" variant="secondary">
            Look at a sample first
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
