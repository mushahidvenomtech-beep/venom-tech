"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog/types";

interface BlogArchiveViewProps {
  type: "category" | "tag";
  title: string;
  description?: string;
  posts: BlogPost[];
}

export default function BlogArchiveView({
  type,
  title,
  description,
  posts,
}: BlogArchiveViewProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Archive Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto border-b border-stone-200 pb-10">
        <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-purple-50 text-[#C07DFF] border border-purple-200">
          {type === "category" ? "Category Archive" : "Topic Tag"}
        </span>
        <h1 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-5xl text-slate-950 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        )}
        <p className="font-mono text-xs text-stone-400">
          {posts.length} {posts.length === 1 ? "article" : "articles"} in this collection
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-stone-200 hover:border-black transition-all p-6 flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-4">
                {post.featuredImage && (
                  <div className="w-full aspect-[16/10] overflow-hidden rounded-xl relative bg-stone-100 border border-stone-100">
                    <Image
                      src={post.featuredImage}
                      alt={post.featuredImageAlt || post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs font-mono text-[#C07DFF] uppercase font-bold">
                  <span>{post.categories[0]}</span>
                  <span>&bull;</span>
                  <span className="text-stone-400">{post.readingTime} min read</span>
                </div>
                <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-xl text-slate-900 group-hover:text-[#3BC8F6] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="font-sans text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-stone-100 flex items-center justify-between text-xs font-mono text-stone-500">
                <span>By {post.author.name}</span>
                <span className="font-bold text-black group-hover:translate-x-1 transition-transform">Read &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4">
          <p className="font-mono text-stone-500 text-sm">
            No published articles found in this {type}.
          </p>
          <Link
            href="/screens/blogs"
            className="inline-block px-5 py-2 rounded-xl bg-black text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold"
          >
            &larr; Return to All Articles
          </Link>
        </div>
      )}
    </div>
  );
}

