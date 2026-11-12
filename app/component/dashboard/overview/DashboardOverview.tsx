"use client";

import React, { useState, useEffect, useCallback } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";
import { Lead } from "@/lib/leads/types";

interface DashboardOverviewProps {
  onNavigateTab: (tabId: string, subTabId?: string) => void;
}

function formatRelativeTime(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Recently";
    const diff = Math.max(0, (Date.now() - date.getTime()) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "Recently";
  }
}

export default function DashboardOverview({ onNavigateTab }: DashboardOverviewProps) {
  const { isDark } = useDashboardTheme();

  // Dynamic Data State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projectsCount, setProjectsCount] = useState<number>(0);
  const [postsCount, setPostsCount] = useState<number>(0);
  const [teamCount, setTeamCount] = useState<number>(0);
  const [jobsCount, setJobsCount] = useState<number>(0);
  const [candidatesCount, setCandidatesCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [leadsRes, projectsRes, postsRes, teamRes, jobsRes, candsRes] = await Promise.allSettled([
        fetch("/api/leads", { cache: "no-store" }),
        fetch("/api/projects", { cache: "no-store" }),
        fetch("/api/blog/posts", { cache: "no-store" }),
        fetch("/api/team/members", { cache: "no-store" }),
        fetch("/api/jobs?status=Open", { cache: "no-store" }),
        fetch("/api/jobs/candidates", { cache: "no-store" }),
      ]);

      if (leadsRes.status === "fulfilled" && leadsRes.value.ok) {
        const data = await leadsRes.value.json();
        if (data.success && Array.isArray(data.leads)) {
          setLeads(data.leads);
        }
      }

      if (projectsRes.status === "fulfilled" && projectsRes.value.ok) {
        const data = await projectsRes.value.json();
        if (data.success && Array.isArray(data.projects)) {
          setProjectsCount(data.projects.length);
        }
      }

      if (postsRes.status === "fulfilled" && postsRes.value.ok) {
        const data = await postsRes.value.json();
        if (data.success && (Array.isArray(data.posts) || typeof data.total === "number")) {
          setPostsCount(data.total || (Array.isArray(data.posts) ? data.posts.length : 0));
        }
      }

      if (teamRes.status === "fulfilled" && teamRes.value.ok) {
        const data = await teamRes.value.json();
        if (data.success && Array.isArray(data.members)) {
          setTeamCount(data.members.length);
        }
      }

      if (jobsRes.status === "fulfilled" && jobsRes.value.ok) {
        const data = await jobsRes.value.json();
        if (data.success && Array.isArray(data.jobs)) {
          setJobsCount(data.jobs.length);
        }
      }

      if (candsRes.status === "fulfilled" && candsRes.value.ok) {
        const data = await candsRes.value.json();
        if (data.success && data.counts) {
          setCandidatesCount(data.counts.unattendedCount ?? data.counts.total ?? 0);
        }
      }
    } catch (err) {
      console.error("Failed fetching live dashboard telemetry:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Derived Dynamic Metrics
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === "New").length;
  const activeConsultationsCount = leads.filter(
    (l) => l.status === "Contacted" || l.status === "In Review"
  ).length;
  const closedLeadsCount = leads.filter((l) => l.status === "Closed").length;
  const responseRate =
    totalLeads > 0
      ? `${Math.round(((totalLeads - newLeadsCount) / totalLeads) * 100)}%`
      : "100%";

  // 4 Dynamic Stat Cards
  const stats = [
    {
      title: "Total Inbound Leads",
      value: isLoading ? "..." : String(totalLeads),
      change: newLeadsCount > 0 ? `${newLeadsCount} New` : "0 Pending",
      period: "in database",
      icon: (
        <svg className="w-5 h-5 text-[#3BC8F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      badgeColor: "border-[#3BC8F6]/40 bg-[#3BC8F6]/10",
    },
    {
      title: "Active Consultations",
      value: isLoading ? "..." : String(activeConsultationsCount),
      change: `${activeConsultationsCount} Active`,
      period: "in review pipeline",
      icon: (
        <svg className="w-5 h-5 text-[#C07DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      badgeColor: "border-[#C07DFF]/40 bg-[#C07DFF]/10",
    },
    {
      title: "Client Project Sprints",
      value: isLoading ? "..." : String(projectsCount),
      change: `${projectsCount} Live`,
      period: "active deliverables",
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      badgeColor: "border-emerald-500/40 bg-emerald-500/10",
    },
    {
      title: "Pipeline Response Rate",
      value: isLoading ? "..." : responseRate,
      change: `${closedLeadsCount} Closed`,
      period: "workflow efficiency",
      icon: (
        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      badgeColor: "border-amber-500/40 bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Dynamic Welcome Banner */}
      <div
        className={`relative rounded-3xl p-6 sm:p-8 border overflow-hidden transition-all duration-300 ${
          isDark
            ? "bg-gradient-to-r from-slate-900 via-[#181126] to-slate-900 border-white/10 shadow-2xl text-white"
            : "bg-gradient-to-r from-white via-[#F4E9FF] to-[#E5F7FF] border-[#E8E2F2] shadow-[0_10px_30px_rgba(192,125,255,0.08)] text-slate-900"
        }`}
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#3BC8F6]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#C07DFF]/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider ${
                isDark
                  ? "bg-white/5 border border-white/10 text-[#C07DFF]"
                  : "bg-white/80 border border-[#E8E2F2] text-[#8B5CF6] shadow-sm"
              }`}
            >
              <AsteriskIcon className="w-3 h-3 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
              <span>Executive Control Console</span>
            </div>
            <h2
              className={`font-[family-name:var(--font-oswald)] uppercase font-extrabold text-2xl sm:text-4xl tracking-tight ${
                isDark ? "text-white" : "text-[#111111]"
              }`}
            >
              Welcome Back, <span className="text-brand-gradient">Venom Admin</span>
            </h2>
            <p
              className={`font-sans text-xs sm:text-sm leading-relaxed ${
                isDark ? "text-stone-300" : "text-stone-600"
              }`}
            >
              {totalLeads > 0
                ? `Here is your agency's real-time operational overview. ${totalLeads} total customer ${
                    totalLeads === 1 ? "inquiry is" : "inquiries are"
                  } recorded in the database${
                    newLeadsCount > 0 ? `, with ${newLeadsCount} awaiting review.` : "."
                  }`
                : "Here is your agency's real-time operational overview. All incoming inquiries, projects, and articles are synchronized dynamically with MySQL."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab("leads", "all-leads")}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase font-bold text-xs tracking-wider shadow-lg shadow-[#3BC8F6]/20 hover:opacity-95 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>{`View All ${totalLeads} Leads`} &rarr;</span>
            </button>
            <button
              onClick={() => onNavigateTab("projects", "all-projects")}
              className={`px-5 py-3 rounded-xl border font-[family-name:var(--font-oswald)] uppercase font-bold text-xs tracking-wider transition-all cursor-pointer ${
                isDark
                  ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                  : "bg-white/90 hover:bg-white border-[#E8E2F2] text-stone-800 shadow-sm"
              }`}
            >
              <span>Projects ({projectsCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Dynamic Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 relative group overflow-hidden ${
              isDark
                ? "bg-white/[0.03] border-white/10 hover:border-white/20 text-white"
                : "bg-white border-[#E8E2F2] hover:border-[#C07DFF]/40 text-slate-900 shadow-[0_4px_20px_rgba(192,125,255,0.05)] hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`font-sans text-xs font-medium ${
                  isDark ? "text-stone-400" : "text-stone-600"
                }`}
              >
                {stat.title}
              </span>
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${stat.badgeColor}`}>
                {stat.icon}
              </div>
            </div>

            <div
              className={`font-[family-name:var(--font-oswald)] font-extrabold text-3xl sm:text-4xl tracking-tight mb-2 ${
                isDark ? "text-white" : "text-[#111111]"
              }`}
            >
              {stat.value}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-emerald-500 font-semibold">{stat.change}</span>
              <span className={`font-sans ${isDark ? "text-stone-500" : "text-stone-500"}`}>
                {stat.period}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Live Recent Leads Table & Management Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Real-Time Inbound Leads Table */}
        <div
          className={`lg:col-span-8 rounded-2xl border p-6 space-y-5 transition-colors ${
            isDark
              ? "bg-white/[0.03] border-white/10"
              : "bg-white border-[#E8E2F2] shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3
                className={`font-[family-name:var(--font-oswald)] uppercase font-bold text-lg tracking-wide ${
                  isDark ? "text-white" : "text-[#111111]"
                }`}
              >
                Recent Inbound Leads
              </h3>
              <p className={`font-sans text-xs ${isDark ? "text-stone-400" : "text-stone-600"}`}>
                Live leads captured from your public website forms and stored in database.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab("leads", "all-leads")}
              className="text-xs font-[family-name:var(--font-oswald)] uppercase text-[#3BC8F6] hover:text-[#C07DFF] font-semibold transition-colors cursor-pointer"
            >
              Open Leads Console &rarr;
            </button>
          </div>

          {/* Dynamic Table / Empty State */}
          {isLoading ? (
            <div className="py-12 text-center text-stone-400 text-xs font-mono">
              Loading live leads from database...
            </div>
          ) : leads.length === 0 ? (
            <div className="py-12 px-4 rounded-xl border border-dashed border-stone-300 dark:border-white/10 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <AsteriskIcon className="w-6 h-6 text-[#C07DFF]" color="#C07DFF" strokeWidth={2.5} />
              </div>
              <h4 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-sm tracking-wide text-stone-800 dark:text-stone-200">
                No Inbound Leads Recorded
              </h4>
              <p className="font-sans text-xs text-stone-500 dark:text-stone-400 max-w-sm">
                Inquiries submitted through your public website contact forms will appear here in real time.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr
                    className={`border-b uppercase tracking-wider font-semibold font-[family-name:var(--font-oswald)] text-[11px] ${
                      isDark
                        ? "border-white/10 text-stone-400"
                        : "border-[#E8E2F2] text-stone-600 bg-stone-50/70"
                    }`}
                  >
                    <th className="py-3 pl-3">Prospect</th>
                    <th className="py-3">Service Funnel</th>
                    <th className="py-3">Status</th>
                    <th className="py-3">Timestamp</th>
                    <th className="py-3 pr-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? "divide-white/5" : "divide-stone-100"}`}>
                  {leads.slice(0, 5).map((lead) => {
                    const statusBadgeClass =
                      lead.status === "New"
                        ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
                        : lead.status === "Contacted"
                        ? "bg-[#3BC8F6]/15 text-[#3BC8F6] border-[#3BC8F6]/30"
                        : lead.status === "In Review"
                        ? "bg-[#C07DFF]/15 text-[#C07DFF] border-[#C07DFF]/30"
                        : "bg-stone-500/15 text-stone-400 border-stone-500/30";

                    return (
                      <tr
                        key={lead.id}
                        className={`transition-colors group ${
                          isDark ? "hover:bg-white/[0.02]" : "hover:bg-purple-50/30"
                        }`}
                      >
                        <td className="py-3.5 pl-3">
                          <div
                            className={`font-semibold transition-colors ${
                              isDark
                                ? "text-white group-hover:text-[#3BC8F6]"
                                : "text-[#111111] group-hover:text-[#8B5CF6]"
                            }`}
                          >
                            {lead.name}
                          </div>
                          <div className={`text-[11px] font-mono ${isDark ? "text-stone-400" : "text-stone-500"}`}>
                            {lead.email}
                          </div>
                        </td>
                        <td className="py-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-md border font-mono text-[11px] ${
                              isDark
                                ? "bg-white/5 border-white/10 text-stone-300"
                                : "bg-stone-50 border-[#E8E2F2] text-stone-700"
                            }`}
                          >
                            {lead.services?.[0] || "General Inquiry"}
                            {lead.services?.length > 1 && ` +${lead.services.length - 1}`}
                          </span>
                        </td>
                        <td className="py-3.5">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${statusBadgeClass}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className={`py-3.5 text-[11px] font-mono ${isDark ? "text-stone-400" : "text-stone-500"}`}>
                          {formatRelativeTime(lead.createdAt)}
                        </td>
                        <td className="py-3.5 pr-3 text-right">
                          <button
                            onClick={() => onNavigateTab("leads", "all-leads")}
                            className={`px-2.5 py-1 rounded-md border transition-all text-[11px] font-medium cursor-pointer ${
                              isDark
                                ? "bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white border-white/10"
                                : "bg-white hover:bg-[#F4E9FF] text-stone-700 hover:text-[#8B5CF6] border-[#E8E2F2] shadow-sm"
                            }`}
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Quick Module Shortcuts & Live Funnels */}
        <div className="lg:col-span-4 space-y-6">
          {/* Dynamic Quick Actions Panel */}
          <div
            className={`rounded-2xl border p-6 space-y-4 transition-colors ${
              isDark
                ? "bg-white/[0.03] border-white/10"
                : "bg-white border-[#E8E2F2] shadow-sm"
            }`}
          >
            <h3
              className={`font-[family-name:var(--font-oswald)] uppercase font-bold text-base tracking-wide ${
                isDark ? "text-white" : "text-[#111111]"
              }`}
            >
              Management Modules
            </h3>
            <div className="space-y-2 font-sans">
              {[
                { label: "Leads Management", tab: "leads", sub: "all-leads", count: `${totalLeads} total` },
                { label: "Jobs & Candidates", tab: "jobs", sub: "all-jobs", count: `${jobsCount} open • ${candidatesCount} pending` },
                { label: "Portfolio Projects", tab: "projects", sub: "all-projects", count: `${projectsCount} projects` },
                { label: "Editorial Blogs", tab: "blogs", sub: "all-blogs", count: `${postsCount} articles` },
                { label: "Team Collective", tab: "team", sub: "all-members", count: `${teamCount} partners` },
              ].map((mod, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigateTab(mod.tab, mod.sub)}
                  className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all group text-left cursor-pointer ${
                    isDark
                      ? "bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-stone-200 hover:text-white"
                      : "bg-stone-50/70 hover:bg-[#F4E9FF]/40 border-[#E8E2F2] text-stone-800 hover:text-[#8B5CF6]"
                  }`}
                >
                  <span className="text-xs font-semibold">
                    {mod.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isDark ? "bg-white/5 text-stone-400" : "bg-white text-stone-600 border border-[#E8E2F2]"
                      }`}
                    >
                      {mod.count}
                    </span>
                    <span className="text-stone-400 group-hover:translate-x-1 transition-transform text-xs">
                      &rarr;
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Operational Health Card */}
          <div
            className={`rounded-2xl border p-6 space-y-3 transition-colors ${
              isDark
                ? "bg-gradient-to-br from-slate-900 to-slate-950 border-white/10 text-stone-300"
                : "bg-white border-[#E8E2F2] text-stone-700 shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span
                className={`font-[family-name:var(--font-oswald)] uppercase font-semibold tracking-wider ${
                  isDark ? "text-stone-400" : "text-stone-600"
                }`}
              >
                Cloud Telemetry
              </span>
              <span className="text-emerald-500 font-mono text-[11px] font-bold">Online</span>
            </div>
            <div className="space-y-2 text-xs font-sans">
              <div
                className={`flex justify-between py-1 border-b ${
                  isDark ? "border-white/5 text-stone-400" : "border-stone-100 text-stone-600"
                }`}
              >
                <span>Database Cluster</span>
                <span className={`font-mono font-medium ${isDark ? "text-white" : "text-[#111111]"}`}>
                  MySQL / Drizzle &bull; Active
                </span>
              </div>
              <div
                className={`flex justify-between py-1 border-b ${
                  isDark ? "border-white/5 text-stone-400" : "border-stone-100 text-stone-600"
                }`}
              >
                <span>Live Leads Synced</span>
                <span className={`font-mono font-medium ${isDark ? "text-white" : "text-[#111111]"}`}>
                  {totalLeads} Records
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className={isDark ? "text-stone-400" : "text-stone-600"}>Security Gate</span>
                <span className="font-mono text-emerald-500 font-medium">WAF Strict &bull; Zero Breaches</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
