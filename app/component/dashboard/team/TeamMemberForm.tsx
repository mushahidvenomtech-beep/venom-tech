"use client";

import React, { useState, useEffect, useRef } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import TeamCard from "@/app/component/home/team/TeamCard";
import { TeamMember, NewTeamMemberInput } from "@/lib/team/types";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";

interface TeamMemberFormProps {
  initialMember?: TeamMember | null;
  onSuccess: () => void;
  onCancel?: () => void;
}

const GRADIENT_PRESETS = [
  { label: "Deep Stone", value: "from-stone-900 to-black" },
  { label: "Neutral Slate", value: "from-neutral-900 to-stone-900" },
  { label: "Dark Onyx", value: "from-stone-950 to-neutral-900" },
  { label: "Jet Pitch", value: "from-black to-stone-900" },
  { label: "Cyber Violet", value: "from-purple-950 to-stone-950" },
  { label: "Electric Indigo", value: "from-indigo-950 to-slate-950" },
];

export default function TeamMemberForm({
  initialMember,
  onSuccess,
  onCancel,
}: TeamMemberFormProps) {
  const { isDark } = useDashboardTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initialMember?.name || "");
  const [role, setRole] = useState(initialMember?.role || "");
  const [badge, setBadge] = useState(initialMember?.badge || "PARTNER");
  const [brandLabel, setBrandLabel] = useState(initialMember?.brandLabel || "CREAT");
  const [studioRole, setStudioRole] = useState(initialMember?.studioRole || "STUDIO LEAD");
  const [specialty, setSpecialty] = useState(initialMember?.specialty || "");
  const [avatarBg, setAvatarBg] = useState(initialMember?.avatarBg || "from-stone-900 to-black");
  const [image, setImage] = useState(initialMember?.image || "");
  const [initials, setInitials] = useState(initialMember?.initials || "");
  const [displayOrder, setDisplayOrder] = useState<number>(initialMember?.displayOrder ?? 1);
  const [isActive, setIsActive] = useState<boolean>(initialMember?.isActive ?? true);
  const [linkedin, setLinkedin] = useState(initialMember?.socialLinks?.linkedin || "");
  const [twitter, setTwitter] = useState(initialMember?.socialLinks?.twitter || "");
  const [github, setGithub] = useState(initialMember?.socialLinks?.github || "");

  // Uploading and submission state
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Auto calculate initials if empty
  useEffect(() => {
    if (!initials && name.trim()) {
      const parts = name.trim().split(/\s+/);
      const calculated = parts.length === 1 ? parts[0].slice(0, 2) : parts[0][0] + parts[parts.length - 1][0];
      setInitials(calculated.toUpperCase());
    }
  }, [name, initials]);

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

      const res = await fetch("/api/team/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload file");
      }

      setImage(data.url);
      setSuccessMessage("Photo uploaded successfully from local computer!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload photo");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!name.trim()) {
      setErrorMessage("Team member name is required.");
      return;
    }
    if (!role.trim()) {
      setErrorMessage("Role/Title is required.");
      return;
    }
    if (!specialty.trim()) {
      setErrorMessage("Specialty/Focus is required.");
      return;
    }

    setIsSubmitting(true);

    const payload: NewTeamMemberInput = {
      name: name.trim(),
      role: role.trim(),
      badge: badge.trim() || "PARTNER",
      brandLabel: brandLabel.trim() || "CREAT",
      studioRole: studioRole.trim() || "STUDIO LEAD",
      specialty: specialty.trim(),
      avatarBg,
      image: image.trim(),
      initials: initials.trim() || name.slice(0, 2).toUpperCase(),
      displayOrder: Number(displayOrder) || 1,
      isActive,
      socialLinks: {
        linkedin: linkedin.trim(),
        twitter: twitter.trim(),
        github: github.trim(),
      },
    };

    try {
      let res;
      if (initialMember?.id) {
        // Edit mode
        res = await fetch(`/api/team/members/${initialMember.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Create mode
        res = await fetch("/api/team/members", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save team member");
      }

      setSuccessMessage(initialMember ? "Team member updated successfully!" : "Team member added to database!");
      setTimeout(() => {
        onSuccess();
      }, 700);
    } catch (err: any) {
      setErrorMessage(err.message || "Error saving team member");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Temporary member object for live preview
  const previewMember: TeamMember = {
    id: initialMember?.id || "preview-temp",
    name: name || "Member Name",
    role: role || "Creative Director",
    badge: badge || "PARTNER",
    brandLabel: brandLabel || "CREAT",
    studioRole: studioRole || "STUDIO LEAD",
    specialty: specialty || "Brand Systems & Design",
    avatarBg,
    image,
    initials: initials || (name ? name.slice(0, 2).toUpperCase() : "VT"),
    displayOrder,
    isActive,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Form Fields */}
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
              {initialMember ? "Edit Team Member" : "Add New Team Member"}
            </h3>
            <p className="font-sans text-xs text-stone-500 mt-1">
              Configure profile information, senior collective tags, and portrait photos.
            </p>
          </div>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-xs uppercase tracking-wider font-semibold text-stone-500 hover:text-black dark:hover:text-white px-3 py-1.5 rounded-lg border border-stone-300 dark:border-white/20"
            >
              Back to List
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
          {/* Member Name & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Role / Title *
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Founding Partner & Creative Director"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
              />
            </div>
          </div>

          {/* Specialty */}
          <div>
            <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
              Specialty / Focus Area *
            </label>
            <input
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              placeholder="e.g. Brand Systems & Art Direction"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
            />
          </div>

          {/* Tags & Badges matching the attached UI */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Top Brand Tag
              </label>
              <input
                type="text"
                value={brandLabel}
                onChange={(e) => setBrandLabel(e.target.value)}
                placeholder="e.g. CREAT or VENOM TECH"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Top Right Badge
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. PARTNER"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Studio Overlay Role
              </label>
              <input
                type="text"
                value={studioRole}
                onChange={(e) => setStudioRole(e.target.value)}
                placeholder="e.g. STUDIO LEAD"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
              />
            </div>
          </div>

          {/* Portrait Image Selection (Upload Local or Enter URL) */}
          <div className="p-4 rounded-xl border border-stone-200 dark:border-white/10 bg-stone-50/60 dark:bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300">
                Staff Member Portrait Image
              </label>
              <span className="text-[11px] text-stone-500">
                Local file or database URL
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* File upload button */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-[family-name:var(--font-oswald)] uppercase text-xs font-semibold tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span>{isUploading ? "Uploading..." : "Upload from Computer"}</span>
              </button>

              <span className="text-xs text-stone-400 text-center sm:text-left">or enter path/URL:</span>

              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/images/team/alex-rivera.jpg"
                className="flex-1 px-3.5 py-2 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
              />

              {image && (
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="text-xs text-red-500 hover:text-red-700 px-2 py-1 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Avatar Background Gradient Preset */}
          <div>
            <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Card Avatar Frame Gradient
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {GRADIENT_PRESETS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setAvatarBg(p.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-left text-xs transition-all ${
                    avatarBg === p.value
                      ? "border-[#C07DFF] bg-[#C07DFF]/10 ring-1 ring-[#C07DFF]"
                      : "border-stone-200 dark:border-white/10 hover:border-stone-400"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full bg-gradient-to-br ${p.value} border border-stone-600 flex-shrink-0`} />
                  <span className="truncate">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Initials & Display Order & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-stone-200/60 dark:border-white/10">
            <div>
              <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Initials (Monogram)
              </label>
              <input
                type="text"
                maxLength={4}
                value={initials}
                onChange={(e) => setInitials(e.target.value.toUpperCase())}
                placeholder="AR"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                min={1}
                max={99}
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 1)}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Status
              </label>
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`w-full py-2 px-3.5 rounded-xl border flex items-center justify-between text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                    : "bg-stone-100 dark:bg-white/5 border-stone-300 dark:border-white/10 text-stone-500"
                }`}
              >
                <span>{isActive ? "Active / Visible" : "Hidden / Inactive"}</span>
                <span className={`w-2 h-2 rounded-full ${isActive ? "bg-emerald-500" : "bg-stone-400"}`} />
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3 pt-2">
            <span className="block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300">
              Social Links (Optional)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="LinkedIn URL"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
              />
              <input
                type="url"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="Twitter / X URL"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
              />
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="GitHub / Portfolio"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200/60 dark:border-white/10">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2.5 rounded-xl border border-stone-300 dark:border-white/20 text-stone-700 dark:text-stone-300 font-[family-name:var(--font-oswald)] uppercase text-xs font-semibold tracking-wider hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-[family-name:var(--font-oswald)] uppercase text-sm font-bold tracking-wider hover:bg-gradient-to-r hover:from-[#C07DFF] hover:to-[#3BC8F6] hover:text-white dark:hover:text-white transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-2"
            >
              <AsteriskIcon className={`w-3.5 h-3.5 ${isSubmitting ? "animate-spin" : ""}`} color="currentColor" strokeWidth={3} />
              <span>{isSubmitting ? "Saving to Database..." : initialMember ? "Update Member" : "Save Team Member"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Right Column: Live Card Preview matching attached UI */}
      <div className="lg:col-span-5 sticky top-24">
        <div
          className={`rounded-2xl p-6 border shadow-sm ${
            isDark ? "bg-slate-900/80 border-white/10" : "bg-white border-stone-200"
          }`}
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200/60 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider font-semibold text-stone-600 dark:text-stone-400">
                Live Frontend Preview
              </span>
            </div>
            <span className="text-[10px] font-mono text-stone-400">Exact UI Replica</span>
          </div>

          <div className="bg-[#FAF8FF] dark:bg-black/40 p-4 rounded-xl border border-purple-100 dark:border-white/5 flex items-center justify-center">
            <div className="w-full max-w-[280px]">
              <TeamCard member={previewMember} />
            </div>
          </div>

          <p className="font-sans text-[11px] text-stone-400 text-center mt-3">
            This preview mirrors the exact card displayed under the &quot;The Minds Behind The Magic&quot; section on the home page.
          </p>
        </div>
      </div>
    </div>
  );
}
