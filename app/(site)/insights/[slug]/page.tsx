import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import { postBySlugQuery, allPostsQuery } from "@/lib/sanity.queries";
import type { BlogPost } from "@/lib/types";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { PortableText } from "@portabletext/react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await sanityFetch<BlogPost[]>({ query: allPostsQuery, tags: ["post"] }).catch(() => []);
  return posts.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost>({ query: postBySlugQuery, params: { slug }, tags: ["post"] }).catch(() => null);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

const ptComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 style={{ 
        fontFamily: "var(--font-heading)", 
        fontSize: "clamp(1.75rem, 4vw, 2.25rem)", 
        fontWeight: 800, 
        marginTop: "3rem", 
        marginBottom: "1.25rem", 
        color: "var(--color-primary)",
        letterSpacing: "-0.02em"
      }}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{ 
        fontFamily: "var(--font-heading)", 
        fontSize: "clamp(1.4rem, 3vw, 1.75rem)", 
        fontWeight: 700, 
        marginTop: "2.5rem", 
        marginBottom: "1rem", 
        color: "var(--color-primary)",
        letterSpacing: "-0.01em"
      }}>
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p style={{ 
        marginBottom: "1.75rem", 
        fontSize: "1.125rem", 
        lineHeight: 1.8, 
        color: "var(--color-text)",
        opacity: 0.9
      }}>
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul style={{ 
        marginBottom: "1.75rem", 
        paddingLeft: "0", 
        listStyleType: "none"
      }}>
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li style={{ 
        marginBottom: "0.75rem", 
        position: "relative",
        paddingLeft: "1.5rem",
        fontSize: "1.125rem",
        lineHeight: 1.6
      }}>
        <span style={{ 
          position: "absolute", 
          left: 0, 
          top: "0.75rem", 
          width: "8px", 
          height: "2px", 
          background: "var(--color-accent)"
        }} />
        {children}
      </li>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a 
        href={value.href} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ 
          color: "var(--color-accent)", 
          textDecoration: "underline",
          textUnderlineOffset: "4px",
          fontWeight: 600,
          transition: "opacity 0.2s"
        }}
        onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
        onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
      >
        {children}
      </a>
    ),
  },
};

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost>({ query: postBySlugQuery, params: { slug }, tags: ["post"] }).catch(() => null);

  if (!post) notFound();

  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.seoTitle ?? post.title,
            description: post.seoDescription ?? post.excerpt,
            image: post.coverImage ? "https://ashique.digital/og/home.png" : undefined, 
            datePublished: post.publishedAt,
            author: { "@type": "Person", name: "Ashique" },
            publisher: {
              "@type": "Organization",
              "name": "Ashique Digital"
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": `https://ashique.digital/insights/${post.slug.current}` },
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": [".article-body", "#ai-summary"]
            }
          }),
        }}
      />

      {/* AI Summary Block (Clipping) */}
      <div id="ai-summary" style={{ display: "none" }} aria-hidden="true">
        {post.seoDescription ?? post.excerpt}
      </div>

      <section style={{ paddingTop: "8rem", paddingBottom: "3.5rem", background: "var(--color-bg)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="container" style={{ maxWidth: "740px", margin: "0 auto" }}>
          <Link href="/insights" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--color-accent)", marginBottom: "1.5rem", fontSize: "0.875rem", fontWeight: 600 }}>
            <ArrowLeft size={14} /> All Insights
          </Link>
          {post.tags && post.tags.length > 0 && (
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
              {post.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
          <h1 style={{ marginBottom: "1.25rem", lineHeight: 1.15, fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}>{post.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--color-text-muted)", fontSize: "0.875rem", fontWeight: 500 }}>
            <Calendar size={14} />
            {new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#fff", paddingTop: "4rem" }}>
        <div
          className="container"
          style={{
            maxWidth: "740px",
            margin: "0 auto",
          }}
        >
          <div style={{ marginBottom: "3rem", padding: "1.5rem", background: "#f8fafc", borderLeft: "3px solid var(--color-accent)" }}>
            <p style={{ fontSize: "1.125rem", color: "var(--color-text-muted)", lineHeight: 1.75, fontStyle: "italic", margin: 0 }}>
              {post.excerpt}
            </p>
          </div>

          <div className="article-body">
            <PortableText value={post.body} components={ptComponents} />
          </div>

          <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--color-muted)" }}>
            <p style={{ fontWeight: 600, color: "var(--color-primary)", marginBottom: "0.5rem" }}>Found this useful?</p>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>I share strategy insights like this every week. No spam — just growth thinking.</p>
            <Link href="/contact" className="btn btn-primary">
              Book a Free Strategy Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
