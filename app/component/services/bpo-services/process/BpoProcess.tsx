import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const STEPS = [
  {
    step: "01",
    title: "Discovery Call",
    desc: "We begin by understanding your business goals, challenges, and operational needs. This step helps us align expectations and define the right direction from day one.",
  },
  {
    step: "02",
    title: "Custom Proposal",
    desc: "Based on your requirements, we create a tailored service plan that fits your objectives, timeline, and budget. Every detail is mapped out for smooth execution.",
  },
  {
    step: "03",
    title: "Team Setup",
    desc: "We assemble and prepare a dedicated team aligned with your standards and workflows. Training and onboarding ensure readiness before operations begin.",
  },
  {
    step: "04",
    title: "Execution",
    desc: "Services go live with continuous monitoring, communication, and performance tracking. We focus on quality, improvement, and scalable growth over time.",
  },
];

export default function BpoProcess() {
  return (
    <section id="process" className="bg-[#FAF9FD] py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F5EBFF] border border-[#C07DFF]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#7C3AED] font-semibold">
              How We Work
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#000000] tracking-tight leading-[1.02]">
            A Clear Path From <span className="text-brand-gradient">Planning to Growth</span>
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Our process is designed to make outsourcing simple, structured, and dependable. From initial discussion to long-term execution, we focus on clarity, collaboration, and consistent results.
          </p>
        </div>

        {/* 4 Process Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="group p-8 rounded-2xl bg-white border border-[#E8E2F2] hover:border-[#C07DFF] shadow-sm hover:shadow-xl hover:shadow-[#C07DFF]/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Number Badge */}
                <div className="w-12 h-12 rounded-xl bg-[#F5EBFF] border border-[#C07DFF]/30 text-[#7C3AED] font-[family-name:var(--font-oswald)] font-bold text-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#C07DFF] group-hover:text-white transition-all duration-300">
                  {item.step}
                </div>

                {/* Title */}
                <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-xl sm:text-2xl text-[#111111] tracking-tight leading-snug mb-3 group-hover:text-[#7C3AED] transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-stone-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Bottom decorative bar */}
              <div className="pt-6 mt-6 border-t border-[#F5EBFF] flex items-center justify-between text-xs font-semibold text-[#7C3AED]">
                <span className="font-[family-name:var(--font-oswald)] uppercase tracking-wider">
                  Stage {item.step}
                </span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

