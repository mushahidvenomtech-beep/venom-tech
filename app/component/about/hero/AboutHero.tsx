import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

export default function AboutHero() {
  return (
    <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]">
      <div className="flex items-center gap-2 mb-4">
        <AsteriskIcon className="w-5 h-5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
        <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
          About CREAT Studio
        </span>
      </div>

      <h1 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-[#111111] max-w-5xl mb-8">
        We Defy The Ordinary To Shape <span className="text-[#C07DFF]">Bold</span> Futures
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 pt-8 border-t border-stone-200">
        <p className="font-sans text-stone-700 text-lg sm:text-xl leading-relaxed">
          Founded on the principle that distinctive design creates unfair market advantages, CREAT* partners with visionary enterprises to produce award-winning brand systems and digital flagships.
        </p>
        <div className="flex flex-col justify-between gap-6">
          <p className="font-sans text-stone-600 text-base leading-relaxed">
            From our strategic brand architectural models to pixel-perfect Next.js web applications, our collective thrives at the intersection of brutalist honesty, kinetic motion, and technical precision.
          </p>
          <div className="flex gap-8 font-[family-name:var(--font-oswald)] uppercase text-sm font-semibold tracking-wider text-stone-900">
            <div><span className="text-[#C07DFF] text-2xl font-bold block">120+</span> Shipped Flagships</div>
            <div><span className="text-[#C07DFF] text-2xl font-bold block">14</span> Global Design Trophies</div>
            <div><span className="text-[#C07DFF] text-2xl font-bold block">100%</span> Independent</div>
          </div>
        </div>
      </div>
    </section>
  );
}

