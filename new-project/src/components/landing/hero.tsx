import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { HomepageBrief } from "@/components/landing/homepage-brief";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";

export function Hero() {
  return (
    <section className="ink-hero border-b border-[rgba(176,137,79,0.25)]">
      <Container className="grid items-start gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d7c4a1]">
            LocalLaunch AI · free studio · House Operations {HOUSE_PRICE_SHORT}
          </p>
          <h1 className="font-display mt-6 max-w-xl text-4xl font-medium tracking-tight text-[#f6f1e8] sm:text-5xl lg:text-[3.55rem] lg:leading-[1.08]">
            Write the posts. Ask for the work. Count only real enquiries.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#e8dcc8]">
            Type the business in one sentence. Get Facebook, ads, SEO, and a
            public homepage draft you can paste today. Try it free. Pay{" "}
            {HOUSE_PRICE_SHORT} once if you want the full house desk.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/guide" variant="gold">
              Start in four steps
            </ButtonLink>
            <ButtonLink href="/pay" variant="secondary" className="text-[#f6f1e8]">
              Pay {HOUSE_PRICE_SHORT}
            </ButtonLink>
          </div>
          <p className="mt-8 max-w-xl text-sm leading-6 text-[#b3a28c]">
            Drafts stay in this browser. We do not spend your ad budget or invent
            leads. Check every line before you publish.
          </p>
        </div>
        <HomepageBrief />
      </Container>
    </section>
  );
}
