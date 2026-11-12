"use client";

import React, { useState, useEffect, useCallback } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import SwipeToast from "@/app/component/global/ui/SwipeToast";
import JobApplyModal from "./JobApplyModal";
import { Job, formatIsoDateUTC } from "@/lib/jobs/types";

export default function CareersJobPortal() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedWorkMode, setSelectedWorkMode] = useState("All");
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  // Modal state: when applyModalOpen === true & activeJob === null -> General Resume Application
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [activeJob, setActiveJob] = useState<Job | null>(null);

  const [toast, setToast] = useState<{ open: boolean; title: string; desc: string }>({
    open: false,
    title: "",
    desc: "",
  });

  const fetchOpenJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/jobs?status=Open", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        }
      }
    } catch (err) {
      console.error("Failed loading career openings:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOpenJobs();
  }, [fetchOpenJobs]);

  const departments = [
    "All",
    ...Array.from(new Set(jobs.map((j) => j.department).filter(Boolean))),
  ];
  const workModes = ["All", "Hybrid", "Remote", "On-Site"];

  const filteredJobs = jobs.filter((job) => {
    if (selectedDepartment !== "All" && job.department !== selectedDepartment) return false;
    if (selectedWorkMode !== "All" && job.workMode !== selectedWorkMode) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        job.title.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.summary.toLowerCase().includes(q) ||
        job.requirements.some((r) => r.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const openApplyForJob = (job: Job | null) => {
    setActiveJob(job);
    setApplyModalOpen(true);
  };

  return (
    <section
      id="job-portal"
      className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto"
    >
      {toast.open && (
        <SwipeToast
          open={toast.open}
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          title={toast.title}
          description={toast.desc}
          background="#18181b"
          fuseColor="#3BC8F6"
        />
      )}

      {/* Outer Glow Wrapper */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        {/* Ambient Corner Flare */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C07DFF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3BC8F6]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Bronze / Metallic Dark Gradient Card Container */}
        <div className="relative bg-gradient-to-br from-[#2D1B0E] via-[#3D2513] to-[#1C1108] border-2 border-[#8A5A2B]/40 rounded-3xl p-6 sm:p-12 lg:p-16 text-white">
          {/* Header Block */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 bg-black/40 backdrop-blur-md border border-[#C6865B]/30 rounded-full">
              <AsteriskIcon className="w-3.5 h-3.5 text-[#E8B291]" color="#E8B291" strokeWidth={3} />
              <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#E8B291] font-semibold">
                {jobs.length > 0
                  ? `${jobs.length} Live Hiring ${jobs.length === 1 ? "Opportunity" : "Opportunities"}`
                  : "Live Hiring Opportunities"}
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-4">
              Job Available Portal
            </h2>

            <p className="font-sans text-stone-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Work with top-tier talent, solve real-world problems, and build digital products that matter.
            </p>
          </div>

          {/* Dynamic Job Board */}
          {isLoading ? (
            <div className="max-w-xl mx-auto p-10 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-center space-y-3 mb-8">
              <AsteriskIcon
                className="w-8 h-8 text-[#3BC8F6] animate-spin mx-auto"
                color="#3BC8F6"
                strokeWidth={3}
              />
              <p className="font-mono text-xs uppercase tracking-widest text-stone-300">
                Loading open positions...
              </p>
            </div>
          ) : jobs.length === 0 ? (
            /* Signature Empty State Notice Box */
            <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-inner mb-8 text-center">
              <div className="w-12 h-12 rounded-full bg-white/10 mx-auto flex items-center justify-center mb-3 text-stone-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </div>
              <p className="font-[family-name:var(--font-oswald)] uppercase tracking-wider text-base sm:text-lg font-bold text-stone-200">
                No openings available at the moment.
              </p>
              <p className="font-sans text-xs sm:text-sm text-stone-400 mt-2 leading-relaxed">
                We update our job board regularly as new product cycles and client flagships expand.
              </p>
            </div>
          ) : (
            <div className="space-y-8 mb-12">
              {/* Filter Bar */}
              <div className="p-4 rounded-2xl bg-black/35 backdrop-blur-md border border-white/10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {departments.map((dept) => {
                    const active = selectedDepartment === dept;
                    return (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => setSelectedDepartment(dept)}
                        className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                          active
                            ? "bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-bold shadow-md"
                            : "bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10"
                        }`}
                      >
                        {dept}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <select
                    value={selectedWorkMode}
                    onChange={(e) => setSelectedWorkMode(e.target.value)}
                    className="px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-[#3BC8F6] cursor-pointer"
                  >
                    {workModes.map((mode) => (
                      <option key={mode} value={mode} className="bg-slate-900">
                        {mode === "All" ? "All Work Modes" : mode}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search roles or skills..."
                    className="px-4 py-2 rounded-xl bg-black/50 border border-white/15 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#3BC8F6] sm:w-56"
                  />
                </div>
              </div>

              {/* Filtered Openings Grid */}
              {filteredJobs.length === 0 ? (
                <div className="p-8 rounded-2xl bg-black/35 border border-white/10 text-center space-y-2">
                  <p className="font-[family-name:var(--font-oswald)] uppercase text-lg font-bold">
                    No Roles Match Your Filters
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDepartment("All");
                      setSelectedWorkMode("All");
                      setSearchQuery("");
                    }}
                    className="text-xs font-mono text-[#3BC8F6] underline cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
                  {filteredJobs.map((job) => {
                    const isExpanded = expandedJobId === job.id;
                    return (
                      <article
                        key={job.id}
                        className="rounded-2xl bg-black/45 backdrop-blur-md border border-[#C6865B]/30 hover:border-[#3BC8F6]/60 p-6 sm:p-7 flex flex-col justify-between gap-5 transition-all duration-300 shadow-lg"
                      >
                        <div className="space-y-4">
                          {/* Top Meta Badges */}
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2.5 py-1 rounded-full bg-[#C07DFF]/20 border border-[#C07DFF]/40 text-[#E8B291] text-[10px] font-mono uppercase font-bold">
                                {job.department}
                              </span>
                              <span className="px-2.5 py-1 rounded-full bg-[#3BC8F6]/15 border border-[#3BC8F6]/30 text-[#3BC8F6] text-[10px] font-mono uppercase font-bold">
                                {job.workMode}
                              </span>
                            </div>
                            {job.isFeatured && (
                              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-mono uppercase font-bold">
                                ★ Priority Role
                              </span>
                            )}
                          </div>

                          {/* Title & Summary */}
                          <div>
                            <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl sm:text-3xl text-white tracking-tight">
                              {job.title}
                            </h3>
                            {job.summary && (
                              <p className="text-xs sm:text-sm text-stone-300 mt-1.5 leading-relaxed">
                                {job.summary}
                              </p>
                            )}
                          </div>

                          {/* Chips Row */}
                          <div className="flex flex-wrap gap-2 text-[11px] font-mono text-stone-200">
                            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                              {job.employmentType}
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                              {job.location}
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                              Exp: {job.experienceLevel}
                            </span>
                            {job.salaryRange && (
                              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[#3BC8F6]">
                                {job.salaryRange}
                              </span>
                            )}
                          </div>

                          {/* Preview Requirements */}
                          {job.requirements.length > 0 && !isExpanded && (
                            <ul className="space-y-1 text-xs text-stone-300 pt-1">
                              {job.requirements.slice(0, 3).map((req, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-[#C07DFF]">&bull;</span>
                                  <span>{req}</span>
                                </li>
                              ))}
                              {job.requirements.length > 3 && (
                                <li className="text-[11px] font-mono text-[#E8B291]">
                                  + {job.requirements.length - 3} more requirements...
                                </li>
                              )}
                            </ul>
                          )}

                          {/* Expanded Full Job Details */}
                          {isExpanded && (
                            <div className="pt-3 border-t border-white/10 space-y-4 text-xs text-stone-300">
                              {job.description && (
                                <div>
                                  <span className="font-mono uppercase text-[10px] text-[#3BC8F6] block mb-1">
                                    About This Role
                                  </span>
                                  <p className="whitespace-pre-wrap leading-relaxed">
                                    {job.description}
                                  </p>
                                </div>
                              )}
                              {job.requirements.length > 0 && (
                                <div>
                                  <span className="font-mono uppercase text-[10px] text-[#C07DFF] block mb-1">
                                    Requirements
                                  </span>
                                  <ul className="space-y-1">
                                    {job.requirements.map((req, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <span className="text-[#C07DFF]">&bull;</span>
                                        <span>{req}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {job.benefits.length > 0 && (
                                <div>
                                  <span className="font-mono uppercase text-[10px] text-emerald-400 block mb-1">
                                    Perks &amp; Benefits
                                  </span>
                                  <ul className="space-y-1">
                                    {job.benefits.map((b, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <span className="text-emerald-400">✓</span>
                                        <span>{b}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Card Footer Actions */}
                        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {(job.description || job.requirements.length > 3 || job.benefits.length > 0) && (
                              <button
                                type="button"
                                onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                                className="text-xs font-mono text-stone-300 hover:text-[#3BC8F6] underline cursor-pointer"
                              >
                                {isExpanded ? "Show Less ▲" : "View Full Details ▼"}
                              </button>
                            )}
                            {job.applicationDeadline && (
                              <span className="text-[11px] font-mono text-stone-400">
                                Due {formatIsoDateUTC(job.applicationDeadline)}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => openApplyForJob(job)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C07DFF] via-[#7F8BFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase font-bold text-xs tracking-wider shadow-lg shadow-[#3BC8F6]/20 hover:opacity-95 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                          >
                            <span>Apply Now</span>
                            <span>&rarr;</span>
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Proactive Application Callout */}
          <div className="max-w-md mx-auto pt-2 text-center">
            <p className="font-sans text-xs sm:text-sm text-stone-300 mb-5">
              Think you&apos;d be a great fit anyway? We&apos;d love to hear from you. Send your resume and portfolio directly to our hiring team.
            </p>

            <button
              type="button"
              onClick={() => openApplyForJob(null)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#C07DFF] via-[#7F8BFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase font-bold text-sm tracking-wider shadow-lg shadow-[#3BC8F6]/20 hover:opacity-95 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Send Your Resume</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Application Modal */}
      <JobApplyModal
        job={activeJob}
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        onSubmitted={(jobTitle, candidateName) => {
          setToast({
            open: true,
            title: "Application Received",
            desc: `${candidateName} applied for ${jobTitle}`,
          });
        }}
      />
    </section>
  );
}
