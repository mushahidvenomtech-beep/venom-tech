"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import { BlogStore } from "@/lib/blog/blogStore";
import { BlogPost } from "@/lib/blog/types";

const INITIAL_HOMEPAGE_POSTS: BlogPost[] = [
  {
    id: "test-ai-workflows-2026",
    title: "How Autonomous AI Workflows Are Transforming Modern Digital Operations",
    slug: "autonomous-ai-workflows-modern-digital-operations",
    excerpt:
      "A strategic breakdown of how intelligent agent swarms, automated data pipelines, and custom LLMs eliminate operational friction and deliver compounding ROI.",
    contentBlocks: [
      {
        id: "block-1",
        type: "paragraph",
        data: {
          text: "Modern enterprises are moving beyond isolated chatbots to end-to-end autonomous agent swarms. These systems synchronize databases, orchestrate multi-step approval workflows, and triage customer requests with sub-second latency.",
        },
      },
    ],
    featuredImage: "/images/blog/blog-hero.webp",
    featuredImageAlt: "High-tech futuristic digital operations screen",
    author: {
      name: "Venom Tech Team",
      role: "AI & Cloud Architecture",
      avatar: "/images/team/alex-rivera.webp",
    },
    categories: ["AI & Automation", "App Development"],
    tags: ["AI Automation", "Next.js 16"],
    status: "published",
    publishedAt: "2026-11-06T04:00:00Z",
    createdAt: "2026-11-06T04:00:00Z",
    updatedAt: "2026-11-06T04:00:00Z",
    views: 185,
    readingTime: 4,
    seo: {
      metaTitle: "Autonomous AI Workflows in 2026 | Venom Tech IT Solution",
      metaDescription:
        "Learn how autonomous AI agent pipelines eliminate operational bottlenecks and drive compounding enterprise efficiency.",
      focusKeyword: "Autonomous AI Workflows",
      canonicalUrl: "https://venomtech.pk/blog/autonomous-ai-workflows-modern-digital-operations",
      noIndex: false,
      noFollow: false,
    },
  },
];

export default function BlogSection() {
  // Deterministic initial state on both SSR and client to eliminate hydration mismatch
  const [articles, setArticles] = useState<BlogPost[]>(INITIAL_HOMEPAGE_POSTS);

  const loadLatest = useCallback(async () => {
    try {
      // 1. Fetch from Backend Database REST API
      const res = await fetch("/api/blog/posts?status=published&sortBy=newest&pageSize=3");
      if (res.ok) {
        const data = await res.json();
        if (data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
          setArticles(data.posts.slice(0, 3));
          return;
        }
      }
    } catch {
      // Fallback to local store if offline
    }

    try {
      const res = BlogStore.getPosts({ status: "published", sortBy: "newest" });
      if (res.posts && res.posts.length > 0) {
        setArticles(res.posts.slice(0, 3));
      }
    } catch (e) {
      console.warn("Could not load latest blog posts for homepage:", e);
    }
  }, []);

  useEffect(() => {
    loadLatest();

    const handleStorage = (e: StorageEvent) => {
      if (!e.key || e.key.startsWith("venom_tech_blog_data")) {
        loadLatest();
      }
    };

    const handleCustom = () => {
      loadLatest();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("venom_blog_updated", handleCustom);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("venom_blog_updated", handleCustom);
    };
  }, [loadLatest]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Recent";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section
      id="blog"
      className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 mb-2">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
              Latest News
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-[44px] sm:text-[44px] text-[#111111] tracking-tight leading-[1.08]">
            Latest News, <span className="text-[#C07DFF]">Let&apos;s Collaborate.</span>
          </h2>
        </div>

        <Link
          href="/screens/blogs"
          className="inline-flex items-center gap-2.5 bg-black hover:bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white px-7 py-3.5 font-[family-name:var(--font-oswald)] uppercase text-sm tracking-wider font-semibold transition-all duration-300 self-start md:self-auto group"
        >
          <span>View All Articles</span>
          <span className="text-[#C07DFF] group-hover:text-white transition-colors">&rarr;</span>
        </Link>
      </div>

      {/* 3 Articles Grid or Empty State */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-stone-200 hover:border-black transition-all duration-300 p-6 flex flex-col justify-between shadow-sm cursor-pointer block h-full"
            >
              <div>
                {/* Media Card Graphic */}
                <div className="w-full aspect-[16/10] bg-[#161618] p-5 flex flex-col justify-between mb-6 overflow-hidden relative border border-stone-800">
                  {post.featuredImage && post.featuredImage.trim() !== "" ? (
                    <Image
                      src={post.featuredImage}
                      alt={post.featuredImageAlt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized={Boolean(
                        post.featuredImage?.startsWith("data:") ||
                          post.featuredImage?.startsWith("blob:")
                      )}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <>
                      <div className="flex items-center justify-between z-10">
                        <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md text-white font-[family-name:var(--font-oswald)] text-[11px] uppercase tracking-wider font-semibold border border-white/10">
                          {post.categories?.[0] || "Latest News"}
                        </span>
                        <AsteriskIcon
                          className="w-4 h-4 text-stone-400 group-hover:text-[#C07DFF] group-hover:rotate-45 transition-all duration-300"
                          color="currentColor"
                          strokeWidth={3}
                        />
                      </div>

                      <div className="text-white font-[family-name:var(--font-oswald)] text-xs uppercase tracking-widest text-stone-400 z-10">
                        {post.readingTime || 4} Min Read
                      </div>
                    </>
                  )}
                </div>

                {/* Date & Category Row */}
                <div className="flex items-center gap-2 text-xs font-sans text-stone-500 mb-2">
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                  <span>&bull;</span>
                  <span className="text-[#C07DFF] font-semibold">
                    {post.categories?.[0] || "Latest News"}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl text-[#111111] group-hover:text-[#C07DFF] transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>
              </div>

              {/* Read Full Article Footer */}
              <div className="pt-4 mt-6 border-t border-stone-100 flex items-center justify-between text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-[#111111] group-hover:text-[#C07DFF] transition-colors">
                <span>Read Full Article</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center border border-dashed border-stone-200 bg-stone-50/50 p-8 rounded-lg">
          <p className="font-[family-name:var(--font-oswald)] uppercase text-stone-700 text-lg tracking-wider font-bold mb-2">
            No Published Articles Yet
          </p>
          <p className="text-stone-400 text-xs font-sans max-w-sm mx-auto">
            Articles created and published in the admin dashboard will automatically show up here in real time.
          </p>
        </div>
      )}
    </section>
  );
}
