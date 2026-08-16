import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { agents, rooms } from "@/lib/offer";
import { AGENT_COUNT_TITLE, ROOM_COUNT_TITLE } from "@/lib/counts";

export function WhatYouGet() {
  return (
    <section
      id="what-you-get"
      aria-labelledby="get-heading"
      className="border-y border-border py-16 sm:py-24"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="kicker">What you get after you pay</p>
          <h2
            id="get-heading"
            className="font-display mt-4 text-3xl font-medium tracking-tight sm:text-5xl"
          >
            {ROOM_COUNT_TITLE} rooms. {AGENT_COUNT_TITLE} named desks. One set of facts.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Type the business once. Name, type, town, and offer. Those facts
            feed every room. Generate, edit, copy, or download. Nothing is sent
            to a paid AI company. This is a lot of work for {HOUSE_PRICE_SHORT}
            once — because the customer comes first.
          </p>
        </div>
        <h3 className="font-display mt-14 text-2xl">Named desks</h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          House Operations runs them in this browser tab. They draft. They do
          not spend. Press one button for all eight, or run one at a time.
        </p>
        <dl className="mt-6 divide-y divide-border border-y border-border">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="grid gap-2 py-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]"
            >
              <dt className="font-medium text-foreground">{agent.name}</dt>
              <dd className="text-sm leading-7 text-muted">{agent.help}</dd>
            </div>
          ))}
        </dl>
        <h3 className="font-display mt-14 text-2xl">Every drafting room</h3>
        <dl className="mt-6 divide-y divide-border border-y border-border">
          {rooms.map((room) => (
            <div
              key={room.name}
              className="grid gap-2 py-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]"
            >
              <dt className="font-medium text-foreground">{room.name}</dt>
              <dd className="text-sm leading-7 text-muted">{room.help}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
