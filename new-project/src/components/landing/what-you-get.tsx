import { Container } from "@/components/container";
import { agents, rooms } from "@/lib/offer";

export function WhatYouGet() {
  return (
    <section
      id="what-you-get"
      aria-labelledby="get-heading"
      className="bg-[#efe8db] py-16 sm:py-24"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6a38]">
            What you get after you pay
          </p>
          <h2
            id="get-heading"
            className="font-display mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl"
          >
            The whole platform. Every room. Every agent. Aimed at customers.
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            You type the business once. Name, type, town, and offer. Those facts
            feed every room. You can fill an example, or tell the concierge a
            sentence. Then generate, edit, copy, or download. Nothing is sent to
            a paid AI company.
          </p>
        </div>
        <h3 className="font-display mt-12 text-2xl text-stone-900">Every drafting room</h3>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {rooms.map((room) => (
            <li key={room.name} className="paper-card rounded-3xl border border-stone-200 p-5 sm:p-6">
              <h4 className="font-display text-xl text-stone-900">{room.name}</h4>
              <p className="mt-2 text-sm leading-7 text-stone-600">{room.help}</p>
            </li>
          ))}
        </ul>
        <h3 className="font-display mt-14 text-2xl text-stone-900">Seven house agents</h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">
          House Operations runs the agents in a queue in this browser tab. They
          draft. They do not spend. Press one button for all seven, or run one
          agent at a time.
        </p>
        <ul className="mt-6 grid gap-4 lg:grid-cols-3 md:grid-cols-2">
          {agents.map((agent) => (
            <li key={agent.name} className="paper-card rounded-3xl border border-stone-200 p-5">
              <h4 className="font-display text-lg text-stone-900">{agent.name}</h4>
              <p className="mt-2 text-sm leading-6 text-stone-600">{agent.help}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
