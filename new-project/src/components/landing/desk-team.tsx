import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { deskTeam } from "@/lib/desk-team";

export function DeskTeam() {
  return (
    <section id="team" aria-labelledby="team-heading" className="bg-wash py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="kicker">The marketing team</p>
          <h2
            id="team-heading"
            className="font-display mt-4 text-3xl font-medium tracking-tight sm:text-5xl"
          >
            Six desks. One set of facts. The whole customer path.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted">
            You do not need to understand workflows, models, or APIs. Each desk
            has a job a business owner already has a name for. They write. You
            stay the publisher. The whole house is {HOUSE_PRICE_SHORT} once —
            not one thin generator at a time.
          </p>
        </div>
        <ul className="mt-14 grid gap-px bg-border lg:grid-cols-2">
          {deskTeam.map((desk) => (
            <li key={desk.name} className="bg-card p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center bg-ink font-display text-xl text-paper"
                  >
                    {desk.name.slice(0, 1)}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-foreground">
                      {desk.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted">{desk.role}</p>
                  </div>
                </div>
                <p className="hidden max-w-[10rem] text-right text-xs font-semibold uppercase tracking-[0.12em] text-accent sm:block">
                  {desk.outcome}
                </p>
              </div>
              <p className="mt-5 text-sm font-medium text-foreground sm:hidden">
                {desk.outcome}
              </p>
              <p className="mt-4 text-sm leading-7 text-muted">{desk.does}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{desk.doesNot}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.12em] text-muted">
                {desk.rooms}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
