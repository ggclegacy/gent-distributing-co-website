/** Editorial records, intentionally separate from presentation for future CMS/data integration. */
export type IntelligencePhase = {
  label: string;
  title: string;
  copy: string;
  fields: [string, string][];
};
export type IntelligenceRecord = {
  id: string;
  scene: "workshop" | "vault" | "network" | "arrival";
  number: string;
  name: string;
  eyebrow: string;
  title: string;
  conclusion: string;
  status: string;
  phases: IntelligencePhase[];
};
export const intelligenceRecords: IntelligenceRecord[] = [
  {
    id: "philosophy",
    scene: "workshop",
    number: "02",
    name: "THE GENT STANDARD",
    eyebrow: "PRODUCT INTELLIGENCE LAB",
    title: "Nothing earns our name by accident.",
    conclusion: "GENT APPROVED",
    status: "OUR PROCESS / THE STANDARD",
    phases: [
      {
        label: "SOURCE",
        title: "Start with substance.",
        copy: "Exceptional ingredients. Considered partners. Clear origins. The standard begins long before the finished product.",
        fields: [
          ["PROVENANCE", "Know the source"],
          ["PARTNERS", "Consider the maker"],
          ["PURPOSE", "Establish the need"],
        ],
      },
      {
        label: "DEVELOP",
        title: "Refine the idea.",
        copy: "Formulate, test and sharpen every detail. Product, brand and packaging develop together.",
        fields: [
          ["FORMULATION", "Refine the product"],
          ["PACKAGING", "Consider shelf fit"],
          ["EXPERIENCE", "Test what matters"],
        ],
      },
      {
        label: "VET",
        title: "Prove its worth.",
        copy: "Quality, purpose and experience. Each deserves a considered review before a product moves forward.",
        fields: [
          ["QUALITY", "Review the substance"],
          ["PURPOSE", "Evaluate the fit"],
          ["EXPERIENCE", "Examine the details"],
        ],
      },
      {
        label: "APPROVE",
        title: "Earn the name.",
        copy: "Only what meets the standard moves forward. Worth knowing. Worth having.",
        fields: [
          ["DECISION", "Meet the standard"],
          ["PRINCIPLE", "Nothing overlooked"],
          ["SIGNATURE", "Gent Reserve Co."],
        ],
      },
    ],
  },
  {
    id: "collection",
    scene: "vault",
    number: "03",
    name: "THE COLLECTION",
    eyebrow: "PRODUCT INTELLIGENCE / CHAPTER ONE",
    title: "A first release. A larger world.",
    conclusion: "LEGACY RESERVE",
    status: "CONCEPT PACKAGING / IN DEVELOPMENT",
    phases: [
      {
        label: "ORIGIN",
        title: "Every good has a beginning.",
        copy: "Legacy Reserve is the first Gent product concept. Source and coffee-origin details will be shared before orders open.",
        fields: [
          ["HOUSE", "Gent / own label"],
          ["CATEGORY", "Coffee"],
          ["ORIGIN", "To be announced"],
        ],
      },
      {
        label: "CRAFT",
        title: "A daily ritual, considered.",
        copy: "Our own label begins with Signature Blend Coffee, held to the Gent standard as development takes shape.",
        fields: [
          ["PRODUCT", "Signature Blend Coffee"],
          ["ROAST", "To be announced"],
          ["FORMAT", "In development"],
        ],
      },
      {
        label: "PROFILE",
        title: "Coffee is Chapter One.",
        copy: "Coffee, food, grooming, wellness, apparel and watches. Our own creations and selected brands, with room for future lifestyle categories.",
        fields: [
          ["FIRST CHAPTER", "Coffee"],
          ["PORTFOLIO", "Owned + partner goods"],
          ["HORIZON", "A considered collection"],
        ],
      },
      {
        label: "RELEASE",
        title: "Meet Legacy Reserve.",
        copy: "The first chapter is taking shape. Origin, roast, format and release details come before preorders.",
        fields: [
          ["RELEASE", "In development"],
          ["ORDERS", "Not yet open"],
          ["NEXT", "Product details first"],
        ],
      },
    ],
  },
  {
    id: "ecosystem",
    scene: "network",
    number: "04",
    name: "MAKERS & PARTNERS",
    eyebrow: "THE NETWORK / LOUISIANA → BEYOND",
    title: "Rooted here. Built to travel.",
    conclusion: "EXCEPTIONAL GOODS. CONNECTED.",
    status: "CONCEPTUAL NETWORK / EXPANSION AMBITION",
    phases: [
      {
        label: "MAKER",
        title: "The craft starts with you.",
        copy: "Exceptional makers bring the substance. Gent considers the product, the purpose and the opportunity.",
        fields: [
          ["SOURCING", "Quality without borders"],
          ["INPUT", "Exceptional goods"],
          ["RELATIONSHIP", "Maker → Gent"],
        ],
      },
      {
        label: "GENT",
        title: "We build the path.",
        copy: "Curation, product development, commerce and logistics connect exceptional makers with their next opportunity.",
        fields: [
          ["DEVELOP", "Product + packaging"],
          ["POSITION", "Brand + shelf fit"],
          ["CONNECT", "Commerce + logistics"],
        ],
      },
      {
        label: "CHANNELS",
        title: "Find the right setting.",
        copy: "Specialty retail, barbershops, wellness and hospitality. Distinct channels for goods with a purpose.",
        fields: [
          ["RETAIL", "Specialty businesses"],
          ["HOSPITALITY", "Goods + experiences"],
          ["REACH", "Louisiana → beyond"],
        ],
      },
      {
        label: "CUSTOMER",
        title: "A place in daily life.",
        copy: "Connect exceptional goods with the people who appreciate them. Louisiana is our origin; our ambition reaches further.",
        fields: [
          ["FOUNDATION", "Louisiana"],
          ["EXPANSION", "Gulf South ambition"],
          ["HORIZON", "National ambition"],
        ],
      },
    ],
  },
  {
    id: "membership",
    scene: "arrival",
    number: "05",
    name: "COMMUNITY / MEMBERSHIP",
    eyebrow: "PRIVATE ACCESS / THE GENT EXCHANGE",
    title: "Good taste. Better company.",
    conclusion: "YOUR NEXT CHAPTER",
    status: "MEMBERSHIP VISION / ENROLLMENT NOT YET OPEN",
    phases: [
      {
        label: "DISCOVER",
        title: "First through the door.",
        copy: "We’re exploring early access to upcoming goods, small releases and selected bundles.",
        fields: [
          ["EARLY RELEASES", "Under consideration"],
          ["DISCOVERIES", "Selected bundles"],
          ["ACCESS", "Benefits not yet final"],
        ],
      },
      {
        label: "CONNECT",
        title: "Closer to the people behind it.",
        copy: "The Exchange vision brings makers, businesses and customers together to meet, taste and discover.",
        fields: [
          ["MAKER CONNECTION", "The Exchange vision"],
          ["EXPERIENCES", "Format to be confirmed"],
          ["EVENT ACCESS", "Not a confirmed benefit"],
        ],
      },
      {
        label: "BELONG",
        title: "A reason to return.",
        copy: "Member pricing is part of the plan. Eligible goods, savings and terms will be confirmed before enrollment.",
        fields: [
          ["MEMBER PRICING", "Planned"],
          ["ELIGIBILITY", "To be confirmed"],
          ["ENROLLMENT", "Not yet open"],
        ],
      },
      {
        label: "WHAT’S NEXT",
        title: "One membership. Room to grow.",
        copy: "A closer connection across future categories and participating brands. Explore the direction as we build it.",
        fields: [
          ["NEW CATEGORIES", "The ambition"],
          ["BENEFITS", "Under consideration"],
          ["NEXT", "Confirmed details first"],
        ],
      },
    ],
  },
];
