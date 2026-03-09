// ─── Case Studies ──────────────────────────────────────────
export const featuredCaseStudiesQuery = `
  *[_type == "caseStudy" && featured == true] | order(publishedAt desc) [0...3] {
    _id, title, slug, clientIndustry, metrics, coverImage, publishedAt
  }
`;

export const allCaseStudiesQuery = `
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id, title, slug, clientIndustry, metrics, coverImage, publishedAt
  }
`;

export const caseStudyBySlugQuery = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id, title, clientIndustry, problem, strategy, execution,
    metrics, testimonial, clientName, coverImage, publishedAt
  }
`;

// ─── Blog Posts ─────────────────────────────────────────────
export const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, tags, coverImage, publishedAt
  }
`;

export const postsByTagQuery = `
  *[_type == "post" && $tag in tags] | order(publishedAt desc) {
    _id, title, slug, excerpt, tags, coverImage, publishedAt
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, excerpt, body, tags, coverImage, publishedAt,
    seoTitle, seoDescription
  }
`;

export const relatedPostsQuery = `
  *[_type == "post" && slug.current != $slug && count(tags[@ in $tags]) > 0] | order(publishedAt desc) [0...3] {
    _id, title, slug, excerpt, coverImage, publishedAt
  }
`;

export const allTagsQuery = `
  array::unique(*[_type == "post"].tags[])
`;

// ─── Testimonials ────────────────────────────────────────────
export const featuredTestimonialsQuery = `
  *[_type == "testimonial" && featured == true] [0...4] {
    _id, name, role, company, quote, photo
  }
`;

// ─── Services ────────────────────────────────────────────────
export const allServicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id, title, slug, description, deliverables, outcome, icon, featured
  }
`;

export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    _id, title, description, deliverables, outcome, icon
  }
`;
