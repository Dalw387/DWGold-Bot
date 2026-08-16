"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { ButtonAnchor } from "@/components/button";
import {
  getLeadEmailSnapshot,
  getServerLeadEmailSnapshot,
  hydrateLeadEmail,
  subscribeLeadEmail,
} from "@/lib/lead-email";
import { stripePaymentLink } from "@/lib/payments";

export function StripePayLink({
  children,
  className = "",
  variant = "gold",
  arrow = false,
}: {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "gold" | "inverse";
  arrow?: boolean;
}) {
  const email = useSyncExternalStore(
    subscribeLeadEmail,
    getLeadEmailSnapshot,
    getServerLeadEmailSnapshot,
  );

  useEffect(() => {
    hydrateLeadEmail();
  }, []);

  const href = stripePaymentLink(email || undefined);
  if (!href) return null;

  return (
    <ButtonAnchor href={href} variant={variant} className={className} rel="noreferrer" arrow={arrow}>
      {children}
    </ButtonAnchor>
  );
}
