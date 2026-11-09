import React from "react";
import Image from "next/image";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const REASONS = [
  "Flexible work options allowing you to work easily from your location.",
  "Dynamic and inspiring workdays with continuous learning.",
  "Career growth, mentorship, and great benefits.",
  "Inclusive and diverse culture where every voice matters.",
];

export default function CareersWhyChoose() {
  return (
    <section className="bg-white py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2] relative overflow-hidden">
      {/* Background Decorative Asterisk */}
      <div className="absolute top-1/2 -right-16 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block">
        <AsteriskIcon className="w-96 h-96 text-[#C07DFF]" color="#C07DFF" strokeWidth={1.5} />
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column: Heading, Copy & 4 Key Reasons */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F9FF] border border-[#3BC8F6]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#0284C7]" color="#0284C7" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#0284C7] font-semibold">
              Culture &amp; Impact
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#000000] tracking-tight leading-[1.02]">
            Why Choose{" "}
            <span className="text-[#0284C7]">Venom Tech</span>{" "}
            <span className="text-[#C07DFF]">IT Solution</span>{" "}
            for Your Next Career Shift?
          </h2>

          <div className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed space-y-3 pt-1">
            <p>
              At Venom Tech, we don&apos;t just offer jobs, we offer opportunities to grow, innovate, and make a real impact.
            </p>
            <p>
              From developers and designers to marketers and analysts, our team thrives on collaboration and creativity.
            </p>
            <p className="font-medium text-stone-800">
              If this sounds like you, here&apos;s why you should join our team:
            </p>
          </div>

          {/* 4 Checkmark Perks List */}
          <ul className="space-y-3.5 pt-2">
            {REASONS.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-3.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mt-0.5 shadow-sm">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="font-sans text-stone-700 text-sm sm:text-base leading-snug">
                  {reason}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Visual Collaboration Card */}
        <div className="lg:col-span-6">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200/80 bg-slate-950 aspect-[16/11] group">
            <Image
              src="/images/careers-team.webp"
              alt="Venom Tech Collaborative IT Team"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />

            {/* Glowing Corner Badge */}
            <div className="absolute bottom-5 left-5 right-5 sm:right-auto px-4 py-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/20 text-white flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider font-semibold">
                Venom Tech IT Solutions &bull; Remote &amp; On-Site
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

