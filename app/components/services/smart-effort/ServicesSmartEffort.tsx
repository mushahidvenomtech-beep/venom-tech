import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const SKILLS = [
  { name: "Creative Strategy & Brand Architecture", percentage: 95 },
  { name: "Digital Product & UI/UX Development", percentage: 92 },
  { name: "Full-Stack Next.js Engineering", percentage: 98 },
];

export default function ServicesSmartEffort() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Layered Visual Cards with +40k Badge */}
        <div className="lg:col-span-6 relative flex justify-center">
          <div className="relative w-full max-w-[460px] aspect-[4/5]">
            {/* Primary Dark Portrait Card */}
            <div className="w-[85%] h-[90%] bg-black border-2 border-black overflow-hidden shadow-2xl relative">
              <svg viewBox="0 0 380 460" className="w-full h-full object-cover" fill="none">
                <rect width="380" height="460" fill="#0C0D0E" />
                <circle cx="190" cy="180" r="140" fill="#1C1E22" />
                <ellipse cx="190" cy="150" rx="38" ry="48" fill="#B37D56" />
                <path d="M 140 185 L 240 185 L 260 460 L 120 460 Z" fill="#F0F0F0" />
                <path d="M 145 150 C 145 100 235 100 235 150 Z" fill="#140D07" />
              </svg>

              <div className="absolute top-4 left-4 text-white/50 font-mono text-[11px] uppercase tracking-widest">
                CREAT / STUDIO
              </div>
            </div>

            {/* Overlapping White Studio Card (Bottom Right) */}
            <div className="absolute bottom-0 right-0 w-[55%] h-[50%] bg-white border-2 border-black p-4 shadow-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider text-stone-500 font-bold">
                  Technical Precision
                </span>
                <AsteriskIcon className="w-4 h-4 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
              </div>

              <div className="h-16 bg-stone-100 border border-stone-200 flex items-center justify-center">
                <span className="font-[family-name:var(--font-oswald)] uppercase text-stone-400 font-bold tracking-widest text-xs">
                  Design &bull; Motion &bull; Code
                </span>
              </div>

              <div className="font-sans text-[11px] text-stone-600">
                Performance-driven architecture that converts visitors into customers.
              </div>
            </div>

            {/* Orange "+40k" Floating Badge */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white px-5 py-3.5 border-2 border-black shadow-xl flex items-center gap-3">
              <div className="font-[family-name:var(--font-oswald)] font-extrabold text-3xl leading-none">
                +40k
              </div>
              <div className="font-[family-name:var(--font-oswald)] uppercase text-[11px] tracking-wider font-semibold leading-tight text-white/90">
                Clients Satisfied<br />Worldwide
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Copy & Progress Bars */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 mb-4">
            <AsteriskIcon className="w-4 h-4 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
              Why Choose Us
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-6xl text-[#111111] tracking-tight leading-[0.95] mb-6">
            We Work <span className="text-stone-400 font-light">Smart,</span><br />
            Effort That <span className="text-[#C07DFF]">Counts.</span>
          </h2>

          <p className="font-sans text-stone-600 text-base sm:text-lg leading-relaxed mb-8">
            Success in competitive markets requires both creative audacity and technical discipline. We build high-conviction brands that resonate culturally and perform commercially.
          </p>

          {/* Progress Bars */}
          <div className="space-y-6 pt-4 border-t border-stone-200 mb-8">
            {SKILLS.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between font-[family-name:var(--font-oswald)] uppercase text-sm font-semibold tracking-wider text-[#111111] mb-2">
                  <span>{skill.name}</span>
                  <span className="text-[#C07DFF] font-bold">{skill.percentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-stone-200 overflow-hidden">
                  <div
                    className="h-full bg-black transition-all duration-1000 ease-out"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 pt-2">
            <a
              href="/screens/contactus"
              className="inline-flex items-center gap-3 bg-black hover:bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white px-8 py-4 font-[family-name:var(--font-oswald)] font-semibold text-base uppercase tracking-wider transition-all duration-300 group shadow-md"
            >
              <span>Explore Engagement</span>
              <span className="text-[#C07DFF] group-hover:text-white transition-colors">&rarr;</span>
            </a>
            <span className="font-sans text-xs text-stone-500 uppercase tracking-wider font-semibold">
              Transparent Milestones
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

