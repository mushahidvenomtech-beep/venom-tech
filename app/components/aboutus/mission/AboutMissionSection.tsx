import React from "react";
import Image from "next/image";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

export default function AboutMissionSection() {
  return (
    <section className="bg-gradient-to-r from-[#E8F9FF]/60 via-[#F5EBFF]/60 to-white/90 py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2] relative overflow-hidden">
      {/* Background Asterisk Watermark */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-15 pointer-events-none hidden lg:block">
        <AsteriskIcon className="w-80 h-80 text-[#3BC8F6]" color="#3BC8F6" strokeWidth={1.5} />
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column on Desktop: Overlapping Dual Visual Cards (Flipped) */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="relative w-full max-w-lg lg:max-w-none mx-auto h-[340px] sm:h-[440px] lg:h-[480px]">
            {/* Ambient Background Glows */}
            <div className="absolute top-4 left-6 w-52 h-52 bg-[#3BC8F6]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-4 right-6 w-56 h-56 bg-[#C07DFF]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Back Image: our misson 2.webp (top-left offset) */}
            <div className="absolute top-0 left-0 w-[78%] sm:w-[72%] aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-stone-200/80 bg-stone-900 z-10 transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/images/our misson 2.webp"
                alt="Venom Tech Mission - Strategic Innovation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 40vw"
                priority
              />
            </div>

            {/* Front Image: our mission 1.webp (bottom-right offset overlapping back image) */}
            <div className="absolute bottom-0 right-0 w-[82%] sm:w-[76%] aspect-[16/11] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)] border-2 border-white bg-slate-950 z-20 transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/images/our mission 1.webp"
                alt="Venom Tech Mission - Data Insights & Intelligence"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 85vw, 45vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right Column on Desktop: Heading & Description (Flipped) */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 mb-4">
            <AsteriskIcon className="w-4 h-4 text-[#0284C7]" color="#0284C7" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#0284C7] font-semibold">
              Our Mission
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-6xl text-[#111111] tracking-tight leading-[0.95] mb-6">
            Our <span className="text-brand-gradient">Mission</span>
          </h2>

          <div className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed space-y-4 mb-6">
            <p>
              At Venom Tech, innovation is not just about adopting the latest tools &mdash; it&apos;s about using technology purposefully. We leverage data insights to uncover opportunities, optimize performance, and guide strategic decisions.
            </p>
            <p>
              By transforming complex data into actionable intelligence, we enable businesses to move faster, reduce risk, and stay ahead of the competition. Our solutions are designed to be agile, adaptable, and future-ready, ensuring long-term value in a rapidly changing digital ecosystem.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider text-stone-500 font-semibold pt-4 border-t border-stone-300">
            <span>Agile</span>
            <span>&bull;</span>
            <span>Adaptable</span>
            <span>&bull;</span>
            <span className="text-[#0284C7]">Future-Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
}
