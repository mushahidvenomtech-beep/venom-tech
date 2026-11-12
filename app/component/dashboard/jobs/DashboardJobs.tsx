"use client";

import React, { useState, useEffect } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";
import { Job } from "@/lib/jobs/types";
import JobForm from "./JobForm";
import JobsList from "./JobsList";
import CandidatesList from "./CandidatesList";

interface DashboardJobsProps {
  subTab?: string;
  onSelectSubTab?: (subTab: string) => void;
}

export default function DashboardJobs({
  subTab = "all-jobs",
  onSelectSubTab,
}: DashboardJobsProps) {
  const { isDark } = useDashboardTheme();

  const [activeSub, setActiveSub] = useState<string>(subTab);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [candidateJobFilter, setCandidateJobFilter] = useState<string>("all");

  useEffect(() => {
    setActiveSub(subTab);
    if (subTab !== "add-job") {
      setEditingJob(null);
    }
  }, [subTab]);

  const switchSubTab = (next: string) => {
    setActiveSub(next);
    if (next !== "add-job") {
      setEditingJob(null);
    }
    if (next === "candidates-list") {
      setCandidateJobFilter("all");
    }
    if (onSelectSubTab) onSelectSubTab(next);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setActiveSub("add-job");
    if (onSelectSubTab) onSelectSubTab("add-job");
  };

  const handleViewCandidatesForJob = (jobId: string) => {
    setCandidateJobFilter(jobId);
    setActiveSub("candidates-list");
    if (onSelectSubTab) onSelectSubTab("candidates-list");
  };

  const handleFormSuccess = () => {
    setEditingJob(null);
    setActiveSub("all-jobs");
    if (onSelectSubTab) onSelectSubTab("all-jobs");
  };

  const tabClass = (isActive: boolean) =>
    `px-4 sm:px-5 py-2.5 rounded-xl font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
      isActive
        ? "bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white shadow-md"
        : isDark
        ? "text-stone-400 hover:text-white"
        : "text-stone-600 hover:text-black"
    }`;

  return (
    <div className="space-y-6">
      {/* Top Banner + 3 Sub-tabs */}
      <div
        className={`p-6 sm:p-8 rounded-2xl border shadow-sm relative overflow-hidden transition-all ${
          isDark
            ? "bg-slate-900/90 border-white/10 text-white"
            : "bg-white border-[#E8E2F2] text-stone-900"
        }`}
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#3BC8F6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-[#3BC8F6]/10 border border-[#3BC8F6]/25">
              <AsteriskIcon className="w-3.5 h-3.5 text-[#3BC8F6]" color="#3BC8F6" strokeWidth={3} />
              <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider text-[#3BC8F6] font-semibold">
                Careers &amp; Talent Acquisition
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-4xl tracking-tight leading-none">
              Jobs &amp; <span className="text-brand-gradient">Candidates Pipeline</span>
            </h2>
            <p className={`font-sans text-xs sm:text-sm max-w-xl mt-2 ${isDark ? "text-stone-400" : "text-stone-600"}`}>
              Publish dynamic job openings, customize application screening forms, and triage new, unattended, and attended candidates.
            </p>
          </div>

          {/* 3 Sub-tabs matching Sidebar */}
          <div
            className={`flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border self-start xl:self-auto ${
              isDark ? "border-white/10 bg-white/5" : "border-stone-200 bg-stone-100/80"
            }`}
          >
            <button
              type="button"
              onClick={() => {
                setEditingJob(null);
                switchSubTab("add-job");
              }}
              className={tabClass(activeSub === "add-job")}
            >
              <AsteriskIcon className="w-3.5 h-3.5" color="currentColor" strokeWidth={3} />
              <span>{editingJob ? "Edit Job" : "Add Job"}</span>
            </button>

            <button
              type="button"
              onClick={() => switchSubTab("all-jobs")}
              className={tabClass(activeSub === "all-jobs")}
            >
              <span>All Jobs</span>
            </button>

            <button
              type="button"
              onClick={() => switchSubTab("candidates-list")}
              className={tabClass(activeSub === "candidates-list")}
            >
              <span>Candidates List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-tab View Switcher */}
      {activeSub === "add-job" ? (
        <JobForm
          initialJob={editingJob}
          onSuccess={handleFormSuccess}
          onCancel={() => switchSubTab("all-jobs")}
        />
      ) : activeSub === "candidates-list" ? (
        <CandidatesList initialJobIdFilter={candidateJobFilter} />
      ) : (
        <JobsList
          onAddNew={() => {
            setEditingJob(null);
            switchSubTab("add-job");
          }}
          onEdit={handleEditJob}
          onViewCandidatesForJob={handleViewCandidatesForJob}
        />
      )}
    </div>
  );
}
