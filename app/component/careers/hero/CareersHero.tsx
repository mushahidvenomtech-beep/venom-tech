"use client";

import React from "react";
import Image from "next/image";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

export default function CareersHero() {
  return (
    <section className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] bg-slate-950 flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-10 overflow-hidden border-b border-[#E8E2F2]">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/careers-hero.webp"
          alt="Careers at Venom Tech - High-Tech Innovation"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950/90" />
      </div>

      {/* Floating Holographic Words (Matching Reference Layout) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10 hidden sm:flex items-center justify-between px-8 lg:px-20">
        <span className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#38BDF8]/20 tracking-wider">
          Training
        </span>
        <span className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#C07DFF]/20 tracking-wider">
          Development
        </span>
        <span className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#38BDF8]/20 tracking-wider">
          Skill
        </span>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-4xl mx-auto text-center">
        {/* Subtle Pill Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-[#E8F9FF]/10 backdrop-blur-md border border-[#3BC8F6]/30 rounded-full">
          <AsteriskIcon className="w-3.5 h-3.5 text-[#3BC8F6]" color="#3BC8F6" strokeWidth={3} />
          <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#3BC8F6] font-semibold">
            Careers &bull; Venom Tech IT Solution
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[0.98] mb-6">
          Join Our <span className="text-brand-gradient">Creative Digital Team</span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-stone-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          Empowering visionary builders, designers, and strategists to craft tomorrow&apos;s digital flagships and innovative technology solutions.
        </p>

        {/* Explore Open Positions CTA */}
        <div>
          <a
            href="#job-portal"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#C07DFF] via-[#7F8BFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase font-bold text-sm tracking-wider shadow-lg shadow-[#3BC8F6]/25 hover:opacity-95 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Explore Open Positions</span>
            <span className="text-white text-base">&darr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}

