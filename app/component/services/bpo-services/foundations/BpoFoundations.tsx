import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import BorderGlow from "@/app/component/global/ui/BorderGlow";

const FOUNDATIONS = [
  {
    title: "Focus",
    desc: "Your business priorities come first in everything we do. We work closely with you to understand objectives and deliver solutions that support continuous progress.",
    cardBg: "bg-[#EFF8FF] border-[#BAE6FD]/80 text-[#0369A1]",
  },
  {
    title: "Integrity",
    desc: "We believe strong partnerships are built on honesty and responsibility. Our teams operate with clarity and follow through on every commitment with care and precision.",
    cardBg: "bg-[#F0FDF4] border-[#BBF7D0]/80 text-[#15803D]",
  },
  {
    title: "Agility",
    desc: "We adjust quickly to new challenges and evolving requirements. Our teams remain responsive and prepared to support changing business demands without disruption.",
    cardBg: "bg-[#FAF5FF] border-[#E9D5FF]/80 text-[#7E22CE]",
  },
  {
    title: "Quality",
    desc: "We maintain high standards across service delivery and performance. Continuous improvement ensures dependable results and long-lasting value for our clients.",
    cardBg: "bg-[#F5F3FF] border-[#DDD6FE]/80 text-[#4338CA]",
  },
];

export default function BpoFoundations() {
  return (
    <section className="bg-gradient-to-b from-white via-[#F5EBFF]/20 to-white py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F5EBFF] border border-[#C07DFF]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#7C3AED] font-semibold">
              What Drives Our Work
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#000000] tracking-tight leading-[1.02]">
            Foundations That Shape <span className="text-brand-gradient">How We Work</span>
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Our approach is guided by principles that define how we support our clients every day. These values influence our decisions, strengthen collaboration, and help us deliver reliable outcomes over the long term.
          </p>
        </div>

        {/* 4 Foundation Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {FOUNDATIONS.map((item) => (
            <BorderGlow
              key={item.title}
              borderRadius={18}
              backgroundColor="#ffffff"
              glowColor="275 80 75"
              glowRadius={30}
              colors={["#C07DFF", "#3BC8F6", "#9333ea"]}
              className="h-full"
            >
              <div
                className={`p-8 rounded-2xl border ${item.cardBg} h-full transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl tracking-tight mb-4 text-slate-900">
                    {item.title}
                  </h3>
                  <p className="font-sans text-stone-700 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-black/5 flex items-center gap-2 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-current opacity-60" />
                  <span className="font-[family-name:var(--font-oswald)] uppercase tracking-wider opacity-80">
                    Core Pillar
                  </span>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}

