import type {
  FacebookStyleId,
  GeneratedPost,
  GeneratorFormValues,
  PostLength,
  Tone,
} from "@/lib/types";
import { FACEBOOK_STYLE_META } from "@/lib/types";
import {
  buildContext,
  extraLongNote,
  joinParagraphs,
  pick,
  type CopyContext,
  hashSeed,
  withHashtags,
} from "@/lib/copy/engine";

function clipForLength(
  parts: string[],
  ctx: CopyContext,
  tone: Tone,
  length: PostLength,
  seed: number,
): string {
  if (length === "short") {
    return joinParagraphs(parts[0], ctx.cta);
  }
  if (length === "long") {
    return joinParagraphs(...parts, extraLongNote(ctx, tone, seed), ctx.cta);
  }
  return joinParagraphs(...parts, ctx.cta);
}

function neighbourhood(ctx: CopyContext, tone: Tone, seed: number): string[] {
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
    reassuring: [
      `A calm note from ${ctx.name} in ${ctx.location}.`,
      `${ctx.name} is ${ctx.aType} nearby, and we wanted to keep this simple.`,
      `For neighbours in ${ctx.location}, a straightforward update from ${ctx.name}.`,
    ],
  };
  const middles: Record<Tone, readonly string[]> = {
    friendly: [
      `We are ${ctx.aType}, and we wanted neighbours to know about ${ctx.offer}. This is a simple update, not a promise about results.`,
      `We thought it might help to mention ${ctx.offer}. If that is relevant, we are happy to explain what is actually available.`,
      `We are here in ${ctx.location} and can talk you through ${ctx.offer} without the hard sell.`,
    ],
    professional: [
      `We provide ${ctx.typeLower} services and would like to make people aware of ${ctx.offer}. Please treat this as information rather than a guarantee.`,
      `Our current focus is ${ctx.offer}. Availability, prices, and timings should be confirmed with us before you plan around them.`,
      `This message is to inform local customers about ${ctx.offer}. We will confirm practical details when you contact us.`,
    ],
    energetic: [
      `We wanted ${ctx.location} to know about ${ctx.offer}. Come and ask questions — we would rather give straight answers than big claims.`,
      `Here is the news: ${ctx.offer}. If that sounds useful, we are ready to talk it through.`,
      `We are putting ${ctx.offer} in front of local people who might need ${ctx.aType}. No pressure, just an update.`,
    ],
    informative: [
      `${ctx.name} is ${ctx.aType} in ${ctx.location}. This post covers ${ctx.offer}. Check with us for anything that can change, such as times or prices.`,
      `Summary: a local ${ctx.typeLower} update about ${ctx.offer}. We can confirm details on request.`,
      `If you need ${ctx.aType} nearby, we can discuss ${ctx.offer} and tell you what we can and cannot do.`,
    ],
    reassuring: [
      `If you have been meaning to look into ${ctx.offer}, we can go through it at a sensible pace. No invented urgency.`,
      `We know choosing ${ctx.aType} can feel like a lot of noise. This is only an update about ${ctx.offer}.`,
      `Take your time. ${ctx.offer} may or may not be right for you, and that is fine to work out together.`,
    ],
  };
  return [pick(openers[tone], seed, 3), pick(middles[tone], seed, 7)];
}

