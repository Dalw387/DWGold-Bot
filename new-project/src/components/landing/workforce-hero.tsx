"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { WorkforceCore } from "@/components/landing/workforce-core";
import { colourForAgent, WORKFORCE_CORE } from "@/lib/agent-identity";
import { openBuildTeam } from "@/lib/sales";

const bootLines = [
  { text: "Igniting LocalLaunch core", colour: "#49E6FF" },
  { text: "Alex · leads desk online", colour: "#49E6FF" },
  { text: "Charlie · appointments online", colour: "#956BFF" },
  { text: "Grace · customers online", colour: "#FF6BA8" },
  { text: "Max · advertising online", colour: "#5685FF" },
  { text: "Sophie · social online", colour: "#E54FD1" },
  { text: "Scout · search online", colour: "#55E6C1" },
  { text: "Workforce live · demo workspace", colour: "#55E6C1" },
];

export function WorkforceHero() {
  const [boot, setBoot] = useState(0);
  const [shift, setShift] = useState({ x: 0, y: 0 });
  const line = bootLines[Math.min(boot, bootLines.length - 1)] ?? bootLines[0];

  useEffect(() => {
    if (boot >= bootLines.length - 1) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => {
      setBoot(reduced ? bootLines.length - 1 : boot + 1);
    }, reduced ? 0 : 380);
    return () => window.clearTimeout(id);
  }, [boot]);

  return (
    <section
      className="band-hero relative min-h-[100svh] overflow-x-hidden"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setShift({
          x: ((event.clientX - rect.left) / rect.width - 0.5) * 18,
          y: ((event.clientY - rect.top) / rect.height - 0.5) * 12,
        });
      }}
      onPointerLeave={() => setShift({ x: 0, y: 0 })}
    >
      <Container className="relative z-10 grid items-center gap-8 py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6 lg:py-16">
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
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em]" style={{ color: line?.colour }}>
            <span className="status-dot" style={{ background: line?.colour, boxShadow: `0 0 10px ${line?.colour}` }} />
            {line?.text}
            {boot < bootLines.length - 1 ? <span className="caret" aria-hidden="true" /> : null}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {WORKFORCE_CORE.map((agent, index) => (
              <li key={agent.id} className="boot-in" style={{ animationDelay: `${index * 90}ms` }}>
                <Link
                  href={`/${agent.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-void/50 px-3 py-1.5 text-[0.68rem] font-semibold text-ice hover:border-white/25"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: colourForAgent(agent.id), boxShadow: `0 0 8px ${colourForAgent(agent.id)}` }}
                  />
                  {agent.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="reveal hud-frame hud-frame-br min-h-[26rem] rounded-[2rem] sm:min-h-[34rem]"
          style={{
            animationDelay: "140ms",
            transform: `translate3d(${shift.x}px, ${shift.y}px, 0)`,
            transition: "transform 180ms ease-out",
          }}
        >
          <WorkforceCore />
        </div>
      </Container>
    </section>
  );
}
