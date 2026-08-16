"use client";

import type { Dispatch, FormEvent, SetStateAction } from "react";
import { Button } from "@/components/button";
import type { ToolDefinition } from "@/lib/tools";
import {
  FACEBOOK_STYLE_META,
  FACEBOOK_STYLES,
  POST_LENGTH_LABELS,
  POST_LENGTHS,
  TONE_HINTS,
  TONE_LABELS,
  TONES,
  type FacebookStyleId,
  type FieldErrors,
  type GeneratorFormValues,
} from "@/lib/types";

interface ToolFormProps {
  tool: ToolDefinition;
  values: GeneratorFormValues;
  errors: FieldErrors;
  loading: boolean;
  remembered: boolean;
  onChange: Dispatch<SetStateAction<GeneratorFormValues>>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
  onExample: () => void;
}

const fieldClass =
  "mt-2 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-stone-900 shadow-sm outline-none transition placeholder:text-stone-400 focus:ring-2 focus:ring-[rgba(30,58,52,0.25)]";

function fieldBorder(error?: string): string {
  return error
    ? "border-red-400 focus:border-red-500"
    : "border-stone-300 focus:border-[#1e3a34]";
}

export function ToolForm({
  tool,
  values,
  errors,
  loading,
  remembered,
  onChange,
  onSubmit,
  onReset,
  onExample,
}: ToolFormProps) {
  function update<K extends keyof GeneratorFormValues>(
    key: K,
    value: GeneratorFormValues[K],
  ) {
    onChange((current) => ({ ...current, [key]: value }));
  }

  function toggleStyle(style: FacebookStyleId) {
    onChange((current) => {
      const exists = current.facebookStyles.includes(style);
      return {
        ...current,
        facebookStyles: exists
          ? current.facebookStyles.filter((item) => item !== style)
          : [...current.facebookStyles, style],
      };
    });
  }

  const offerLabel =
    tool.slug === "notice"
      ? "Notice, change, or reminder"
      : "Product, service, offer, or promotion";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="paper-card rounded-sm border border-stone-200 p-6 sm:p-8"
      aria-describedby="generator-note"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-display text-2xl text-stone-900">Your details</h2>
          <p className="mt-1 text-sm text-stone-600">
            {remembered
              ? "Remembered in this browser tab so you can switch tools."
              : "Fill once, then move between tools without retyping."}
          </p>
        </div>
        <Button type="button" variant="ghost" className="px-3 py-2" onClick={onExample}>
          Fill example
        </Button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="businessName" className="text-sm font-medium text-stone-900">
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
          <label htmlFor="businessType" className="text-sm font-medium text-stone-900">
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
          <p id="businessType-hint" className="mt-2 text-xs text-stone-500">
            Describe what you do in a few words.
          </p>
          {errors.businessType ? (
            <p id="businessType-error" className="mt-2 text-sm text-red-700" role="alert">
              {errors.businessType}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="location" className="text-sm font-medium text-stone-900">
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
          <p id="location-hint" className="mt-2 text-xs text-stone-500">
            Use the place people would recognise.
          </p>
          {errors.location ? (
            <p id="location-error" className="mt-2 text-sm text-red-700" role="alert">
              {errors.location}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="callToAction" className="text-sm font-medium text-stone-900">
            Call to action <span className="font-normal text-stone-500">(optional)</span>
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
          <p id="callToAction-hint" className="mt-2 text-xs text-stone-500">
            Leave blank to use a careful default closing line.
          </p>
          {errors.callToAction ? (
            <p id="callToAction-error" className="mt-2 text-sm text-red-700" role="alert">
              {errors.callToAction}
            </p>
          ) : null}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="offer" className="text-sm font-medium text-stone-900">
            {offerLabel}
          </label>
          <textarea
            id="offer"
            name="offer"
            rows={3}
            value={values.offer}
            onChange={(event) => update("offer", event.target.value)}
            placeholder={
              tool.slug === "notice"
                ? "Closed this Thursday for training, back Friday morning"
                : "Weekend boiler checks, or sourdough loaves on Saturday"
            }
            className={`${fieldClass} ${fieldBorder(errors.offer)} min-h-[6rem] resize-y`}
            aria-invalid={Boolean(errors.offer)}
            aria-describedby={errors.offer ? "offer-error" : "offer-hint"}
            required
          />
          <p id="offer-hint" className="mt-2 text-xs text-stone-500">
            Stick to something already true. Do not add discounts or results you
            cannot support.
          </p>
          {errors.offer ? (
            <p id="offer-error" className="mt-2 text-sm text-red-700" role="alert">
              {errors.offer}
            </p>
          ) : null}
        </div>
        <fieldset className="md:col-span-2">
          <legend className="text-sm font-medium text-stone-900">Tone</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {TONES.map((tone) => {
              const selected = values.tone === tone;
              return (
                <label
                  key={tone}
                  className={`cursor-pointer rounded-xl border p-3 shadow-sm transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#1e3a34] ${
                    selected
                      ? "border-[#1e3a34] bg-[#f7f1e6]"
                      : "border-stone-200 bg-white hover:border-stone-300"
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
                  <span className="block text-sm font-semibold text-stone-900">
                    {TONE_LABELS[tone]}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-stone-600">
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

        {tool.slug === "facebook-post-generator" ? (
          <>
            <fieldset className="md:col-span-2">
              <legend className="text-sm font-medium text-stone-900">Post length</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {POST_LENGTHS.map((length) => {
                  const selected = values.length === length;
                  return (
                    <label
                      key={length}
                      className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-semibold has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#1e3a34] ${
                        selected
                          ? "border-[#1e3a34] bg-[#f7f1e6] text-stone-900"
                          : "border-stone-200 bg-white text-stone-800"
                      }`}
                    >
                      <input
                        type="radio"
                        name="length"
                        value={length}
                        checked={selected}
                        onChange={() => update("length", length)}
                        className="sr-only"
                      />
                      {POST_LENGTH_LABELS[length]}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <fieldset className="md:col-span-2">
              <legend className="text-sm font-medium text-stone-900">
                Facebook styles
              </legend>
              <p className="mt-1 text-xs text-stone-500">
                Choose as many as you want. Six is a useful pack.
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {FACEBOOK_STYLES.map((style) => {
                  const selected = values.facebookStyles.includes(style);
                  const meta = FACEBOOK_STYLE_META[style];
                  return (
                    <label
                      key={style}
                      className={`cursor-pointer rounded-xl border p-4 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#1e3a34] ${
                        selected
                          ? "border-[#1e3a34] bg-[#f7f1e6]"
                          : "border-stone-200 bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleStyle(style)}
                        className="sr-only"
                      />
                      <span className="block text-sm font-semibold text-stone-900">
                        {meta.label}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-stone-600">
                        {meta.summary}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.facebookStyles ? (
                <p className="mt-2 text-sm text-red-700" role="alert">
                  {errors.facebookStyles}
                </p>
              ) : null}
            </fieldset>
          </>
        ) : null}

        {tool.slug === "facebook-post-generator" || tool.slug === "instagram-captions" ? (
          <label className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-4 md:col-span-2">
            <input
              type="checkbox"
              checked={values.includeHashtags}
              onChange={(event) => update("includeHashtags", event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-stone-300 text-[#1e3a34] focus:ring-[#1e3a34]"
            />
            <span>
              <span className="block text-sm font-semibold text-stone-900">
                Add simple local hashtags
              </span>
              <span className="mt-1 block text-xs leading-5 text-stone-600">
                Uses your location, business type, and generic tags such as
                SmallBusiness. No invented trending topics.
              </span>
            </span>
          </label>
        ) : null}
      </div>

      <p id="generator-note" className="mt-6 text-sm leading-6 text-stone-600">
        {tool.extraHint} Drafts are built on this page from templates. Nothing is
        sent to an AI service.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button type="submit" disabled={loading}>
          {loading ? "Generating drafts" : tool.generateLabel}
        </Button>
        <Button type="button" variant="secondary" onClick={onReset} disabled={loading}>
          Reset
        </Button>
      </div>
    </form>
  );
}
