import React from "react";

const PHASES = [
  { step: "01", title: "Discovery & Immersion", desc: "Unearthing market positioning, stakeholder goals, and technical requirements." },
  { step: "02", title: "Concept & Prototyping", desc: "Rapid visual explorations, moodboards, and interactive layout prototypes." },
  { step: "03", title: "Engineering & Craft", desc: "Rigorous code development with Next.js, responsive testing, and performance audits." },
  { step: "04", title: "Launch & Evolution", desc: "Flawless deployment, analytics tracking, and continuous design support." },
];

export default function ProcessTimeline() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]">
      <div className="mb-16">
        <span className="font-[family-name:var(--font-oswald)] uppercase text-[#C07DFF] font-semibold tracking-wider text-sm">
          Our Process
        </span>
        <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-6xl text-[#111111] mt-2">
          How We Bring Ideas To Life
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PHASES.map((p) => (
          <div key={p.step} className="p-6 bg-white/70 border border-stone-200">
            <span className="font-[family-name:var(--font-oswald)] text-[#C07DFF] text-2xl font-bold block mb-3">
              Phase {p.step}
            </span>
            <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-xl text-[#111111] mb-2">
              {p.title}
            </h3>
            <p className="font-sans text-xs text-stone-600 leading-relaxed">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

