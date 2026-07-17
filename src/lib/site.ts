/**
 * Central business configuration.
 * Everything a non-developer might need to change lives here.
 */

export const site = {
  name: "Clear Blue Plumbing",
  shortName: "Clear Blue Plumbing",
  tagline: "Clear solutions. Blue reliability. Flowing trust.",
  description:
    "Trusted plumber in Roodepoort (Witpoortjie & the West Rand) for leak detection, burst geysers, pipes, taps, toilets, drains and sewers. Fast, friendly, honest workmanship from Brandon and the Clear Blue Plumbing team. Rated 5.0 from 38 Google reviews.",

  // Change this to the live domain when it goes live.
  url: "https://clearblueplumbing.co.za",

  // Contact — used for tel:, mailto: and WhatsApp deep links.
  phoneDisplay: "072 426 0645",
  phoneE164: "+27724260645",
  whatsapp: "27724260645", // wa.me format (no +, no spaces)
  email: "dominickjoub@gmail.com",
  facebook: "https://www.facebook.com/",

  // Physical address — shown in the contact section and used for local SEO.
  address: {
    street: "13 Moller St",
    suburb: "Witpoortjie",
    city: "Roodepoort",
    postalCode: "1724",
    display: "13 Moller St, Witpoortjie, Roodepoort",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Clear+Blue+Plumbing+13+Moller+St+Witpoortjie+Roodepoort",
  },

  // Google Business profile rating.
  rating: {
    value: "5.0",
    count: 38,
  },

  // Trading area — helps local SEO. Adjust as needed.
  areaServed: "Roodepoort & the West Rand",
  region: "ZA",

  hours: {
    label: "Mon–Fri · 8am–5pm",
    note: "On standby after-hours for burst pipes & geyser emergencies",
  },

  offer: {
    badge: "Every job",
    headline: "Free, no-obligation quotes",
    note: "Send your request and we'll get straight back to you.",
  },
} as const;

export type ServiceId =
  | "leaks"
  | "geysers"
  | "taps"
  | "toilets"
  | "drains"
  | "tanks"
  | "outdoor";

export interface Service {
  id: ServiceId;
  title: string;
  short: string;
  blurb: string;
  points: string[];
  /**
   * Optional follow-up question shown in the quote form when this service is
   * selected. Its answer is added to the WhatsApp message.
   */
  ask?: { label: string; placeholder: string };
}

export const services: Service[] = [
  {
    id: "leaks",
    title: "Leak Detection & Pipes",
    short: "Find it, fix it",
    blurb:
      "Hidden leaks traced and sorted before they cost you. Dripping walls, wet ceilings and burst pipes repaired cleanly and for good.",
    points: [
      "Plumbing leak detection",
      "Plumbing leak repair",
      "Pipe repair & replacement",
    ],
    ask: {
      label: "Where's the leak?",
      placeholder: "e.g. wall in the bathroom, under the kitchen sink…",
    },
  },
  {
    id: "geysers",
    title: "Geysers & Water Heaters",
    short: "Hot water restored",
    blurb:
      "Burst geyser? No hot water? We install, replace and repair geysers and water heaters, fast, tidy and to spec.",
    points: [
      "Geyser installation & replacement",
      "Water heater repair",
      "Burst geyser call-outs",
    ],
    ask: {
      label: "Geyser size (if known)",
      placeholder: "e.g. 150L, or 'not sure'",
    },
  },
  {
    id: "taps",
    title: "Taps & Showers",
    short: "No more drips",
    blurb:
      "Leaking taps, weak pressure or a new shower, installed and repaired neatly so everything runs the way it should.",
    points: [
      "Tap installation & repair",
      "Shower installation",
      "Shower repair",
    ],
  },
  {
    id: "toilets",
    title: "Toilets",
    short: "Running & sealed",
    blurb:
      "Running, blocked or leaking toilets fixed, and new toilets installed cleanly with no mess left behind.",
    points: [
      "Toilet installation",
      "Toilet repair",
      "Cistern & seal fixes",
    ],
  },
  {
    id: "drains",
    title: "Drains & Sewers",
    short: "Flowing freely",
    blurb:
      "Blocked drains cleared and sewer lines cleaned or repaired, getting everything flowing freely again.",
    points: [
      "Drain cleaning",
      "Sewer cleaning",
      "Sewer repair",
    ],
  },
  {
    id: "tanks",
    title: "Water Tanks",
    short: "Stored & steady",
    blurb:
      "Water tanks supplied, installed and repaired, so you always have a steady, reliable water supply.",
    points: [
      "Water tank installation",
      "Water tank repair",
      "Connections & advice",
    ],
  },
  {
    id: "outdoor",
    title: "Outdoor Plumbing",
    short: "Yard to street",
    blurb:
      "Outdoor plumbing systems repaired, from garden lines and outside taps to the pipework running out to the street.",
    points: [
      "Outdoor plumbing system repair",
      "Outside taps & garden lines",
      "General maintenance",
    ],
  },
];

export const whyChooseUs: { title: string; body: string }[] = [
  {
    title: "Takes Pride in the Work",
    body: "Neat, honest workmanship with a proper finish, the kind of job customers name Brandon in their reviews for.",
  },
  {
    title: "Fast Response",
    body: "Reach out and get sorted quickly, often same-day. Burst geysers and leaks don't wait, and neither do we.",
  },
  {
    title: "Fair, Upfront Pricing",
    body: "Brilliant pricing with no surprises. You get a clear quote before we start, so you always know where you stand.",
  },
  {
    title: "Rated 5.0 on Google",
    body: "A perfect 5.0-star rating earned one happy customer at a time, with clients saving us to their speed dial.",
  },
];

export type PropertyType = "Home" | "Business" | "Complex / Estate";

export const propertyTypes: PropertyType[] = ["Home", "Business", "Complex / Estate"];
