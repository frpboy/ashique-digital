import type { Metadata } from "next";
import { Suspense } from "react";
import { sanityFetch } from "@/lib/sanity";
import { allPostsQuery } from "@/lib/sanity.queries";
import type { BlogPost } from "@/lib/types";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Insights — Growth Strategy, Brand & Lead Gen Blog",
  description: "Practical insights on brand strategy, lead generation, paid ads, and growth systems. From real client work, not theory.",
};

import LockedEmptyState from "@/components/shared/LockedEmptyState";

async function PostsList() {
  let posts: BlogPost[] = [];
  try {
    posts = await sanityFetch<BlogPost[]>({ query: allPostsQuery, tags: ["post"] });
  } catch {
    posts = [];
  }

  if (posts.length === 0) {
    return <LockedEmptyState type="Insights" />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {posts.map((post) => (
        <Link key={post._id} href={`/insights/${post.slug.current}`} style={{ textDecoration: "none" }}>
          <article
            className="card"
            style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem", alignItems: "center" }}
          >
            <div>
              {post.tags && post.tags.length > 0 && (
                <span className="tag" style={{ marginBottom: "0.75rem", display: "inline-block" }}>{post.tags[0]}</span>
              )}
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{post.title}</h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem", lineHeight: 1.65 }}>{post.excerpt}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.75rem", color: "var(--color-text-muted)", fontSize: "0.8125rem" }}>
                <Calendar size={12} />
                {new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
              </div>
            </div>
            <ArrowRight size={18} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
          </article>
        </Link>
      ))}
    </div>
  );
}

export default function InsightsPage() {
  return (
    <>
      <section style={{ paddingTop: "8rem", paddingBottom: "4rem", background: "var(--color-bg)" }}>
        <div className="container">
          <span className="tag" style={{ marginBottom: "1.5rem", display: "inline-block" }}>Insights</span>
          <h1 style={{ maxWidth: "14ch", marginBottom: "1.5rem" }}>
            Growth thinking.{" "}
            <span style={{ color: "var(--color-accent)" }}>No fluff.</span>
          </h1>
          <p style={{ maxWidth: "50ch", fontSize: "1.125rem", color: "var(--color-text-muted)", lineHeight: 1.8 }}>
            Practical strategy insights from real client work — on brand, lead gen, paid ads, and building growth systems.
          </p>
        </div>
      </section>
      <section className="section" style={{ background: "#fff" }}>
        <div className="container" style={{ maxWidth: "760px", margin: "0 auto" }}>
          <Suspense fallback={<p style={{ color: "var(--color-text-muted)" }}>Loading articles...</p>}>
            <PostsList />
          </Suspense>
        </div>
      </section>
    </>
  );
}
