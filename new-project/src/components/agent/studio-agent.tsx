"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { applyBrief } from "@/lib/agent/parse-brief";
import { respondToMessage } from "@/lib/agent/respond";
import {
  getAccessSnapshot,
  getServerAccessSnapshot,
  hydrateAccessStore,
  subscribeAccess,
} from "@/lib/access-storage";
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

export function StudioAgent({ variant = "dock" }: { variant?: "dock" | "page" }) {
  const router = useRouter();
  const pathname = usePathname();
  const profile = useSyncExternalStore(
    subscribeProfile,
    getProfileSnapshot,
    getServerProfileSnapshot,
  );
  const access = useSyncExternalStore(
    subscribeAccess,
    getAccessSnapshot,
    getServerAccessSnapshot,
  );
  const [open, setOpen] = useState(variant === "page");
  const [draft, setDraft] = useState("");
  const [lines, setLines] = useState<ChatLine[]>([
    {
      id: "welcome",
      role: "agent",
      text:
        variant === "page"
          ? "House concierge ready. I work in this browser. Tell me the business, ask for SEO or ads drafts, or say “run the house agents”. I will not invent leads or rankings."
          : "Studio assistant ready. I work in this browser only. Tell me the business in one sentence, or ask for SEO, ads, operations, or pay.",
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    hydrateProfileStore();
    hydrateAccessStore();
  }, []);

  useEffect(() => {
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (variant === "page") return undefined;
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }
      if (event.key === "Escape") setOpen(false);
      if (!typing && event.key === "/" && !open) {
        event.preventDefault();
        setOpen(true);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, variant]);

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

  const panel = (
    <section
      id={variant === "dock" ? "studio-agent-panel" : "house-concierge"}
      className={
        variant === "page"
          ? "flex min-h-[32rem] flex-col overflow-hidden border border-[#d8d4cc] bg-[#f4f3ef]"
          : "fixed right-4 bottom-20 z-50 flex h-[min(32rem,70vh)] w-[min(26rem,calc(100vw-2rem))] flex-col overflow-hidden border border-[#d8d4cc] bg-[#f4f3ef]"
      }
      aria-labelledby={titleId}
    >
      <header className="border-b border-[#d8d4cc] bg-[#191919] px-5 py-4 text-[#f4f3ef]">
        <h2 id={titleId} className="font-display text-xl">
          {variant === "page" ? "House concierge" : "Studio assistant"}
        </h2>
        <p className="mt-1 text-xs text-[#cfcbc3]">
          Browser-only helper. No paid AI model is called. {variant === "dock" ? "Shortcut: Ctrl or Cmd + K." : ""}
        </p>
      </header>
      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {lines.map((line) => (
          <p
            key={line.id}
            className={`whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-6 ${
              line.role === "agent"
                ? "bg-[#f4f3ef] text-stone-800"
                : "ml-6 bg-[#191919] text-[#f4f3ef]"
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
        <label htmlFor={variant === "page" ? "concierge-input" : "agent-input"} className="sr-only">
          Message the assistant
        </label>
        <textarea
          id={variant === "page" ? "concierge-input" : "agent-input"}
          rows={3}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="DW Gold Trading is gold trading education in Alfreton. Run the house agents."
          className="w-full resize-none rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#1e3a34] focus:ring-2 focus:ring-[rgba(30,58,52,0.25)]"
        />
        <div className="mt-2 flex justify-end">
          <Button type="submit" className="px-4 py-2">
            Send
          </Button>
        </div>
      </form>
    </section>
  );

  if (variant === "page") return panel;
  if (pathname === "/concierge") return null;
  if (!access.unlocked) return null;

  return (
    <div className="no-print">
      <button
        type="button"
        className="fixed right-4 bottom-4 z-50 border border-[#191919] bg-[#191919] px-4 py-3 text-sm font-semibold text-[#f4f3ef] hover:bg-[#2a2a28] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191919]"
        aria-expanded={open}
        aria-controls="studio-agent-panel"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close assistant" : "Ask the studio assistant"}
      </button>
      {open ? panel : null}
    </div>
  );
}
