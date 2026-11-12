"use client";

import React, { useState, useEffect } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import SwipeToast from "@/app/component/global/ui/SwipeToast";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";
import {
  Job,
  NewJobInput,
  JobStatus,
  EmploymentType,
  WorkMode,
  JobApplyFormConfig,
  CustomFormQuestion,
  DEFAULT_APPLY_FORM_CONFIG,
  EMPLOYMENT_TYPES,
  WORK_MODES,
  JOB_STATUSES,
  normalizeApplyFormConfig,
} from "@/lib/jobs/types";

interface JobFormProps {
  initialJob?: Job | null;
  onSuccess: () => void;
  onCancel?: () => void;
}

const APPLY_FIELD_TOGGLES: { key: keyof JobApplyFormConfig; label: string; hint: string }[] = [
  { key: "askPhone", label: "Phone / WhatsApp", hint: "Collect mobile contact number" },
  { key: "askLocation", label: "City / Location", hint: "Verify proximity or timezone" },
  { key: "askExperience", label: "Years of Experience", hint: "Numeric or short experience text" },
  { key: "askExpectedSalary", label: "Expected Salary", hint: "Ask target monthly package" },
  { key: "askAvailability", label: "Notice Period / Availability", hint: "How soon they can join" },
  { key: "askPortfolio", label: "Portfolio / GitHub URL", hint: "Showcase links or work samples" },
  { key: "askLinkedIn", label: "LinkedIn Profile", hint: "Professional profile URL" },
  { key: "askCoverLetter", label: "Cover Letter / Pitch", hint: "Candidate motivation message" },
  { key: "requireResume", label: "Require Resume / CV", hint: "Enforce PDF/DOC attachment" },
];

