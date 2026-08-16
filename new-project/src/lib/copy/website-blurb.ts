import type { GeneratedPost, GeneratorFormValues } from "@/lib/types";
import { buildContext, hashSeed, joinParagraphs } from "@/lib/copy/engine";

export function generateWebsiteBlurbs(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "website");
  const ctx = buildContext(values, seed);

  const home = joinParagraphs(
    `${ctx.name} is ${ctx.aType} in ${ctx.location}.`,
    `We can help you understand ${ctx.offer} and whether it is a fit. This page does not replace a conversation about your specific situation.`,
    ctx.cta,
  );

  const about = joinParagraphs(
    `About ${ctx.name}`,
    `${ctx.name} is ${ctx.aType} serving people in and around ${ctx.location}. Our public information focuses on ${ctx.offer}.`,
    `We aim to explain clearly, confirm details before you rely on them, and avoid claims we cannot support. If you need something outside our work, we will say so.`,
    ctx.cta,
  );

  const footer = `${ctx.name} · ${ctx.type} in ${ctx.location} · ${ctx.offer}. ${ctx.cta}`;

  return [
    {
      id: "home",
      label: "Homepage intro",
      summary: "A short opening paragraph for a website.",
      text: home,
    },
    {
      id: "about",
      label: "About paragraph",
      summary: "A slightly longer about section.",
      text: about,
    },
    {
      id: "footer",
      label: "Footer line",
      summary: "One line for a footer or directory listing.",
      text: footer,
    },
  ];
}
