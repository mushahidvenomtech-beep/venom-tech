"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog/types";
import { BlogStore } from "@/lib/blog/blogStore";
import SingleBlogArticle from "./SingleBlogArticle";

interface SingleBlogArticleClientProps {
  initialPost: BlogPost | null;
  slug: string;
}

export default function SingleBlogArticleClient({
  initialPost,
  slug,
}: SingleBlogArticleClientProps) {
  const [post, setPost] = useState<BlogPost | null>(initialPost);
  const [loading, setLoading] = useState(!initialPost);

  useEffect(() => {
    if (!initialPost) {
      const fetchFromBackend = async () => {
        try {
          const res = await fetch(`/api/blog/posts/${slug}`);
          if (res.ok) {
            const data = await res.json();
            if (data.post) {
              setPost(data.post);
              setLoading(false);
              return;
            }
          }
        } catch {
          // Fallback to local store
        }

        try {
          const found = BlogStore.getPostBySlug(slug);
          setPost(found);
        } catch (err) {
          console.warn("Failed loading post from BlogStore on client:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchFromBackend();
    }
  }, [initialPost, slug]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-2 border-[#C07DFF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-mono text-xs uppercase tracking-wider text-stone-500">
          Loading article...
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-xl mx-auto px-4 py-28 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-purple-50 text-[#C07DFF] mx-auto flex items-center justify-center font-bold text-2xl">
          🔍
        </div>
        <h1 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-4xl text-slate-900">
          Article Not Found
        </h1>
        <p className="font-sans text-sm text-stone-600 leading-relaxed">
          The requested article may have been unpublished, moved, or deleted.
        </p>
        <Link
          href="/screens/blogs"
          className="inline-block px-6 py-3 rounded-xl bg-black text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider hover:bg-[#C07DFF] transition-colors"
        >
          &larr; Return to All Articles
        </Link>
      </div>
    );
  }

  return <SingleBlogArticle post={post} />;
}

