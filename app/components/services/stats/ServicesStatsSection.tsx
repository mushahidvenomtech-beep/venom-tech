import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const STATS_DATA = [
  { value: "110+", label: "Happy Clients", highlight: true },
  { value: "150+", label: "Projects Delivered" },
  { value: "85%", label: "Client Retention" },
  { value: "90+", label: "Campaigns Launched" },
];

export default function ServicesStatsSection() {
  return (
    <section className="bg-gradient-to-r from-white/90 via-[#F5EBFF]/60 to-[#E8F9FF]/60 backdrop-blur-sm py-10 sm:py-14 border-b border-[#E8E2F2]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 bg-[#F4E9FF] border border-[#C07DFF]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
              Track Record
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-[34px] sm:text-[44px] lg:text-[48px] text-[#000000] tracking-tight leading-[1.08]">
            Our <span className="text-brand-gradient">Impact</span> in Numbers
          </h2>
        </div>

        {/* 4 Stat Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E2F2]">
          {STATS_DATA.map((stat) => (
            <div key={stat.label} className="text-center px-4 pt-4 sm:pt-0">
              <div
                className={`font-[family-name:var(--font-oswald)] font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight mb-2 transition-colors cursor-default ${
                  stat.highlight ? "text-[#8B5CF6]" : "text-[#000000] hover:text-[#C07DFF]"
                }`}
              >
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

