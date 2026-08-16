import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";

const starters = [
  {
    n: "01",
    who: "Grace",
    title: "Ask for the Google review after the job",
    body: "Happy customers forget. Unhappy ones do not. Grace writes the SMS and email, shows you how to copy your Google review link, and keeps Google’s rules: no paying for stars, no only-asking-the-happy-ones. You send it from your phone the same day you finish the work.",
  },
  {
    n: "02",
    who: "Charlie",
    title: "Answer the missed call with a text",
    body: "You cannot always pick up. The off-hours desk writes the closed voicemail, the same-day missed-call text, and the morning callback. Save them in your notes. Send them yourself. This is not a live voice bot, and we will not pretend it is.",
  },
];

export function StarterPath() {
  return (
    <section id="start" aria-labelledby="start-heading" className="border-b border-border py-16 sm:py-24">
      <Container className="max-w-3xl">
        <p className="kicker">Where the money actually is</p>
        <h2
          id="start-heading"
          className="font-display mt-4 text-3xl font-medium tracking-tight sm:text-5xl"
        >
          Two jobs that pay before you post another Facebook update.
        </h2>
        <p className="mt-4 text-base leading-7 text-muted">
          The market for “AI agents” starts here for a reason: reviews and
          missed calls are the leaks every local owner already understands.
          Firms that connect your phone and Google often charge a setup fee
          and a monthly retainer. LocalLaunch writes the same words for{" "}
          {HOUSE_PRICE_SHORT} once. You stay the person who sends them. One
          extra job still covers the desk.
        </p>
        <ol className="mt-12 space-y-10">
          {starters.map((item) => (
            <li key={item.n} className="grid gap-2 border-t border-border pt-8 md:grid-cols-[4rem_minmax(0,1fr)]">
              <p className="font-display text-sm text-muted">{item.n}</p>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  {item.who}
                </p>
                <h3 className="font-display mt-2 text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
