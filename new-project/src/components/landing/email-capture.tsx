"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/button";
import { saveLeadEmail } from "@/lib/lead-email";

export function EmailCapture({
  tone = "paper",
  source = "homepage",
}: {
  tone?: "paper" | "ink";
  source?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const ink = tone === "ink";
  const field = ink
    ? "mt-2 w-full rounded-sm border border-white/15 bg-[#161616] px-3.5 py-2.5 text-sm text-paper"
    : "mt-2 w-full rounded-sm border border-border bg-card px-3.5 py-2.5 text-sm text-foreground";

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (status === "saving") return;
    if (!consent) {
      setStatus("error");
      setMessage("Tick the box if you are happy for us to email you.");
      return;
    }
    setStatus("saving");
    setMessage("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, source }),
      });
      const data = (await response.json()) as { error?: string; email?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "That email could not be saved. Try again.");
        return;
      }
      saveLeadEmail(data.email || email);
      setStatus("done");
      setMessage(
        data.email
          ? `Saved ${data.email}. We will use it for LocalLaunch updates, not a bought list.`
          : "Saved. Thank you.",
      );
    } catch {
      setStatus("error");
      setMessage("That email could not be saved. Check your connection and try again.");
    }
  }

  return (
    <form onSubmit={(event) => void onSubmit(event)} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={`text-sm font-medium ${ink ? "text-paper" : "text-foreground"}`}>
          Name <span className={ink ? "text-[#a8a59e]" : "text-muted"}>(optional)</span>
          <input
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={field}
          />
        </label>
        <label className={`text-sm font-medium ${ink ? "text-paper" : "text-foreground"}`}>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={field}
          />
        </label>
      </div>
      <label className={`mt-4 flex items-start gap-3 text-sm leading-6 ${ink ? "text-[#cfcbc3]" : "text-muted"}`}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-stone-300"
        />
        <span>
          Email me about LocalLaunch and later products. You can ask to be
          removed. We do not sell addresses.
        </span>
      </label>
      <Button type="submit" variant={ink ? "gold" : "primary"} className="mt-6" disabled={status === "saving"}>
        {status === "saving" ? "Saving" : "Keep me on the list"}
      </Button>
      {message ? (
        <p
          className={`mt-3 text-sm leading-6 ${
            status === "error"
              ? ink
                ? "text-[#f3c1c1]"
                : "text-red-800"
              : ink
                ? "text-[#b4b0a8]"
                : "text-muted"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
