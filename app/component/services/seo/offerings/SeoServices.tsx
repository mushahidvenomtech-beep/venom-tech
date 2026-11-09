import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import BorderGlow from "@/app/component/global/ui/BorderGlow";

const SERVICES = [
  {
    title: "Local Visibility",
    desc: "Dominate Google Maps and the coveted Local 3-Pack. We optimize your Google Business Profile, build localized citations, and target high-converting geo-specific search queries in Lahore.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    badgeColor: "from-[#E0F2FE] to-[#BAE6FD] border-[#38BDF8]/40 text-[#0284C7]",
    tag: "Local SEO & GMB",
  },
  {
    title: "Technical SEO",
    desc: "Ensure seamless search engine crawling and indexing. We eliminate 404 errors, resolve redirect chains, optimize Core Web Vitals, and implement rich Schema.org structured data.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badgeColor: "from-[#F5EBFF] to-[#E9D5FF] border-[#C07DFF]/40 text-[#7C3AED]",
    tag: "Core Web Vitals",
  },
  {
    title: "Organic Traffic",
    desc: "Capture high-commercial-intent search queries. We conduct semantic keyword clustering, optimize header hierarchies, refine on-page copy, and craft content engineered to rank position #1.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badgeColor: "from-[#FFE4E6] to-[#FECDD3] border-[#FB7185]/40 text-[#E11D48]",
    tag: "On-Page Optimization",
  },
  {
    title: "Authority",
    desc: "Build unstoppable domain authority through 100% white-hat link acquisition. We secure editorial placements on niche-relevant, high-DR media publications, podcasts, and digital PR outlets.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badgeColor: "from-[#FEF3C7] to-[#FDE68A] border-[#FBBF24]/40 text-[#D97706]",
    tag: "High-DA Backlinks",
  },
];

export default function SeoServices() {
  return (
    <section id="services" className="bg-gradient-to-b from-white via-[#F5EBFF]/25 to-white py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F9FF] border border-[#3BC8F6]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#0284C7]" color="#0284C7" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#0284C7] font-semibold">
              Search Excellence
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#000000] tracking-tight leading-[1.02]">
            Our SEO Services <span className="text-brand-gradient">in Lahore</span>
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            We offer custom search engine optimization strategies designed to drive sustainable organic traffic, elevate search rankings, and boost conversions for your business.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {SERVICES.map((item) => (
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

