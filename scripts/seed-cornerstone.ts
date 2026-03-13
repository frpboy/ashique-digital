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

const cornerstonePost = {
  _type: "post",
  title: "Engineering Predictability: The 15-Point Growth System Audit",
  slug: { _type: "slug", current: "engineering-predictability-15-point-audit" },
  excerpt: "Stop running ads and start building a growth system. Learn the 15 critical points that separate scaling SMEs from those stuck in a cycle of high CAC and low-quality leads.",
  publishedAt: new Date().toISOString(),
  tags: ["Strategy", "Lead Gen", "Scaling"],
  body: [
    {
      _key: "block1",
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Most SMEs treat digital marketing like a gambling table. They put money into Meta or Google, pray for a return, and call it 'scaling' if the ROAS looks positive for a week. But true growth isn't about campaigns; it's about systems."
        }
      ]
    },
    {
      _key: "block2",
      _type: "block",
      style: "h2",
      children: [{ _type: "span", text: "The Fallacy of Ad-First Thinking" }]
    },
    {
      _key: "block3",
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "When CAC (Customer Acquisition Cost) rises, the instinctive reaction is to 'fix the ads.' You change the creative, tweak the audience, or hire a new agency. Yet, more often than not, the problem isn't the traffic—it's the friction."
        }
      ]
    },
    {
      _key: "block4",
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "The 15-Point Growth System Audit is designed to identify exactly where your system is leaking revenue. It's built on three psychological and operational pillars:"
        }
      ]
    },
    {
        _key: "block5",
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Pillar 1: High-Performance Funnels" }]
    },
    {
      _key: "block6",
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Before a single rupee is spent on ads, your funnel must be engineered to convert. This starts with the 'Core Offer Hook'. Do you solve a burning pain point in 3 seconds? We look at trust architecture—where your social proof sits—and mobile responsiveness to ensure the 80% of users on phones aren't hitting friction walls."
        }
      ]
    },
    {
        _key: "block7",
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Pillar 2: Ad Strategy Alignment" }]
    },
    {
      _key: "block8",
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Scaling Ads is about move-away intent mapping. Instead of just targeting demographics, we target psychological triggers. We also move beyond ROAS (Return on Ad Spend) and look at MER (Marketing Efficiency Ratio)—the true measure of how much profit your marketing is actually generating for the business."
        }
      ]
    },
    {
        _key: "block9",
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Pillar 3: Lead Quality & Sales Momentum" }]
    },
    {
      _key: "block10",
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "A lead isn't a sale. High-growth systems use lead scoring to automatically separate 'tyre-kickers' from high-intent buyers. We measure the 'Wait Time Metric'—the speed at which your system responds to a new lead—and build a scaling roadmap that doesn't break when volume triples."
        }
      ]
    },
    {
      _key: "block11",
      _type: "block",
      style: "h2",
      children: [{ _type: "span", text: "Conclusion: The Diagnostic First Step" }]
    },
    {
      _key: "block12",
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "If you're tired of inconsistent revenue cycles and expensive ads that don't convert, it's time to stop guessing. My 15-Point Audit is the blueprint I've used to help dozens of SMEs engineer predictable growth."
        }
      ]
    }
  ],
};

async function seed() {
  try {
    const result = await client.create(cornerstonePost);
    console.log(`✅ Cornerstone post created: ${result._id}`);
  } catch (err: any) {
    console.error("❌ Seeding failed:", JSON.stringify(err, null, 2));
  }
}

seed();
