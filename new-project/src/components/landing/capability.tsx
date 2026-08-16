import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";

export function Capability() {
  return (
    <section id="results" aria-labelledby="capability-heading" className="py-24 sm:py-32">
      <Container>
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Capability
        </p>
        <h2 id="capability-heading" className="font-display display-2 mt-6 max-w-3xl text-ice">
          Add capability without adding complexity.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate">
          Not a claim that we replace your staff. The work a marketing desk would
          be asked to write — in one place, for {HOUSE_PRICE_SHORT} once.
        </p>
        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="label">The work businesses need</p>
            <ul className="mt-6 space-y-3 text-base leading-7 text-slate">
              <li>Lead generation</li>
              <li>Advertising</li>
              <li>Content</li>
              <li>Follow-up</li>
              <li>Reviews</li>
              <li>Customer communication</li>
            </ul>
          </div>
          <div>
            <p className="label">One connected AI team</p>
            <ul className="mt-6 space-y-3 text-base leading-7 text-ice">
              <li>Shared business knowledge</li>
              <li>One interface</li>
              <li>Coordinated specialists</li>
              <li>Reusable intelligence</li>
              <li>Transparent drafts</li>
              <li>You approve what goes out</li>
            </ul>
            <p className="mt-8 font-display text-3xl text-ice">{HOUSE_PRICE_SHORT} once</p>
            <ButtonLink href="/#pricing" className="mt-6" arrow>
              Build My AI Team
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
