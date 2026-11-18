import React from "react";

export default function AiAutomationCallout() {
  return (
    <section className="bg-gradient-to-r from-slate-950 via-[#181126] to-slate-950 py-16 sm:py-20 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2] text-white relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#C07DFF]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-[#3BC8F6]/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
          Want to Talk to an <span className="text-brand-gradient">AI Automation Expert?</span>
        </h2>

        <p className="font-sans text-stone-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Book a free feasibility review. We&apos;ll map your current processes, show what can be automated and estimate the time and money you&apos;ll save.
        </p>

        <div className="pt-2">
          <a
            href="tel:+923214774200"
            className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#C07DFF] via-[#7F8BFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase font-bold text-sm sm:text-base tracking-wider shadow-xl shadow-[#3BC8F6]/30 hover:opacity-95 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Call +92 321 4774200</span>
          </a>
        </div>
      </div>
    </section>
  );
}
