import React from "react";
import Image from "next/image";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

export default function AboutAwardsSection() {
  return (
    <section className="bg-gradient-to-r from-white/90 via-[#F5EBFF]/60 to-[#E8F9FF]/60 py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2] relative overflow-hidden">
      {/* Background Asterisk Watermark */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-15 pointer-events-none hidden lg:block">
        <AsteriskIcon className="w-80 h-80 text-black" color="#000000" strokeWidth={1.5} />
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column: Heading & Description */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 mb-4">
            <AsteriskIcon className="w-4 h-4 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
              Our Vision
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-6xl text-[#111111] tracking-tight leading-[0.95] mb-6">
            Our <span className="text-[#C07DFF]">Vision</span>
          </h2>

          <div className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed space-y-4 mb-6">
            <p>
              At Venom Tech, our vision is rooted in empowering businesses to grow smarter, scale faster, and compete confidently in an ever-evolving digital-first world. We believe that true innovation happens at the intersection of creativity, technology, and strategy.
            </p>
            <p>
              In a landscape where digital transformation is no longer optional, our mission is to help brands not only adapt but lead with clarity, confidence, and measurable impact. We bridge the gap between ideas and execution by combining cutting-edge technology with data-driven decision-making.
            </p>
            <p>
              Our approach is centered on understanding the unique challenges and goals of every business we work with. Rather than offering one-size-fits-all solutions, we design tailored digital strategies that align with your brand identity, audience behavior, and long-term vision. From intelligent automation and advanced analytics to immersive AR experiences and scalable digital platforms, we focus on solutions that drive real business outcomes.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider text-stone-500 font-semibold pt-4 border-t border-stone-300">
            <span>Creativity</span>
            <span>&bull;</span>
            <span>Technology</span>
            <span>&bull;</span>
            <span className="text-[#C07DFF]">Measurable Impact</span>
          </div>
        </div>

        {/* Right Column: Overlapping Dual Visual Cards */}
        <div className="lg:col-span-6">
          <div className="relative w-full max-w-lg lg:max-w-none mx-auto h-[340px] sm:h-[440px] lg:h-[480px]">
            {/* Ambient Background Glows */}
            <div className="absolute top-4 left-6 w-52 h-52 bg-[#C07DFF]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-4 right-6 w-56 h-56 bg-[#3BC8F6]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Back Image: AI Animation (top-left offset) */}
            <div className="absolute top-0 left-0 w-[78%] sm:w-[72%] aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-stone-200/80 bg-stone-900 z-10 transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/images/animation-CUkNRKt1.webp"
                alt="Venom Tech AI Animation & Cybernetic Innovation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 40vw"
                priority
              />
            </div>

            {/* Front Image: Analysis & 3D Analytics (bottom-right offset overlapping back image) */}
            <div className="absolute bottom-0 right-0 w-[82%] sm:w-[76%] aspect-[16/11] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)] border-2 border-white bg-slate-950 z-20 transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/images/analysis-DJD66ZJ7.webp"
                alt="Venom Tech Data Analysis & Analytics Solutions"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 85vw, 45vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
