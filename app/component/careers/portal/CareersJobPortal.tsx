import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

export default function CareersJobPortal() {
  return (
    <section id="job-portal" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto">
      {/* Outer Glow Wrapper */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        {/* Ambient Corner Flare */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C07DFF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3BC8F6]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Bronze / Metallic Dark Gradient Card Container (Matching Reference Design) */}
        <div className="relative bg-gradient-to-br from-[#2D1B0E] via-[#3D2513] to-[#1C1108] border-2 border-[#8A5A2B]/40 rounded-3xl p-8 sm:p-14 lg:p-20 text-center text-white">
          {/* Subtle Top Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-black/40 backdrop-blur-md border border-[#C6865B]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#E8B291]" color="#E8B291" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#E8B291] font-semibold">
              Live Hiring Opportunities
            </span>
          </div>

          {/* Heading (Matching Verbatim: Job Available Portal) */}
          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-4">
            Job Available Portal
          </h2>

          {/* Subtitle (Matching Verbatim) */}
          <p className="font-sans text-stone-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            Work with top-tier talent, solve real-world problems, and build digital products that matter.
          </p>

          {/* Notice Box: No Openings Available at the Moment (Matching Verbatim) */}
          <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-inner mb-8">
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

          {/* Proactive Application Callout */}
          <div className="max-w-md mx-auto pt-2">
            <p className="font-sans text-xs sm:text-sm text-stone-300 mb-5">
              Think you&apos;d be a great fit anyway? We&apos;d love to hear from you. Send your resume and portfolio directly to us.
            </p>

            <a
              href="mailto:info@venomtech.pk?subject=General%20Career%20Application%20-%20Venom%20Tech"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#C07DFF] via-[#7F8BFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase font-bold text-sm tracking-wider shadow-lg shadow-[#3BC8F6]/20 hover:opacity-95 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Send Your Resume</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

