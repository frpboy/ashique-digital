// Shared TypeScript types for ashique.digital

export interface Metric {
  label: string;
  value: string;
}

export interface CaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  clientIndustry: string;
  problem?: string;
  strategy?: unknown[];
  execution?: unknown[];
  metrics?: Metric[];
  testimonial?: string;
  clientName?: string;
  coverImage?: SanityImage;
  publishedAt: string;
  featured?: boolean;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body?: unknown[];
  tags?: string[];
  coverImage?: SanityImage;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  company?: string;
  quote: string;
  photo?: SanityImage;
}

export interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  deliverables?: string[];
  outcome?: string;
  icon?: string;
  featured?: boolean;
  order?: number;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: { x: number; y: number };
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
