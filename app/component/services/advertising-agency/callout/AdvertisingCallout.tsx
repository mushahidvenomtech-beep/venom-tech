import React from "react";

export default function AdvertisingCallout() {
  return (
    <section className="bg-gradient-to-r from-slate-950 via-[#181126] to-slate-950 py-16 sm:py-20 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2] text-white relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#C07DFF]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-[#3BC8F6]/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
          Looking for an <span className="text-brand-gradient">Advertising Expert</span> to talk with you?
        </h2>

        <p className="font-sans text-stone-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Connect directly with our senior media buyers and growth architects. We review your ad account metrics and uncover quick ROAS optimization opportunities.
        </p>

        <div className="pt-2">
          <a
            href="tel:+923214774200"
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#C07DFF] via-[#7F8BFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase font-bold text-sm sm:text-base tracking-wider shadow-xl shadow-[#3BC8F6]/30 hover:opacity-95 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Talk with our Advertising Expert</span>
            <span className="opacity-70">&bull;</span>
            <span className="font-mono text-white underline underline-offset-4">+92 321 4774200</span>
          </a>
        </div>
      </div>
    </section>
  );
}

