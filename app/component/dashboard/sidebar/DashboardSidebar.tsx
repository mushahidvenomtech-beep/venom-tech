"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";

export interface NavDropdownItem {
  id: string;
  label: string;
  badge?: string;
}

export interface NavSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: NavDropdownItem[];
}

interface DashboardSidebarProps {
  activeTab: string;
  activeSubTab: string;
  onSelectTab: (tabId: string, subTabId?: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const NAV_SECTIONS: NavSection[] = [
  {
    id: "leads",
    label: "Leads",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      { id: "all-leads", label: "All Inquiries" },
    ],
  },
  {
    id: "blogs",
    label: "Blogs",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      { id: "all-blogs", label: "Published Articles" },
      { id: "create-blog", label: "Write New Post", badge: "+ New" },
      { id: "drafts", label: "Review Queue" },
      { id: "categories", label: "Categories & Tags" },
      { id: "media", label: "Media Library" },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      { id: "all-projects", label: "All Projects" },
      { id: "add-project", label: "Add Project", badge: "+ New" },
      { id: "categories", label: "Categories" },
    ],
  },
  {
    id: "team",
    label: "Team",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      { id: "all-members", label: "Team Members" },
      { id: "add-member", label: "Add Team Member", badge: "+ New" },
    ],
  },
];

