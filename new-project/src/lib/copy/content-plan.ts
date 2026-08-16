import type { GeneratedPost, GeneratorFormValues } from "@/lib/types";
import { FACEBOOK_STYLE_META, type FacebookStyleId } from "@/lib/types";
import { generateFacebookPosts } from "@/lib/copy/facebook";

const WEEK: { day: string; style: FacebookStyleId }[] = [
  { day: "Monday", style: "neighbourhood" },
  { day: "Tuesday", style: "education" },
  { day: "Wednesday", style: "offer" },
  { day: "Thursday", style: "question" },
  { day: "Friday", style: "behind-the-scenes" },
  { day: "Saturday", style: "helpful" },
  { day: "Sunday", style: "reminder" },
];

export function generateContentPlan(values: GeneratorFormValues): GeneratedPost[] {
  return WEEK.map(({ day, style }) => {
    const [post] = generateFacebookPosts({
      ...values,
      facebookStyles: [style],
      length: "short",
    });
    const meta = FACEBOOK_STYLE_META[style];
    return {
      id: day.toLowerCase(),
      label: `${day}: ${meta.label}`,
      summary: `A ${day} starting point. ${meta.summary} Edit dates and facts before you schedule anything.`,
      text: `${day}\n${post.text}`,
    };
  });
}
