import { industries, workforceAgents } from "@/lib/workforce";

export type CommercialPage = {
  slug: string;
  title: string;
  eyebrow: string;
  heading: string;
  lead: string;
  body: string[];
  fit: string;
};

export const commercialPages: CommercialPage[] = [
  {
    slug: "ai-marketing-team",
    eyebrow: "The house",
    title: "AI marketing team",
    heading: "A marketing department for businesses that cannot miss a lead.",
    lead: "LocalLaunch is an AI marketing workforce: named specialists for leads, ads, social, appointments, reviews and search. Built for small and mid-sized firms — trades, clinics, estate agents, legal and financial services.",
    body: [
      "The long-term product is a department that works around the clock. What you can buy today is the full writing house: twenty-four rooms and eight named desks, £197 once.",
      "They write from the facts you type. You send the work. That is how we keep the price a one-off instead of a monthly software bill, and how we stay honest about what is live.",
    ],
    fit: "If every enquiry matters, you need the whole path — not a caption box.",
  },
  {
    slug: "ai-lead-generation-agent",
    eyebrow: "Alex · Lead Agent",
    title: "AI lead generation agent",
    heading: "Never stop prospecting — starting with the people who already know you.",
    lead: "Most local books fill from neighbours, referrals and follow-ups, not from a scraped spreadsheet. Alex writes the 14-day plan, the referral ask, the neighbour introduction and the quiet follow-up.",
    body: [
      "That is lead generation a tradesperson, clinic or adviser can actually use this week.",
      "Alex does not scrape the internet or invent prospects. Live outbound to strangers is a later product. Today you get the work that turns people you already met into the next job.",
    ],
    fit: "For businesses where one extra job covers the desk.",
  },
  {
    slug: "ai-appointment-setter",
    eyebrow: "Charlie · Appointment Agent",
    title: "AI appointment setter",
    heading: "Turn interest into meetings before the lead goes cold.",
    lead: "Charlie writes the first reply, the honest price-question reply, the booking reply, phone and voicemail lines, and the missed-call text.",
    body: [
      "Business owners understand this instantly: the enquiry that waited until morning is often already with someone else.",
      "Charlie does not answer the live phone or book a diary unaided. You send the words. Firms that connect the phone often charge a setup fee and a monthly retainer. This is the pack, £197 as part of the full team.",
    ],
    fit: "Trades, clinics, estate agents, solicitors, mortgage advisers.",
  },
  {
    slug: "ai-social-media-agent",
    eyebrow: "Sophie · Social Agent",
    title: "AI social media agent",
    heading: "Always present where neighbours already look.",
    lead: "Sophie writes Facebook posts, Instagram captions, Google listing updates, WhatsApp notes and a seven-day starting plan from one set of facts.",
    body: [
      "The money is not “AI makes Instagram posts.” The money is converting conversations into customers. Sophie writes the post and the first reply. You still publish and you still send the message.",
      "Sophie does not watch live DMs or run comment-to-DM bots. Those connections are the later workforce.",
    ],
    fit: "Clinics, trades, agents, and any firm that goes quiet on Facebook.",
  },
  {
    slug: "ai-google-ads-agent",
    eyebrow: "Max · Google Ads",
    title: "AI Google Ads agent",
    heading: "Campaigns watched in copy — you still hold the budget.",
    lead: "Max writes responsive search ad lines, keyword themes and a campaign structure: geo, offer, action.",
    body: [
      "Human strategy. Desk execution of the words. Max does not log into Google Ads, set a budget, or spend a penny.",
      "Point the ads at a public page Scout writes. Ads sent to a login wall waste money.",
    ],
    fit: "Any firm already paying Google, or about to.",
  },
  {
    slug: "ai-meta-ads-agent",
    eyebrow: "Mia · Meta Ads",
    title: "AI Meta ads agent",
    heading: "Facebook and Instagram ads copy, without handing over the account.",
    lead: "Mia writes primary text, headlines and a structure for Facebook and Instagram ads.",
    body: [
      "Creative variety matters. The desk gives you drafts to test. You paste them. You set the limit.",
      "Mia does not log into Ads Manager or detect live creative fatigue inside Meta. That is the later product.",
    ],
    fit: "Clinics, home improvement, local retail, agents.",
  },
  {
    slug: "ai-customer-service-agent",
    eyebrow: "Grace · Customer Agent",
    title: "AI customer service agent",
    heading: "Every enquiry answered — including the one that rang off.",
    lead: "Grace writes the Google review ask, how to copy your real review link, calm review replies, closed voicemail and off-hours texts.",
    body: [
      "This is not a live receptionist. It is the words so a missed call is not a lost job, and so a finished job is asked for an honest review.",
      "You send them from your phone. We do not log into Google.",
    ],
    fit: "Trades and clinics, first.",
  },
  {
    slug: "ai-search-visibility-agent",
    eyebrow: "Scout · Search Agent",
    title: "AI search visibility agent",
    heading: "Get found by people in your town.",
    lead: "Scout writes a public homepage a stranger can read, local titles, search themes and a Google Business checklist.",
    body: [
      "Tomorrow’s customers will also ask ChatGPT and Gemini. That visibility product is not included today, and we will not sell it as if it is.",
      "Today Scout stops the most expensive leak: ads and search sending people to a locked page.",
    ],
    fit: "Any business whose site currently greets strangers with a login.",
  },
  ...industries.map((item) => ({
    slug: item.slug,
    eyebrow: "Industry",
    title: item.name,
    heading: item.intent,
    lead: `LocalLaunch is an AI marketing workforce for ${item.name.toLowerCase()}. Every lead matters. The team writes the work to get found, asked, followed up, and booked.`,
    body: [
      "Start with Grace and Charlie: the Google review after the job, and the missed-call text. Then Scout’s public page so ads can land. Then Max and Mia for the words you paste into Google and Meta.",
      "£197 once for the full team of desks. You stay the publisher. Live phone and Ads Manager connections are the long-term workforce — not this purchase.",
    ],
    fit: item.intent,
  })),
];

export function commercialBySlug(slug: string): CommercialPage | undefined {
  return commercialPages.find((page) => page.slug === slug);
}

export const commercialSlugs = commercialPages.map((page) => page.slug);

export const workforceAgentSlugs = workforceAgents.map((agent) => agent.slug);
