import type { GeneratedPost, GeneratorFormValues } from "@/lib/types";
import { buildContext, hashSeed, joinParagraphs, pick, withHashtags } from "@/lib/copy/engine";

export function generateInstagramCaptions(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "instagram");
  const ctx = buildContext(values, seed);
  const tone = values.tone;

  const feed = joinParagraphs(
    pick(
      [
        `${ctx.name}, ${ctx.aType} in ${ctx.location}.`,
        `From ${ctx.name} in ${ctx.location}.`,
        `A still note from ${ctx.location}: ${ctx.name}.`,
      ],
      seed,
      2,
    ),
    pick(
      [
        `Today’s useful mention is ${ctx.offer}. If you want details, the caption is not a substitute for a real answer — message us.`,
        `We can talk about ${ctx.offer} in plain language. Save this if you need ${ctx.aType} later.`,
        `This is an update, not a contest. ${ctx.offer} may help some people in ${ctx.location}; it will not be right for everyone.`,
      ],
      seed,
      5,
    ),
    ctx.cta,
  );

  const carousel = joinParagraphs(
    `Slide-style caption for ${ctx.name}`,
    `1. Who: ${ctx.name}, ${ctx.aType} in ${ctx.location}.\n2. What this is about: ${ctx.offer}.\n3. What to do next: ${ctx.cta}`,
    tone === "informative" || tone === "professional"
      ? "Keep extra claims off the slides unless you can show them."
      : "Keep it honest on every slide. If a fact is missing, say so.",
  );

  const story = joinParagraphs(
    pick(
      [
        `${ctx.name} here. ${ctx.offer}.`,
        `${ctx.location}: ${ctx.offer} from ${ctx.name}.`,
        `Quick story text: ${ctx.aType} in ${ctx.location}, talking about ${ctx.offer}.`,
      ],
      seed,
      8,
    ),
    ctx.cta,
  );

  return [
    {
      id: "feed",
      label: "Feed caption",
      summary: "A main Instagram caption you can paste under a photo you already have.",
      text: withHashtags(feed, ctx, values.includeHashtags),
    },
    {
      id: "carousel",
      label: "Carousel outline",
      summary: "A structured caption if you are posting more than one image.",
      text: withHashtags(carousel, ctx, values.includeHashtags),
    },
    {
      id: "story",
      label: "Story text",
      summary: "Shorter wording for a story slide. Add your own photo separately.",
      text: story,
    },
  ];
}
