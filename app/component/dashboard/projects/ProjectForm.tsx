"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import { Project, NewProjectInput, ProjectCategory } from "@/lib/projects/types";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";

interface ProjectFormProps {
  initialProject?: Project | null;
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function ProjectForm({
  initialProject,
  onSuccess,
  onCancel,
}: ProjectFormProps) {
  const { isDark } = useDashboardTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Core fields requested by user
  const [coverImage, setCoverImage] = useState(initialProject?.image || "");
  const [title, setTitle] = useState(initialProject?.title || "");
  const [description, setDescription] = useState(
    initialProject?.subtitle || ""
  );
  const [projectLink, setProjectLink] = useState(initialProject?.liveUrl || "");

  // Ancillary optional fields with smart defaults
  const [service, setService] = useState(
    initialProject?.service || "Web Design"
  );
  const [availableCategories, setAvailableCategories] = useState<ProjectCategory[]>([]);
  const [client, setClient] = useState(initialProject?.client || "Venom Partner");
  const [buttonText, setButtonText] = useState(
    initialProject?.buttonText || "Live Project ↗"
  );
  const [isFeatured, setIsFeatured] = useState<boolean>(
    initialProject?.isFeatured ?? true
  );

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/projects/categories");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.categories)) {
            setAvailableCategories(data.categories);
            if (!initialProject && data.categories.length > 0 && !service) {
              setService(data.categories[0].name);
            }
          }
        }
      } catch (err) {
        // Fallback silently
      }
    }
    loadCategories();
  }, [initialProject, service]);

  // Handle local computer image upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (JPEG, PNG, WEBP).");
      return;
    }

    setIsUploading(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/projects/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload image");
      }

      setCoverImage(data.url);
      setSuccessMessage("Project cover image uploaded successfully from your computer!");
      setTimeout(() => setSuccessMessage(""), 3500);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!title.trim()) {
      setErrorMessage("Project Title is required.");
      return;
    }

    setIsSubmitting(true);

    const payload: NewProjectInput = {
      title: title.trim(),
      subtitle: description.trim() || service,
      client: client.trim() || "Venom Partner",
      service: service.trim() || "Web Design & Development",
      year: initialProject?.year || "2026",
      progress: initialProject?.progress ?? 100,
      status: initialProject?.status || "Completed",
      team: initialProject?.team || "Core Engineering",
      dueDate: initialProject?.dueDate || "Delivered",
      liveUrl: projectLink.trim(),
      caseStudyUrl: initialProject?.caseStudyUrl || "/screens/portfolio",
      buttonText: buttonText.trim() || "Live Project ↗",
      image: coverImage.trim(),
      mockupType: coverImage.trim() ? "custom_image" : (initialProject?.mockupType || "laptop"),
      displayOrder: initialProject?.displayOrder ?? 1,
      isFeatured,
      isActive: true,
    };

    try {
      let res;
      if (initialProject?.id) {
        res = await fetch(`/api/projects/${initialProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save project");
      }

      setSuccessMessage(
        initialProject ? "Project updated successfully!" : "Project published and stored in database!"
      );
      setTimeout(() => {
        onSuccess();
      }, 700);
    } catch (err: any) {
      setErrorMessage(err.message || "Error saving project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Form Fields */}
      <div
        className={`lg:col-span-7 rounded-2xl p-6 sm:p-8 border shadow-sm ${
          isDark
            ? "bg-slate-900/80 border-white/10 text-white"
            : "bg-white border-stone-200 text-stone-900"
        }`}
      >
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-200/60 dark:border-white/10">
          <div>
            <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl tracking-wide">
              {initialProject ? "Edit Project" : "Add Project"}
            </h3>
            <p className="font-sans text-xs text-stone-500 mt-1">
              Add cover image, project title, description, and the accessible live URL.
            </p>
          </div>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-xs uppercase tracking-wider font-semibold text-stone-500 hover:text-black dark:hover:text-white px-3 py-1.5 rounded-lg border border-stone-300 dark:border-white/20 cursor-pointer"
            >
              &larr; Back to All Projects
            </button>
          )}
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. PROJECT COVER IMAGE */}
          <div className="space-y-2">
            <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-bold text-stone-800 dark:text-stone-200">
              1. Project Cover Image <span className="text-[#C07DFF]">*</span>
            </label>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              Upload a project showcase cover image from your local computer or provide a direct image link.
            </p>

            <div
              className={`p-5 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center ${
                coverImage
                  ? "border-[#C07DFF] bg-[#F4E9FF]/10 dark:bg-purple-950/20"
                  : isDark
                  ? "border-white/20 hover:border-[#3BC8F6] bg-white/[0.02]"
                  : "border-stone-300 hover:border-[#C07DFF] bg-stone-50/60"
              }`}
            >
              {coverImage ? (
                <div className="w-full space-y-3">
                  <div className="relative w-full aspect-[16/9] max-h-56 rounded-xl overflow-hidden border border-stone-200 dark:border-white/10 shadow-md mx-auto">
                    <Image
                      src={coverImage}
                      alt="Project Cover Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider bg-stone-900 text-white hover:bg-black dark:bg-white dark:text-stone-900 cursor-pointer"
                    >
                      Change Cover Image
                    </button>
                    <button
                      type="button"
                      onClick={() => setCoverImage("")}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider text-red-500 hover:bg-red-500/10 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 py-2">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#C07DFF]/20 to-[#3BC8F6]/20 flex items-center justify-center text-[#C07DFF]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider shadow-md hover:opacity-95 transition-all cursor-pointer"
                    >
                      {isUploading ? "Uploading Image..." : "Upload Cover from Computer"}
                    </button>
                    <p className="text-[11px] text-stone-400 mt-2">
                      PNG, JPG, WEBP up to 10MB
                    </p>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Optional Image URL Input */}
            <div className="pt-1">
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Or paste external image URL (e.g. /images/projects/project.webp)"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-white/10 bg-transparent text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
              />
            </div>
          </div>

          {/* 2. PROJECT TITLE */}
          <div className="space-y-1.5">
            <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-bold text-stone-800 dark:text-stone-200">
              2. Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Aura Spatial Sound"
              required
              className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
            />
          </div>

          {/* 3. SHORT DESCRIPTION */}
          <div className="space-y-1.5">
            <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-bold text-stone-800 dark:text-stone-200">
              3. Short Description <span className="text-[#C07DFF]">*</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Next.js Flagship / UI & UX and spatial audio platform designed for next-gen consumer audio."
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
            />
          </div>

          {/* 4. PROJECT LINK TO ACCESS URL */}
          <div className="p-4 sm:p-5 rounded-2xl border border-[#3BC8F6]/30 bg-[#3BC8F6]/5 dark:bg-cyan-950/20 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-bold text-[#0284C7] dark:text-[#3BC8F6]">
                4. Project Link to Access the URL <span className="text-red-500">*</span>
              </label>
              {projectLink && (
                <a
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-[#3BC8F6] hover:underline inline-flex items-center gap-1"
                >
                  <span>Test Link</span>
                  <span>&nearr;</span>
                </a>
              )}
            </div>

            <input
              type="url"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              placeholder="https://aura-sound.io"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-white/10 bg-white dark:bg-slate-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#3BC8F6]"
            />

            <div className="flex items-center gap-3 pt-1">
              <label className="text-[11px] font-[family-name:var(--font-oswald)] uppercase font-semibold text-stone-600 dark:text-stone-400 shrink-0">
                Button Label:
              </label>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                placeholder="Live Project ↗"
                className="w-48 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-white/10 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#3BC8F6]"
              />
            </div>
          </div>

          {/* Additional Settings (Category & Homepage Showcase) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-200/60 dark:border-white/10">
            <div>
              <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Category / Service
              </label>
              {availableCategories.length > 0 ? (
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-white/10 bg-white dark:bg-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
                >
                  {availableCategories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder="Web Design, AI Automation"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
                />
              )}
            </div>

            <div className="flex flex-col justify-center pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C07DFF] focus:ring-[#C07DFF] accent-[#C07DFF]"
                />
                <span className="text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-stone-800 dark:text-stone-200">
                  Feature in Homepage Portfolio
                </span>
              </label>
              <span className="text-[11px] text-stone-400 ml-6">
                Directly displayed in the homepage 3-column portfolio showcase.
              </span>
            </div>
          </div>

          {/* Form Action Controls */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200/60 dark:border-white/10">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider border border-stone-300 dark:border-white/20 text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white cursor-pointer"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider shadow-lg shadow-[#3BC8F6]/20 hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Saving Project...</span>
                </>
              ) : (
                <>
                  <AsteriskIcon className="w-3.5 h-3.5 text-white" color="currentColor" strokeWidth={3} />
                  <span>{initialProject ? "Save Changes" : "Publish Project"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Live Preview Card */}
      <div className="lg:col-span-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-stone-400">
            Live Card Preview
          </span>
          <span className="text-[11px] font-mono text-[#3BC8F6]">
            Frontend Appearance
          </span>
        </div>

        {/* Render Preview Card */}
        <div className="bg-white border border-stone-200 p-6 rounded-none shadow-md space-y-4 text-stone-900">
          {/* Cover Frame */}
          <div className="w-full aspect-[4/3] bg-stone-950 relative overflow-hidden">
            {coverImage ? (
              <Image
                src={coverImage}
                alt="Project Cover Preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-stone-900 to-black text-white space-y-2">
                <AsteriskIcon className="w-8 h-8 text-[#C07DFF]/50" color="#C07DFF" strokeWidth={2.5} />
                <span className="text-xs font-mono text-stone-400 uppercase tracking-widest">
                  No Cover Uploaded
                </span>
                <span className="text-[10px] text-stone-500">
                  Upload an image to see live preview
                </span>
              </div>
            )}
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/90 uppercase border border-white/10">
              {service || "Web Design"}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C07DFF]">
                2026
              </span>
              <span className="text-xs font-sans uppercase tracking-wider text-stone-400 font-semibold">
                01
              </span>
            </div>

            <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl text-[#111111] leading-tight">
              {title || "Project Title"}
            </h3>

            <p className="font-sans text-xs text-stone-500 uppercase tracking-wider line-clamp-2">
              {description || "Short description or deliverable scope"}
            </p>

            {/* Action button */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider shadow-sm">
                <span>{buttonText || "Live Project"}</span>
                <span className="text-[#C07DFF]">&nearr;</span>
              </div>
              <span className="text-[10px] font-mono text-stone-400">
                {projectLink ? "Link Active" : "No Link"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
