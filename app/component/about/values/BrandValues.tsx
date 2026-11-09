import React from "react";

const VALUES = [
  {
    num: "01",
    title: "Radical Originality",
    desc: "We challenge conformity. In a digital landscape full of lookalikes, being unmistakable is the only true defensibility.",
  },
  {
    num: "02",
    title: "Relentless Craft",
    desc: "Micro-typography, mathematical layout balance, and silky interactions. We care deeply about the nuances nobody else notices.",
  },
  {
    num: "03",
    title: "Speed as a Feature",
    desc: "Built with modern architecture, Turbopack, and edge delivery to ensure lightning fast load times across every device.",
  },
  {
    num: "04",
    title: "Measurable Impact",
    desc: "Aesthetic brilliance must translate into business results. Every platform is designed to generate pipeline and engagement.",
  },
];

export default function BrandValues() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]">
      <div className="mb-16">
        <span className="font-[family-name:var(--font-oswald)] uppercase text-[#C07DFF] font-semibold tracking-wider text-sm">
          Our Philosophy
        </span>
        <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-6xl text-[#111111] mt-2">
          Core Pillars That Guide Everything We Create
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {VALUES.map((val) => (
          <div
            key={val.num}
            className="p-8 sm:p-10 bg-white/70 border border-stone-200 hover:border-black transition-all duration-300"
          >
            <span className="font-[family-name:var(--font-oswald)] text-[#C07DFF] text-3xl font-bold block mb-4">
              {val.num}
            </span>
            <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl sm:text-3xl text-[#111111] mb-3">
              {val.title}
            </h3>
            <p className="font-sans text-stone-600 text-base leading-relaxed">
              {val.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

