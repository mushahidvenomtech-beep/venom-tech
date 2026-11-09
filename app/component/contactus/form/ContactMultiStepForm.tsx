"use client";

import React, { useState, useEffect } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import StarBorder from "@/app/component/global/ui/StarBorder";
import Stepper, { Step } from "@/app/component/global/ui/Stepper";
import SwipeToast from "@/app/component/global/ui/SwipeToast";
import { Lead } from "@/lib/leads/types";

export interface ServiceOption {
  id: string;
  name: string;
  category: string;
  desc: string;
  icon: string;
}

export const AVAILABLE_SERVICES: ServiceOption[] = [
  {
    id: "ai-automation",
    name: "AI Automation",
    category: "AI & Agents",
    desc: "Autonomous workflow pipelines, custom agent swarms, and cognitive LLM automations.",
    icon: "⚡",
  },
  {
    id: "app-development",
    name: "App Development",
    category: "Mobile",
    desc: "Cross-platform mobile apps for iOS and Android built on React Native & Flutter.",
    icon: "📱",
  },
  {
    id: "web-development",
    name: "Web Development",
    category: "Web & Full-Stack",
    desc: "High-performance Next.js 16 web applications, luxury e-commerce, and SaaS platforms.",
    icon: "🌐",
  },
  {
    id: "graphic-designing",
    name: "Graphic Design & UI/UX",
    category: "Design",
    desc: "Design systems, brand guidelines, visual packaging, and intuitive UX wireframes.",
    icon: "🎨",
  },
  {
    id: "seo-services",
    name: "SEO Services",
    category: "Growth",
    desc: "Algorithmic search dominance, semantic indexation, and technical performance tuning.",
    icon: "📈",
  },
  {
    id: "advertising-agency",
    name: "Advertising Agency",
    category: "Performance Ads",
    desc: "High-ROAS performance ad campaigns across Meta, Google Ads, and TikTok.",
    icon: "📣",
  },
  {
    id: "bpo-services",
    name: "BPO Services",
    category: "Operations",
    desc: "Dedicated 24/7 inbound dispatch, client success pods, and technical support teams.",
    icon: "🎧",
  },
  {
    id: "e-commerce",
    name: "E-Commerce",
    category: "Commerce",
    desc: "Bespoke Shopify and headless commerce flagships engineered for conversion velocity.",
    icon: "🛒",
  },
  {
    id: "api-development",
    name: "API Development",
    category: "Backend",
    desc: "Microservices architectures, REST & GraphQL endpoints, webhooks, and secure gateways.",
    icon: "🔌",
  },
];

export interface ContactMultiStepFormProps {
  defaultService?: string;
  source?: string;
  variant?: "glass" | "glass-dark";
  compact?: boolean;
  className?: string;
  onSuccess?: (lead: Lead) => void;
}

