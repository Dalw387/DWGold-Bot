"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { Button, ButtonLink } from "@/components/button";
import { ResultCard } from "@/components/tools/result-card";
import { copyText } from "@/lib/clipboard";
import { packDrafts, downloadText } from "@/lib/download";
import { DW_GOLD_TRIAL, DW_GOLD_TRIAL_NOTES, EXAMPLE_PROFILE } from "@/lib/example-profile";
import {
  getHouseSnapshot,
  getServerHouseSnapshot,
  hydrateHouseStore,
  subscribeHouse,
} from "@/lib/house-membership";
import {
  OPERATION_AGENTS,
  runOperationAgent,
  type OperationAgentId,
} from "@/lib/operations/agents";
import {
  clearOpsResults,
  getOpsSnapshot,
  getServerOpsSnapshot,
  hydrateOpsStore,
  patchOpsResults,
  subscribeOps,
  writeOpsResults,
  type OpsResults,
} from "@/lib/ops-storage";
import {
  getProfileSnapshot,
  getServerProfileSnapshot,
  hydrateProfileStore,
  subscribeProfile,
  writeProfileStore,
} from "@/lib/profile-storage";
import { sanitiseFormValues, validateGeneratorForm, hasFieldErrors } from "@/lib/validation";
import type { GeneratorFormValues } from "@/lib/types";

type JobStatus = "idle" | "queued" | "working" | "done" | "error";

function cloneTrial(kind: "cafe" | "gold"): GeneratorFormValues {
  const source = kind === "gold" ? DW_GOLD_TRIAL : EXAMPLE_PROFILE;
  return { ...source, facebookStyles: [...source.facebookStyles] };
}

