"use client";

import React, { useState, useEffect } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import TeamMembersList from "./TeamMembersList";
import TeamMemberForm from "./TeamMemberForm";
import { TeamMember } from "@/lib/team/types";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";

interface DashboardTeamProps {
  subTab?: string;
  onSelectSubTab?: (subTab: string) => void;
}

export default function DashboardTeam({
  subTab = "all-members",
  onSelectSubTab,
}: DashboardTeamProps) {
  const { isDark } = useDashboardTheme();

  const [activeTab, setActiveTab] = useState<string>(subTab);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    setActiveTab(subTab);
    if (subTab === "all-members") {
      setEditingMember(null);
    }
  }, [subTab]);

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
    if (tab === "all-members") {
      setEditingMember(null);
    }
    if (onSelectSubTab) {
      onSelectSubTab(tab);
    }
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setActiveTab("add-member");
    if (onSelectSubTab) {
      onSelectSubTab("add-member");
    }
  };

  const handleFormSuccess = () => {
    setEditingMember(null);
    handleTabSwitch("all-members");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Tab Controls */}
      <div
        className={`p-6 sm:p-8 rounded-2xl border shadow-sm relative overflow-hidden transition-all ${
          isDark
            ? "bg-slate-900/90 border-white/10 text-white"
            : "bg-white border-stone-200 text-stone-900"
        }`}
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C07DFF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-[#C07DFF]/10 border border-[#C07DFF]/20">
              <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
              <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider text-[#C07DFF] font-semibold">
                Senior Collective Management
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-4xl tracking-tight leading-none">
              Team &amp; <span className="text-[#C07DFF]">Staff Members</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-500 max-w-xl mt-2">
              Manage executive partners, studio leads, and team specialists. Add real portrait photos, edit credentials, and synchronize dynamically with the homepage.
            </p>
          </div>

          {/* 2 Tabs: Team Members & Add Team */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl border border-stone-200 dark:border-white/10 bg-stone-100/80 dark:bg-white/5 self-start md:self-auto">
            <button
              type="button"
              onClick={() => handleTabSwitch("all-members")}
              className={`px-5 py-2.5 rounded-xl font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "all-members"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-md scale-[1.02]"
                  : "text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Team Members</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabSwitch("add-member")}
              className={`px-5 py-2.5 rounded-xl font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "add-member"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-md scale-[1.02]"
                  : "text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white"
              }`}
            >
              <AsteriskIcon className="w-3.5 h-3.5" color="currentColor" strokeWidth={3} />
              <span>{editingMember ? "Edit Member" : "Add Team Member"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content View Switcher */}
      {activeTab === "all-members" ? (
        <TeamMembersList
          onAddNew={() => handleTabSwitch("add-member")}
          onEdit={handleEditMember}
        />
      ) : (
        <TeamMemberForm
          initialMember={editingMember}
          onSuccess={handleFormSuccess}
          onCancel={() => handleTabSwitch("all-members")}
        />
      )}
    </div>
  );
}
