import { DEFAULT_FACEBOOK_STYLES, type GeneratorFormValues } from "@/lib/types";

function profile(
  businessName: string,
  businessType: string,
  location: string,
  offer: string,
  callToAction: string,
): GeneratorFormValues {
  return {
    businessName,
    businessType,
    location,
    offer,
    tone: "professional",
    callToAction,
    length: "standard",
    includeHashtags: false,
    facebookStyles: [...DEFAULT_FACEBOOK_STYLES],
  };
}

export type IndustryBiz = {
  id: string;
  name: string;
  href?: string;
  enquiry: string;
  values: GeneratorFormValues;
};

export type IndustryCategory = {
  id: string;
  label: string;
  businesses: IndustryBiz[];
};

export const industryCategories: IndustryCategory[] = [
  {
    id: "trades",
    label: "Trades",
    businesses: [
      {
        id: "roofer",
        name: "Roofers",
        href: "/ai-marketing-for-roofers",
        enquiry: "Hi, we’ve got water coming through the ceiling after last night’s rain.",
        values: profile("Ridge & Rain", "roofing", "Manchester", "roof repairs and new roofs", "Call or message for a quote"),
      },
      {
        id: "builder",
        name: "Builders",
        href: "/ai-marketing-for-builders",
        enquiry: "Can you quote an extension in Beeston this month?",
        values: profile("Ash & Lime", "building", "Nottingham", "extensions and repairs", "Message for a site visit"),
      },
      {
        id: "electrician",
        name: "Electricians",
        enquiry: "Consumer unit needs replacing. Are you available this week?",
        values: profile("North Circuit", "electrician", "Leeds", "rewires and consumer units", "Call for a visit"),
      },
      {
        id: "plumber",
        name: "Plumbers",
        enquiry: "No hot water this morning. Can anyone come today?",
        values: profile("Clearflow", "plumber", "Bristol", "boilers and leaks", "Message for a same-day look"),
      },
      {
        id: "hvac",
        name: "Heating & HVAC",
        enquiry: "Boiler service overdue. Do you cover Salford?",
        values: profile("Warmline", "heating engineer", "Salford", "boiler service and repair", "Book a service"),
      },
      {
        id: "landscaper",
        name: "Landscapers",
        enquiry: "Need the garden flattening before summer. Can you quote?",
        values: profile("Green Ledger", "landscaper", "York", "patios and garden work", "Ask for a visit"),
      },
    ],
  },
  {
    id: "automotive",
    label: "Automotive",
    businesses: [
      {
        id: "dealer",
        name: "Car dealerships",
        enquiry: "Is the BMW 320d M Sport still available, and do you take part exchange?",
        values: profile("Harbour Motors", "car dealership", "Chester", "used cars and part exchange", "Enquire on this car"),
      },
      {
        id: "garage",
        name: "Garages & MOT",
        enquiry: "Can you MOT a 2018 Golf on Thursday?",
        values: profile("Quay Garage", "MOT centre", "Plymouth", "MOTs and servicing", "Book an MOT"),
      },
      {
        id: "detail",
        name: "Detailing",
        enquiry: "Full valet before a weekend sale. What do you charge?",
        values: profile("Northshine", "car detailing", "Newcastle", "valeting and paint correction", "Message for a slot"),
      },
    ],
  },
  {
    id: "property",
    label: "Property",
    businesses: [
      {
        id: "estate",
        name: "Estate agents",
        href: "/ai-marketing-for-estate-agents",
        enquiry: "Could we book a valuation in Redland this week?",
        values: profile("Harbour & Field", "estate agency", "Bristol", "sales and lettings", "Book a valuation"),
      },
      {
        id: "letting",
        name: "Letting agents",
        enquiry: "Two-bed in Didsbury from next month. Still available?",
        values: profile("Keyline Lets", "letting agency", "Manchester", "lettings and management", "Enquire on this property"),
      },
      {
        id: "mortgage",
        name: "Mortgage brokers",
        enquiry: "First-time buyer. Can we talk this week?",
        values: profile("Steady Path", "mortgage broker", "Leeds", "advice for home buyers", "Book a consultation"),
      },
    ],
  },
  {
    id: "health",
    label: "Health",
    businesses: [
      {
        id: "dental",
        name: "Dental practices",
        href: "/ai-marketing-for-dentists",
        enquiry: "Do you take new NHS / private patients for a check-up?",
        values: profile("Elm Dental", "dental practice", "Leeds", "check-ups and hygienist visits", "Book a consultation"),
      },
      {
        id: "clinic",
        name: "Private clinics",
        enquiry: "Can I book a consultation for next Tuesday?",
        values: profile("Ashwell Clinic", "private clinic", "Oxford", "consultations by appointment", "Book a consultation"),
      },
      {
        id: "physio",
        name: "Physiotherapists",
        enquiry: "Knee pain after running. Any slots this week?",
        values: profile("Stride Physio", "physiotherapy", "Bath", "injury assessment and rehab", "Book an assessment"),
      },
      {
        id: "vet",
        name: "Veterinary practices",
        enquiry: "New puppy vaccines. Are you taking registrations?",
        values: profile("Harbour Vets", "veterinary practice", "Falmouth", "small animal care", "Register and enquire"),
      },
    ],
  },
  {
    id: "professional",
    label: "Professional",
    businesses: [
      {
        id: "solicitor",
        name: "Solicitors",
        href: "/ai-marketing-for-solicitors",
        enquiry: "Conveyancing on a purchase in York. Can you take this on?",
        values: profile("Hart & Vale", "solicitors", "York", "residential conveyancing", "Enquire to book a consultation"),
      },
      {
        id: "accountant",
        name: "Accountants",
        enquiry: "Limited company, first year. Can we talk about accounts?",
        values: profile("Ledger & Co", "accountants", "Sheffield", "accounts and tax for small firms", "Enquire"),
      },
      {
        id: "recruitment",
        name: "Recruitment",
        enquiry: "Hiring a site manager. Do you cover the North West?",
        values: profile("Northline Talent", "recruitment agency", "Manchester", "trade and professional hiring", "Send the role"),
      },
    ],
  },
  {
    id: "hospitality",
    label: "Hospitality",
    businesses: [
      {
        id: "cafe",
        name: "Cafés",
        enquiry: "Table for six on Saturday morning?",
        values: profile("Harbour & Hearth", "cafe", "Falmouth", "brunch and filter coffee", "Message to ask what is on"),
      },
      {
        id: "restaurant",
        name: "Restaurants",
        enquiry: "Private dining for twelve next Friday?",
        values: profile("The Quay Room", "restaurant", "Whitby", "seasonal menus and private dining", "Enquire"),
      },
      {
        id: "hotel",
        name: "Hotels",
        enquiry: "Two nights in October, sea view if you have one.",
        values: profile("Eastlight", "hotel", "Aldeburgh", "rooms and weekend stays", "Enquire about dates"),
      },
    ],
  },
  {
    id: "beauty",
    label: "Beauty & fitness",
    businesses: [
      {
        id: "salon",
        name: "Hair salons",
        enquiry: "Colour and cut Saturday. Any space?",
        values: profile("North & Nape", "hair salon", "Brighton", "cut and colour", "Book a time"),
      },
      {
        id: "gym",
        name: "Gyms",
        enquiry: "Do you do a trial week for new members?",
        values: profile("Foundry Gym", "gym", "Derby", "strength training and classes", "Enquire about joining"),
      },
    ],
  },
  {
    id: "education",
    label: "Education",
    businesses: [
      {
        id: "tutor",
        name: "Tutors",
        enquiry: "GCSE maths, two hours a week. Still taking students?",
        values: profile("Clear Marks", "tutor", "Cambridge", "GCSE and A-level tutoring", "Enquire"),
      },
      {
        id: "driving",
        name: "Driving schools",
        enquiry: "Intensive course in June. Any instructors free?",
        values: profile("Passline", "driving school", "Coventry", "driving lessons", "Enquire about lessons"),
      },
    ],
  },
  {
    id: "retail",
    label: "Retail",
    businesses: [
      {
        id: "shop",
        name: "Independent retail",
        enquiry: "Do you still have the oak dining table in store?",
        values: profile("Grain & Co", "furniture shop", "Frome", "handmade tables and chairs", "Enquire in store"),
      },
      {
        id: "online",
        name: "Online stores",
        enquiry: "Is the navy coat back in stock in a 12?",
        values: profile("North Cloth", "online clothing shop", "Edinburgh", "seasonal coats and knitwear", "Message about stock"),
      },
    ],
  },
];
