"use client";

import React, { useState, useEffect, useRef } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import {
  Job,
  DEFAULT_APPLY_FORM_CONFIG,
  normalizeApplyFormConfig,
  CandidateCustomAnswer,
  formatIsoDateUTC,
} from "@/lib/jobs/types";

interface JobApplyModalProps {
  job: Job | null; // null represents General Talent Pool application
  isOpen: boolean;
  onClose: () => void;
  onSubmitted: (jobTitle: string, candidateName: string) => void;
}

export default function JobApplyModal({
  job,
  isOpen,
  onClose,
  onSubmitted,
}: JobApplyModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formConfig = job
    ? normalizeApplyFormConfig(job.applyFormConfig)
    : DEFAULT_APPLY_FORM_CONFIG;

  const targetJobId = job?.id || "general";
  const targetJobTitle = job?.title || "General Application (Talent Pool)";

  // Applicant fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [availability, setAvailability] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [customAnswersMap, setCustomAnswersMap] = useState<Record<string, string>>({});

  // UI state
  const [showRoleDetails, setShowRoleDetails] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset form state whenever modal opens for a different job
  useEffect(() => {
    if (isOpen) {
      setErrorMsg("");
      setIsSuccess(false);
      setShowRoleDetails(false);
      setCustomAnswersMap({});
    }
  }, [isOpen, targetJobId]);

  // Escape key & scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg("");
    setIsUploadingResume(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/careers/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload resume file");
      }

      setResumeUrl(data.url);
      setResumeFileName(data.fileName || file.name);
    } catch (err: any) {
      setErrorMsg(err.message || "Could not upload resume.");
    } finally {
      setIsUploadingResume(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const resetAndClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setLocation("");
    setExperienceYears("");
    setExpectedSalary("");
    setAvailability("");
    setPortfolioUrl("");
    setLinkedinUrl("");
    setCoverLetter("");
    setResumeUrl("");
    setResumeFileName("");
    setCustomAnswersMap({});
    setIsSuccess(false);
    setErrorMsg("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !email.trim()) {
      setErrorMsg("Please fill in your full name and email address.");
      return;
    }

    if (formConfig.requireResume && !resumeUrl.trim()) {
      setErrorMsg("Please upload your Resume / CV or provide a direct resume link.");
      return;
    }

    const customAnswers: CandidateCustomAnswer[] = (formConfig.customQuestions || []).map((q) => ({
      questionId: q.id,
      label: q.label,
      answer: (customAnswersMap[q.id] || "").trim(),
    }));

    for (const q of formConfig.customQuestions || []) {
      if (q.required && !customAnswersMap[q.id]?.trim()) {
        setErrorMsg(`Please answer required question: "${q.label}"`);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/jobs/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: targetJobId,
          jobTitle: targetJobTitle,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          location: location.trim(),
          experienceYears: experienceYears.trim(),
          expectedSalary: expectedSalary.trim(),
          availability: availability.trim(),
          portfolioUrl: portfolioUrl.trim(),
          linkedinUrl: linkedinUrl.trim(),
          resumeUrl: resumeUrl.trim(),
          resumeFileName: resumeFileName.trim() || (resumeUrl ? "External Resume Link" : ""),
          coverLetter: coverLetter.trim(),
          customAnswers,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit application");
      }

      setIsSuccess(true);
      onSubmitted(targetJobTitle, name.trim());
    } catch (err: any) {
      setErrorMsg(err.message || "Error submitting application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-stone-400 text-sm focus:outline-none focus:border-[#3BC8F6] transition-colors";
  const labelClass =
    "block text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-stone-200 mb-1.5";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) resetAndClose();
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-[#23150B] via-[#17111C] to-[#0B101B] border border-[#C6865B]/40 shadow-2xl text-white p-6 sm:p-8">
        {/* Top Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#3BC8F6]/30 mb-2">
              <AsteriskIcon className="w-3 h-3 text-[#3BC8F6]" color="#3BC8F6" strokeWidth={3} />
              <span className="font-[family-name:var(--font-oswald)] uppercase text-[11px] tracking-widest text-[#3BC8F6] font-semibold">
                {job ? `${job.department} • ${job.workMode}` : "Open Talent Pool"}
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
              {targetJobTitle}
            </h3>
            {job && (
              <p className="text-xs font-mono text-stone-300 mt-1">
                {job.employmentType} &bull; {job.location} &bull; Salary: {job.salaryRange || "Competitive"}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close application form"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 flex items-center justify-center text-stone-300 hover:text-white cursor-pointer flex-shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Collapsible Job Specification Reference */}
        {job && !isSuccess && (job.description || job.requirements.length > 0) && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowRoleDetails((v) => !v)}
              className="text-xs font-mono text-[#E8B291] hover:text-[#3BC8F6] underline cursor-pointer"
            >
              {showRoleDetails ? "Hide Role Overview ▲" : "Review Role Description & Requirements ▼"}
            </button>

            {showRoleDetails && (
              <div className="mt-3 p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3 text-xs text-stone-300">
                {job.description && (
                  <p className="whitespace-pre-wrap leading-relaxed">{job.description}</p>
                )}
                {job.requirements.length > 0 && (
                  <div>
                    <span className="font-mono uppercase text-[10px] text-[#3BC8F6] block mb-1">
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
                {job.applicationDeadline && (
                  <div className="text-[11px] font-mono text-amber-300">
                    Deadline: {formatIsoDateUTC(job.applicationDeadline)}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Confirmation Screen OR Form */}
        {isSuccess ? (
          <div className="py-12 px-4 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#C07DFF] to-[#3BC8F6] flex items-center justify-center shadow-lg shadow-[#3BC8F6]/25">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h4 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-2xl text-white">
                Application Submitted Successfully!
              </h4>
              <p className="text-sm text-stone-300 max-w-md mx-auto mt-2 leading-relaxed">
                Thank you, <strong className="text-white">{name}</strong>. Your application for{" "}
                <strong className="text-[#3BC8F6]">{targetJobTitle}</strong> has been received by our hiring team.
              </p>
            </div>
            <button
              type="button"
              onClick={resetAndClose}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider cursor-pointer"
            >
              Back to Careers Portal
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-oswald)] uppercase text-base font-bold text-white">
                {formConfig.headline || "Submit Your Application"}
              </span>
              <span className="text-[11px] font-mono text-stone-400">
                Fields marked <span className="text-[#C07DFF]">*</span> are required
              </span>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Full Name <span className="text-[#C07DFF]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ayesha Khan"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Email Address <span className="text-[#C07DFF]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ayesha@example.com"
                  className={inputClass}
                />
              </div>

              {formConfig.askPhone && (
                <div>
                  <label className={labelClass}>Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className={inputClass}
                  />
                </div>
              )}

              {formConfig.askLocation && (
                <div>
                  <label className={labelClass}>City &amp; Country</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Lahore, Pakistan"
                    className={inputClass}
                  />
                </div>
              )}

              {formConfig.askExperience && (
                <div>
                  <label className={labelClass}>Years of Experience</label>
                  <input
                    type="text"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    placeholder="e.g. 3 Years"
                    className={inputClass}
                  />
                </div>
              )}

              {formConfig.askExpectedSalary && (
                <div>
                  <label className={labelClass}>Expected Monthly Salary</label>
                  <input
                    type="text"
                    value={expectedSalary}
                    onChange={(e) => setExpectedSalary(e.target.value)}
                    placeholder="e.g. PKR 180,000"
                    className={inputClass}
                  />
                </div>
              )}

              {formConfig.askAvailability && (
                <div>
                  <label className={labelClass}>Notice Period / Availability</label>
                  <input
                    type="text"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    placeholder="Immediate / 2 Weeks"
                    className={inputClass}
                  />
                </div>
              )}

              {formConfig.askPortfolio && (
                <div>
                  <label className={labelClass}>Portfolio / GitHub URL</label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://github.com/username"
                    className={inputClass}
                  />
                </div>
              )}

              {formConfig.askLinkedIn && (
                <div className="sm:col-span-2">
                  <label className={labelClass}>LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className={inputClass}
                  />
                </div>
              )}
            </div>

            {/* Resume / CV File Upload */}
            <div className="space-y-2">
              <label className={labelClass}>
                Resume / CV Attachment{" "}
                {formConfig.requireResume && <span className="text-[#C07DFF]">*</span>}
              </label>

              <div className="p-4 rounded-2xl border-2 border-dashed border-white/20 bg-black/30 text-center space-y-2.5">
                {resumeUrl ? (
                  <div className="flex flex-wrap items-center justify-between gap-2 text-left bg-white/5 px-3.5 py-2.5 rounded-xl border border-emerald-500/30">
                    <div className="truncate">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase block">
                        Attached Resume
                      </span>
                      <span className="text-xs font-medium text-white truncate block">
                        {resumeFileName || resumeUrl}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-mono cursor-pointer"
                      >
                        Replace
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setResumeUrl("");
                          setResumeFileName("");
                        }}
                        className="px-2.5 py-1 rounded-lg bg-red-500/20 text-red-300 text-[11px] font-mono cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 py-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingResume}
                      className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider cursor-pointer"
                    >
                      {isUploadingResume ? "Uploading CV..." : "Upload Resume (PDF, DOC, DOCX)"}
                    </button>
                    <p className="text-[11px] text-stone-400">
                      Max 10MB • PDF, DOC, DOCX, TXT, or Image
                    </p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.rtf,.png,.jpg,.jpeg,.webp"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </div>

              <input
                type="text"
                value={resumeUrl}
                onChange={(e) => {
                  setResumeUrl(e.target.value);
                  if (!resumeFileName) setResumeFileName("External Resume URL");
                }}
                placeholder="Or paste Google Drive / Portfolio resume URL..."
                className={inputClass + " text-xs font-mono"}
              />
            </div>

            {/* Dynamic Custom Questions */}
            {(formConfig.customQuestions || []).length > 0 && (
              <div className="space-y-4 pt-2 border-t border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C07DFF] font-bold block">
                  Role Screening Questions
                </span>

                {formConfig.customQuestions.map((q) => (
                  <div key={q.id}>
                    <label className={labelClass}>
                      {q.label} {q.required && <span className="text-[#C07DFF]">*</span>}
                    </label>

                    {q.type === "textarea" ? (
                      <textarea
                        rows={3}
                        required={q.required}
                        value={customAnswersMap[q.id] || ""}
                        onChange={(e) =>
                          setCustomAnswersMap((prev) => ({ ...prev, [q.id]: e.target.value }))
                        }
                        placeholder={q.placeholder || "Write your response..."}
                        className={inputClass}
                      />
                    ) : q.type === "select" ? (
                      <select
                        required={q.required}
                        value={customAnswersMap[q.id] || ""}
                        onChange={(e) =>
                          setCustomAnswersMap((prev) => ({ ...prev, [q.id]: e.target.value }))
                        }
                        className={inputClass + " bg-[#131118]"}
                      >
                        <option value="">Select an option...</option>
                        {(q.options || []).map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={q.type === "url" ? "url" : "text"}
                        required={q.required}
                        value={customAnswersMap[q.id] || ""}
                        onChange={(e) =>
                          setCustomAnswersMap((prev) => ({ ...prev, [q.id]: e.target.value }))
                        }
                        placeholder={q.placeholder || "Your answer..."}
                        className={inputClass}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Cover Letter */}
            {formConfig.askCoverLetter && (
              <div>
                <label className={labelClass}>Cover Note / Pitch</label>
                <textarea
                  rows={3}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Tell us what excites you about joining Venom Tech..."
                  className={inputClass}
                />
              </div>
            )}

            {/* Submit Controls */}
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-5 py-2.5 rounded-xl border border-white/15 text-xs font-mono uppercase text-stone-300 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isUploadingResume}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#C07DFF] via-[#7F8BFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase font-bold text-sm tracking-wider shadow-lg shadow-[#3BC8F6]/25 hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
              >
                <span>
                  {isSubmitting
                    ? "Submitting Application..."
                    : formConfig.submitButtonText || "Submit Application"}
                </span>
                <span>&rarr;</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

