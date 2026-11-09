import React from "react";
import Image from "next/image";
import Link from "next/link";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

export default function BpoHero() {
  return (
    <section className="relative pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-10 overflow-hidden border-b border-[#E8E2F2] bg-gradient-to-b from-[#F5EBFF]/30 via-white to-white">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(#C07DFF_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#C07DFF]/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] bg-[#3BC8F6]/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
        {/* Left Column: Team Office Photography */}
        <div className="lg:col-span-6">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white bg-slate-900 group">
            <div className="relative aspect-[16/11] w-full">
              <Image
                src="/images/services/bpo-hero.webp"
                alt="Venom Tech Smart BPO Customer Support Team"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

            {/* Floating Quality Badge */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-[#E8E2F2] shadow-lg flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider text-slate-900">
                24/7 Dedicated Support Pods
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Heading, Subtitle & Action */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F5EBFF] border border-[#C07DFF]/40 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#7C3AED] font-semibold">
              Smart BPO Solutions
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02] text-[#111111]">
            Smart BPO Solutions Built for{" "}
            <span className="text-brand-gradient">Modern Businesses</span>
          </h1>

          <p className="font-sans text-stone-600 text-base sm:text-lg leading-relaxed">
            We help companies streamline daily operations by taking care of essential business processes with accuracy and consistency. From customer support to administrative tasks, our skilled professionals work as an extension of your team to deliver dependable results around the clock. With a focus on efficiency, quality, and scalability, our BPO services are designed to support long-term success while allowing you to focus on strategic growth.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/screens/contactus"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#C07DFF] via-[#7F8BFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase font-bold text-sm tracking-wider shadow-lg shadow-[#3BC8F6]/20 hover:opacity-95 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Get in Touch</span>
              <span>&rarr;</span>
            </Link>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-stone-300 hover:border-stone-500 text-stone-800 font-[family-name:var(--font-oswald)] uppercase font-bold text-sm tracking-wider hover:bg-stone-50 transition-all"
            >
              <span>View Solutions</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

