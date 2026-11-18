import React from "react";
import Link from "next/link";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

export default function ServicesHeaderBanner() {
  return (
    <section className="bg-transparent pt-16 pb-20 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2] relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 opacity-15 pointer-events-none hidden md:block">
        <AsteriskIcon className="w-40 h-40 text-[#C07DFF]" color="#C07DFF" strokeWidth={1.8} />
      </div>

      <div className="max-w-[1440px] mx-auto text-center relative z-10">
        <h1 className="font-[family-name:var(--font-oswald)] font-extrabold uppercase text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] text-[#111111] mb-4">
          Digital Marketing Services in <span className="text-brand-gradient">Pakistan</span>
        </h1>

        {/* Breadcrumb */}
        <div className="inline-flex items-center gap-2.5 font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest font-semibold text-stone-500 bg-white/70 px-5 py-2 border border-stone-200 shadow-sm rounded-full">
          <Link href="/" className="hover:text-[#C07DFF] transition-colors">
            Home
          </Link>
          <span className="text-[#C07DFF]">&gt;</span>
          <span className="text-[#C07DFF]">Services</span>
        </div>
      </div>
    </section>
  );
}

