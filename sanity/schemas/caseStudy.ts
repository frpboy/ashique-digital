// Sanity CMS Schema: Case Study
import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "clientIndustry", title: "Client Industry", type: "string", validation: (r) => r.required() }),
    defineField({ name: "featured", title: "Featured on Homepage", type: "boolean", initialValue: false }),
    defineField({ name: "problem", title: "The Problem", type: "text", rows: 4 }),
    defineField({ name: "strategy", title: "The Strategy", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "execution", title: "Execution Details", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "metrics",
      title: "Key Metrics",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "label", title: "Label", type: "string" },
          { name: "value", title: "Value", type: "string" },
        ],
      }],
    }),
    defineField({ name: "testimonial", title: "Client Testimonial", type: "text", rows: 3 }),
    defineField({ name: "clientName", title: "Client Name / Handle", type: "string" }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
  ],
  preview: {
    select: { title: "title", subtitle: "clientIndustry" },
  },
});
