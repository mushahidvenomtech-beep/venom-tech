"use client";

import React, { useState, useEffect } from "react";
import { MediaItem } from "@/lib/blog/types";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";

interface BlogMediaLibraryProps {
  onSelectMedia?: (media: MediaItem) => void;
  isModal?: boolean;
  onClose?: () => void;
}

function MediaThumbnail({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-stone-100 dark:bg-stone-900 select-none">
        <svg
          className="w-7 h-7 text-stone-400 mb-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-[9px] text-stone-500 font-mono truncate max-w-full px-1">
          {alt || "Image unavailable"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className || "w-full h-full object-cover"}
      loading="lazy"
    />
  );
}

export default function BlogMediaLibrary({
  onSelectMedia,
  isModal = false,
  onClose,
}: BlogMediaLibraryProps) {
  const { isDark } = useDashboardTheme();
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSavingDetails, setIsSavingDetails] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // New Upload Form state
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newAlt, setNewAlt] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Fetch real media from database
  const loadMedia = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/blog/media", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.media)) {
        setMediaList(data.media);
        setSelectedItem((prev) => {
          if (!prev) return data.media[0] || null;
          return data.media.find((m: MediaItem) => m.id === prev.id) || data.media[0] || null;
        });
      }
    } catch (err) {
      console.error("Failed loading media from database:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const filteredMedia = mediaList.filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.filename.toLowerCase().includes(search.toLowerCase()) ||
      m.alt.toLowerCase().includes(search.toLowerCase())
  );

  // Upload file from computer directly to database via API
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const cleanTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      formData.append("title", cleanTitle);
      formData.append("alt", cleanTitle);

      const res = await fetch("/api/blog/media", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (result.success && result.media) {
        await loadMedia();
        setSelectedItem(result.media);
        setShowUploadModal(false);
      } else {
        alert(result.error || "Failed to upload image to database");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  // Add external image URL to database
  const handleManualUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl || !newTitle) return;

    try {
      const res = await fetch("/api/blog/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: newUrl,
          filename: newUrl.split("/").pop() || "image.webp",
          title: newTitle,
          alt: newAlt || newTitle,
          caption: newCaption,
          size: "External",
          dimensions: "Original",
        }),
      });
      const result = await res.json();

      if (result.success && result.media) {
        await loadMedia();
        setSelectedItem(result.media);
        setNewUrl("");
        setNewTitle("");
        setNewAlt("");
        setNewCaption("");
        setShowUploadModal(false);
      } else {
        alert(result.error || "Failed to add URL");
      }
    } catch (err) {
      console.error("Add URL error:", err);
      alert("Failed to add image URL");
    }
  };

  // Save metadata changes (title, alt, caption) to database
  const handleSaveDetails = async () => {
    if (!selectedItem) return;
    setIsSavingDetails(true);
    try {
      const res = await fetch("/api/blog/media", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedItem.id,
          title: selectedItem.title,
          alt: selectedItem.alt,
          caption: selectedItem.caption,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setMediaList((prev) =>
          prev.map((m) => (m.id === selectedItem.id ? { ...m, ...selectedItem } : m))
        );
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2000);
      } else {
        alert(result.error || "Failed to save details");
      }
    } catch (err) {
      console.error("Save details error:", err);
      alert("Failed to save changes");
    } finally {
      setIsSavingDetails(false);
    }
  };

  // Delete media item from database
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this media file from the database?")) {
      return;
    }
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/blog/media?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        await loadMedia();
        setSelectedItem(null);
      } else {
        alert(result.error || "Failed to delete file from database");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting media");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className={`space-y-6 ${isModal ? "p-6" : ""}`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3
            className={`font-[family-name:var(--font-oswald)] uppercase font-bold text-xl sm:text-2xl tracking-tight ${
              isDark ? "text-white" : "text-[#111111]"
            }`}
          >
            Media <span className="text-brand-gradient">Library &amp; Assets</span>
          </h3>
          <p className={`font-sans text-xs ${isDark ? "text-stone-400" : "text-stone-600"}`}>
            Live media assets connected directly to your database. Upload, inspect, and reuse brand photography across blog posts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <input
            id="media-library-computer-upload"
            type="file"
            accept="image/*"
            disabled={isUploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
              e.target.value = "";
            }}
            className="hidden"
          />
          <label
            htmlFor="media-library-computer-upload"
            className={`px-4 py-2 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider shadow-lg shadow-[#3BC8F6]/20 hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5 ${
              isUploading ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            {isUploading ? (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </span>
            ) : (
              <span>📁 Upload from Computer</span>
            )}
          </label>
          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className={`px-3 py-2 rounded-xl border text-xs font-mono transition-colors ${
              isDark
                ? "bg-white/5 hover:bg-white/10 text-stone-300 border-white/10"
                : "bg-white hover:bg-stone-50 text-stone-700 border-[#E8E2F2] shadow-sm"
            }`}
          >
            + Add by URL
          </button>
          <button
            type="button"
            onClick={loadMedia}
            title="Refresh database media"
            className={`p-2 rounded-xl border text-xs transition-colors ${
              isDark
                ? "bg-white/5 hover:bg-white/10 text-stone-300 border-white/10"
                : "bg-white hover:bg-stone-50 text-stone-700 border-[#E8E2F2] shadow-sm"
            }`}
          >
            ↻
          </button>
          {isModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              className={`p-2 rounded-xl border transition-colors ${
                isDark
                  ? "bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white border-white/10"
                  : "bg-white hover:bg-stone-50 text-stone-700 border-[#E8E2F2] shadow-sm"
              }`}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, filename, or alt text..."
            className={`w-full pl-9 pr-4 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#3BC8F6] transition-colors ${
              isDark
                ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                : "bg-white border-[#E8E2F2] text-slate-900 placeholder-stone-400 shadow-sm"
            }`}
          />
          <svg
            className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
              isDark ? "text-stone-500" : "text-stone-400"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <span className={`font-mono text-xs ${isDark ? "text-stone-400" : "text-stone-600"}`}>
          {isLoading
            ? "Fetching database assets..."
            : `Showing ${filteredMedia.length} of ${mediaList.length} assets`}
        </span>
      </div>

      {/* Main Layout: Grid + Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: 2 Columns of Media Grid with Drag & Drop */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            const file = e.dataTransfer.files?.[0];
            if (file) handleFileUpload(file);
          }}
          className={`lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[580px] overflow-y-auto pr-1 transition-all rounded-2xl ${
            isDragOver
              ? "ring-2 ring-[#3BC8F6] bg-[#3BC8F6]/10 border border-dashed border-[#3BC8F6] p-2"
              : ""
          }`}
        >
          {isLoading && mediaList.length === 0 ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center gap-3 text-stone-400">
              <span className="w-8 h-8 border-3 border-[#3BC8F6] border-t-transparent rounded-full animate-spin" />
              <span className="font-mono text-xs">Loading media from database...</span>
            </div>
          ) : (
            filteredMedia.map((media) => {
              const isSelected = selectedItem?.id === media.id;
              return (
                <div
                  key={media.id}
                  onClick={() => setSelectedItem(media)}
                  className={`group relative rounded-xl overflow-hidden aspect-square border cursor-pointer transition-all ${
                    isDark ? "bg-stone-900" : "bg-stone-100"
                  } ${
                    isSelected
                      ? "border-[#3BC8F6] ring-2 ring-[#3BC8F6]/40 shadow-lg"
                      : isDark
                      ? "border-white/10 hover:border-white/30"
                      : "border-[#E8E2F2] hover:border-[#C07DFF]/50 shadow-sm"
                  }`}
                >
                  <MediaThumbnail
                    src={media.url}
                    alt={media.alt || media.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                    <p className="text-[10px] text-white font-medium truncate">{media.title}</p>
                    <p className="text-[9px] text-stone-300 font-mono">{media.size || "Image"}</p>
                  </div>
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#3BC8F6] text-black font-bold flex items-center justify-center text-xs shadow-md">
                      ✓
                    </div>
                  )}
                </div>
              );
            })
          )}

          {!isLoading && filteredMedia.length === 0 && (
            <div
              className={`col-span-full py-16 text-center font-mono text-xs border border-dashed rounded-2xl ${
                isDark
                  ? "border-white/10 text-stone-500"
                  : "border-[#E8E2F2] text-stone-500 bg-stone-50"
              }`}
            >
              No media found matching &ldquo;{search}&rdquo;. Click &ldquo;📁 Upload from Computer&rdquo; to add assets to the database.
            </div>
          )}
        </div>

        {/* Right: Selected Asset Inspector & Action */}
        <div
          className={`p-5 rounded-2xl border space-y-5 text-xs font-sans transition-colors ${
            isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
          }`}
        >
          <div
            className={`border-b pb-3 flex items-center justify-between ${
              isDark ? "border-white/10" : "border-[#E8E2F2]"
            }`}
          >
            <span
              className={`font-[family-name:var(--font-oswald)] uppercase font-semibold tracking-wider ${
                isDark ? "text-stone-300" : "text-[#111111]"
              }`}
            >
              Asset Details
            </span>
            {selectedItem && (
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => handleDelete(selectedItem.id)}
                className="text-rose-500 hover:text-rose-600 text-[11px] font-mono hover:underline font-semibold disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete File"}
              </button>
            )}
          </div>

          {selectedItem ? (
            <div className="space-y-4">
              {/* Preview Thumbnail */}
              <div
                className={`relative rounded-xl overflow-hidden aspect-video border ${
                  isDark ? "border-white/10 bg-black" : "border-[#E8E2F2] bg-stone-100"
                }`}
              >
                <MediaThumbnail
                  src={selectedItem.url}
                  alt={selectedItem.alt || selectedItem.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* URL & Quick Copy */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={selectedItem.url}
                  className={`flex-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-mono truncate select-all ${
                    isDark
                      ? "bg-white/5 border-white/10 text-stone-300"
                      : "bg-stone-50 border-stone-200 text-stone-700"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => handleCopyUrl(selectedItem.url)}
                  className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono font-semibold transition-all shrink-0 ${
                    copiedUrl
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                      : isDark
                      ? "bg-white/5 hover:bg-white/10 text-stone-300 border-white/10"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-200"
                  }`}
                >
                  {copiedUrl ? "Copied!" : "Copy URL"}
                </button>
              </div>

              {/* Metadata specs */}
              <div
                className={`space-y-1.5 font-mono text-[11px] p-3 rounded-xl border ${
                  isDark
                    ? "text-stone-400 bg-white/[0.02] border-white/5"
                    : "text-stone-600 bg-stone-50 border-[#E8E2F2]"
                }`}
              >
                <div className="flex justify-between">
                  <span>File:</span>
                  <span
                    className={`truncate max-w-[160px] font-medium ${
                      isDark ? "text-stone-200" : "text-slate-900"
                    }`}
                  >
                    {selectedItem.filename}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span className={`font-medium ${isDark ? "text-stone-200" : "text-slate-900"}`}>
                    {selectedItem.size || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Dimensions:</span>
                  <span className={`font-medium ${isDark ? "text-stone-200" : "text-slate-900"}`}>
                    {selectedItem.dimensions || "Original"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Uploaded:</span>
                  <span className={`font-medium ${isDark ? "text-stone-200" : "text-slate-900"}`}>
                    {selectedItem.uploadedAt
                      ? new Date(selectedItem.uploadedAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>

              {/* Editable Fields */}
              <div className="space-y-3">
                <div>
                  <label
                    className={`block text-[10px] uppercase font-semibold mb-1 ${
                      isDark ? "text-stone-400" : "text-stone-700"
                    }`}
                  >
                    Image Title
                  </label>
                  <input
                    type="text"
                    value={selectedItem.title}
                    onChange={(e) => {
                      const updated = { ...selectedItem, title: e.target.value };
                      setSelectedItem(updated);
                    }}
                    className={`w-full px-3 py-1.5 rounded-lg border text-xs focus:outline-none focus:border-[#3BC8F6] ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white"
                        : "bg-white border-[#E8E2F2] text-slate-900 shadow-sm"
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-[10px] uppercase font-semibold mb-1 ${
                      isDark ? "text-stone-400" : "text-stone-700"
                    }`}
                  >
                    Alt Text (For Accessibility &amp; SEO)
                  </label>
                  <input
                    type="text"
                    value={selectedItem.alt}
                    onChange={(e) => {
                      const updated = { ...selectedItem, alt: e.target.value };
                      setSelectedItem(updated);
                    }}
                    placeholder="Descriptive alt text"
                    className={`w-full px-3 py-1.5 rounded-lg border text-xs focus:outline-none focus:border-[#3BC8F6] ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white"
                        : "bg-white border-[#E8E2F2] text-slate-900 shadow-sm"
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-[10px] uppercase font-semibold mb-1 ${
                      isDark ? "text-stone-400" : "text-stone-700"
                    }`}
                  >
                    Caption
                  </label>
                  <textarea
                    rows={2}
                    value={selectedItem.caption || ""}
                    onChange={(e) => {
                      const updated = { ...selectedItem, caption: e.target.value };
                      setSelectedItem(updated);
                    }}
                    placeholder="Optional editorial caption"
                    className={`w-full px-3 py-1.5 rounded-lg border text-xs focus:outline-none focus:border-[#3BC8F6] resize-none ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white"
                        : "bg-white border-[#E8E2F2] text-slate-900 shadow-sm"
                    }`}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveDetails}
                  disabled={isSavingDetails}
                  className={`w-full py-2 rounded-xl border text-xs font-mono font-semibold transition-all ${
                    savedSuccess
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                      : isDark
                      ? "bg-white/5 hover:bg-white/10 text-stone-200 border-white/10"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-200"
                  }`}
                >
                  {isSavingDetails
                    ? "Saving changes..."
                    : savedSuccess
                    ? "✓ Saved to Database"
                    : "Save Metadata Changes"}
                </button>
              </div>

              {/* Action Button: Insert / Select if in modal */}
              {onSelectMedia && (
                <button
                  type="button"
                  onClick={() => onSelectMedia(selectedItem)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase font-bold text-xs tracking-wider shadow-lg shadow-[#3BC8F6]/20 hover:opacity-95 transition-all"
                >
                  Insert Selected Asset &rarr;
                </button>
              )}
            </div>
          ) : (
            <div
              className={`py-16 text-center font-mono text-xs ${
                isDark ? "text-stone-500" : "text-stone-500"
              }`}
            >
              Select an asset from the gallery to view and manage its details.
            </div>
          )}
        </div>
      </div>

      {/* Upload Dialog Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div
            className={`w-full max-w-lg border rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative transition-colors ${
              isDark
                ? "bg-slate-950 border-white/15 text-white"
                : "bg-white border-[#E8E2F2] text-slate-900"
            }`}
          >
            <div
              className={`flex items-center justify-between border-b pb-4 ${
                isDark ? "border-white/10" : "border-[#E8E2F2]"
              }`}
            >
              <h4
                className={`font-[family-name:var(--font-oswald)] uppercase font-bold text-lg ${
                  isDark ? "text-white" : "text-[#111111]"
                }`}
              >
                Add Image to Media Library
              </h4>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className={`transition-colors ${
                  isDark
                    ? "text-stone-400 hover:text-white"
                    : "text-stone-500 hover:text-slate-900"
                }`}
              >
                ✕
              </button>
            </div>

            {/* Drag & Drop File Upload */}
            <div className="space-y-2">
              <label
                className={`block text-xs uppercase font-mono font-bold ${
                  isDark ? "text-stone-300" : "text-stone-700"
                }`}
              >
                Option A: Upload From Computer
              </label>
              <label
                className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                  isDark
                    ? "border-white/20 hover:border-[#3BC8F6] bg-white/[0.02] hover:bg-white/[0.04]"
                    : "border-[#E8E2F2] hover:border-[#3BC8F6] bg-stone-50/70 hover:bg-stone-50"
                }`}
              >
                <svg
                  className="w-8 h-8 text-[#3BC8F6] mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={`text-xs font-semibold ${
                    isDark ? "text-white" : "text-[#111111]"
                  }`}
                >
                  {isUploading ? "Uploading to database..." : "Click or drag image file here"}
                </span>
                <span
                  className={`text-[10px] font-mono mt-1 ${
                    isDark ? "text-stone-500" : "text-stone-500"
                  }`}
                >
                  Supports WEBP, PNG, JPG, JPEG, SVG up to 10MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={isUploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                    e.target.value = "";
                  }}
                  className="hidden"
                />
              </label>
            </div>

            <div
              className={`flex items-center gap-3 text-xs font-mono ${
                isDark ? "text-stone-500" : "text-stone-400"
              }`}
            >
              <div className={`flex-1 h-px ${isDark ? "bg-white/10" : "bg-stone-200"}`} />
              <span>OR</span>
              <div className={`flex-1 h-px ${isDark ? "bg-white/10" : "bg-stone-200"}`} />
            </div>

            {/* Option B: Direct URL Input */}
            <form onSubmit={handleManualUrlSubmit} className="space-y-4">
              <label
                className={`block text-xs uppercase font-mono font-bold ${
                  isDark ? "text-stone-300" : "text-stone-700"
                }`}
              >
                Option B: External Web URL
              </label>
              <div>
                <input
                  type="url"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or /images/..."
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#3BC8F6] ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                      : "bg-white border-[#E8E2F2] text-slate-900 placeholder-stone-400 shadow-sm"
                  }`}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Asset Title"
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#3BC8F6] ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                      : "bg-white border-[#E8E2F2] text-slate-900 placeholder-stone-400 shadow-sm"
                  }`}
                />
                <input
                  type="text"
                  value={newAlt}
                  onChange={(e) => setNewAlt(e.target.value)}
                  placeholder="Alt text"
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#3BC8F6] ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                      : "bg-white border-[#E8E2F2] text-slate-900 placeholder-stone-400 shadow-sm"
                  }`}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className={`px-4 py-2 rounded-xl border text-xs font-mono ${
                    isDark
                      ? "bg-white/5 border-white/10 text-stone-400 hover:text-white"
                      : "bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#3BC8F6] text-black font-[family-name:var(--font-oswald)] uppercase font-bold text-xs shadow-md shadow-[#3BC8F6]/20 hover:opacity-95"
                >
                  Save to Media Library
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
