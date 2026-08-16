/** Named desks for the public offer. Jobs people understand — not “AI agent” jargon. */

export const outcomes = [
  {
    title: "Get more enquiries",
    body: "A public page, a listing, and posts that ask. Strangers cannot buy from a login wall.",
  },
  {
    title: "Turn messages into bookings",
    body: "The first reply, the booking reply, and the phone lines — written before the lead goes cold.",
  },
  {
    title: "Catch the missed call",
    body: "Closed voicemail, a same-day text, a morning callback. You send them. The job is not lost by default.",
  },
  {
    title: "Ask for the Google review",
    body: "SMS and email after the job, plus how to copy your real Google link. You send it from your phone.",
  },
  {
    title: "Make ad spend land",
    body: "Google and Meta ads copy, pointed at an open page. The desk does not spend a penny.",
  },
  {
    title: "Get found in your town",
    body: "Local titles, search themes, and a Google Business checklist. We write the page. We do not sell a ranking.",
  },
];

export const pipeline = [
  {
    step: "Find",
    title: "Who should hear about you",
    body: "A 14-day plan, neighbour introductions, and referral asks from people you already helped.",
  },
  {
    step: "Advertise",
    title: "Words for Google and Meta",
    body: "Headlines, primary text, and a campaign structure. You paste them. You set the budget.",
  },
  {
    step: "Engage",
    title: "Something true to post",
    body: "Facebook, Instagram, listing updates, and a week of starting posts from the same facts.",
  },
  {
    step: "Qualify",
    title: "The reply that wins the job",
    body: "First reply, price-question reply, booking reply. No invented prices.",
  },
  {
    step: "Follow",
    title: "The quiet work after",
    body: "Thank-you, review ask, one-neighbour referral, missed-call text, honest quiet-week fill.",
  },
  {
    step: "Count",
    title: "Only real people",
    body: "Enquiry, message, call, visit, sale. You type the row. Zero is allowed.",
  },
];

export const deskTeam = [
  {
    name: "Alex",
    role: "Lead desk",
    outcome: "Find more customers",
    does: "Writes the 14-day plan, referral asks, neighbour introductions, follow-ups, and the daily habit that turns drafts into enquiries.",
    doesNot: "Does not scrape the internet, invent prospects, or send outreach for you.",
    rooms: "14-day plan, referral ask, neighbour introduction, follow-up desk, quiet week",
  },
  {
    name: "Charlie",
    role: "Appointment desk",
    outcome: "Turn enquiries into bookings",
    does: "Writes the first reply, the honest price-question reply, the booking reply, phone and voicemail lines, and the missed-call text.",
    doesNot: "Does not answer the live phone, check a diary, or book people for you.",
    rooms: "Enquiry reply, phone and voicemail, off-hours, after the job",
  },
  {
    name: "Sophie",
    role: "Social desk",
    outcome: "Stay active where neighbours already look",
    does: "Writes Facebook posts, Instagram captions, Google listing updates, WhatsApp notes, and a seven-day starting plan.",
    doesNot: "Does not publish, watch Instagram DMs, or run comment-to-DM bots.",
    rooms: "Facebook, Instagram, Google Business, WhatsApp, seven-day plan",
  },
  {
    name: "Max",
    role: "Advertising desk",
    outcome: "Make the ad spend work harder",
    does: "Writes Google Ads lines and Facebook/Instagram ads copy, plus a campaign structure with geo, offer, and action. Human strategy. Desk execution of the words.",
    doesNot: "Does not log into Ads Manager, set a budget, or spend a penny.",
    rooms: "Ads copy desk, Google Ads agent, Meta ads agent",
  },
  {
    name: "Grace",
    role: "Front desk",
    outcome: "Reply in minutes, not tomorrow",
    does: "Writes the Google review ask, how to copy your review link, calm review replies, closed voicemail, and off-hours texts.",
    doesNot: "Does not send SMS, log into Google, or sit on the phone twenty-four hours a day.",
    rooms: "Google review desk, review replies, off-hours and missed calls",
  },
  {
    name: "Scout",
    role: "Search desk",
    outcome: "Get found by people in your town",
    does: "Writes a public homepage a stranger can read, local titles, search themes, and a Google Business checklist.",
    doesNot: "Does not rank you in ChatGPT, Gemini, or Google AI Overviews. That is a later product, not this desk.",
    rooms: "Website copy, local SEO brief, locked-door check",
  },
] as const;

export const tradesWeFit = [
  "Trades",
  "Home improvements",
  "Roofing",
  "Solar",
  "Estate agents",
  "Dental",
  "Beauty clinics",
  "Gyms",
  "Coaches",
  "Solicitors",
  "Mortgage advisers",
  "Car dealers",
  "Cafes and shops",
  "Marketing agencies",
];
