"use client";

import { useMemo, useState } from "react";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { ViewportSignal } from "@/components/nano/viewport-signal";

function pounds(n: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);
}

export function RoiCalculator() {
  const [leads, setLeads] = useState("120");
  const [sale, setSale] = useState("1500");
  const [rate, setRate] = useState("15");
  const [missed, setMissed] = useState("20");
  const [ads, setAds] = useState("5000");

  const result = useMemo(() => {
    const monthlyLeads = Number(leads);
    const averageSale = Number(sale);
    const conversion = Number(rate) / 100;
    const miss = Number(missed) / 100;
    const adSpend = Number(ads);
    if (![monthlyLeads, averageSale, conversion, miss, adSpend].every((n) => Number.isFinite(n) && n >= 0)) {
      return null;
    }
    const missedLeads = monthlyLeads * miss;
    const opportunity = missedLeads * conversion * averageSale;
    return { missedLeads, opportunity, adSpend };
  }, [ads, leads, missed, rate, sale]);

  return (
    <section id="calculator" aria-labelledby="roi-heading" className="border-b border-border py-20 sm:py-28">
      <ViewportSignal kind="calculator" />
      <Container className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div>
          <p className="kicker">
            <span className="kicker-dot" aria-hidden="true" />
            The money
          </p>
          <h2
            id="roi-heading"
            className="font-display mt-6 text-4xl font-medium leading-[1.02] text-ice sm:text-5xl"
          >
            What a missed enquiry is actually worth.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-slate">
            This is arithmetic from the numbers you type — not a forecast, not a
            guarantee, and not a promise that the desk will recover every lead.
          </p>
        </div>
        <div className="surface rounded-2xl p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { id: "leads", label: "Monthly enquiries", value: leads, set: setLeads },
              { id: "sale", label: "Average job value (£)", value: sale, set: setSale },
              { id: "rate", label: "Conversion rate (%)", value: rate, set: setRate },
              { id: "missed", label: "Missed enquiries (%)", value: missed, set: setMissed },
              { id: "ads", label: "Monthly ad spend (£)", value: ads, set: setAds },
            ].map((field) => (
              <label key={field.id} className="text-sm font-medium text-ice">
                {field.label}
                <input
                  inputMode="decimal"
                  value={field.value}
                  onChange={(event) => field.set(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-white/12 bg-midnight px-3 py-2.5 text-base text-ice outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/30"
                />
              </label>
            ))}
          </div>
          <p className="mt-8 font-display text-2xl leading-snug text-ice" role="status">
            {result
              ? `Your business may be leaving approximately ${pounds(result.opportunity)} of opportunity unquoted each month, across about ${Math.round(result.missedLeads)} missed enquiries. Ad spend of ${pounds(result.adSpend)} still needs an open page and a first reply.`
              : "Enter real numbers from your business."}
          </p>
          <ButtonLink href="#how" className="mt-8" variant="secondary" arrow>
            See what your AI team could write
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
