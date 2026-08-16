"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { copyText } from "@/lib/clipboard";
import type { GeneratedPost } from "@/lib/types";

interface PostResultCardProps {
  post: GeneratedPost;
  value: string;
  onChange: (value: string) => void;
}

export function PostResultCard({ post, value, onChange }: PostResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

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
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{post.label}</h3>
          <p className="mt-1 text-sm text-slate-600">{post.summary}</p>
        </div>
      </div>
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
        className="mt-4 w-full flex-1 resize-y rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-3 text-sm leading-6 text-slate-800 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
      />
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
