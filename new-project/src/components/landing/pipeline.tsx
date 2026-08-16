import { Container } from "@/components/container";
import { pipeline } from "@/lib/desk-team";

export function Pipeline() {
  return (
    <section id="path" aria-labelledby="path-heading" className="border-b border-border py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="kicker">How the house connects</p>
          <h2
            id="path-heading"
            className="font-display mt-4 text-3xl font-medium tracking-tight sm:text-5xl"
          >
            Find. Advertise. Engage. Qualify. Follow. Count.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted">
            A caption generator is easy to cancel. A desk that writes the whole
            path from stranger to booked job is harder to walk away from —
            because it becomes how you get customers. You still send every
            message. The system is the pack, not a robot in your accounts.
          </p>
        </div>
        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pipeline.map((item, index) => (
            <li key={item.step}>
              <p className="font-display text-sm text-muted">
                {String(index + 1).padStart(2, "0")} · {item.step}
              </p>
              <h3 className="font-display mt-3 text-2xl text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
