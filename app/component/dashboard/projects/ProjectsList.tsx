"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import { Project, ProjectCategory } from "@/lib/projects/types";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";

interface ProjectsListProps {
  subTab?: string;
  onSelectSubTab?: (subTab: string) => void;
  onAddNew: () => void;
  onEdit: (project: Project) => void;
}

export default function ProjectsList({
  onAddNew,
  onEdit,
}: ProjectsListProps) {
  const { isDark } = useDashboardTheme();

  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Fetch all projects & categories from API
  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const [resProjects, resCats] = await Promise.all([
        fetch("/api/projects", { cache: "no-store" }),
        fetch("/api/projects/categories", { cache: "no-store" }),
      ]);
      if (resProjects.ok) {
        const data = await resProjects.json();
        if (data.success && Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      }
      if (resCats.ok) {
        const catData = await resCats.json();
        if (catData.success && Array.isArray(catData.categories)) {
          setCategories(catData.categories);
        }
      }
    } catch (err) {
      console.error("Failed to load projects/categories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3500);
  };

  // Toggle Featured on Homepage
  const handleToggleFeatured = async (project: Project) => {
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !project.isFeatured }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProjects((prev) =>
          prev.map((p) => (p.id === project.id ? { ...p, isFeatured: !project.isFeatured } : p))
        );
        showNotification(
          !project.isFeatured
            ? `⭐ "${project.title}" is now featured on the homepage portfolio!`
            : `Removed "${project.title}" from homepage featured portfolio.`
        );
      } else {
        throw new Error(data.error || "Failed to toggle featured status");
      }
    } catch (err: any) {
      showNotification(err.message || "Failed to update featured status", "error");
    }
  };

  // Delete Project
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        showNotification(`Project "${deleteTarget.title}" deleted successfully.`);
      } else {
        throw new Error(data.error || "Failed to delete project");
      }
    } catch (err: any) {
      showNotification(err.message || "Delete failed", "error");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  // Filter projects by search query and category
  const filteredProjects = projects.filter((project) => {
    if (categoryFilter !== "all") {
      const s = (project.service || "").toLowerCase();
      if (!s.includes(categoryFilter.toLowerCase())) return false;
    }

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(q) ||
      project.subtitle.toLowerCase().includes(q) ||
      project.client.toLowerCase().includes(q) ||
      project.service.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
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

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase mb-1">
            <span className="text-stone-400">CONSOLE</span>
            <span className="text-stone-400">&bull;</span>
            <span className="text-[#3BC8F6]">PROJECTS</span>
            <span className="text-stone-400">&bull;</span>
            <span className="text-[#C07DFF]">ALL PROJECTS</span>
          </div>
          <h2
            className={`font-[family-name:var(--font-oswald)] uppercase font-extrabold text-2xl sm:text-3xl tracking-tight ${
              isDark ? "text-white" : "text-[#111111]"
            }`}
          >
            All <span className="text-brand-gradient">Projects</span>
          </h2>
          <p className={`font-sans text-xs sm:text-sm ${isDark ? "text-stone-400" : "text-stone-600"}`}>
            Manage project cover images, titles, descriptions, and direct URLs accessible on the frontend.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onAddNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider shadow-lg shadow-[#3BC8F6]/20 hover:opacity-95 transition-all active:scale-95 cursor-pointer"
          >
            <AsteriskIcon className="w-3.5 h-3.5 text-white" color="currentColor" strokeWidth={3} />
            <span>+ Add Project</span>
          </button>
        </div>
      </div>

      {/* Search Bar & Category Filter */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
          isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
        }`}
      >
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              categoryFilter === "all"
                ? "bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-bold shadow-sm"
                : isDark
                ? "bg-white/5 text-stone-300 hover:bg-white/10 border border-white/5"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200"
            }`}
          >
            <span>All Projects</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                categoryFilter === "all"
                  ? "bg-black/30 text-white"
                  : isDark
                  ? "bg-white/10 text-stone-400"
                  : "bg-stone-200 text-stone-600"
              }`}
            >
              {projects.length}
            </span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                categoryFilter.toLowerCase() === cat.name.toLowerCase()
                  ? "bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-bold shadow-sm"
                  : isDark
                  ? "bg-white/5 text-stone-300 hover:bg-white/10 border border-white/5"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200"
              }`}
            >
              <span>{cat.name}</span>
              {cat.projectCount !== undefined && cat.projectCount > 0 && (
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                    categoryFilter.toLowerCase() === cat.name.toLowerCase()
                      ? "bg-black/30 text-white"
                      : isDark
                      ? "bg-white/10 text-stone-400"
                      : "bg-stone-200 text-stone-600"
                  }`}
                >
                  {cat.projectCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, description..."
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs font-sans transition-all border outline-none ${
              isDark
                ? "bg-white/5 border-white/10 text-white placeholder-stone-500 focus:border-[#3BC8F6]"
                : "bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400 focus:border-[#C07DFF]"
            }`}
          />
          <svg
            className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
              isDark ? "text-stone-500" : "text-stone-400"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 rounded-xl border border-[#3BC8F6]/30 flex items-center justify-center animate-spin">
            <AsteriskIcon className="w-6 h-6 text-[#3BC8F6]" color="#3BC8F6" strokeWidth={3} />
          </div>
          <p className="text-xs font-mono text-stone-400 uppercase tracking-widest">
            Loading projects from database...
          </p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div
          className={`py-16 text-center rounded-2xl border border-dashed p-8 space-y-4 ${
            isDark ? "border-white/10 bg-white/[0.01]" : "border-stone-200 bg-stone-50/50"
          }`}
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-[#C07DFF]/10 flex items-center justify-center">
            <AsteriskIcon className="w-6 h-6 text-[#C07DFF]" color="#C07DFF" strokeWidth={2.5} />
          </div>
          <h3
            className={`font-[family-name:var(--font-oswald)] uppercase font-bold text-xl ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            No Projects Found
          </h3>
          <p className={`font-sans text-xs max-w-sm mx-auto ${isDark ? "text-stone-400" : "text-stone-600"}`}>
            {searchQuery
              ? `No projects matching "${searchQuery}". Try clearing your search.`
              : "No projects have been created yet. Click below to add your first project."}
          </p>
          <button
            onClick={onAddNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold"
          >
            + Add Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => {
            const hasLiveUrl = !!proj.liveUrl;
            const cleanBtnText = (proj.buttonText || "Live Project").replace(/[\u2197\u2192↗→]+$/, "").trim();

            return (
              <div
                key={proj.id}
                className={`rounded-2xl border transition-all overflow-hidden flex flex-col justify-between group ${
                  isDark
                    ? "bg-white/[0.03] border-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-[#3BC8F6]/5"
                    : "bg-white border-[#E8E2F2] hover:border-[#C07DFF]/50 shadow-sm hover:shadow-md"
                }`}
              >
                {/* 1. PROJECT COVER IMAGE */}
                <div className="w-full aspect-[16/10] bg-stone-950 relative overflow-hidden">
                  {proj.image ? (
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-stone-900 to-black text-white space-y-1">
                      <AsteriskIcon className="w-8 h-8 text-[#C07DFF]/40" color="#C07DFF" strokeWidth={2.5} />
                      <span className="text-xs font-mono text-stone-400 uppercase tracking-widest">
                        {proj.service}
                      </span>
                    </div>
                  )}

                  {/* Service Category Pill */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#3BC8F6] uppercase border border-white/10 font-semibold">
                    {proj.service}
                  </div>

                  {/* Homepage Featured Star Pill */}
                  {proj.isFeatured && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-amber-400/90 text-slate-950 text-[10px] font-mono font-bold uppercase shadow-sm">
                      ★ Featured
                    </div>
                  )}
                </div>

                {/* 2. PROJECT TITLE & SHORT DESCRIPTION */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3
                      className={`font-[family-name:var(--font-oswald)] uppercase font-bold text-xl leading-tight transition-colors group-hover:text-[#C07DFF] ${
                        isDark ? "text-white" : "text-[#111111]"
                      }`}
                    >
                      {proj.title}
                    </h3>

                    {/* Short Description */}
                    <p
                      className={`font-sans text-xs mt-1.5 line-clamp-2 ${
                        isDark ? "text-stone-400" : "text-stone-600"
                      }`}
                    >
                      {proj.subtitle || "No description provided."}
                    </p>
                  </div>

                  {/* 3. ACCESSIBLE URL BUTTON & CONTROLS */}
                  <div
                    className={`pt-3 border-t flex items-center justify-between gap-2 ${
                      isDark ? "border-white/5" : "border-stone-100"
                    }`}
                  >
                    {/* Left: Project Link to Access the URL */}
                    {hasLiveUrl ? (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3BC8F6]/15 hover:bg-[#3BC8F6] text-[#3BC8F6] hover:text-white font-[family-name:var(--font-oswald)] uppercase text-[11px] font-bold tracking-wider transition-all border border-[#3BC8F6]/30 cursor-pointer shadow-sm active:scale-95"
                      >
                        <span>{cleanBtnText}</span>
                        <span className="text-xs font-normal">&nearr;</span>
                      </a>
                    ) : (
                      <span className="text-[10px] font-mono text-stone-400 italic">
                        No URL attached
                      </span>
                    )}

                    {/* Right: Star Toggle & Edit/Delete Controls */}
                    <div className="flex items-center gap-1">
                      {/* Homepage Featured Star Toggle */}
                      <button
                        onClick={() => handleToggleFeatured(proj)}
                        title={proj.isFeatured ? "Featured on Homepage Portfolio (click to unfeature)" : "Feature on Homepage Portfolio"}
                        className={`p-1.5 rounded-lg text-xs transition-all border cursor-pointer ${
                          proj.isFeatured
                            ? "bg-amber-400/20 text-amber-300 border-amber-400/40"
                            : isDark
                            ? "bg-white/5 text-stone-400 border-white/5 hover:text-white"
                            : "bg-stone-100 text-stone-400 border-stone-200 hover:text-stone-700"
                        }`}
                      >
                        <span>{proj.isFeatured ? "★" : "☆"}</span>
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => onEdit(proj)}
                        className={`p-1.5 rounded-lg text-xs transition-all border cursor-pointer ${
                          isDark
                            ? "bg-white/5 text-stone-300 border-white/5 hover:bg-white/10 hover:text-white"
                            : "bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200"
                        }`}
                        title="Edit Project"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => setDeleteTarget(proj)}
                        className={`p-1.5 rounded-lg text-xs transition-all border cursor-pointer ${
                          isDark
                            ? "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
                            : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                        }`}
                        title="Delete Project"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-lg">
                  Confirm Project Deletion
                </h3>
                <p className="text-xs text-stone-400">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-stone-400">
              Are you sure you want to delete{" "}
              <strong className={isDark ? "text-white" : "text-black"}>
                &quot;{deleteTarget.title}&quot;
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
