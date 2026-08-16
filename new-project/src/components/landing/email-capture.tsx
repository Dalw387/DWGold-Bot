"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/button";
import { saveLeadEmail } from "@/lib/lead-email";

export function EmailCapture({
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
      setMessage("Saved. Useful updates only.");
    } catch {
      setStatus("error");
      setMessage("That email could not be saved. Check your connection and try again.");
    }
  }

  return (
    <form onSubmit={(event) => void onSubmit(event)} noValidate>
      <div className="grid gap-4">
        <label className="text-sm font-medium text-ice">
          Name <span className="text-slate">(optional)</span>
          <input name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="field" />
        </label>
        <label className="text-sm font-medium text-ice">
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="field"
          />
        </label>
      </div>
      <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-slate">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-titanium/40"
        />
        <span>Useful updates only. Unsubscribe whenever you like. We do not sell addresses.</span>
      </label>
      <Button type="submit" className="mt-6" disabled={status === "saving"} arrow>
        {status === "saving" ? "Saving" : "Keep me updated"}
      </Button>
      {message ? (
        <p className={`mt-3 text-sm leading-6 ${status === "error" ? "text-red-300" : "text-slate"}`} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
