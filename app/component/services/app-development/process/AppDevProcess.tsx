import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

export default function AppDevProcess() {
  return (
    <section id="process" className="bg-gradient-to-b from-[#F5EBFF]/30 via-white to-white py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F9FF] border border-[#3BC8F6]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#0284C7]" color="#0284C7" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#0284C7] font-semibold">
              Execution Roadmap
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#000000] tracking-tight leading-[1.02]">
            Our App Development <span className="text-brand-gradient">Process</span>
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            A battle-tested 5-stage lifecycle engineered to take your mobile concept from discovery and UI/UX design to App Store launch and continuous scaling.
          </p>
        </div>

        {/* Tree Flowchart Diagram */}
        <div className="max-w-4xl mx-auto relative">
          {/* Level 1: Root Node (Discovery & Strategy) */}
          <div className="flex justify-center mb-10 relative z-10">
            <div className="w-full max-w-md p-6 sm:p-7 rounded-2xl bg-white border-2 border-[#C07DFF] shadow-lg shadow-[#C07DFF]/15 text-center transition-transform hover:scale-[1.02]">
              <span className="px-3 py-1 rounded-full bg-[#F5EBFF] text-[#C07DFF] font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider mb-2 inline-block">
                Stage 01 &bull; Blueprint
              </span>
              <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-xl sm:text-2xl text-[#111111] mb-2">
                Discovery &amp; Strategy
              </h3>
              <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">
                Defining target users, monetization models, product specification, system architecture, and agile sprint milestones.
              </p>
            </div>
          </div>

          {/* Vertical Stem from Level 1 */}
          <div className="hidden sm:block w-0.5 h-8 bg-gradient-to-b from-[#C07DFF] to-[#3BC8F6] mx-auto -mt-6 mb-0" />

          {/* Horizontal Split Line */}
          <div className="hidden sm:block w-3/4 mx-auto h-0.5 bg-[#3BC8F6]/40 relative mb-8">
            <div className="absolute left-0 top-0 w-0.5 h-6 bg-[#3BC8F6]/60" />
            <div className="absolute right-0 top-0 w-0.5 h-6 bg-[#3BC8F6]/60" />
          </div>

          {/* Level 2: Design & Development */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 mb-10 relative z-10">
            {/* Left: UI/UX Design */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border-2 border-[#3BC8F6]/60 shadow-md hover:border-[#3BC8F6] transition-all text-center group">
              <span className="px-3 py-1 rounded-full bg-[#E8F9FF] text-[#0284C7] font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider mb-2 inline-block">
                Stage 02 &bull; Prototype
              </span>
              <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-lg sm:text-xl text-[#111111] mb-2 group-hover:text-[#0284C7] transition-colors">
                UI/UX Design
              </h3>
              <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">
                Crafting intuitive wireframes, interactive Figma prototypes, and design tokens built for responsive mobile ergonomics.
              </p>
            </div>

            {/* Right: Development */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border-2 border-[#3BC8F6]/60 shadow-md hover:border-[#3BC8F6] transition-all text-center group">
              <span className="px-3 py-1 rounded-full bg-[#E8F9FF] text-[#0284C7] font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider mb-2 inline-block">
                Stage 03 &bull; Engineering
              </span>
              <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-lg sm:text-xl text-[#111111] mb-2 group-hover:text-[#0284C7] transition-colors">
                Development
              </h3>
              <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">
                Writing clean, tested code in Swift, Kotlin, Flutter, or React Native connected to scalable cloud APIs and databases.
              </p>
            </div>
          </div>

          {/* Vertical Connectors to Level 3 */}
          <div className="hidden sm:grid grid-cols-2 gap-12 w-full mx-auto -mt-6 mb-4">
            <div className="w-0.5 h-6 bg-[#3BC8F6]/60 mx-auto" />
            <div className="w-0.5 h-6 bg-[#C07DFF]/60 mx-auto" />
          </div>

          {/* Level 3: Testing & Deployment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 relative z-10">
            {/* Left: Testing & QA */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border-2 border-[#C07DFF]/60 shadow-md hover:border-[#C07DFF] transition-all text-center group">
              <span className="px-3 py-1 rounded-full bg-[#F5EBFF] text-[#C07DFF] font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider mb-2 inline-block">
                Stage 04 &bull; Verification
              </span>
              <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-lg sm:text-xl text-[#111111] mb-2 group-hover:text-[#C07DFF] transition-colors">
                Testing &amp; QA
              </h3>
              <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">
                Automated regression suites, device matrix testing across iOS/Android hardware, security audits, and load profiling.
              </p>
            </div>

            {/* Right: Deployment & Launch */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border-2 border-[#C07DFF]/60 shadow-md hover:border-[#C07DFF] transition-all text-center group">
              <span className="px-3 py-1 rounded-full bg-[#F5EBFF] text-[#C07DFF] font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider mb-2 inline-block">
                Stage 05 &bull; Go-Live
              </span>
              <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-lg sm:text-xl text-[#111111] mb-2 group-hover:text-[#C07DFF] transition-colors">
                Deployment &amp; Launch
              </h3>
              <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">
                App Store &amp; Google Play Store compliance, ASO keyword optimization, release telemetry, and 24/7 post-launch maintenance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

