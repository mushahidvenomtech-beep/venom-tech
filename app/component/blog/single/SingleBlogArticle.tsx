"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog/types";
import { BlogStore } from "@/lib/blog/blogStore";
import BlogBlockRenderer from "@/app/component/dashboard/blog/editor/BlogBlockRenderer";

interface SingleBlogArticleProps {
  post: BlogPost;
}

export default function SingleBlogArticle({ post }: SingleBlogArticleProps) {
  const [copied, setCopied] = useState(false);

  const categoriesList = Array.isArray(post.categories)
    ? post.categories
    : typeof post.categories === "string"
    ? (() => {
        try {
          const p = JSON.parse(post.categories);
          return Array.isArray(p) ? p : [post.categories];
        } catch {
          return [post.categories];
        }
      })()
    : [];

  const tagsList = Array.isArray(post.tags)
    ? post.tags
    : typeof post.tags === "string"
    ? (() => {
        try {
          const p = JSON.parse(post.tags);
          return Array.isArray(p) ? p : [post.tags];
        } catch {
          return [post.tags];
        }
      })()
    : [];

  // Fetch related posts from same category
  const allPosts = BlogStore.getPosts({ status: "published" }).posts;
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.id !== post.id &&
        Array.isArray(p.categories) &&
        p.categories.some((c) => categoriesList.includes(c))
    )
    .slice(0, 3);

  const canonicalUrl =
    post.seo?.canonicalUrl || `https://venomtech.pk/blog/${post.slug}`;

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined") {
      const shareUrl = typeof window !== "undefined" ? window.location.href : canonicalUrl;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
        <Link href="/screens/home" className="hover:text-black">
          Home
        </Link>
        <span>&rsaquo;</span>
        <Link href="/screens/blogs" className="hover:text-black">
          Journal
        </Link>
        <span>&rsaquo;</span>
        <span className="text-black font-semibold truncate max-w-xs">{post.title}</span>
      </nav>

      {/* 2. Article Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          {categoriesList.map((cat, i) => (
            <Link
              key={i}
              href={`/blog/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>

        <h1 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight leading-[1.08]">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="font-sans text-stone-600 text-base sm:text-xl leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Author Bio Bar & Reading Time */}
        <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#C07DFF] to-[#3BC8F6] p-0.5">
              <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center font-[family-name:var(--font-oswald)] font-bold text-white text-base">
                {post.author.name.charAt(0)}
              </div>
            </div>
            <div>
              <div className="font-sans font-bold text-sm text-slate-900">{post.author.name}</div>
              <div className="font-mono text-xs text-stone-500">
                {post.author.role || "Contributing Author"} &bull;{" "}
                {post.publishedAt
                  ? post.publishedAt.split("T")[0]
                  : "Recently Published"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-full">
            <span>⏱</span>
            <span>{post.readingTime} min read</span>
            <span>&bull;</span>
            <span>{post.views || 0} views</span>
          </div>
        </div>
      </header>

      {/* 3. Featured Image */}
      {post.featuredImage && (
        <figure className="relative rounded-3xl overflow-hidden aspect-video border border-stone-200 shadow-xl bg-stone-100">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            fill
            unoptimized={Boolean(
              post.featuredImage?.startsWith("data:") ||
                post.featuredImage?.startsWith("blob:")
            )}
            className="object-cover"
            priority
          />
        </figure>
      )}

      {/* 4. Article Body Blocks */}
      <div className="prose prose-lg max-w-none">
        <BlogBlockRenderer blocks={post.contentBlocks} isDarkTheme={false} />
      </div>

      {/* 5. Tags & Social Sharing Bar */}
      <div className="pt-10 border-t border-stone-200 space-y-6">
        {/* Tags */}
        {tagsList && tagsList.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase font-bold text-stone-400 mr-2">Tags:</span>
            {tagsList.map((tag, i) => (
              <Link
                key={i}
                href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-mono text-xs transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Social Share Buttons */}
        <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-between gap-4">
          <span className="font-[family-name:var(--font-oswald)] uppercase font-bold text-xs tracking-wider text-stone-800">
            Share this Article:
          </span>

          <div className="flex items-center gap-2 font-mono text-xs">
            {/* Twitter / X */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(canonicalUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:bg-black hover:text-white transition-colors"
            >
              Twitter / X
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:bg-[#0077b5] hover:text-white transition-colors"
            >
              LinkedIn
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:bg-[#1877f2] hover:text-white transition-colors"
            >
              Facebook
            </a>

            {/* Copy Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:border-black transition-colors"
            >
              {copied ? "✓ Copied!" : "🔗 Copy Link"}
            </button>
          </div>
        </div>
      </div>

      {/* 6. Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="pt-12 border-t border-stone-200 space-y-6">
          <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl text-slate-950">
            Related Insights &amp; Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="group p-5 rounded-2xl bg-white border border-stone-200 hover:border-black transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#C07DFF]">
                    {rel.categories[0]}
                  </span>
                  <h4 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-base text-slate-900 group-hover:text-[#3BC8F6] transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="font-sans text-xs text-stone-500 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
                <div className="font-mono text-[11px] text-stone-400 pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span>{rel.readingTime} min read</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
