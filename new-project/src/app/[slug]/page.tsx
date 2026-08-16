import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { SignalTracker } from "@/components/nano/signal-tracker";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { commercialBySlug, commercialSlugs } from "@/lib/commercial-pages";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { generateForTool } from "@/lib/copy";
import { deskPreviewForSlug } from "@/lib/desk-previews";

export function generateStaticParams() {
  return commercialSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = commercialBySlug(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.lead,
  };
}

export default async function CommercialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = commercialBySlug(slug);
  if (!page) notFound();
  const desk = deskPreviewForSlug(slug);
  const drafts =
    desk?.tools
      .map((tool) => generateForTool(tool, desk.sample)[0])
      .filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? [];

  return (
    <div className="border-b border-border">
      <SignalTracker kind="agent" detail={slug} />
      <Container className="max-w-3xl py-16 sm:py-24">
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          {page.eyebrow}
        </p>
        <h1 className="font-display mt-6 text-4xl font-medium leading-[1.05] text-ice sm:text-6xl">
          {page.heading}
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate">{page.lead}</p>
        {page.body.map((paragraph) => (
          <p key={paragraph} className="mt-5 text-base leading-7 text-slate">
            {paragraph}
          </p>
        ))}
        <p className="mt-8 text-sm font-medium text-ice">{page.fit}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <StripePayLink arrow>Build my AI team · {HOUSE_PRICE_SHORT}</StripePayLink>
          {desk ? (
            <ButtonLink href={desk.deskHref} variant="secondary">
              Open {desk.name}’s desk
            </ButtonLink>
          ) : (
            <ButtonLink href="/#agents" variant="secondary">
              Meet the team
            </ButtonLink>
          )}
        </div>
      </Container>

      {desk && drafts.length > 0 ? (
        <Container className="max-w-3xl pb-20">
          <div className="titanium rounded-[1.5rem] p-6 sm:p-8">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan/80">
              {desk.name} · {desk.title} · real draft
            </p>
            <h2 className="font-display mt-3 text-2xl text-ice sm:text-3xl">
              This is the work this desk actually writes.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate">{desk.sampleNote}</p>
            <div className="mt-8 space-y-8">
              {drafts.map((draft) => (
                <article key={draft.id}>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
                    {draft.label}
                  </h3>
                  <p className="mt-1 text-xs text-slate">{draft.summary}</p>
                  <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap font-sans text-sm leading-7 text-ice">
                    {draft.text.length > 900 ? `${draft.text.slice(0, 900).trim()}…` : draft.text}
                  </pre>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={desk.deskHref} arrow>
                Run this desk with my facts
              </ButtonLink>
              <ButtonLink href="/audit" variant="secondary">
                Get my marketing score
              </ButtonLink>
            </div>
          </div>
        </Container>
      ) : null}
    </div>
  );
}
