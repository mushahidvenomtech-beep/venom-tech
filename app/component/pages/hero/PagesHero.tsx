import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

export default function PagesHero() {
  return (
    <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]">
      <div className="flex items-center gap-2 mb-4">
        <AsteriskIcon className="w-5 h-5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
        <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
          Studio Pages & Resources
        </span>
      </div>

      <h1 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-[#111111] max-w-5xl mb-8">
        Transparent Pricing & <span className="text-[#C07DFF]">Partnership</span> Models
      </h1>

      <p className="font-sans text-stone-700 text-lg sm:text-xl leading-relaxed max-w-3xl">
        Clear deliverables, no hidden surprises, and guaranteed senior creative direction on every milestone.
      </p>
    </section>
  );
}

