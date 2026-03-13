import { defineField, defineType } from "sanity";
import { leadLog } from "./leadLog";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (r) => r.required().max(200) }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "seoTitle", title: "SEO Title (optional)", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description (optional)", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "title", subtitle: "excerpt" } },
});

// Sanity CMS Schema: Testimonial
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "featured", title: "Featured on Homepage", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "name", subtitle: "company" } },
});

// Sanity CMS Schema: Service
export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "deliverables", title: "Deliverables", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "outcome", title: "Outcome Statement", type: "string" }),
    defineField({ name: "icon", title: "Icon Name (Lucide)", type: "string" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "outcome" } },
});

export { leadLog };
