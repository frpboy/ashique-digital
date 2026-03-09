# Sanity CMS Schema Definitions — ashique.digital

> **Version:** 1.0.0
> **CMS:** Sanity.io
> **Last Updated:** 2026-03-09

---

## 1. Schema Registry

**File:** `sanity/schemas/index.ts`

```typescript
import caseStudy from "./caseStudy";
import blogPost from "./blogPost";
import testimonial from "./testimonial";
import service from "./service";

export const schemaTypes = [caseStudy, blogPost, testimonial, service];
```

---

## 2. Case Study Schema

**File:** `sanity/schemas/caseStudy.ts`

```typescript
import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientIndustry",
      title: "Client Industry",
      type: "string",
      description: 'e.g. "E-commerce", "SaaS", "Healthcare"',
    }),
    defineField({
      name: "problem",
      title: "The Problem",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "strategy",
      title: "Strategy",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "execution",
      title: "Execution",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "metrics",
      title: "Results Metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
        },
      ],
      description: 'e.g. { label: "ROAS", value: "3.2x" }',
    }),
    defineField({
      name: "testimonial",
      title: "Client Testimonial Quote",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "clientName",
      title: "Client Name (or Alias)",
      type: "string",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "clientIndustry", media: "coverImage" },
  },
});
```

---

## 3. Blog Post Schema

**File:** `sanity/schemas/blogPost.ts`

```typescript
import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary for cards and meta description",
    }),
    defineField({
      name: "body",
      title: "Body Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Override for <title> tag (max 60 chars)",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      description: "Override for meta description (max 160 chars)",
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
  },
});
```

---

## 4. Testimonial Schema

**File:** `sanity/schemas/testimonial.ts`

```typescript
import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      description: 'e.g. "Founder & CEO"',
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "quote",
      title: "Testimonial Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Client Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Show on Homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "company", media: "photo" },
  },
});
```

---

## 5. Service Schema

**File:** `sanity/schemas/service.ts`

```typescript
import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables",
      type: "array",
      of: [{ type: "string" }],
      description: "List of what the client receives",
    }),
    defineField({
      name: "outcome",
      title: "Outcome Statement",
      type: "string",
      description:
        'One-line outcome (e.g. "Build pipelines that never run dry")',
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: 'Lucide icon name (e.g. "target", "trending-up")',
    }),
    defineField({
      name: "featured",
      title: "Show on Homepage Grid",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "outcome" },
  },
});
```

---

## 6. GROQ Query Reference

**File:** `lib/sanity.queries.ts`

```typescript
// Featured case studies for homepage (3)
export const featuredCaseStudiesQuery = `
  *[_type == "caseStudy" && featured == true] | order(publishedAt desc) [0...3] {
    _id, title, slug, clientIndustry, metrics, coverImage, publishedAt
  }
`;

// All case studies list
export const allCaseStudiesQuery = `
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id, title, slug, clientIndustry, metrics, coverImage, publishedAt
  }
`;

// Single case study by slug
export const caseStudyBySlugQuery = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id, title, clientIndustry, problem, strategy, execution,
    metrics, testimonial, clientName, coverImage, publishedAt
  }
`;

// Blog posts list
export const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, tags, coverImage, publishedAt
  }
`;

// Blog posts filtered by tag
export const postsByTagQuery = `
  *[_type == "post" && $tag in tags] | order(publishedAt desc) {
    _id, title, slug, excerpt, tags, coverImage, publishedAt
  }
`;

// Single blog post by slug
export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, excerpt, body, tags, coverImage, publishedAt,
    seoTitle, seoDescription
  }
`;

// Featured testimonials
export const featuredTestimonialsQuery = `
  *[_type == "testimonial" && featured == true] {
    _id, name, role, company, quote, photo
  }
`;

// All services ordered
export const allServicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id, title, slug, description, deliverables, outcome, icon, featured
  }
`;
```

---

## 7. Sanity Client Configuration

**File:** `lib/sanity.ts`

```typescript
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, any>;
  tags?: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 60, tags },
  });
}
```

---

## 8. Content Seeding Guide

### Minimum Viable Content for Launch

| Content Type | Minimum | Recommended |
| ------------ | ------- | ----------- |
| Case Studies | 2       | 4–5         |
| Blog Posts   | 1       | 3+          |
| Testimonials | 2       | 4–6         |
| Services     | 6       | 6 (fixed)   |

### Case Study Entry Template

```
Title: [Industry] Business 3.2x ROAS in 60 Days
Client Industry: E-commerce
Problem: The business was spending ₹80K/month on Facebook Ads with
         a 1.1x ROAS and no funnel strategy...
Strategy: [Richtext blocks]
Execution: [Richtext blocks]
Metrics:
  - ROAS: 3.2x
  - CPL: ₹180 (from ₹620)
  - Revenue: +₹4.2L/month
Testimonial: "Ashique didn't just run ads — he rebuilt our entire
              acquisition system. Game-changing."
Client Name: Founder, D2C Fashion Brand
Featured: ✅ Yes
```
