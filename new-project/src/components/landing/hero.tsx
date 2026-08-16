import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { HomepageBrief } from "@/components/landing/homepage-brief";

export function Hero() {
  return (
    <section className="ink-hero border-b border-[rgba(176,137,79,0.25)]">
      <Container className="grid items-start gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d7c4a1]">
            LocalLaunch AI · complimentary studio
          </p>
          <h1 className="font-display mt-6 max-w-xl text-4xl font-medium tracking-tight text-[#f6f1e8] sm:text-5xl lg:text-[3.6rem] lg:leading-[1.08]">
            Quiet, expensive-looking words for ordinary local businesses
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#e8dcc8]">
            A private studio for shops, trades, and cafes. Draft Facebook posts,
            captions, listing notes, and a week of starting points from facts you
            already know. The assistant lives in the browser. No account. No card.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/tools/facebook-post-generator" variant="gold">
              Enter the studio
            </ButtonLink>
            <ButtonLink href="/tools" variant="secondary" className="text-[#f6f1e8]">
              Browse the toolkit
            </ButtonLink>
          </div>
          <p className="mt-8 max-w-xl text-sm leading-6 text-[#b3a28c]">
            This version does not call a paid AI model. The assistant reads your
            sentence, fills the studio, and templates write the drafts. Check every
            line before you publish.
          </p>
        </div>
        <HomepageBrief />
      </Container>
    </section>
  );
}
