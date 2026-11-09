import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

export default function ServicesPortfolioSection() {
  return (
    <section
      id="portfolio"
      className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto relative border-b border-[#E8E2F2] overflow-hidden"
    >
      {/* Giant Outlined Watermark Asterisk */}
      <div className="absolute top-4 right-0 pointer-events-none opacity-20 hidden md:block">
        <AsteriskIcon className="w-72 h-72 text-[#C07DFF]" color="#C07DFF" strokeWidth={1.5} />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="font-[family-name:var(--font-oswald)] font-extrabold uppercase text-5xl sm:text-7xl text-[#111111] tracking-tight">
              PORTFOLIO
            </h2>
            <AsteriskIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#C07DFF]" color="#C07DFF" strokeWidth={3.4} />
          </div>
          <p className="font-sans text-stone-600 text-base max-w-lg">
            A curated glimpse into our latest brand launches, e-commerce flagships, and spatial digital platforms.
          </p>
        </div>

        <a
          href="/screens/portfolio"
          className="inline-flex items-center gap-2.5 bg-black hover:bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white px-7 py-3.5 font-[family-name:var(--font-oswald)] uppercase text-sm tracking-wider font-semibold transition-all duration-300 self-start md:self-auto group"
        >
          <span>View All Projects</span>
          <span className="text-[#C07DFF] group-hover:text-white transition-colors">&rarr;</span>
        </a>
      </div>

      {/* 3 Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* Project 1 */}
        <div className="group bg-white border border-stone-200 hover:border-black transition-all duration-300 flex flex-col justify-between p-6 shadow-sm">
          <div className="w-full aspect-[4/3] bg-[#EAE6E1] p-4 flex items-center justify-center mb-6 overflow-hidden">
            <div className="w-[90%] aspect-[16/10] bg-[#1C1C1E] rounded-t-lg p-2 shadow-xl flex flex-col justify-between border border-stone-700">
              <div className="flex items-center gap-1.5 pb-1 border-b border-stone-800">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                <span className="text-[7px] text-stone-400 font-mono ml-2">aura-sound.io</span>
              </div>
              <div className="flex-1 bg-gradient-to-br from-stone-900 to-black p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-[family-name:var(--font-oswald)] font-bold text-white uppercase">AURA</span>
                  <span className="text-[8px] text-[#C07DFF] font-mono">Q1 LAUNCH</span>
                </div>
                <div className="text-center py-2">
                  <div className="text-xs font-[family-name:var(--font-oswald)] text-[#C07DFF] font-extrabold uppercase">
                    SPATIAL ACOUSTICS
                  </div>
                  <div className="text-[8px] text-stone-400">Pure immersive precision</div>
                </div>
                <div className="h-1 w-full bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6]" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C07DFF]">2026</span>
              <span className="text-xs font-sans uppercase tracking-wider text-stone-400">01</span>
            </div>
            <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl text-[#111111] group-hover:text-[#C07DFF] transition-colors">
              Aura Spatial Sound
            </h3>
            <p className="font-sans text-xs text-stone-500 uppercase tracking-wider mt-1">
              Next.js Flagship / UI &amp; UX
            </p>
          </div>
        </div>

        {/* Project 2 */}
        <div className="group bg-white border border-stone-200 hover:border-black transition-all duration-300 flex flex-col justify-between p-6 shadow-sm">
          <div className="w-full aspect-[4/3] bg-[#E5E1DC] p-4 flex items-center justify-center gap-4 mb-6 overflow-hidden">
            <div className="w-28 aspect-[3/4] bg-stone-900 shadow-xl flex flex-col items-center justify-between p-3 relative transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <div className="w-12 h-6 border-t-2 border-x-2 border-stone-700 rounded-t-full -mt-6" />
              <div className="font-[family-name:var(--font-oswald)] text-white text-xl font-extrabold tracking-tighter">
                BAG
              </div>
              <div className="text-[7px] text-stone-400 uppercase tracking-widest font-mono">
                STUDIO FORM
              </div>
            </div>

            <div className="w-28 aspect-[3/4] bg-stone-800 shadow-xl flex flex-col items-center justify-between p-3 relative transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <div className="w-12 h-6 border-t-2 border-x-2 border-stone-600 rounded-t-full -mt-6" />
              <div className="font-[family-name:var(--font-oswald)] text-[#C07DFF] text-xl font-extrabold tracking-tighter">
                BAG
              </div>
              <div className="text-[7px] text-stone-400 uppercase tracking-widest font-mono">
                COTTON 100%
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C07DFF]">2026</span>
              <span className="text-xs font-sans uppercase tracking-wider text-stone-400">02</span>
            </div>
            <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl text-[#111111] group-hover:text-[#C07DFF] transition-colors">
              Studio Form &amp; Space
            </h3>
            <p className="font-sans text-xs text-stone-500 uppercase tracking-wider mt-1">
              Brand Identity / Packaging
            </p>
          </div>
        </div>

        {/* Project 3 */}
        <div className="group bg-white border border-stone-200 hover:border-black transition-all duration-300 flex flex-col justify-between p-6 shadow-sm">
          <div className="w-full aspect-[4/3] bg-gradient-to-br from-stone-900 to-black p-6 flex flex-col justify-between mb-6 overflow-hidden relative">
            <div className="absolute top-2 right-2 font-[family-name:var(--font-oswald)] font-extrabold text-7xl text-stone-800 pointer-events-none select-none">
              ISS
            </div>

            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C07DFF]">ARCHIVE</span>
              <AsteriskIcon className="w-5 h-5 text-white/50 group-hover:text-[#C07DFF] group-hover:rotate-45 transition-all duration-300" color="currentColor" strokeWidth={3} />
            </div>

            <div className="relative z-10">
              <div className="font-[family-name:var(--font-oswald)] font-extrabold text-3xl uppercase text-white tracking-tight">
                VERVE KINETIC
              </div>
              <div className="font-sans text-xs text-stone-400 mt-1">
                Spatial typography &amp; interactive 3D platform
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C07DFF]">2025</span>
              <span className="text-xs font-sans uppercase tracking-wider text-stone-400">03</span>
            </div>
            <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl text-[#111111] group-hover:text-[#C07DFF] transition-colors">
              Verve Kinetic Type
            </h3>
            <p className="font-sans text-xs text-stone-500 uppercase tracking-wider mt-1">
              Spatial Motion / 3D Canvas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

