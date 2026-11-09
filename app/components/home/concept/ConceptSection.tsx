import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const CAPABILITIES = [
  {
    num: "01",
    title: "Brand Strategy",
    desc: "Crafting distinct narratives and positioning frameworks that give your business unmistakable defensibility.",
    icon: (
      <svg className="w-6 h-6 text-[#C07DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "UI/UX Design",
    desc: "Designing intuitive, fluid, and conversion-optimized digital user journeys across web and mobile surfaces.",
    icon: (
      <svg className="w-6 h-6 text-[#C07DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Visual Identity",
    desc: "Developing custom typography hierarchies, design tokens, and modular guidelines that scale seamlessly.",
    icon: (
      <svg className="w-6 h-6 text-[#C07DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Development",
    desc: "Engineering lightning-fast Next.js platforms, interactive canvas visuals, and rock-solid headless APIs.",
    icon: (
      <svg className="w-6 h-6 text-[#C07DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

export default function ConceptSection() {
  return (
    <section
      id="concept"
      className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: 2x2 Capabilities Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.num}
              className="p-8 bg-white/90 backdrop-blur-sm border border-[#E8E2F2] hover:border-[#C07DFF] transition-all duration-300 group shadow-sm hover:shadow-[0_12px_30px_rgba(192,125,255,0.12)] rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-[#F4E9FF] border border-[#C07DFF]/20 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#C07DFF] group-hover:to-[#3BC8F6] rounded-xl transition-all duration-300">
                    <span className="group-hover:text-white transition-colors duration-300">
                      {cap.icon}
                    </span>
                  </div>
                  <span className="font-[family-name:var(--font-oswald)] font-bold text-lg text-stone-300 group-hover:text-[#C07DFF] transition-colors">
                    {cap.num}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl text-[#000000] mb-2 group-hover:text-[#C07DFF] transition-colors">
                  {cap.title}
                </h3>
                <p className="font-sans text-stone-600 text-sm leading-relaxed">
                  {cap.desc}
                </p>
              </div>

              <a
                href="/screens/services"
                className="pt-4 mt-6 border-t border-[#E8E2F2] flex items-center gap-1 text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider text-[#C07DFF] font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span>Learn Capability</span>
                <span>&rarr;</span>
              </a>
            </div>
          ))}
        </div>

        {/* Right Side: Editorial Statement & CTA */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#F4E9FF] border border-[#C07DFF]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
              Who We Are
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-6xl text-[#000000] tracking-tight leading-[0.95] mb-6">
            From Concept <br />
            <span className="text-brand-gradient">to Completion.</span>
          </h2>

          <p className="font-sans text-stone-600 text-base sm:text-lg leading-relaxed mb-6">
            We collaborate with early-stage pioneers and category leaders to conceptualize, design, and build digital platforms that captivate attention and define standards.
          </p>

          <p className="font-sans text-stone-500 text-sm leading-relaxed mb-8">
            Every line of code and pixel we craft is driven by intentionality. No fluff, no templates, just uncompromising creative execution.
          </p>

          <a
            href="/screens/aboutus"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white px-8 py-4 font-[family-name:var(--font-oswald)] font-semibold text-base uppercase tracking-wider transition-all duration-300 group shadow-lg shadow-[#C07DFF]/25 hover:opacity-95 rounded-xl"
          >
            <span>About Us</span>
            <span className="text-white group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}

