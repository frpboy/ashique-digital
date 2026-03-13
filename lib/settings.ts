import { sanityFetch } from "./sanity";

export interface SiteSettings {
  title?: string;
  auditPdf?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  auditPdfUrl?: string;
  contactEmail?: string;
}

export async function getSiteSettings() {
  return await sanityFetch<SiteSettings>({
    query: `*[_type == "settings"][0]{
      title,
      "auditPdfUrl": auditPdf.asset->url,
      contactEmail
    }`,
    tags: ["settings"]
  });
}
