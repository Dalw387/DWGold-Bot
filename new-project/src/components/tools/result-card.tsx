"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { copyText } from "@/lib/clipboard";
import type { GeneratedPost } from "@/lib/types";

interface ResultCardProps {
  post: GeneratedPost;
  value: string;
  businessName: string;
  preview?: boolean;
  onChange: (value: string) => void;
}

export function ResultCard({
  post,
  value,
  businessName,
  preview = false,
  onChange,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [mode, setMode] = useState<"edit" | "preview">(preview ? "preview" : "edit");
  const initials = businessName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function handleCopy() {
    const ok = await copyText(value);
    setCopied(ok);
    setCopyError(!ok);
  }

  return (
    <article className="paper-card flex h-full flex-col rounded-2xl border border-stone-200 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg text-stone-900">{post.label}</h3>
          <p className="mt-1 text-sm text-stone-600">{post.summary}</p>
        </div>
        <div className="flex rounded-lg border border-stone-200 p-0.5 text-xs font-semibold">
          <button
            type="button"
            className={`rounded-md px-2 py-1 ${mode === "edit" ? "bg-[#12100e] text-[#f6f1e8]" : "text-stone-600"}`}
            onClick={() => setMode("edit")}
          >
            Edit
          </button>
          <button
            type="button"
            className={`rounded-md px-2 py-1 ${mode === "preview" ? "bg-[#12100e] text-[#f6f1e8]" : "text-stone-600"}`}
            onClick={() => setMode("preview")}
          >
            Preview
          </button>
        </div>
      </div>

      {mode === "edit" ? (
        <>
          <label htmlFor={`post-${post.id}`} className="sr-only">
            {post.label} draft
          </label>
          <textarea
            id={`post-${post.id}`}
            value={value}
            onChange={(event) => {
              onChange(event.target.value);
              setCopied(false);
              setCopyError(false);
            }}
            rows={12}
            className="mt-4 w-full flex-1 resize-y rounded-xl border border-stone-300 bg-white px-3.5 py-3 text-sm leading-6 text-stone-800 outline-none focus:border-[#b0894f] focus:ring-2 focus:ring-[rgba(176,137,79,0.25)]"
          />
          <p className="mt-2 text-xs text-stone-500">{value.length} characters</p>
        </>
      ) : (
        <div className="mt-4 flex-1 rounded-2xl border border-stone-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#12100e] text-xs font-semibold text-[#f6f1e8]">
              {initials || "LL"}
            </span>
            <div>
              <p className="text-sm font-semibold text-stone-900">
                {businessName || "Your business"}
              </p>
              <p className="text-xs text-stone-500">Preview · not published</p>
            </div>
          </div>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-stone-700">
            {value}
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button type="button" variant="secondary" className="px-4 py-2" onClick={handleCopy}>
          Copy to clipboard
        </Button>
        {copied ? (
          <p className="text-sm font-medium text-emerald-700" aria-live="polite">
            Copied
          </p>
        ) : null}
        {copyError ? (
          <p className="text-sm font-medium text-red-700" role="alert">
            Copy failed. Select the text and copy it manually.
          </p>
        ) : null}
      </div>
    </article>
  );
}
