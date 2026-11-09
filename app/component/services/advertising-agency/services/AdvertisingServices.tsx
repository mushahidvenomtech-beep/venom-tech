import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import BorderGlow from "@/app/component/global/ui/BorderGlow";

const SERVICES = [
  {
    title: "Digital Advertising",
    desc: "Multi-channel paid campaigns across Meta (Facebook & Instagram), Google Search & Shopping, YouTube, TikTok, and LinkedIn tailored to capture market intent.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badgeColor: "from-[#E0F2FE] to-[#BAE6FD] border-[#38BDF8]/40 text-[#0284C7]",
    tag: "Multi-Channel Paid",
  },
  {
    title: "Precision Targeting",
    desc: "Deep behavioral audience segmentation, dynamic retargeting funnels, and high-value Lookalike modeling that place your message before ready-to-buy decision makers.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    badgeColor: "from-[#F5EBFF] to-[#E9D5FF] border-[#C07DFF]/40 text-[#7C3AED]",
    tag: "Audience Modeling",
  },
  {
    title: "Strategy & Creative",
    desc: "High-impact direct-response video hooks, thumb-stopping carousel cards, and psychological copywriting crafted to outconvert competing ads.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badgeColor: "from-[#FFE4E6] to-[#FECDD3] border-[#FB7185]/40 text-[#E11D48]",
    tag: "Direct-Response Creative",
  },
  {
    title: "Media Buying & Planning",
    desc: "Continuous algorithmic bid optimization, budget pacing, dayparting calibration, and automated anomaly guards that prevent ad spend waste.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badgeColor: "from-[#FEF3C7] to-[#FDE68A] border-[#FBBF24]/40 text-[#D97706]",
    tag: "ROAS Optimization",
  },
];

export default function AdvertisingServices() {
  return (
    <section id="services" className="bg-gradient-to-b from-white via-[#F5EBFF]/25 to-white py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F9FF] border border-[#3BC8F6]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#0284C7]" color="#0284C7" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#0284C7] font-semibold">
              Performance Advertising
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#000000] tracking-tight leading-[1.02]">
            Our Advertising <span className="text-brand-gradient">Services</span>
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Customized full-funnel advertising solutions designed to maximize brand reach, accelerate customer acquisition, and scale revenue with predictable unit economics.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {SERVICES.map((item) => (
            <BorderGlow
              key={item.title}
              borderRadius={18}
              backgroundColor="#ffffff"
              glowColor="275 80 75"
              glowRadius={32}
              colors={["#C07DFF", "#3BC8F6", "#9333ea"]}
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

