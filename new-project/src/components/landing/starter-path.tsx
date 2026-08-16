import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";

const starters = [
  {
    n: "01",
    who: "Grace",
    title: "Ask for the Google review after the job",
    body: "Happy customers forget. Unhappy ones do not. Grace writes the SMS and email, shows you how to copy your Google review link, and keeps Google’s rules. You send it from your phone the same day you finish the work.",
  },
  {
    n: "02",
    who: "Charlie",
    title: "Answer the missed call with a text",
    body: "You cannot always pick up. The off-hours desk writes the closed voicemail, the same-day missed-call text, and the morning callback. Save them in your notes. This is not a live voice bot, and we will not pretend it is.",
  },
];

export function StarterPath() {
  return (
    <section id="start" aria-labelledby="start-heading" className="border-b border-border py-20 sm:py-28">
      <Container className="max-w-3xl">
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Where the money actually is
        </p>
        <h2
          id="start-heading"
          className="font-display mt-6 text-4xl font-medium leading-[1.02] text-ice sm:text-5xl"
        >
          Two jobs that pay before you post another Facebook update.
        </h2>
        <p className="mt-5 text-base leading-7 text-slate">
          Reviews and missed calls are the leaks every local owner already
          understands. LocalLaunch writes the same words for {HOUSE_PRICE_SHORT}{" "}
          once. You stay the person who sends them.
        </p>
        <ol className="mt-12 space-y-8">
          {starters.map((item) => (
            <li key={item.n} className="surface rounded-2xl p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
                {item.n} · {item.who}
              </p>
              <h3 className="font-display mt-3 text-2xl text-ice">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate">{item.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
