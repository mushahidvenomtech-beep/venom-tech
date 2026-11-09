"use client";

import React, { useState } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const FAQS = [
  {
    q: "What types of advertising services does your company offer?",
    a: "We offer full-service digital advertising across Meta (Facebook & Instagram), Google Ads (Search, Shopping, Performance Max, YouTube), TikTok Ads, and LinkedIn Advertising. Our solutions encompass audience targeting, video creative production, direct-response copywriting, and landing page conversion optimization.",
  },
  {
    q: "Do you develop custom advertising strategies for different industries and businesses?",
    a: "Yes. Every brand requires a unique acquisition funnel. We design bespoke media strategies engineered around your industry unit economics—whether scaling multi-SKU e-commerce stores, driving high-ticket B2B sales pipelines, or capturing localized service leads.",
  },
  {
    q: "Does your company only work with in-house advertising experts?",
    a: "Yes. All our media buyers, creative strategists, video editors, and tracking engineers are dedicated in-house specialists. You receive direct communication, rapid iteration cycles, and full accountability without intermediary outsourcing delays.",
  },
  {
    q: "Do you provide digital advertising services and SEO, or do you specialize in just one?",
    a: "We provide comprehensive 360-degree growth marketing. Our performance advertising team drives rapid, measurable customer acquisition, while our SEO department builds lasting organic search dominance—ensuring both short-term revenue spikes and long-term organic equity.",
  },
  {
    q: "What type of reporting will you provide and how often?",
    a: "Transparency is our foundation. You receive 24/7 access to real-time attribution dashboards displaying verified ROAS, CPA, click-through rates, and conversion volumes. Additionally, we provide weekly executive performance recaps and bi-weekly strategic roadmap calls.",
  },
];

export default function AdvertisingFaq() {
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
            Everything you need to know about our paid media frameworks, ad budgets, creative production, and reporting.
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

