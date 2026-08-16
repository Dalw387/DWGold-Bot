"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { ViewportSignal } from "@/components/nano/viewport-signal";
import { patchContext } from "@/lib/nano-growth";
import { openBuildTeam } from "@/lib/sales";

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
    const recovered = missedLeads * conversion;
    const opportunity = recovered * averageSale;
    return { monthlyLeads, missedLeads, recovered, opportunity, adSpend };
  }, [ads, leads, missed, rate, sale]);

  return (
    <section id="calculator" aria-labelledby="roi-heading" className="py-24 sm:py-32">
      <ViewportSignal kind="calculator" />
      <Container className="grid items-start gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p className="kicker">
            <span className="kicker-dot" aria-hidden="true" />
            Estimate
          </p>
          <h2 id="roi-heading" className="font-display display-2 mt-6 text-ice">
            What a missed enquiry is actually worth.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-slate">
            Arithmetic from the numbers you type — not a forecast, not a
            guarantee, and not a promise that the desk will recover every lead.
          </p>
          {result ? (
            <p className="font-display mt-10 text-6xl tracking-tight text-ice" role="status">
              {pounds(result.opportunity)}
            </p>
          ) : null}
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate">
            potential monthly enquiry value currently going unquoted
          </p>
        </div>
        <div>
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
                  className="field"
                />
              </label>
            ))}
          </div>
          {result ? (
            <ol className="mt-10 space-y-3 text-sm leading-6 text-slate">
              <li>{Math.round(result.monthlyLeads)} enquiries</li>
              <li>↓ {Math.round(result.missedLeads)} missed</li>
              <li>↓ {result.recovered.toFixed(1)} potential customers</li>
              <li className="text-ice">{pounds(result.opportunity)} opportunity</li>
            </ol>
          ) : (
            <p className="mt-8 text-sm text-slate">Enter real numbers from your business.</p>
          )}
          <Button
            type="button"
            className="mt-8"
            variant="secondary"
            arrow
            onClick={() => {
              if (result) patchContext({ calculatorOpportunity: result.opportunity, problem: "missed calls" });
              openBuildTeam();
            }}
          >
            Want Charlie to show missed-enquiry follow-up?
          </Button>
        </div>
      </Container>
    </section>
  );
}
