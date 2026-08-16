import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="bg-white py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <h2
            id="pricing-heading"
            className="text-3xl font-semibold tracking-tight text-slate-900"
          >
            Pricing
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            This demo is free. Paid plans are not for sale yet, so there are no
            prices, trial lengths, or feature grids to compare.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border-2 border-indigo-600 bg-indigo-50/60 p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-700">
              Available now
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">Free demo</h3>
            <p className="mt-2 text-3xl font-semibold text-slate-900">£0</p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
              <li>Facebook Post Generator</li>
              <li>Three template-based drafts per submission</li>
              <li>Copy and edit in the browser</li>
              <li>No account and no payment details</li>
            </ul>
            <ButtonLink href="/tools/facebook-post-generator" className="mt-8">
              Use the free generator
            </ButtonLink>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Later
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">Paid plans</h3>
            <p className="mt-2 text-lg font-medium text-slate-700">To be announced</p>
            <p className="mt-6 text-sm leading-6 text-slate-600">
              Future versions may add more networks, saved drafts, and extra
              tools. Prices, limits, and launch dates will be published when they
              exist. This page will not invent them in advance.
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
}
