"use client";

import React, { useState, useEffect, useCallback } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import SwipeToast from "@/app/component/global/ui/SwipeToast";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";
import {
  Job,
  JobCandidate,
  CandidateStatus,
  CandidateFilterBucket,
  CANDIDATE_STATUSES,
  formatIsoDateUTC,
} from "@/lib/jobs/types";

interface CandidatesListProps {
  initialJobIdFilter?: string;
}

export default function CandidatesList({
  initialJobIdFilter = "all",
}: CandidatesListProps) {
  const { isDark } = useDashboardTheme();

  const [candidates, setCandidates] = useState<JobCandidate[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [counts, setCounts] = useState({
    total: 0,
    newCount: 0,
    unattendedCount: 0,
    attendedCount: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [bucketFilter, setBucketFilter] = useState<CandidateFilterBucket>("all");
  const [stageFilter, setStageFilter] = useState<string>("All");
  const [jobIdFilter, setJobIdFilter] = useState<string>(initialJobIdFilter);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCandidate, setSelectedCandidate] = useState<JobCandidate | null>(null);
  const [notesDraft, setNotesDraft] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<JobCandidate | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Add / Edit Candidate CRUD Modal state
  const [candFormOpen, setCandFormOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<JobCandidate | null>(null);
  const [cfJobId, setCfJobId] = useState("general");
  const [cfName, setCfName] = useState("");
  const [cfEmail, setCfEmail] = useState("");
  const [cfPhone, setCfPhone] = useState("");
  const [cfLocation, setCfLocation] = useState("");
  const [cfExperience, setCfExperience] = useState("");
  const [cfSalary, setCfSalary] = useState("");
  const [cfAvailability, setCfAvailability] = useState("");
  const [cfStatus, setCfStatus] = useState<CandidateStatus>("New");
  const [cfCoverLetter, setCfCoverLetter] = useState("");
  const [cfSaving, setCfSaving] = useState(false);
  const [cfError, setCfError] = useState("");

  const [toast, setToast] = useState<{ open: boolean; title: string; desc: string; isError?: boolean }>({
    open: false,
    title: "",
    desc: "",
  });

  const showToast = (title: string, desc: string, isError = false) => {
    setToast({ open: true, title, desc, isError });
  };

  useEffect(() => {
    setJobIdFilter(initialJobIdFilter);
  }, [initialJobIdFilter]);

  const fetchCandidatesAndJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (jobIdFilter && jobIdFilter !== "all") {
        params.set("jobId", jobIdFilter);
      }

      const [candRes, jobsRes] = await Promise.all([
        fetch(`/api/jobs/candidates?${params.toString()}`, { cache: "no-store" }),
        fetch("/api/jobs", { cache: "no-store" }),
      ]);

      if (candRes.ok) {
        const data = await candRes.json();
        if (data.success && Array.isArray(data.candidates)) {
          setCandidates(data.candidates);
          if (data.counts) setCounts(data.counts);
        }
      }

      if (jobsRes.ok) {
        const jData = await jobsRes.json();
        if (jData.success && Array.isArray(jData.jobs)) {
          setJobs(jData.jobs);
        }
      }
    } catch (err) {
      console.error("Failed loading candidates:", err);
    } finally {
      setIsLoading(false);
    }
  }, [jobIdFilter]);

  useEffect(() => {
    fetchCandidatesAndJobs();
  }, [fetchCandidatesAndJobs]);

  const recomputeCounts = (list: JobCandidate[]) => ({
    total: list.length,
    newCount: list.filter((c) => c.status === "New").length,
    unattendedCount: list.filter(
      (c) => !c.isAttended || c.status === "New" || c.status === "Unattended"
    ).length,
    attendedCount: list.filter(
      (c) => c.isAttended && c.status !== "New" && c.status !== "Unattended"
    ).length,
  });

  const handleUpdateCandidate = async (
    id: string,
    payload: { status?: CandidateStatus; isAttended?: boolean; notes?: string },
    successTitle: string
  ) => {
    try {
      const res = await fetch(`/api/jobs/candidates/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update candidate");
      }

      const updated: JobCandidate = data.candidate;
      setCandidates((prev) => {
        const nextList = prev.map((c) => (c.id === id ? updated : c));
        setCounts(recomputeCounts(nextList));
        return nextList;
      });
      if (selectedCandidate?.id === id) {
        setSelectedCandidate(updated);
      }

      showToast(successTitle, `${updated.name} (${updated.status})`);
    } catch (err: any) {
      showToast("Update Failed", err.message || "Error updating candidate", true);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedCandidate) return;
    setIsSavingNotes(true);
    await handleUpdateCandidate(
      selectedCandidate.id,
      { notes: notesDraft },
      "Notes Saved"
    );
    setIsSavingNotes(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/jobs/candidates/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete candidate");
      }

      setCandidates((prev) => {
        const nextList = prev.filter((c) => c.id !== deleteTarget.id);
        setCounts(recomputeCounts(nextList));
        return nextList;
      });

      if (selectedCandidate?.id === deleteTarget.id) {
        setSelectedCandidate(null);
      }
      showToast("Candidate Removed", `${deleteTarget.name} has been deleted.`);
    } catch (err: any) {
      showToast("Delete Failed", err.message || "Error deleting candidate", true);
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  const openDetailModal = (candidate: JobCandidate) => {
    setSelectedCandidate(candidate);
    setNotesDraft(candidate.notes || "");
  };

  const openAddCandidateModal = () => {
    setEditingCandidate(null);
    setCfJobId(jobIdFilter !== "all" ? jobIdFilter : "general");
    setCfName("");
    setCfEmail("");
    setCfPhone("");
    setCfLocation("");
    setCfExperience("");
    setCfSalary("");
    setCfAvailability("");
    setCfStatus("New");
    setCfCoverLetter("");
    setCfError("");
    setCandFormOpen(true);
  };

  const openEditCandidateModal = (candidate: JobCandidate) => {
    setEditingCandidate(candidate);
    setCfJobId(candidate.jobId || "general");
    setCfName(candidate.name);
    setCfEmail(candidate.email);
    setCfPhone(candidate.phone || "");
    setCfLocation(candidate.location || "");
    setCfExperience(candidate.experienceYears || "");
    setCfSalary(candidate.expectedSalary || "");
    setCfAvailability(candidate.availability || "");
    setCfStatus(candidate.status);
    setCfCoverLetter(candidate.coverLetter || "");
    setCfError("");
    setSelectedCandidate(null);
    setCandFormOpen(true);
  };

  const handleSaveCandidateForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setCfError("");
    if (!cfName.trim() || !cfEmail.trim()) {
      setCfError("Candidate Name and Email are required.");
      return;
    }

    const matchedJob = jobs.find((j) => j.id === cfJobId);
    const resolvedTitle =
      cfJobId === "general"
        ? "General Application (Talent Pool)"
        : matchedJob?.title || editingCandidate?.jobTitle || "Open Position";

    setCfSaving(true);
    try {
      const payload = {
        jobId: cfJobId,
        jobTitle: resolvedTitle,
        name: cfName.trim(),
        email: cfEmail.trim(),
        phone: cfPhone.trim(),
        location: cfLocation.trim(),
        experienceYears: cfExperience.trim(),
        expectedSalary: cfSalary.trim(),
        availability: cfAvailability.trim(),
        coverLetter: cfCoverLetter.trim(),
        ...(editingCandidate ? { status: cfStatus } : {}),
      };

      const res = await fetch(
        editingCandidate ? `/api/jobs/candidates/${editingCandidate.id}` : "/api/jobs/candidates",
        {
          method: editingCandidate ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save candidate");
      }

      const saved: JobCandidate = data.candidate;
      setCandidates((prev) => {
        const nextList = editingCandidate
          ? prev.map((c) => (c.id === editingCandidate.id ? saved : c))
          : [saved, ...prev];
        setCounts(recomputeCounts(nextList));
        return nextList;
      });
      setCandFormOpen(false);
      showToast(
        editingCandidate ? "Candidate Updated" : "Candidate Added",
        `${saved.name} (${saved.jobTitle})`
      );
    } catch (err: any) {
      setCfError(err.message || "Error saving candidate");
    } finally {
      setCfSaving(false);
    }
  };

  // Client-side instant filtering
  const filteredCandidates = candidates.filter((c) => {
    if (bucketFilter === "new" && c.status !== "New") return false;
    if (
      bucketFilter === "unattended" &&
      c.isAttended &&
      c.status !== "New" &&
      c.status !== "Unattended"
    ) {
      return false;
    }
    if (
      bucketFilter === "attended" &&
      (!c.isAttended || c.status === "New" || c.status === "Unattended")
    ) {
      return false;
    }

    if (stageFilter !== "All" && c.status !== stageFilter) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const match =
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.jobTitle.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  const exportCsv = () => {
    if (filteredCandidates.length === 0) {
      showToast("Nothing to Export", "No candidates match current filters.", true);
      return;
    }
    const headers =
      "ID,Name,Email,Phone,Job Title,Status,Attended,Experience,Expected Salary,Location,Resume URL,Applied Date\n";
    const rows = filteredCandidates
      .map(
        (c) =>
          `"${c.id}","${c.name.replace(/"/g, '""')}","${c.email}","${c.phone}","${c.jobTitle.replace(/"/g, '""')}","${c.status}","${
            c.isAttended ? "Yes" : "No"
          }","${c.experienceYears}","${c.expectedSalary}","${c.location}","${c.resumeUrl}","${c.createdAt}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `venom_candidates_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV Downloaded", `Exported ${filteredCandidates.length} candidate records.`);
  };

  const bucketOptions: {
    id: CandidateFilterBucket;
    label: string;
    hint: string;
    count: number;
    badgeClass: string;
  }[] = [
    {
      id: "all",
      label: "All Candidates",
      hint: "Every submission",
      count: counts.total,
      badgeClass: "bg-stone-500/20 text-stone-300",
    },
    {
      id: "new",
      label: "New Leads",
      hint: "Fresh untouched arrivals",
      count: counts.newCount,
      badgeClass: "bg-emerald-500/20 text-emerald-500",
    },
    {
      id: "unattended",
      label: "Unattended Leads",
      hint: "New & awaiting review",
      count: counts.unattendedCount,
      badgeClass: "bg-amber-500/20 text-amber-500",
    },
    {
      id: "attended",
      label: "Attended Leads",
      hint: "Contacted / Shortlisted / Interviewed",
      count: counts.attendedCount,
      badgeClass: "bg-[#3BC8F6]/20 text-[#3BC8F6]",
    },
  ];

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

      {/* Primary Filter Pills: New, Unattended Leads, Attended Ones */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {bucketOptions.map((opt) => {
          const isActive = bucketFilter === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setBucketFilter(opt.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isActive
                  ? isDark
                    ? "bg-gradient-to-br from-[#C07DFF]/20 to-[#3BC8F6]/20 border-[#3BC8F6]/60 text-white shadow-lg shadow-[#3BC8F6]/10"
                    : "bg-gradient-to-br from-[#F4E9FF] to-[#E5F7FF] border-[#C07DFF] text-slate-900 shadow-md"
                  : isDark
                  ? "bg-white/[0.03] hover:bg-white/[0.06] border-white/10 text-stone-300"
                  : "bg-white hover:bg-stone-50 border-[#E8E2F2] text-stone-700 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider">
                  {opt.label}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${
                    isActive ? "bg-black/25 text-white dark:bg-white/20" : opt.badgeClass
                  }`}
                >
                  {opt.count}
                </span>
              </div>
              <span className={`text-[11px] block ${isDark ? "text-stone-400" : "text-stone-500"}`}>
                {opt.hint}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search, Job Filter & Stage Controls */}
      <div
        className={`p-4 rounded-2xl border flex flex-col lg:flex-row items-center justify-between gap-3 text-xs transition-colors ${
          isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto flex-1">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[220px]">
            <input
              type="text"
              placeholder="Search candidate by name, email, phone, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#3BC8F6] ${
                isDark
                  ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                  : "bg-white border-[#E8E2F2] text-slate-900 placeholder-stone-400"
              }`}
            />
            <svg
              className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
            </svg>
          </div>

          {/* Filter by Job */}
          <select
            value={jobIdFilter}
            onChange={(e) => setJobIdFilter(e.target.value)}
            className={`px-3 py-2.5 rounded-xl border text-xs font-medium cursor-pointer focus:outline-none ${
              isDark
                ? "bg-slate-900 border-white/10 text-white"
                : "bg-white border-[#E8E2F2] text-slate-800"
            }`}
          >
            <option value="all">All Positions</option>
            <option value="general">General Talent Pool</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>

          {/* Filter by Specific Workflow Status */}
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className={`px-3 py-2.5 rounded-xl border text-xs font-medium cursor-pointer focus:outline-none ${
              isDark
                ? "bg-slate-900 border-white/10 text-white"
                : "bg-white border-[#E8E2F2] text-slate-800"
            }`}
          >
            <option value="All">All Workflow Stages</option>
            {CANDIDATE_STATUSES.map((st) => (
              <option key={st} value={st}>
                Stage: {st}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
          <button
            type="button"
            onClick={openAddCandidateModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider shadow-sm cursor-pointer"
          >
            + Add Candidate
          </button>

          <button
            type="button"
            onClick={fetchCandidatesAndJobs}
            className={`px-3.5 py-2.5 rounded-xl border text-xs font-mono uppercase cursor-pointer ${
              isDark
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-stone-300"
                : "bg-white hover:bg-stone-50 border-stone-200 text-stone-700"
            }`}
          >
            ↻ Refresh
          </button>

          <button
            type="button"
            onClick={exportCsv}
            className={`px-4 py-2.5 rounded-xl border font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider cursor-pointer ${
              isDark
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                : "bg-white hover:bg-stone-50 border-[#E8E2F2] text-stone-800 shadow-xs"
            }`}
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Candidates Table */}
      <div
        className={`rounded-2xl border overflow-hidden transition-colors ${
          isDark ? "bg-white/[0.03] border-white/10 shadow-xl" : "bg-white border-[#E8E2F2] shadow-sm"
        }`}
      >
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <AsteriskIcon className="w-7 h-7 text-[#3BC8F6] animate-spin" color="#3BC8F6" strokeWidth={3} />
            <p className="text-xs font-mono text-stone-400 uppercase tracking-widest">
              Fetching job candidates...
            </p>
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="py-16 px-4 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#C07DFF]/10 flex items-center justify-center">
              <AsteriskIcon className="w-6 h-6 text-[#C07DFF]" color="#C07DFF" strokeWidth={2.5} />
            </div>
            <h3
              className={`font-[family-name:var(--font-oswald)] uppercase font-bold text-lg ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              No Candidates Found
            </h3>
            <p className="font-sans text-xs text-stone-500 max-w-md mx-auto">
              {bucketFilter !== "all" || searchTerm || stageFilter !== "All" || jobIdFilter !== "all"
                ? "No candidate applications match your current filter selection."
                : "Applications submitted through the Careers Job Portal will appear here in real time."}
            </p>
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
                  <th className="py-3.5 pl-6">Candidate</th>
                  <th className="py-3.5">Applied Position</th>
                  <th className="py-3.5">Attendance &amp; Status</th>
                  <th className="py-3.5">Resume / CV</th>
                  <th className="py-3.5">Applied Date</th>
                  <th className="py-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-white/5" : "divide-stone-100"}`}>
                {filteredCandidates.map((cand) => {
                  const isNew = cand.status === "New";
                  const isPending = !cand.isAttended || isNew || cand.status === "Unattended";

                  return (
                    <tr
                      key={cand.id}
                      className={`transition-colors group ${
                        isDark ? "hover:bg-white/[0.02]" : "hover:bg-purple-50/30"
                      }`}
                    >
                      <td className="py-4 pl-6">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              isNew
                                ? "bg-emerald-400 animate-pulse"
                                : isPending
                                ? "bg-amber-400"
                                : "bg-[#3BC8F6]"
                            }`}
                          />
                          <div>
                            <div
                              className={`font-bold text-sm ${
                                isDark
                                  ? "text-white group-hover:text-[#3BC8F6]"
                                  : "text-slate-900 group-hover:text-[#8B5CF6]"
                              }`}
                            >
                              {cand.name}
                            </div>
                            <div className="font-mono text-[11px] text-stone-400">{cand.email}</div>
                            {cand.phone && (
                              <div className="font-mono text-[11px] text-stone-500">{cand.phone}</div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4">
                        <span
                          className={`px-2.5 py-1 rounded-lg border font-medium text-[11px] inline-block ${
                            isDark
                              ? "bg-[#C07DFF]/15 border-[#C07DFF]/30 text-[#C07DFF]"
                              : "bg-[#F4E9FF] border-[#C07DFF]/30 text-[#8B5CF6]"
                          }`}
                        >
                          {cand.jobTitle}
                        </span>
                        <div className="text-[11px] text-stone-400 mt-1">
                          {[cand.experienceYears, cand.location].filter(Boolean).join(" • ") ||
                            "No location/exp specified"}
                        </div>
                      </td>

                      <td className="py-4">
                        <div className="flex flex-col gap-1.5 items-start">
                          <select
                            value={cand.status}
                            onChange={(e) =>
                              handleUpdateCandidate(
                                cand.id,
                                { status: e.target.value as CandidateStatus },
                                "Candidate Status Updated"
                              )
                            }
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border focus:outline-none cursor-pointer ${
                              isNew
                                ? isDark
                                  ? "bg-emerald-950/50 border-emerald-500/40 text-emerald-300"
                                  : "bg-emerald-50 border-emerald-200 text-emerald-700"
                                : isPending
                                ? isDark
                                  ? "bg-amber-950/40 border-amber-500/40 text-amber-300"
                                  : "bg-amber-50 border-amber-200 text-amber-700"
                                : isDark
                                ? "bg-[#3BC8F6]/15 border-[#3BC8F6]/40 text-[#3BC8F6]"
                                : "bg-cyan-50 border-cyan-200 text-[#0284C7]"
                            }`}
                          >
                            {CANDIDATE_STATUSES.map((st) => (
                              <option
                                key={st}
                                value={st}
                                className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}
                              >
                                {st}
                              </option>
                            ))}
                          </select>

                          <span
                            className={`text-[10px] font-mono ${
                              isPending ? "text-amber-400" : "text-emerald-400"
                            }`}
                          >
                            {isNew
                              ? "Unattended (New)"
                              : isPending
                              ? "Unattended Lead"
                              : "Attended"}
                          </span>
                        </div>
                      </td>

                      <td className="py-4">
                        {cand.resumeUrl ? (
                          <a
                            href={cand.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-colors ${
                              isDark
                                ? "bg-white/5 hover:bg-white/10 border-white/15 text-[#3BC8F6]"
                                : "bg-stone-50 hover:bg-stone-100 border-stone-200 text-[#0284C7]"
                            }`}
                          >
                            <span>View CV</span>
                            <span>&nearr;</span>
                          </a>
                        ) : (
                          <span className="text-stone-400 text-[11px]">No file attached</span>
                        )}
                      </td>

                      <td className="py-4 font-mono text-[11px] text-stone-400">
                        {formatIsoDateUTC(cand.createdAt)}
                      </td>

                      <td className="py-4 pr-6 text-right space-x-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateCandidate(
                              cand.id,
                              { isAttended: isPending },
                              isPending ? "Marked as Attended" : "Moved to Unattended"
                            )
                          }
                          className={`px-3 py-1.5 rounded-lg border font-mono text-[10px] uppercase font-bold transition-all cursor-pointer ${
                            isPending
                              ? "bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/40 text-emerald-500"
                              : "bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-500"
                          }`}
                        >
                          {isPending ? "✓ Mark Attended" : "↺ Unattend"}
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditCandidateModal(cand)}
                          className={`px-2.5 py-1.5 rounded-lg border font-[family-name:var(--font-oswald)] uppercase text-[11px] font-bold tracking-wider transition-all cursor-pointer ${
                            isDark
                              ? "bg-white/5 hover:bg-white/15 border-white/15 text-stone-200"
                              : "bg-stone-50 hover:bg-stone-200 text-stone-700 border-stone-200"
                          }`}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => openDetailModal(cand)}
                          className={`px-3 py-1.5 rounded-lg border font-[family-name:var(--font-oswald)] uppercase text-[11px] font-bold tracking-wider transition-all cursor-pointer ${
                            isDark
                              ? "bg-white/5 hover:bg-white/15 border-white/15 text-white"
                              : "bg-[#F4E9FF] hover:bg-[#C07DFF] text-[#8B5CF6] hover:text-white border-[#C07DFF]/30"
                          }`}
                        >
                          Inspect
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteTarget(cand)}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            isDark
                              ? "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                              : "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                          }`}
                          title="Delete Candidate"
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
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Candidate Inspection Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div
            className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 sm:p-8 space-y-6 shadow-2xl ${
              isDark ? "bg-slate-900 border-white/20 text-white" : "bg-white border-[#E8E2F2] text-slate-900"
            }`}
          >
            <div
              className={`flex items-start justify-between border-b pb-4 ${
                isDark ? "border-white/10" : "border-[#E8E2F2]"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#C07DFF] font-bold">
                    {selectedCandidate.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      selectedCandidate.isAttended
                        ? "bg-emerald-500/15 text-emerald-500"
                        : "bg-amber-500/15 text-amber-500"
                    }`}
                  >
                    {selectedCandidate.isAttended ? "Attended" : "Unattended"}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl mt-1">
                  {selectedCandidate.name}
                </h3>
                <span className="text-xs text-[#3BC8F6] font-semibold">
                  Applied for: {selectedCandidate.jobTitle}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10 border-white/10 text-stone-400"
                    : "bg-stone-100 hover:bg-stone-200 border-stone-200 text-stone-600"
                }`}
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className={`p-3 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/10" : "bg-stone-50 border-stone-200"}`}>
                <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1">Email</span>
                <a href={`mailto:${selectedCandidate.email}`} className="font-mono text-[#3BC8F6] hover:underline">
                  {selectedCandidate.email}
                </a>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/10" : "bg-stone-50 border-stone-200"}`}>
                <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1">Phone</span>
                <span>{selectedCandidate.phone || "Not provided"}</span>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/10" : "bg-stone-50 border-stone-200"}`}>
                <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1">
                  Experience &amp; Location
                </span>
                <span>
                  {[selectedCandidate.experienceYears, selectedCandidate.location]
                    .filter(Boolean)
                    .join(" • ") || "Not provided"}
                </span>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/10" : "bg-stone-50 border-stone-200"}`}>
                <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1">
                  Expected Salary &amp; Notice
                </span>
                <span>
                  {[selectedCandidate.expectedSalary, selectedCandidate.availability]
                    .filter(Boolean)
                    .join(" • ") || "Not provided"}
                </span>
              </div>
            </div>

            {/* Links & Resume */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              {selectedCandidate.resumeUrl && (
                <a
                  href={selectedCandidate.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider"
                >
                  Open Resume ({selectedCandidate.resumeFileName || "CV"}) &nearr;
                </a>
              )}
              {selectedCandidate.portfolioUrl && (
                <a
                  href={selectedCandidate.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl border border-stone-300 dark:border-white/20 hover:border-[#3BC8F6]"
                >
                  Portfolio &nearr;
                </a>
              )}
              {selectedCandidate.linkedinUrl && (
                <a
                  href={selectedCandidate.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl border border-stone-300 dark:border-white/20 hover:border-[#3BC8F6]"
                >
                  LinkedIn &nearr;
                </a>
              )}
            </div>

            {selectedCandidate.coverLetter && (
              <div>
                <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1.5">
                  Cover Letter / Applicant Note
                </span>
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed whitespace-pre-wrap ${
                    isDark ? "bg-black/30 border-white/10 text-stone-300" : "bg-stone-50 border-stone-200 text-stone-800"
                  }`}
                >
                  {selectedCandidate.coverLetter}
                </div>
              </div>
            )}

            {selectedCandidate.customAnswers.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#C07DFF] uppercase block">
                  Screening Question Answers
                </span>
                <div className="space-y-2">
                  {selectedCandidate.customAnswers.map((ans) => (
                    <div
                      key={ans.questionId}
                      className={`p-3 rounded-xl border text-xs ${
                        isDark ? "bg-white/[0.02] border-white/10" : "bg-stone-50 border-stone-200"
                      }`}
                    >
                      <div className="font-semibold text-[#3BC8F6] mb-1">{ans.label}</div>
                      <div className="whitespace-pre-wrap">{ans.answer || "—"}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HR Notes */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-stone-400 uppercase block">
                Recruiter Internal Notes
              </span>
              <div className="flex flex-col sm:flex-row gap-2">
                <textarea
                  rows={2}
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  placeholder="Record interview impressions, follow-up schedule, or score..."
                  className={`flex-1 px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#C07DFF] ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white"
                      : "bg-white border-stone-300 text-slate-900"
                  }`}
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes}
                  className="px-4 py-2 rounded-xl border border-[#C07DFF]/40 bg-[#C07DFF]/15 text-[#C07DFF] font-[family-name:var(--font-oswald)] uppercase text-xs font-bold cursor-pointer self-end sm:self-stretch"
                >
                  {isSavingNotes ? "Saving..." : "Save Note"}
                </button>
              </div>
            </div>

            {/* Footer Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200 dark:border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-stone-400">Status:</span>
                <select
                  value={selectedCandidate.status}
                  onChange={(e) =>
                    handleUpdateCandidate(
                      selectedCandidate.id,
                      { status: e.target.value as CandidateStatus },
                      "Status Updated"
                    )
                  }
                  className="px-3 py-1.5 rounded-lg border font-semibold dark:bg-slate-800 dark:border-white/20 cursor-pointer"
                >
                  {CANDIDATE_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditCandidateModal(selectedCandidate)}
                  className="px-3.5 py-2 rounded-xl border border-[#C07DFF]/40 bg-[#C07DFF]/15 text-[#C07DFF] font-[family-name:var(--font-oswald)] uppercase text-xs font-bold cursor-pointer"
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateCandidate(
                      selectedCandidate.id,
                      { isAttended: !selectedCandidate.isAttended },
                      !selectedCandidate.isAttended ? "Marked as Attended" : "Moved to Unattended"
                    )
                  }
                  className={`px-4 py-2 rounded-xl font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider cursor-pointer ${
                    !selectedCandidate.isAttended
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-amber-600/20 text-amber-400 border border-amber-500/40"
                  }`}
                >
                  {!selectedCandidate.isAttended ? "✓ Mark as Attended" : "↺ Reopen as Unattended"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Candidate Modal */}
      {candFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div
            className={`w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 sm:p-8 space-y-5 shadow-2xl ${
              isDark ? "bg-slate-900 border-white/20 text-white" : "bg-white border-[#E8E2F2] text-slate-900"
            }`}
          >
            <div className="flex items-center justify-between border-b pb-4 border-stone-200 dark:border-white/10">
              <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl">
                {editingCandidate ? `Edit Candidate: ${editingCandidate.name}` : "Add Candidate Manually"}
              </h3>
              <button
                type="button"
                onClick={() => setCandFormOpen(false)}
                className="w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer border-stone-300 dark:border-white/15"
              >
                ✕
              </button>
            </div>

            {cfError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs">
                {cfError}
              </div>
            )}

            <form onSubmit={handleSaveCandidateForm} className="space-y-4 text-xs">
              <div>
                <label className="block font-[family-name:var(--font-oswald)] uppercase font-bold mb-1">
                  Applied Position
                </label>
                <select
                  value={cfJobId}
                  onChange={(e) => setCfJobId(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${
                    isDark ? "bg-slate-800 border-white/10 text-white" : "bg-white border-stone-300 text-slate-900"
                  }`}
                >
                  <option value="general">General Application (Talent Pool)</option>
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-[family-name:var(--font-oswald)] uppercase font-bold mb-1">
                    Candidate Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={cfName}
                    onChange={(e) => setCfName(e.target.value)}
                    placeholder="Full Name"
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-300 text-slate-900"
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-[family-name:var(--font-oswald)] uppercase font-bold mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={cfEmail}
                    onChange={(e) => setCfEmail(e.target.value)}
                    placeholder="candidate@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-300 text-slate-900"
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-[family-name:var(--font-oswald)] uppercase font-bold mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={cfPhone}
                    onChange={(e) => setCfPhone(e.target.value)}
                    placeholder="+92 300 0000000"
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-300 text-slate-900"
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-[family-name:var(--font-oswald)] uppercase font-bold mb-1">
                    City &amp; Country
                  </label>
                  <input
                    type="text"
                    value={cfLocation}
                    onChange={(e) => setCfLocation(e.target.value)}
                    placeholder="Lahore, Pakistan"
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-300 text-slate-900"
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-[family-name:var(--font-oswald)] uppercase font-bold mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={cfExperience}
                    onChange={(e) => setCfExperience(e.target.value)}
                    placeholder="e.g. 3 Years"
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-300 text-slate-900"
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-[family-name:var(--font-oswald)] uppercase font-bold mb-1">
                    Expected Salary
                  </label>
                  <input
                    type="text"
                    value={cfSalary}
                    onChange={(e) => setCfSalary(e.target.value)}
                    placeholder="e.g. PKR 180k"
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-300 text-slate-900"
                    }`}
                  />
                </div>
              </div>

              {editingCandidate && (
                <div>
                  <label className="block font-[family-name:var(--font-oswald)] uppercase font-bold mb-1">
                    Workflow Status
                  </label>
                  <select
                    value={cfStatus}
                    onChange={(e) => setCfStatus(e.target.value as CandidateStatus)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      isDark ? "bg-slate-800 border-white/10 text-white" : "bg-white border-stone-300 text-slate-900"
                    }`}
                  >
                    {CANDIDATE_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block font-[family-name:var(--font-oswald)] uppercase font-bold mb-1">
                  Cover Note / Summary
                </label>
                <textarea
                  rows={3}
                  value={cfCoverLetter}
                  onChange={(e) => setCfCoverLetter(e.target.value)}
                  placeholder="Candidate pitch or recruiter summary..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${
                    isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-300 text-slate-900"
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setCandFormOpen(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-mono uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={cfSaving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase font-bold tracking-wider cursor-pointer disabled:opacity-50"
                >
                  {cfSaving ? "Saving..." : editingCandidate ? "Save Candidate" : "Add Candidate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div
            className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${
              isDark ? "bg-slate-900 border-white/10 text-white" : "bg-white border-[#E8E2F2] text-slate-900"
            }`}
          >
            <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-lg text-red-400">
              Delete Candidate Application?
            </h3>
            <p className="text-xs text-stone-400">
              Are you sure you want to permanently remove{" "}
              <strong className={isDark ? "text-white" : "text-black"}>
                &quot;{deleteTarget.name}&quot;
              </strong>{" "}
              ({deleteTarget.email})?
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

