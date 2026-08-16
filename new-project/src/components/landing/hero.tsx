import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { HomepageBrief } from "@/components/landing/homepage-brief";

export function Hero() {
  return (
    <section className="ink-hero border-b border-[rgba(176,137,79,0.25)]">
      <Container className="grid items-start gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d7c4a1]">
            LocalLaunch AI · studio and House Operations
          </p>
          <h1 className="font-display mt-6 max-w-xl text-4xl font-medium tracking-tight text-[#f6f1e8] sm:text-5xl lg:text-[3.6rem] lg:leading-[1.08]">
            Get the business noticed. Then write down the customers who actually came.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#e8dcc8]">
            A private studio for shops, trades, and serious local firms. Draft
            the words for free. Pay in Stripe — Apple Pay, Google Pay, Link, or
            card — when you want house agents on SEO, ads, and a proof ledger.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/operations" variant="gold">
              Open House Operations
            </ButtonLink>
            <ButtonLink href="/tools" variant="secondary" className="text-[#f6f1e8]">
              Use the free studio
            </ButtonLink>
          </div>
          <p className="mt-8 max-w-xl text-sm leading-6 text-[#b3a28c]">
            Agents in this version draft in the browser. They do not spend ad
            budget or invent leads. Check every line before you publish.
          </p>
        </div>
        <HomepageBrief />
      </Container>
    </section>
  );
}
