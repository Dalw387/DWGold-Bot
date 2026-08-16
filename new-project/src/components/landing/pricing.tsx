import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";

const included = [
  "Studio assistant in the browser",
  "Live sketch as you type a sentence",
  "Eight tools, including Facebook Post Studio",
  "Eight Facebook styles, three lengths, optional hashtags",
  "Instagram, Google, WhatsApp, notices, website copy, review requests",
  "Seven-day content plan",
  "Copy, edit, preview, and download",
  "No account and no payment details",
];

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="bg-[#fffaf3] py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6a38]">
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="font-display mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl"
          >
            Agency polish. High-street price.
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            The whole studio is free in this demo. That is the point: more value
            than a business should reasonably get for £0, while paid plans wait
            until they are real.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[2rem] border border-[rgba(176,137,79,0.45)] bg-[#12100e] p-8 text-[#f6f1e8] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d7c4a1]">
              Available now
            </p>
            <h3 className="font-display mt-3 text-4xl">Complimentary studio</h3>
            <p className="mt-2 text-4xl font-medium">£0</p>
            <p className="mt-3 text-sm text-[#e8dcc8]">
              Everything below is included today. Use it for one shop or twenty
              drafts. We are not metering you in this version.
            </p>
            <ul className="mt-8 grid gap-3 text-sm leading-6 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="border-t border-[rgba(176,137,79,0.2)] pt-3">
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/tools" variant="gold" className="mt-10">
              Start without paying
            </ButtonLink>
          </article>
          <article className="paper-card rounded-[2rem] border border-stone-200 p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c6a38]">
              Later
            </p>
            <h3 className="font-display mt-3 text-3xl text-stone-900">House account</h3>
            <p className="mt-2 text-lg text-stone-700">Price to be announced</p>
            <p className="mt-6 text-sm leading-6 text-stone-600">
              A later paid plan may add saved libraries, a connected language
              model, and team seats. Those prices will be published when the
              product exists. This page will not invent them.
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
}
