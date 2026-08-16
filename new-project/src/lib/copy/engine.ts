import type { GeneratorFormValues, Tone } from "@/lib/types";

export interface CopyContext {
  name: string;
  type: string;
  typeLower: string;
  aType: string;
  location: string;
  offer: string;
  cta: string;
}

export function articleFor(word: string): string {
  return /^[aeiou]/i.test(word.trim()) ? "an" : "a";
}

export function withStop(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

export function hashSeed(values: GeneratorFormValues, extra = ""): number {
  const source = [
    values.businessName,
    values.businessType,
    values.location,
    values.offer,
    values.tone,
    values.callToAction,
    values.length,
    values.includeHashtags ? "tags" : "plain",
    values.facebookStyles.join(","),
    extra,
  ]
    .join("|")
    .toLowerCase();

  let hash = 2166136261;
  for (let i = 0; i < source.length; i += 1) {
    hash ^= source.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function pick<T>(items: readonly T[], seed: number, salt: number): T {
  return items[(seed + salt) % items.length];
}

export function joinParagraphs(...parts: string[]): string {
  return parts
    .map((part) => part.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n\n");
}

export function fallbackCta(tone: Tone, seed: number): string {
  const options: Record<Tone, readonly string[]> = {
    friendly: [
      "If this would help, send a message and we can share the current details.",
      "Pop us a message if you would like to know more.",
      "You are welcome to get in touch if this is useful.",
    ],
    professional: [
      "Please get in touch if you would like further information.",
      "Enquire with us for current details, times, and availability.",
      "Contact the business directly if you would like to know more.",
    ],
    energetic: [
      "Send a message if you would like the latest details.",
      "Get in touch and we will talk you through what is available.",
      "Message us if you want to know more.",
    ],
    informative: [
      "Ask us for current prices, times, and availability.",
      "Contact us if you need details before you decide.",
      "Get in touch for information we can confirm.",
    ],
    reassuring: [
      "If you would like a calm, practical conversation first, we are here.",
      "No rush. Get in touch when you want details we can confirm.",
      "Send a message if a careful explanation would help.",
    ],
  };

  return pick(options[tone], seed, 11);
}

export function buildContext(values: GeneratorFormValues, seed: number): CopyContext {
  const type = values.businessType;
  const cta = values.callToAction
    ? withStop(values.callToAction)
    : fallbackCta(values.tone, seed);

  return {
    name: values.businessName,
    type,
    typeLower: type.toLowerCase(),
    aType: `${articleFor(type)} ${type.toLowerCase()}`,
    location: values.location,
    offer: values.offer,
    cta,
  };
}

export function toHashtag(value: string): string {
  const compact = value.replace(/[^a-zA-Z0-9]+/g, "");
  if (compact.length < 2 || compact.length > 32) return "";
  return `#${compact}`;
}

export function localHashtags(ctx: CopyContext): string {
  const tags = [
    toHashtag(ctx.location),
    toHashtag(ctx.type),
    "#SmallBusiness",
    "#LocalBusiness",
  ].filter(Boolean);
  return Array.from(new Set(tags)).join(" ");
}

export function withHashtags(text: string, ctx: CopyContext, enabled: boolean): string {
  if (!enabled) return text;
  return `${text}\n\n${localHashtags(ctx)}`;
}

export function extraLongNote(ctx: CopyContext, tone: Tone, seed: number): string {
  const options: Record<Tone, readonly string[]> = {
    friendly: [
      `If you are comparing options, bring your questions about ${ctx.offer}. We would rather say “we need to check” than guess.`,
      `A useful next step is to tell us roughly what you need, and when. Then we can say whether ${ctx.name} is a fit.`,
    ],
    professional: [
      `Before visiting or booking, confirm opening times, cost, and whether ${ctx.offer} is currently available.`,
      `This copy is a draft for local awareness. It is not a contract, quotation, or regulated advice.`,
    ],
    energetic: [
      `If you share this with someone in ${ctx.location} who actually needs ${ctx.aType}, that is more useful than a generic like.`,
      `We can talk through ${ctx.offer} in plain language. Keep the slogans for someone else.`,
    ],
    informative: [
      `Facts to confirm with ${ctx.name}: whether ${ctx.offer} is available, what it costs, and when you can access it.`,
      `Social posts go out of date. Treat this as a starting point and verify details with the business.`,
    ],
    reassuring: [
      `If you feel unsure, that is a good reason to ask. A careful ${ctx.typeLower} conversation should leave you clearer, not pressured.`,
      `We can go step by step. Start with what you already know about ${ctx.offer}, and we will fill the gaps we can.`,
    ],
  };
  return pick(options[tone], seed, 41);
}
