"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { GeneratorForm } from "@/components/generator/generator-form";
import { PostResultCard } from "@/components/generator/post-result-card";
import { generateFacebookPosts } from "@/lib/facebook-posts";
import type { FieldErrors, GeneratedPost, GeneratorFormValues } from "@/lib/types";
import { hasFieldErrors, sanitiseFormValues, validateGeneratorForm } from "@/lib/validation";

const emptyValues: GeneratorFormValues = {
  businessName: "",
  businessType: "",
  location: "",
  offer: "",
  tone: "friendly",
  callToAction: "",
};

type Status = "idle" | "loading" | "success" | "error";

export function FacebookPostGenerator() {
  const [values, setValues] = useState<GeneratorFormValues>(emptyValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [formMessage, setFormMessage] = useState<string>("");
  const resultsRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const statusId = useId();

  useEffect(() => {
    if (status !== "success") return;
    resultsRef.current?.focus();
  }, [status, posts]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function resetAll() {
    setValues(emptyValues);
    setErrors({});
    setStatus("idle");
    setPosts([]);
    setDrafts({});
    setFormMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    const nextErrors = validateGeneratorForm(values);
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

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      try {
        const generated = generateFacebookPosts(clean);
        const nextDrafts: Record<string, string> = {};
        for (const post of generated) {
          nextDrafts[post.id] = post.text;
        }
        setPosts(generated);
        setDrafts(nextDrafts);
        setStatus("success");
      } catch {
        setPosts([]);
        setDrafts({});
        setStatus("error");
        setFormMessage("The drafts could not be created. Please try again.");
      }
    }, 450);
  }

  return (
    <div className="space-y-8">
      <GeneratorForm
        values={values}
        errors={errors}
        loading={status === "loading"}
        onChange={setValues}
        onSubmit={handleSubmit}
        onReset={resetAll}
      />

      <div id={statusId} className="sr-only" aria-live="polite">
        {status === "loading" ? "Generating drafts" : null}
        {status === "success" ? "Three drafts are ready" : null}
      </div>

      {formMessage && status !== "success" ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {formMessage}
        </p>
      ) : null}

      {status === "idle" && posts.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">No drafts yet</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
            Complete the form and choose Generate three drafts. Your results will
            appear here as editable cards, each with a copy button.
          </p>
        </section>
      ) : null}

      {status === "loading" ? (
        <section
          className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm"
          aria-busy="true"
        >
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
          <h2 className="mt-4 text-lg font-semibold text-slate-900">Generating drafts</h2>
          <p className="mt-2 text-sm text-slate-600">
            Building three template posts from the details you entered.
          </p>
        </section>
      ) : null}

      {status === "error" ? (
        <section className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8" role="alert">
          <h2 className="text-lg font-semibold text-red-900">Something went wrong</h2>
          <p className="mt-2 text-sm leading-6 text-red-800">
            The generator could not finish. Check your details and try again. No
            data was sent to an external service.
          </p>
        </section>
      ) : null}

      {status === "success" ? (
        <section
          ref={resultsRef}
          tabIndex={-1}
          className="space-y-4 outline-none"
          aria-labelledby="results-heading"
        >
          <div>
            <h2 id="results-heading" className="text-xl font-semibold text-slate-900">
              Your three drafts
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Edit any card before copying. Check names, places, prices, and times.
              Template copy can still need a human pass.
            </p>
          </div>
          <div className="grid gap-6 xl:grid-cols-3">
            {posts.map((post) => (
              <PostResultCard
                key={post.id}
                post={post}
                value={drafts[post.id] ?? post.text}
                onChange={(value) =>
                  setDrafts((current) => ({ ...current, [post.id]: value }))
                }
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
