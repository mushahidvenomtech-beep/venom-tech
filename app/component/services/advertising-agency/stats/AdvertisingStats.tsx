import React from "react";

const STATS = [
  {
    value: "1,000+",
    label: "Campaigns Launched",
    desc: "Across Meta, Google, TikTok & LinkedIn",
  },
  {
    value: "2,500+",
    label: "Ad Creatives Produced",
    desc: "High-CTR motion, video reels & display ads",
  },
  {
    value: "87%",
    label: "Average ROAS Uplift",
    desc: "Measurable increase in return on advertising spend",
  },
  {
    value: "100+",
    label: "Brand Partnerships",
    desc: "Startups to established corporate enterprises",
  },
];

export default function AdvertisingStats() {
  return (
    <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-white pt-10 pb-16 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-8 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E8E2F2] shadow-sm hover:shadow-xl hover:border-[#3BC8F6]/50 transition-all duration-300 text-center group"
            >
              <div className="font-[family-name:var(--font-oswald)] font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-gradient tracking-tight mb-2 group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-base sm:text-lg text-[#111111] tracking-wide mb-1">
                {stat.label}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