export default function JobForm({ initialJob, onSuccess, onCancel }: JobFormProps) {
  const { isDark } = useDashboardTheme();

  // Role details
  const [title, setTitle] = useState(initialJob?.title || "");
  const [department, setDepartment] = useState(initialJob?.department || "Engineering");
  const [employmentType, setEmploymentType] = useState<EmploymentType>(
    initialJob?.employmentType || "Full-Time"
  );
  const [workMode, setWorkMode] = useState<WorkMode>(initialJob?.workMode || "Hybrid");
  const [location, setLocation] = useState(initialJob?.location || "Lahore, Pakistan");
  const [experienceLevel, setExperienceLevel] = useState(
    initialJob?.experienceLevel || "2-4 Years"
  );
  const [salaryRange, setSalaryRange] = useState(initialJob?.salaryRange || "Competitive");
  const [status, setStatus] = useState<JobStatus>(initialJob?.status || "Open");
  const [isFeatured, setIsFeatured] = useState<boolean>(initialJob?.isFeatured ?? false);
  const [applicationDeadline, setApplicationDeadline] = useState(
    initialJob?.applicationDeadline || ""
  );
  const [summary, setSummary] = useState(initialJob?.summary || "");
  const [description, setDescription] = useState(initialJob?.description || "");
  const [requirementsText, setRequirementsText] = useState(
    (initialJob?.requirements || []).join("\n")
  );
  const [benefitsText, setBenefitsText] = useState((initialJob?.benefits || []).join("\n"));

  // Apply form configuration
  const [formConfig, setFormConfig] = useState<JobApplyFormConfig>(() =>
    normalizeApplyFormConfig(initialJob?.applyFormConfig)
  );

  // Submission & Toast state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState<{ open: boolean; title: string; desc: string; isError?: boolean }>({
    open: false,
    title: "",
    desc: "",
  });

  useEffect(() => {
    if (initialJob) {
      setTitle(initialJob.title || "");
      setDepartment(initialJob.department || "Engineering");
      setEmploymentType(initialJob.employmentType || "Full-Time");
      setWorkMode(initialJob.workMode || "Hybrid");
      setLocation(initialJob.location || "Lahore, Pakistan");
      setExperienceLevel(initialJob.experienceLevel || "2-4 Years");
      setSalaryRange(initialJob.salaryRange || "Competitive");
      setStatus(initialJob.status || "Open");
      setIsFeatured(Boolean(initialJob.isFeatured));
      setApplicationDeadline(initialJob.applicationDeadline || "");
      setSummary(initialJob.summary || "");
      setDescription(initialJob.description || "");
      setRequirementsText((initialJob.requirements || []).join("\n"));
      setBenefitsText((initialJob.benefits || []).join("\n"));
      setFormConfig(normalizeApplyFormConfig(initialJob.applyFormConfig));
    }
  }, [initialJob]);

  const parsedRequirements = requirementsText
    .split("\n")
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);

  const parsedBenefits = benefitsText
    .split("\n")
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);

  const addCustomQuestion = () => {
    const newQ: CustomFormQuestion = {
      id: `q-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      label: "",
      type: "text",
      placeholder: "",
      required: false,
      options: [],
    };
    setFormConfig((prev) => ({
      ...prev,
      customQuestions: [...prev.customQuestions, newQ],
    }));
  };

  const updateCustomQuestion = (id: string, patch: Partial<CustomFormQuestion>) => {
    setFormConfig((prev) => ({
      ...prev,
      customQuestions: prev.customQuestions.map((q) => (q.id === id ? { ...q, ...patch } : q)),
    }));
  };

  const removeCustomQuestion = (id: string) => {
    setFormConfig((prev) => ({
      ...prev,
      customQuestions: prev.customQuestions.filter((q) => q.id !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!title.trim()) {
      setErrorMessage("Job Title is required.");
      return;
    }

    const cleanedQuestions = formConfig.customQuestions
      .map((q) => ({
        ...q,
        label: q.label.trim(),
        placeholder: (q.placeholder || "").trim(),
        options:
          q.type === "select"
            ? (q.options || []).map((o) => o.trim()).filter(Boolean)
            : undefined,
      }))
      .filter((q) => q.label.length > 0);

    const payload: NewJobInput = {
      title: title.trim(),
      department: department.trim() || "Engineering",
      employmentType,
      workMode,
      location: location.trim() || "Lahore, Pakistan",
      experienceLevel: experienceLevel.trim() || "Mid-Level",
      salaryRange: salaryRange.trim() || "Competitive",
      summary: summary.trim(),
      description: description.trim(),
      requirements: parsedRequirements,
      benefits: parsedBenefits,
      status,
      isFeatured,
      applicationDeadline: applicationDeadline.trim(),
      applyFormConfig: {
        ...DEFAULT_APPLY_FORM_CONFIG,
        ...formConfig,
        customQuestions: cleanedQuestions,
      },
    };

    setIsSubmitting(true);
    try {
      const endpoint = initialJob?.id ? `/api/jobs/${initialJob.id}` : "/api/jobs";
      const method = initialJob?.id ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save job posting");
      }

      setToast({
        open: true,
        title: initialJob ? "Job Updated Successfully" : "Job Published to Careers Portal",
        desc: `"${data.job.title}" is now ${data.job.status}.`,
      });

      setTimeout(() => {
        onSuccess();
      }, 650);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error saving job posting";
      setErrorMessage(msg);
      setToast({
        open: true,
        title: "Save Failed",
        desc: msg,
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = `w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#C07DFF] ${
    isDark
      ? "border-white/10 bg-white/[0.03] text-white placeholder-stone-500"
      : "border-stone-300 bg-white text-slate-900 placeholder-stone-400"
  }`;

  const selectClass = `w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C07DFF] ${
    isDark
      ? "border-white/10 bg-slate-900 text-white"
      : "border-stone-300 bg-white text-slate-900"
  }`;

  const labelClass = `block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-bold mb-1.5 ${
    isDark ? "text-stone-200" : "text-stone-800"
  }`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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

      {/* Left Column: Job + Apply Form Builder */}
      <div
        className={`lg:col-span-8 rounded-2xl p-6 sm:p-8 border shadow-sm ${
          isDark
            ? "bg-slate-900/80 border-white/10 text-white"
            : "bg-white border-stone-200 text-stone-900"
        }`}
      >
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-stone-200/70 dark:border-white/10">
          <div>
            <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl tracking-wide">
              {initialJob ? "Edit Job & Apply Form" : "Post New Job Opening"}
            </h3>
            <p className={`font-sans text-xs mt-1 ${isDark ? "text-stone-400" : "text-stone-500"}`}>
              Configure the open role details and customize the candidate application form shown on `/screens/careers`.
            </p>
          </div>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className={`text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded-lg border cursor-pointer ${
                isDark
                  ? "text-stone-300 hover:text-white border-white/15 hover:bg-white/5"
                  : "text-stone-600 hover:text-black border-stone-300 hover:bg-stone-50"
              }`}
            >
              &larr; All Jobs
            </button>
          )}
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* PART 1: Core Role Metadata */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#3BC8F6] font-bold">
              <span>01 // Role Specification</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className={labelClass}>
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Next.js & AI Engineer"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Department</label>
                <textarea
                  rows={2}
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Engineering, AI & Automation, Design..."
                  className={`${inputClass} resize-y`}
                />
              </div>

              <div>
                <label className={labelClass}>Employment Type</label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
                  className={selectClass}
                >
                  {EMPLOYMENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Work Mode</label>
                <select
                  value={workMode}
                  onChange={(e) => setWorkMode(e.target.value as WorkMode)}
                  className={selectClass}
                >
                  {WORK_MODES.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Lahore, Pakistan / Remote"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Experience Level</label>
                <input
                  type="text"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  placeholder="e.g. 2-4 Years / Senior"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Salary / Compensation</label>
                <input
                  type="text"
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value)}
                  placeholder="e.g. PKR 180k - 280k / mo"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Visibility Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as JobStatus)}
                  className={selectClass}
                >
                  {JOB_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st === "Open" ? "Open (Live on Careers)" : st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Application Deadline (Optional)</label>
                <input
                  type="date"
                  value={applicationDeadline}
                  onChange={(e) => setApplicationDeadline(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <label className="inline-flex items-center gap-2.5 cursor-pointer select-none pt-1">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 accent-[#C07DFF] rounded"
              />
              <span className="text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold">
                Mark as Priority / Featured Opening
              </span>
            </label>

            <div>
              <label className={labelClass}>Short Role Summary (Card Teaser)</label>
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="One-line elevator pitch shown directly on the job card..."
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Full Role Description &amp; Responsibilities</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe day-to-day responsibilities, tech stack, and mission..."
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Key Requirements (One per line)</label>
                <textarea
                  rows={4}
                  value={requirementsText}
                  onChange={(e) => setRequirementsText(e.target.value)}
                  placeholder={"2+ years Next.js / React\nStrong TypeScript skills\nREST & SQL experience"}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Perks &amp; Benefits (One per line)</label>
                <textarea
                  rows={4}
                  value={benefitsText}
                  onChange={(e) => setBenefitsText(e.target.value)}
                  placeholder={"Flexible remote schedule\nPerformance bonuses\nHealth & growth budget"}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* PART 2: Dynamic Apply Form Configuration */}
          <div
            className={`p-5 sm:p-6 rounded-2xl border space-y-5 ${
              isDark
                ? "bg-white/[0.02] border-[#C07DFF]/25"
                : "bg-[#FAF5FF]/50 border-[#E8E2F2]"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C07DFF] font-bold block">
                  02 // Dynamic Job Apply Form Builder
                </span>
                <p className={`text-xs mt-0.5 ${isDark ? "text-stone-400" : "text-stone-600"}`}>
                  Control what fields and screening questions appear when candidates click &quot;Apply Now&quot;.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Apply Modal Headline</label>
                <input
                  type="text"
                  value={formConfig.headline || ""}
                  onChange={(e) => setFormConfig((p) => ({ ...p, headline: e.target.value }))}
                  placeholder="Submit Your Application"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Submit Button Text</label>
                <input
                  type="text"
                  value={formConfig.submitButtonText || ""}
                  onChange={(e) =>
                    setFormConfig((p) => ({ ...p, submitButtonText: e.target.value }))
                  }
                  placeholder="Submit Application"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Custom Screening Questions */}
            <div className="pt-2 space-y-3 border-t border-stone-200/60 dark:border-white/10">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className={labelClass + " mb-0"}>Custom Screening Questions</span>
                  <span className="text-[11px] text-stone-400">
                    Add role-specific questions rendered dynamically on the apply form.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={addCustomQuestion}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-[11px] font-bold tracking-wider shadow-sm hover:opacity-95 cursor-pointer shrink-0"
                >
                  + Add Question
                </button>
              </div>

              {formConfig.customQuestions.length === 0 ? (
                <div
                  className={`p-4 rounded-xl border border-dashed text-center text-xs ${
                    isDark ? "border-white/15 text-stone-400" : "border-stone-300 text-stone-500"
                  }`}
                >
                  No custom questions yet. Click &quot;+ Add Question&quot; to ask specific prompts for this job.
                </div>
              ) : (
                <div className="space-y-3">
                  {formConfig.customQuestions.map((q, index) => (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border space-y-3 ${
                        isDark ? "bg-slate-900/80 border-white/10" : "bg-white border-stone-200"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono text-[#C07DFF] font-bold">
                          Question #{index + 1}
                        </span>
                        <div className="flex items-center gap-3">
                          <label className="inline-flex items-center gap-1.5 text-xs cursor-pointer">
                            <input
                              type="checkbox"
                              checked={q.required}
                              onChange={(e) =>
                                updateCustomQuestion(q.id, { required: e.target.checked })
                              }
                              className="accent-[#C07DFF]"
                            />
                            <span>Required</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => removeCustomQuestion(q.id)}
                            className="text-xs text-red-500 hover:underline font-mono cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-6">
                          <input
                            type="text"
                            value={q.label}
                            onChange={(e) => updateCustomQuestion(q.id, { label: e.target.value })}
                            placeholder="e.g. Share link to a shipped Next.js app"
                            className={inputClass}
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <select
                            value={q.type}
                            onChange={(e) =>
                              updateCustomQuestion(q.id, {
                                type: e.target.value as CustomFormQuestion["type"],
                              })
                            }
                            className={selectClass}
                          >
                            <option value="text">Short Text</option>
                            <option value="textarea">Long Answer</option>
                            <option value="url">Link / URL</option>
                            <option value="select">Dropdown Select</option>
                          </select>
                        </div>
                        <div className="sm:col-span-3">
                          <input
                            type="text"
                            value={q.placeholder || ""}
                            onChange={(e) =>
                              updateCustomQuestion(q.id, { placeholder: e.target.value })
                            }
                            placeholder="Hint / Placeholder"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      {q.type === "select" && (
                        <div>
                          <input
                            type="text"
                            value={(q.options || []).join(", ")}
                            onChange={(e) =>
                              updateCustomQuestion(q.id, {
                                options: e.target.value.split(",").map((s) => s.trim()),
                              })
                            }
                            placeholder="Dropdown options separated by commas (e.g. Beginner, Intermediate, Expert)"
                            className={inputClass}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Controls */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200/70 dark:border-white/10">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider border border-stone-300 dark:border-white/20 text-stone-500 hover:text-black dark:hover:text-white cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider shadow-lg shadow-[#3BC8F6]/20 hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
            >
              <AsteriskIcon className="w-3.5 h-3.5 text-white" color="currentColor" strokeWidth={3} />
              <span>
                {isSubmitting
                  ? "Saving..."
                  : initialJob
                  ? "Save Job Changes"
                  : "Publish Job Posting"}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Right Column: Live Careers Portal Card Preview */}
      <div className="lg:col-span-4 space-y-5 sticky top-24">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-stone-400">
            Live Careers Card Preview
          </span>
          <span className="text-[11px] font-mono text-[#3BC8F6]">{status}</span>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-[#2D1B0E] via-[#3D2513] to-[#1C1108] border border-[#C6865B]/35 p-6 text-white shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-2.5 py-1 rounded-full bg-[#C07DFF]/20 border border-[#C07DFF]/40 text-[#E8B291] text-[10px] font-mono uppercase font-bold">
              {department.trim() || "Engineering"}
            </span>
            {isFeatured && (
              <span className="px-2.5 py-1 rounded-full bg-[#3BC8F6]/20 border border-[#3BC8F6]/40 text-[#3BC8F6] text-[10px] font-mono uppercase font-bold">
                Priority Hiring
              </span>
            )}
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl tracking-tight text-white">
              {title || "Your Job Title Here"}
            </h4>
            <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
              {summary || "Short one-line overview describing this opening on the public portal."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] font-mono text-stone-200">
            <span className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10">
              {employmentType}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10">
              {workMode}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10">
              {location || "Lahore, Pakistan"}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-[#3BC8F6]">
              {salaryRange || "Competitive"}
            </span>
          </div>

          {parsedRequirements.length > 0 && (
            <ul className="space-y-1 text-xs text-stone-300 pt-1">
              {parsedRequirements.slice(0, 3).map((req, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#C07DFF] mt-0.5">&bull;</span>
                  <span className="line-clamp-1">{req}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] font-mono text-stone-400">
              Exp: {experienceLevel || "Any"}
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider">
              <span>{formConfig.submitButtonText || "Apply Now"}</span>
              <span>&rarr;</span>
            </span>
          </div>
        </div>

        {/* Apply Form Summary Card */}
        <div
          className={`p-5 rounded-2xl border space-y-3 ${
            isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-stone-200 shadow-sm"
          }`}
        >
          <span className="text-xs font-mono uppercase tracking-wider text-[#C07DFF] font-bold block">
            Active Apply Form Fields
          </span>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-1 rounded bg-emerald-500/15 text-emerald-500 text-[10px] font-mono font-semibold">
              Full Name *
            </span>
            <span className="px-2 py-1 rounded bg-emerald-500/15 text-emerald-500 text-[10px] font-mono font-semibold">
              Email *
            </span>
            {APPLY_FIELD_TOGGLES.filter((f) => Boolean(formConfig[f.key])).map((f) => (
              <span
                key={f.key}
                className="px-2 py-1 rounded bg-[#3BC8F6]/15 text-[#0284C7] dark:text-[#3BC8F6] text-[10px] font-mono font-semibold"
              >
                {f.label}
              </span>
            ))}
            {formConfig.customQuestions
              .filter((q) => q.label.trim())
              .map((q) => (
                <span
                  key={q.id}
                  className="px-2 py-1 rounded bg-[#C07DFF]/15 text-[#C07DFF] text-[10px] font-mono font-semibold"
                >
                  + {q.label.slice(0, 22)}
                  {q.label.length > 22 ? "..." : ""}
                  {q.required ? " *" : ""}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

