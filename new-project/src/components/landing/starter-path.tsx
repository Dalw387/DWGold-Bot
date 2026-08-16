import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";

const starters = [
  {
    who: "Charlie",
    title: "Recover missed enquiries",
    body: "Charlie helps prepare immediate missed-call follow-up. You still send the text. The enquiry that waits until morning is often already gone.",
  },
  {
    who: "Grace",
    title: "Turn completed jobs into reputation",
    body: "Grace helps turn happy customers into review requests. You paste your real Google link. You send it the same day you finish the work.",
  },
];

export function StarterPath() {
  return (
    <section id="start" aria-labelledby="start-heading" className="py-24 sm:py-32">
      <Container className="max-w-3xl">
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Start where the money leaks first
        </p>
        <h2 id="start-heading" className="font-display display-2 mt-6 text-ice">
          Before creating another piece of content, recover the opportunities already reaching your business.
        </h2>
        <p className="mt-5 text-base leading-7 text-slate">
          Reviews and missed calls are the leaks every local owner already
          understands. {HOUSE_PRICE_SHORT} once. You stay the person who sends them.
        </p>
        <ol className="mt-12 space-y-10">
          {starters.map((item) => (
            <li key={item.who}>
              <p className="label">{item.who}</p>
              <h3 className="font-display display-3 mt-3 text-ice">{item.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate">{item.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
