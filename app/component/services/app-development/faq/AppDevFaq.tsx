"use client";

import React, { useState } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const FAQS = [
  {
    q: "What types of mobile app services does your company offer?",
    a: "We provide full-lifecycle mobile engineering services including Native iOS (Swift & SwiftUI), Native Android (Kotlin & Jetpack Compose), Cross-Platform development (React Native & Flutter), custom backend cloud architecture (Node.js, Python, AWS, Firebase), mobile UI/UX design, App Store Optimization (ASO), and continuous post-launch maintenance & security updates.",
  },
  {
    q: "Do you develop custom apps and strategies for different industries and businesses?",
    a: "Yes. We engineer bespoke mobile solutions for startups, scale-ups, and global enterprises across FinTech, Healthcare, E-Commerce, Real Estate, Logistics & Supply Chain, and On-Demand services. Every application is customized to meet strict industry standards such as HIPAA, GDPR, and PCI-DSS compliance.",
  },
  {
    q: "Does your team only work with in-house development experts or support external teams?",
    a: "We offer flexible engagement models. Venom Tech can serve as your complete end-to-end dedicated mobile development partner from day zero, or embed senior mobile architects, Flutter/React Native specialists, and QA testers directly into your existing in-house agile engineering pods.",
  },
  {
    q: "Do you provide custom digital advertising services and SEO, or do you specialize in just one?",
    a: "We provide comprehensive 360-degree digital solutions. Alongside custom mobile app engineering, our in-house growth team provides App Store Optimization (ASO), Apple Search Ads, Google App Campaigns, paid social acquisition funnels, and enterprise technical SEO to maximize your user acquisition velocity.",
  },
  {
    q: "What types of reporting will you provide and how often?",
    a: "Transparency is core to our delivery. You will receive bi-weekly sprint velocity reports, direct access to Jira/GitHub boards, interactive TestFlight & Google Play Internal Test builds, and weekly video strategy check-ins. Post-launch, we provide real-time telemetry dashboards tracking crash-free sessions, retention curves, and server latencies.",
  },
];

export default function AppDevFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="bg-[#FAF9FD] py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2]">
      <div className="max-w-[1000px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F9FF] border border-[#3BC8F6]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#0284C7]" color="#0284C7" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#0284C7] font-semibold">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl text-[#000000] tracking-tight leading-[1.02]">
            Got Questions? <span className="text-brand-gradient">We Have Answers</span>
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about our custom mobile app development process, timelines, and technology stacks.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 font-sans">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E8E2F2] rounded-2xl overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 font-[family-name:var(--font-oswald)] font-bold text-lg sm:text-xl text-[#111111] hover:text-[#0284C7] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span
                    className={`w-8 h-8 rounded-full border border-[#E8E2F2] flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#E8F9FF] border-[#3BC8F6]/40 text-[#0284C7]" : "text-stone-400"
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-1 text-stone-600 text-sm sm:text-base leading-relaxed border-t border-[#F5EBFF]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

