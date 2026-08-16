"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { applyBrief } from "@/lib/agent/parse-brief";
import { respondToMessage } from "@/lib/agent/respond";
import {
  getProfileSnapshot,
  getServerProfileSnapshot,
  hydrateProfileStore,
  subscribeProfile,
  writeProfileStore,
} from "@/lib/profile-storage";

interface ChatLine {
  id: string;
  role: "agent" | "user";
  text: string;
}

const OPEN_EVENT = "locallaunch-open-agent";

export function openStudioAgent() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function StudioAgent() {
  const router = useRouter();
  const profile = useSyncExternalStore(
    subscribeProfile,
    getProfileSnapshot,
    getServerProfileSnapshot,
  );
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [lines, setLines] = useState<ChatLine[]>([
    {
      id: "welcome",
      role: "agent",
      text: "Studio assistant ready. I work in this browser only. Tell me the business in one sentence, or ask which tool to use.",
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    hydrateProfileStore();
  }, []);

  useEffect(() => {
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [lines, open]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userLine: ChatLine = { id: crypto.randomUUID(), role: "user", text: trimmed };
    const turn = respondToMessage(trimmed, getProfileSnapshot());
    if (turn.patch) {
      writeProfileStore(applyBrief(getProfileSnapshot(), turn.patch));
    }
    const agentLine: ChatLine = {
      id: crypto.randomUUID(),
      role: "agent",
      text: turn.reply,
    };
    setLines((current) => [...current, userLine, agentLine]);
    setDraft("");
    if (turn.goTo) router.push(turn.goTo);
  }

  return (
    <div className="no-print">
      <button
        type="button"
        className="fixed right-4 bottom-4 z-50 rounded-full border border-[rgba(176,137,79,0.45)] bg-[#12100e] px-4 py-3 text-sm font-semibold text-[#f6f1e8] shadow-lg hover:bg-[#1c1916] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b0894f]"
        aria-expanded={open}
        aria-controls="studio-agent-panel"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close assistant" : "Ask the studio assistant"}
      </button>
      {open ? (
        <section
          id="studio-agent-panel"
          className="fixed right-4 bottom-20 z-50 flex h-[min(32rem,70vh)] w-[min(26rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-[rgba(176,137,79,0.35)] bg-[#fffaf3] shadow-2xl"
          aria-labelledby={titleId}
        >
          <header className="border-b border-[rgba(176,137,79,0.25)] bg-[#12100e] px-5 py-4 text-[#f6f1e8]">
            <h2 id={titleId} className="font-display text-xl">
              Studio assistant
            </h2>
            <p className="mt-1 text-xs text-[#e8dcc8]">
              Browser-only helper. No paid AI model is called.
            </p>
          </header>
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {lines.map((line) => (
              <p
                key={line.id}
                className={`whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-6 ${
                  line.role === "agent"
                    ? "bg-[#f3eee4] text-stone-800"
                    : "ml-6 bg-[#12100e] text-[#f6f1e8]"
                }`}
              >
                {line.text}
              </p>
            ))}
            {profile.businessName ? (
              <p className="text-xs text-stone-500">
                Current studio: {profile.businessName}
                {profile.location ? ` · ${profile.location}` : ""}
              </p>
            ) : null}
          </div>
          <form
            className="border-t border-stone-200 p-3"
            onSubmit={(event) => {
              event.preventDefault();
              send(draft);
            }}
          >
            <label htmlFor="agent-input" className="sr-only">
              Message the studio assistant
            </label>
            <textarea
              id="agent-input"
              rows={3}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Harbour & Hearth is a cafe in Falmouth offering weekend brunch."
              className="w-full resize-none rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#b0894f] focus:ring-2 focus:ring-[rgba(176,137,79,0.25)]"
            />
            <div className="mt-2 flex justify-end">
              <Button type="submit" className="px-4 py-2">
                Send
              </Button>
            </div>
          </form>
        </section>
      ) : null}
    </div>
  );
}
