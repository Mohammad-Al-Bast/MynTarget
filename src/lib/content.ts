import type { StaticImageData } from "next/image";

import beit1 from "@/assets/work/work-11-5.png";
import beit2 from "@/assets/work/work-11-6.png";
import beit3 from "@/assets/work/work-11-7.png";
import beit4 from "@/assets/work/work-11-8.png";
import sushi1 from "@/assets/work/work-11-1.png";
import sushi2 from "@/assets/work/work-11-2.png";
import sushi3 from "@/assets/work/work-11-3.png";
import sushi4 from "@/assets/work/work-11-4.png";
import jay1 from "@/assets/work/work-14-1.png";
import jay2 from "@/assets/work/work-14-2.png";
import jay3 from "@/assets/work/work-14-3.png";
import jay4 from "@/assets/work/work-14-4.png";
import laz1 from "@/assets/work/work-14-5.png";
import laz2 from "@/assets/work/work-14-6.png";
import laz3 from "@/assets/work/work-14-7.png";
import laz4 from "@/assets/work/work-14-8.png";
import malakSocial from "@/assets/work/portfolio-13-3.png";
import malakAd from "@/assets/work/portfolio-13-4.png";
import beverage1 from "@/assets/work/portfolio-13-5.png";
import beverage2 from "@/assets/work/portfolio-13-7.png";
import logoBeit from "@/assets/clients/portfolio-5-11.png";
import logoSushique from "@/assets/clients/portfolio-5-12.png";
import logoCadmus from "@/assets/clients/portfolio-5-16.png";
import logoMalak from "@/assets/clients/portfolio-5-17.png";
import logoSaifi from "@/assets/clients/portfolio-5-21.png";

export type Img = { src: StaticImageData; alt: string };

export const site = {
  name: "MYN Target",
  tagline: "Creative marketing and media",
  email: "myntarget.lb@gmail.com",
  phone: "+961 76 556 116",
  phoneHref: "tel:+96176556116",
  whatsapp: "https://wa.me/96176556116",
  regions: ["Lebanon", "UAE", "Türkiye"],
};

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/studio", label: "Studio" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

/** One label per intent, used everywhere on the site. */
export const cta = {
  contact: { href: "/contact", label: "Start a project" },
  work: { href: "/work", label: "View the work" },
  studio: { href: "/contact?service=Studio%20booking", label: "Book the studio" },
  services: { href: "/services", label: "Explore services" },
};

export const clients: Img[] = [
  { src: logoSushique, alt: "Sushique" },
  { src: logoBeit, alt: "Beit El Helo" },
  { src: logoCadmus, alt: "Cadmus Resto Café" },
  { src: logoMalak, alt: "Malak Al Habach" },
  { src: logoSaifi, alt: "Saifi Jewelry" },
];

export type ServiceItem = { title: string; headline: string; body: string };

export type Service = {
  id: "social" | "production" | "branding" | "performance" | "digital";
  number: string;
  name: string;
  short: string;
  statement: string;
  intro: string;
  items: ServiceItem[];
  visual:
    | { kind: "image"; image: Img }
    | { kind: "logos" }
    | { kind: "type"; words: string[] };
};

