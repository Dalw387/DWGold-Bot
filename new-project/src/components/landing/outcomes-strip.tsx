import { Container } from "@/components/container";
import { outcomes } from "@/lib/desk-team";

export function OutcomesStrip() {
  return (
    <section id="outcomes" aria-labelledby="outcomes-heading" className="border-b border-border py-16 sm:py-24">
      <Container>
        <p className="kicker">What you are actually buying</p>
        <h2
          id="outcomes-heading"
          className="font-display mt-4 max-w-3xl text-3xl font-medium tracking-tight sm:text-5xl"
        >
          Not “AI agents”. Jobs that make or save a business money.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
          Businesses understand more enquiries, faster replies, Google reviews,
          and ads that land on an open page. That is the offer. The desks are
          how the work gets written.
        </p>
        <ul className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((item, index) => (
            <li key={item.title} className="bg-background p-6 sm:p-8">
              <p className="font-display text-sm text-muted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-4 text-2xl text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
