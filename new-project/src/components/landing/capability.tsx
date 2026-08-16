import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";

export function Capability() {
  return (
    <section id="results" aria-labelledby="capability-heading" className="border-b border-border py-20 sm:py-28">
      <Container>
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Capability, not a toy
        </p>
        <h2
          id="capability-heading"
          className="font-display mt-6 max-w-4xl text-4xl font-medium leading-[1.02] text-ice sm:text-6xl"
        >
          Don’t buy more software. Hire more capability.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate">
          This is not a claim that we replace your staff or guarantee savings.
          It is the work a junior marketing desk would be asked to write —
          always available, in one place, for {HOUSE_PRICE_SHORT} once.
        </p>
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <article className="surface rounded-2xl p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">
              Traditional team
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate">
              <li>Marketing manager</li>
              <li>PPC specialist</li>
              <li>Social manager</li>
              <li>Lead generation</li>
              <li>Appointment setter</li>
              <li>Customer support copy</li>
            </ul>
            <p className="mt-8 font-display text-3xl text-ice">££££ / month</p>
          </article>
          <article className="surface-lit rounded-2xl p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
              Your AI team
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate">
              <li>Always available to write</li>
              <li>Works from one set of facts</li>
              <li>Scales to every offer you type</li>
              <li>Reports only the enquiries you log</li>
              <li>No forgotten follow-up drafts</li>
              <li>No sick days on the desk</li>
            </ul>
            <p className="mt-8 font-display text-3xl text-ice">{HOUSE_PRICE_SHORT} once</p>
            <ButtonLink href="/pay" className="mt-8" arrow>
              Build my AI team
            </ButtonLink>
          </article>
        </div>
      </Container>
    </section>
  );
}
