import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import { postBySlugQuery, allPostsQuery } from "@/lib/sanity.queries";
import type { BlogPost } from "@/lib/types";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

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

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost>({ query: postBySlugQuery, params: { slug }, tags: ["post"] }).catch(() => null);

  if (!post) notFound();

  return (
    <>
      <section style={{ paddingTop: "8rem", paddingBottom: "3rem", background: "var(--color-bg)", borderBottom: "1px solid var(--color-muted)" }}>
        <div className="container" style={{ maxWidth: "760px", margin: "0 auto" }}>
          <Link href="/insights" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--color-accent)", marginBottom: "1.5rem", fontSize: "0.875rem", fontWeight: 600 }}>
            <ArrowLeft size={14} /> All Insights
          </Link>
          {post.tags && post.tags.length > 0 && (
            <span className="tag" style={{ marginBottom: "1rem", display: "inline-block" }}>{post.tags[0]}</span>
          )}
          <h1 style={{ marginBottom: "1rem" }}>{post.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
            <Calendar size={14} />
            {new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
          </div>
          <p style={{ marginTop: "1.25rem", fontSize: "1.125rem", color: "var(--color-text-muted)", lineHeight: 1.75, fontStyle: "italic" }}>
            {post.excerpt}
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "#fff" }}>
        <div
          className="container"
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            fontSize: "1.0625rem",
            lineHeight: 1.85,
            color: "var(--color-text)",
          }}
        >
          {/* Portable text would be rendered here — requires @portabletext/react */}
          <p style={{ color: "var(--color-text-muted)", fontStyle: "italic" }}>
            Article content is rendered via Sanity Portable Text. Install{" "}
            <code>@portabletext/react</code> and add the{" "}
            <code>{"<PortableText value={post.body} />"}</code> component here.
          </p>

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
