"use client";

import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import ContactMultiStepForm from "@/app/component/contactus/form/ContactMultiStepForm";

export default function AppDevHero() {
  return (
    <section className="relative min-h-[640px] lg:min-h-[700px] bg-slate-950 text-white pt-28 pb-16 px-4 sm:px-6 lg:px-10 overflow-hidden border-b border-[#E8E2F2]">
      {/* Background Graphic Grid with Ambient Flares */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#C07DFF]/25 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] bg-[#3BC8F6]/25 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
        {/* Left Column: Heading, Subtitle & Value Points */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F9FF]/10 backdrop-blur-md border border-[#3BC8F6]/40 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#3BC8F6]" color="#3BC8F6" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#3BC8F6] font-semibold">
              Venom Tech IT Solution &bull; Mobile Engineering
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.96]">
            Transform Your Business with{" "}
            <span className="text-brand-gradient">Custom Mobile App Development</span> Services
          </h1>

          <p className="font-sans text-stone-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
            Empower your business with high-performance iOS, Android, and cross-platform mobile applications engineered for fluid user journeys, rock-solid security, and scalable commercial momentum.
          </p>

          {/* Key Capabilities List */}
          <ul className="space-y-3 pt-2 font-sans text-stone-300 text-sm sm:text-base">
            {[
              "High-Performance Native iOS (Swift) & Android (Kotlin) Architecture",
              "Cross-Platform Codebases with React Native & Flutter for Rapid Time-to-Market",
              "Scalable Cloud Backends, Real-Time WebSockets & Payment Integrations",
              "App Store & Google Play Submission, ASO, and 24/7 SLA Maintenance",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#3BC8F6]/20 border border-[#3BC8F6] text-[#3BC8F6] flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#solutions"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#C07DFF] via-[#7F8BFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase font-bold text-sm tracking-wider shadow-lg shadow-[#3BC8F6]/20 hover:opacity-95 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Explore App Solutions</span>
              <span>&rarr;</span>
            </a>
            <a
              href="#process"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/20 hover:border-white/60 text-white font-[family-name:var(--font-oswald)] uppercase font-bold text-sm tracking-wider hover:bg-white/5 transition-all"
            >
              <span>Our Process</span>
            </a>
          </div>
        </div>

        {/* Right Column: Glass Door Multi-Step Form */}
        <div className="lg:col-span-6">
          <ContactMultiStepForm
            defaultService="App Development"
            source="service_app_development"
            variant="glass-dark"
            compact
          />
        </div>
      </div>
    </section>
  );
}
