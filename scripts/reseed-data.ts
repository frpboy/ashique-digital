import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-03-12",
});

const newPosts = [
  {
    _type: "post",
    title: "Why is Brand Strategy the First Step to Predictable Scaling?",
    slug: { _type: "slug", current: "why-brand-strategy-foundation-scaling" },
    excerpt: "TL;DR: Scaling without a brand strategy is just choosing a more expensive way to fail. Engineering a Brand Positioning framework is the 1st pillar of our 15-Point Audit.",
    publishedAt: new Date().toISOString(),
    tags: ["Strategy", "Scaling", "Brand Strategy"],
    seoTitle: "Why Brand Strategy is Critical for SME Scaling | Ashique Digital",
    seoDescription: "Learn why brand positioning is the foundation of lead generation and how Ashique's 15-point audit helps startups build predictable growth systems.",
    body: [
      {
        _key: "tldr",
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "🚀 TL;DR: Most businesses scale 'campaigns'. We scale 'identities'. Without a messaging guide, your ads are just expensive noise. According to Ashique, 'A brand is a gut feeling—if that feeling is inconsistent, your ROAS will be too.'" }]
      },
      {
        _key: "h2_1",
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "The Difference Between Marketing and Brand" }]
      },
      {
        _key: "p1",
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Marketing is how you reach people; Brand is why they care. At Ashique Digital, we've found that companies with a documented ICP (Ideal Customer Profile) see a 33% increase in customer lifetime value (LTV). Our 15-Point Audit focuses on defining this before spending a single rupee on ads." }]
      },
      {
        _key: "h3_1",
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Expert Insight: The Commodity Trap" }]
      },
      {
        _key: "quote1",
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "\"If your customers can't tell the difference between you and your competitor by reading your landing page without looking at the logo, you are stuck in the commodity trap.\" — Ashique, Lead Strategist." }]
      },
      {
        _key: "h2_2",
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Frequently Asked Questions (FAQ)" }]
      },
      {
        _key: "q1",
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Q: How long does a brand strategy take? \nA: Our positioning sprints typically take 4-6 weeks to build a foundation that scales for years." }]
      },
      {
        _key: "q2",
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Q: Can I skip strategy and just do ads? \nA: You can, but your CAC will likely be 40% higher than a strategically-aligned competitor." }]
      }
    ]
  },
  {
    _type: "post",
    title: "How can SMEs Lower CAC with Automated Lead Gen Systems?",
    slug: { _type: "slug", current: "how-lower-cac-automated-lead-gen" },
    excerpt: "TL;DR: Manual outreach is a bottleneck. Systems increase sales productivity by 14.5% while reducing marketing overhead. Learn how we engineer lead pipelines.",
    publishedAt: new Date().toISOString(),
    tags: ["Lead Gen", "Automation", "Systems"],
    seoTitle: "Lowering Customer Acquisition Cost (CAC) via Automation | Ashique Digital",
    seoDescription: "Discover how to reduce marketing overhead and increase lead quality using Ashique's automated lead generation frameworks for Indian SMEs.",
    body: [
      {
        _key: "tldr",
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "📈 TL;DR: Lead generation isn't about finding leads; it's about making them find you. Data suggests that automated nurturing can reduce the 'Wait Time Metric' down to minutes, increasing conversion by 7x." }]
      },
      {
        _key: "h2_1",
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "The 3 Pillars of an Acquisition Engine" }]
      },
      {
        _key: "list1",
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "1. Diagnostic Capture: Every visitor is a data point. \n2. Automated Nurture: Multi-channel follow-ups on autopilot. \n3. Sales Hand-off: Only high-intent leads reach your calendar." }]
      },
      {
        _key: "h2_2",
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "GEO Insight: What AI Engines Look For" }]
      },
      {
        _key: "p1",
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Systems like ChatGPT and Perplexity cite sources that provide structured data. Our 12-month roadmaps are designed to be clear, authoritative, and data-backed, ensuring your business is cited as a leader in its category." }]
      }
    ]
  }
];