export const services: Service[] = [
  {
    id: "social",
    number: "01",
    name: "Social media & marketing",
    short: "Social",
    statement: "Own the conversation.",
    intro:
      "Strategy, content and campaigns that keep your brand in the feed and on the mind.",
    items: [
      {
        title: "Social media management",
        headline: "Always on, never off-brand.",
        body: "Content calendars, community management and reporting.",
      },
      {
        title: "Social media strategy",
        headline: "A plan with a point of view.",
        body: "A clear plan built around your audience and your brand.",
      },
      {
        title: "Campaign management",
        headline: "From concept to launch.",
        body: "Connected creative and execution, from the first idea to the day it goes live.",
      },
    ],
    visual: {
      kind: "image",
      image: { src: malakSocial, alt: "Social content created for Malak Al Habach" },
    },
  },
  {
    id: "production",
    number: "02",
    name: "Content & production",
    short: "Production",
    statement: "Made to stop the scroll.",
    intro: "Video, photography and social content that hold attention.",
    items: [
      {
        title: "Video",
        headline: "Your story. In motion.",
        body: "Brand films, product content and editing shaped around your message.",
      },
      {
        title: "Reels",
        headline: "Short format. Strong impression.",
        body: "Hooks, pacing and platform-ready formats for social content.",
      },
      {
        title: "Photography",
        headline: "Every detail, in focus.",
        body: "Product, food and lifestyle photography that gives your brand a visual voice.",
      },
    ],
    visual: {
      kind: "image",
      image: { src: sushi1, alt: "Sushi platter photographed for Sushique" },
    },
  },
  {
    id: "branding",
    number: "03",
    name: "Branding & creative",
    short: "Branding",
    statement: "Look like you mean it.",
    intro: "A visual identity with a point of view.",
    items: [
      {
        title: "Identity",
        headline: "A brand built to be recognised.",
        body: "Logo, colour, typography and guidelines that work together as one system.",
      },
      {
        title: "Design",
        headline: "Consistent. Never ordinary.",
        body: "Graphic design for social media, print and brand communication.",
      },
      {
        title: "Direction",
        headline: "The idea behind the impression.",
        body: "Creative direction that brings every touchpoint into the same story.",
      },
    ],
    visual: { kind: "logos" },
  },
  {
    id: "performance",
    number: "04",
    name: "Advertising & performance",
    short: "Performance",
    statement: "Attention. With intention.",
    intro: "Creative thinking meets a clear campaign objective.",
    items: [
      {
        title: "Campaigns",
        headline: "Give your message a destination.",
        body: "Advertising plans and campaign management guided by your goals.",
      },
      {
        title: "Creative",
        headline: "Make the first impression count.",
        body: "Brand-led ad creative with a clear message and call to action.",
      },
      {
        title: "Reporting",
        headline: "Learn from the response.",
        body: "Campaign reporting that shapes the next creative, audience and channel decisions.",
      },
    ],
    visual: {
      kind: "image",
      image: { src: malakAd, alt: "Promotional ad creative for Malak Al Habach" },
    },
  },
  {
    id: "digital",
    number: "05",
    name: "Digital & technology",
    short: "Digital",
    statement: "Built for what's next.",
    intro:
      "Websites and digital experiences that connect your brand with the people who matter.",
    items: [
      {
        title: "Web",
        headline: "Your best salesperson, online.",
        body: "Website design, development and e-commerce.",
      },
      {
        title: "Motion",
        headline: "Ideas that move.",
        body: "Motion graphics and CGI that bring ideas to life.",
      },
    ],
    visual: { kind: "type", words: ["Websites", "E-commerce", "Motion", "CGI"] },
  },
];

export type Project = {
  slug: string;
  client: string;
  tagline: string;
  service: string;
  summary: string;
  cover: Img;
  gallery: Img[];
};

export const projects: Project[] = [
  {
    slug: "sushique",
    client: "Sushique",
    tagline: "A feast for the eyes.",
    service: "Food photography",
    summary:
      "Rich textures, dramatic light and food at the centre of the frame. A selection of restaurant photography from our portfolio.",
    cover: { src: sushi2, alt: "Sushique sushi rolls under dramatic light" },
    gallery: [
      { src: sushi1, alt: "Sushique platter, photograph 1" },
      { src: sushi2, alt: "Sushique platter, photograph 2" },
      { src: sushi3, alt: "Sushique platter, photograph 3" },
      { src: sushi4, alt: "Sushique platter, photograph 4" },
    ],
  },
  {
    slug: "jay-jewels",
    client: "Jay Jewels",
    tagline: "Small details. Lasting impressions.",
    service: "Jewellery photography",
    summary:
      "A closer look at the details. Product and lifestyle photography that brings the jewellery into focus.",
    cover: { src: jay2, alt: "Jay Jewels jewellery close-up" },
    gallery: [
      { src: jay1, alt: "Jay Jewels, photograph 1" },
      { src: jay2, alt: "Jay Jewels, photograph 2" },
      { src: jay3, alt: "Jay Jewels, photograph 3" },
      { src: jay4, alt: "Jay Jewels, photograph 4" },
    ],
  },
  {
    slug: "beit-el-helo",
    client: "Beit El Helo",
    tagline: "Craft you can almost taste.",
    service: "Product photography",
    summary:
      "From delicate pastries to carefully wrapped products, imagery celebrating the texture and craft of the collection.",
    cover: { src: beit2, alt: "Beit El Helo pistachio pastries on a dark plate" },
    gallery: [
      { src: beit1, alt: "Beit El Helo, photograph 1" },
      { src: beit2, alt: "Beit El Helo, photograph 2" },
      { src: beit3, alt: "Beit El Helo, photograph 3" },
      { src: beit4, alt: "Beit El Helo, photograph 4" },
    ],
  },
  {
    slug: "lazurd",
    client: "Lazurd",
    tagline: "Everyday, elevated.",
    service: "Lifestyle photography",
    summary:
      "Jewellery photographed in a lifestyle setting, balancing the character of each piece with an elegant visual mood.",
    cover: { src: laz4, alt: "Lazurd jewellery in a lifestyle setting" },
    gallery: [
      { src: laz1, alt: "Lazurd, photograph 1" },
      { src: laz2, alt: "Lazurd, photograph 2" },
      { src: laz3, alt: "Lazurd, photograph 3" },
      { src: laz4, alt: "Lazurd, photograph 4" },
    ],
  },
];

