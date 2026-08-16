"use client";

import { Button, ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { AdaptiveLead } from "@/components/landing/adaptive-lead";
import { TeamOrbit } from "@/components/landing/team-orbit";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { openBuildTeam } from "@/lib/sales";

export function WorkforceHero() {
  return (
    <section className="band-hero relative min-h-[90vh] overflow-hidden">
      <Container className="relative z-10 grid items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-14 lg:py-20">
        <div className="reveal">
          <p className="kicker">
            <span className="kicker-dot" aria-hidden="true" />
            Your AI marketing workforce
          </p>
          <h1 className="font-display display-1 mt-7 max-w-[12ch] text-ice">
            Meet the AI team that{" "}
            <span className="signature-text">grows</span> your business.
          </h1>
          <AdaptiveLead />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button type="button" className="btn-shine" arrow onClick={() => openBuildTeam()}>
              Build my AI team — {HOUSE_PRICE_SHORT}
            </Button>
            <ButtonLink href="#control" variant="secondary">
              Enter the Control Centre
            </ButtonLink>
          </div>
          <p className="mt-7 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-titanium">
            One payment · Six specialists · 24 work rooms
          </p>
        </div>
        <div className="reveal" style={{ animationDelay: "120ms" }}>
          <TeamOrbit />
        </div>
      </Container>
    </section>
  );
}
