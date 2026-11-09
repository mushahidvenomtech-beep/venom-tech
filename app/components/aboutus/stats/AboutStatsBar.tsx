import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const ABOUT_STATS = [
  { value: "95%", label: "Client Satisfaction" },
  { value: "+62", label: "Completed Projects" },
  { value: "1.8k", label: "Growing Follower Base" },
  { value: "445+", label: "International Team Members" },
];

export default function AboutStatsBar() {
  return (
    <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 mb-2 px-3 py-1 bg-[#F4E9FF] border border-[#C07DFF]/30 rounded-full">
          <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
          <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
            By The Numbers
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl text-[#000000] tracking-tight">
          Our <span className="text-brand-gradient">Impact</span> in Numbers and Results.
        </h2>
      </div>

      {/* 4 Stat Columns */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E2F2]">
        {ABOUT_STATS.map((stat) => (
          <div key={stat.label} className="text-center px-4 pt-4 sm:pt-0">
            <div className="font-[family-name:var(--font-oswald)] font-extrabold text-5xl sm:text-6xl lg:text-7xl text-[#000000] tracking-tight mb-2 hover:text-[#C07DFF] transition-colors cursor-default">
              {stat.value}
            </div>
            <div className="font-sans text-xs sm:text-sm uppercase tracking-wider text-stone-600 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