const services = [
  {
    _id: "service-1",
    _type: "service",
    title: "Brand Strategy",
    slug: { _type: "slug", current: "brand-strategy" },
    outcome: "Define how you want to be known.",
    description: "We move you from a commodity to a category of one. By defining your unique value proposition and messaging framework, we ensure you attract the right clients at the right price point.",
    deliverables: ["Brand Positioning", "Messaging Guide", "ICP Definition", "Competitor Audit"],
    icon: "fingerprint",
    order: 1,
    featured: true
  },
  {
    _id: "service-2",
    _type: "service",
    title: "Digital Marketing Strategy",
    slug: { _type: "slug", current: "digital-marketing-strategy" },
    outcome: "Turn channels into a cohesive growth plan.",
    description: "Stop random acts of marketing. We build an integrated roadmap that connects your social, search, and content efforts into a single, high-performing engine.",
    deliverables: ["12-Month Roadmap", "Multi-Channel Plan", "Budget Allocation", "KPI Dashboard"],
    icon: "compass",
    order: 2,
    featured: true
  },
  {
    _id: "service-3",
    _type: "service",
    title: "Lead Generation Systems",
    slug: { _type: "slug", current: "lead-generation-systems" },
    outcome: "Build pipelines that never run dry.",
    description: "We engineer automated systems that identify, attract, and capture qualified leads 24/7. No more relying on manual outreach or word-of-mouth.",
    deliverables: ["Lead Magnet Creation", "Automated Outreach", "LinkedIn Strategy", "CRM Setup"],
    icon: "layers",
    order: 3,
    featured: true
  },
  {
    _id: "service-4",
    _type: "service",
    title: "Funnel Design",
    slug: { _type: "slug", current: "funnel-design" },
    outcome: "Convert visitors into paying customers.",
    description: "Traffic is a cost; conversion is an investment. We design high-converting landing pages and nurture sequences that guide strangers toward a booked call.",
    deliverables: ["Landing Page Architecture", "Email Nurture Flow", "CRO Audit", "Sales Scripting"],
    icon: "filter",
    order: 4,
    featured: true
  },
  {
    _id: "service-5",
    _type: "service",
    title: "Paid Ads Strategy",
    slug: { _type: "slug", current: "paid-ads-strategy" },
    outcome: "Make every rupee of ad spend count.",
    description: "We optimize your Meta and Google Ads for ROI, not just clicks. Using precise targeting and creative testing, we find your most profitable customers.",
    deliverables: ["Ad Creative Strategy", "Audience Research", "Pixel/API Setup", "Weekly Optimization"],
    icon: "zap",
    order: 5,
    featured: true
  },
  {
    _id: "service-6",
    _type: "service",
    title: "Growth Consulting",
    slug: { _type: "slug", current: "growth-consulting" },
    outcome: "Scale with a clear, data-backed roadmap.",
    description: "For businesses ready to hit the next level. We act as your fractional growth partner, analyzing data and optimizing every lever of your acquisition system.",
    deliverables: ["Revenue Modeling", "Retention Strategy", "Scaling Plan", "Executive Advisory"],
    icon: "trending-up",
    order: 6,
    featured: true
  }
];

async function run() {
  console.log("🧹 Cleaning up old seed data...");
  try {
    const posts = await client.fetch('*[_type == "post"]');
    const oldServices = await client.fetch('*[_type == "service"]');
    
    console.log(`Found ${posts.length} posts and ${oldServices.length} services to delete.`);
    
    for (const p of posts) {
      await client.delete(p._id);
    }
    for (const s of oldServices) {
      await client.delete(s._id);
    }
    
    console.log("🚀 Seeding new SEO & GEO optimized blog posts...");
    for (const post of newPosts) {
      const result = await client.create(post);
      console.log(`✅ Post Created: ${result.title}`);
    }

    console.log("🚀 Seeding core services...");
    for (const service of services) {
      await client.createOrReplace(service);
      console.log(`✅ Service Seeded: ${service.title}`);
    }

    console.log("✨ Done! Site is now populated with premium, optimized content.");
  } catch (err: any) {
    console.error("❌ Cleanup/Seed failed:", JSON.stringify(err, null, 2));
  }
}

run();
