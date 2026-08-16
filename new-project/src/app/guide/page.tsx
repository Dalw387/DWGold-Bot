import type { Metadata } from "next";
import { ButtonAnchor, ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { stripePaymentLink } from "@/lib/payments";

export const metadata: Metadata = {
  title: "How LocalLaunch works",
  description:
    "Read the offer, pay £197 on Stripe, then use the studio, house agents, and proof ledger in this browser.",
};

const steps = [
  {
    n: "1",
    title: "Read what we actually do",
    body: "The homepage is the offer. How we help your business, every room, every agent, who does what, and what we never do. Take your time. If it is not a fit, do not pay.",
    href: "/#help",
    label: "Read how we help",
    pay: false,
  },
  {
    n: "2",
    title: "Pay £197 on Stripe if you are happy",
    body: `One-off, Apple Pay or card. That is how you get inside. It is not Facebook or Google ad spend. The money goes to the LocalLaunch Stripe account.`,
    href: "/pay",
    label: `Pay ${HOUSE_PRICE_SHORT}`,
    pay: true,
  },
  {
    n: "3",
    title: "Use the platform in this browser",
    body: "Stripe should send you back. Then open House Operations, type the business, and start with Grace: Google review ask and missed-call texts. Then run the rest of the eight desks and use any of the twenty-four rooms. The concierge can fill the form from a sentence.",
    href: "/pay",
    label: "Go to checkout",
    pay: false,
  },
  {
    n: "4",
    title: "Publish, then log real people",
    body: "You post the words. When someone actually enquires, log it on the proof page. Likes do not count. A quiet week with zero rows is still an honest week.",
    href: "/#split",
    label: "See who does what",
    pay: false,
  },
];

export default function GuidePage() {
  const link = stripePaymentLink();

  return (
    <div className="mesh border-b border-border">
      <Container className="max-w-3xl py-14 sm:py-20">
        <p className="kicker">Simple guide</p>
        <h1 className="font-display mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          Read it. Pay if you are happy. Then use the desk.
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          There is nothing for us to set up for each customer. You use the
          website. We do not log into your ads accounts.
        </p>
        <ol className="mt-12 space-y-8">
          {steps.map((step) => (
            <li key={step.n} className="paper-card rounded-sm border border-border p-6 sm:p-8">
              <p className="font-display text-sm tracking-[0.2em] text-muted">
                {step.n}
              </p>
              <h2 className="font-display mt-3 text-2xl text-foreground">{step.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{step.body}</p>
              {step.pay && link ? (
                <ButtonAnchor href={link} className="mt-6" variant="gold" rel="noreferrer">
                  {step.label}
                </ButtonAnchor>
              ) : (
                <ButtonLink href={step.href} className="mt-6">
                  {step.label}
                </ButtonLink>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </div>
  );
}
