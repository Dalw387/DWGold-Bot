"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { housePriceLabel, stripePaymentLink } from "@/lib/payments";

export function PayButton({
  className = "",
  children = "Pay with Apple Pay or card",
  tone = "light",
}: {
  className?: string;
  children?: string;
  tone?: "light" | "ink";
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const link = stripePaymentLink();
  const label = housePriceLabel();
  const muted = tone === "ink" ? "text-[#e8dcc8]" : "text-stone-600";
  const alert = tone === "ink" ? "text-[#f3c1c1]" : "text-red-800";

  async function startCheckout() {
    if (busy) return;
    setError("");
    if (link) {
      window.location.href = link;
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/checkout", { method: "POST" });
      const data = (await response.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError(
        data.error ||
          "Checkout is not connected yet. Add your Stripe Payment Link in the site environment.",
      );
    } catch {
      setError("Checkout could not start. Try again, or use the Payment Link once it is set.");
    } finally {
      setBusy(false);
    }
  }

  if (!link) {
    return (
      <div className={className}>
        <Button type="button" variant="gold" onClick={() => void startCheckout()} disabled={busy}>
          {busy ? "Opening Stripe" : children}
        </Button>
        {label ? <p className={`mt-3 text-sm ${muted}`}>{label}</p> : null}
        <p className={`mt-3 text-sm leading-6 ${muted}`}>
          If Stripe is not connected yet, create a Payment Link with Apple Pay,
          Google Pay, Link, and cards, then set NEXT_PUBLIC_STRIPE_PAYMENT_LINK
          on Vercel. The button will also try a Checkout Session if a Price ID
          is set on the server.
        </p>
        {error ? (
          <p className={`mt-3 text-sm leading-6 ${alert}`} role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className={className}>
      <Button type="button" variant="gold" onClick={() => void startCheckout()} disabled={busy}>
        {busy ? "Opening Stripe" : children}
      </Button>
      {label ? <p className={`mt-3 text-sm ${muted}`}>{label}</p> : null}
      {error ? (
        <p className={`mt-3 text-sm leading-6 ${alert}`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
