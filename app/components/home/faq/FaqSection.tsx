"use client";

import React, { useState } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const FAQS = [
  {
    q: "What services does Venom Tech offer?",
    a: "We offer SEO, paid advertising, social media marketing, graphic design, web and app development, AI automation and BPO services, all from our team in Lahore.",
  },
  {
    q: "Which industries do you work with?",
    a: "E-commerce, real estate, healthcare, education, restaurants, SaaS, professional services and more. We adapt each strategy to your market and audience.",
  },
  {
    q: "How do you ensure quality?",
    a: "Every project follows a defined process with milestones, internal QA and client approvals at each stage, plus regular progress reports.",
  },
  {
    q: "Can you help my website rank on Google?",
    a: "Yes. Our SEO team handles technical fixes, keyword research, content and link building, with a strong focus on local SEO in Pakistan.",
  },
  {
    q: "Do you build custom websites and apps?",
    a: "Yes. We build custom websites, e-commerce stores and iOS/Android apps tailored to your business, not generic templates.",
  },
  {
    q: "How long does a project take?",
    a: "A business website usually takes 3–6 weeks, an app 8–16 weeks. SEO and ads are ongoing, with early results typically visible in 1–3 months.",
  },
  {
    q: "Is my data safe with you?",
    a: "Yes. We use secure hosting, access controls and NDAs where needed, and never share client data.",
  },
  {
    q: "Do you work with startups and small businesses?",
    a: "Absolutely. We offer flexible packages so startups and SMEs can grow without a large upfront budget.",
  },
  {
    q: "How can you improve my conversions?",
    a: "We combine UX improvements, landing page testing, better ad targeting and clear calls to action to turn more visitors into leads and sales.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 mb-3 px-3.5 py-1.5 bg-[#F4E9FF] border border-[#C07DFF]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
              FAQ
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-[34px] sm:text-[44px] text-[#111111] tracking-tight leading-[1.08]">
            Frequently Asked Questions About <span className="text-brand-gradient">Venom Tech</span>
          </h2>
        </div>

        {/* Card-Style Accordion List */}
        <div className="space-y-4">
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.q}
                className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-gradient-to-r from-[#FAF5FF] via-white to-[#F0F9FF] border-[#C07DFF]/50 shadow-md"
                    : "bg-white border-[#E8E2F2] hover:border-[#C07DFF]/40 shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left p-5 sm:p-6 gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C07DFF]"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-sans font-semibold text-base sm:text-lg text-[#111111] leading-snug">
                    {item.q}
                  </h3>

                  <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-[#C07DFF] transition-all">
                    {isOpen ? (
                      <span className="w-4 h-0.5 bg-[#C07DFF] rounded-full inline-block" />
                    ) : (
                      <span className="text-2xl leading-none font-light text-stone-400 hover:text-[#C07DFF]">
                        +
                      </span>
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 font-sans text-stone-600 text-sm sm:text-base leading-relaxed animate-in fade-in duration-200">
                    {item.a}
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
