"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type SetStateAction,
} from "react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { ResultCard } from "@/components/tools/result-card";
import { ToolForm } from "@/components/tools/tool-form";
import { copyText } from "@/lib/clipboard";
import { generateForTool } from "@/lib/copy";
import { packDrafts, downloadText } from "@/lib/download";
import { EXAMPLE_PROFILE } from "@/lib/example-profile";
import {
  getProfileSnapshot,
  getServerProfileSnapshot,
  hydrateProfileStore,
  resetProfileStore,
  subscribeProfile,
  writeProfileStore,
} from "@/lib/profile-storage";
import { relatedTools, type ToolDefinition } from "@/lib/tools";
import type { FieldErrors, GeneratedPost, GeneratorFormValues } from "@/lib/types";
import { hasFieldErrors, sanitiseFormValues, validateGeneratorForm } from "@/lib/validation";

type Status = "idle" | "loading" | "success" | "error";

export function ToolStudio({ tool }: { tool: ToolDefinition }) {
  const values = useSyncExternalStore(
    subscribeProfile,
    getProfileSnapshot,
    getServerProfileSnapshot,
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [formMessage, setFormMessage] = useState("");
  const [copiedAll, setCopiedAll] = useState(false);
  const resultsRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const statusId = useId();
  const related = relatedTools(tool.slug);
  const remembered = Boolean(
    values.businessName || values.businessType || values.location || values.offer,
  );
  const liveSketch = useMemo(() => {
    if (hasFieldErrors(validateGeneratorForm(values, tool.slug))) return null;
    try {
      return generateForTool(tool.slug, sanitiseFormValues(values))[0] ?? null;
    } catch {
      return null;
    }
  }, [tool.slug, values]);

  useEffect(() => {
    hydrateProfileStore();
  }, []);

  function setValues(update: SetStateAction<GeneratorFormValues>) {
    const next = typeof update === "function" ? update(getProfileSnapshot()) : update;
    writeProfileStore(next);
  }

  useEffect(() => {
    if (status !== "success") return;
    resultsRef.current?.focus();
  }, [status, posts]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  function resetAll() {
    resetProfileStore();
    setErrors({});
    setStatus("idle");
    setPosts([]);
    setDrafts({});
    setFormMessage("");
  }

  function packedText() {
    return packDrafts(
      `${tool.name} — ${values.businessName}`,
      posts.map((post) => ({
        label: post.label,
        text: drafts[post.id] ?? post.text,
      })),
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    const nextErrors = validateGeneratorForm(values, tool.slug);
    setErrors(nextErrors);

    if (hasFieldErrors(nextErrors)) {
      setStatus("idle");
      setFormMessage("Please correct the highlighted fields before generating drafts.");
      return;
    }

    const clean = sanitiseFormValues(values);
    setValues(clean);
    setFormMessage("");
    setStatus("loading");

    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      try {
        const generated = generateForTool(tool.slug, clean);
        const nextDrafts: Record<string, string> = {};
        for (const post of generated) nextDrafts[post.id] = post.text;
        setPosts(generated);
        setDrafts(nextDrafts);
        setStatus("success");
      } catch {
        setPosts([]);
        setDrafts({});
        setStatus("error");
        setFormMessage("The drafts could not be created. Please try again.");
      }
    }, 420);
  }

  async function copyAll() {
    const ok = await copyText(packedText());
    setCopiedAll(ok);
    window.setTimeout(() => setCopiedAll(false), 2000);
  }

  return (
    <div className="border-b border-stone-200">
      <Container className="py-12 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#8c6a38]">
          {tool.category} · free tool
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
          {tool.name}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
          {tool.description}
        </p>

        <div className="mt-10">
          <ToolForm
            tool={tool}
            values={values}
            errors={errors}
            loading={status === "loading"}
            remembered={remembered}
            onChange={setValues}
            onSubmit={handleSubmit}
            onReset={resetAll}
            onExample={() =>
              writeProfileStore({
                ...EXAMPLE_PROFILE,
                facebookStyles: [...EXAMPLE_PROFILE.facebookStyles],
              })
            }
          />
        </div>

        {liveSketch ? (
          <aside className="paper-card mt-8 rounded-3xl border border-[rgba(176,137,79,0.35)] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8c6a38]">
              Live sketch
            </p>
            <h2 className="font-display mt-2 text-2xl text-stone-900">{liveSketch.label}</h2>
            <p className="mt-1 text-sm text-stone-600">{liveSketch.summary}</p>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-stone-800">
              {liveSketch.text}
            </p>
          </aside>
        ) : null}

        <div id={statusId} className="sr-only" aria-live="polite">
          {status === "loading" ? "Generating drafts" : null}
          {status === "success" ? `${posts.length} drafts are ready` : null}
        </div>

        {formMessage && status !== "success" ? (
          <p
            className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
          >
            {formMessage}
          </p>
        ) : null}

        {status === "idle" && posts.length === 0 ? (
          <section className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-[#fffcf7] px-6 py-10 text-center">
            <h2 className="font-display text-2xl text-stone-900">No drafts yet</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-stone-600">
              Complete the form, or fill the example, then generate. Results stay
              on this page until you reset.
            </p>
          </section>
        ) : null}

        {status === "loading" ? (
          <section
            className="mt-8 rounded-2xl border border-stone-200 bg-[#fffcf7] px-6 py-10 text-center"
            aria-busy="true"
          >
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#e6dccb] border-t-[#b0894f]" />
            <h2 className="mt-4 font-display text-2xl text-stone-900">Generating drafts</h2>
            <p className="mt-2 text-sm text-stone-600">
              Building template copy from the details you entered.
            </p>
          </section>
        ) : null}

        {status === "error" ? (
          <section className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-6 py-8" role="alert">
            <h2 className="text-lg font-semibold text-red-900">Something went wrong</h2>
            <p className="mt-2 text-sm leading-6 text-red-800">
              The generator could not finish. No data was sent to an external
              service.
            </p>
          </section>
        ) : null}

        {status === "success" ? (
          <section
            ref={resultsRef}
            tabIndex={-1}
            className="mt-10 space-y-4 outline-none"
            aria-labelledby="results-heading"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2
                  id="results-heading"
                  className="font-display text-2xl text-stone-900 sm:text-3xl"
                >
                  {tool.resultTitle}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                  Edit any card, switch to preview, then copy. Check names, places,
                  prices, and times before you publish.
                </p>
              </div>
              <div className="no-print flex flex-wrap gap-3">
                <Button type="button" variant="secondary" className="px-4 py-2" onClick={copyAll}>
                  {copiedAll ? "Copied pack" : "Copy all"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="px-4 py-2"
                  onClick={() =>
                    downloadText(
                      `${tool.slug}-${values.businessName || "drafts"}.txt`,
                      packedText(),
                    )
                  }
                >
                  Download .txt
                </Button>
              </div>
            </div>
            <div
              className={`grid gap-6 ${
                posts.length > 3 ? "xl:grid-cols-2" : "xl:grid-cols-3"
              }`}
            >
              {posts.map((post) => (
                <ResultCard
                  key={post.id}
                  post={post}
                  businessName={values.businessName}
                  value={drafts[post.id] ?? post.text}
                  onChange={(value) =>
                    setDrafts((current) => ({ ...current, [post.id]: value }))
                  }
                />
              ))}
            </div>
          </section>
        ) : null}

        <aside className="no-print mt-16">
          <h2 className="font-display text-2xl text-stone-900">More tools</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/tools/${item.slug}`}
                  className="paper-card block rounded-2xl border border-stone-200 p-4 hover:border-[#b0894f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b0894f]"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8c6a38]">
                    {item.category}
                  </p>
                  <p className="mt-1 font-display text-lg text-stone-900">{item.name}</p>
                  <p className="mt-1 text-sm text-stone-600">{item.tagline}</p>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </div>
  );
}
