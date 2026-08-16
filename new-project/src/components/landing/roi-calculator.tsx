"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

function useCount(value: number) {
  const [shown, setShown] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    const dur = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 700;
    let raf = 0;
    function tick(now: number) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - (1 - p) ** 3;
      setShown(from + (value - from) * eased);
      if (p < 1) raf = window.requestAnimationFrame(tick);
      else fromRef.current = value;
    }
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [value]);

  return shown;
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

  const opportunity = useCount(result?.opportunity ?? 0);
  const missedCount = useCount(result?.missedLeads ?? 0);
  const recovered = useCount(result?.recovered ?? 0);

  return (
    <section id="calculator" aria-labelledby="roi-heading" className="py-20 sm:py-28">
      <ViewportSignal kind="calculator" />
      <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p className="kicker">
            <span className="kicker-dot" aria-hidden="true" />
            Missed-enquiry value
          </p>
          <h2 id="roi-heading" className="font-display display-2 mt-6 text-ice">
            What a missed enquiry is actually worth.
          </h2>
          <p className="prose-narrow mt-5 text-sm leading-7 text-slate">
            Arithmetic from the numbers you type — not a forecast and not a guarantee.
          </p>
          {result ? (
            <p className="font-display mt-10 text-[clamp(3.4rem,8vw,6.2rem)] leading-none tracking-tight text-cyan" role="status">
              {pounds(Math.round(opportunity))}
            </p>
          ) : null}
          <p className="mt-3 max-w-sm text-sm font-semibold uppercase tracking-[0.14em] text-titanium">
            Potential monthly opportunity currently going unquoted
          </p>
        </div>
        <div className="glass-lit rounded-[1.5rem] p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { id: "leads", label: "Monthly enquiries", value: leads, set: setLeads },
              { id: "sale", label: "Average job value (£)", value: sale, set: setSale },
              { id: "rate", label: "Conversion rate (%)", value: rate, set: setRate },
              { id: "missed", label: "Missed enquiries (%)", value: missed, set: setMissed },
              { id: "ads", label: "Advertising spend (£)", value: ads, set: setAds },
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
            <ol className="mt-10 grid gap-3 sm:grid-cols-3">
              <li className="rounded-2xl border border-white/10 p-3">
                <p className="font-display text-2xl text-ice">{Math.round(missedCount)}</p>
                <p className="mt-1 text-xs text-slate">missed enquiries</p>
              </li>
              <li className="rounded-2xl border border-white/10 p-3">
                <p className="font-display text-2xl text-ice">{recovered.toFixed(1)}</p>
                <p className="mt-1 text-xs text-slate">potential customers</p>
              </li>
              <li className="rounded-2xl border border-cyan/25 p-3">
                <p className="font-display text-2xl text-cyan">{pounds(Math.round(opportunity))}</p>
                <p className="mt-1 text-xs text-slate">opportunity</p>
              </li>
            </ol>
          ) : (
            <p className="mt-8 text-sm text-slate">Enter real numbers from your business.</p>
          )}
          <Button
            type="button"
            className="mt-8"
            arrow
            onClick={() => {
              if (result) patchContext({ calculatorOpportunity: result.opportunity, problem: "missed calls" });
              openBuildTeam();
            }}
          >
            Show me how Charlie recovers this
          </Button>
        </div>
      </Container>
    </section>
  );
}
