import { Button, ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { AdaptiveLead } from "@/components/landing/adaptive-lead";
import { AiCore } from "@/components/landing/ai-core";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { openBuildTeam } from "@/lib/sales";

export function WorkforceHero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <Container className="relative z-10 grid items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-20">
        <div className="reveal">
          <p className="kicker">
            <span className="kicker-dot" aria-hidden="true" />
            AI marketing workforce
          </p>
          <h1 className="font-display display-1 mt-7 max-w-[13ch] text-ice">
            Meet the AI team that{" "}
            <span className="signature-text">grows</span> your business.
          </h1>
          <AdaptiveLead />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button type="button" className="btn-shine" arrow onClick={() => openBuildTeam()}>
              Build My AI Team
            </Button>
            <ButtonLink href="#agents" variant="secondary">
              See it work
            </ButtonLink>
          </div>
          <p className="mt-6 max-w-md text-sm leading-6 text-slate">
            {HOUSE_PRICE_SHORT} once for the full team. They write the work. You
            send it.
          </p>
        </div>
        <div className="reveal" style={{ animationDelay: "120ms" }}>
          <AiCore />
        </div>
      </Container>
    </section>
  );
}
