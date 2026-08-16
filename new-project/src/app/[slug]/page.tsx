import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { commercialBySlug, commercialSlugs } from "@/lib/commercial-pages";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";

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

  return (
    <div className="hero-light border-b border-border">
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
          <ButtonLink href="/#agents" variant="secondary">
            Meet the team
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
