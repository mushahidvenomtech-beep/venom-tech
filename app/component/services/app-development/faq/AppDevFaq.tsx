"use client";

import React, { useState } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const FAQS = [
  {
    q: "What app development services do you offer?",
    a: "Native iOS and Android apps, cross-platform apps, UI/UX design, backend and API development, and ongoing maintenance.",
  },
  {
    q: "Do you build apps for specific industries?",
    a: "Yes: e-commerce, food delivery, real estate, healthcare, education, fintech, logistics and more.",
  },
  {
    q: "How much does it cost to build an app in Pakistan?",
    a: "It depends on features and platforms. A simple app may start from a modest budget, while complex apps cost more. We give a fixed quote after a free discovery call.",
  },
  {
    q: "How long does it take to build an app?",
    a: "Most apps take 8–16 weeks from design to launch.",
  },
  {
    q: "Do you publish the app on the App Store and Google Play?",
    a: "Yes, we handle the full submission and approval process.",
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
              FAQ
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl text-[#000000] tracking-tight leading-[1.02]">
            Got Questions? <span className="text-brand-gradient">We Have Answers</span>
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
            Answers to common questions about building an app with Venom Tech.
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
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3BC8F6]"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-[family-name:var(--font-oswald)] font-bold text-lg sm:text-xl text-[#111111] group-hover:text-[#0284C7] transition-colors leading-snug">
                    {faq.q}
                  </h3>
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
