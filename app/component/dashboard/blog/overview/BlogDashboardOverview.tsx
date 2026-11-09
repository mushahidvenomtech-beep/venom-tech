"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { BlogPost, BlogStatistics, PostStatus, BlogCategory } from "@/lib/blog/types";
import { BlogStore } from "@/lib/blog/blogStore";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";

interface BlogDashboardOverviewProps {
  onStartCreate: () => void;
  onEditPost: (id: string) => void;
  onOpenPreview: (post: BlogPost) => void;
}

export default function BlogDashboardOverview({
  onStartCreate,
  onEditPost,
  onOpenPreview,
}: BlogDashboardOverviewProps) {
  const { isDark } = useDashboardTheme();
  const [stats, setStats] = useState<BlogStatistics>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    scheduledPosts: 0,
    reviewPosts: 0,
    totalViews: 0,
  });

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "views" | "title">("newest");

  // Selection & Bulk Actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkOperating, setIsBulkOperating] = useState(false);

  // Quick Edit Modal State
  const [quickEditPost, setQuickEditPost] = useState<BlogPost | null>(null);
  const [quickEditTitle, setQuickEditTitle] = useState("");
  const [quickEditSlug, setQuickEditSlug] = useState("");
  const [quickEditStatus, setQuickEditStatus] = useState<PostStatus>("draft");
  const [quickEditAuthor, setQuickEditAuthor] = useState("");
  const [quickEditCategories, setQuickEditCategories] = useState<string[]>([]);
  const [isSavingQuickEdit, setIsSavingQuickEdit] = useState(false);
  const [categories, setCategories] = useState<BlogCategory[]>(() => BlogStore.getCategories());

  useEffect(() => {
    fetch("/api/blog/categories")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.categories && Array.isArray(data.categories) && data.categories.length > 0) {
          setCategories(data.categories);
        }
      })
      .catch(() => {});
  }, []);

  // Load Data from Database Backend with Fallback
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        status: statusFilter,
        category: categoryFilter,
        search: searchTerm,
        sortBy,
        page: page.toString(),
        pageSize: "8",
      });

      const res = await fetch(`/api/blog/posts?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.posts && Array.isArray(data.posts)) {
          setPosts(data.posts);
          setTotal(data.total || 0);
          setTotalPages(data.totalPages || 1);
          if (data.stats) {
            setStats(data.stats);
          }
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Fallback to local store
    }

    try {
      const s = BlogStore.getStatistics();
      setStats(s);

      const res = BlogStore.getPosts({
        status: statusFilter,
        category: categoryFilter,
        search: searchTerm,
        sortBy,
        page,
        pageSize: 8,
      });

      setPosts(res.posts);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (e) {
      console.warn("Failed loading posts:", e);
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, categoryFilter, searchTerm, sortBy, page]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Selection handling
  const toggleSelectAll = () => {
    if (selectedIds.length === posts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(posts.map((p) => p.id));
    }
  };

  const toggleSelectPost = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // CRUD Operations
  // 1. Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this article?")) return;

    try {
      await fetch(`/api/blog/posts/${id}`, { method: "DELETE" });
    } catch (e) {
      console.warn("Backend delete sync notice:", e);
    }
    BlogStore.deletePost(id);
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    loadData();
  };

  // 2. Duplicate
  const handleDuplicate = async (id: string) => {
    const duplicated = BlogStore.duplicatePost(id);
    if (duplicated) {
      try {
        await fetch("/api/blog/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(duplicated),
        });
      } catch (e) {
        console.warn("Backend duplicate sync notice:", e);
      }
      loadData();
      alert(`Article duplicated as "${duplicated.title}".`);
    }
  };

  // 3. Status Change
  const handleQuickStatusChange = async (id: string, newStatus: PostStatus) => {
    const updated = BlogStore.updatePost(id, { status: newStatus }, false);
    loadData();
    if (updated) {
      try {
        await fetch(`/api/blog/posts/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
      } catch (e) {
        console.warn("Backend status update sync notice:", e);
      }
    }
  };

  // 4. Quick Edit
  const openQuickEdit = (post: BlogPost) => {
    setQuickEditPost(post);
    setQuickEditTitle(post.title);
    setQuickEditSlug(post.slug);
    setQuickEditStatus(post.status);
    setQuickEditAuthor(post.author.name);
    setQuickEditCategories(post.categories || []);
  };

  const saveQuickEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickEditPost) return;

    setIsSavingQuickEdit(true);
    const updates: Partial<BlogPost> = {
      title: quickEditTitle,
      slug: quickEditSlug,
      status: quickEditStatus,
      author: { ...quickEditPost.author, name: quickEditAuthor },
      categories: quickEditCategories,
      publishedAt:
        quickEditStatus === "published" && !quickEditPost.publishedAt
          ? new Date().toISOString()
          : quickEditPost.publishedAt,
    };

    BlogStore.updatePost(quickEditPost.id, updates, false);

    try {
      await fetch(`/api/blog/posts/${quickEditPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...quickEditPost, ...updates }),
      });
    } catch (err) {
      console.warn("Backend quick edit sync error:", err);
    }

    setIsSavingQuickEdit(false);
    setQuickEditPost(null);
    loadData();
  };

  // 5. Bulk Operations
  const handleBulkStatusChange = async (status: PostStatus) => {
    if (selectedIds.length === 0) return;
    setIsBulkOperating(true);

    for (const id of selectedIds) {
      BlogStore.updatePost(id, { status }, false);
      try {
        const post = BlogStore.getPostById(id);
        if (post) {
          await fetch(`/api/blog/posts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post),
          });
        }
      } catch {}
    }

    setIsBulkOperating(false);
    setSelectedIds([]);
    loadData();
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} selected articles?`)) {
      return;
    }

    setIsBulkOperating(true);
    for (const id of selectedIds) {
      BlogStore.deletePost(id);
      try {
        await fetch(`/api/blog/posts/${id}`, { method: "DELETE" });
      } catch {}
    }

    setIsBulkOperating(false);
    setSelectedIds([]);
    loadData();
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2
            className={`font-[family-name:var(--font-oswald)] uppercase font-extrabold text-2xl sm:text-3xl tracking-tight ${
              isDark ? "text-white" : "text-[#111111]"
            }`}
          >
            Blog &amp; Editorial <span className="text-brand-gradient">Control Center</span>
          </h2>
          <p className={`font-sans text-xs sm:text-sm ${isDark ? "text-stone-400" : "text-stone-600"}`}>
            Manage database articles, filter draft pipelines, update statuses, and monitor live metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadData}
            disabled={isLoading}
            className={`px-3 py-2.5 rounded-xl border font-mono text-xs transition-all flex items-center gap-1.5 ${
              isDark
                ? "bg-white/5 hover:bg-white/10 text-stone-300 border-white/10"
                : "bg-white hover:bg-stone-50 text-stone-700 border-[#E8E2F2] shadow-sm"
            }`}
            title="Refresh articles from database"
          >
            <span className={isLoading ? "animate-spin" : ""}>🔄</span>
            <span>Refresh</span>
          </button>
          <Link
            href="/screens/blogs"
            target="_blank"
            className={`px-4 py-2.5 rounded-xl border font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider transition-all ${
              isDark
                ? "bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border-white/10"
                : "bg-white hover:bg-stone-50 text-stone-700 border-[#E8E2F2] shadow-sm"
            }`}
          >
            Public Journal &nearr;
          </Link>
          <button
            type="button"
            onClick={onStartCreate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider shadow-lg shadow-[#3BC8F6]/20 hover:opacity-95 transition-all"
          >
            + Write New Post
          </button>
        </div>
      </div>

      {/* Interactive Telemetry & Stat Filter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          type="button"
          onClick={() => {
            setStatusFilter("all");
            setPage(1);
          }}
          className={`p-4 rounded-2xl border space-y-1 transition-all text-left ${
            statusFilter === "all"
              ? "ring-2 ring-[#C07DFF] bg-[#C07DFF]/10 border-[#C07DFF]"
              : isDark
              ? "bg-white/[0.03] border-white/10 hover:border-white/30"
              : "bg-white border-[#E8E2F2] hover:border-purple-300 shadow-sm"
          }`}
        >
          <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? "text-stone-400" : "text-stone-600"}`}>
            Total Posts
          </span>
          <p className={`font-[family-name:var(--font-oswald)] text-2xl font-bold ${isDark ? "text-white" : "text-[#111111]"}`}>
            {stats.totalPosts}
          </p>
        </button>

        <button
          type="button"
          onClick={() => {
            setStatusFilter("published");
            setPage(1);
          }}
          className={`p-4 rounded-2xl border space-y-1 transition-all text-left ${
            statusFilter === "published"
              ? "ring-2 ring-emerald-500 bg-emerald-500/10 border-emerald-500"
              : isDark
              ? "bg-white/[0.03] border-emerald-500/20 hover:border-emerald-500/40"
              : "bg-white border-emerald-300/60 hover:border-emerald-400 shadow-sm"
          }`}
        >
          <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? "text-emerald-400" : "text-emerald-700 font-semibold"}`}>
            Published
          </span>
          <p className={`font-[family-name:var(--font-oswald)] text-2xl font-bold ${isDark ? "text-emerald-300" : "text-emerald-700"}`}>
            {stats.publishedPosts}
          </p>
        </button>

        <button
          type="button"
          onClick={() => {
            setStatusFilter("review");
            setPage(1);
          }}
          className={`p-4 rounded-2xl border space-y-1 transition-all text-left ${
            statusFilter === "review"
              ? "ring-2 ring-amber-500 bg-amber-500/10 border-amber-500"
              : isDark
              ? "bg-white/[0.03] border-amber-500/20 hover:border-amber-500/40"
              : "bg-white border-amber-300/60 hover:border-amber-400 shadow-sm"
          }`}
        >
          <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? "text-amber-400" : "text-amber-700 font-semibold"}`}>
            Review Queue
          </span>
          <p className={`font-[family-name:var(--font-oswald)] text-2xl font-bold ${isDark ? "text-amber-300" : "text-amber-700"}`}>
            {stats.reviewPosts}
          </p>
        </button>

        <button
          type="button"
          onClick={() => {
            setStatusFilter("draft");
            setPage(1);
          }}
          className={`p-4 rounded-2xl border space-y-1 transition-all text-left ${
            statusFilter === "draft"
              ? "ring-2 ring-stone-400 bg-stone-500/10 border-stone-400"
              : isDark
              ? "bg-white/[0.03] border-stone-500/20 hover:border-stone-500/40"
              : "bg-white border-stone-200 hover:border-stone-400 shadow-sm"
          }`}
        >
          <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? "text-stone-400" : "text-stone-600"}`}>
            Drafts
          </span>
          <p className={`font-[family-name:var(--font-oswald)] text-2xl font-bold ${isDark ? "text-stone-300" : "text-stone-800"}`}>
            {stats.draftPosts}
          </p>
        </button>

        <button
          type="button"
          onClick={() => {
            setStatusFilter("scheduled");
            setPage(1);
          }}
          className={`p-4 rounded-2xl border space-y-1 transition-all text-left ${
            statusFilter === "scheduled"
              ? "ring-2 ring-[#3BC8F6] bg-[#3BC8F6]/10 border-[#3BC8F6]"
              : isDark
              ? "bg-white/[0.03] border-[#3BC8F6]/20 hover:border-[#3BC8F6]/40"
              : "bg-white border-[#3BC8F6]/40 hover:border-[#3BC8F6] shadow-sm"
          }`}
        >
          <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? "text-[#3BC8F6]" : "text-[#0284C7] font-semibold"}`}>
            Scheduled
          </span>
          <p className={`font-[family-name:var(--font-oswald)] text-2xl font-bold ${isDark ? "text-cyan-300" : "text-[#0284C7]"}`}>
            {stats.scheduledPosts}
          </p>
        </button>

        <div
          className={`p-4 rounded-2xl border space-y-1 transition-colors ${
            isDark
              ? "bg-white/[0.03] border-purple-500/20 text-purple-300"
              : "bg-white border-purple-200 text-[#7C3AED] shadow-sm"
          }`}
        >
          <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? "text-purple-400" : "text-[#7C3AED] font-semibold"}`}>
            Total Views
          </span>
          <p className={`font-[family-name:var(--font-oswald)] text-2xl font-bold ${isDark ? "text-purple-300" : "text-[#7C3AED]"}`}>
            {stats.totalViews.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filter & Live Search Toolbar */}
      <div
        className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 font-sans text-xs transition-colors ${
          isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
        }`}
      >
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono">
          {[
            { id: "all", label: "All" },
            { id: "published", label: "Published" },
            { id: "review", label: "Review" },
            { id: "draft", label: "Drafts" },
            { id: "scheduled", label: "Scheduled" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setStatusFilter(tab.id);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === tab.id
                  ? "bg-[#C07DFF] text-white font-bold shadow-sm"
                  : isDark
                  ? "bg-white/5 text-stone-400 hover:text-white"
                  : "bg-stone-100 text-stone-700 hover:text-slate-900 border border-stone-200/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category & Sorting Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs focus:outline-none transition-colors ${
              isDark
                ? "bg-white/5 border-white/10 text-stone-300"
                : "bg-white border-[#E8E2F2] text-slate-800 shadow-sm"
            }`}
          >
            <option value="all" className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}>
              All Categories
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.name} className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className={`px-3 py-1.5 rounded-xl border text-xs focus:outline-none font-mono transition-colors ${
              isDark
                ? "bg-white/5 border-white/10 text-stone-300"
                : "bg-white border-[#E8E2F2] text-slate-800 shadow-sm"
            }`}
          >
            <option value="newest" className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}>
              Sort: Newest
            </option>
            <option value="oldest" className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}>
              Sort: Oldest
            </option>
            <option value="views" className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}>
              Sort: Most Views
            </option>
            <option value="title" className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}>
              Sort: Title A-Z
            </option>
          </select>

          {/* Live Search */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder="Search posts..."
              className={`pl-8 pr-3 py-1.5 rounded-xl border text-xs focus:outline-none focus:border-[#3BC8F6] w-44 transition-colors ${
                isDark
                  ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                  : "bg-white border-[#E8E2F2] text-slate-900 placeholder-stone-400 shadow-sm"
              }`}
            />
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400">🔍</span>
          </div>
        </div>
      </div>

      {/* Bulk Action Bar (Visible when items selected) */}
      {selectedIds.length > 0 && (
        <div
          className={`p-3.5 rounded-xl border flex flex-wrap items-center justify-between gap-3 text-xs font-mono animate-fadeIn ${
            isDark
              ? "bg-[#C07DFF]/15 border-[#C07DFF]/40 text-purple-200"
              : "bg-[#F5EBFF] border-[#C07DFF]/40 text-[#7C3AED]"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-bold">{selectedIds.length} article(s) selected</span>
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="text-stone-400 hover:text-white underline ml-2"
            >
              Deselect All
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isBulkOperating}
              onClick={() => handleBulkStatusChange("published")}
              className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors shadow-sm disabled:opacity-50"
            >
              Bulk Publish
            </button>
            <button
              type="button"
              disabled={isBulkOperating}
              onClick={() => handleBulkStatusChange("draft")}
              className="px-3 py-1 rounded-lg bg-stone-700 text-white font-bold hover:bg-stone-600 transition-colors shadow-sm disabled:opacity-50"
            >
              Bulk Draft
            </button>
            <button
              type="button"
              disabled={isBulkOperating}
              onClick={handleBulkDelete}
              className="px-3 py-1 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-500 transition-colors shadow-sm disabled:opacity-50"
            >
              Bulk Delete
            </button>
          </div>
        </div>
      )}

      {/* Posts Table */}
      <div
        className={`rounded-2xl border overflow-hidden transition-colors ${
          isDark ? "bg-white/[0.03] border-white/10 shadow-2xl" : "bg-white border-[#E8E2F2] shadow-sm"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs min-w-[700px]">
            <thead>
              <tr
                className={`border-b uppercase tracking-wider font-semibold font-[family-name:var(--font-oswald)] text-[11px] ${
                  isDark
                    ? "border-white/10 bg-white/[0.02] text-stone-400"
                    : "border-[#E8E2F2] bg-stone-50/70 text-stone-600"
                }`}
              >
                <th className="py-3.5 pl-4 w-10">
                  <input
                    type="checkbox"
                    checked={posts.length > 0 && selectedIds.length === posts.length}
                    onChange={toggleSelectAll}
                    className="rounded accent-[#C07DFF] cursor-pointer"
                  />
                </th>
                <th className="py-3.5 pl-2">Article</th>
                <th className="py-3.5">Categories</th>
                <th className="py-3.5">Author</th>
                <th className="py-3.5">Status</th>
                <th className="py-3.5">Views</th>
                <th className="py-3.5 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? "divide-white/5" : "divide-stone-100"}`}>
              {posts.map((post) => {
                const isSelected = selectedIds.includes(post.id);

                return (
                  <tr
                    key={post.id}
                    className={`transition-colors group ${
                      isSelected
                        ? isDark
                          ? "bg-purple-950/20"
                          : "bg-purple-50/50"
                        : isDark
                        ? "hover:bg-white/[0.02]"
                        : "hover:bg-purple-50/30"
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 pl-4 w-10">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectPost(post.id)}
                        className="rounded accent-[#C07DFF] cursor-pointer"
                      />
                    </td>

                    {/* Title & Slug */}
                    <td className="py-4 pl-2 max-w-sm">
                      <div
                        onClick={() => onEditPost(post.id)}
                        className={`font-semibold transition-colors line-clamp-1 cursor-pointer text-sm ${
                          isDark
                            ? "text-white group-hover:text-[#3BC8F6]"
                            : "text-[#111111] group-hover:text-[#8B5CF6]"
                        }`}
                      >
                        {post.title}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[11px] font-mono truncate ${isDark ? "text-stone-500" : "text-stone-500"}`}>
                          /blog/{post.slug}
                        </span>
                        {post.status === "published" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="text-[#3BC8F6] hover:underline text-[10px] font-mono flex items-center"
                            title="View published article"
                          >
                            &nearr; View
                          </Link>
                        )}
                      </div>
                    </td>

                    {/* Categories */}
                    <td className="py-4">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {post.categories.map((c, i) => (
                          <span
                            key={i}
                            className={`px-2 py-0.5 rounded border font-mono text-[10px] ${
                              isDark
                                ? "bg-white/5 border-white/10 text-stone-300"
                                : "bg-stone-50 border-[#E8E2F2] text-stone-700"
                            }`}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Author */}
                    <td className={`py-4 font-medium ${isDark ? "text-stone-400" : "text-stone-600"}`}>
                      {post.author.name}
                    </td>

                    {/* Status Selector */}
                    <td className="py-4">
                      <select
                        value={post.status}
                        onChange={(e) => handleQuickStatusChange(post.id, e.target.value as PostStatus)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold font-mono border focus:outline-none cursor-pointer ${
                          post.status === "published"
                            ? isDark
                              ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                              : "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : post.status === "review"
                            ? isDark
                              ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                              : "bg-amber-50 text-amber-700 border-amber-300"
                            : post.status === "scheduled"
                            ? isDark
                              ? "bg-[#3BC8F6]/15 text-cyan-300 border-[#3BC8F6]/30"
                              : "bg-cyan-50 text-[#0284C7] border-cyan-300"
                            : isDark
                            ? "bg-stone-500/15 text-stone-400 border-stone-500/30"
                            : "bg-stone-100 text-stone-700 border-stone-300"
                        }`}
                      >
                        <option value="draft" className={isDark ? "bg-slate-900 text-stone-300" : "bg-white text-stone-800"}>
                          Draft
                        </option>
                        <option value="review" className={isDark ? "bg-slate-900 text-amber-300" : "bg-white text-amber-700"}>
                          Review
                        </option>
                        <option value="scheduled" className={isDark ? "bg-slate-900 text-cyan-300" : "bg-white text-cyan-700"}>
                          Scheduled
                        </option>
                        <option value="published" className={isDark ? "bg-slate-900 text-emerald-300" : "bg-white text-emerald-700"}>
                          Published
                        </option>
                        <option value="archived" className={isDark ? "bg-slate-900 text-stone-400" : "bg-white text-stone-600"}>
                          Archived
                        </option>
                      </select>
                    </td>

                    {/* Views */}
                    <td className={`py-4 font-mono ${isDark ? "text-stone-300" : "text-stone-700 font-semibold"}`}>
                      {post.views.toLocaleString()}
                    </td>

                    {/* Actions */}
                    <td className="py-4 pr-6 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openQuickEdit(post)}
                          className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-all ${
                            isDark
                              ? "bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border-white/10"
                              : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-[#E8E2F2]"
                          }`}
                          title="Quick Edit Title, Slug, &amp; Taxonomies"
                        >
                          Quick
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenPreview(post)}
                          className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-all ${
                            isDark
                              ? "bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border-white/10"
                              : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-[#E8E2F2]"
                          }`}
                          title="Preview post"
                        >
                          Preview
                        </button>
                        <button
                          type="button"
                          onClick={() => onEditPost(post.id)}
                          className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-all ${
                            isDark
                              ? "bg-[#C07DFF]/20 hover:bg-[#C07DFF] hover:text-white text-purple-200 border-[#C07DFF]/30"
                              : "bg-[#F4E9FF] hover:bg-[#C07DFF] hover:text-white text-[#8B5CF6] border-[#C07DFF]/40 font-semibold"
                          }`}
                          title="Full Block Editor"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDuplicate(post.id)}
                          className={`px-2 py-1 rounded-lg border text-[11px] font-mono transition-all ${
                            isDark
                              ? "bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white border-white/10"
                              : "bg-stone-50 hover:bg-stone-100 text-stone-600 border-[#E8E2F2]"
                          }`}
                          title="Duplicate article"
                        >
                          ⧉
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id)}
                          className={`px-2 py-1 rounded-lg border text-[11px] font-mono transition-all ${
                            isDark
                              ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/20"
                              : "bg-rose-50 hover:bg-rose-100 text-rose-600 border-rose-200"
                          }`}
                          title="Delete article permanently"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {posts.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="max-w-sm mx-auto space-y-3">
                      <p className={`font-mono text-sm font-semibold ${isDark ? "text-stone-300" : "text-stone-700"}`}>
                        No blog articles found.
                      </p>
                      <p className={`text-xs ${isDark ? "text-stone-500" : "text-stone-500"}`}>
                        No articles match the current filter criteria or the database is currently empty.
                      </p>
                      <button
                        type="button"
                        onClick={onStartCreate}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-semibold tracking-wider hover:opacity-90 transition-opacity shadow-sm"
                      >
                        <span>+ Write New Post</span>
                      </button>
                    </div>
                  </td>
                </tr>
              )}

              {isLoading && (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="inline-flex items-center gap-2 font-mono text-xs text-stone-400">
                      <span className="w-4 h-4 border-2 border-[#C07DFF] border-t-transparent rounded-full animate-spin" />
                      <span>Loading database articles...</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div
            className={`p-4 border-t flex items-center justify-between text-xs font-mono transition-colors ${
              isDark
                ? "border-white/10 bg-white/[0.01] text-stone-400"
                : "border-[#E8E2F2] bg-stone-50/70 text-stone-600"
            }`}
          >
            <span>
              Showing page {page} of {totalPages} ({total} total posts)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={`px-3 py-1 rounded-lg disabled:opacity-30 border transition-all ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10 border-white/10"
                    : "bg-white hover:bg-stone-100 border-[#E8E2F2] shadow-sm text-stone-700"
                }`}
              >
                &larr; Prev
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={`px-3 py-1 rounded-lg disabled:opacity-30 border transition-all ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10 border-white/10"
                    : "bg-white hover:bg-stone-100 border-[#E8E2F2] shadow-sm text-stone-700"
                }`}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Edit Modal */}
      {quickEditPost && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`w-full max-w-lg rounded-2xl border p-6 space-y-5 transition-colors shadow-2xl ${
              isDark ? "bg-slate-900 border-white/10 text-white" : "bg-white border-[#E8E2F2] text-slate-900"
            }`}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-lg">
                  Quick Edit Article
                </h3>
                <p className="font-mono text-[11px] text-stone-400">ID: {quickEditPost.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setQuickEditPost(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={saveQuickEdit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block uppercase font-mono font-semibold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={quickEditTitle}
                  onChange={(e) => setQuickEditTitle(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#3BC8F6] ${
                    isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-[#E8E2F2] text-black"
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-mono font-semibold mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    value={quickEditSlug}
                    onChange={(e) => setQuickEditSlug(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none font-mono ${
                      isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-[#E8E2F2] text-black"
                    }`}
                  />
                </div>

                <div>
                  <label className="block uppercase font-mono font-semibold mb-1">Status</label>
                  <select
                    value={quickEditStatus}
                    onChange={(e) => setQuickEditStatus(e.target.value as PostStatus)}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none font-mono ${
                      isDark ? "bg-slate-900 border-white/10 text-white" : "bg-white border-[#E8E2F2] text-black"
                    }`}
                  >
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase font-mono font-semibold mb-1">Author Name</label>
                <input
                  type="text"
                  value={quickEditAuthor}
                  onChange={(e) => setQuickEditAuthor(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none ${
                    isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-[#E8E2F2] text-black"
                  }`}
                />
              </div>

              <div>
                <label className="block uppercase font-mono font-semibold mb-1.5">Categories</label>
                <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto p-2 rounded-xl border border-white/10">
                  {categories.map((cat) => {
                    const isChecked = quickEditCategories.includes(cat.name);
                    return (
                      <label
                        key={cat.id}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono text-[11px] cursor-pointer transition-colors ${
                          isChecked
                            ? "bg-[#C07DFF]/20 border-[#C07DFF] text-[#C07DFF] font-bold"
                            : isDark
                            ? "bg-white/5 border-white/10 text-stone-400"
                            : "bg-stone-50 border-stone-200 text-stone-700"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            setQuickEditCategories((prev) =>
                              prev.includes(cat.name)
                                ? prev.filter((c) => c !== cat.name)
                                : [...prev, cat.name]
                            );
                          }}
                          className="hidden"
                        />
                        <span>{cat.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setQuickEditPost(null)}
                  className="px-4 py-2 rounded-xl border text-stone-400 hover:text-white font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingQuickEdit}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase font-bold tracking-wider hover:opacity-90 transition-opacity shadow-md disabled:opacity-50"
                >
                  {isSavingQuickEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
