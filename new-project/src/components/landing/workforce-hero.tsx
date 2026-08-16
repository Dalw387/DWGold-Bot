import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { CommandCentre } from "@/components/landing/command-centre";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";

export function WorkforceHero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <Container className="relative z-10 grid items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1.08fr)] lg:gap-10 lg:py-10">
        <div className="reveal">
          <p className="kicker">
            <span className="kicker-dot" aria-hidden="true" />
            AI workforce for modern business
          </p>
          <h1 className="font-display mt-7 max-w-[12ch] text-[2.8rem] font-semibold leading-[0.92] text-ice sm:text-6xl lg:text-[4.9rem] xl:text-[5.8rem]">
            Meet the <span className="signature-text">AI team</span> that{" "}
            <span className="font-serif font-normal tracking-tight text-ice">grows</span> your business.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate sm:text-[1.2rem]">
            Named specialists that find customers, run advertising, keep social
            alive, answer enquiries and book appointments. A marketing department
            for trades, clinics, estate agents, and professional services —
            ready whenever you are.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <StripePayLink className="btn-shine" arrow>
              Build my AI team
            </StripePayLink>
            <ButtonLink href="#how" variant="secondary">
              Watch it work
            </ButtonLink>
          </div>
          <p className="mt-6 max-w-lg text-sm leading-6 text-slate">
            {HOUSE_PRICE_SHORT} once for the full team. They write the work. You
            send it. That is the start of a workforce — not a caption toy.
          </p>
        </div>
        <div className="reveal" style={{ animationDelay: "120ms" }}>
          <CommandCentre />
        </div>
      </Container>
    </section>
  );
}
