import type { GeneratedPost, GeneratorFormValues } from "@/lib/types";
import { buildContext, hashSeed, joinParagraphs, pick } from "@/lib/copy/engine";

export function generateSeoBriefs(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "seo");
  const ctx = buildContext(values, seed);
  const town = ctx.location;
  const type = ctx.typeLower;

  const title = pick(
    [
      `${ctx.name} | ${ctx.type} in ${town}`,
      `${ctx.type} in ${town} | ${ctx.name}`,
      `${ctx.name} — ${type} serving ${town}`,
    ],
    seed,
    1,
  );

  const meta = joinParagraphs(
    `${ctx.name} is ${ctx.aType} in ${town}. This page covers ${ctx.offer}. Confirm current details before you visit or book.`,
  );

  const clusters = joinParagraphs(
    `Local search themes for ${ctx.name} (starting points, not guaranteed rankings):`,
    `1. ${type} ${town}\n2. ${type} near ${town}\n3. ${ctx.offer} ${town}\n4. ${ctx.name} ${town}\n5. ${type} in ${town} — enquire`,
    `Use these on your own pages and Google Business Profile. Do not stuff them into one sentence. Do not buy fake reviews to rank.`,
  );

  const gbp = joinParagraphs(
    `Google Business Profile checklist for ${ctx.name}:`,
    `• Name, type, and ${town} must match the sign and the website.\n• Categories: choose the real ${type} category, not a broader one you do not do.\n• Description: ${ctx.offer}, without awards or customer counts you cannot show.\n• Photos: your own, current, and honest.\n• Posts: use the Google listing drafts in this studio.\n• Reviews: ask only for honest ones. Never pay for stars.`,
    `This checklist does not log into Google for you. You still publish the changes.`,
  );

  const page = joinParagraphs(
    `Page brief: ${title}`,
    `H1: ${ctx.name} — ${ctx.aType} in ${town}.`,
    `Opening: who you are, where you are, and ${ctx.offer}.`,
    `Next: what a visitor should do (${ctx.cta}).`,
    `Do not add results, rankings, or “best in ${town}” unless you can prove it.`,
    `Meta description draft:\n${meta}`,
  );

  return [
    {
      id: "meta",
      label: "Title and meta",
      summary: "A search title and description. Check they match the live page.",
      text: joinParagraphs(`Title: ${title}`, `Meta description: ${meta}`),
    },
    {
      id: "clusters",
      label: "Local search themes",
      summary: "Keyword starting points from your town and type. Not a ranking promise.",
      text: clusters,
    },
    {
      id: "gbp",
      label: "Google Business checklist",
      summary: "Practical listing work you can do this week.",
      text: gbp,
    },
    {
      id: "page",
      label: "Page brief",
      summary: "A structure for one honest service or homepage.",
      text: page,
    },
  ];
}
