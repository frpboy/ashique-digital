import { defineField, defineType } from "sanity";

export const leadLog = defineType({
  name: "leadLog",
  title: "Lead Log",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "businessType", title: "Business Type", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({ name: "source", title: "Source", type: "string", options: { list: ["Contact Form", "Newsletter", "Free Audit"] } }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime" }),
  ],
  preview: {
    select: { title: "name", subtitle: "email" },
  },
});
