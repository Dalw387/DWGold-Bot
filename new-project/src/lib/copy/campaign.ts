import { generateAdsCopy } from "@/lib/copy/ads";
import { generateContentPlan } from "@/lib/copy/content-plan";
import { generateEmailUpdates } from "@/lib/copy/email-update";
import { generateFacebookPosts } from "@/lib/copy/facebook";
import { generateGoogleBusinessPosts } from "@/lib/copy/google-business";
import { generateInstagramCaptions } from "@/lib/copy/instagram";
import { generateNotices } from "@/lib/copy/notice";
import { generatePublicHomepage } from "@/lib/copy/public-site";
import {
  generateAfterJob,
  generateCustomerPlan,
  generateEnquiryReplies,
  generateFollowUps,
  generateNeighbourIntros,
  generatePhoneScripts,
  generateQuietWeek,
  generateReferralAsks,
  generateWindowCards,
} from "@/lib/copy/outreach";
import { generateReviewReplies } from "@/lib/copy/review-reply";
import { generateReviewRequests } from "@/lib/copy/review-request";
import { generateSeoBriefs } from "@/lib/copy/seo";
import { generateWebsiteBlurbs } from "@/lib/copy/website-blurb";
import { generateWhatsAppMessages } from "@/lib/copy/whatsapp";
import type { GeneratedPost, GeneratorFormValues } from "@/lib/types";

function first(
  labelPrefix: string,
  posts: GeneratedPost[],
): GeneratedPost | null {
  const post = posts[0];
  if (!post) return null;
  return {
    id: `${labelPrefix}-${post.id}`,
    label: `${labelPrefix}: ${post.label}`,
    summary: post.summary,
    text: post.text,
  };
}

export function generateCampaignPack(values: GeneratorFormValues): GeneratedPost[] {
  const pieces = [
    first("Public site", generatePublicHomepage(values)),
    first("Facebook", generateFacebookPosts(values)),
    first("Instagram", generateInstagramCaptions(values)),
    first("Google listing", generateGoogleBusinessPosts(values)),
    first("WhatsApp", generateWhatsAppMessages(values)),
    first("Email", generateEmailUpdates(values)),
    first("Website", generateWebsiteBlurbs(values)),
    first("SEO", generateSeoBriefs(values)),
    first("Ads", generateAdsCopy(values)),
    first("Review ask", generateReviewRequests(values)),
    first("Review reply", generateReviewReplies(values)),
    first("Notice", generateNotices(values)),
    first("Week plan", generateContentPlan(values)),
    first("Referral", generateReferralAsks(values)),
    first("Follow-up", generateFollowUps(values)),
    first("Print", generateWindowCards(values)),
    first("Phone", generatePhoneScripts(values)),
    first("Neighbour", generateNeighbourIntros(values)),
    first("14-day plan", generateCustomerPlan(values)),
    first("Enquiry reply", generateEnquiryReplies(values)),
    first("After the job", generateAfterJob(values)),
    first("Quiet week", generateQuietWeek(values)),
  ].filter((item): item is GeneratedPost => Boolean(item));

  return [
    {
      id: "cover",
      label: "Campaign cover note",
      summary: "What this pack is, and what it is not.",
      text: [
        `Campaign pack for ${values.businessName} (${values.businessType}, ${values.location}).`,
        `Offer used: ${values.offer}.`,
        "Each card is a starting draft from the studio. Edit facts before you publish or spend.",
        "This pack does not place ads, change your website, or record leads. Use House Operations and the proof ledger for that next step.",
      ].join("\n\n"),
    },
    ...pieces,
  ];
}
