import { Container } from "@/components/container";
import { week } from "@/lib/offer";

export function WeekWithUs() {
  return (
    <section id="week" aria-labelledby="week-heading" className="bg-background py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="kicker">How you use it</p>
          <h2
            id="week-heading"
            className="font-display mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-5xl"
          >
            Pay once. Use the desk. Publish what is true.
          </h2>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-2">
          {week.map((item, index) => (
            <li key={item.day} className="paper-card rounded-sm border border-border p-6 sm:p-8">
              <p className="font-display text-sm tracking-[0.2em] text-muted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-2xl text-foreground">{item.day}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
