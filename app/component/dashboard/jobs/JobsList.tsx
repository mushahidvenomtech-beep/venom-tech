"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import SwipeToast from "@/app/component/global/ui/SwipeToast";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";
import { Job, JobStatus, JOB_STATUSES, formatIsoDateUTC } from "@/lib/jobs/types";

interface JobsListProps {
  onAddNew: () => void;
  onEdit: (job: Job) => void;
  onViewCandidatesForJob: (jobId: string) => void;
}

export default function JobsList({
  onAddNew,
  onEdit,
  onViewCandidatesForJob,
}: JobsListProps) {
  const { isDark } = useDashboardTheme();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; title: string; desc: string; isError?: boolean }>({
    open: false,
    title: "",
    desc: "",
  });

  const showToast = (title: string, desc: string, isError = false) => {
    setToast({ open: true, title, desc, isError });
  };

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/jobs?includeCounts=true", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        }
      }
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleStatusChange = async (job: Job, nextStatus: JobStatus) => {
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update status");
      }
      setJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, status: nextStatus } : j)));
      showToast("Status Updated", `"${job.title}" marked as ${nextStatus}.`);
    } catch (err: any) {
      showToast("Update Failed", err.message || "Could not change status", true);
    }
  };

  const handleToggleFeatured = async (job: Job) => {
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !job.isFeatured }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setJobs((prev) =>
          prev.map((j) => (j.id === job.id ? { ...j, isFeatured: !j.isFeatured } : j))
        );
        showToast(
          !job.isFeatured ? "Priority Highlight On" : "Priority Highlight Off",
          `"${job.title}" updated.`
        );
      }
    } catch {
      showToast("Error", "Could not toggle featured flag.", true);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/jobs/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete job");
      }
      setJobs((prev) => prev.filter((j) => j.id !== deleteTarget.id));
      showToast("Job Removed", `"${deleteTarget.title}" was deleted.`);
    } catch (err: any) {
      showToast("Delete Failed", err.message || "Error deleting job", true);
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (statusFilter !== "All" && job.status !== statusFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(q) ||
      job.department.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q) ||
      job.workMode.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {toast.open && (
        <SwipeToast
          open={toast.open}
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          title={toast.title}
          description={toast.desc}
          background={toast.isError ? "#7f1d1d" : "#18181b"}
          fuseColor={toast.isError ? "#f87171" : "#3BC8F6"}
        />
      )}

      {/* Search & Status Filters Bar */}
      <div
        className={`p-4 rounded-2xl border flex flex-col lg:flex-row items-center justify-between gap-4 text-xs transition-colors ${
          isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {["All", ...JOB_STATUSES].map((st) => {
            const count =
              st === "All" ? jobs.length : jobs.filter((j) => j.status === st).length;
            const active = statusFilter === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl font-mono text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
                  active
                    ? "bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-bold shadow-sm"
                    : isDark
                    ? "bg-white/5 text-stone-400 hover:text-white hover:bg-white/10"
                    : "bg-stone-100 text-stone-600 hover:text-slate-900 hover:bg-stone-200"
                }`}
              >
                <span>{st}</span>
                <span
                  className={`text-[9px] px-1.5 rounded-full ${
                    active ? "bg-black/30 text-white" : isDark ? "bg-white/10" : "bg-stone-200"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <input
              type="text"
              placeholder="Search role, department, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#3BC8F6] ${
                isDark
                  ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                  : "bg-white border-[#E8E2F2] text-slate-900 placeholder-stone-400"
              }`}
            />
            <svg
              className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
            </svg>
          </div>

          <button
            type="button"
            onClick={fetchJobs}
            className={`px-3 py-2 rounded-xl border text-xs font-mono uppercase cursor-pointer ${
              isDark
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-stone-300"
                : "bg-white hover:bg-stone-50 border-stone-200 text-stone-700"
            }`}
          >
            ↻ Refresh
          </button>

          <Link
            href="/screens/careers"
            target="_blank"
            className={`px-3.5 py-2 rounded-xl border text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-bold ${
              isDark
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-[#3BC8F6]"
                : "bg-stone-50 hover:bg-stone-100 border-[#E8E2F2] text-[#0284C7]"
            }`}
          >
            Live Careers &nearr;
          </Link>
        </div>
      </div>

      {/* Table / Empty State */}
      <div
        className={`rounded-2xl border overflow-hidden transition-colors ${
          isDark ? "bg-white/[0.03] border-white/10 shadow-xl" : "bg-white border-[#E8E2F2] shadow-sm"
        }`}
      >
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <AsteriskIcon className="w-7 h-7 text-[#3BC8F6] animate-spin" color="#3BC8F6" strokeWidth={3} />
            <p className="text-xs font-mono text-stone-400 uppercase tracking-widest">
              Loading job postings...
            </p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="py-16 px-4 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#C07DFF]/10 flex items-center justify-center">
              <AsteriskIcon className="w-6 h-6 text-[#C07DFF]" color="#C07DFF" strokeWidth={2.5} />
            </div>
            <div>
              <h3
                className={`font-[family-name:var(--font-oswald)] uppercase font-bold text-xl ${
                  isDark ? "text-white" : "text-stone-900"
                }`}
              >
                {jobs.length === 0 ? "No Jobs Posted Yet" : "No Matching Jobs Found"}
              </h3>
              <p className="font-sans text-xs text-stone-500 max-w-md mx-auto mt-1">
                {jobs.length === 0
                  ? "Publish your first open position to activate the Careers Portal and start collecting candidate applications."
                  : "Adjust your search or status filter to view other roles."}
              </p>
            </div>
            <button
              type="button"
              onClick={onAddNew}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider shadow-md cursor-pointer"
            >
              + Add New Job Opening
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs">
              <thead>
                <tr
                  className={`border-b uppercase tracking-wider font-semibold font-[family-name:var(--font-oswald)] text-[11px] ${
                    isDark
                      ? "border-white/10 bg-white/[0.02] text-stone-400"
                      : "border-[#E8E2F2] bg-stone-50/70 text-stone-600"
                  }`}
                >
                  <th className="py-3.5 pl-6">Role &amp; Department</th>
                  <th className="py-3.5">Work Arrangement</th>
                  <th className="py-3.5">Status</th>
                  <th className="py-3.5">Applicants</th>
                  <th className="py-3.5">Posted</th>
                  <th className="py-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-white/5" : "divide-stone-100"}`}>
                {filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className={`transition-colors group ${
                      isDark ? "hover:bg-white/[0.02]" : "hover:bg-purple-50/30"
                    }`}
                  >
                    <td className="py-4 pl-6">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(job)}
                          title={job.isFeatured ? "Priority Hiring" : "Mark as Priority"}
                          className={`text-sm cursor-pointer transition-transform hover:scale-125 ${
                            job.isFeatured ? "text-amber-400" : "text-stone-400/50"
                          }`}
                        >
                          ★
                        </button>
                        <div>
                          <div
                            className={`font-bold text-sm ${
                              isDark
                                ? "text-white group-hover:text-[#3BC8F6]"
                                : "text-slate-900 group-hover:text-[#8B5CF6]"
                            }`}
                          >
                            {job.title}
                          </div>
                          <div className="text-[11px] text-stone-400 flex items-center gap-2 mt-0.5">
                            <span className="text-[#C07DFF] font-mono font-semibold">
                              {job.department}
                            </span>
                            <span>&bull;</span>
                            <span>{job.salaryRange || "Competitive"}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="flex flex-wrap gap-1.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                            isDark
                              ? "bg-white/5 border-white/10 text-stone-300"
                              : "bg-stone-100 border-stone-200 text-stone-700"
                          }`}
                        >
                          {job.employmentType}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                            isDark
                              ? "bg-[#3BC8F6]/10 border-[#3BC8F6]/30 text-[#3BC8F6]"
                              : "bg-cyan-50 border-cyan-200 text-[#0284C7]"
                          }`}
                        >
                          {job.workMode}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-400 mt-1">{job.location}</div>
                    </td>

                    <td className="py-4">
                      <select
                        value={job.status}
                        onChange={(e) => handleStatusChange(job, e.target.value as JobStatus)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border focus:outline-none cursor-pointer ${
                          job.status === "Open"
                            ? isDark
                              ? "bg-emerald-950/50 border-emerald-500/40 text-emerald-300"
                              : "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : job.status === "Paused"
                            ? isDark
                              ? "bg-amber-950/40 border-amber-500/40 text-amber-300"
                              : "bg-amber-50 border-amber-200 text-amber-700"
                            : isDark
                            ? "bg-white/5 border-white/10 text-stone-400"
                            : "bg-stone-100 border-stone-200 text-stone-600"
                        }`}
                      >
                        {JOB_STATUSES.map((st) => (
                          <option
                            key={st}
                            value={st}
                            className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}
                          >
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-4">
                      <button
                        type="button"
                        onClick={() => onViewCandidatesForJob(job.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border font-mono text-[11px] font-bold cursor-pointer transition-all ${
                          (job.applicantsCount || 0) > 0
                            ? "bg-[#C07DFF]/15 border-[#C07DFF]/40 text-[#C07DFF] hover:bg-[#C07DFF]/25"
                            : isDark
                            ? "bg-white/5 border-white/10 text-stone-400"
                            : "bg-stone-50 border-stone-200 text-stone-500"
                        }`}
                      >
                        <span>{job.applicantsCount ?? 0}</span>
                        <span>Applied &rarr;</span>
                      </button>
                    </td>

                    <td className="py-4 font-mono text-[11px] text-stone-400">
                      {formatIsoDateUTC(job.createdAt)}
                    </td>

                    <td className="py-4 pr-6 text-right space-x-2 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onEdit(job)}
                        className={`px-3 py-1.5 rounded-lg border font-[family-name:var(--font-oswald)] uppercase text-[11px] font-bold tracking-wider transition-all cursor-pointer ${
                          isDark
                            ? "bg-white/5 hover:bg-white/15 border-white/15 text-white"
                            : "bg-[#F4E9FF] hover:bg-[#C07DFF] text-[#8B5CF6] hover:text-white border-[#C07DFF]/30"
                        }`}
                      >
                        Edit Job
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteTarget(job)}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          isDark
                            ? "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                            : "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                        }`}
                        title="Delete Job"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div
            className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${
              isDark ? "bg-slate-900 border-white/10 text-white" : "bg-white border-[#E8E2F2] text-slate-900"
            }`}
          >
            <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-lg text-red-400">
              Delete Job Posting?
            </h3>
            <p className="text-xs text-stone-400">
              Are you sure you want to delete{" "}
              <strong className={isDark ? "text-white" : "text-black"}>
                &quot;{deleteTarget.title}&quot;
              </strong>
              ? Existing candidate applications will remain in the Candidates List under this job title.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-mono uppercase border cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl text-xs font-[family-name:var(--font-oswald)] uppercase font-bold bg-red-600 hover:bg-red-700 text-white cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

