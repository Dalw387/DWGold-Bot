"use client";

import { Button, ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { WorkforceCore } from "@/components/landing/workforce-core";
import { openBuildTeam } from "@/lib/sales";

export function WorkforceHero() {
  return (
    <section className="band-hero relative min-h-[100svh] overflow-x-hidden">
      <Container className="relative z-10 grid items-center gap-10 py-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8 lg:py-16">
        <div className="reveal">
          <p className="kicker">
            <span className="kicker-dot" aria-hidden="true" />
            AI workforce for local business
          </p>
          <h1 className="font-display display-1 mt-7 max-w-[11ch] text-ice">
            Meet the AI team that{" "}
            <span className="signature-text">grows</span> your business.
          </h1>
          <p className="prose-narrow mt-6 text-lg leading-8 text-silver">
            Six specialist AI agents working together to find opportunities, respond
            to leads, book appointments, create advertising, build your reputation
            and keep your business visible.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button type="button" className="btn-shine" arrow onClick={() => openBuildTeam()}>
              Build my AI team
            </Button>
            <ButtonLink href="#control" variant="secondary">
              Watch the team work
            </ButtonLink>
          </div>
        </div>
        <div className="reveal min-h-[28rem] sm:min-h-[34rem]" style={{ animationDelay: "140ms" }}>
          <WorkforceCore />
        </div>
      </Container>
    </section>
  );
}
