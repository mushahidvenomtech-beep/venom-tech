"use client";

import React, { useState, useEffect } from "react";
import { BlogCategory, BlogTag } from "@/lib/blog/types";
import { BlogStore } from "@/lib/blog/blogStore";
import { slugify } from "@/lib/blog/validation";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";

export default function BlogTaxonomyManager() {
  const { isDark } = useDashboardTheme();
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);

  // Category creation form state
  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [catColor, setCatColor] = useState("#C07DFF");
  const [editingCatId, setEditingCatId] = useState<string | null>(null);

  // Tag creation form state
  const [tagName, setTagName] = useState("");
  const [tagSlug, setTagSlug] = useState("");

  const refreshData = async () => {
    try {
      const [catRes, tagRes] = await Promise.all([
        fetch("/api/blog/categories"),
        fetch("/api/blog/tags"),
      ]);
      if (catRes.ok) {
        const catData = await catRes.json();
        if (catData.categories && Array.isArray(catData.categories)) {
          setCategories(catData.categories);
        }
      } else {
        setCategories(BlogStore.getCategories());
      }
      if (tagRes.ok) {
        const tagData = await tagRes.json();
        if (tagData.tags && Array.isArray(tagData.tags)) {
          setTags(tagData.tags);
        }
      } else {
        setTags(BlogStore.getTags());
      }
    } catch {
      setCategories(BlogStore.getCategories());
      setTags(BlogStore.getTags());
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleCatNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCatName(e.target.value);
    if (!editingCatId) {
      setCatSlug(slugify(e.target.value));
    }
  };

  const handleTagNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(e.target.value);
    setTagSlug(slugify(e.target.value));
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    const payload = {
      name: catName.trim(),
      slug: catSlug || slugify(catName),
      description: catDesc,
      color: catColor,
    };

    try {
      await fetch("/api/blog/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn("API Category create notice:", err);
    }

    try {
      if (editingCatId) {
        BlogStore.updateCategory(editingCatId, payload);
      } else {
        BlogStore.createCategory(payload);
      }
    } catch {}

    setEditingCatId(null);
    setCatName("");
    setCatSlug("");
    setCatDesc("");
    await refreshData();
    window.dispatchEvent(new Event("venom_blog_updated"));
  };

  const handleEditCategory = (cat: BlogCategory) => {
    setEditingCatId(cat.id);
    setCatName(cat.name);
    setCatSlug(cat.slug);
    setCatDesc(cat.description || "");
    setCatColor(cat.color || "#C07DFF");
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm("Delete this category?")) {
      try {
        await fetch(`/api/blog/categories?id=${encodeURIComponent(id)}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.warn("API Category delete notice:", err);
      }
      try {
        BlogStore.deleteCategory(id);
      } catch {}
      await refreshData();
      window.dispatchEvent(new Event("venom_blog_updated"));
    }
  };

  const handleSaveTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName.trim()) return;

    const payload = {
      name: tagName.trim(),
      slug: tagSlug || slugify(tagName),
    };

    try {
      await fetch("/api/blog/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn("API Tag create notice:", err);
    }

    try {
      BlogStore.createTag(payload);
    } catch {}

    setTagName("");
    setTagSlug("");
    await refreshData();
    window.dispatchEvent(new Event("venom_blog_updated"));
  };

  const handleDeleteTag = async (id: string) => {
    if (confirm("Delete this tag?")) {
      try {
        await fetch(`/api/blog/tags?id=${encodeURIComponent(id)}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.warn("API Tag delete notice:", err);
      }
      try {
        BlogStore.deleteTag(id);
      } catch {}
      await refreshData();
      window.dispatchEvent(new Event("venom_blog_updated"));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3
          className={`font-[family-name:var(--font-oswald)] uppercase font-bold text-xl sm:text-2xl tracking-tight ${
            isDark ? "text-white" : "text-[#111111]"
          }`}
        >
          Categories &amp; <span className="text-brand-gradient">Taxonomy</span>
        </h3>
        <p className={`font-sans text-xs ${isDark ? "text-stone-400" : "text-stone-600"}`}>
          Structure your content hierarchy with topical categories and searchable keyword tags.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Categories Management */}
        <div className="space-y-6">
          <div
            className={`p-5 sm:p-6 rounded-2xl border space-y-4 transition-colors ${
              isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
            }`}
          >
            <h4
              className={`font-[family-name:var(--font-oswald)] uppercase font-bold text-base tracking-wide border-b pb-3 ${
                isDark ? "border-white/10 text-white" : "border-[#E8E2F2] text-[#111111]"
              }`}
            >
              {editingCatId ? "Edit Category" : "Create New Category"}
            </h4>

            <form onSubmit={handleSaveCategory} className="space-y-4 font-sans text-xs">
              <div>
                <label
                  className={`block text-[11px] uppercase font-semibold mb-1 ${
                    isDark ? "text-stone-300" : "text-stone-700"
                  }`}
                >
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={handleCatNameChange}
                  placeholder="e.g. AI Automation, Mobile Engineering"
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#C07DFF] ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                      : "bg-white border-[#E8E2F2] text-slate-900 placeholder-stone-400 shadow-sm"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-[11px] uppercase font-semibold mb-1 ${
                    isDark ? "text-stone-300" : "text-stone-700"
                  }`}
                >
                  URL Slug
                </label>
                <input
                  type="text"
                  required
                  value={catSlug}
                  onChange={(e) => setCatSlug(slugify(e.target.value))}
                  placeholder="ai-automation"
                  className={`w-full px-3 py-2 rounded-xl border font-mono focus:outline-none focus:border-[#C07DFF] ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                      : "bg-white border-[#E8E2F2] text-slate-900 placeholder-stone-400 shadow-sm"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-[11px] uppercase font-semibold mb-1 ${
                    isDark ? "text-stone-300" : "text-stone-700"
                  }`}
                >
                  Description
                </label>
                <textarea
                  rows={2}
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  placeholder="Brief summary of articles in this category..."
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#C07DFF] resize-none ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                      : "bg-white border-[#E8E2F2] text-slate-900 placeholder-stone-400 shadow-sm"
                  }`}
                />
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <label
                    className={`block text-[11px] uppercase font-semibold mb-1 ${
                      isDark ? "text-stone-300" : "text-stone-700"
                    }`}
                  >
                    Badge Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={catColor}
                      onChange={(e) => setCatColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <span className={`font-mono text-xs ${isDark ? "text-stone-400" : "text-stone-600"}`}>
                      {catColor}
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex justify-end gap-2 pt-4">
                  {editingCatId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCatId(null);
                        setCatName("");
                        setCatSlug("");
                        setCatDesc("");
                      }}
                      className={`px-4 py-2 rounded-xl border ${
                        isDark
                          ? "bg-white/5 border-white/10 text-stone-400 hover:text-white"
                          : "bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200"
                      }`}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#C07DFF] text-white font-[family-name:var(--font-oswald)] uppercase font-bold tracking-wider hover:opacity-95 shadow-md shadow-[#C07DFF]/20"
                  >
                    {editingCatId ? "Update Category" : "+ Add Category"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Existing Categories Table */}
          <div
            className={`rounded-2xl border overflow-hidden transition-colors ${
              isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
            }`}
          >
            <div
              className={`px-5 py-3 border-b flex items-center justify-between ${
                isDark ? "border-white/10 bg-white/[0.02]" : "border-[#E8E2F2] bg-stone-50"
              }`}
            >
              <span
                className={`font-[family-name:var(--font-oswald)] uppercase font-semibold text-xs tracking-wider ${
                  isDark ? "text-stone-300" : "text-stone-700"
                }`}
              >
                Active Categories ({categories.length})
              </span>
            </div>
            <div className={`divide-y ${isDark ? "divide-white/5" : "divide-stone-100"}`}>
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`p-4 flex items-center justify-between gap-4 transition-colors ${
                    isDark ? "hover:bg-white/[0.02]" : "hover:bg-purple-50/30"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cat.color || "#C07DFF" }}
                    />
                    <div className="min-w-0">
                      <h5 className={`font-semibold text-xs truncate ${isDark ? "text-white" : "text-[#111111]"}`}>
                        {cat.name}
                      </h5>
                      <p className={`text-[11px] font-mono truncate ${isDark ? "text-stone-500" : "text-stone-500"}`}>
                        /category/{cat.slug}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] border ${
                        isDark
                          ? "bg-white/5 border-white/10 text-stone-400"
                          : "bg-stone-50 border-[#E8E2F2] text-stone-600"
                      }`}
                    >
                      {cat.postCount || 0} posts
                    </span>
                    <button
                      type="button"
                      onClick={() => handleEditCategory(cat)}
                      className="text-[#3BC8F6] hover:underline text-xs font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-rose-500 hover:underline text-xs font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tags Management */}
        <div className="space-y-6">
          <div
            className={`p-5 sm:p-6 rounded-2xl border space-y-4 transition-colors ${
              isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
            }`}
          >
            <h4
              className={`font-[family-name:var(--font-oswald)] uppercase font-bold text-base tracking-wide border-b pb-3 ${
                isDark ? "border-white/10 text-white" : "border-[#E8E2F2] text-[#111111]"
              }`}
            >
              Add New Tag
            </h4>

            <form onSubmit={handleSaveTag} className="space-y-4 font-sans text-xs">
              <div>
                <label
                  className={`block text-[11px] uppercase font-semibold mb-1 ${
                    isDark ? "text-stone-300" : "text-stone-700"
                  }`}
                >
                  Tag Name
                </label>
                <input
                  type="text"
                  required
                  value={tagName}
                  onChange={handleTagNameChange}
                  placeholder="e.g. Next.js 16, Flutter, Performance"
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#3BC8F6] ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                      : "bg-white border-[#E8E2F2] text-slate-900 placeholder-stone-400 shadow-sm"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-[11px] uppercase font-semibold mb-1 ${
                    isDark ? "text-stone-300" : "text-stone-700"
                  }`}
                >
                  Slug
                </label>
                <input
                  type="text"
                  required
                  value={tagSlug}
                  onChange={(e) => setTagSlug(slugify(e.target.value))}
                  placeholder="nextjs-16"
                  className={`w-full px-3 py-2 rounded-xl border font-mono focus:outline-none focus:border-[#3BC8F6] ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                      : "bg-white border-[#E8E2F2] text-slate-900 placeholder-stone-400 shadow-sm"
                  }`}
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#3BC8F6] text-black font-[family-name:var(--font-oswald)] uppercase font-bold tracking-wider hover:opacity-95 shadow-md shadow-[#3BC8F6]/20"
                >
                  + Add Tag
                </button>
              </div>
            </form>
          </div>

          {/* Tags Cloud / List */}
          <div
            className={`p-5 sm:p-6 rounded-2xl border space-y-4 transition-colors ${
              isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
            }`}
          >
            <div
              className={`flex items-center justify-between border-b pb-3 ${
                isDark ? "border-white/10" : "border-[#E8E2F2]"
              }`}
            >
              <span
                className={`font-[family-name:var(--font-oswald)] uppercase font-semibold text-xs tracking-wider ${
                  isDark ? "text-stone-300" : "text-stone-700"
                }`}
              >
                All Tags ({tags.length})
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all group ${
                    isDark
                      ? "bg-white/5 hover:bg-white/10 border-white/10 text-stone-300"
                      : "bg-stone-50 hover:bg-[#F4E9FF] border-[#E8E2F2] text-stone-700 shadow-sm"
                  }`}
                >
                  <span>#{tag.name}</span>
                  <span className={`text-[10px] ${isDark ? "text-stone-500" : "text-stone-400"}`}>
                    ({tag.postCount || 0})
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteTag(tag.id)}
                    className="text-stone-400 hover:text-rose-500 font-bold ml-1"
                    title="Delete Tag"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

