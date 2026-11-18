"use client";

import React, { useState } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const FAQS = [
  {
    q: "Which SEO services do you offer in Lahore?",
    a: "Local SEO, technical SEO, on-page SEO, content writing, link building, e-commerce SEO and SEO audits.",
  },
  {
    q: "How do you improve local visibility?",
    a: "By optimizing your Google Business Profile, building local citations, earning reviews and targeting city-specific keywords like \"[service] in Lahore\".",
  },
  {
    q: "How long does SEO take to show results?",
    a: "Most sites see early movement in 1–3 months and strong growth within 4–6 months, depending on competition.",
  },
  {
    q: "How do you measure SEO success?",
    a: "Keyword rankings, organic traffic, leads, calls and revenue, shared in clear monthly reports.",
  },
  {
    q: "Why choose Venom Tech as your SEO partner?",
    a: "Transparent reporting, white-hat methods, local market knowledge and a team that also handles content, design and development.",
  },
];

export default function SeoFaq() {
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
            SEO <span className="text-brand-gradient">FAQs</span>
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about our SEO methodology, timelines, ranking strategies, and reporting.
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
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 group transition-colors"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-[family-name:var(--font-oswald)] font-bold text-lg sm:text-xl text-[#111111] group-hover:text-[#0284C7] transition-colors">
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
