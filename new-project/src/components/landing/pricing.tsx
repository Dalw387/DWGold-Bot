import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="bg-[#fffcf7] py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <h2
            id="pricing-heading"
            className="font-display text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl"
          >
            Pricing
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            This demo is free. Paid plans are not for sale yet, so there are no
            invented prices or trial lengths.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border-2 border-indigo-700 bg-indigo-50/70 p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-800">
              Available now
            </p>
            <h3 className="mt-3 font-display text-3xl text-stone-900">Free demo</h3>
            <p className="mt-2 text-3xl font-semibold text-stone-900">£0</p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-stone-700">
              <li>Eight template tools, including Facebook Post Studio</li>
              <li>Extra Facebook styles, lengths, and optional hashtags</li>
              <li>Copy, edit, and download in the browser</li>
              <li>No account and no payment details</li>
            </ul>
            <ButtonLink href="/tools" className="mt-8">
              Open the toolkit
            </ButtonLink>
          </article>
          <article className="paper-card rounded-3xl border border-stone-200 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-stone-500">
              Later
            </p>
            <h3 className="mt-3 font-display text-3xl text-stone-900">Paid plans</h3>
            <p className="mt-2 text-lg font-medium text-stone-700">To be announced</p>
            <p className="mt-6 text-sm leading-6 text-stone-600">
              Future versions may add saved libraries, more channels, and team
              features. Prices and dates will be published when they exist.
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
}
