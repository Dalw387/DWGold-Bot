"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { valuePoints } from "@/lib/offer";

function parsePounds(raw: string): number | null {
  const cleaned = raw.replace(/[^\d.]/g, "");
  if (!cleaned) return null;
  const value = Number(cleaned);
  if (!Number.isFinite(value) || value <= 0) return null;
  return value;
}

export function OneJobCover() {
  const [raw, setRaw] = useState("");
  const job = parsePounds(raw);
  const result = useMemo(() => {
    if (job === null) return null;
    if (job >= 197) {
      const extra = job - 197;
      return extra >= 1
        ? `One extra job at £${job.toFixed(0)} covers the desk, with £${extra.toFixed(0)} left. The next job is yours.`
        : `One extra job at £${job.toFixed(0)} covers the ${HOUSE_PRICE_SHORT} desk.`;
    }
    const needed = Math.ceil(197 / job);
    return `At £${job.toFixed(0)} a job, ${needed} extra jobs would cover the ${HOUSE_PRICE_SHORT}. That is still a one-off, not a retainer.`;
  }, [job]);

  return (
    <section id="value" aria-labelledby="value-heading" className="border-b border-[#d8d4cc] py-16 sm:py-24">
      <Container className="max-w-3xl">
        <p className="kicker">Value for money</p>
        <h2
          id="value-heading"
          className="font-display mt-4 text-3xl font-medium tracking-tight sm:text-5xl"
        >
          Type what one job is worth. That is the whole argument.
        </h2>
        <p className="mt-4 text-base leading-7 text-[#5f5c56]">
          We will not invent your prices. Put in a typical job, booking, or
          visit. If this desk helps you win one extra one, you can see whether{" "}
          {HOUSE_PRICE_SHORT} is cheap.
        </p>
        <label className="mt-10 block text-sm font-medium text-[#191919]">
          What is one job usually worth, in pounds?
          <input
            inputMode="decimal"
            value={raw}
            onChange={(event) => setRaw(event.target.value)}
            placeholder="e.g. 250"
            className="mt-2 w-full max-w-xs border border-[#191919] bg-transparent px-3 py-2.5 text-base text-[#191919] outline-none focus:ring-2 focus:ring-[#191919]"
          />
        </label>
        <p className="mt-6 min-h-[3.5rem] text-lg leading-8 text-[#191919]" role="status">
          {result ?? `Pay ${HOUSE_PRICE_SHORT} once. Keep using the desk. One extra customer is the point.`}
        </p>
        <ul className="mt-12 grid gap-8 border-t border-[#d8d4cc] pt-12 sm:grid-cols-3">
          {valuePoints.map((item) => (
            <li key={item.title}>
              <h3 className="font-display text-xl text-[#191919]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#5f5c56]">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