function offer(ctx: CopyContext, tone: Tone, seed: number): string[] {
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
      `A note from the team at ${ctx.name}: ${ctx.offer}.`,
      `${ctx.offer} is what we want ${ctx.location} to know about today.`,
    ],
    informative: [
      `Subject: ${ctx.offer} at ${ctx.name}, ${ctx.location}.`,
      `Details from ${ctx.name} about ${ctx.offer}.`,
      `${ctx.name} can provide information on ${ctx.offer}.`,
    ],
    reassuring: [
      `A practical update about ${ctx.offer} from ${ctx.name}.`,
      `If ${ctx.offer} has been on your mind, here is a careful note from ${ctx.name}.`,
      `${ctx.name} can talk through ${ctx.offer} without rushing you.`,
    ],
  };
  const middles: Record<Tone, readonly string[]> = {
    friendly: [
      `We are ${ctx.aType} in ${ctx.location}. Ask us whether this suits you. We will not invent prices, reviews, or special terms in a social post.`,
      `This is for people who already want ${ctx.offer} or are considering it. We will explain the basics and leave the decision with you.`,
      `Save this post if you need a local ${ctx.typeLower}. When you are ready, we can talk about ${ctx.offer} in plain language.`,
    ],
    professional: [
      `We operate as ${ctx.aType} in ${ctx.location}. This post describes ${ctx.offer} in general terms. Specific terms should be confirmed with us.`,
      `Please verify current availability before travelling or booking. This update does not include offers we have not stated here.`,
      `This is an announcement about ${ctx.offer}, not a comparison with other businesses and not a performance claim.`,
    ],
    energetic: [
      `We are ${ctx.aType} based around ${ctx.location}, and ${ctx.offer} is the thing we want on your radar. Ask the awkward questions.`,
      `If ${ctx.offer} is on your list, we can walk you through it. We will keep the facts honest and skip the slogans.`,
      `Share this with someone in ${ctx.location} who has been looking for ${ctx.aType}. Then message us if you want the real details.`,
    ],
    informative: [
      `${ctx.name} is ${ctx.aType} in ${ctx.location}, and this update concerns ${ctx.offer}. We will not add ratings or guarantees.`,
      `Use this post as a starting point. Confirm hours, cost, and suitability with ${ctx.name} before you make a plan.`,
      `Key point: ${ctx.offer}. Next step: contact ${ctx.name} for information that can be checked.`,
    ],
    reassuring: [
      `Nothing here is meant to hurry you. If ${ctx.offer} is relevant, we can explain it clearly. If it is not, we will say so.`,
      `Bring the constraints you already have — budget, timing, or access — and we will work with the facts.`,
      `A good ${ctx.typeLower} conversation should reduce uncertainty. That is the aim of this note about ${ctx.offer}.`,
    ],
  };
  return [pick(openers[tone], seed, 13), pick(middles[tone], seed, 17)];
}

