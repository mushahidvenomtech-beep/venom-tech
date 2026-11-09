"use client";

import React, { useState } from "react";
import { BlogPost, SeoSettings } from "@/lib/blog/types";
import { analyzeSeo } from "@/lib/blog/validation";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";

interface BlogSeoPanelProps {
  post: Partial<BlogPost>;
  onChangeSeo: (seo: SeoSettings) => void;
  onChangeSlug: (slug: string) => void;
}

export default function BlogSeoPanel({
  post,
  onChangeSeo,
  onChangeSlug,
}: BlogSeoPanelProps) {
  const { isDark } = useDashboardTheme();
  const [devicePreview, setDevicePreview] = useState<"desktop" | "mobile">("desktop");

  const seo = post.seo || {
    metaTitle: post.title || "",
    metaDescription: post.excerpt || "",
    focusKeyword: "",
    canonicalUrl: "",
    ogImage: post.featuredImage || "",
    noIndex: false,
    noFollow: false,
  };

  const analysis = analyzeSeo(post);

  const handleUpdate = (field: keyof SeoSettings, value: any) => {
    onChangeSeo({
      ...seo,
      [field]: value,
    });
  };

  const titleLength = (seo.metaTitle || post.title || "").length;
  const descLength = (seo.metaDescription || post.excerpt || "").length;

  return (
    <div className="space-y-5 text-xs font-sans pb-10">
      {/* 1. Primary Search Engine Metadata (SEO Title & Meta Description TOGETHER at top) */}
      <div
        className={`p-5 rounded-2xl border space-y-4 shadow-lg transition-colors ${
          isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
        }`}
      >
        <div
          className={`flex items-center justify-between border-b pb-2.5 transition-colors ${
            isDark ? "border-white/10" : "border-[#E8E2F2]"
          }`}
        >
          <span
            className={`font-[family-name:var(--font-oswald)] uppercase font-semibold tracking-wider text-xs ${
              isDark ? "text-stone-200" : "text-[#111111]"
            }`}
          >
            Search Engine Metadata
          </span>
          <span className="text-[10px] text-[#3BC8F6] font-mono font-bold">
            Meta Title &amp; Description
          </span>
        </div>

        {/* SEO Meta Title */}
        <div>
          <div className="flex items-center justify-between mb-1.5 text-[11px]">
            <label
              className={`uppercase tracking-wider font-semibold ${
                isDark ? "text-stone-300" : "text-stone-700"
              }`}
            >
              SEO Meta Title <span className="text-[#3BC8F6]">*</span>
            </label>
            <span
              className={`font-mono text-[10px] font-bold ${
                titleLength >= 40 && titleLength <= 60
                  ? "text-emerald-500"
                  : titleLength > 65
                  ? "text-rose-500"
                  : "text-amber-500"
              }`}
            >
              {titleLength}/60 chars
            </span>
          </div>
          <input
            type="text"
            value={seo.metaTitle || ""}
            onChange={(e) => handleUpdate("metaTitle", e.target.value)}
            placeholder={post.title || "Custom search title..."}
            className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#3BC8F6] transition-all ${
              isDark
                ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                : "bg-white border-[#E8E2F2] text-slate-900 placeholder-stone-400 shadow-sm"
            }`}
          />
        </div>

        {/* SEO Meta Description (Right Along With Meta Title!) */}
        <div>
          <div className="flex items-center justify-between mb-1.5 text-[11px]">
            <label
              className={`uppercase tracking-wider font-semibold ${
                isDark ? "text-stone-300" : "text-stone-700"
              }`}
            >
              SEO Meta Description <span className="text-[#3BC8F6]">*</span>
            </label>
            <span
              className={`font-mono text-[10px] font-bold ${
                descLength >= 120 && descLength <= 160
                  ? "text-emerald-500"
                  : descLength > 165
                  ? "text-rose-500"
                  : "text-amber-500"
              }`}
            >
              {descLength}/160 chars
            </span>
          </div>
          <textarea
            rows={3}
            value={seo.metaDescription || ""}
            onChange={(e) => handleUpdate("metaDescription", e.target.value)}
            placeholder={post.excerpt || "Enter search engine meta description summary..."}
            className={`w-full px-3 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#3BC8F6] transition-all resize-none ${
              isDark
                ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                : "bg-white border-[#E8E2F2] text-slate-900 placeholder-stone-400 shadow-sm"
            }`}
          />
        </div>

        {/* Custom URL Slug */}
        <div
          className={`pt-2 border-t transition-colors ${
            isDark ? "border-white/5" : "border-stone-100"
          }`}
        >
          <label
            className={`block uppercase tracking-wider font-semibold mb-1.5 text-[11px] ${
              isDark ? "text-stone-300" : "text-stone-700"
            }`}
          >
            Search Permalink URL Slug
          </label>
          <div
            className={`flex items-center rounded-xl border overflow-hidden px-3 py-1 transition-colors ${
              isDark ? "bg-white/5 border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
            }`}
          >
            <span className="text-stone-400 font-mono text-[11px]">/blog/</span>
            <input
              type="text"
              value={post.slug || ""}
              onChange={(e) => onChangeSlug(e.target.value)}
              className={`flex-1 bg-transparent px-1 py-1 font-mono text-xs focus:outline-none ${
                isDark ? "text-white" : "text-slate-900 font-semibold"
              }`}
            />
          </div>
        </div>
      </div>

      {/* 2. Focus Keyword */}
      <div
        className={`p-5 rounded-2xl border space-y-3 transition-colors ${
          isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
        }`}
      >
        <label
          className={`block uppercase tracking-wider font-semibold text-[11px] ${
            isDark ? "text-stone-300" : "text-stone-700"
          }`}
        >
          Target Focus Keyword
        </label>
        <input
          type="text"
          value={seo.focusKeyword || ""}
          onChange={(e) => handleUpdate("focusKeyword", e.target.value)}
          placeholder="e.g. AI Automation, App Development, SEO"
          className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#3BC8F6] transition-all ${
            isDark
              ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
              : "bg-white border-[#E8E2F2] text-slate-900 placeholder-stone-400 shadow-sm"
          }`}
        />
        <div className="flex flex-wrap gap-2 text-[10px] font-mono pt-1">
          <span
            className={`px-2 py-0.5 rounded ${
              analysis.keywordInTitle
                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 font-semibold"
                : isDark
                ? "bg-white/5 text-stone-500"
                : "bg-stone-100 text-stone-500"
            }`}
          >
            {analysis.keywordInTitle ? "✓" : "✕"} in Meta Title
          </span>
          <span
            className={`px-2 py-0.5 rounded ${
              analysis.keywordInDesc
                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 font-semibold"
                : isDark
                ? "bg-white/5 text-stone-500"
                : "bg-stone-100 text-stone-500"
            }`}
          >
            {analysis.keywordInDesc ? "✓" : "✕"} in Meta Desc
          </span>
          <span
            className={`px-2 py-0.5 rounded ${
              analysis.keywordInSlug
                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 font-semibold"
                : isDark
                ? "bg-white/5 text-stone-500"
                : "bg-stone-100 text-stone-500"
            }`}
          >
            {analysis.keywordInSlug ? "✓" : "✕"} in URL Slug
          </span>
        </div>
      </div>

      {/* 3. Live Google SERP Snippet Preview */}
      <div
        className={`p-4 rounded-2xl border space-y-2 transition-colors ${
          isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between text-[11px]">
          <span
            className={`font-semibold uppercase tracking-wider ${
              isDark ? "text-stone-300" : "text-stone-700"
            }`}
          >
            Live Google SERP Snippet
          </span>
          <div
            className={`flex rounded-lg p-0.5 border text-[10px] ${
              isDark ? "bg-white/5 border-white/10" : "bg-stone-100 border-stone-200"
            }`}
          >
            <button
              type="button"
              onClick={() => setDevicePreview("desktop")}
              className={`px-2 py-0.5 rounded transition-all ${
                devicePreview === "desktop"
                  ? "bg-[#3BC8F6] text-black font-bold"
                  : isDark
                  ? "text-stone-400"
                  : "text-stone-600"
              }`}
            >
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setDevicePreview("mobile")}
              className={`px-2 py-0.5 rounded transition-all ${
                devicePreview === "mobile"
                  ? "bg-[#3BC8F6] text-black font-bold"
                  : isDark
                  ? "text-stone-400"
                  : "text-stone-600"
              }`}
            >
              Mobile
            </button>
          </div>
        </div>

        {/* Google Mock Card (Adaptive Theme: Authentic Google dark or light snippet!) */}
        <div
          className={`p-3.5 rounded-xl text-left space-y-1 font-sans border transition-colors ${
            isDark
              ? "bg-[#202124] text-stone-200 border-stone-800"
              : "bg-white text-stone-800 border-[#DADCE0] shadow-sm"
          }`}
        >
          <div
            className={`flex items-center gap-2 text-[11px] truncate ${
              isDark ? "text-[#bdc1c6]" : "text-[#202124]"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                isDark ? "bg-stone-700 text-white" : "bg-stone-200 text-stone-800"
              }`}
            >
              V
            </span>
            <span className="truncate">venomtech.pk &rsaquo; blog &rsaquo; {post.slug || "url-slug"}</span>
          </div>
          <div
            className={`text-sm hover:underline font-medium cursor-pointer line-clamp-1 ${
              isDark ? "text-[#8ab4f8]" : "text-[#1a0dab]"
            }`}
          >
            {seo.metaTitle || post.title || "Article Title Preview"}
          </div>
          <div
            className={`text-[11px] leading-relaxed line-clamp-2 ${
              isDark ? "text-[#bdc1c6]" : "text-[#4d5156]"
            }`}
          >
            {seo.metaDescription || post.excerpt || "Enter a meta description above to see how search engines will preview this article snippet."}
          </div>
        </div>
      </div>

      {/* 4. On-Page SEO Score & Recommendations */}
      <div
        className={`p-4 rounded-2xl border space-y-3 transition-colors ${
          isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`font-[family-name:var(--font-oswald)] uppercase font-semibold tracking-wider ${
              isDark ? "text-stone-300" : "text-stone-800"
            }`}
          >
            SEO Audit Score
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full font-mono font-bold text-xs ${
              analysis.score >= 80
                ? isDark
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : analysis.score >= 60
                ? isDark
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
                : isDark
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
          >
            {analysis.score} / 100
          </span>
        </div>

        {/* Progress Bar */}
        <div
          className={`w-full h-1.5 rounded-full overflow-hidden ${
            isDark ? "bg-white/10" : "bg-stone-100"
          }`}
        >
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              analysis.score >= 80
                ? "bg-emerald-500"
                : analysis.score >= 60
                ? "bg-amber-500"
                : "bg-rose-500"
            }`}
            style={{ width: `${analysis.score}%` }}
          />
        </div>

        {analysis.recommendations.length > 0 && (
          <div
            className={`pt-2 border-t space-y-1.5 transition-colors ${
              isDark ? "border-white/5" : "border-stone-100"
            }`}
          >
            <span
              className={`text-[10px] uppercase font-mono tracking-wider font-bold block ${
                isDark ? "text-stone-400" : "text-stone-600"
              }`}
            >
              Recommendations:
            </span>
            <ul
              className={`space-y-1 text-[11px] ${
                isDark ? "text-stone-300" : "text-stone-700"
              }`}
            >
              {analysis.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-500 text-xs leading-none">&bull;</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 5. Indexing Controls & Canonical */}
      <div
        className={`p-4 rounded-2xl border space-y-3 transition-colors ${
          isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
        }`}
      >
        <div>
          <label
            className={`block uppercase tracking-wider font-semibold mb-1 text-[10px] ${
              isDark ? "text-stone-400" : "text-stone-600"
            }`}
          >
            Canonical URL (Optional)
          </label>
          <input
            type="url"
            value={seo.canonicalUrl || ""}
            onChange={(e) => handleUpdate("canonicalUrl", e.target.value)}
            placeholder="https://venomtech.pk/blog/custom-slug"
            className={`w-full px-3 py-1.5 rounded-lg border text-xs focus:outline-none ${
              isDark
                ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                : "bg-white border-[#E8E2F2] text-slate-900 placeholder-stone-400 shadow-sm"
            }`}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <label
            className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg border transition-all ${
              isDark
                ? "bg-white/[0.02] border-white/10 hover:bg-white/5"
                : "bg-stone-50 border-[#E8E2F2] hover:bg-stone-100"
            }`}
          >
            <input
              type="checkbox"
              checked={seo.noIndex || false}
              onChange={(e) => handleUpdate("noIndex", e.target.checked)}
              className="rounded accent-[#C07DFF]"
            />
            <span
              className={`text-[11px] font-mono ${
                isDark ? "text-stone-300" : "text-stone-700"
              }`}
            >
              no-index
            </span>
          </label>

          <label
            className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg border transition-all ${
              isDark
                ? "bg-white/[0.02] border-white/10 hover:bg-white/5"
                : "bg-stone-50 border-[#E8E2F2] hover:bg-stone-100"
            }`}
          >
            <input
              type="checkbox"
              checked={seo.noFollow || false}
              onChange={(e) => handleUpdate("noFollow", e.target.checked)}
              className="rounded accent-[#C07DFF]"
            />
            <span
              className={`text-[11px] font-mono ${
                isDark ? "text-stone-300" : "text-stone-700"
              }`}
            >
              no-follow
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