export const studioImages = {
  product: { src: beit3, alt: "Beit El Helo chocolates photographed in the MYN studio" },
  reels: { src: beverage1, alt: "Beverage content shot for social" },
  campaign: { src: laz4, alt: "Campaign shoot for Lazurd" },
  hero: { src: jay1, alt: "Jewellery photographed in the MYN studio" },
  jewel: { src: jay3, alt: "Jay Jewels product photography" },
  food: { src: sushi3, alt: "Sushique sushi photographed for the restaurant" },
  beverage: { src: beverage2, alt: "Beverage content from the MYN portfolio" },
};

export const aboutImages = {
  hero: { src: jay2, alt: "Jay Jewels photography by MYN Target" },
  team: { src: beit1, alt: "Beit El Helo pistachio dessert photographed by MYN Target" },
  values: { src: jay3, alt: "Jay Jewels product photography" },
  contact: { src: jay4, alt: "Jay Jewels portfolio detail" },
};

export const processSteps = [
  { title: "Discover", body: "We dig into your brand, audience and goals." },
  { title: "Strategize", body: "We map the message, channels and creative direction." },
  { title: "Create", body: "We shoot, write and design the work." },
  { title: "Launch", body: "We bring the campaign into the world." },
  { title: "Optimize", body: "We review the response and sharpen the next move." },
];

export const whyMyn = [
  {
    label: "Tailored strategy",
    headline: "Your brand. Your audience. Your way forward.",
    body: "We start with your market, your customers and your goals. Then we build a plan around what your brand actually needs.",
  },
  {
    label: "Creative production",
    headline: "Ideas with purpose. Made with care.",
    body: "From the first concept to the final edit, we bring strategy and craft into every piece of content.",
  },
  {
    label: "Integrated execution",
    headline: "One team. A connected approach.",
    body: "Design, content and campaigns work together. Your message stays consistent from the first impression to the next interaction.",
  },
  {
    label: "Performance mindset",
    headline: "Launch. Learn. Make the next move better.",
    body: "We use campaign reporting and audience response to refine the creative, sharpen the message and guide the next step.",
  },
];

export const values = [
  { title: "Craft first", body: "Care in the details, from the concept to the finish." },
  { title: "Own it", body: "An accountable team, from strategy to delivery." },
  { title: "Stay curious", body: "Ask better questions. Keep improving the work." },
  { title: "Work together", body: "Your knowledge of your brand meets our creative perspective." },
];

export const locations = [
  { country: "Lebanon", city: "Bekaa", note: "Bar Elias", phone: true },
  { country: "Lebanon", city: "Beirut", note: "Meetings by arrangement." },
  { country: "UAE", city: "United Arab Emirates", note: "Regional enquiries welcome." },
  { country: "Türkiye", city: "Istanbul", note: "Local arrangements on request." },
];

export type Faq = { q: string; a: string };

export const workFaqs: Faq[] = [
  {
    q: "How do we start?",
    a: "Share your goals through the contact page. Our team will discuss the scope and next steps with you.",
  },
  {
    q: "What does a project cost?",
    a: "Every project is scoped individually. We prepare a proposal based on your needs, deliverables and timeline.",
  },
  {
    q: "How long does the work take?",
    a: "The schedule depends on the scope. We agree on milestones and delivery dates before the project begins.",
  },
  {
    q: "Do you work with small brands?",
    a: "Yes. Tell us what you're building and where you want to take it. We shape the work around your needs.",
  },
  {
    q: "Can we book the studio?",
    a: "Yes. Send a studio enquiry with your shoot requirements and preferred date. All bookings require confirmation.",
  },
];

export const studioFaqs: Faq[] = [
  {
    q: "How do I book?",
    a: "Tell us about your shoot, preferred date and the support you need. Our team will confirm availability and the next steps.",
  },
  {
    q: "What equipment is included?",
    a: "Lighting, backdrops, cameras and audio are matched to your shoot. Contact us for the current equipment list.",
  },
  {
    q: "How long can I book?",
    a: "Share your expected shoot duration. We'll confirm the available session options and pricing.",
  },
  {
    q: "Can your team help on the day?",
    a: "Yes. Ask about photography, videography, editing, content creation and creative direction.",
  },
  {
    q: "Where is the studio?",
    a: "Contact us for the exact studio address and directions before your visit.",
  },
];

export const serviceOptions = [
  ...services.map((s) => s.name),
  "Studio booking",
];
