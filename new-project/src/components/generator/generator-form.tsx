"use client";

import type { Dispatch, FormEvent, SetStateAction } from "react";
import { TONE_HINTS, TONES, TONE_LABELS, type FieldErrors, type GeneratorFormValues } from "@/lib/types";
import { Button } from "@/components/button";

interface GeneratorFormProps {
  values: GeneratorFormValues;
  errors: FieldErrors;
  loading: boolean;
  onChange: Dispatch<SetStateAction<GeneratorFormValues>>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
}

const fieldClass =
  "mt-2 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600/20";

function fieldBorder(error?: string): string {
  return error
    ? "border-red-400 focus:border-red-500"
    : "border-slate-300 focus:border-indigo-600";
}

export function GeneratorForm({
  values,
  errors,
  loading,
  onChange,
  onSubmit,
  onReset,
}: GeneratorFormProps) {
  function update<K extends keyof GeneratorFormValues>(
    key: K,
    value: GeneratorFormValues[K],
  ) {
    onChange((current) => ({ ...current, [key]: value }));
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      aria-describedby="generator-note"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="businessName" className="text-sm font-medium text-slate-900">
            Business name
          </label>
          <input
            id="businessName"
            name="businessName"
            autoComplete="organization"
            value={values.businessName}
            onChange={(event) => update("businessName", event.target.value)}
            className={`${fieldClass} ${fieldBorder(errors.businessName)}`}
            aria-invalid={Boolean(errors.businessName)}
            aria-describedby={errors.businessName ? "businessName-error" : undefined}
            required
          />
          {errors.businessName ? (
            <p id="businessName-error" className="mt-2 text-sm text-red-700" role="alert">
              {errors.businessName}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="businessType" className="text-sm font-medium text-slate-900">
            Business type
          </label>
          <input
            id="businessType"
            name="businessType"
            value={values.businessType}
            onChange={(event) => update("businessType", event.target.value)}
            placeholder="Cafe, plumber, salon, bookshop"
            className={`${fieldClass} ${fieldBorder(errors.businessType)}`}
            aria-invalid={Boolean(errors.businessType)}
            aria-describedby={
              errors.businessType ? "businessType-error" : "businessType-hint"
            }
            required
          />
          <p id="businessType-hint" className="mt-2 text-xs text-slate-500">
            Describe what you do in a few words.
          </p>
          {errors.businessType ? (
            <p id="businessType-error" className="mt-2 text-sm text-red-700" role="alert">
              {errors.businessType}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="location" className="text-sm font-medium text-slate-900">
            Town, city, or service area
          </label>
          <input
            id="location"
            name="location"
            value={values.location}
            onChange={(event) => update("location", event.target.value)}
            placeholder="Leeds, or North Cornwall"
            className={`${fieldClass} ${fieldBorder(errors.location)}`}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? "location-error" : "location-hint"}
            required
          />
          <p id="location-hint" className="mt-2 text-xs text-slate-500">
            Use the place people would recognise.
          </p>
          {errors.location ? (
            <p id="location-error" className="mt-2 text-sm text-red-700" role="alert">
              {errors.location}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="callToAction" className="text-sm font-medium text-slate-900">
            Call to action <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input
            id="callToAction"
            name="callToAction"
            value={values.callToAction}
            onChange={(event) => update("callToAction", event.target.value)}
            placeholder="Message us to book a visit"
            className={`${fieldClass} ${fieldBorder(errors.callToAction)}`}
            aria-invalid={Boolean(errors.callToAction)}
            aria-describedby={
              errors.callToAction ? "callToAction-error" : "callToAction-hint"
            }
          />
          <p id="callToAction-hint" className="mt-2 text-xs text-slate-500">
            Leave blank to use a careful default closing line.
          </p>
          {errors.callToAction ? (
            <p id="callToAction-error" className="mt-2 text-sm text-red-700" role="alert">
              {errors.callToAction}
            </p>
          ) : null}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="offer" className="text-sm font-medium text-slate-900">
            Product, service, offer, or promotion
          </label>
          <textarea
            id="offer"
            name="offer"
            rows={3}
            value={values.offer}
            onChange={(event) => update("offer", event.target.value)}
            placeholder="Weekend boiler checks, or sourdough loaves on Saturday"
            className={`${fieldClass} ${fieldBorder(errors.offer)} resize-y min-h-[6rem]`}
            aria-invalid={Boolean(errors.offer)}
            aria-describedby={errors.offer ? "offer-error" : "offer-hint"}
            required
          />
          <p id="offer-hint" className="mt-2 text-xs text-slate-500">
            Stick to something you already offer. Do not add discounts, guarantees,
            or results you cannot support.
          </p>
          {errors.offer ? (
            <p id="offer-error" className="mt-2 text-sm text-red-700" role="alert">
              {errors.offer}
            </p>
          ) : null}
        </div>
        <fieldset className="md:col-span-2">
          <legend className="text-sm font-medium text-slate-900">Tone</legend>
          <p className="mt-1 text-xs text-slate-500">
            This changes the wording, not the facts.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TONES.map((tone) => {
              const selected = values.tone === tone;
              return (
                <label
                  key={tone}
                  className={`cursor-pointer rounded-xl border p-4 shadow-sm transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-indigo-600 ${
                    selected
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="tone"
                    value={tone}
                    checked={selected}
                    onChange={() => update("tone", tone)}
                    className="sr-only"
                  />
                  <span className="block text-sm font-semibold text-slate-900">
                    {TONE_LABELS[tone]}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-600">
                    {TONE_HINTS[tone]}
                  </span>
                </label>
              );
            })}
          </div>
          {errors.tone ? (
            <p className="mt-2 text-sm text-red-700" role="alert">
              {errors.tone}
            </p>
          ) : null}
        </fieldset>
      </div>
      <p id="generator-note" className="mt-6 text-sm leading-6 text-slate-600">
        Drafts are built on this page from templates. Nothing is sent to an AI
        service. The same details always produce the same three posts.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button type="submit" disabled={loading}>
          {loading ? "Generating drafts" : "Generate three drafts"}
        </Button>
        <Button type="button" variant="secondary" onClick={onReset} disabled={loading}>
          Reset
        </Button>
      </div>
    </form>
  );
}
