import type { GeneratedPost, GeneratorFormValues, Tone } from "./types";

interface CopyContext {
  name: string;
  type: string;
  typeLower: string;
  aType: string;
  location: string;
  offer: string;
  cta: string;
}

function articleFor(word: string): string {
  return /^[aeiou]/i.test(word.trim()) ? "an" : "a";
}

function withStop(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function hashSeed(values: GeneratorFormValues): number {
  const source = [
    values.businessName,
    values.businessType,
    values.location,
    values.offer,
    values.tone,
    values.callToAction,
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

function pick<T>(items: readonly T[], seed: number, salt: number): T {
  return items[(seed + salt) % items.length];
}

function joinParagraphs(...parts: string[]): string {
  return parts
    .map((part) => part.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n\n");
}

function fallbackCta(tone: Tone, seed: number): string {
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
  };

  return pick(options[tone], seed, 11);
}

function buildContext(values: GeneratorFormValues, seed: number): CopyContext {
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

function neighbourhoodCopy(ctx: CopyContext, tone: Tone, seed: number): string {
  const openers: Record<Tone, readonly string[]> = {
    friendly: [
      `Hello from ${ctx.name} in ${ctx.location}.`,
      `A quick hello from ${ctx.name}, ${ctx.aType} in ${ctx.location}.`,
      `If you live or work near ${ctx.location}, this is ${ctx.name}.`,
    ],
    professional: [
      `${ctx.name}, ${ctx.aType} serving ${ctx.location}, has a short update.`,
      `This notice is from ${ctx.name} in ${ctx.location}.`,
      `${ctx.name} would like to share a local update with ${ctx.location}.`,
    ],
    energetic: [
      `${ctx.name} in ${ctx.location} has a local update to share.`,
      `A fresh note from ${ctx.name}, ${ctx.aType} in ${ctx.location}.`,
      `${ctx.location}, this is ${ctx.name} with something useful to mention.`,
    ],
    informative: [
      `Local update from ${ctx.name} (${ctx.type}, ${ctx.location}).`,
      `${ctx.name} in ${ctx.location} is sharing a neighbourhood note.`,
      `For people in and around ${ctx.location}: a brief update from ${ctx.name}.`,
    ],
  };

  const middles: Record<Tone, readonly string[]> = {
    friendly: [
      `We are ${ctx.aType}, and we wanted neighbours to know about ${ctx.offer}. This is a simple update from us, not a promise about results or a claim we cannot back up.`,
      `We thought it might help to mention ${ctx.offer}. If that is relevant to you, we are happy to explain what is actually available.`,
      `We are here in ${ctx.location} and can talk you through ${ctx.offer} without the hard sell.`,
    ],
    professional: [
      `We provide ${ctx.typeLower} services and would like to make people aware of ${ctx.offer}. Please treat this as an information update rather than a guarantee.`,
      `Our current focus is ${ctx.offer}. Availability, prices, and timings should be confirmed with us before you plan around them.`,
      `This message is to inform local customers about ${ctx.offer}. We will confirm the practical details when you contact us.`,
    ],
    energetic: [
      `We wanted ${ctx.location} to know about ${ctx.offer}. Come and ask us questions — we would rather give you straight answers than big claims.`,
      `Here is the news: ${ctx.offer}. If that sounds like it could help, we are ready to talk it through.`,
      `We are putting ${ctx.offer} in front of local people who might need ${ctx.aType}. No pressure, just an update.`,
    ],
    informative: [
      `${ctx.name} is ${ctx.aType} in ${ctx.location}. This post covers ${ctx.offer}. Check with us for anything that can change, such as times or prices.`,
      `Summary: a local ${ctx.typeLower} update about ${ctx.offer}. We can confirm details on request.`,
      `If you need ${ctx.aType} nearby, we can discuss ${ctx.offer} and tell you what we can and cannot do.`,
    ],
  };

  return joinParagraphs(
    pick(openers[tone], seed, 3),
    pick(middles[tone], seed, 7),
    ctx.cta,
  );
}

function offerCopy(ctx: CopyContext, tone: Tone, seed: number): string {
  const openers: Record<Tone, readonly string[]> = {
    friendly: [
      `${ctx.name} here, with a useful note about ${ctx.offer}.`,
      `We wanted to tell you about ${ctx.offer} at ${ctx.name} in ${ctx.location}.`,
      `If you have been looking for ${ctx.offer}, ${ctx.name} can help you look at the options.`,
    ],
    professional: [
      `${ctx.name} is making customers aware of ${ctx.offer}.`,
      `Please see this update from ${ctx.name} regarding ${ctx.offer}.`,
      `${ctx.name} in ${ctx.location} has information about ${ctx.offer}.`,
    ],
    energetic: [
      `${ctx.name} has an update: ${ctx.offer}.`,
      `New note from the team at ${ctx.name}: ${ctx.offer}.`,
      `${ctx.offer} is what we want ${ctx.location} to know about today.`,
    ],
    informative: [
      `Subject: ${ctx.offer} at ${ctx.name}, ${ctx.location}.`,
      `Details from ${ctx.name} about ${ctx.offer}.`,
      `${ctx.name} can provide information on ${ctx.offer}.`,
    ],
  };

  const middles: Record<Tone, readonly string[]> = {
    friendly: [
      `We are ${ctx.aType} in ${ctx.location}. If you would like to know whether this suits you, ask us. We will not invent prices, reviews, or special terms in a social post.`,
      `This is for people who already want ${ctx.offer} or are considering it. We are glad to explain the basics and leave the decision with you.`,
      `Save this post if you need a local ${ctx.typeLower}. When you are ready, we can talk about ${ctx.offer} in plain language.`,
    ],
    professional: [
      `We operate as ${ctx.aType} in ${ctx.location}. This post describes ${ctx.offer} in general terms. Specific terms should be confirmed directly with us.`,
      `Customers should verify current availability before travelling or booking. This update does not include offers we have not stated here.`,
      `For clarity: this is an announcement about ${ctx.offer}, not a comparison with other businesses and not a performance claim.`,
    ],
    energetic: [
      `We are ${ctx.aType} based around ${ctx.location}, and ${ctx.offer} is the thing we want on your radar. Ask us the awkward questions — that is how you get a useful answer.`,
      `If ${ctx.offer} is on your list, we can walk you through it. We will keep the facts honest and skip the slogans.`,
      `Share this with someone in ${ctx.location} who has been looking for ${ctx.aType}. Then send us a message if you want the real details.`,
    ],
    informative: [
      `What we can say here: ${ctx.name} is ${ctx.aType} in ${ctx.location}, and this update concerns ${ctx.offer}. What we will not do is add extra claims, ratings, or guarantees.`,
      `Use this post as a starting point. Confirm hours, cost, and suitability with ${ctx.name} before you make a plan.`,
      `Key point: ${ctx.offer}. Next step: contact ${ctx.name} for information that can be checked.`,
    ],
  };

  return joinParagraphs(
    pick(openers[tone], seed, 13),
    pick(middles[tone], seed, 17),
    ctx.cta,
  );
}

function helpfulCopy(ctx: CopyContext, tone: Tone, seed: number): string {
  const openers: Record<Tone, readonly string[]> = {
    friendly: [
      `Not sure who to ask in ${ctx.location}? ${ctx.name} is ${ctx.aType} and we are happy to help you understand ${ctx.offer}.`,
      `A few words from ${ctx.name} if you are new to the area or new to ${ctx.typeLower} services.`,
      `We know choosing ${ctx.aType} can feel like a lot of tabs and guesswork. Here is a straightforward introduction.`,
    ],
    professional: [
      `${ctx.name} is ${ctx.aType} in ${ctx.location}. This post explains how we can help with ${ctx.offer}.`,
      `Introduction: ${ctx.name} provides ${ctx.typeLower} support in ${ctx.location}, including information about ${ctx.offer}.`,
      `For residents and businesses in ${ctx.location}, ${ctx.name} is available to discuss ${ctx.offer}.`,
    ],
    energetic: [
      `If you need ${ctx.aType} in ${ctx.location}, start with a conversation at ${ctx.name}.`,
      `Let us introduce ourselves: ${ctx.name}, ${ctx.aType}, talking about ${ctx.offer}.`,
      `${ctx.location} — if ${ctx.offer} has been on your mind, ${ctx.name} can help you sort fact from noise.`,
    ],
    informative: [
      `About ${ctx.name}: ${ctx.aType} in ${ctx.location}, sharing information on ${ctx.offer}.`,
      `Who we are: ${ctx.name}. What this post covers: ${ctx.offer}. Where: ${ctx.location}.`,
      `A practical introduction to ${ctx.offer} from ${ctx.name}.`,
    ],
  };

  const middles: Record<Tone, readonly string[]> = {
    friendly: [
      `Tell us what you need and we will tell you what we can do. If we cannot help, we will say so. That is more useful than a polished advert.`,
      `We can talk through ${ctx.offer} in everyday language. Bring your questions about timing, budget, or whether it is even the right fit.`,
      `No invented testimonials and no pressure. Just ${ctx.aType} in ${ctx.location} keeping people informed about ${ctx.offer}.`,
    ],
    professional: [
      `Please use this channel for general information. Final details such as scheduling, pricing, and scope should be agreed with ${ctx.name} directly.`,
      `We recommend comparing options and reading any terms before you proceed. This post is educational and promotional in a limited, factual sense only.`,
      `Our aim is to describe ${ctx.offer} clearly. We do not provide financial, legal, or other regulated advice in Facebook posts.`,
    ],
    energetic: [
      `Bring the messy questions. We would rather pause and check than publish something we cannot stand behind.`,
      `If ${ctx.offer} is relevant, we will help you understand the next practical step. If it is not, we will not pretend otherwise.`,
      `Show this to a friend in ${ctx.location} who actually needs ${ctx.aType}. Then come to us for details we can confirm.`,
    ],
    informative: [
      `Limitations of this post: it cannot give personalised advice, live stock levels, or prices unless we have stated them ourselves. Ask ${ctx.name} for those.`,
      `Recommended next step: contact ${ctx.name} with your location, timing, and what you need from ${ctx.offer}.`,
      `This is an information post from ${ctx.aType} in ${ctx.location}. Treat social media copy as a draft until the business confirms it.`,
    ],
  };

  return joinParagraphs(
    pick(openers[tone], seed, 19),
    pick(middles[tone], seed, 23),
    ctx.cta,
  );
}

export function generateFacebookPosts(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values);
  const ctx = buildContext(values, seed);

  return [
    {
      id: "neighbourhood",
      label: "Neighbourhood update",
      summary: "A local note aimed at people in the area.",
      text: neighbourhoodCopy(ctx, values.tone, seed),
    },
    {
      id: "offer",
      label: "Offer update",
      summary: "A direct post about the product, service, or promotion.",
      text: offerCopy(ctx, values.tone, seed),
    },
    {
      id: "helpful",
      label: "Helpful introduction",
      summary: "A clearer explanation of who the business is and how to enquire.",
      text: helpfulCopy(ctx, values.tone, seed),
    },
  ];
}
