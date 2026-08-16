import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { AGENT_COLOURS } from "@/lib/agent-identity";

const starters = [
  {
    who: "Charlie",
    colour: AGENT_COLOURS.charlie,
    title: "Recover missed enquiries",
    body: "Charlie helps prepare immediate missed-call follow-up. You still send the text. The enquiry that waits until morning is often already gone.",
  },
  {
    who: "Grace",
    colour: AGENT_COLOURS.grace,
    title: "Turn completed jobs into reputation",
    body: "Grace helps turn happy customers into review requests. You paste your real Google link. You send it the same day you finish the work.",
  },
];

export function StarterPath() {
  return (
    <section id="start" aria-labelledby="start-heading" className="py-20 sm:py-24">
      <Container>
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Start where the money leaks first
        </p>
        <h2 id="start-heading" className="font-display display-2 mt-6 max-w-3xl text-ice">
          Recover the opportunities already reaching your business.
        </h2>
        <p className="prose-narrow mt-5 text-base leading-7 text-slate">
          Reviews and missed calls are the leaks every local owner already
          understands. {HOUSE_PRICE_SHORT} once. You stay the person who sends them.
        </p>
        <ol className="mt-10 grid gap-4 lg:grid-cols-2">
          {starters.map((item) => (
            <li
              key={item.who}
              className="glass rounded-[1.4rem] p-6 sm:p-8"
              style={{ boxShadow: `inset 3px 0 0 ${item.colour}` }}
            >
              <p className="label" style={{ color: item.colour }}>
                {item.who}
              </p>
              <h3 className="font-display display-3 mt-3 text-ice">{item.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate">{item.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
