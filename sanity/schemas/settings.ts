import { defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
    }),
    defineField({
      name: "auditPdf",
      title: "Free Audit PDF Bundle",
      type: "file",
      options: {
        accept: ".pdf"
      }
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    })
  ],
});
