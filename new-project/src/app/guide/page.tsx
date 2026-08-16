import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";

export const metadata: Metadata = {
  title: "How to use LocalLaunch",
  description:
    "Plain steps: try the free studio, run House Operations, pay £197 in Stripe if you want the paid desk, and log real enquiries.",
};

const steps = [
  {
    n: "1",
    title: "Try it free",
    body: "Open the studio. Press Fill example, then generate. You get Facebook drafts, captions, emails, and more. Nothing is sent to a paid AI company. Check every line before you post.",
    href: "/tools/facebook-post-generator",
    label: "Open Facebook Post Studio",
  },
  {
    n: "2",
    title: "Run the house agents",
    body: "House Operations writes SEO, ads drafts, a public homepage, and a week of social starting points. Press “Run DW Gold Trading trial” to see it on a real business, or fill your own details first.",
    href: "/operations?trial=gold&run=1",
    label: "Run the DW Gold trial",
  },
  {
    n: "3",
    title: "Pay only if you want the paid desk",
    body: `The studio stays £0. House Operations is ${HOUSE_PRICE_SHORT} one-off, paid on Stripe with Apple Pay or card. That is for the desk and the ledger, not for Facebook or Google ad spend.`,
    href: "/pay",
    label: `Pay ${HOUSE_PRICE_SHORT}`,
  },
  {
    n: "4",
    title: "Prove it with real people",
    body: "When someone actually enquires, log it on the proof page. Likes do not count. A quiet week with zero rows is still an honest week.",
    href: "/proof",
    label: "Open the proof ledger",
  },
];

export default function GuidePage() {
  return (
    <div className="mesh border-b border-stone-200">
      <Container className="max-w-3xl py-14 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6a38]">
          Simple guide
        </p>
        <h1 className="font-display mt-3 text-4xl font-medium tracking-tight text-stone-900 sm:text-5xl">
          Four steps. No jargon.
        </h1>
        <p className="mt-4 text-base leading-7 text-stone-600">
          LocalLaunch writes marketing words from the facts you type. You stay
          the person who posts. We do not invent customers.
        </p>
        <ol className="mt-12 space-y-8">
          {steps.map((step) => (
            <li key={step.n} className="paper-card rounded-3xl border border-stone-200 p-6 sm:p-8">
              <p className="font-display text-sm tracking-[0.2em] text-[#8c6a38]">
                {step.n}
              </p>
              <h2 className="font-display mt-3 text-2xl text-stone-900">{step.title}</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">{step.body}</p>
              <ButtonLink href={step.href} className="mt-6">
                {step.label}
              </ButtonLink>
            </li>
          ))}
        </ol>
      </Container>
    </div>
  );
}