export function OperationsDesk() {
  const searchParams = useSearchParams();
  const profile = useSyncExternalStore(
    subscribeProfile,
    getProfileSnapshot,
    getServerProfileSnapshot,
  );
  const stored = useSyncExternalStore(subscribeOps, getOpsSnapshot, getServerOpsSnapshot);
  const house = useSyncExternalStore(subscribeHouse, getHouseSnapshot, getServerHouseSnapshot);
  const [progress, setProgress] = useState<Partial<Record<OperationAgentId, JobStatus>>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const booted = useRef(false);

  useEffect(() => {
    hydrateProfileStore();
    hydrateOpsStore();
    hydrateHouseStore();
    if (booted.current) return;
    booted.current = true;
    const trial = searchParams.get("trial");
    const shouldRun = searchParams.get("run") === "1";
    if (trial !== "gold") return;
    const values = cloneTrial("gold");
    writeProfileStore(values);
    if (!shouldRun) return;
    const next = {} as OpsResults;
    for (const agent of OPERATION_AGENTS) {
      next[agent.id] = runOperationAgent(agent.id, values);
    }
    writeOpsResults(next);
  }, [searchParams]);

  const ready = useMemo(
    () => !hasFieldErrors(validateGeneratorForm(profile, "seo-brief")),
    [profile],
  );

  const allPosts = useMemo(
    () =>
      OPERATION_AGENTS.flatMap((agent) =>
        (stored[agent.id] ?? []).map((post) => ({
          ...post,
          id: `${agent.id}-${post.id}`,
          label: `${agent.short}: ${post.label}`,
        })),
      ),
    [stored],
  );

  function statusFor(id: OperationAgentId): JobStatus {
    if (progress[id]) return progress[id];
    if ((stored[id] ?? []).length > 0) return "done";
    return "idle";
  }

  async function runAgents(ids: OperationAgentId[], values?: GeneratorFormValues) {
    if (running) return;
    const clean = sanitiseFormValues(values ?? getProfileSnapshot());
    const errors = validateGeneratorForm(clean, "seo-brief");
    if (hasFieldErrors(errors)) {
      setMessage("Add a name, type, town, and offer before the house agents can work.");
      return;
    }
    writeProfileStore(clean);
    setMessage("");
    setRunning(true);
    setDrafts((current) => {
      const next = { ...current };
      for (const key of Object.keys(next)) {
        if (ids.some((id) => key.startsWith(`${id}-`))) delete next[key];
      }
      return next;
    });
    setProgress((current) => {
      const next = { ...current };
      for (const id of ids) next[id] = "queued";
      return next;
    });

    for (const [index, id] of ids.entries()) {
      setProgress((current) => ({ ...current, [id]: "working" }));
      await new Promise((resolve) => window.setTimeout(resolve, 420 + index * 180));
      try {
        const posts = runOperationAgent(id, clean);
        patchOpsResults(id, posts);
        setProgress((current) => ({ ...current, [id]: "done" }));
      } catch {
        setProgress((current) => ({ ...current, [id]: "error" }));
      }
    }
    setRunning(false);
  }

  function loadTrial(kind: "cafe" | "gold") {
    const values = cloneTrial(kind);
    writeProfileStore(values);
    clearOpsResults();
    setProgress({});
    setDrafts({});
    setMessage(
      kind === "gold"
        ? `Loaded the DW Gold Trading owner trial. ${DW_GOLD_TRIAL_NOTES.caution}`
        : "Loaded the Harbour & Hearth example. It is labelled as a preview, not a live cafe.",
    );
    void runAgents(
      OPERATION_AGENTS.map((agent) => agent.id),
      values,
    );
  }

  async function copyPack() {
    const ok = await copyText(
      packDrafts(
        `House Operations — ${profile.businessName}`,
        allPosts.map((post) => ({
          label: post.label,
          text: drafts[post.id] ?? post.text,
        })),
      ),
    );
    setCopied(ok);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-10">
      <section className="luxury-panel rounded-sm p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b4b0a8]">
          House agents
        </p>
        <h2 className="font-display mt-3 text-2xl text-[#f4f3ef] sm:text-3xl">
          They draft in this tab. They do not spend ad budget.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#cfcbc3]">
          Seven house agents run in the browser, in sequence, at no extra model
          cost. They write a public homepage, SEO, Facebook/Instagram ads, Google
          Ads (not AdSense), a social week, a 14-day customer plan, first replies,
          and a measurement plan. Live ads still
          need the client’s Meta or Google account, and money paid to those
          platforms.
        </p>
        <p className="mt-4 text-sm text-[#b4b0a8]">
          {profile.businessName
            ? `Current desk: ${profile.businessName}${profile.location ? ` · ${profile.location}` : ""}`
            : "No business loaded yet."}
          {house.returnedFromCheckout
            ? " · This browser unlocked after Stripe."
            : ""}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="button"
            variant="gold"
            onClick={() => void runAgents(OPERATION_AGENTS.map((agent) => agent.id))}
            disabled={running || !ready}
          >
            {running ? "Agents working" : "Run all house agents"}
          </Button>
          <Button
            type="button"
            variant="inverse"
            onClick={() => loadTrial("gold")}
            disabled={running}
          >
            Run DW Gold Trading trial
          </Button>
          <Button
            type="button"
            variant="inverse"
            onClick={() => loadTrial("cafe")}
            disabled={running}
          >
            Run cafe example
          </Button>
          <ButtonLink href="/proof" variant="inverse">
            Proof ledger
          </ButtonLink>
        </div>
        {searchParams.get("trial") === "gold" ? (
          <p className="mt-5 text-sm leading-6 text-[#cfcbc3]" role="status">
            DW Gold Trading owner trial is on this desk. {DW_GOLD_TRIAL_NOTES.caution}
          </p>
        ) : null}
        {message ? (
          <p className="mt-5 text-sm leading-6 text-[#cfcbc3]" role="status">
            {message}
          </p>
        ) : null}
        {!ready && !message ? (
          <p className="mt-5 text-sm text-[#b3a28c]">
            Fill the studio, ask the assistant, or run a trial first.
          </p>
        ) : null}
      </section>

      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {OPERATION_AGENTS.map((agent) => {
          const status = statusFor(agent.id);
          return (
            <li key={agent.id} className="paper-card rounded-sm border border-stone-200 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4d5c57]">
                {status === "working"
                  ? "Working"
                  : status === "queued"
                    ? "Queued"
                    : status === "done"
                      ? "Done"
                      : status === "error"
                        ? "Needs a retry"
                        : "Ready"}
              </p>
              <h3 className="font-display mt-2 text-xl text-stone-900">{agent.name}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{agent.summary}</p>
              <Button
                type="button"
                variant="ghost"
                className="mt-4 px-3 py-2"
                disabled={running}
                onClick={() => void runAgents([agent.id])}
              >
                Run this agent
              </Button>
            </li>
          );
        })}
      </ul>

      {allPosts.length > 0 ? (
        <section>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="font-display text-3xl text-stone-900">Agent output</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                Edit, copy, or download. Then publish or paste into Ads Manager
                yourself. Log real enquiries on the proof page. Output stays in
                this browser tab if you move around the site.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="secondary" className="px-4 py-2" onClick={() => void copyPack()}>
                {copied ? "Copied pack" : "Copy all"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="px-4 py-2"
                onClick={() =>
                  downloadText(
                    `house-operations-${profile.businessName || "desk"}.txt`,
                    packDrafts(
                      `House Operations — ${profile.businessName}`,
                      allPosts.map((post) => ({
                        label: post.label,
                        text: drafts[post.id] ?? post.text,
                      })),
                    ),
                  )
                }
              >
                Download .txt
              </Button>
            </div>
          </div>
          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            {allPosts.map((post) => (
              <ResultCard
                key={post.id}
                post={post}
                businessName={profile.businessName}
                value={drafts[post.id] ?? post.text}
                onChange={(value) =>
                  setDrafts((current) => ({ ...current, [post.id]: value }))
                }
              />
            ))}
          </div>
        </section>
      ) : null}

      <aside className="rounded-sm border border-[rgba(30,58,52,0.35)] bg-[#f4f3ef] p-6">
        <h2 className="font-display text-2xl text-stone-900">DW Gold Trading trial</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          Companies House lists DW Gold Trading Ltd ({DW_GOLD_TRIAL_NOTES.companyNumber})
          in Alfreton, Derbyshire, under education. The site{" "}
          <a
            className="font-semibold text-[#4d5c57] underline-offset-2 hover:underline"
            href={DW_GOLD_TRIAL_NOTES.website}
            rel="noreferrer"
            target="_blank"
          >
            dwgoldtrading.com
          </a>{" "}
          currently shows a login wall to the public, so ads and search cannot
          convert until a public page exists. The SEO agent now drafts that page.
          {` ${DW_GOLD_TRIAL_NOTES.caution}`}
        </p>
      </aside>
    </div>
  );
}
