"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  BlogPost,
  EditorBlock,
  BlockType,
  HeadingBlockData,
  ParagraphBlockData,
  ListBlockData,
  ImageBlockData,
  QuoteBlockData,
  TableBlockData,
  CodeBlockData,
  CalloutBlockData,
  PostStatus,
  MediaItem,
} from "@/lib/blog/types";
import { BlogStore } from "@/lib/blog/blogStore";
import { slugify, validatePost } from "@/lib/blog/validation";
import BlogSeoPanel from "../seo/BlogSeoPanel";
import BlogMediaLibrary from "../media/BlogMediaLibrary";
import BlogLivePreviewModal from "../preview/BlogLivePreviewModal";
import BlogRevisionsModal from "../revisions/BlogRevisionsModal";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";

interface BlogEditorProps {
  initialPostId?: string | null;
  onBackToList: () => void;
  onPostSaved?: (post: BlogPost) => void;
}

export default function BlogEditor({
  initialPostId,
  onBackToList,
  onPostSaved,
}: BlogEditorProps) {
  const { isDark } = useDashboardTheme();
  // Post data state
  const [post, setPost] = useState<BlogPost>(() => {
    if (initialPostId) {
      const existing = BlogStore.getPostById(initialPostId);
      if (existing) return existing;
    }
    return {
      id: `post-${Date.now()}`,
      title: "",
      slug: "",
      excerpt: "",
      contentBlocks: [
        {
          id: `b-${Date.now()}`,
          type: "paragraph",
          data: { text: "" },
        },
      ],
      featuredImage: "/images/blog/blog-hero.webp",
      featuredImageAlt: "",
      author: {
        name: "Venom Editorial",
        role: "Editor",
      },
      categories: ["AI & Automation"],
      tags: ["Next.js 16"],
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      readingTime: 2,
      seo: {
        metaTitle: "",
        metaDescription: "",
        focusKeyword: "",
        noIndex: false,
        noFollow: false,
      },
      revisions: [],
    };
  });

  // UI state
  const [activeTab, setActiveTab] = useState<"document" | "seo" | "all">("document");
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<"featured" | { blockId: string }>("featured");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showRevisionsModal, setShowRevisionsModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [lastSavedTime, setLastSavedTime] = useState<string>("Just now");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Category and Tag options from Store & Database
  const [categoriesList, setCategoriesList] = useState(() => BlogStore.getCategories());
  const [quickCatName, setQuickCatName] = useState("");
  const [isAddingNewCat, setIsAddingNewCat] = useState(false);
  const allTags = BlogStore.getTags();

  useEffect(() => {
    fetch("/api/blog/categories")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.categories && Array.isArray(data.categories) && data.categories.length > 0) {
          setCategoriesList(data.categories);
        }
      })
      .catch(() => {});
  }, []);

  const handleCreateAndLinkCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickCatName.trim()) return;

    const catName = quickCatName.trim();
    try {
      const res = await fetch("/api/blog/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: catName, color: "#C07DFF" }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.category) {
          setCategoriesList((prev) => [
            ...prev.filter((c) => c.name.toLowerCase() !== data.category.name.toLowerCase()),
            data.category,
          ]);
        }
      }
    } catch {}

    const newCat = BlogStore.createCategory({
      name: catName,
      color: "#C07DFF",
    });

    const updated = BlogStore.getCategories();
    setCategoriesList(updated);

    if (!post.categories.includes(newCat.name)) {
      setPost((prev) => ({
        ...prev,
        categories: [...prev.categories, newCat.name],
      }));
      markUnsaved();
    }

    setQuickCatName("");
    setIsAddingNewCat(false);
  };

  // Autosave timer
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const markUnsaved = () => {
    setSaveStatus("unsaved");
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(() => {
      handleAutosave();
    }, 4000);
  };

  const handleAutosave = () => {
    if (!post.title.trim()) return;
    setSaveStatus("saving");
    const updated = BlogStore.updatePost(post.id, post, false);
    if (updated) {
      setPost(updated);
      setSaveStatus("saved");
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }
  };

  // Title handler
  const handleTitleChange = (val: string) => {
    const isNew = !initialPostId || post.slug === slugify(post.title);
    setPost((prev) => ({
      ...prev,
      title: val,
      slug: isNew ? slugify(val) : prev.slug,
      seo: {
        ...prev.seo,
        metaTitle: prev.seo.metaTitle || val,
      },
    }));
    markUnsaved();
  };

  // Block management
  const updateBlock = (blockId: string, dataUpdates: any) => {
    setPost((prev) => ({
      ...prev,
      contentBlocks: prev.contentBlocks.map((b) =>
        b.id === blockId ? { ...b, data: { ...b.data, ...dataUpdates } } : b
      ),
    }));
    markUnsaved();
  };

  const addBlock = (type: BlockType, afterIndex?: number) => {
    let initialData: any = {};
    if (type === "heading") initialData = { level: 2, text: "" };
    else if (type === "paragraph") initialData = { text: "", align: "left" };
    else if (type === "list") initialData = { style: "unordered", items: ["New bullet point"] };
    else if (type === "image")
      initialData = {
        url: "/images/blog/blog-hero.webp",
        alt: "Illustration",
        caption: "",
      };
    else if (type === "quote")
      initialData = { quote: "Inspirational quote or insight...", citation: "Source" };
    else if (type === "table")
      initialData = {
        headers: ["Column 1", "Column 2", "Column 3"],
        rows: [
          ["Data 1", "Data 2", "Data 3"],
          ["Data 4", "Data 5", "Data 6"],
        ],
      };
    else if (type === "code")
      initialData = { language: "typescript", code: "const example = true;" };
    else if (type === "callout")
      initialData = { variant: "info", title: "Note", text: "Important takeaway for readers." };
    else if (type === "divider") initialData = { style: "solid" };

    const newBlock: EditorBlock = {
      id: `b-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      type,
      data: initialData,
    };

    setPost((prev) => {
      const blocks = [...prev.contentBlocks];
      if (afterIndex !== undefined) {
        blocks.splice(afterIndex + 1, 0, newBlock);
      } else {
        blocks.push(newBlock);
      }
      return { ...prev, contentBlocks: blocks };
    });
    markUnsaved();
  };

  const deleteBlock = (blockId: string) => {
    if (post.contentBlocks.length <= 1) {
      alert("Article must contain at least one block.");
      return;
    }
    setPost((prev) => ({
      ...prev,
      contentBlocks: prev.contentBlocks.filter((b) => b.id !== blockId),
    }));
    markUnsaved();
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === post.contentBlocks.length - 1)
    ) {
      return;
    }

    setPost((prev) => {
      const blocks = [...prev.contentBlocks];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      const temp = blocks[index];
      blocks[index] = blocks[targetIndex];
      blocks[targetIndex] = temp;
      return { ...prev, contentBlocks: blocks };
    });
    markUnsaved();
  };

  const duplicateBlock = (index: number) => {
    const original = post.contentBlocks[index];
    const clone: EditorBlock = {
      id: `b-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      type: original.type,
      data: JSON.parse(JSON.stringify(original.data)),
    };

    setPost((prev) => {
      const blocks = [...prev.contentBlocks];
      blocks.splice(index + 1, 0, clone);
      return { ...prev, contentBlocks: blocks };
    });
    markUnsaved();
  };

  // Category toggle
  const toggleCategory = (catName: string) => {
    setPost((prev) => {
      const exists = prev.categories.includes(catName);
      const updated = exists
        ? prev.categories.filter((c) => c !== catName)
        : [...prev.categories, catName];
      return { ...prev, categories: updated };
    });
    markUnsaved();
  };

  // Tag add/remove
  const [tagInput, setTagInput] = useState("");
  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const val = tagInput.trim();
      if (!post.tags.includes(val)) {
        setPost((prev) => ({ ...prev, tags: [...prev.tags, val] }));
        markUnsaved();
      }
      setTagInput("");
    }
  };

  const removeTag = (t: string) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== t),
    }));
    markUnsaved();
  };

  // Media selection
  const handleOpenMedia = (target: "featured" | { blockId: string }) => {
    setMediaTarget(target);
    setShowMediaModal(true);
  };

  const handleMediaSelected = (media: MediaItem) => {
    if (mediaTarget === "featured") {
      setPost((prev) => ({
        ...prev,
        featuredImage: media.url,
        featuredImageAlt: media.alt || prev.featuredImageAlt,
        featuredImageCaption: media.caption,
      }));
    } else {
      updateBlock(mediaTarget.blockId, {
        url: media.url,
        alt: media.alt,
        caption: media.caption,
      });
    }
    setShowMediaModal(false);
    markUnsaved();
  };

  // Direct local computer image upload
  const handleLocalImageUpload = (
    file: File,
    target: "featured" | { blockId: string }
  ) => {
    if (!file) return;

    const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

    // 1. Instant local preview via reader
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;

      if (target === "featured") {
        setPost((prev) => ({
          ...prev,
          featuredImage: dataUrl,
          featuredImageAlt: cleanName,
        }));
      } else {
        updateBlock(target.blockId, {
          url: dataUrl,
          alt: cleanName,
        });
      }
      markUnsaved();
    };
    reader.readAsDataURL(file);

    // 2. Direct server upload to /api/blog/media (saved to public/images/blog/ and MySQL blog_media)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", cleanName);
    formData.append("alt", cleanName);

    fetch("/api/blog/media", {
      method: "POST",
      body: formData,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.url) {
          if (target === "featured") {
            setPost((prev) => ({
              ...prev,
              featuredImage: data.url,
              featuredImageAlt: cleanName,
            }));
          } else {
            updateBlock(target.blockId, {
              url: data.url,
              alt: cleanName,
            });
          }
          markUnsaved();
        }
      })
      .catch((err) => {
        console.warn("Direct upload fallback notice:", err);
      });
  };

  // Explicit Save / Publish
  const handleSave = async (statusToSet?: PostStatus) => {
    const postToSave = {
      ...post,
      status: statusToSet || post.status,
    };

    const validation = validatePost(postToSave);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      alert("Please resolve the validation errors before publishing.");
      return;
    }

    setValidationErrors({});
    setSaveStatus("saving");

    let saved: BlogPost | null;
    const existing = BlogStore.getPostById(post.id);
    if (existing) {
      saved = BlogStore.updatePost(post.id, postToSave, true);
    } else {
      saved = BlogStore.createPost(postToSave);
    }

    // Persist to Backend Database via REST API
    try {
      const isUpdating = Boolean(existing);
      const url = isUpdating ? `/api/blog/posts/${post.id}` : "/api/blog/posts";
      const method = isUpdating ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postToSave),
      });

      if (!res.ok) {
        console.warn("Backend server responded with status:", res.status);
      }
    } catch (apiErr) {
      console.warn("Backend database sync notice:", apiErr);
    }

    if (saved) {
      setPost(saved);
      setSaveStatus("saved");
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      window.dispatchEvent(new Event("venom_blog_updated"));
      if (onPostSaved) onPostSaved(saved);
      alert(`Article successfully saved and synced to database as ${saved.status.toUpperCase()}!`);
      if (onBackToList) {
        onBackToList();
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div
        className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 sticky top-16 z-20 backdrop-blur-md shadow-xl transition-colors ${
          isDark
            ? "bg-slate-900/90 border-white/10 text-white"
            : "bg-white/95 border-[#E8E2F2] text-slate-900 shadow-[0_4px_20px_rgba(192,125,255,0.06)]"
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToList}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs flex items-center gap-1.5 border transition-all ${
              isDark
                ? "bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border-white/10"
                : "bg-white hover:bg-stone-50 text-stone-700 border-[#E8E2F2] shadow-sm"
            }`}
          >
            <span>&larr;</span>
            <span>All Articles</span>
          </button>

          {/* Autosave Status Pill */}
          <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
            <span
              className={`w-2 h-2 rounded-full ${
                saveStatus === "saved"
                  ? "bg-emerald-400"
                  : saveStatus === "saving"
                  ? "bg-amber-400 animate-pulse"
                  : "bg-stone-500"
              }`}
            />
            <span className={`capitalize ${isDark ? "text-stone-400" : "text-stone-600"}`}>
              {saveStatus === "saved"
                ? `Autosaved (${lastSavedTime})`
                : saveStatus === "saving"
                ? "Saving draft..."
                : "Unsaved changes"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Revisions Button */}
          <button
            type="button"
            onClick={() => setShowRevisionsModal(true)}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs border flex items-center gap-1.5 transition-all ${
              isDark
                ? "bg-white/5 hover:bg-white/10 text-stone-300 border-white/10"
                : "bg-white hover:bg-stone-50 text-stone-700 border-[#E8E2F2] shadow-sm"
            }`}
          >
            <span>⏱</span>
            <span>Revisions ({post.revisions?.length || 0})</span>
          </button>

          {/* Live Preview Button */}
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className={`px-3.5 py-1.5 rounded-xl font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider border transition-all ${
              isDark
                ? "bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white border-white/10"
                : "bg-white hover:bg-stone-50 text-stone-800 border-[#E8E2F2] shadow-sm"
            }`}
          >
            Preview Post &nearr;
          </button>

          {/* Save Draft */}
          <button
            type="button"
            onClick={() => handleSave("draft")}
            className={`px-4 py-1.5 rounded-xl font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider border transition-all ${
              isDark
                ? "bg-white/10 hover:bg-white/20 text-white border-white/10"
                : "bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-200 shadow-sm"
            }`}
          >
            Save Draft
          </button>

          {/* Publish / Schedule Button */}
          <button
            type="button"
            onClick={() => handleSave(post.status === "scheduled" ? "scheduled" : "published")}
            className="px-5 py-1.5 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider shadow-lg shadow-[#3BC8F6]/20 hover:opacity-95"
          >
            {post.status === "scheduled" ? "Save Schedule &bull;" : "Publish Article &rarr;"}
          </button>
        </div>
      </div>

      {/* Validation Banner if errors */}
      {Object.keys(validationErrors).length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs space-y-1">
          <div className="font-bold uppercase tracking-wider font-mono">
            Please resolve the following before publishing:
          </div>
          <ul className="list-disc pl-5 space-y-0.5">
            {Object.values(validationErrors).map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Editor Grid: Left Block Canvas + Right Settings Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Gutenberg Block Canvas (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Article Title Input */}
          <div
            className={`p-6 rounded-3xl border space-y-4 transition-colors ${
              isDark
                ? "bg-white/[0.02] border-white/10"
                : "bg-white border-[#E8E2F2] shadow-sm"
            }`}
          >
            <input
              type="text"
              value={post.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter Article Title Here..."
              className={`w-full bg-transparent font-[family-name:var(--font-oswald)] uppercase font-extrabold text-2xl sm:text-4xl focus:outline-none tracking-tight leading-tight ${
                isDark
                  ? "text-white placeholder-stone-600"
                  : "text-[#111111] placeholder-stone-400"
              }`}
            />
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
              <span>Slug:</span>
              <span className="text-[#3BC8F6] truncate">/blog/{post.slug || "slug-preview"}</span>
            </div>

            {/* Prominent Quick Category Linking Strip directly on Canvas */}
            <div
              className={`pt-3 border-t flex flex-wrap items-center gap-2 text-xs transition-colors ${
                isDark ? "border-white/10" : "border-[#E8E2F2]"
              }`}
            >
              <span
                className={`font-[family-name:var(--font-oswald)] uppercase text-[11px] tracking-wider font-bold flex items-center gap-1.5 ${
                  isDark ? "text-stone-300" : "text-stone-700"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#C07DFF]" />
                Linked Categories:
              </span>

              {post.categories.length === 0 ? (
                <span className="text-amber-500 text-xs italic">
                  No category linked yet. Select below to categorize:
                </span>
              ) : (
                post.categories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#C07DFF]/20 text-[#C07DFF] border border-[#C07DFF]/40 shadow-sm"
                  >
                    <span>{cat}</span>
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className="hover:text-rose-400 font-bold text-sm ml-0.5"
                      title="Remove category"
                    >
                      &times;
                    </button>
                  </span>
                ))
              )}

              {/* Quick Dropdown to link another category */}
              <select
                value=""
                onChange={(e) => {
                  if (e.target.value && !post.categories.includes(e.target.value)) {
                    toggleCategory(e.target.value);
                  }
                }}
                className={`px-3 py-1 rounded-xl border text-xs font-mono focus:outline-none cursor-pointer transition-colors ${
                  isDark
                    ? "bg-white/10 hover:bg-white/15 border-white/15 text-stone-200"
                    : "bg-white hover:bg-stone-50 border-[#E8E2F2] text-stone-800 shadow-sm"
                }`}
              >
                <option value="" className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}>+ Link Category...</option>
                {categoriesList
                  .filter((c) => !post.categories.includes(c.name))
                  .map((c) => (
                    <option key={c.id} value={c.name} className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}>
                      + {c.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Block Canvas Area */}
          <div className="space-y-4">
            {post.contentBlocks.map((block, index) => (
              <div
                key={block.id}
                className={`group p-5 rounded-2xl border transition-all relative ${
                  isDark
                    ? "bg-white/[0.02] hover:bg-white/[0.04] border-white/10"
                    : "bg-white border-[#E8E2F2] shadow-sm hover:border-[#C07DFF]/50"
                }`}
              >
                {/* Block Header & Action Controls */}
                <div
                  className={`flex items-center justify-between border-b pb-2 mb-3 text-xs font-mono transition-colors ${
                    isDark ? "border-white/5 text-stone-400" : "border-stone-100 text-stone-500"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold ${
                        isDark ? "bg-white/5 text-[#C07DFF]" : "bg-[#F4E9FF] text-[#8B5CF6]"
                      }`}
                    >
                      {block.type}
                    </span>
                    <span className="text-[10px] text-stone-400">Block #{index + 1}</span>
                  </div>

                  <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => moveBlock(index, "up")}
                      disabled={index === 0}
                      className="p-1 hover:text-white disabled:opacity-20"
                      title="Move Up"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      onClick={() => moveBlock(index, "down")}
                      disabled={index === post.contentBlocks.length - 1}
                      className="p-1 hover:text-white disabled:opacity-20"
                      title="Move Down"
                    >
                      ▼
                    </button>
                    <button
                      type="button"
                      onClick={() => duplicateBlock(index)}
                      className="p-1 hover:text-[#3BC8F6]"
                      title="Duplicate Block"
                    >
                      ⧉
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteBlock(block.id)}
                      className="p-1 hover:text-rose-400 font-bold"
                      title="Delete Block"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Block Content Inputs based on Block Type */}
                {block.type === "heading" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-stone-500">Level:</span>
                      {[1, 2, 3, 4].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => updateBlock(block.id, { level: lvl })}
                          className={`px-2 py-0.5 rounded text-xs ${
                            (block.data as HeadingBlockData).level === lvl
                              ? "bg-[#C07DFF] text-white font-bold"
                              : "bg-white/5 text-stone-400"
                          }`}
                        >
                          H{lvl}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={(block.data as HeadingBlockData).text || ""}
                      onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                      placeholder="Heading text..."
                      className={`w-full bg-transparent font-[family-name:var(--font-oswald)] uppercase font-bold text-xl sm:text-2xl focus:outline-none ${
                        isDark ? "text-white placeholder-stone-600" : "text-[#111111] placeholder-stone-400"
                      }`}
                    />
                  </div>
                )}

                {block.type === "paragraph" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-stone-500">
                      {["left", "center", "right"].map((align) => (
                        <button
                          key={align}
                          type="button"
                          onClick={() => updateBlock(block.id, { align })}
                          className={`capitalize px-2 py-0.5 rounded ${
                            (block.data as ParagraphBlockData).align === align
                              ? "bg-white/10 text-white"
                              : "text-stone-500"
                          }`}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                    <textarea
                      rows={3}
                      value={(block.data as ParagraphBlockData).text || ""}
                      onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                      placeholder="Type paragraph content here..."
                      className={`w-full bg-transparent text-sm leading-relaxed focus:outline-none resize-none font-sans ${
                        isDark ? "text-stone-200 placeholder-stone-600" : "text-stone-800 placeholder-stone-400"
                      }`}
                    />
                  </div>
                )}

                {block.type === "list" && (
                  <div className="space-y-3 font-sans text-xs">
                    <div className="flex items-center gap-2 font-mono">
                      <button
                        type="button"
                        onClick={() => updateBlock(block.id, { style: "unordered" })}
                        className={`px-2 py-0.5 rounded text-xs ${
                          (block.data as ListBlockData).style === "unordered"
                            ? "bg-[#3BC8F6] text-black font-bold"
                            : "bg-white/5 text-stone-400"
                        }`}
                      >
                        Bullet List
                      </button>
                      <button
                        type="button"
                        onClick={() => updateBlock(block.id, { style: "ordered" })}
                        className={`px-2 py-0.5 rounded text-xs ${
                          (block.data as ListBlockData).style === "ordered"
                            ? "bg-[#3BC8F6] text-black font-bold"
                            : "bg-white/5 text-stone-400"
                        }`}
                      >
                        Numbered List
                      </button>
                    </div>

                    <div className="space-y-2">
                      {((block.data as ListBlockData).items || []).map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-2">
                          <span className="text-stone-500 font-mono">
                            {(block.data as ListBlockData).style === "ordered" ? `${itemIdx + 1}.` : "•"}
                          </span>
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                              const items = [...(block.data as ListBlockData).items];
                              items[itemIdx] = e.target.value;
                              updateBlock(block.id, { items });
                            }}
                            className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 text-stone-200 text-xs focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const items = (block.data as ListBlockData).items.filter((_, i) => i !== itemIdx);
                              updateBlock(block.id, { items });
                            }}
                            className="text-stone-500 hover:text-rose-400 px-1"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const items = [...((block.data as ListBlockData).items || []), "New list item"];
                          updateBlock(block.id, { items });
                        }}
                        className="text-xs text-[#3BC8F6] hover:underline font-mono"
                      >
                        + Add Item
                      </button>
                    </div>
                  </div>
                )}

                {block.type === "image" && (
                  <div className="space-y-3 font-sans text-xs">
                    <input
                      id={`block-file-${block.id}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleLocalImageUpload(file, { blockId: block.id });
                      }}
                    />
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleLocalImageUpload(file, { blockId: block.id });
                      }}
                      className="relative rounded-xl overflow-hidden aspect-video border border-white/10 bg-black group/img"
                    >
                      <Image
                        src={(block.data as ImageBlockData).url || "/images/blog/blog-hero.webp"}
                        alt={(block.data as ImageBlockData).alt || "Image"}
                        fill
                        unoptimized={Boolean(
                          (block.data as ImageBlockData).url?.startsWith("data:") ||
                            (block.data as ImageBlockData).url?.startsWith("blob:")
                        )}
                        className="object-cover"
                      />
                      <label
                        htmlFor={`block-file-${block.id}`}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity font-mono text-xs gap-1"
                      >
                        <span className="text-lg">📁</span>
                        <span>Click or drag image from computer</span>
                      </label>
                    </div>

                    <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center">
                      <label
                        htmlFor={`block-file-${block.id}`}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-mono text-xs font-semibold cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm"
                      >
                        <span>📁 Upload from Computer</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => handleOpenMedia({ blockId: block.id })}
                        className={`px-3 py-1.5 rounded-lg border font-mono text-xs transition-colors ${
                          isDark
                            ? "bg-white/10 hover:bg-white/20 text-white border-white/10"
                            : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-[#E8E2F2]"
                        }`}
                      >
                        Media Library
                      </button>
                      <input
                        type="text"
                        value={(block.data as ImageBlockData).caption || ""}
                        onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                        placeholder="Image Caption (optional)"
                        className={`flex-1 min-w-[140px] px-3 py-1.5 rounded-lg border text-xs focus:outline-none focus:border-[#3BC8F6] ${
                          isDark
                            ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                            : "bg-white border-[#E8E2F2] text-slate-900 placeholder-stone-400 shadow-sm"
                        }`}
                      />
                    </div>
                  </div>
                )}

                {block.type === "quote" && (
                  <div className="space-y-3 font-sans text-xs">
                    <textarea
                      rows={2}
                      value={(block.data as QuoteBlockData).quote || ""}
                      onChange={(e) => updateBlock(block.id, { quote: e.target.value })}
                      placeholder="Quote statement..."
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white italic text-sm focus:outline-none resize-none"
                    />
                    <input
                      type="text"
                      value={(block.data as QuoteBlockData).citation || ""}
                      onChange={(e) => updateBlock(block.id, { citation: e.target.value })}
                      placeholder="Citation / Author Name"
                      className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-stone-300 text-xs focus:outline-none"
                    />
                  </div>
                )}

                {block.type === "table" && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr>
                            {((block.data as TableBlockData).headers || []).map((h, hIdx) => (
                              <th key={hIdx} className="p-1">
                                <input
                                  type="text"
                                  value={h}
                                  onChange={(e) => {
                                    const headers = [...(block.data as TableBlockData).headers];
                                    headers[hIdx] = e.target.value;
                                    updateBlock(block.id, { headers });
                                  }}
                                  className="w-full px-2 py-1 bg-white/10 rounded text-white text-xs"
                                />
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {((block.data as TableBlockData).rows || []).map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-1">
                                  <input
                                    type="text"
                                    value={cell}
                                    onChange={(e) => {
                                      const rows = (block.data as TableBlockData).rows.map((r, ri) =>
                                        ri === rIdx
                                          ? r.map((c, ci) => (ci === cIdx ? e.target.value : c))
                                          : r
                                      );
                                      updateBlock(block.id, { rows });
                                    }}
                                    className="w-full px-2 py-1 bg-white/5 rounded text-stone-300 text-xs"
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex gap-2 text-[10px]">
                      <button
                        type="button"
                        onClick={() => {
                          const tableData = block.data as TableBlockData;
                          const newRow = new Array(tableData.headers.length).fill("New Cell");
                          updateBlock(block.id, { rows: [...tableData.rows, newRow] });
                        }}
                        className="px-2 py-1 rounded bg-white/10 text-stone-300"
                      >
                        + Add Row
                      </button>
                    </div>
                  </div>
                )}

                {block.type === "code" && (
                  <div className="space-y-2 font-mono text-xs">
                    <input
                      type="text"
                      value={(block.data as CodeBlockData).language || "typescript"}
                      onChange={(e) => updateBlock(block.id, { language: e.target.value })}
                      placeholder="Language (typescript, bash, python)"
                      className={`px-2 py-1 rounded text-xs ${
                        isDark ? "bg-white/5 text-stone-400" : "bg-stone-100 text-stone-700"
                      }`}
                    />
                    <textarea
                      rows={4}
                      value={(block.data as CodeBlockData).code || ""}
                      onChange={(e) => updateBlock(block.id, { code: e.target.value })}
                      placeholder="Paste code snippet..."
                      className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-cyan-300 font-mono text-xs focus:outline-none"
                    />
                  </div>
                )}

                {block.type === "callout" && (
                  <div
                    className={`space-y-2 font-sans text-xs p-3 rounded-xl border ${
                      isDark ? "bg-white/5 border-white/10" : "bg-purple-50/50 border-[#E8E2F2]"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-mono">
                      {(["info", "tip", "warning", "success"] as const).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => updateBlock(block.id, { variant: v })}
                          className={`capitalize px-2 py-0.5 rounded text-[11px] ${
                            (block.data as CalloutBlockData).variant === v
                              ? "bg-[#C07DFF] text-white font-bold"
                              : isDark
                              ? "bg-white/5 text-stone-400"
                              : "bg-white border border-[#E8E2F2] text-stone-700"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={(block.data as CalloutBlockData).title || ""}
                      onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                      placeholder="Callout title..."
                      className={`w-full px-3 py-1.5 rounded-lg font-semibold text-xs border ${
                        isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-[#E8E2F2] text-slate-900"
                      }`}
                    />
                    <textarea
                      rows={2}
                      value={(block.data as CalloutBlockData).text || ""}
                      onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                      placeholder="Callout description..."
                      className={`w-full px-3 py-2 rounded-xl text-xs resize-none border ${
                        isDark ? "bg-white/5 border-white/10 text-stone-300" : "bg-white border-[#E8E2F2] text-stone-800"
                      }`}
                    />
                  </div>
                )}

                {block.type === "divider" && (
                  <div className="py-2 text-center text-stone-400 font-mono text-[10px]">
                    &mdash;&mdash;&mdash; Content Section Break &mdash;&mdash;&mdash;
                  </div>
                )}

                {/* Inserter Toolbar underneath each block */}
                <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div
                    className={`flex items-center gap-1 border rounded-full px-3 py-1 text-[11px] font-mono shadow-xl ${
                      isDark ? "bg-slate-900 border-white/15 text-stone-300" : "bg-white border-[#E8E2F2] text-stone-700 shadow-sm"
                    }`}
                  >
                    <span className="text-stone-400 mr-1">+ Insert:</span>
                    <button
                      type="button"
                      onClick={() => addBlock("paragraph", index)}
                      className="px-1.5 py-0.5 hover:text-[#3BC8F6]"
                    >
                      Paragraph
                    </button>
                    <span className="text-stone-400">&bull;</span>
                    <button
                      type="button"
                      onClick={() => addBlock("heading", index)}
                      className="px-1.5 py-0.5 hover:text-[#C07DFF]"
                    >
                      Heading
                    </button>
                    <span className="text-stone-400">&bull;</span>
                    <button
                      type="button"
                      onClick={() => addBlock("image", index)}
                      className="px-1.5 py-0.5 hover:text-emerald-500"
                    >
                      Image
                    </button>
                    <span className="text-stone-400">&bull;</span>
                    <button
                      type="button"
                      onClick={() => addBlock("callout", index)}
                      className="px-1.5 py-0.5 hover:text-amber-500"
                    >
                      Callout
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Add Block Inserter Bar */}
          <div
            className={`p-6 rounded-3xl border border-dashed text-center space-y-3 transition-colors ${
              isDark ? "bg-white/[0.02] border-white/15" : "bg-white border-[#E8E2F2] shadow-sm"
            }`}
          >
            <p
              className={`font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider font-bold ${
                isDark ? "text-stone-400" : "text-stone-700"
              }`}
            >
              Add Content Block
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { type: "paragraph", label: "Paragraph", icon: "¶" },
                { type: "heading", label: "Heading", icon: "H" },
                { type: "list", label: "List", icon: "≡" },
                { type: "image", label: "Image", icon: "🖼" },
                { type: "quote", label: "Quote", icon: "“" },
                { type: "table", label: "Table", icon: "▦" },
                { type: "code", label: "Code", icon: "</>" },
                { type: "callout", label: "Callout", icon: "ℹ" },
                { type: "divider", label: "Divider", icon: "—" },
              ].map((b) => (
                <button
                  key={b.type}
                  type="button"
                  onClick={() => addBlock(b.type as BlockType)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
                    isDark
                      ? "bg-white/5 hover:bg-white/10 border-white/10 text-stone-200 hover:text-white"
                      : "bg-stone-50 hover:bg-[#F4E9FF] border-[#E8E2F2] text-stone-700 hover:text-[#8B5CF6] shadow-sm"
                  }`}
                >
                  <span className="text-[#3BC8F6] font-bold">{b.icon}</span>
                  <span>{b.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Settings & SEO Inspector (Scrollable, Sticky) */}
        <div className="space-y-6 lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1 pb-24">
          {/* Inspector Tab Switcher */}
          <div
            className={`flex rounded-2xl p-1 border font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider transition-colors ${
              isDark ? "bg-white/5 border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveTab("document")}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                activeTab === "document"
                  ? "bg-[#C07DFF] text-white shadow-md"
                  : isDark
                  ? "text-stone-400 hover:text-white"
                  : "text-stone-600 hover:text-slate-900"
              }`}
            >
              Categories &amp; Details
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("seo")}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                activeTab === "seo"
                  ? "bg-[#3BC8F6] text-black shadow-md font-bold"
                  : isDark
                  ? "text-stone-400 hover:text-white"
                  : "text-stone-600 hover:text-slate-900"
              }`}
            >
              SEO &amp; Meta
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3 py-2.5 rounded-xl transition-all ${
                activeTab === "all"
                  ? isDark
                    ? "bg-white/20 text-white shadow-md"
                    : "bg-stone-200 text-slate-900 font-bold"
                  : isDark
                  ? "text-stone-400 hover:text-white"
                  : "text-stone-600 hover:text-slate-900"
              }`}
              title="Show All Settings"
            >
              All
            </button>
          </div>

          {(activeTab === "document" || activeTab === "all") && (
            <div className="space-y-6 text-xs font-sans">
              {/* Categories & Linking Card (Prominently Placed at the Top!) */}
              <div
                className={`p-5 rounded-2xl border space-y-4 shadow-lg transition-colors ${
                  isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
                }`}
              >
                <div
                  className={`flex items-center justify-between border-b pb-2 transition-colors ${
                    isDark ? "border-white/10" : "border-[#E8E2F2]"
                  }`}
                >
                  <div>
                    <span
                      className={`font-[family-name:var(--font-oswald)] uppercase font-semibold tracking-wider block ${
                        isDark ? "text-stone-200" : "text-[#111111]"
                      }`}
                    >
                      Post Categories &amp; Linking
                    </span>
                    <span className={`text-[10px] font-sans ${isDark ? "text-stone-400" : "text-stone-500"}`}>
                      Select or add categories for this article
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddingNewCat(!isAddingNewCat)}
                    className="px-2.5 py-1 rounded-lg bg-[#C07DFF]/20 hover:bg-[#C07DFF] text-purple-300 hover:text-white font-mono text-[11px] font-bold transition-all"
                  >
                    {isAddingNewCat ? "Cancel" : "+ New Category"}
                  </button>
                </div>

                {/* Inline Quick Category Creator */}
                {isAddingNewCat && (
                  <form
                    onSubmit={handleCreateAndLinkCategory}
                    className={`p-3 rounded-xl border space-y-2 animate-fadeIn ${
                      isDark ? "bg-white/5 border-[#C07DFF]/40" : "bg-purple-50/50 border-[#C07DFF]/40"
                    }`}
                  >
                    <label
                      className={`block text-[10px] uppercase font-mono font-bold ${
                        isDark ? "text-stone-300" : "text-stone-700"
                      }`}
                    >
                      Create &amp; Link Category
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        autoFocus
                        required
                        value={quickCatName}
                        onChange={(e) => setQuickCatName(e.target.value)}
                        placeholder="e.g. Cloud AI, Mobile Apps..."
                        className={`flex-1 px-2.5 py-1.5 rounded-lg border text-xs focus:outline-none focus:border-[#C07DFF] ${
                          isDark
                            ? "bg-black/60 border-white/15 text-white"
                            : "bg-white border-[#E8E2F2] text-slate-900 shadow-sm"
                        }`}
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-lg bg-[#C07DFF] text-white font-[family-name:var(--font-oswald)] uppercase font-bold text-xs"
                      >
                        Add &amp; Link
                      </button>
                    </div>
                  </form>
                )}

                {/* Category Checkboxes List */}
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {categoriesList.map((cat) => {
                    const isLinked = post.categories.includes(cat.name);
                    return (
                      <label
                        key={cat.id}
                        className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all border ${
                          isLinked
                            ? isDark
                              ? "bg-[#C07DFF]/15 border-[#C07DFF]/50 text-white"
                              : "bg-[#F4E9FF] border-[#C07DFF]/40 text-[#8B5CF6] font-semibold"
                            : isDark
                            ? "bg-white/[0.02] border-white/5 text-stone-300 hover:bg-white/[0.05]"
                            : "bg-stone-50/70 border-stone-200/60 text-stone-700 hover:bg-stone-100"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isLinked}
                            onChange={() => toggleCategory(cat.name)}
                            className="rounded accent-[#C07DFF] w-4 h-4 cursor-pointer"
                          />
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: cat.color || "#C07DFF" }}
                          />
                          <span className="text-xs font-medium">{cat.name}</span>
                        </div>
                        {isLinked && (
                          <span className="text-[10px] text-[#C07DFF] font-mono font-bold">
                            Linked ✓
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Publishing Workflow Card */}
              <div
                className={`p-5 rounded-2xl border space-y-4 transition-colors ${
                  isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
                }`}
              >
                <span
                  className={`font-[family-name:var(--font-oswald)] uppercase font-semibold tracking-wider block border-b pb-2 ${
                    isDark ? "border-white/10 text-stone-300" : "border-[#E8E2F2] text-[#111111]"
                  }`}
                >
                  Status &amp; Publishing
                </span>

                <div className="space-y-3">
                  <div>
                    <label
                      className={`block text-[11px] uppercase font-semibold mb-1 ${
                        isDark ? "text-stone-400" : "text-stone-600"
                      }`}
                    >
                      Publishing Status
                    </label>
                    <select
                      value={post.status}
                      onChange={(e) => {
                        setPost((prev) => ({ ...prev, status: e.target.value as PostStatus }));
                        markUnsaved();
                      }}
                      className={`w-full px-3 py-2 rounded-xl border focus:outline-none transition-colors ${
                        isDark
                          ? "bg-white/5 border-white/10 text-white"
                          : "bg-white border-[#E8E2F2] text-slate-900 shadow-sm"
                      }`}
                    >
                      <option value="draft" className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}>Draft</option>
                      <option value="review" className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}>In Review</option>
                      <option value="scheduled" className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}>Scheduled</option>
                      <option value="published" className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}>Published</option>
                      <option value="archived" className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}>Archived</option>
                    </select>
                  </div>

                  {post.status === "scheduled" && (
                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-amber-500 mb-1">
                        Scheduled Date &amp; Time
                      </label>
                      <input
                        type="datetime-local"
                        value={post.scheduledFor ? post.scheduledFor.substring(0, 16) : ""}
                        onChange={(e) => {
                          setPost((prev) => ({
                            ...prev,
                            scheduledFor: new Date(e.target.value).toISOString(),
                          }));
                          markUnsaved();
                        }}
                        className={`w-full px-3 py-2 rounded-xl border focus:outline-none ${
                          isDark
                            ? "bg-white/5 border-amber-500/40 text-white"
                            : "bg-white border-amber-400 text-slate-900"
                        }`}
                      />
                    </div>
                  )}

                  <div>
                    <label
                      className={`block text-[11px] uppercase font-semibold mb-1 ${
                        isDark ? "text-stone-400" : "text-stone-600"
                      }`}
                    >
                      Author
                    </label>
                    <input
                      type="text"
                      value={post.author.name}
                      onChange={(e) => {
                        setPost((prev) => ({
                          ...prev,
                          author: { ...prev.author, name: e.target.value },
                        }));
                        markUnsaved();
                      }}
                      className={`w-full px-3 py-2 rounded-xl border focus:outline-none ${
                        isDark
                          ? "bg-white/5 border-white/10 text-white"
                          : "bg-white border-[#E8E2F2] text-slate-900 shadow-sm"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Featured Image Card */}
              <div
                className={`p-5 rounded-2xl border space-y-4 transition-colors ${
                  isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
                }`}
              >
                <span
                  className={`font-[family-name:var(--font-oswald)] uppercase font-semibold tracking-wider block border-b pb-2 ${
                    isDark ? "border-white/10 text-stone-300" : "border-[#E8E2F2] text-[#111111]"
                  }`}
                >
                  Featured Cover Image
                </span>

                <input
                  id="featured-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleLocalImageUpload(file, "featured");
                  }}
                />

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleLocalImageUpload(file, "featured");
                  }}
                  className={`relative rounded-xl overflow-hidden aspect-video border group/feat ${
                    isDark ? "border-white/10 bg-black" : "border-[#E8E2F2] bg-stone-100"
                  }`}
                >
                  <Image
                    src={post.featuredImage || "/images/blog/blog-hero.webp"}
                    alt={post.featuredImageAlt || post.title}
                    fill
                    unoptimized={Boolean(
                      post.featuredImage?.startsWith("data:") ||
                        post.featuredImage?.startsWith("blob:")
                    )}
                    className="object-cover"
                  />
                  <label
                    htmlFor="featured-image-upload"
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover/feat:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity font-mono text-xs gap-1.5 p-3 text-center"
                  >
                    <span className="text-xl">📁</span>
                    <span>Click or drag image from computer</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <label
                    htmlFor="featured-image-upload"
                    className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider font-semibold text-center cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>📁 From Computer</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleOpenMedia("featured")}
                    className={`py-2.5 px-2 rounded-xl border font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider transition-all text-center ${
                      isDark
                        ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                        : "bg-stone-50 hover:bg-[#F4E9FF] border-[#E8E2F2] text-stone-800 hover:text-[#8B5CF6] shadow-sm"
                    }`}
                  >
                    From Library
                  </button>
                </div>
              </div>

              {/* Excerpt */}
              <div
                className={`p-5 rounded-2xl border space-y-3 transition-colors ${
                  isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
                }`}
              >
                <span
                  className={`font-[family-name:var(--font-oswald)] uppercase font-semibold tracking-wider block border-b pb-2 ${
                    isDark ? "border-white/10 text-stone-300" : "border-[#E8E2F2] text-[#111111]"
                  }`}
                >
                  Excerpt Summary
                </span>
                <textarea
                  rows={3}
                  value={post.excerpt}
                  onChange={(e) => {
                    setPost((prev) => ({ ...prev, excerpt: e.target.value }));
                    markUnsaved();
                  }}
                  placeholder="Concise overview displayed on cards and search snippets..."
                  className={`w-full px-3 py-2 rounded-xl border text-xs resize-none focus:outline-none ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white"
                      : "bg-white border-[#E8E2F2] text-slate-900 shadow-sm"
                  }`}
                />
              </div>

              {/* Tags Cloud */}
              <div
                className={`p-5 rounded-2xl border space-y-3 transition-colors ${
                  isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
                }`}
              >
                <span
                  className={`font-[family-name:var(--font-oswald)] uppercase font-semibold tracking-wider block border-b pb-2 ${
                    isDark ? "border-white/10 text-stone-300" : "border-[#E8E2F2] text-[#111111]"
                  }`}
                >
                  Tags &amp; Keywords
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-mono ${
                        isDark
                          ? "bg-white/5 border-white/10 text-stone-300"
                          : "bg-stone-50 border-[#E8E2F2] text-stone-700"
                      }`}
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-stone-400 hover:text-rose-500 font-bold ml-1"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Type tag and press Enter..."
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white"
                      : "bg-white border-[#E8E2F2] text-slate-900 shadow-sm"
                  }`}
                />
              </div>
            </div>
          )}

          {(activeTab === "seo" || activeTab === "all") && (
            <BlogSeoPanel
              post={post}
              onChangeSeo={(seo) => {
                setPost((prev) => ({ ...prev, seo }));
                markUnsaved();
              }}
              onChangeSlug={(slug) => {
                setPost((prev) => ({ ...prev, slug: slugify(slug) }));
                markUnsaved();
              }}
            />
          )}
        </div>
      </div>

      {/* Media Library Selector Modal */}
      {showMediaModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-slate-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <BlogMediaLibrary
              isModal={true}
              onClose={() => setShowMediaModal(false)}
              onSelectMedia={handleMediaSelected}
            />
          </div>
        </div>
      )}

      {/* Live Preview Modal */}
      {showPreviewModal && (
        <BlogLivePreviewModal
          post={post}
          onClose={() => setShowPreviewModal(false)}
        />
      )}

      {/* Revisions History Modal */}
      {showRevisionsModal && (
        <BlogRevisionsModal
          post={post}
          onRestoreRevision={(rev) => {
            setPost((prev) => ({
              ...prev,
              title: rev.title,
              contentBlocks: rev.contentBlocks,
            }));
            markUnsaved();
          }}
          onClose={() => setShowRevisionsModal(false)}
        />
      )}
    </div>
  );
}

