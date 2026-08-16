import Link from "next/link";
import { Container } from "@/components/container";
import { workforceAgents } from "@/lib/workforce";

export function AgentBento() {
  const lead = workforceAgents[0];
  const rest = workforceAgents.slice(1);

  return (
    <section id="agents" aria-labelledby="agents-heading" className="border-b border-border py-20 sm:py-28">
      <Container>
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          One team
        </p>
        <h2
          id="agents-heading"
          className="font-display mt-6 max-w-3xl text-4xl font-medium leading-[1.02] text-ice sm:text-6xl"
        >
          One team. Six specialists. Zero downtime.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate">
          Not a caption generator. A department: find, advertise, engage,
          qualify, follow, and count. Each specialist has a job a business
          owner already has a name for.
        </p>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {lead ? (
            <Link
              href={`/${lead.slug}`}
              className="glow-card group rounded-2xl bg-midnight p-7 transition duration-200 hover:-translate-y-1 lg:col-span-2 lg:row-span-2 lg:p-10"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
                {lead.name} · {lead.title}
              </p>
              <h3 className="font-display mt-4 text-3xl text-ice sm:text-5xl">{lead.kicker}</h3>
              <p className="mt-5 max-w-lg text-sm leading-7 text-slate">{lead.does}</p>
              <p className="mt-3 max-w-lg text-sm leading-7 text-slate">{lead.doesNot}</p>
              <p className="mt-8 text-sm font-medium text-ice">{lead.metric}</p>
            </Link>
          ) : null}
          {rest.map((agent) => (
            <Link
              key={agent.slug}
              href={`/${agent.slug}`}
              className="glow-card group rounded-2xl bg-midnight p-6 transition duration-200 hover:-translate-y-1"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate">
                {agent.name} · {agent.title}
              </p>
              <h3 className="font-display mt-3 text-2xl text-ice">{agent.kicker}</h3>
              <p className="mt-3 text-sm leading-6 text-slate">{agent.does}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.12em] text-cyan">{agent.metric}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