export default function ContactMultiStepForm({
  defaultService,
  source = "contact_page",
  variant = "glass",
  compact = false,
  className = "",
  onSuccess,
}: ContactMultiStepFormProps) {
  const isDark = variant === "glass-dark";

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const initialServices = defaultService
    ? [defaultService]
    : ["AI Automation", "Web Development"];

  const [selectedServices, setSelectedServices] = useState<string[]>(initialServices);

  // Update selected service if defaultService changes
  useEffect(() => {
    if (defaultService && !selectedServices.includes(defaultService)) {
      setSelectedServices((prev) => [defaultService, ...prev.filter((s) => s !== defaultService)]);
    }
  }, [defaultService]);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formattedDate, setFormattedDate] = useState("Nov 2026");

  // React Bits SwipeToast State
  const [toast, setToast] = useState<{
    open: boolean;
    title: string;
    description: string;
    fuseColor: string;
    actionLabel?: string;
  }>({
    open: false,
    title: "",
    description: "",
    fuseColor: "#C07DFF",
  });

  useEffect(() => {
    setFormattedDate(
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);

  // Step 1 Validation
  const validateStep1 = () => {
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return false;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    if (!phone.trim()) {
      setErrorMessage("Please enter your contact phone number.");
      return false;
    }
    if (!company.trim()) {
      setErrorMessage("Please enter your company or business name.");
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  // Stepper navigation handler with validation
  const handleStepChange = (targetStep: number) => {
    if (targetStep === 1) {
      setErrorMessage(null);
      setCurrentStep(1);
    } else if (targetStep === 2) {
      if (!validateStep1()) return;
      setErrorMessage(null);
      setCurrentStep(2);
    } else if (targetStep === 3) {
      if (!validateStep1()) return;
      if (selectedServices.length === 0) {
        setErrorMessage("Please select at least one service to proceed.");
        return;
      }
      setErrorMessage(null);
      setCurrentStep(3);
    }
  };

  const goToStep = (step: 1 | 2 | 3, _direction?: "forward" | "backward") => {
    setErrorMessage(null);
    setCurrentStep(step);
  };

  const handleNextToServices = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      goToStep(2);
    }
  };

  const handleNextToConfirmation = () => {
    if (selectedServices.length === 0) {
      setErrorMessage("Please select at least one service to proceed.");
      return;
    }
    setErrorMessage(null);
    goToStep(3);
  };

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  // Final Submission
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim(),
          services: selectedServices,
          message: message.trim() || "Inquiry submission from glass door portal",
          source,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit inquiry. Please try again.");
      }

      setSubmittedLead(data.lead);
      setToast({
        open: true,
        title: "Inquiry Dispatched Successfully",
        description: `Lead #${data.lead.id} logged. Senior direction will review within SLA.`,
        fuseColor: "#C07DFF",
        actionLabel: "Dismiss",
      });
      if (onSuccess) {
        onSuccess(data.lead);
      }
    } catch (err: any) {
      const msg = err.message || "An unexpected error occurred.";
      setErrorMessage(msg);
      setToast({
        open: true,
        title: "Submission Failed",
        description: msg,
        fuseColor: "#ef4444",
        actionLabel: "Dismiss",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmittedLead(null);
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setMessage("");
    setSelectedServices(initialServices);
    setCurrentStep(1);
    setErrorMessage(null);
  };

  return (
    <div
      className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 ${
        isDark
          ? "bg-slate-950/65 backdrop-blur-2xl border border-white/15 text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.25),inset_0_-1px_1px_0_rgba(0,0,0,0.5)]"
          : "bg-white/70 backdrop-blur-2xl border border-white/80 text-stone-900 shadow-[0_25px_60px_-15px_rgba(192,125,255,0.18),0_15px_30px_-10px_rgba(59,200,246,0.12),inset_0_1px_2px_0_rgba(255,255,255,0.95),inset_0_-1px_1px_0_rgba(0,0,0,0.04)]"
      } ${className}`}
    >
      {/* ==================================================== */}
      {/* GLASS DOOR SPECULAR HIGHLIGHTS & LIGHT REFRACTION    */}
      {/* ==================================================== */}
      {/* Diagonal Frosted Glass Sheen */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl opacity-75 z-0"
        style={{
          background: isDark
            ? "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 40%, rgba(0,0,0,0) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 35%, rgba(255,255,255,0) 100%)",
        }}
      />
      {/* Ambient Radial Glass Glow */}
      <div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-40 z-0"
        style={{
          background: "radial-gradient(circle, rgba(192,125,255,0.35) 0%, rgba(59,200,246,0) 70%)",
        }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-40 z-0"
        style={{
          background: "radial-gradient(circle, rgba(59,200,246,0.3) 0%, rgba(192,125,255,0) 70%)",
        }}
      />

      {/* ==================================================== */}
      {/* ARCHITECTURAL GLASS DOOR HEADER                     */}
      {/* ==================================================== */}
      <div
        className={`relative z-10 px-5 sm:px-8 py-3.5 border-b flex items-center justify-between gap-3 ${
          isDark
            ? "bg-slate-950/80 backdrop-blur-xl border-white/10 text-white"
            : "bg-neutral-950/90 backdrop-blur-xl border-white/10 text-white"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] shadow-[0_0_8px_rgba(192,125,255,0.8)] animate-pulse" />
          <AsteriskIcon className="w-4 h-4 text-[#3BC8F6]" color="#3BC8F6" strokeWidth={3} />
          <span className="font-[family-name:var(--font-oswald)] uppercase font-bold text-xs sm:text-sm tracking-wider">
            PROJECT INQUIRY WORKFLOW
          </span>
        </div>

        <span className="text-[11px] font-mono text-[#3BC8F6] font-semibold uppercase tracking-wider">
          STEP 0{currentStep} / 03
        </span>
      </div>

      {/* Glass Door Handle Accent Indicator */}
      <div className="relative z-10 flex justify-center -mt-1 pointer-events-none">
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-transparent via-[#C07DFF]/50 to-transparent blur-[0.5px]" />
      </div>

      {/* Error banner */}
      {errorMessage && (
        <div className="relative z-10 m-4 sm:m-6 p-4 rounded-xl bg-red-500/10 backdrop-blur-md border border-red-500/30 text-red-600 dark:text-red-300 text-xs font-mono flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-base font-bold leading-none hover:opacity-75 cursor-pointer"
          >
            &times;
          </button>
        </div>
      )}

      {/* ==================================================== */}
      {/* SUCCESS CONFIRMATION SLIP STATE (FROSTED GLASS SLIP)  */}
      {/* ==================================================== */}
      {submittedLead ? (
        <div className="relative z-10 p-6 sm:p-10 text-center flex flex-col items-center animate-in zoom-in-95 duration-400">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C07DFF]/25 to-[#3BC8F6]/25 border border-white/40 backdrop-blur-md flex items-center justify-center mb-5 shadow-[0_10px_25px_rgba(59,200,246,0.25)]">
            <AsteriskIcon className="w-8 h-8 text-[#3BC8F6] animate-spin" color="#3BC8F6" strokeWidth={3} />
          </div>

          <span className="text-[11px] font-mono text-emerald-500 font-bold uppercase tracking-widest bg-emerald-500/15 border border-emerald-500/30 px-3.5 py-1 rounded-full mb-3 backdrop-blur-sm">
            ✓ INQUIRY DISPATCHED &bull; LEAD LOGGED
          </span>

          <h3
            className={`font-[family-name:var(--font-oswald)] uppercase font-extrabold text-2xl sm:text-4xl mb-2 ${
              isDark ? "text-white" : "text-[#111111]"
            }`}
          >
            Lead Generated Successfully
          </h3>
          <p
            className={`font-sans text-xs sm:text-sm max-w-md mb-6 ${
              isDark ? "text-stone-300" : "text-stone-600"
            }`}
          >
            Thank you, <strong className={isDark ? "text-white" : "text-black"}>{submittedLead.name}</strong>. Your project brief has been registered in real time with reference code{" "}
            <span className="font-mono font-bold text-[#C07DFF] bg-[#C07DFF]/10 px-2 py-0.5 rounded border border-[#C07DFF]/30">
              {submittedLead.id}
            </span>.
          </p>

          {/* Official Glass Confirmation Slip */}
          <div
            className={`w-full max-w-lg p-5 sm:p-6 rounded-2xl text-left space-y-4 mb-8 backdrop-blur-xl border ${
              isDark
                ? "bg-white/5 border-white/15 text-white"
                : "bg-white/60 border-stone-300/80 shadow-lg text-stone-900"
            }`}
          >
            <div
              className={`flex items-center justify-between border-b pb-3 ${
                isDark ? "border-white/10" : "border-stone-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3BC8F6]" />
                <span className="font-[family-name:var(--font-oswald)] uppercase font-bold text-xs tracking-wider">
                  VENOM TECH // OFFICIAL LEAD SLIP
                </span>
              </div>
              <span className="text-[11px] font-mono opacity-60">
                {new Date(submittedLead.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <span className="text-[10px] font-mono opacity-50 uppercase block">Client Name</span>
                <span className="font-bold block mt-0.5">{submittedLead.name}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono opacity-50 uppercase block">Company</span>
                <span className="font-bold block mt-0.5">{submittedLead.company}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono opacity-50 uppercase block">Email</span>
                <span className="font-mono block mt-0.5 truncate">{submittedLead.email}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono opacity-50 uppercase block">Contact Phone</span>
                <span className="font-mono block mt-0.5">{submittedLead.phone}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono opacity-50 uppercase block mb-1.5">
                Selected Disciplines ({submittedLead.services.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {submittedLead.services.map((svc) => (
                  <span
                    key={svc}
                    className="px-2.5 py-0.5 rounded-lg bg-[#3BC8F6]/15 text-[#0284C7] dark:text-[#38BDF8] border border-[#3BC8F6]/30 text-[10px] font-mono font-bold backdrop-blur-sm"
                  >
                    ✓ {svc}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`pt-2 border-t flex items-center justify-between text-[11px] font-mono opacity-80 ${
                isDark ? "border-white/10" : "border-stone-200"
              }`}
            >
              <span>
                Status: <strong className="text-emerald-500 font-bold">New (Pending Review)</strong>
              </span>
              <span>
                SLA: <strong>&lt; 2 Hours</strong>
              </span>
            </div>
          </div>

          <button
            onClick={handleResetForm}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider transition-all duration-300 shadow-lg shadow-[#C07DFF]/25 hover:opacity-95 hover:scale-105 active:scale-95 cursor-pointer"
          >
            Submit Another Project Inquiry &rarr;
          </button>
        </div>
      ) : (
        /* ==================================================== */
        /* REACT BITS STEPPER ANIMATED CONTAINER                */
        /* ==================================================== */
        <div className="relative z-10">
          <Stepper
            step={currentStep}
            onStepChange={handleStepChange}
            indicator="numbers"
            transition="slide"
            theme={isDark ? "dark" : "light"}
            accentColor="#C07DFF"
            frame={false}
            showFooter={false}
            width="100%"
            className="w-full"
            stepContainerClassName={`px-4 sm:px-8 pt-4 pb-2 border-b ${
              isDark ? "border-white/10 bg-white/[0.02]" : "border-stone-200/60 bg-stone-50/50"
            }`}
            contentClassName={compact ? "p-5 sm:p-6" : "p-6 sm:p-10"}
          >
            {/* ==================================================== */}
            {/* STEP 1: MAIN DETAILS (Name, Email, Phone, Company)   */}
            {/* ==================================================== */}
            <Step title="Identification" description="Contact details">
              <form onSubmit={handleNextToServices} className="space-y-5 sm:space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono text-[#C07DFF] uppercase tracking-wider font-semibold">
                      STEP 01 / 03 &bull; IDENTIFICATION
                    </span>
                  </div>
                  <h3
                    className={`font-[family-name:var(--font-oswald)] uppercase font-extrabold text-[32px] sm:text-[44px] tracking-tight leading-tight ${
                      isDark ? "text-white" : "text-[#111111]"
                    }`}
                  >
                    Tell Us About Your Project &amp; Business
                  </h3>
                  <p
                    className={`font-sans text-xs mt-1 ${
                      isDark ? "text-stone-300" : "text-stone-600"
                    }`}
                  >
                    Please provide your contact identity and enterprise details so we can tailor the scope.
                  </p>
                </div>

                {/* 2-Column Glass Door Inset Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label
                      className={`block font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider font-bold mb-2 ${
                        isDark ? "text-stone-300" : "text-stone-700"
                      }`}
                    >
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Test Lead / Alexander Vance"
                      className={`w-full px-4 py-3 rounded-xl font-sans text-sm backdrop-blur-md transition-all outline-none ${
                        isDark
                          ? "bg-white/5 border border-white/15 text-white placeholder-stone-500 focus:bg-white/10 focus:border-[#3BC8F6] focus:shadow-[0_0_0_3px_rgba(59,200,246,0.25)]"
                          : "bg-white/60 border border-stone-200/90 text-[#111111] placeholder-stone-400 focus:bg-white/95 focus:border-[#C07DFF] focus:shadow-[0_0_0_3px_rgba(192,125,255,0.2),inset_0_1px_2px_rgba(0,0,0,0.03)]"
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider font-bold mb-2 ${
                        isDark ? "text-stone-300" : "text-stone-700"
                      }`}
                    >
                      Business Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. testlead@venomtech.io"
                      className={`w-full px-4 py-3 rounded-xl font-sans text-sm backdrop-blur-md transition-all outline-none ${
                        isDark
                          ? "bg-white/5 border border-white/15 text-white placeholder-stone-500 focus:bg-white/10 focus:border-[#3BC8F6] focus:shadow-[0_0_0_3px_rgba(59,200,246,0.25)]"
                          : "bg-white/60 border border-stone-200/90 text-[#111111] placeholder-stone-400 focus:bg-white/95 focus:border-[#C07DFF] focus:shadow-[0_0_0_3px_rgba(192,125,255,0.2),inset_0_1px_2px_rgba(0,0,0,0.03)]"
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider font-bold mb-2 ${
                        isDark ? "text-stone-300" : "text-stone-700"
                      }`}
                    >
                      Contact / Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 1234567 / +1 800..."
                      className={`w-full px-4 py-3 rounded-xl font-sans text-sm backdrop-blur-md transition-all outline-none ${
                        isDark
                          ? "bg-white/5 border border-white/15 text-white placeholder-stone-500 focus:bg-white/10 focus:border-[#3BC8F6] focus:shadow-[0_0_0_3px_rgba(59,200,246,0.25)]"
                          : "bg-white/60 border border-stone-200/90 text-[#111111] placeholder-stone-400 focus:bg-white/95 focus:border-[#C07DFF] focus:shadow-[0_0_0_3px_rgba(192,125,255,0.2),inset_0_1px_2px_rgba(0,0,0,0.03)]"
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider font-bold mb-2 ${
                        isDark ? "text-stone-300" : "text-stone-700"
                      }`}
                    >
                      Company / Organization <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Venom Global Retail"
                      className={`w-full px-4 py-3 rounded-xl font-sans text-sm backdrop-blur-md transition-all outline-none ${
                        isDark
                          ? "bg-white/5 border border-white/15 text-white placeholder-stone-500 focus:bg-white/10 focus:border-[#3BC8F6] focus:shadow-[0_0_0_3px_rgba(59,200,246,0.25)]"
                          : "bg-white/60 border border-stone-200/90 text-[#111111] placeholder-stone-400 focus:bg-white/95 focus:border-[#C07DFF] focus:shadow-[0_0_0_3px_rgba(192,125,255,0.2),inset_0_1px_2px_rgba(0,0,0,0.03)]"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider font-bold mb-2 ${
                      isDark ? "text-stone-300" : "text-stone-700"
                    }`}
                  >
                    Project Scope / Brief Objectives
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your objectives, targets, or timeline..."
                    className={`w-full px-4 py-3 rounded-xl font-sans text-sm backdrop-blur-md transition-all outline-none resize-none ${
                      isDark
                        ? "bg-white/5 border border-white/15 text-white placeholder-stone-500 focus:bg-white/10 focus:border-[#3BC8F6] focus:shadow-[0_0_0_3px_rgba(59,200,246,0.25)]"
                        : "bg-white/60 border border-stone-200/90 text-[#111111] placeholder-stone-400 focus:bg-white/95 focus:border-[#C07DFF] focus:shadow-[0_0_0_3px_rgba(192,125,255,0.2),inset_0_1px_2px_rgba(0,0,0,0.03)]"
                    }`}
                  />
                </div>

                {/* Flip to Step 2 Action */}
                <div className="pt-2 flex items-center justify-end">
                  <StarBorder
                    as="button"
                    type="submit"
                    color="#3BC8F6"
                    trailColor="#C07DFF"
                    stars={2}
                    glow={0.8}
                    sparkle
                    radius={12}
                    backgroundColor="#000000"
                    textColor="#ffffff"
                    className="inline-flex items-center gap-2 px-8 py-3.5 font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider transition-all duration-300 shadow-lg shadow-black/20 hover:scale-105 active:scale-95 cursor-pointer group"
                  >
                    <span>Proceed to Services (Step 2)</span>
                    <span className="text-[#C07DFF] group-hover:text-white transition-colors text-sm font-normal">
                      &rarr;
                    </span>
                  </StarBorder>
                </div>
              </form>
            </Step>

            {/* ==================================================== */}
            {/* STEP 2: DYNAMIC SERVICES SELECTION (Multi-Select)   */}
            {/* ==================================================== */}
            <Step title="Services" description="Select disciplines">
              <div className="space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono text-[#3BC8F6] uppercase tracking-wider font-semibold block mb-1">
                      STEP 02 / 03 &bull; DELIVERABLES SELECTION
                    </span>
                    <h3
                      className={`font-[family-name:var(--font-oswald)] uppercase font-extrabold text-[32px] sm:text-[44px] tracking-tight leading-tight ${
                        isDark ? "text-white" : "text-[#111111]"
                      }`}
                    >
                      Choose Required Services
                    </h3>
                    <p
                      className={`font-sans text-xs mt-1 ${
                        isDark ? "text-stone-300" : "text-stone-600"
                      }`}
                    >
                      Select one or as many disciplines as you need for your project.
                    </p>
                  </div>

                  <span
                    className={`text-xs font-mono font-bold px-3 py-1 rounded-full shrink-0 border backdrop-blur-sm ${
                      isDark
                        ? "bg-white/10 text-white border-white/20"
                        : "bg-white/70 text-stone-900 border-stone-200"
                    }`}
                  >
                    {selectedServices.length} Selected
                  </span>
                </div>

                {/* Grid of Frosted Glass Service Tiles */}
                <div
                  className={`grid grid-cols-1 ${
                    compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
                  } gap-3`}
                >
                  {AVAILABLE_SERVICES.map((svc) => {
                    const isSelected = selectedServices.includes(svc.name);
                    return (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => toggleService(svc.name)}
                        className={`p-3.5 sm:p-4 text-left rounded-xl transition-all duration-200 flex flex-col justify-between cursor-pointer relative group backdrop-blur-md ${
                          isSelected
                            ? isDark
                              ? "bg-gradient-to-br from-[#C07DFF]/25 to-[#3BC8F6]/20 border border-[#3BC8F6] shadow-[0_8px_20px_rgba(59,200,246,0.3)] ring-1 ring-[#3BC8F6]"
                              : "bg-white/90 border border-[#C07DFF] shadow-[0_8px_25px_rgba(192,125,255,0.22)] ring-1 ring-[#C07DFF]"
                            : isDark
                            ? "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 text-white"
                            : "bg-white/50 border border-stone-200/90 hover:border-stone-400 hover:bg-white/80 text-stone-900"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xl">{svc.icon}</span>
                            <span
                              className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold border transition-colors ${
                                isSelected
                                  ? "bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white border-transparent shadow-sm"
                                  : isDark
                                  ? "bg-white/10 text-transparent border-white/20"
                                  : "bg-stone-100 text-transparent border-stone-300"
                              }`}
                            >
                              ✓
                            </span>
                          </div>

                          <h4
                            className={`font-[family-name:var(--font-oswald)] uppercase font-bold text-sm leading-tight mb-1 ${
                              isDark ? "text-white" : "text-[#111111]"
                            }`}
                          >
                            {svc.name}
                          </h4>
                          <p
                            className={`font-sans text-[11px] leading-snug line-clamp-2 ${
                              isDark ? "text-stone-300" : "text-stone-600"
                            }`}
                          >
                            {svc.desc}
                          </p>
                        </div>

                        <span
                          className={`text-[9px] font-mono uppercase tracking-wider mt-2.5 block ${
                            isDark ? "text-stone-400" : "text-stone-500"
                          }`}
                        >
                          {svc.category}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Flip Step 2 Controls */}
                <div
                  className={`pt-3 border-t flex items-center justify-between ${
                    isDark ? "border-white/10" : "border-stone-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => goToStep(1, "backward")}
                    className={`px-4 sm:px-5 py-2.5 rounded-xl border text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                      isDark
                        ? "border-white/20 text-stone-300 hover:border-white hover:text-white"
                        : "border-stone-300 text-stone-700 hover:border-black"
                    }`}
                  >
                    &larr; Back to Details
                  </button>

                  <StarBorder
                    as="button"
                    type="button"
                    onClick={handleNextToConfirmation}
                    color="#3BC8F6"
                    trailColor="#C07DFF"
                    stars={2}
                    glow={0.8}
                    sparkle
                    radius={12}
                    backgroundColor="#000000"
                    textColor="#ffffff"
                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider transition-all duration-300 shadow-lg shadow-black/20 hover:scale-105 active:scale-95 cursor-pointer group"
                  >
                    <span>View Confirmation Slip (Step 3)</span>
                    <span className="text-[#C07DFF] group-hover:text-white transition-colors text-sm font-normal">
                      &rarr;
                    </span>
                  </StarBorder>
                </div>
              </div>
            </Step>

            {/* ==================================================== */}
            {/* STEP 3: FINAL CONFIRMATION SLIP & SUBMIT            */}
            {/* ==================================================== */}
            <Step title="Confirmation" description="Review brief">
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <span className="text-[11px] font-mono text-emerald-500 uppercase tracking-wider font-semibold block mb-1">
                    STEP 03 / 03 &bull; FINAL CONFIRMATION SLIP
                  </span>
                  <h3
                    className={`font-[family-name:var(--font-oswald)] uppercase font-extrabold text-[32px] sm:text-[44px] tracking-tight leading-tight ${
                      isDark ? "text-white" : "text-[#111111]"
                    }`}
                  >
                    Review &amp; Authorize Brief
                  </h3>
                  <p
                    className={`font-sans text-xs mt-1 ${
                      isDark ? "text-stone-300" : "text-stone-600"
                    }`}
                  >
                    Please verify your lead details before generating the inquiry ticket.
                  </p>
                </div>

                {/* Frosted Glass Door Confirmation Slip */}
                <div
                  className={`p-5 sm:p-7 rounded-2xl relative shadow-xl backdrop-blur-2xl border space-y-5 ${
                    isDark
                      ? "bg-white/5 border-white/20 text-white"
                      : "bg-white/70 border-stone-300/80 text-stone-900"
                  }`}
                >
                  {/* Slip Header */}
                  <div
                    className={`flex items-start justify-between border-b pb-4 ${
                      isDark ? "border-white/10" : "border-stone-200"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 block">
                        PROJECT BRIEF SLIP
                      </span>
                      <h4 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-xl sm:text-2xl tracking-tight">
                        VENOM TECH IT SOLUTIONS
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono opacity-50 block">DATE</span>
                      <span className="text-xs font-mono font-bold">
                        {formattedDate}
                      </span>
                    </div>
                  </div>

                  {/* Section A: Client Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs font-sans">
                    <div
                      className={`p-3 rounded-xl border backdrop-blur-sm ${
                        isDark ? "bg-white/5 border-white/10" : "bg-white/80 border-stone-200"
                      }`}
                    >
                      <span className="text-[10px] font-mono opacity-50 uppercase tracking-wider block">
                        CLIENT / STAKEHOLDER
                      </span>
                      <strong className="text-sm font-bold block mt-0.5">
                        {name || "Test Lead"}
                      </strong>
                      <span className="opacity-75 block text-xs">{company || "Enterprise Partner"}</span>
                    </div>

                    <div
                      className={`p-3 rounded-xl border backdrop-blur-sm ${
                        isDark ? "bg-white/5 border-white/10" : "bg-white/80 border-stone-200"
                      }`}
                    >
                      <span className="text-[10px] font-mono opacity-50 uppercase tracking-wider block">
                        COMMUNICATION CHANNELS
                      </span>
                      <span className="font-mono block mt-0.5 truncate text-xs">
                        {email || "testlead@venomtech.io"}
                      </span>
                      <span className="font-mono opacity-75 block text-xs">
                        {phone || "+92 300 1234567"}
                      </span>
                    </div>
                  </div>

                  {/* Section B: Selected Disciplines */}
                  <div>
                    <span className="text-[10px] font-mono opacity-60 uppercase tracking-wider block mb-2">
                      AUTHORIZED DISCIPLINES ({selectedServices.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {selectedServices.map((svc) => (
                        <span
                          key={svc}
                          className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#C07DFF]/15 to-[#3BC8F6]/15 text-[#7C3AED] dark:text-[#38BDF8] border border-[#C07DFF]/30 text-xs font-mono font-bold flex items-center gap-1.5 backdrop-blur-sm"
                        >
                          <span className="text-emerald-500 font-bold">✓</span> {svc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Section C: Project Scope */}
                  {message.trim() && (
                    <div
                      className={`p-3 rounded-xl border text-xs font-sans backdrop-blur-sm ${
                        isDark ? "bg-white/5 border-white/10 text-stone-300" : "bg-white/80 border-stone-200 text-stone-700"
                      }`}
                    >
                      <span className="text-[10px] font-mono opacity-50 uppercase tracking-wider block mb-1">
                        SCOPE STATEMENT
                      </span>
                      <p className="italic leading-relaxed">{message}</p>
                    </div>
                  )}

                  {/* Section D: Guarantee Badge */}
                  <div
                    className={`pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono opacity-80 ${
                      isDark ? "border-white/10" : "border-stone-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>GUARANTEED MILESTONE QUALITY</span>
                    </div>
                    <span>RESPONSE SLA &lt; 24 HOURS</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div
                  className={`pt-3 border-t flex items-center justify-between ${
                    isDark ? "border-white/10" : "border-stone-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => goToStep(2, "backward")}
                    disabled={isSubmitting}
                    className={`px-4 sm:px-5 py-2.5 rounded-xl border text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                      isDark
                        ? "border-white/20 text-stone-300 hover:border-white hover:text-white"
                        : "border-stone-300 text-stone-700 hover:border-black"
                    }`}
                  >
                    &larr; Modify Services
                  </button>

                  <StarBorder
                    as="button"
                    type="button"
                    onClick={handleFinalSubmit}
                    disabled={isSubmitting}
                    color="#ffffff"
                    trailColor="#3BC8F6"
                    stars={2}
                    glow={0.9}
                    sparkle
                    radius={12}
                    backgroundColor="#8B5CF6"
                    textColor="#ffffff"
                    className="inline-flex items-center gap-2 px-8 py-3.5 font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider transition-all duration-300 shadow-xl shadow-[#C07DFF]/25 hover:opacity-95 hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <AsteriskIcon className="w-4 h-4 animate-spin" color="#FFFFFF" strokeWidth={3} />
                        <span>LOGGING IN DATABASE...</span>
                      </>
                    ) : (
                      <>
                        <span>AUTHORIZE &amp; DISPATCH INQUIRY</span>
                        <span>&rarr;</span>
                      </>
                    )}
                  </StarBorder>
                </div>
              </div>
            </Step>
          </Stepper>
        </div>
      )}

      {/* React Bits SwipeToast on Form Submission */}
      {toast.open && (
        <SwipeToast
          open={toast.open}
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          title={toast.title}
          description={toast.description}
          actionLabel={toast.actionLabel}
          onAction={() => setToast((prev) => ({ ...prev, open: false }))}
          background="#09090b"
          color="#f5f5f5"
          fuseColor={toast.fuseColor}
          width={380}
          radius={14}
          duration={5000}
          fuse="bottom"
          pauseOnHover
          closeButton
          icon={
            <span className="w-4 h-4 rounded-full bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] flex items-center justify-center text-[10px] text-white font-bold">
              ✓
            </span>
          }
        />
      )}
    </div>
  );
}
