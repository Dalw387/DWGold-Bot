import {
  HOUSE_PRICE_LABEL,
  STRIPE_PAYMENT_LINK,
} from "@/lib/commerce";

function sanitiseStripeUrl(raw: string): string | null {
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase();
    const allowed =
      host === "buy.stripe.com" ||
      host.endsWith(".stripe.com") ||
      host === "stripe.com";
    if (!allowed) return null;
    if (!url.searchParams.has("client_reference_id")) {
      url.searchParams.set("client_reference_id", "locallaunch-house");
    }
    return url.toString();
  } catch {
    return null;
  }
}

export function stripePaymentLink(email?: string): string | null {
  const raw =
    process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK?.trim() || STRIPE_PAYMENT_LINK;
  const sanitised = sanitiseStripeUrl(raw);
  if (!sanitised) return null;
  if (!email?.trim()) return sanitised;
  try {
    const url = new URL(sanitised);
    url.searchParams.set("prefilled_email", email.trim());
    return url.toString();
  } catch {
    return sanitised;
  }
}

export function housePriceLabel(): string {
  return process.env.NEXT_PUBLIC_HOUSE_PRICE_LABEL?.trim() || HOUSE_PRICE_LABEL;
}

export function stripeCheckoutConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY?.trim() &&
      process.env.STRIPE_PRICE_ID_HOUSE?.trim(),
  );
}
