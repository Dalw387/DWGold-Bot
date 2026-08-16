import { generateAdsCopy } from "@/lib/copy/ads";
import { generateCampaignPack } from "@/lib/copy/campaign";
import { generateContentPlan } from "@/lib/copy/content-plan";
import { generateEmailUpdates } from "@/lib/copy/email-update";
import { generateFacebookPosts } from "@/lib/copy/facebook";
import { generateGoogleBusinessPosts } from "@/lib/copy/google-business";
import { generateInstagramCaptions } from "@/lib/copy/instagram";
import { generateNotices } from "@/lib/copy/notice";
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
import { generatePublicHomepage } from "@/lib/copy/public-site";
import { generateWebsiteBlurbs } from "@/lib/copy/website-blurb";
import { generateWhatsAppMessages } from "@/lib/copy/whatsapp";
import type { GeneratedPost, GeneratorFormValues, ToolSlug } from "@/lib/types";

export function generateForTool(
  slug: ToolSlug,
  values: GeneratorFormValues,
): GeneratedPost[] {
  switch (slug) {
    case "facebook-post-generator":
      return generateFacebookPosts(values);
    case "instagram-captions":
      return generateInstagramCaptions(values);
    case "google-business-post":
      return generateGoogleBusinessPosts(values);
    case "whatsapp-message":
      return generateWhatsAppMessages(values);
    case "content-plan":
      return generateContentPlan(values);
    case "review-request":
      return generateReviewRequests(values);
    case "website-blurb":
      return [...generatePublicHomepage(values), ...generateWebsiteBlurbs(values)];
    case "notice":
      return generateNotices(values);
    case "email-update":
      return generateEmailUpdates(values);
    case "review-reply":
      return generateReviewReplies(values);
    case "ads-copy":
      return generateAdsCopy(values);
    case "seo-brief":
      return generateSeoBriefs(values);
    case "campaign-pack":
      return generateCampaignPack(values);
    case "referral-ask":
      return generateReferralAsks(values);
    case "follow-up":
      return generateFollowUps(values);
    case "window-card":
      return generateWindowCards(values);
    case "phone-script":
      return generatePhoneScripts(values);
    case "neighbour-intro":
      return generateNeighbourIntros(values);
    case "customer-plan":
      return generateCustomerPlan(values);
    case "enquiry-reply":
      return generateEnquiryReplies(values);
    case "after-job":
      return generateAfterJob(values);
    case "quiet-week":
      return generateQuietWeek(values);
    default: {
      const exhaustive: never = slug;
      throw new Error(`Unknown tool: ${exhaustive}`);
    }
  }
}

export { generateFacebookPosts };
