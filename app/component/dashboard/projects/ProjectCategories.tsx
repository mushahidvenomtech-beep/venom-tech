"use client";

import React, { useState, useEffect } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import { ProjectCategory } from "@/lib/projects/types";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";

const COLOR_PRESETS = [
  "#3BC8F6", // Cyan
  "#C07DFF", // Purple
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EC4899", // Pink
  "#8B5CF6", // Violet
  "#EF4444", // Red
  "#6366F1", // Indigo
];

export default function ProjectCategories() {
  const { isDark } = useDashboardTheme();

  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#3BC8F6");
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Delete modal
  const [deleteTarget, setDeleteTarget] = useState<ProjectCategory | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/projects/categories", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      }
    } catch (err) {
      console.error("Failed to load project categories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3500);
  };

  // Auto-slugify
  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingId) {
      const autoSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(autoSlug);
    }
  };

  const handleEditClick = (cat: ProjectCategory) => {
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || "");
    setColor(cat.color || "#3BC8F6");
    setDisplayOrder(cat.displayOrder || 0);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
    setSlug("");
    setDescription("");
    setColor("#3BC8F6");
    setDisplayOrder(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showNotification("Category name is required", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: description.trim(),
        color,
        displayOrder: Number(displayOrder) || 0,
      };

      if (editingId) {
        const res = await fetch(`/api/projects/categories/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setCategories((prev) =>
            prev.map((c) => (c.id === editingId ? { ...c, ...data.category } : c))
          );
          showNotification(`Category "${name}" updated successfully!`);
          handleCancelEdit();
        } else {
          throw new Error(data.error || "Failed to update category");
        }
      } else {
        const res = await fetch("/api/projects/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setCategories((prev) => [...prev, data.category]);
          showNotification(`Category "${name}" added to database!`);
          handleCancelEdit();
        } else {
          throw new Error(data.error || "Failed to create category");
        }
      }
    } catch (err: any) {
      showNotification(err.message || "Failed to save category", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects/categories/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
        showNotification(`Category "${deleteTarget.name}" deleted.`);
      } else {
        throw new Error(data.error || "Failed to delete category");
      }
    } catch (err: any) {
      showNotification(err.message || "Delete failed", "error");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs font-mono transition-all animate-in fade-in slide-in-from-top duration-300 ${
            feedback.type === "success"
              ? isDark
                ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-300"
                : "bg-emerald-50 border-emerald-300 text-emerald-800"
              : isDark
              ? "bg-red-950/80 border-red-500/30 text-red-300"
              : "bg-red-50 border-red-300 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="hover:opacity-70 text-base leading-none px-2"
          >
            &times;
          </button>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase mb-1">
          <span className="text-stone-400">CONSOLE</span>
          <span className="text-stone-400">&bull;</span>
          <span className="text-[#3BC8F6]">PROJECTS</span>
          <span className="text-stone-400">&bull;</span>
          <span className="text-[#C07DFF]">CATEGORIES</span>
        </div>
        <h2
          className={`font-[family-name:var(--font-oswald)] uppercase font-extrabold text-2xl sm:text-3xl tracking-tight ${
            isDark ? "text-white" : "text-[#111111]"
          }`}
        >
          Project <span className="text-brand-gradient">Categories &amp; Taxonomy</span>
        </h2>
        <p className={`font-sans text-xs sm:text-sm ${isDark ? "text-stone-400" : "text-stone-600"}`}>
          Create and manage categories that filter projects in the dashboard and frontend showcase.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Add / Edit Category Form */}
        <div
          className={`lg:col-span-5 rounded-2xl p-6 border shadow-sm space-y-5 ${
            isDark ? "bg-slate-900/80 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/60 dark:border-white/10">
            <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-lg">
              {editingId ? "Edit Category" : "Add New Category"}
            </h3>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-xs uppercase font-mono text-stone-400 hover:text-white"
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold mb-1 text-stone-700 dark:text-stone-300">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. AI Automation, Web Design"
                required
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold mb-1 text-stone-700 dark:text-stone-300">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. ai-automation"
                required
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold mb-1 text-stone-700 dark:text-stone-300">
                Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief category summary"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
              />
            </div>

            {/* Color Accent Presets */}
            <div>
              <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold mb-1.5 text-stone-700 dark:text-stone-300">
                Badge Color
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {COLOR_PRESETS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                      color === c ? "scale-110 border-white shadow-md" : "border-transparent opacity-80 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold mb-1 text-stone-700 dark:text-stone-300">
                Display Order
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(Number(e.target.value))}
                placeholder="1"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider shadow-md hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "Saving..." : editingId ? "Update Category" : "+ Add Category"}
              </button>
            </div>
          </form>
        </div>

        {/* Right: Existing Categories List */}
        <div
          className={`lg:col-span-7 rounded-2xl p-6 border shadow-sm space-y-4 ${
            isDark ? "bg-slate-900/80 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/60 dark:border-white/10">
            <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-lg">
              Existing Categories ({categories.length})
            </h3>
            <span className="text-[11px] font-mono text-stone-400">
              Synced with MySQL
            </span>
          </div>

          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <div className="w-8 h-8 rounded-lg border border-[#3BC8F6]/30 animate-spin flex items-center justify-center">
                <AsteriskIcon className="w-5 h-5 text-[#3BC8F6]" color="#3BC8F6" strokeWidth={3} />
              </div>
              <p className="text-xs font-mono text-stone-400 uppercase tracking-widest">
                Loading categories...
              </p>
            </div>
          ) : categories.length === 0 ? (
            <div className="py-12 text-center text-xs text-stone-400">
              No categories found. Add your first category using the form.
            </div>
          ) : (
            <div className="space-y-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                    isDark
                      ? "bg-white/[0.02] border-white/10 hover:border-white/20"
                      : "bg-stone-50 border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: cat.color || "#3BC8F6" }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-[family-name:var(--font-oswald)] uppercase font-bold text-base tracking-tight">
                          {cat.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#3BC8F6]/10 text-[#3BC8F6] border border-[#3BC8F6]/20">
                          {cat.projectCount || 0} projects
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-stone-400 mt-0.5">
                        <span>slug: {cat.slug}</span>
                        {cat.description && <span>&bull; {cat.description}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditClick(cat)}
                      className="p-1.5 rounded-lg border border-stone-300 dark:border-white/10 hover:bg-stone-200 dark:hover:bg-white/10 text-xs cursor-pointer"
                      title="Edit"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setDeleteTarget(cat)}
                      className="p-1.5 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10 text-xs cursor-pointer"
                      title="Delete"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${
              isDark ? "bg-slate-900 border-white/10 text-white" : "bg-white border-[#E8E2F2] text-slate-900"
            }`}
          >
            <div className="flex items-center gap-3 text-red-400">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-lg">
                  Confirm Category Deletion
                </h3>
                <p className="text-xs text-stone-400">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-stone-400">
              Are you sure you want to delete category{" "}
              <strong className={isDark ? "text-white" : "text-black"}>
                &quot;{deleteTarget.name}&quot;
              </strong>
              ?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider border cursor-pointer ${
                  isDark
                    ? "bg-white/5 border-white/10 text-stone-300 hover:bg-white/10"
                    : "bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200"
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl text-xs font-[family-name:var(--font-oswald)] uppercase font-bold tracking-wider bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20 disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