export default function DashboardSidebar({
  activeTab,
  activeSubTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}: DashboardSidebarProps) {
  const router = useRouter();
  const { isDark } = useDashboardTheme();

  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    leads: true,
    blogs: true,
    projects: true,
    team: true,
  });

  const toggleDropdown = (sectionId: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("venom_admin_logged_in");
      localStorage.removeItem("venom_admin_user");
      document.cookie = "venom_admin_auth=; path=/; max-age=0";
    }
    router.push("/login");
  };

  const sidebarContent = (
    <div
      className={`h-full flex flex-col justify-between select-none transition-colors duration-300 ${
        isDark
          ? "bg-slate-950 text-white border-r border-white/10"
          : "bg-white text-slate-900 border-r border-[#E8E2F2] shadow-[2px_0_16px_rgba(192,125,255,0.03)]"
      }`}
    >
      {/* Top Brand Header */}
      <div>
        <div
          className={`p-5 sm:p-6 flex items-center justify-between border-b transition-colors ${
            isDark ? "border-white/10" : "border-[#E8E2F2]"
          }`}
        >
          <Link
            href="/dashboard"
            onClick={() => onSelectTab("overview")}
            className="flex items-center gap-3 overflow-hidden group"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#C07DFF] to-[#3BC8F6] p-0.5 flex-shrink-0 shadow-lg shadow-[#3BC8F6]/20 transition-transform duration-300 group-hover:scale-105">
              <div
                className={`w-full h-full rounded-[10px] flex items-center justify-center p-1 ${
                  isDark ? "bg-slate-950" : "bg-white"
                }`}
              >
                <Image
                  src="/images/venom tech logo.png"
                  alt="Venom Tech Logo"
                  width={32}
                  height={32}
                  priority
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {!isCollapsed && (
              <div className="truncate">
                <span
                  className={`font-[family-name:var(--font-oswald)] font-extrabold uppercase text-lg tracking-wider block leading-tight ${
                    isDark ? "text-white" : "text-[#111111]"
                  }`}
                >
                  Venom Tech
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C07DFF] block font-bold">
                  Enterprise Admin
                </span>
              </div>
            )}
          </Link>

          {/* Desktop collapse toggle */}
          <button
            onClick={onToggleCollapse}
            className={`hidden lg:flex w-7 h-7 rounded-lg border items-center justify-center transition-all ${
              isDark
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-stone-400 hover:text-white"
                : "bg-stone-50 hover:bg-stone-100 border-[#E8E2F2] text-stone-600 hover:text-black shadow-xs"
            }`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? "→" : "←"}
          </button>
        </div>

        {/* Navigation Section */}
        <div className="p-3 sm:p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)] custom-scrollbar">
          {/* Overview Primary Button */}
          <button
            onClick={() => {
              onSelectTab("overview");
              onCloseMobile();
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-bold transition-all ${
              activeTab === "overview"
                ? isDark
                  ? "bg-gradient-to-r from-[#C07DFF]/20 to-[#3BC8F6]/20 border border-[#3BC8F6]/40 text-white shadow-md shadow-[#3BC8F6]/10"
                  : "bg-gradient-to-r from-[#F4E9FF] to-[#E5F7FF] border border-[#C07DFF]/40 text-[#8B5CF6] shadow-sm"
                : isDark
                ? "text-stone-400 hover:text-white hover:bg-white/5 border border-transparent"
                : "text-stone-600 hover:text-black hover:bg-[#F4E9FF]/40 border border-transparent"
            }`}
          >
            <svg className="w-5 h-5 flex-shrink-0 text-[#3BC8F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {!isCollapsed && <span>Dashboard Overview</span>}
          </button>

          <div className="pt-2 pb-1 px-3">
            {!isCollapsed && (
              <span
                className={`text-[10px] uppercase font-mono tracking-widest font-semibold ${
                  isDark ? "text-stone-500" : "text-stone-400"
                }`}
              >
                Modules &amp; Management
              </span>
            )}
          </div>

          {/* 4 Requested Dropdown Modules: Leads, Services, Blogs, Projects */}
          {NAV_SECTIONS.map((section) => {
            const isSectionActive = activeTab === section.id;
            const isOpen = openDropdowns[section.id];

            return (
              <div key={section.id} className="space-y-1">
                {/* Section Header Button */}
                <button
                  type="button"
                  onClick={() => {
                    toggleDropdown(section.id);
                    if (!isOpen && !isSectionActive) {
                      onSelectTab(section.id, section.items[0]?.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-bold transition-all ${
                    isSectionActive
                      ? isDark
                        ? "text-white bg-white/10 border border-white/15"
                        : "text-[#8B5CF6] bg-[#F4E9FF]/80 border border-[#C07DFF]/30 shadow-xs"
                      : isDark
                      ? "text-stone-400 hover:text-white hover:bg-white/5 border border-transparent"
                      : "text-stone-600 hover:text-black hover:bg-[#F4E9FF]/30 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className={`${isSectionActive ? "text-[#C07DFF]" : isDark ? "text-stone-400" : "text-stone-500"}`}>
                      {section.icon}
                    </span>
                    {!isCollapsed && <span>{section.label}</span>}
                  </div>

                  {!isCollapsed && (
                    <span
                      className={`text-[10px] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      } ${isDark ? "text-stone-400" : "text-stone-500"}`}
                    >
                      ▼
                    </span>
                  )}
                </button>

                {/* Dropdown Items Accordion */}
                {!isCollapsed && isOpen && (
                  <div
                    className={`pl-6 pr-1 py-1 space-y-1 ml-5 border-l ${
                      isDark ? "border-white/10" : "border-[#E8E2F2]"
                    }`}
                  >
                    {section.items.map((subItem) => {
                      const isSubActive = isSectionActive && activeSubTab === subItem.id;

                      return (
                        <button
                          key={subItem.id}
                          type="button"
                          onClick={() => {
                            onSelectTab(section.id, subItem.id);
                            onCloseMobile();
                          }}
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-sans transition-all text-left ${
                            isSubActive
                              ? isDark
                                ? "bg-gradient-to-r from-[#C07DFF]/25 to-transparent text-[#3BC8F6] font-semibold border-l-2 border-[#3BC8F6]"
                                : "bg-[#F4E9FF] text-[#8B5CF6] font-bold border-l-2 border-[#C07DFF]"
                              : isDark
                              ? "text-stone-400 hover:text-white hover:bg-white/5"
                              : "text-stone-600 hover:text-black hover:bg-stone-100"
                          }`}
                        >
                          <span className="truncate">{subItem.label}</span>
                          {subItem.badge && (
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-mono border flex-shrink-0 ml-2 ${
                                isDark
                                  ? "bg-white/10 text-stone-300 border-white/10"
                                  : "bg-[#F5EBFF] text-[#8B5CF6] border-[#E8E2F2]"
                              }`}
                            >
                              {subItem.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile & Logout Footer */}
      <div
        className={`p-4 border-t transition-colors ${
          isDark
            ? "border-white/10 bg-slate-950/80 backdrop-blur-md"
            : "border-[#E8E2F2] bg-gradient-to-r from-[#FAF5FF] to-[#F0F9FF]"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C07DFF] to-[#3BC8F6] flex items-center justify-center text-white font-[family-name:var(--font-oswald)] font-bold text-sm flex-shrink-0 shadow-md shadow-[#C07DFF]/20">
              VT
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <span
                  className={`font-[family-name:var(--font-oswald)] font-bold text-sm block truncate ${
                    isDark ? "text-white" : "text-[#111111]"
                  }`}
                >
                  Venom Admin
                </span>
                <span
                  className={`text-[10px] font-mono block truncate ${
                    isDark ? "text-stone-400" : "text-stone-500"
                  }`}
                >
                  adminvenomtech@gmail.com
                </span>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={handleLogout}
              className={`p-2 rounded-lg border transition-all text-xs ${
                isDark
                  ? "bg-white/5 hover:bg-rose-500/20 text-stone-400 hover:text-rose-300 border-white/10 hover:border-rose-500/40"
                  : "bg-white hover:bg-rose-50 text-stone-600 hover:text-rose-600 border-[#E8E2F2] hover:border-rose-300 shadow-xs"
              }`}
              title="Sign Out"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block h-screen sticky top-0 transition-all duration-300 z-30 flex-shrink-0 ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="fixed top-0 bottom-0 left-0 w-72 max-w-[85vw] z-10 animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
