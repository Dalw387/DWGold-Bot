"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/button";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import {
  auditQuestions,
  makeReferralCode,
  recordReferral,
  saveAudit,
  scoreAudit,
  shareBreakdown,
  type AuditAnswers,
  type AuditChoice,
} from "@/lib/nano-growth";
import { openBuildTeam } from "@/lib/sales";

export function AuditClient() {
  const search = useSearchParams();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AuditAnswers>({});
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState("SHARE");

  useEffect(() => {
    const fromUrl = search.get("r");
    if (fromUrl) recordReferral(fromUrl);
  }, [search]);

  const { total } = useMemo(() => scoreAudit(answers), [answers]);
  const parts = useMemo(() => shareBreakdown(answers), [answers]);
  const question = auditQuestions[index];

  function choose(choice: AuditChoice) {
    if (!question) return;
    const nextAnswers = { ...answers, [question.id]: choice };
    setAnswers(nextAnswers);
    if (index + 1 < auditQuestions.length) {
      setIndex(index + 1);
      return;
    }
    const scored = scoreAudit(nextAnswers);
    setCode(makeReferralCode());
    saveAudit(nextAnswers, scored.total);
    setDone(true);
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const shareText = `We scored ${total}/100 for AI marketing readiness on LocalLaunch.

Lead response: ${parts.response}/100
Advertising: ${parts.ads}/100
Search visibility: ${parts.search}/100

Run yours: ${origin}/audit?r=${code}`;

  async function copyShare() {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  const leak =
    parts.response <= parts.ads && parts.response <= parts.search
      ? "Missed-call recovery"
      : parts.ads <= parts.search
        ? "Advertising landing"
        : "Search visibility";

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 md:px-8 md:py-24">
      <p className="kicker">
        <span className="kicker-dot" aria-hidden="true" />
        AI marketing score
      </p>
      <h1 className="font-display display-2 mt-6 text-ice">
        How much business is slipping through the cracks?
      </h1>
      <p className="mt-4 text-base leading-7 text-slate">
        Eight questions. About 60 seconds. No fake industry averages. Not a
        ranking Google will see.
      </p>

      {!done && question ? (
        <div className="mt-12">
          <p className="label">
            {String(index + 1).padStart(2, "0")} / {String(auditQuestions.length).padStart(2, "0")}
          </p>
          <p className="mt-4 font-display text-2xl leading-snug text-ice">{question.prompt}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button type="button" onClick={() => choose(true)}>
              Yes
            </Button>
            <Button type="button" variant="secondary" onClick={() => choose("sometimes")}>
              Sometimes
            </Button>
            <Button type="button" variant="ghost" onClick={() => choose(false)}>
              No
            </Button>
          </div>
          {index > 0 ? (
            <button type="button" className="mt-6 text-sm text-titanium" onClick={() => setIndex(index - 1)}>
              Back
            </button>
          ) : null}
        </div>
      ) : null}

      {done ? (
        <div className="titanium mt-12 rounded-[1.5rem] p-8">
          <p className="label">Your LocalLaunch score</p>
          <p className="font-display mt-3 text-6xl text-ice">{total}/100</p>
          <dl className="mt-6 grid gap-2 text-sm text-slate">
            <div className="flex justify-between">
              <dt>Lead response</dt>
              <dd className="text-ice">{parts.response}/100</dd>
            </div>
            <div className="flex justify-between">
              <dt>Advertising</dt>
              <dd className="text-ice">{parts.ads}/100</dd>
            </div>
            <div className="flex justify-between">
              <dt>Search visibility</dt>
              <dd className="text-ice">{parts.search}/100</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm leading-6 text-slate">
            Biggest leak: {leak}. That is a prompt for the desks — not a financial ROI claim.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void copyShare()}
              className="rounded-[12px] border border-titanium/35 px-5 py-2.5 text-sm font-semibold text-ice"
            >
              {copied ? "Copied" : "Share my score"}
            </button>
            <StripePayLink>Build the team that fixes this · {HOUSE_PRICE_SHORT}</StripePayLink>
            <Button type="button" variant="ghost" onClick={() => openBuildTeam()}>
              Build My AI Team
            </Button>
            <Link href="/tools/customer-plan" className="text-sm text-slate">
              After pay: 14-day plan
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
