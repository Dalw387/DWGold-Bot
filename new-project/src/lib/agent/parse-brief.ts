import type { GeneratorFormValues, Tone } from "@/lib/types";
import { compactText } from "@/lib/validation";

const TYPES = [
  "gold trading education",
  "trading education",
  "cafe",
  "coffee shop",
  "bakery",
  "plumber",
  "electrician",
  "salon",
  "barber",
  "bookshop",
  "restaurant",
  "florist",
  "gym",
  "clinic",
  "dentist",
  "garage",
  "cleaner",
  "builder",
  "photographer",
  "studio",
];

export interface BriefParse {
  patch: Partial<GeneratorFormValues>;
  summary: string[];
}

export function parseBrief(input: string): BriefParse {
  const text = compactText(input);
  const lower = text.toLowerCase();
  const patch: Partial<GeneratorFormValues> = {};
  const summary: string[] = [];

  const named = text.match(
    /(?:called|named|i run|i own|we are|this is)\s+([A-Z][\w'&]*(?:\s+[A-Z][\w'&]*){0,4})/,
  );
  if (named?.[1]) {
    patch.businessName = named[1].replace(/[.,]+$/, "");
    summary.push(`Business name: ${patch.businessName}`);
  } else {
    const isA = text.match(
      /^([A-Z][\w'&]*(?:\s+[A-Z&\w']+){0,4})\s+is\s+(?:a|an)\s+/ ,
    );
    if (isA?.[1]) {
      patch.businessName = compactText(isA[1]);
      summary.push(`Business name: ${patch.businessName}`);
    } else {
      const quoted = text.match(/[“"]([^”"]{2,80})[”"]/);
      if (quoted?.[1]) {
        patch.businessName = compactText(quoted[1]);
        summary.push(`Business name: ${patch.businessName}`);
      }
    }
  }

  const location = text.match(
    /\b(?:in|near|around|serving)\s+([A-Z][\w']*(?:\s+[A-Z][\w']*){0,3})\b/,
  );
  if (location?.[1] && !/^(I|We|The)$/.test(location[1])) {
    patch.location = location[1];
    summary.push(`Area: ${patch.location}`);
  }

  for (const type of TYPES) {
    if (lower.includes(type)) {
      patch.businessType = type;
      summary.push(`Type: ${type}`);
      break;
    }
  }
  if (!patch.businessType) {
    const aType = lower.match(/\b(?:a|an)\s+([a-z][a-z\s]{2,40}?)(?:\s+in\s+|\s+offering\b|,|\.|$)/);
    if (aType?.[1]) {
      patch.businessType = compactText(aType[1]);
      summary.push(`Type: ${patch.businessType}`);
    }
  }

  const offer = text.match(
    /\b(?:offering|offer|we do|we sell|we make|specialising in|specializing in)\s+(.{8,180}?)(?:\.|$)/i,
  );
  if (offer?.[1]) {
    patch.offer = compactText(offer[1]);
    summary.push(`Offer: ${patch.offer}`);
  }

  const cta = text.match(
    /\b(message us|get in touch|book a visit|call us|enquire|send a message)(.{0,40})/i,
  );
  if (cta) {
    patch.callToAction = compactText(cta[0]);
    summary.push(`Call to action: ${patch.callToAction}`);
  }

  for (const tone of ["friendly", "professional", "energetic", "informative", "reassuring"] as const) {
    if (lower.includes(tone)) {
      patch.tone = tone;
      summary.push(`Tone: ${tone}`);
      break;
    }
  }

  if (lower.includes("hashtag")) patch.includeHashtags = true;

  return { patch, summary };
}

export function applyBrief(
  current: GeneratorFormValues,
  patch: Partial<GeneratorFormValues>,
): GeneratorFormValues {
  return {
    ...current,
    ...patch,
    facebookStyles: [...(patch.facebookStyles ?? current.facebookStyles)],
  };
}

export function detectTone(text: string): Tone | undefined {
  const lower = text.toLowerCase();
  if (lower.includes("professional")) return "professional";
  if (lower.includes("energetic")) return "energetic";
  if (lower.includes("informative")) return "informative";
  if (lower.includes("reassuring") || lower.includes("calm")) return "reassuring";
  if (lower.includes("friendly")) return "friendly";
  return undefined;
}
