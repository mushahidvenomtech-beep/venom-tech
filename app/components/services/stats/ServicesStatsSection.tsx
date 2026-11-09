import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const STATS_DATA = [
  { value: "48%", label: "Client Revenue Uplift" },
  { value: "+31", label: "Awards for Excellence" },
  { value: "0.9k", label: "Global Brand Launches" },
  { value: "228+", label: "Finished Projects This Year" },
];

export default function ServicesStatsSection() {
  return (
    <section className="bg-gradient-to-r from-white/90 via-[#F5EBFF]/60 to-[#E8F9FF]/60 backdrop-blur-sm py-10 sm:py-12 border-b border-[#E8E2F2]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 mb-2 px-3 py-1 bg-[#F4E9FF] border border-[#C07DFF]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
              Track Record
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl text-[#000000] tracking-tight">
            Our <span className="text-brand-gradient">Impact</span> in Numbers and Results.
          </h2>
        </div>

        {/* 4 Stat Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E2F2]">
          {STATS_DATA.map((stat) => (
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
      </div>
    </section>
  );
}

