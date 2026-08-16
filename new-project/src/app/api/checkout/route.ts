import Stripe from "stripe";
import { stripePaymentLink } from "@/lib/payments";

export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  const priceId = process.env.STRIPE_PRICE_ID_HOUSE?.trim();
  const mode =
    process.env.STRIPE_CHECKOUT_MODE === "subscription"
      ? "subscription"
      : "payment";

  if (key && priceId) {
    try {
      const stripe = new Stripe(key);
      const session = await stripe.checkout.sessions.create({
        mode,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${origin}/pay/thanks?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pay/cancelled`,
      });
      if (!session.url) {
        return Response.json(
          { error: "Stripe did not return a checkout URL." },
          { status: 502 },
        );
      }
      return Response.json({ url: session.url });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Stripe checkout failed.";
      return Response.json({ error: message }, { status: 502 });
    }
  }

  const link = stripePaymentLink();
  if (link) {
    return Response.json({ url: link });
  }

  return Response.json(
    {
      error:
        "Checkout is not connected yet. Add NEXT_PUBLIC_STRIPE_PAYMENT_LINK, or a Stripe secret key plus STRIPE_PRICE_ID_HOUSE.",
    },
    { status: 503 },
  );
}
