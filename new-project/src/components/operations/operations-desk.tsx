"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Button, ButtonLink } from "@/components/button";
import { ResultCard } from "@/components/tools/result-card";
import { copyText } from "@/lib/clipboard";
import { packDrafts, downloadText } from "@/lib/download";
import { DW_GOLD_TRIAL, DW_GOLD_TRIAL_NOTES, EXAMPLE_PROFILE } from "@/lib/example-profile";
import {
  OPERATION_AGENTS,
  runOperationAgent,
  type OperationAgentId,
} from "@/lib/operations/agents";
import {
  getProfileSnapshot,
  getServerProfileSnapshot,
  hydrateProfileStore,
  subscribeProfile,
  writeProfileStore,
} from "@/lib/profile-storage";
import { sanitiseFormValues, validateGeneratorForm, hasFieldErrors } from "@/lib/validation";
import type { GeneratedPost } from "@/lib/types";

type JobStatus = "idle" | "queued" | "working" | "done" | "error";

interface JobState {
  status: JobStatus;
  posts: GeneratedPost[];
}

const idleJobs = (): Record<OperationAgentId, JobState> => {
  const next = {} as Record<OperationAgentId, JobState>;
  for (const agent of OPERATION_AGENTS) {
    next[agent.id] = { status: "idle", posts: [] };
  }
  return next;
};

export function OperationsDesk() {
  const profile = useSyncExternalStore(
    subscribeProfile,
    getProfileSnapshot,
    getServerProfileSnapshot,
  );
  const [jobs, setJobs] = useState(idleJobs);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    hydrateProfileStore();
  }, []);

  const ready = useMemo(
    () => !hasFieldErrors(validateGeneratorForm(profile, "seo-brief")),
    [profile],
  );

  const allPosts = useMemo(
    () =>
      OPERATION_AGENTS.flatMap((agent) =>
        jobs[agent.id].posts.map((post) => ({
          ...post,
          id: `${agent.id}-${post.id}`,
          label: `${agent.short}: ${post.label}`,
        })),
      ),
    [jobs],
  );

  function patchJob(id: OperationAgentId, patch: Partial<JobState>) {
    setJobs((current) => ({
      ...current,
      [id]: { ...current[id], ...patch },
    }));
  }

  async function runAgents(ids: OperationAgentId[]) {
    if (running) return;
    const clean = sanitiseFormValues(profile);
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
    setJobs((current) => {
      const next = { ...current };
      for (const id of ids) next[id] = { status: "queued", posts: [] };
      return next;
    });

    for (const [index, id] of ids.entries()) {
      patchJob(id, { status: "working" });
      await new Promise((resolve) => window.setTimeout(resolve, 420 + index * 180));
      try {
        const posts = runOperationAgent(id, clean);
        patchJob(id, { status: "done", posts });
      } catch {
        patchJob(id, { status: "error", posts: [] });
      }
    }
    setRunning(false);
  }

  function loadTrial(kind: "cafe" | "gold") {
    writeProfileStore(
      kind === "gold"
        ? { ...DW_GOLD_TRIAL, facebookStyles: [...DW_GOLD_TRIAL.facebookStyles] }
        : { ...EXAMPLE_PROFILE, facebookStyles: [...EXAMPLE_PROFILE.facebookStyles] },
    );
    setJobs(idleJobs());
    setMessage(
      kind === "gold"
        ? `Loaded the DW Gold Trading owner trial. ${DW_GOLD_TRIAL_NOTES.caution}`
        : "Loaded the Harbour & Hearth example. It is labelled as a preview, not a live cafe.",
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
      <section className="luxury-panel rounded-[2rem] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d7c4a1]">
          House agents
        </p>
        <h2 className="font-display mt-3 text-2xl text-[#f6f1e8] sm:text-3xl">
          They draft in this tab. They do not spend ad budget.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#e8dcc8]">
          Five house agents run in the browser, in sequence, at no extra model
          cost. They write SEO, Facebook/Instagram ads, Google Ads (not AdSense),
          a social week, and a measurement plan. Live ads still need the client’s
          Meta or Google account, and money paid to those platforms.
        </p>
        <p className="mt-4 text-sm text-[#d7c4a1]">
          {profile.businessName
            ? `Current desk: ${profile.businessName}${profile.location ? ` · ${profile.location}` : ""}`
            : "No business loaded yet."}
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
          <Button type="button" variant="secondary" className="text-[#f6f1e8]" onClick={() => loadTrial("gold")}>
            Load DW Gold Trading trial
          </Button>
          <Button type="button" variant="secondary" className="text-[#f6f1e8]" onClick={() => loadTrial("cafe")}>
            Load cafe example
          </Button>
          <ButtonLink href="/proof" variant="secondary" className="text-[#f6f1e8]">
            Proof ledger
          </ButtonLink>
        </div>
        {message ? (
          <p className="mt-5 text-sm leading-6 text-[#e8dcc8]" role="status">
            {message}
          </p>
        ) : null}
        {!ready && !message ? (
          <p className="mt-5 text-sm text-[#b3a28c]">
            Fill the studio, ask the assistant, or load a trial first.
          </p>
        ) : null}
      </section>

      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {OPERATION_AGENTS.map((agent) => {
          const job = jobs[agent.id];
          return (
            <li key={agent.id} className="paper-card rounded-3xl border border-stone-200 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8c6a38]">
                {job.status === "working"
                  ? "Working"
                  : job.status === "queued"
                    ? "Queued"
                    : job.status === "done"
                      ? "Done"
                      : job.status === "error"
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
                yourself. Log real enquiries on the proof page.
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

      <aside className="rounded-3xl border border-[rgba(176,137,79,0.35)] bg-[#fffaf3] p-6">
        <h2 className="font-display text-2xl text-stone-900">DW Gold Trading trial</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          Companies House lists DW Gold Trading Ltd ( {DW_GOLD_TRIAL_NOTES.companyNumber} )
          in Alfreton, Derbyshire, under education. The site{" "}
          <a
            className="font-semibold text-[#8c6a38] underline-offset-2 hover:underline"
            href={DW_GOLD_TRIAL_NOTES.website}
            rel="noreferrer"
            target="_blank"
          >
            dwgoldtrading.com
          </a>{" "}
          exists; the public homepage currently shows a login wall, so this trial
          does not scrape or invent page copy. {DW_GOLD_TRIAL_NOTES.caution}
        </p>
      </aside>
    </div>
  );
}
