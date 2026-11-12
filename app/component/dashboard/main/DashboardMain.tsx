"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/app/component/dashboard/sidebar/DashboardSidebar";
import DashboardHeader from "@/app/component/dashboard/header/DashboardHeader";
import DashboardOverview from "@/app/component/dashboard/overview/DashboardOverview";
import DashboardLeads from "@/app/component/dashboard/leads/DashboardLeads";
import DashboardServices from "@/app/component/dashboard/services/DashboardServices";
import DashboardBlogs from "@/app/component/dashboard/blogs/DashboardBlogs";
import DashboardProjects from "@/app/component/dashboard/projects/DashboardProjects";
import DashboardTeam from "@/app/component/dashboard/team/DashboardTeam";
import DashboardJobs from "@/app/component/dashboard/jobs/DashboardJobs";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import { DashboardThemeProvider, useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";

function DashboardInner() {
  const router = useRouter();
  const { isDark } = useDashboardTheme();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Dashboard navigation state
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [activeSubTab, setActiveSubTab] = useState<string>("all-leads");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // Check authentication on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("venom_admin_logged_in") === "true";
      if (!loggedIn) {
        setIsAuthenticated(false);
        router.replace("/login");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  const handleSelectTab = (tabId: string, subTabId?: string) => {
    setActiveTab(tabId);
    if (subTabId) {
      setActiveSubTab(subTabId);
    }
    // Auto close mobile drawer on selection
    setIsMobileOpen(false);
  };

  // While checking auth, show luxury loading console
  if (isAuthenticated === null) {
    return (
      <div
        className={`min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-300 ${
          isDark
            ? "bg-slate-950 text-white"
            : "bg-gradient-to-br from-white via-[#F4E9FF] to-[#E5F7FF] text-slate-900"
        }`}
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C07DFF]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          <div
            className={`w-16 h-16 rounded-2xl border flex items-center justify-center relative shadow-lg ${
              isDark ? "bg-white/5 border-white/10" : "bg-white border-[#E8E2F2]"
            }`}
          >
            <AsteriskIcon className="w-8 h-8 text-[#3BC8F6] animate-spin" color="#3BC8F6" strokeWidth={2.5} />
            <div className="absolute inset-0 rounded-2xl border border-[#C07DFF]/40 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h3
              className={`font-[family-name:var(--font-oswald)] uppercase font-bold text-lg tracking-wider ${
                isDark ? "text-white" : "text-[#111111]"
              }`}
            >
              Verifying Security Credentials
            </h3>
            <p className={`font-sans text-xs ${isDark ? "text-stone-400" : "text-stone-600"}`}>
              Connecting to Venom Tech administrative gateway...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If rejected, router will replace, show redirecting state
  if (!isAuthenticated) {
    return (
      <div
        className={`min-h-screen w-full flex flex-col items-center justify-center p-6 text-center ${
          isDark ? "bg-slate-950 text-stone-300" : "bg-stone-50 text-stone-700"
        }`}
      >
        <p className="text-sm">Unauthorized access. Redirecting to security login...</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex selection:bg-[#C07DFF] selection:text-white relative transition-colors duration-300 font-sans ${
        isDark
          ? "bg-slate-950 text-white"
          : "bg-gradient-to-br from-white via-[#F4E9FF]/35 to-[#E5F7FF]/40 text-slate-900"
      }`}
    >
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className={`absolute top-0 right-1/4 w-[600px] h-[400px] rounded-full blur-[140px] ${
            isDark ? "bg-[#3BC8F6]/10" : "bg-[#3BC8F6]/15"
          }`}
        />
        <div
          className={`absolute bottom-10 left-1/3 w-[500px] h-[500px] rounded-full blur-[160px] ${
            isDark ? "bg-[#C07DFF]/10" : "bg-[#C07DFF]/15"
          }`}
        />
        <div
          className={`absolute inset-0 [background-size:32px_32px] ${
            isDark
              ? "bg-[radial-gradient(#38BDF8_1px,transparent_1px)] opacity-10"
              : "bg-[radial-gradient(#C07DFF_1px,transparent_1px)] opacity-[0.06]"
          }`}
        />
      </div>

      {/* Luxury Sidebar Component */}
      <DashboardSidebar
        activeTab={activeTab}
        activeSubTab={activeSubTab}
        onSelectTab={handleSelectTab}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen relative z-10">
        {/* Dashboard Sticky Header */}
        <DashboardHeader
          activeTab={activeTab}
          activeSubTab={activeSubTab}
          onOpenMobileSidebar={() => setIsMobileOpen(true)}
        />

        {/* Dynamic Screen View Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
          {activeTab === "overview" && (
            <DashboardOverview onNavigateTab={handleSelectTab} />
          )}

          {activeTab === "leads" && <DashboardLeads />}

          {activeTab === "services" && <DashboardServices />}

          {activeTab === "blogs" && (
            <DashboardBlogs
              subTab={activeSubTab}
              onSelectSubTab={(sub) => handleSelectTab("blogs", sub)}
            />
          )}

          {activeTab === "projects" && (
            <DashboardProjects
              subTab={activeSubTab}
              onSelectSubTab={(sub) => handleSelectTab("projects", sub)}
            />
          )}

          {activeTab === "team" && (
            <DashboardTeam
              subTab={activeSubTab}
              onSelectSubTab={(sub) => handleSelectTab("team", sub)}
            />
          )}

          {activeTab === "jobs" && (
            <DashboardJobs
              subTab={activeSubTab}
              onSelectSubTab={(sub) => handleSelectTab("jobs", sub)}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default function DashboardMain() {
  return (
    <DashboardThemeProvider>
      <DashboardInner />
    </DashboardThemeProvider>
  );
}
