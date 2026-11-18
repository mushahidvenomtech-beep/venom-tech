import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

export default function AiAutomationOverview() {
  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2] relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F9FF] border border-[#3BC8F6]/30 rounded-full">
          <AsteriskIcon className="w-3.5 h-3.5 text-[#0284C7]" color="#0284C7" strokeWidth={3} />
          <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#0284C7] font-semibold">
            Fundamentals
          </span>
        </div>

        <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#000000] tracking-tight leading-[1.02]">
          What Is <span className="text-brand-gradient">AI Automation?</span>
        </h2>

        <p className="font-sans text-stone-700 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
          AI automation uses artificial intelligence, machine learning and robotic process automation (RPA) to handle tasks that people usually do by hand, such as answering common questions, entering data, qualifying leads or generating reports. The result is faster work, fewer errors and a team freed up to focus on growth instead of repetitive admin.
        </p>

        <div className="pt-4 flex items-center justify-center gap-6 text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider text-stone-500 font-semibold">
          <span>Machine Learning</span>
          <span>&bull;</span>
          <span>RPA Execution</span>
          <span>&bull;</span>
          <span>Zero Human Error</span>
        </div>
      </div>
    </section>
  );
}

