import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import BorderGlow from "@/app/component/global/ui/BorderGlow";

const CHALLENGES = [
  {
    title: "Custom iOS & Android Apps",
    desc: "Engineered specifically for iOS (Swift) and Android (Kotlin) platforms to unlock maximum hardware speed, fluid 120Hz gesture response, and native OS capability integration.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    badgeColor: "from-[#E0F2FE] to-[#BAE6FD] border-[#38BDF8]/40 text-[#0284C7]",
    tag: "Native Architecture",
  },
  {
    title: "Cross-Platform Development",
    desc: "Cost-efficient, multi-platform codebases built with React Native and Flutter. Ship 2x faster to market while keeping 95%+ shared logic with uncompromising 60FPS fluid UI.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <rect x="2" y="3" width="12" height="15" rx="2" />
        <rect x="10" y="7" width="12" height="15" rx="2" />
      </svg>
    ),
    badgeColor: "from-[#F5EBFF] to-[#E9D5FF] border-[#C07DFF]/40 text-[#7C3AED]",
    tag: "React Native & Flutter",
  },
  {
    title: "UI/UX Design & Prototyping",
    desc: "Human-centric mobile experiences designed around proven user behavior patterns. From click-through wireframes in Figma to production design tokens and tactile micro-interactions.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badgeColor: "from-[#FFE4E6] to-[#FECDD3] border-[#FB7185]/40 text-[#E11D48]",
    tag: "Human-Centric UX",
  },
  {
    title: "App Maintenance & Support",
    desc: "Guaranteed SLA uptime, continuous OS compatibility updates for newly released iOS/Android versions, proactive crash telemetry, security patches, and performance optimizations.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badgeColor: "from-[#FEF3C7] to-[#FDE68A] border-[#FBBF24]/40 text-[#D97706]",
    tag: "24/7 SLA Support",
  },
];

export default function AppDevChallenges() {
  return (
    <section className="bg-gradient-to-b from-white via-[#F5EBFF]/25 to-white py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F9FF] border border-[#3BC8F6]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#0284C7]" color="#0284C7" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#0284C7] font-semibold">
              Strategic Solutions
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#000000] tracking-tight leading-[1.02]">
            How Our Mobile App Development Services{" "}
            <span className="text-brand-gradient">Solve Your Business Challenges</span>
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Custom mobile solutions engineered to overcome technical complexity, accelerate time-to-market, and deliver maximum user engagement and monetization.
          </p>
        </div>

        {/* 4 Solution Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {CHALLENGES.map((item) => (
            <BorderGlow
              key={item.title}
              borderRadius={18}
              backgroundColor="#ffffff"
              glowColor="200 95 65"
              glowRadius={32}
              colors={["#3BC8F6", "#C07DFF", "#0284C7"]}
              className="h-full"
            >
              <div className="group p-7 sm:p-8 bg-white h-full transition-all duration-300 flex flex-col justify-between">
                <div>
                  {/* Icon Container */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.badgeColor} border flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>

                  {/* Sub-tag */}
                  <span className="font-[family-name:var(--font-oswald)] text-[11px] uppercase tracking-wider font-semibold text-[#0284C7] block mb-2">
                    {item.tag}
                  </span>

                  {/* Title */}
                  <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-xl sm:text-2xl text-[#111111] tracking-tight leading-snug mb-3 group-hover:text-[#0284C7] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-stone-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom decorative bar */}
                <div className="pt-6 mt-6 border-t border-[#F5EBFF] flex items-center justify-between text-xs font-semibold text-[#0284C7]">
                  <span className="font-[family-name:var(--font-oswald)] uppercase tracking-wider">
                    Learn More
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}

