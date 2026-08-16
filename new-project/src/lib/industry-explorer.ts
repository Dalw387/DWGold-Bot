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
  incomingLabel?: string;
  ctaNoun: string;
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
        ctaNoun: "roofing firm",
        values: profile("Ridge & Rain", "roofing", "Manchester", "roof repairs and new roofs", "Call or message for a quote"),
      },
      {
        id: "builder",
        name: "Builders",
        href: "/ai-marketing-for-builders",
        enquiry: "Can you quote an extension in Beeston this month?",
        ctaNoun: "building firm",
        values: profile("Ash & Lime", "building", "Nottingham", "extensions and repairs", "Message for a site visit"),
      },
      {
        id: "electrician",
        name: "Electricians",
        enquiry: "Consumer unit needs replacing. Are you available this week?",
        ctaNoun: "electrical firm",
        values: profile("North Circuit", "electrician", "Leeds", "rewires and consumer units", "Call for a visit"),
      },
      {
        id: "plumber",
        name: "Plumbers",
        enquiry: "No hot water this morning. Can anyone come today?",
        ctaNoun: "plumbing firm",
        values: profile("Clearflow", "plumber", "Bristol", "boilers and leaks", "Message for a same-day look"),
      },
      {
        id: "hvac",
        name: "Heating & HVAC",
        enquiry: "Boiler service overdue. Do you cover Salford?",
        ctaNoun: "heating firm",
        values: profile("Warmline", "heating engineer", "Salford", "boiler service and repair", "Book a service"),
      },
      {
        id: "landscaper",
        name: "Landscapers",
        enquiry: "Need the garden flattening before summer. Can you quote?",
        ctaNoun: "landscaping firm",
        values: profile("Green Ledger", "landscaper", "York", "patios and garden work", "Ask for a visit"),
      },
      {
        id: "painter",
        name: "Painters",
        enquiry: "Interior of a three-bed in Chorlton. Can you quote this month?",
        ctaNoun: "decorating firm",
        values: profile("True Edge", "painter and decorator", "Manchester", "interior and exterior painting", "Ask for a quote"),
      },
      {
        id: "kitchen",
        name: "Kitchen fitters",
        enquiry: "Supply and fit a kitchen in Didsbury. Site visit possible?",
        ctaNoun: "kitchen firm",
        values: profile("Grain Kitchens", "kitchen fitter", "Manchester", "kitchen supply and fit", "Book a measure"),
      },
      {
        id: "windows",
        name: "Window companies",
        enquiry: "Four sash windows on a Victorian terrace. Do you survey?",
        ctaNoun: "window company",
        values: profile("Northlight", "window company", "Sheffield", "windows and doors", "Book a survey"),
      },
      {
        id: "cleaning",
        name: "Cleaning companies",
        enquiry: "Weekly clean for a four-bed. Any space on Thursdays?",
        ctaNoun: "cleaning company",
        values: profile("Clear Rooms", "cleaning company", "Leeds", "domestic and end-of-tenancy cleaning", "Enquire about a slot"),
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
        incomingLabel: "2018 BMW 320d M Sport",
        ctaNoun: "dealership",
        values: profile("Harbour Motors", "car dealership", "Chester", "used cars and part exchange", "Enquire on this car"),
      },
      {
        id: "used-dealer",
        name: "Used car dealers",
        enquiry: "Hi, is this still available? I've got a Golf to part exchange.",
        incomingLabel: "2019 Mercedes A-Class",
        ctaNoun: "dealership",
        values: profile("Quay Motors", "used car dealer", "Chester", "used cars and part exchange", "Enquire on this car"),
      },
      {
        id: "garage",
        name: "Garages",
        enquiry: "Can you service a 2018 Golf on Thursday?",
        ctaNoun: "garage",
        values: profile("Quay Garage", "garage", "Plymouth", "servicing and repairs", "Book a service"),
      },
      {
        id: "mot",
        name: "MOT centres",
        enquiry: "Can you MOT a 2018 Golf on Thursday?",
        ctaNoun: "MOT centre",
        values: profile("Quay MOT", "MOT centre", "Plymouth", "MOTs and servicing", "Book an MOT"),
      },
      {
        id: "leasing",
        name: "Vehicle leasing",
        enquiry: "Looking at a 36-month personal lease on a compact SUV.",
        ctaNoun: "leasing firm",
        values: profile("North Lease", "vehicle leasing", "Leeds", "personal and business vehicle leasing", "Enquire about a quote"),
      },
      {
        id: "bodyshop",
        name: "Bodyshops",
        enquiry: "Rear bumper scuff after a car park knock. Can you look this week?",
        ctaNoun: "bodyshop",
        values: profile("True Panel", "bodyshop", "Birmingham", "accident repair and respray", "Book an assessment"),
      },
      {
        id: "detail",
        name: "Detailers",
        enquiry: "Full valet before a weekend sale. What do you charge?",
        ctaNoun: "detailing studio",
        values: profile("Northshine", "car detailing", "Newcastle", "valeting and paint correction", "Message for a slot"),
      },
      {
        id: "tyres",
        name: "Tyre centres",
        enquiry: "Two rear tyres on a Golf. Can you fit tomorrow morning?",
        ctaNoun: "tyre centre",
        values: profile("Gripline", "tyre centre", "Derby", "tyres and fitting", "Book a fitting"),
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
        ctaNoun: "agency",
        values: profile("Harbour & Field", "estate agency", "Bristol", "sales and lettings", "Book a valuation"),
      },
      {
        id: "letting",
        name: "Letting agents",
        enquiry: "Two-bed in Didsbury from next month. Still available?",
        ctaNoun: "lettings agency",
        values: profile("Keyline Lets", "letting agency", "Manchester", "lettings and management", "Enquire on this property"),
      },
      {
        id: "management",
        name: "Property management",
        enquiry: "Block of six flats. Can you take on the management?",
        ctaNoun: "management firm",
        values: profile("Steady Keys", "property management", "Leeds", "residential block management", "Enquire"),
      },
      {
        id: "mortgage",
        name: "Mortgage brokers",
        enquiry: "First-time buyer. Can we talk this week?",
        ctaNoun: "brokerage",
        values: profile("Steady Path", "mortgage broker", "Leeds", "advice for home buyers", "Book a consultation"),
      },
      {
        id: "surveyor",
        name: "Surveyors",
        enquiry: "Level 2 survey on a 1930s semi in York. Any dates?",
        ctaNoun: "survey practice",
        values: profile("True Measure", "surveyor", "York", "home surveys", "Enquire about a survey"),
      },
      {
        id: "removals",
        name: "Removal companies",
        enquiry: "Three-bed house, Manchester to Bath, last weekend of the month.",
        ctaNoun: "removals firm",
        values: profile("North Move", "removal company", "Manchester", "house moves", "Ask for a quote"),
      },
    ],
  },
  {
    id: "health",
    label: "Health",
    businesses: [
      {
        id: "dental",
        name: "Dentists",
        href: "/ai-marketing-for-dentists",
        enquiry: "Do you take new private patients for a check-up?",
        ctaNoun: "practice",
        values: profile("Elm Dental", "dental practice", "Leeds", "check-ups and hygienist visits", "Book a consultation"),
      },
      {
        id: "clinic",
        name: "Private clinics",
        enquiry: "Can I book a consultation for next Tuesday?",
        ctaNoun: "clinic",
        values: profile("Ashwell Clinic", "private clinic", "Oxford", "consultations by appointment", "Book a consultation"),
      },
      {
        id: "physio",
        name: "Physiotherapists",
        enquiry: "Knee pain after running. Any slots this week?",
        ctaNoun: "physio clinic",
        values: profile("Stride Physio", "physiotherapy", "Bath", "injury assessment and rehab", "Book an assessment"),
      },
      {
        id: "chiro",
        name: "Chiropractors",
        enquiry: "Lower back pain after sitting all week. First appointment?",
        ctaNoun: "clinic",
        values: profile("True Spine", "chiropractor", "Bristol", "back and neck care", "Book an assessment"),
      },
      {
        id: "optician",
        name: "Opticians",
        enquiry: "Due an eye test and need new frames. Saturday possible?",
        ctaNoun: "practice",
        values: profile("Clear Sight", "optician", "York", "eye tests and glasses", "Book an eye test"),
      },
      {
        id: "aesthetic",
        name: "Aesthetic clinics",
        enquiry: "Consultation for skin. Do you have a next-week slot?",
        ctaNoun: "clinic",
        values: profile("North Skin", "aesthetic clinic", "Manchester", "skin consultations", "Book a consultation"),
      },
      {
        id: "vet",
        name: "Veterinary practices",
        enquiry: "New puppy vaccines. Are you taking registrations?",
        ctaNoun: "practice",
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
        ctaNoun: "firm",
        values: profile("Hart & Vale", "solicitors", "York", "residential conveyancing", "Enquire to book a consultation"),
      },
      {
        id: "accountant",
        name: "Accountants",
        enquiry: "Limited company, first year. Can we talk about accounts?",
        ctaNoun: "practice",
        values: profile("Ledger & Co", "accountants", "Sheffield", "accounts and tax for small firms", "Enquire"),
      },
      {
        id: "adviser",
        name: "Financial advisers",
        enquiry: "Looking for advice on a workplace pension. Can we talk?",
        ctaNoun: "practice",
        values: profile("Steady Counsel", "financial adviser", "Leeds", "regulated financial advice", "Book a consultation"),
      },
      {
        id: "insurance",
        name: "Insurance brokers",
        enquiry: "Commercial van cover from next month. Can you quote?",
        ctaNoun: "brokerage",
        values: profile("Harbour Cover", "insurance broker", "Bristol", "commercial insurance", "Ask for a quote"),
      },
      {
        id: "recruitment",
        name: "Recruiters",
        enquiry: "Hiring a site manager. Do you cover the North West?",
        ctaNoun: "agency",
        values: profile("Northline Talent", "recruitment agency", "Manchester", "trade and professional hiring", "Send the role"),
      },
      {
        id: "consultancy",
        name: "Consultancies",
        enquiry: "Need a two-week operations review for a 12-person firm.",
        ctaNoun: "consultancy",
        values: profile("Clear Frame", "consultancy", "Manchester", "operations reviews for small firms", "Enquire"),
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
        ctaNoun: "café",
        values: profile("Harbour & Hearth", "cafe", "Falmouth", "brunch and filter coffee", "Message to ask what is on"),
      },
      {
        id: "restaurant",
        name: "Restaurants",
        enquiry: "Private dining for twelve next Friday?",
        ctaNoun: "restaurant",
        values: profile("The Quay Room", "restaurant", "Whitby", "seasonal menus and private dining", "Enquire"),
      },
      {
        id: "hotel",
        name: "Hotels",
        enquiry: "Two nights in October, sea view if you have one.",
        ctaNoun: "hotel",
        values: profile("Eastlight", "hotel", "Aldeburgh", "rooms and weekend stays", "Enquire about dates"),
      },
    ],
  },
  {
    id: "beauty",
    label: "Beauty",
    businesses: [
      {
        id: "salon",
        name: "Hair salons",
        enquiry: "Colour and cut Saturday. Any space?",
        ctaNoun: "salon",
        values: profile("North & Nape", "hair salon", "Brighton", "cut and colour", "Book a time"),
      },
      {
        id: "barber",
        name: "Barbers",
        enquiry: "Skin fade Saturday morning. Walk-in or book?",
        ctaNoun: "shop",
        values: profile("True Cut", "barber", "Manchester", "cuts and fades", "Book a chair"),
      },
      {
        id: "beauty-salon",
        name: "Beauty salons",
        enquiry: "Gel and brows this week. Any late slots?",
        ctaNoun: "salon",
        values: profile("North Glow", "beauty salon", "Leeds", "nails and brows", "Book a time"),
      },
      {
        id: "spa",
        name: "Spas",
        enquiry: "Couples massage next Saturday. Still available?",
        ctaNoun: "spa",
        values: profile("Stillwater", "spa", "Bath", "treatments and spa days", "Enquire"),
      },
      {
        id: "gym",
        name: "Gyms",
        enquiry: "Do you do a trial week for new members?",
        ctaNoun: "gym",
        values: profile("Foundry Gym", "gym", "Derby", "strength training and classes", "Enquire about joining"),
      },
      {
        id: "pt",
        name: "Personal trainers",
        enquiry: "Twice a week, strength, starting next month. Any space?",
        ctaNoun: "studio",
        values: profile("North Strength", "personal trainer", "Leeds", "one-to-one strength coaching", "Enquire"),
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
        ctaNoun: "practice",
        values: profile("Clear Marks", "tutor", "Cambridge", "GCSE and A-level tutoring", "Enquire"),
      },
      {
        id: "driving",
        name: "Driving schools",
        enquiry: "Intensive course in June. Any instructors free?",
        ctaNoun: "school",
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
        ctaNoun: "shop",
        values: profile("Grain & Co", "furniture shop", "Frome", "handmade tables and chairs", "Enquire in store"),
      },
      {
        id: "online",
        name: "Online stores",
        enquiry: "Is the navy coat back in stock in a 12?",
        ctaNoun: "store",
        values: profile("North Cloth", "online clothing shop", "Edinburgh", "seasonal coats and knitwear", "Message about stock"),
      },
    ],
  },
];