function helpful(ctx: CopyContext, tone: Tone, seed: number): string[] {
  const openers: Record<Tone, readonly string[]> = {
    friendly: [
      `Not sure who to ask in ${ctx.location}? ${ctx.name} is ${ctx.aType} and we can help you understand ${ctx.offer}.`,
      `A few words from ${ctx.name} if you are new to the area or new to ${ctx.typeLower} services.`,
      `Choosing ${ctx.aType} can feel like guesswork. Here is a straightforward introduction.`,
    ],
    professional: [
      `${ctx.name} is ${ctx.aType} in ${ctx.location}. This post explains how we can help with ${ctx.offer}.`,
      `Introduction: ${ctx.name} provides ${ctx.typeLower} support in ${ctx.location}, including information about ${ctx.offer}.`,
      `For people in ${ctx.location}, ${ctx.name} is available to discuss ${ctx.offer}.`,
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
    reassuring: [
      `If you prefer to understand things before you commit, this introduction from ${ctx.name} is for you.`,
      `We will not pretend ${ctx.offer} is simple if it is not. We will explain it in order.`,
      `${ctx.name} in ${ctx.location} can help you get your bearings around ${ctx.offer}.`,
    ],
  };
  const middles: Record<Tone, readonly string[]> = {
    friendly: [
      `Tell us what you need and we will tell you what we can do. If we cannot help, we will say so.`,
      `We can talk through ${ctx.offer} in everyday language. Bring questions about timing, budget, or fit.`,
      `No invented testimonials and no pressure. Just ${ctx.aType} in ${ctx.location} keeping people informed about ${ctx.offer}.`,
    ],
    professional: [
      `Please use this channel for general information. Scheduling, pricing, and scope should be agreed with ${ctx.name} directly.`,
      `Compare options and read any terms before you proceed. This post is a limited, factual announcement.`,
      `Our aim is to describe ${ctx.offer} clearly. We do not provide financial, legal, or other regulated advice in Facebook posts.`,
    ],
    energetic: [
      `Bring the messy questions. We would rather pause and check than publish something we cannot stand behind.`,
      `If ${ctx.offer} is relevant, we will help you understand the next practical step. If it is not, we will not pretend otherwise.`,
      `Show this to a friend in ${ctx.location} who actually needs ${ctx.aType}. Then come to us for details we can confirm.`,
    ],
    informative: [
      `This post cannot give personalised advice, live stock levels, or prices unless we have stated them. Ask ${ctx.name} for those.`,
      `Recommended next step: contact ${ctx.name} with your location, timing, and what you need from ${ctx.offer}.`,
      `Treat social media copy as a draft until the business confirms it.`,
    ],
    reassuring: [
      `You do not have to decide from a Facebook post. Use this as a map, then ask ${ctx.name} the questions that still matter.`,
      `If anything here is unclear, that is useful information. Tell us the unclear bit and we will try to make it plainer.`,
      `A careful enquiry about ${ctx.offer} is always in order. We will match that care.`,
    ],
  };
  return [pick(openers[tone], seed, 19), pick(middles[tone], seed, 23)];
}

function question(ctx: CopyContext, tone: Tone, seed: number): string[] {
  const openers: Record<Tone, readonly string[]> = {
    friendly: [
      `A genuine question from ${ctx.name} in ${ctx.location}.`,
      `We are curious, not fishing for compliments.`,
    ],
    professional: [
      `${ctx.name} would value practical local input.`,
      `A short question for people in ${ctx.location}.`,
    ],
    energetic: [
      `${ctx.location}, we have a real question.`,
      `Help us understand what would actually be useful.`,
    ],
    informative: [
      `Question from ${ctx.name} (${ctx.type}, ${ctx.location}).`,
      `We are gathering ordinary local questions about ${ctx.offer}.`,
    ],
    reassuring: [
      `No need to perform a glowing review. A plain answer is enough.`,
      `A gentle question from ${ctx.name}.`,
    ],
  };
  const middles: Record<Tone, readonly string[]> = {
    friendly: [
      `When you think about ${ctx.offer}, what do you wish a local ${ctx.typeLower} would explain first? Reply if you like, or send a private message.`,
      `Is ${ctx.offer} something people in ${ctx.location} actually want more information on, or are we talking about the wrong thing? Honest answers welcome.`,
    ],
    professional: [
      `Which details about ${ctx.offer} would help you decide: timing, cost, suitability, or something else? We can then explain those points more clearly.`,
      `If you have used ${ctx.aType} in ${ctx.location} before, what information was missing at the start? We are listening.`,
    ],
    energetic: [
      `What would make a post about ${ctx.offer} actually useful to you? Tell us in a word or a sentence.`,
      `Are you hunting for ${ctx.offer} in ${ctx.location} right now, or just keeping an eye on it? Either is fine — it helps us write better updates.`,
    ],
    informative: [
      `Please comment with the question you would ask ${ctx.aType} about ${ctx.offer}. We may answer in a later post if we can do so accurately.`,
      `Which fact should appear first in an update about ${ctx.offer}: where we are, what it is, or how to enquire?`,
    ],
    reassuring: [
      `If you are unsure about ${ctx.offer}, what would make the next step feel safer? You can reply here or message us privately.`,
      `Would a slower, more detailed explanation of ${ctx.offer} help, or do you already know what you need?`,
    ],
  };
  return [pick(openers[tone], seed, 29), pick(middles[tone], seed, 31)];
}

function behindTheScenes(ctx: CopyContext, tone: Tone, seed: number): string[] {
  const openers: Record<Tone, readonly string[]> = {
    friendly: [
      `A quieter note from ${ctx.name}.`,
      `Not a big announcement — just a look at the work.`,
    ],
    professional: [
      `${ctx.name} is sharing a brief operational note.`,
      `Behind the public update: how we approach ${ctx.offer}.`,
    ],
    energetic: [
      `A peek at ordinary working life at ${ctx.name}.`,
      `This is the unglamorous bit, and it matters.`,
    ],
    informative: [
      `Process note from ${ctx.name} in ${ctx.location}.`,
      `What “doing the work” looks like for ${ctx.aType}.`,
    ],
    reassuring: [
      `We thought a calmer, behind-the-scenes note might help.`,
      `No drama, just how we handle ${ctx.offer}.`,
    ],
  };
  const middles: Record<Tone, readonly string[]> = {
    friendly: [
      `Most days at ${ctx.name} are about the basics: listening, checking details, and doing ${ctx.offer} properly. That is less exciting than a slogan, and more useful.`,
      `We will not invent a cinematic story. The real work of ${ctx.aType} in ${ctx.location} is usually careful and repetitive, and that is the point.`,
    ],
    professional: [
      `Our work on ${ctx.offer} starts with understanding the request, then confirming what we can deliver. Social media cannot replace that conversation.`,
      `Quality for ${ctx.aType} is mostly preparation and honest scope. This post is a reminder of that, not a case study.`,
    ],
    energetic: [
      `If you only see the finished update about ${ctx.offer}, you miss the checking, the questions, and the “let us confirm that”. That is the job.`,
      `We like the part where someone in ${ctx.location} asks a precise question and we can answer it. That is the behind-the-scenes we are proud of.`,
    ],
    informative: [
      `Typical sequence: enquiry, clarification, confirmed details, then ${ctx.offer} if it is a fit. Timescales vary and should be agreed, not assumed from this post.`,
      `This is not a tour, a secret, or a guarantee. It is a description of ordinary ${ctx.typeLower} work in ${ctx.location}.`,
    ],
    reassuring: [
      `If you worry that businesses skip the careful bit, know that we treat ${ctx.offer} as something to get right, not something to rush past.`,
      `You are allowed to ask how we work. A good ${ctx.typeLower} should be able to explain the steps without theatre.`,
    ],
  };
  return [pick(openers[tone], seed, 37), pick(middles[tone], seed, 39)];
}

function reminder(ctx: CopyContext, tone: Tone, seed: number): string[] {
  const openers: Record<Tone, readonly string[]> = {
    friendly: [
      `A gentle reminder from ${ctx.name} in ${ctx.location}.`,
      `If you saved our last post, here is a quieter follow-up.`,
    ],
    professional: [
      `${ctx.name} is recirculating information about ${ctx.offer}.`,
      `Reminder for existing and local customers.`,
    ],
    energetic: [
      `Still relevant: ${ctx.offer} at ${ctx.name}.`,
      `A nudge, not a shout, from ${ctx.location}.`,
    ],
    informative: [
      `Reminder: ${ctx.name} can discuss ${ctx.offer}.`,
      `Follow-up information from ${ctx.name}.`,
    ],
    reassuring: [
      `No alarm, just a reminder that we are here.`,
      `If you were waiting for a quieter moment, this is it.`,
    ],
  };
  const middles: Record<Tone, readonly string[]> = {
    friendly: [
      `If ${ctx.offer} is still on your list, we remain ${ctx.aType} in ${ctx.location}. If it is not, you can ignore this with our blessing.`,
      `We know feeds move quickly. This is the same honest update: ${ctx.offer}, details on request.`,
    ],
    professional: [
      `Please treat this as a repeat of previously shared information, not a new promotion unless we have stated one.`,
      `Availability can change. Confirm with ${ctx.name} before you travel or make plans around ${ctx.offer}.`,
    ],
    energetic: [
      `If you meant to message us about ${ctx.offer} and life got busy, the door is still open.`,
      `Same facts, shorter reminder: ${ctx.name}, ${ctx.aType}, ${ctx.location}, happy to talk about ${ctx.offer}.`,
    ],
    informative: [
      `Unchanged from our earlier note: we can provide information on ${ctx.offer}. Check anything time-sensitive with us.`,
      `This reminder does not add extra claims. It restates that ${ctx.name} is a local option for ${ctx.offer}.`,
    ],
    reassuring: [
      `There is no deadline in this post unless we have given you one separately. When you are ready, we can talk about ${ctx.offer}.`,
      `If the first post felt like a lot, this is the short version: we are here, and we can go slowly.`,
    ],
  };
  return [pick(openers[tone], seed, 43), pick(middles[tone], seed, 47)];
}

function education(ctx: CopyContext, tone: Tone, seed: number): string[] {
  const openers: Record<Tone, readonly string[]> = {
    friendly: [
      `A small, useful note from ${ctx.name}.`,
      `Something we are often asked, answered carefully.`,
    ],
    professional: [
      `Educational note from ${ctx.name} about ${ctx.offer}.`,
      `General information for people considering ${ctx.aType}.`,
    ],
    energetic: [
      `A practical tip — not a trick, not a secret.`,
      `Let’s make ${ctx.offer} less confusing.`,
    ],
    informative: [
      `Explainer: ${ctx.offer}, from ${ctx.name} in ${ctx.location}.`,
      `General guidance only, from ${ctx.aType}.`,
    ],
    reassuring: [
      `You do not need to already be an expert.`,
      `A calm explainer from ${ctx.name}.`,
    ],
  };
  const middles: Record<Tone, readonly string[]> = {
    friendly: [
      `Before you decide anything about ${ctx.offer}, write down what you actually need, your timing, and your limits. Then ask ${ctx.aType} to work from that list. It prevents guesswork.`,
      `A useful habit: ask what is included, what is not, and what might change. That applies to ${ctx.offer} as much as anything else.`,
    ],
    professional: [
      `General principle: confirm scope, cost, and timing in writing where appropriate. A Facebook post is not a specification for ${ctx.offer}.`,
      `People often mix up marketing language with facts. For ${ctx.offer}, ask for the facts first: what, when, where, and how to proceed.`,
    ],
    energetic: [
      `The smartest question you can ask a ${ctx.typeLower} about ${ctx.offer} is “what would you need from me to give an accurate answer?” It saves everyone a loop.`,
      `If a post (including this one) sounds vague, ask for the missing detail. Vagueness is a cue, not a vibe.`,
    ],
    informative: [
      `This explainer is general. It is not personal advice. For ${ctx.offer} in ${ctx.location}, ${ctx.name} can discuss your situation separately.`,
      `Checklist: identify the need, note constraints, ask ${ctx.name} what they can confirm, then decide. Skip any step that involves invented claims.`,
    ],
    reassuring: [
      `If ${ctx.offer} feels technical, ask us to explain it twice. A careful ${ctx.typeLower} should not mind.`,
      `You are allowed to say “I do not understand that bit.” That is how ${ctx.offer} becomes clearer.`,
    ],
  };
  return [pick(openers[tone], seed, 53), pick(middles[tone], seed, 59)];
}

function shortPunchy(ctx: CopyContext, tone: Tone, seed: number): string[] {
  const lines: Record<Tone, readonly string[]> = {
    friendly: [
      `${ctx.name} in ${ctx.location}. ${ctx.aType}, happy to talk about ${ctx.offer}.`,
      `Local note: ${ctx.offer} at ${ctx.name}. Message us if useful.`,
    ],
    professional: [
      `${ctx.name} (${ctx.type}, ${ctx.location}) can provide information on ${ctx.offer}.`,
      `Update: ${ctx.offer}. Confirm details with ${ctx.name}.`,
    ],
    energetic: [
      `${ctx.location}: ${ctx.name} is here for ${ctx.offer}. Ask us anything practical.`,
      `${ctx.offer}. That is the update from ${ctx.name}.`,
    ],
    informative: [
      `${ctx.name} | ${ctx.location} | ${ctx.offer}. Enquire for current details.`,
      `Fact: ${ctx.name} is ${ctx.aType}. Topic: ${ctx.offer}.`,
    ],
    reassuring: [
      `${ctx.name} can talk through ${ctx.offer} at a steady pace. ${ctx.location}.`,
      `No rush. ${ctx.offer}, explained by ${ctx.name} when you are ready.`,
    ],
  };
  return [pick(lines[tone], seed, 61)];
}

const writers: Record<FacebookStyleId, (ctx: CopyContext, tone: Tone, seed: number) => string[]> = {
  neighbourhood,
  offer,
  helpful,
  question,
  "behind-the-scenes": behindTheScenes,
  reminder,
  education,
  short: shortPunchy,
};

export function generateFacebookPosts(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "facebook");
  const ctx = buildContext(values, seed);
  const styles =
    values.facebookStyles.length > 0 ? values.facebookStyles : (["neighbourhood", "offer", "helpful"] as FacebookStyleId[]);

  return styles.map((style, index) => {
    const parts = writers[style](ctx, values.tone, seed + index * 17);
    const body = clipForLength(parts, ctx, values.tone, values.length, seed + index);
    const meta = FACEBOOK_STYLE_META[style];
    return {
      id: style,
      label: meta.label,
      summary: meta.summary,
      text: withHashtags(body, ctx, values.includeHashtags),
    };
  });
}
