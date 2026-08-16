import type { GeneratedPost, GeneratorFormValues } from "@/lib/types";
import { buildContext, hashSeed, joinParagraphs } from "@/lib/copy/engine";

export function generatePublicHomepage(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "public-site");
  const ctx = buildContext(values, seed);

  const homepage = joinParagraphs(
    ctx.name,
    `${ctx.aType.replace(/^./, (letter) => letter.toUpperCase())} in ${ctx.location}.`,
    `This page is for people who do not already have a login. It explains ${ctx.offer} in plain language.`,
    `We do not promise results, income, or rankings here. If you want to know whether this is a fit, ${ctx.cta.replace(/\.$/, "").toLowerCase()}.`,
    `If you already work with us, use your usual contact route. This public page is for first-time visitors.`,
  );

  const unlock = joinParagraphs(
    `Public-site note for ${ctx.name}`,
    `A stranger from Google or an ad must be able to read who you are, where you are, and how to enquire — without creating an account.`,
    `If the first screen is a login form, paid ads and SEO will send people to a locked door. Put the homepage copy on a public URL, then keep any member area behind a sign-in.`,
    `Suggested public H1: ${ctx.name} — ${ctx.typeLower} in ${ctx.location}.`,
    `Suggested next step on that page: ${ctx.cta}`,
  );

  return [
    {
      id: "public-home",
      label: "Public homepage",
      summary: "Copy for a page anyone can read. Do not hide this behind a login.",
      text: homepage,
    },
    {
      id: "unlock",
      label: "Locked-door check",
      summary: "If ads or search send people to a login wall, they will not enquire.",
      text: unlock,
    },
  ];
}
