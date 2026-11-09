import React from "react";
import Image from "next/image";
import Link from "next/link";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const REASONS = [
  "Builds immediate trust and brand credibility across all customer touchpoints.",
  "Differentiates your business from competitors with bold, bespoke visual identity.",
  "Amplifies social media click-through rates, ad conversions, and brand recall.",
  "Provides pixel-perfect assets optimized for high-resolution print and retina screens.",
  "Delivers comprehensive brand style guides ensuring permanent visual consistency.",
];

export default function GraphicDesignWhyNeed() {
  return (
    <section className="bg-white py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2] relative overflow-hidden">
      {/* Background Decorative Watermark */}
      <div className="absolute top-1/2 -right-10 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block">
        <AsteriskIcon className="w-80 h-80 text-[#0284C7]" color="#0284C7" strokeWidth={1.5} />
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column: Overlapping Dual Visual Cards */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="relative w-full max-w-lg lg:max-w-none mx-auto h-[340px] sm:h-[440px] lg:h-[480px]">
            {/* Ambient Background Glows */}
            <div className="absolute top-4 left-6 w-52 h-52 bg-[#C07DFF]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-4 right-6 w-56 h-56 bg-[#3BC8F6]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Back Image (top-left offset) */}
            <div className="absolute top-0 left-0 w-[78%] sm:w-[72%] aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-stone-200/80 bg-stone-900 z-10 transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/images/animation-CUkNRKt1.webp"
                alt="Venom Tech Graphic Design Creative Studio"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 40vw"
                priority
              />
            </div>

            {/* Front Image (bottom-right offset overlapping back image) */}
            <div className="absolute bottom-0 right-0 w-[82%] sm:w-[76%] aspect-[16/11] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)] border-2 border-white bg-slate-950 z-20 transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/images/analysis-DJD66ZJ7.webp"
                alt="Venom Tech Brand Visual Color Spectrum"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 85vw, 45vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right Column: Heading & Checklist */}
        <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F9FF] border border-[#3BC8F6]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#0284C7]" color="#0284C7" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#0284C7] font-semibold">
              Strategic Impact
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#000000] tracking-tight leading-[1.02]">
            Why You Need Professional{" "}
            <span className="text-brand-gradient">Graphic Designing in Lahore</span>
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
            In today&apos;s fast-moving digital economy, customers make split-second judgments based on your visual presentation. We design unforgettable brands that win trust immediately and convert attention into sustained revenue.
          </p>

          {/* Checklist */}
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

          <div className="pt-4">
            <Link
              href="/screens/contactus"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#C07DFF] via-[#7F8BFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase font-bold text-sm tracking-wider shadow-lg shadow-[#3BC8F6]/20 hover:opacity-95 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Get Started</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

