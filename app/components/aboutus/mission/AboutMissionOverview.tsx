"use client";

import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const HIGHLIGHTS = [
  {
    title: "Creative Passion",
    desc: "Bold visual storytelling engineered to challenge mundane industry patterns.",
    icon: (
      <svg className="w-5 h-5 text-[#C07DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Clean Trends",
    desc: "Timeless grid structures and typography systems that outlast fleeting fads.",
    icon: (
      <svg className="w-5 h-5 text-[#C07DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: "Support 24/7",
    desc: "Direct partner availability and rapid iteration sprints across global hubs.",
    icon: (
      <svg className="w-5 h-5 text-[#C07DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function AboutMissionOverview() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]">
      {/* Top Split: Mission Statement vs 3 Capabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading & Intro */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 mb-4">
            <AsteriskIcon className="w-4 h-4 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
              About Venom Tech
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-6xl text-[#111111] tracking-tight leading-[0.95] mb-6">
            Empowering <span className="text-[#C07DFF]">Tomorrow</span> Through <span className="text-[#C07DFF]">Smart Innovation</span>
          </h2>

          <div className="font-sans text-stone-600 text-base sm:text-lg leading-relaxed space-y-3">
            <p>
              At Venom Tech, we blend cutting-edge technology with data-driven strategies to redefine digital innovation.
            </p>
            <p>
              Our mission is to empower businesses through smart automation, immersive AR experiences, and deep analytics &mdash; helping you make bold, informed decisions in a fast-moving digital world.
            </p>
          </div>
        </div>

        {/* Right Column: 3 Highlights & Learn More */}
        <div className="lg:col-span-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="p-5 bg-white border border-stone-200 hover:border-black transition-all duration-300 shadow-sm"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6]/10 border border-[#C07DFF]/20 flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <h4 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-xl text-[#111111] mb-1">
                  {item.title}
                </h4>
                <p className="font-sans text-stone-600 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

            {/* Learn More Button Box */}
            <div className="p-5 bg-black text-white flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#C07DFF] block mb-1">
                  Direct Impact
                </span>
                <div className="font-[family-name:var(--font-oswald)] uppercase font-bold text-lg text-white">
                  Discover Our Culture
                </div>
              </div>
              <a
                href="#team"
                className="inline-flex items-center gap-2 font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider text-[#C07DFF] hover:text-white transition-colors font-bold mt-4"
              >
                <span>Learn More</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

