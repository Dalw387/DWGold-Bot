import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { BrandMark } from "@/components/logo";
import { colourForAgent, WORKFORCE_CORE } from "@/lib/agent-identity";

export function ClosePay() {
  return (
    <section id="pay" aria-labelledby="pay-heading" className="band-close relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="core-pulse" />
        <div className="core-pulse core-pulse-delay" />
        <BrandMark className="h-[32rem] w-[32rem] opacity-[0.14]" />
      </div>
      <ul className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        {WORKFORCE_CORE.map((agent, index) => (
          <li
            key={agent.id}
            className={`absolute rounded-full border px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${index % 2 === 0 ? "float-a" : "float-b"}`}
            style={{
              color: colourForAgent(agent.id),
              borderColor: `${colourForAgent(agent.id)}55`,
              left: `${8 + (index % 3) * 28}%`,
              top: `${18 + (index % 2) * 52}%`,
              opacity: 0.55,
            }}
          >
            {agent.name} · {agent.desk}
          </li>
        ))}
      </ul>
      <Container className="relative max-w-3xl">
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Your team is ready
        </p>
        <h2 id="pay-heading" className="font-display display-1 mt-6 text-ice">
          Give them something worth working on.
        </h2>
        <p className="mt-5 max-w-lg text-lg text-silver">
          Six specialists. One payment. The work starts when you do.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <StripePayLink arrow>Build my AI team — {HOUSE_PRICE_SHORT}</StripePayLink>
          <ButtonLink href="/#control" variant="secondary">
            Explore the Control Centre
          </ButtonLink>
        </div>
        <p className="mt-6 text-xs text-silver">
          Secure checkout · Card · Apple Pay · Google Pay where available · {HOUSE_PRICE_SHORT} once
        </p>
      </Container>
    </section>
  );
}
