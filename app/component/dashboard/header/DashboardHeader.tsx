"use client";

import React from "react";
import Link from "next/link";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";

interface DashboardHeaderProps {
  activeTab: string;
  activeSubTab: string;
  onOpenMobileSidebar: () => void;
}

export default function DashboardHeader({
  activeTab,
  activeSubTab,
  onOpenMobileSidebar,
}: DashboardHeaderProps) {
  const { isDark, toggleTheme } = useDashboardTheme();

  const formatTitle = (str: string) => {
    return str
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <header
      className={`sticky top-0 z-20 w-full px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 transition-colors duration-300 ${
        isDark
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10 text-white"
          : "bg-white/85 backdrop-blur-xl border-b border-[#E8E2F2] text-slate-900 shadow-[0_2px_12px_rgba(192,125,255,0.04)]"
      }`}
    >
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onOpenMobileSidebar}
          className={`lg:hidden p-2 rounded-xl border transition-all ${
            isDark
              ? "bg-white/5 hover:bg-white/10 border-white/10 text-stone-300 hover:text-white"
              : "bg-white hover:bg-stone-50 border-[#E8E2F2] text-stone-700 shadow-sm"
          }`}
          aria-label="Open sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
            <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
            <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
          </svg>
        </button>

        {/* Breadcrumb Path */}
        <div className="flex items-center gap-2 font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider">
          <span className={isDark ? "text-stone-400 hidden sm:inline" : "text-stone-500 hidden sm:inline"}>
            Console
          </span>
          <span className={isDark ? "text-stone-600 hidden sm:inline" : "text-stone-400 hidden sm:inline"}>
            &bull;
          </span>
          <span className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
            {formatTitle(activeTab)}
          </span>
          {activeSubTab && activeSubTab !== activeTab && (
            <>
              <span className="text-[#3BC8F6]">&rsaquo;</span>
              <span className="text-[#3BC8F6] font-medium">{formatTitle(activeSubTab)}</span>
            </>
          )}
        </div>
      </div>

      {/* Right: Theme Toggle, System Status & Public Site Link */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Operational Status Pill */}
        <div
          className={`hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono border transition-colors ${
            isDark
              ? "bg-emerald-950/60 border-emerald-500/30 text-emerald-300"
              : "bg-emerald-50 border-emerald-200 text-emerald-700"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live SLA 99.98%</span>
        </div>

        {/* Interactive Sun / Moon Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className={`p-2 rounded-xl border transition-all flex items-center justify-center ${
            isDark
              ? "bg-white/5 hover:bg-white/10 border-white/10 text-amber-300 hover:text-amber-200"
              : "bg-white hover:bg-stone-50 border-[#E8E2F2] text-[#8B5CF6] shadow-sm"
          }`}
          title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
          aria-label="Toggle Dashboard Theme"
        >
          {isDark ? (
            /* Sun Icon */
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            /* Moon Icon */
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* View Public Site Shortcut */}
        <Link
          href="/screens/home"
          target="_blank"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider border transition-all group ${
            isDark
              ? "bg-white/5 hover:bg-white/10 border-white/10 text-stone-300 hover:text-white"
              : "bg-white hover:bg-stone-50 border-[#E8E2F2] text-stone-700 hover:text-[#C07DFF] shadow-sm"
          }`}
        >
          <AsteriskIcon className="w-3.5 h-3.5 text-[#3BC8F6] group-hover:rotate-45 transition-transform" color="#3BC8F6" strokeWidth={3} />
          <span className="hidden sm:inline">Public Site</span>
          <span>&nearr;</span>
        </Link>
      </div>
    </header>
  );
}
