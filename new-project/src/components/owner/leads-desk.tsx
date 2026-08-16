"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, ButtonLink } from "@/components/button";
import { Container } from "@/components/container";

interface LeadRow {
  email: string;
  name: string;
  source: string;
  createdAt: string;
}

export function LeadsDesk() {
  const searchParams = useSearchParams();
  const fromQuery = searchParams.get("key") ?? "";
  const [key, setKey] = useState(fromQuery);
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);

  async function load() {
    setError("");
    try {
      const response = await fetch(`/api/leads?key=${encodeURIComponent(key)}`);
      const data = (await response.json()) as {
        error?: string;
        leads?: LeadRow[];
        count?: number;
      };
      if (!response.ok) {
        setError(data.error || "Could not load the list.");
        setLeads([]);
        return;
      }
      setLeads(data.leads ?? []);
      setCount(data.count ?? 0);
    } catch {
      setError("Could not load the list.");
    }
  }

  return (
    <Container className="max-w-3xl py-14 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4d5c57]">
        Owner
      </p>
      <h1 className="font-display mt-3 text-4xl font-medium tracking-tight text-stone-900">
        Email list
      </h1>
      <p className="mt-4 text-sm leading-7 text-stone-600">
        Addresses people typed on the site, for later projects. Set
        OWNER_LEADS_KEY on Vercel, then paste it here. Download CSV when you
        want a backup.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <input
          type="password"
          value={key}
          onChange={(event) => setKey(event.target.value)}
          placeholder="Owner key"
          className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm"
        />
        <Button type="button" onClick={() => void load()}>
          Open list
        </Button>
        <ButtonLink
          href={`/api/leads?key=${encodeURIComponent(key)}&format=csv`}
          variant="secondary"
        >
          Download CSV
        </ButtonLink>
      </div>
      {error ? (
        <p className="mt-4 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : (
        <p className="mt-4 text-sm text-stone-600">{count} saved.</p>
      )}
      <ul className="mt-8 space-y-3">
        {leads.map((lead) => (
          <li key={lead.email} className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm">
            <p className="font-semibold text-stone-900">{lead.email}</p>
            <p className="text-stone-600">
              {lead.name || "No name"} · {lead.source} ·{" "}
              {new Date(lead.createdAt).toLocaleString("en-GB")}
            </p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
