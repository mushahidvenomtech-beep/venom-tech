import React from "react";
import Link from "next/link";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import DecayCard from "@/app/component/global/ui/DecayCard";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative bg-transparent pt-8 pb-10 sm:pt-12 sm:pb-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto overflow-hidden border-b border-[#E8E2F2]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center max-w-[1100px] mx-auto">
        {/* Left Column: Typography & CTAs */}
        <div className="z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#C07DFF]/30 bg-[#F4E9FF] rounded-full mb-6">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3.4} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs font-semibold tracking-wider text-[#C07DFF]">
              Digital Creative Agency
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-[44px] sm:text-[44px] lg:text-[44px] tracking-[-0.03em] leading-[1.08] text-[#000000] mb-6">
            Explore The <span className="text-brand-gradient">Power</span><br />
            Of <span className="text-brand-gradient">Innovation</span>
          </h1>

          {/* Subtext */}
          <p className="font-sans text-stone-600 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
            Helping businesses scale up and convert clicks into revenue. We are Venom Tech, delivering digitally engineered solutions that make your brand unshakable.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <Link
              href="/screens/portfolio"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white px-8 py-4 font-[family-name:var(--font-oswald)] font-semibold text-base uppercase tracking-wider transition-all duration-300 group shadow-lg shadow-[#C07DFF]/25 hover:opacity-95 rounded-xl"
            >
              <span>Explore Work</span>
              <span className="text-white group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>

            {/* Call to Action Button redirecting to contactus page */}
            <Link
              href="/screens/contactus"
              className="inline-flex items-center gap-3 bg-white hover:bg-[#000000] text-[#000000] hover:text-white border-2 border-[#E8E2F2] hover:border-[#000000] px-8 py-4 font-[family-name:var(--font-oswald)] font-semibold text-base uppercase tracking-wider transition-all duration-300 group rounded-xl shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>Contact Us</span>
              <span className="text-[#C07DFF] group-hover:text-white group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Visual Model / Brand Emblem */}
        <div className="relative flex justify-center items-center">
          {/* Subtle Background Glow & Accent Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#C07DFF]/20 blur-3xl -z-10" />

          {/* Portrait Composition Card with React Bits DecayCard WebGL Animation */}
          <DecayCard
            image="/images/hero-decay-card.png"
            width={400}
            height={500}
            radius={24}
            intensity={0.5}
            sensitivity={0.5}
            hoverDecay={0.05}
            recovery={0.6}
            idle={0.35}
            grain={0.25}
            detail={5}
            pattern={4}
            flow={0}
            chroma={0}
            travel={40}
            tilt={10}
            scope="window"
            className="w-full max-w-[420px] aspect-[4/5] border-2 border-[#C07DFF]/25 shadow-2xl rounded-3xl overflow-visible"
            contentClassName="flex flex-col justify-between p-6 sm:p-8"
          >
            {/* Ambient Graphic Watermark in Hero Frame */}
            <div className="absolute top-6 right-6 opacity-25 pointer-events-none">
              <AsteriskIcon className="w-24 h-24 text-[#C07DFF]" color="#C07DFF" strokeWidth={2} />
            </div>

            {/* Top decorative pill */}
            <div className="relative z-10 flex items-center justify-between pointer-events-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 border border-[#E8E2F2] rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#C07DFF]" />
                <span className="font-[family-name:var(--font-oswald)] uppercase text-[11px] tracking-wider text-stone-600 font-medium">
                  Digital Innovation
                </span>
              </div>
            </div>

            {/* Center Area Spacer (Brand emblem is rendered via WebGL DecayCard shader with tear/drift animation) */}
            <div className="relative z-10 flex-1 flex items-center justify-center pointer-events-none" />

            {/* Floating Live Badge */}
            <div className="relative z-10 bg-white/95 backdrop-blur-md px-4 py-2.5 border border-[#E8E2F2] text-stone-900 shadow-md rounded-xl flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3BC8F6] animate-pulse" />
                <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider font-semibold">
                  Senior Direction &bull; Accepting Q1
                </span>
              </div>
              <span className="text-[11px] font-[family-name:var(--font-oswald)] uppercase tracking-wider text-[#C07DFF] font-bold">
                VENOM TECH
              </span>
            </div>
          </DecayCard>
        </div>
      </div>
    </section>
  );
}

