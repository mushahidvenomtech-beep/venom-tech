"use client";

import React, { useState, useEffect } from "react";
import BlogDashboardOverview from "@/app/component/dashboard/blog/overview/BlogDashboardOverview";
import BlogEditor from "@/app/component/dashboard/blog/editor/BlogEditor";
import BlogTaxonomyManager from "@/app/component/dashboard/blog/taxonomy/BlogTaxonomyManager";
import BlogMediaLibrary from "@/app/component/dashboard/blog/media/BlogMediaLibrary";
import BlogLivePreviewModal from "@/app/component/dashboard/blog/preview/BlogLivePreviewModal";
import { BlogPost } from "@/lib/blog/types";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";

interface DashboardBlogsProps {
  subTab?: string;
  onSelectSubTab?: (tab: string) => void;
}

export default function DashboardBlogs({
  subTab = "all-blogs",
  onSelectSubTab,
}: DashboardBlogsProps) {
  const { isDark } = useDashboardTheme();
  const [activeModule, setActiveModule] = useState<"overview" | "editor" | "taxonomy" | "media">("overview");
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);

  // Synchronize with sidebar sub-tab navigation
  useEffect(() => {
    if (subTab === "create-blog") {
      setEditingPostId(null);
      setActiveModule("editor");
    } else if (subTab === "categories") {
      setActiveModule("taxonomy");
    } else if (subTab === "media") {
      setActiveModule("media");
    } else if (subTab === "all-blogs" || subTab === "drafts") {
      setActiveModule("overview");
    }
  }, [subTab]);

  const handleStartCreate = () => {
    setEditingPostId(null);
    setActiveModule("editor");
    if (onSelectSubTab) onSelectSubTab("create-blog");
  };

  const handleEditPost = (id: string) => {
    setEditingPostId(id);
    setActiveModule("editor");
  };

  const handleBackToOverview = () => {
    setActiveModule("overview");
    setEditingPostId(null);
    if (onSelectSubTab) onSelectSubTab("all-blogs");
  };

  return (
    <div className="space-y-6">
      {/* Module Navigation Sub-Tabs */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 border-b pb-4 transition-colors ${
          isDark ? "border-white/10" : "border-[#E8E2F2]"
        }`}
      >
        <div
          className={`flex items-center gap-1.5 p-1 rounded-2xl border font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider transition-colors ${
            isDark ? "bg-white/5 border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
          }`}
        >
          <button
            type="button"
            onClick={handleBackToOverview}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeModule === "overview"
                ? "bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white shadow-lg shadow-[#3BC8F6]/20"
                : isDark
                ? "text-stone-400 hover:text-white"
                : "text-stone-600 hover:text-slate-900"
            }`}
          >
            All Posts &amp; Metrics
          </button>
          <button
            type="button"
            onClick={handleStartCreate}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeModule === "editor"
                ? "bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white shadow-lg shadow-[#3BC8F6]/20"
                : isDark
                ? "text-stone-400 hover:text-white"
                : "text-stone-600 hover:text-slate-900"
            }`}
          >
            {editingPostId ? "Edit Article" : "Write New Post"}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveModule("taxonomy");
              if (onSelectSubTab) onSelectSubTab("categories");
            }}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeModule === "taxonomy"
                ? "bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white shadow-lg shadow-[#3BC8F6]/20"
                : isDark
                ? "text-stone-400 hover:text-white"
                : "text-stone-600 hover:text-slate-900"
            }`}
          >
            Categories &amp; Tags
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveModule("media");
              if (onSelectSubTab) onSelectSubTab("media");
            }}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeModule === "media"
                ? "bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white shadow-lg shadow-[#3BC8F6]/20"
                : isDark
                ? "text-stone-400 hover:text-white"
                : "text-stone-600 hover:text-slate-900"
            }`}
          >
            Media Library
          </button>
        </div>
      </div>

      {/* Screen Views */}
      {activeModule === "overview" && (
        <BlogDashboardOverview
          onStartCreate={handleStartCreate}
          onEditPost={handleEditPost}
          onOpenPreview={(post) => setPreviewPost(post)}
        />
      )}

      {activeModule === "editor" && (
        <BlogEditor
          initialPostId={editingPostId}
          onBackToList={handleBackToOverview}
          onPostSaved={() => {
            // keep editor or back to overview
          }}
        />
      )}

      {activeModule === "taxonomy" && <BlogTaxonomyManager />}

      {activeModule === "media" && <BlogMediaLibrary />}

      {/* Live Preview Modal */}
      {previewPost && (
        <BlogLivePreviewModal
          post={previewPost}
          onClose={() => setPreviewPost(null)}
        />
      )}
    </div>
  );
}
