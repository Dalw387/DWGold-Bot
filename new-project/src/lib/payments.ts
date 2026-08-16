export function stripePaymentLink(): string | null {
  const raw = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase();
    const allowed =
      host === "buy.stripe.com" ||
      host.endsWith(".stripe.com") ||
      host === "stripe.com";
    return allowed ? raw : null;
  } catch {
    return null;
  }
}

export function housePriceLabel(): string {
  return process.env.NEXT_PUBLIC_HOUSE_PRICE_LABEL?.trim() ?? "";
}

export function stripeCheckoutConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY?.trim() &&
      process.env.STRIPE_PRICE_ID_HOUSE?.trim(),
  );
}
