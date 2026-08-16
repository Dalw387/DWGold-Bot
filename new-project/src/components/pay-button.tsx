"use client";

import { useState } from "react";
import { Button, ButtonAnchor } from "@/components/button";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { housePriceLabel, stripePaymentLink } from "@/lib/payments";

export function PayButton({
  className = "",
  children,
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
  const text = children ?? `Pay ${HOUSE_PRICE_SHORT} with Apple Pay or card`;

  async function startCheckout() {
    if (busy) return;
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/checkout", { method: "POST" });
      const data = (await response.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error || "Checkout could not start. Try the Stripe button again.");
    } catch {
      setError("Checkout could not start. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={className}>
      {link ? (
        <ButtonAnchor href={link} variant="gold" rel="noreferrer">
          {text}
        </ButtonAnchor>
      ) : (
        <Button type="button" variant="gold" onClick={() => void startCheckout()} disabled={busy}>
          {busy ? "Opening Stripe" : text}
        </Button>
      )}
      <p className={`mt-3 text-sm ${muted}`}>{label} · paid in Stripe, not on this page</p>
      {error ? (
        <p className={`mt-3 text-sm leading-6 ${alert}`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
