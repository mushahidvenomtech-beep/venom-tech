import React from "react";
import Image from "next/image";
import Link from "next/link";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const STATS = [
  { value: "110+", label: "Customers" },
  { value: "150+", label: "Projects" },
  { value: "85%", label: "Conversion Rate" },
  { value: "90+", label: "Awards Winning" },
];

export default function WhyChooseSection() {
  return (
    <section
      id="why-choose"
      className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Visual Card with +40K Badge */}
        <div className="lg:col-span-6 relative flex justify-center">
          <div className="relative w-full max-w-[520px] aspect-[4/3] sm:aspect-[16/11]">
            {/* Primary Dark Portrait Card with WebP Tech Art */}
            <div className="w-full h-full bg-black border-2 border-black overflow-hidden shadow-2xl relative rounded-2xl group">
              <Image
                src="/images/why-choose-us.webp"
                alt="Venom Tech AI & Digital Engineering"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 520px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle ambient lighting gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-md text-white/90 font-mono text-[11px] uppercase tracking-widest border border-white/10">
                VENOM TECH / LABS
              </div>
            </div>

            {/* Gradient Floating Badge */}
            <div className="absolute -bottom-4 left-4 sm:left-6 bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white px-5 py-3.5 border-2 border-white shadow-xl flex items-center gap-3 rounded-xl z-20">
              <div className="font-[family-name:var(--font-oswald)] font-extrabold text-3xl leading-none">
                +40K
              </div>
              <div className="font-[family-name:var(--font-oswald)] uppercase text-[11px] tracking-wider font-semibold leading-tight text-white/95">
                Audience Reached<br />&amp; Influenced
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Copy & Stats Grid */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 mb-4">
            <AsteriskIcon className="w-4 h-4 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
              Why Choose Us
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-[44px] sm:text-[44px] lg:text-[44px] text-[#000000] tracking-tight leading-[1.08] mb-6">
            Why Choose <span className="text-brand-gradient">VENOMTECH</span> IT SOLUTIONS
          </h2>

          <p className="font-sans text-stone-600 text-base sm:text-lg leading-relaxed mb-8">
            This highlights our skills, experience, and quality of work, demonstrating our commitment to excellence.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-6 border-t border-[#E8E2F2] mb-8">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/80 backdrop-blur-sm border border-[#E8E2F2] p-5 sm:p-6 rounded-2xl shadow-sm hover:border-[#C07DFF] hover:shadow-md transition-all duration-300 group"
              >
                <div className="font-[family-name:var(--font-oswald)] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#000000] group-hover:text-brand-gradient transition-colors tracking-tight mb-1.5">
                  {stat.value}
                </div>
                <div className="font-sans text-xs sm:text-sm uppercase tracking-wider text-stone-600 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <Link
              href="/screens/contactus"
              className="inline-flex items-center gap-3 bg-black hover:bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white px-8 py-4 font-[family-name:var(--font-oswald)] font-semibold text-base uppercase tracking-wider transition-all duration-300 group shadow-md rounded-xl"
            >
              <span>Get Started</span>
              <span className="text-[#C07DFF] group-hover:text-white transition-colors">&rarr;</span>
            </Link>
            <span className="font-sans text-xs text-stone-500 uppercase tracking-wider font-semibold">
              Guaranteed Milestone Quality
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
