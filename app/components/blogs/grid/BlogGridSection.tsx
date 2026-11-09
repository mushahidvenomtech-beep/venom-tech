"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import { BlogStore } from "@/lib/blog/blogStore";
import { BlogPost } from "@/lib/blog/types";

export default function BlogGridSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [mounted, setMounted] = useState(false);

  const loadRealTimePosts = useCallback(async () => {
    try {
      // 1. Fetch from Backend Database REST API
      const res = await fetch("/api/blog/posts?status=published&sortBy=newest&pageSize=100");
      if (res.ok) {
        const data = await res.json();
        if (data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
          setPosts(data.posts);
          return;
        }
      }
    } catch {
      // Fallback to local store if offline
    }

    try {
      const res = BlogStore.getPosts({ status: "published", sortBy: "newest" });
      setPosts(res.posts);
    } catch (e) {
      console.warn("Could not load real-time blog posts from BlogStore:", e);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    loadRealTimePosts();

    // Listen to localStorage changes across browser tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.key || e.key.startsWith("venom_tech_blog_data")) {
        loadRealTimePosts();
      }
    };

    // Listen to custom venom_blog_updated event for immediate same-tab reactive updates
    const handleCustomUpdate = () => {
      loadRealTimePosts();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("venom_blog_updated", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("venom_blog_updated", handleCustomUpdate);
    };
  }, [loadRealTimePosts]);

  const postsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));

  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const element = document.getElementById("blog-grid");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "November 18, 2026";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      });
    } catch {
      return dateStr;
    }
  };

  // Helper to render media cards maintaining the exact aesthetic from the design
  const renderCardGraphic = (post: BlogPost) => {
    if (post.featuredImage && post.featuredImage.trim() !== "") {
      return (
        <Image
          src={post.featuredImage}
          alt={post.featuredImageAlt || post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={Boolean(
            post.featuredImage?.startsWith("data:") ||
              post.featuredImage?.startsWith("blob:")
          )}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      );
    }

    const type = post.renderType || "undisputed";

    if (type === "undisputed") {
      return (
        <div className="w-full h-full bg-[#18191B] p-5 flex flex-col justify-between relative">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#C07DFF]">ISSUE 01</span>
          <div className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl text-white leading-none tracking-tight">
            CREATIVE <br />
            <span className="text-stone-400">UNDISPUTED</span>
          </div>
        </div>
      );
    }

    if (type === "trio") {
      return (
        <div className="w-full h-full bg-[#2B2825] p-5 flex flex-col justify-between relative">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#C07DFF]">EDITORIAL</span>
          <div className="self-center my-auto">
            <div className="flex -space-x-3">
              <div className="w-16 h-16 rounded-full bg-stone-700 border-2 border-stone-900 flex items-center justify-center font-[family-name:var(--font-oswald)] font-bold text-white text-lg">
                A
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] border-2 border-stone-900 flex items-center justify-center font-[family-name:var(--font-oswald)] font-bold text-white text-lg">
                B
              </div>
              <div className="w-16 h-16 rounded-full bg-stone-600 border-2 border-stone-900 flex items-center justify-center font-[family-name:var(--font-oswald)] font-bold text-white text-lg">
                C
              </div>
            </div>
          </div>
          <div className="font-[family-name:var(--font-oswald)] uppercase text-xs text-stone-300 tracking-wider">
            Strategic Mindsets
          </div>
        </div>
      );
    }

    if (type === "trends") {
      return (
        <div className="w-full h-full bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] p-5 flex flex-col justify-between relative text-white">
          <span className="text-[10px] uppercase font-mono tracking-widest text-black font-bold">2027 FORECAST</span>
          <div className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-4xl leading-none tracking-tight">
            CREATIVE <br />
            <span className="text-black">TRENDS</span>
          </div>
          <div className="font-sans text-[11px] text-white/90">
            Annual Aesthetic Direction
          </div>
        </div>
      );
    }

    if (type === "diagram") {
      return (
        <div className="w-full h-full bg-[#FAFAF8] p-5 flex flex-col justify-between border-stone-300">
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400">GROWTH MATRIX</span>
          <div className="self-center my-auto flex flex-col items-center">
            <svg viewBox="0 0 100 60" className="w-32 h-20 text-[#111111]">
              <circle cx="50" cy="30" r="14" fill="#C07DFF" opacity="0.2" stroke="#C07DFF" strokeWidth="2" />
              <line x1="20" y1="30" x2="36" y2="30" stroke="#111111" strokeWidth="2" />
              <line x1="64" y1="30" x2="80" y2="30" stroke="#111111" strokeWidth="2" />
              <circle cx="16" cy="30" r="4" fill="#111111" />
              <circle cx="84" cy="30" r="4" fill="#111111" />
            </svg>
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider text-stone-700 font-bold">
              Analysis &bull; Startup &bull; Scale
            </span>
          </div>
          <span className="text-[10px] text-stone-400 font-mono">FUNNEL V2</span>
        </div>
      );
    }

    if (type === "hat") {
      return (
        <div className="w-full h-full bg-[#E8E6E3] p-5 flex flex-col justify-between items-center">
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500 self-start">OBJECTS</span>
          <div className="w-24 h-16 relative">
            <div className="w-16 h-10 mx-auto rounded-t-lg bg-gradient-to-r from-blue-700 to-stone-100 border border-stone-400 shadow-md" />
            <div className="w-24 h-5 rounded-full bg-gradient-to-r from-blue-700 to-stone-100 border border-stone-400 -mt-2 shadow-sm" />
          </div>
          <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider text-stone-700 font-bold self-end">
            Form Follows Purpose
          </span>
        </div>
      );
    }

    if (type === "fashion") {
      return (
        <div className="w-full h-full bg-[#FFFFFF] p-5 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#C07DFF]">LOOKBOOK</span>
          <div className="self-center my-auto flex gap-4 items-center">
            <div className="w-12 h-20 bg-stone-900 rounded-sm" />
            <div className="w-12 h-24 bg-stone-300 rounded-sm" />
          </div>
          <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider text-[#111111] font-bold">
            Modernist Silhouette
          </span>
        </div>
      );
    }

    if (type === "code") {
      return (
        <div className="w-full h-full bg-stone-950 p-5 flex flex-col justify-between font-mono text-[11px] text-stone-400">
          <span className="text-[#C07DFF]">REACT 19 / TURBOPACK</span>
          <div className="text-stone-300">
            <span className="text-[#C07DFF]">export default</span> function Page() &#123;<br />
            &nbsp;&nbsp;return &lt;<span className="text-white">FlagshipEngine</span> /&gt;;<br />
            &#125;
          </div>
          <span className="text-[10px] text-stone-500">0ms Layout Shift</span>
        </div>
      );
    }

    if (type === "motion") {
      return (
        <div className="w-full h-full bg-black p-5 flex flex-col justify-between text-white">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#C07DFF]">3D CANVAS</span>
          <div className="font-[family-name:var(--font-oswald)] font-extrabold text-4xl text-stone-300 uppercase">
            KINETIC
          </div>
          <span className="text-[10px] text-stone-400 font-mono">WebGL Shaders</span>
        </div>
      );
    }

    if (type === "brutalist") {
      return (
        <div className="w-full h-full bg-white border-2 border-black p-5 flex flex-col justify-between">
          <span className="font-mono text-xs uppercase font-bold text-black">NO TEMPLATES</span>
          <div className="font-[family-name:var(--font-oswald)] font-extrabold text-3xl uppercase text-black leading-none">
            BOLD &bull; RAW &bull; ICONIC
          </div>
          <span className="text-[10px] text-stone-500 font-mono">System Integrity</span>
        </div>
      );
    }

    // Default luxury editorial graphic tile for newly created custom posts without an uploaded image
    return (
      <div className="w-full h-full bg-gradient-to-br from-stone-900 via-slate-900 to-black p-5 flex flex-col justify-between relative text-white border border-stone-800">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#C07DFF] font-bold">
            {post.categories?.[0] || "INSIGHT"}
          </span>
          <span className="text-[10px] font-mono text-stone-400">
            {post.readingTime || 4}m read
          </span>
        </div>
        <div className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-2xl leading-tight line-clamp-2 text-white">
          {post.title}
        </div>
        <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider text-stone-400">
          <span>Venom Tech Journal</span>
          <span className="text-[#3BC8F6]">Read &rarr;</span>
        </div>
      </div>
    );
  };

  return (
    <section id="blog-grid" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]">
      {/* Top Editorial Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8 sm:mb-10">
        <div className="lg:col-span-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <AsteriskIcon className="w-4 h-4 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
              Insights &amp; Articles
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#111111] tracking-tight leading-[0.95]">
            Reach Out, <br />
            <span className="text-[#C07DFF]">Let&apos;s Collaborate.</span>
          </h2>
        </div>

        <div className="lg:col-span-4">
          <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
            Thought leadership, brand strategy, design systems, and engineering insights updated in real time directly from our studio journal.
          </p>
        </div>
      </div>

      {/* 3x2 Grid of Cards on Current Page */}
      {currentPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {currentPosts.map((post) => {
            const postHref = `/blog/${post.slug}`;

            return (
              <Link
                key={post.id}
                href={postHref}
                className="group bg-white border border-stone-200 hover:border-black transition-all duration-300 p-6 flex flex-col justify-between shadow-sm cursor-pointer block h-full"
              >
                <div>
                  {/* Media Card Graphic */}
                  <div className="w-full aspect-[16/11] mb-6 overflow-hidden relative border border-stone-200 bg-stone-100">
                    {renderCardGraphic(post)}
                  </div>

                  {/* Author & Date Metadata Row */}
                  <div className="flex items-center gap-4 text-xs font-sans text-stone-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{post.author?.name || "Admin"}</span>
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl text-[#111111] group-hover:text-[#C07DFF] transition-colors leading-tight mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-sans text-stone-600 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Learn More Action Link */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider font-semibold text-[#C07DFF] group-hover:underline">
                    Learn More
                  </span>
                  <span className="text-[#C07DFF] group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 mb-16 bg-white border border-stone-200 p-12">
          <div className="w-12 h-12 rounded-full bg-purple-50 text-[#C07DFF] mx-auto flex items-center justify-center font-bold text-xl">
            ✍️
          </div>
          <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-xl text-stone-900">
            No Published Articles Found
          </h3>
          <p className="text-sm font-sans text-stone-500 max-w-md mx-auto">
            Articles created and published in the admin dashboard will automatically show up here in real time.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider"
          >
            Go to Admin Dashboard &rarr;
          </Link>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6 border-t border-stone-200">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-stone-300 font-[family-name:var(--font-oswald)] uppercase text-xs font-semibold tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:border-black"
          >
            &larr; Prev
          </button>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`w-10 h-10 border font-[family-name:var(--font-oswald)] font-bold text-sm transition-all duration-200 ${
                currentPage === pageNum
                  ? "bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white border-[#C07DFF] shadow-sm"
                  : "bg-white text-[#111111] border-stone-300 hover:border-black"
              }`}
            >
              {pageNum}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-stone-300 font-[family-name:var(--font-oswald)] uppercase text-xs font-semibold tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:border-black"
          >
            Next &rarr;
          </button>
        </div>
      )}
    </section>
  );
}
