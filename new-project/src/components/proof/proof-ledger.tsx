"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/button";
import {
  addProofEntry,
  clearProofStore,
  getProofSnapshot,
  getServerProofSnapshot,
  hydrateProofStore,
  PROOF_KIND_LABELS,
  PROOF_SOURCE_LABELS,
  subscribeProof,
  type ProofKind,
  type ProofSource,
} from "@/lib/proof-storage";

export function ProofLedger() {
  const entries = useSyncExternalStore(
    subscribeProof,
    getProofSnapshot,
    getServerProofSnapshot,
  );
  const [source, setSource] = useState<ProofSource>("website");
  const [kind, setKind] = useState<ProofKind>("enquiry");
  const [note, setNote] = useState("");
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    hydrateProofStore();
  }, []);

  const counts = useMemo(() => {
    const next: Record<ProofKind, number> = {
      enquiry: 0,
      message: 0,
      call: 0,
      visit: 0,
      sale: 0,
    };
    for (const entry of entries) next[entry.kind] += 1;
    return next;
  }, [entries]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = note.trim();
    if (trimmed.length < 2) {
      setFormMessage("Add a short note about the real person or message.");
      return;
    }
    addProofEntry({ source, kind, note: trimmed });
    setNote("");
    setFormMessage("Logged. This number only moves when you add a real row.");
  }

  return (
    <div className="space-y-10">
      <section className="grid gap-4 sm:grid-cols-5">
        {(Object.keys(counts) as ProofKind[]).map((key) => (
          <div key={key} className="paper-card rounded-3xl border border-stone-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8c6a38]">
              {PROOF_KIND_LABELS[key]}
            </p>
            <p className="font-display mt-2 text-3xl text-stone-900">{counts[key]}</p>
          </div>
        ))}
      </section>

      <form
        onSubmit={submit}
        className="paper-card rounded-3xl border border-stone-200 p-6 sm:p-8"
      >
        <h2 className="font-display text-2xl text-stone-900">Log a real result</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Only write what happened. Zero is allowed. Invented leads are worse
          than a quiet week.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-stone-900">
            Source
            <select
              className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm"
              value={source}
              onChange={(event) => setSource(event.target.value as ProofSource)}
            >
              {(Object.keys(PROOF_SOURCE_LABELS) as ProofSource[]).map((key) => (
                <option key={key} value={key}>
                  {PROOF_SOURCE_LABELS[key]}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-stone-900">
            What happened
            <select
              className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm"
              value={kind}
              onChange={(event) => setKind(event.target.value as ProofKind)}
            >
              {(Object.keys(PROOF_KIND_LABELS) as ProofKind[]).map((key) => (
                <option key={key} value={key}>
                  {PROOF_KIND_LABELS[key]}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-stone-900 sm:col-span-2">
            Note
            <textarea
              rows={3}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm"
              placeholder="Website form from a person in Alfreton asking about the next teaching date."
            />
          </label>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="submit">Add to ledger</Button>
          <Button type="button" variant="secondary" onClick={() => clearProofStore()}>
            Clear this tab
          </Button>
        </div>
        {formMessage ? (
          <p className="mt-4 text-sm text-stone-600" role="status">
            {formMessage}
          </p>
        ) : null}
      </form>

      <section>
        <h2 className="font-display text-2xl text-stone-900">This tab’s record</h2>
        {entries.length === 0 ? (
          <p className="mt-4 text-sm leading-6 text-stone-600">
            Nothing logged yet. That is the honest starting point for the DW Gold
            Trading trial and for every new client.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm leading-6"
              >
                <p className="font-semibold text-stone-900">
                  {PROOF_KIND_LABELS[entry.kind]} · {PROOF_SOURCE_LABELS[entry.source]}
                </p>
                <p className="text-xs text-stone-500">
                  {new Date(entry.recordedAt).toLocaleString("en-GB")}
                </p>
                <p className="mt-2 text-stone-700">{entry.note}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
