"use client";

import React from "react";
import Image from "next/image";
import { BlogPost } from "@/lib/blog/types";
import BlogBlockRenderer from "../editor/BlogBlockRenderer";

interface BlogLivePreviewModalProps {
  post: BlogPost;
  onClose: () => void;
}

export default function BlogLivePreviewModal({
  post,
  onClose,
}: BlogLivePreviewModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-between overflow-hidden">
      {/* Top Banner Control Bar */}
      <div className="px-6 py-3.5 bg-slate-950/90 border-b border-white/10 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider text-white">
            Public Website Preview &bull; {post.title}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/10 text-stone-400 font-mono text-[10px] uppercase">
            Status: {post.status}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-all"
        >
          Exit Preview ✕
        </button>
      </div>

      {/* Public Page Scroll Container */}
      <div className="flex-1 overflow-y-auto bg-slate-950 text-white px-4 sm:px-6 lg:px-8 py-12">
        <article className="max-w-4xl mx-auto space-y-10">
          {/* Breadcrumb & Categories */}
          <div className="space-y-4 text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {post.categories.map((cat, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#C07DFF]/15 text-[#C07DFF] border border-[#C07DFF]/30 uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="font-sans text-base sm:text-lg text-stone-400 max-w-2xl mx-auto leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Author & Meta */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/10 text-xs font-mono text-stone-400">
              <span className="text-white font-semibold">{post.author.name}</span>
              <span>&bull;</span>
              <span>
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Draft Version"}
              </span>
              <span>&bull;</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative rounded-3xl overflow-hidden aspect-video border border-white/10 shadow-2xl bg-stone-900">
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
            </div>
          )}

          {/* Rendered Block Content */}
          <div className="pt-6">
            <BlogBlockRenderer blocks={post.contentBlocks} isDarkTheme={true} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase font-mono text-stone-400 mr-2">Tags:</span>
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-stone-300 font-mono text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>
    </div>
  );
}

