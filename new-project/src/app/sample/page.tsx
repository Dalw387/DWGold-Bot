import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { SignalTracker } from "@/components/nano/signal-tracker";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { generateForTool } from "@/lib/copy";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { EXAMPLE_PROFILE } from "@/lib/example-profile";

export const metadata: Metadata = {
  title: "A sample of the desk",
  description:
    "Real drafts for a cafe in Falmouth, built from the same desk you get after paying £197. Not a testimonial. An example.",
};

function SampleCard({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  const clipped = text.length > 900 ? `${text.slice(0, 900).trim()}…` : text;
  return (
    <article className="border-t border-border py-8">
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
        {label}
      </h2>
      <pre className="mt-4 whitespace-pre-wrap font-sans text-base leading-7 text-foreground">
        {clipped}
      </pre>
    </article>
  );
}

export default function SamplePage() {
  const values = EXAMPLE_PROFILE;
  const homepage = generateForTool("website-blurb", values)[0];
  const facebook = generateForTool("facebook-post-generator", {
    ...values,
    facebookStyles: ["helpful"],
  })[0];
  const reply = generateForTool("enquiry-reply", values)[0];
  const referral = generateForTool("referral-ask", values)[0];
  const review = generateForTool("google-review-desk", values)[0];
  const missed = generateForTool("off-hours", values)[1];
  const plan = generateForTool("customer-plan", values)[0];

  return (
    <div className="border-b border-border">
      <SignalTracker kind="sample" />
      <Container className="max-w-3xl py-16 sm:py-24">
        <p className="kicker">Sample · not a customer story</p>
        <h1 className="font-display mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
          This is what the desk writes for a cafe in Falmouth.
        </h1>
        <p className="mt-5 text-base leading-7 text-muted">
          Harbour & Hearth is an example we built so you can read the work
          before you pay. Yours uses your name, town, and offer. Nothing here
          is a testimonial, a ranking, or a promise of bookings.
        </p>
        {homepage ? <SampleCard label="Public homepage" text={homepage.text} /> : null}
        {facebook ? <SampleCard label="Facebook draft" text={facebook.text} /> : null}
        {reply ? <SampleCard label="First reply to an enquiry" text={reply.text} /> : null}
        {referral ? <SampleCard label="Referral ask" text={referral.text} /> : null}
        {review ? <SampleCard label="Google review SMS (you send this)" text={review.text} /> : null}
        {missed ? <SampleCard label="Missed-call text (you send this)" text={missed.text} /> : null}
        {plan ? <SampleCard label="Start of the 14-day plan" text={plan.text} /> : null}
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <StripePayLink>Pay {HOUSE_PRICE_SHORT} on Stripe</StripePayLink>
          <ButtonLink href="/#what-you-get" variant="secondary">
            See everything included
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
