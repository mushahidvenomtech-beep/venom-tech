"use client";

import React, { useState } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const FAQS = [
  {
    q: "What SEO services do you offer in Lahore?",
    a: "We provide comprehensive full-lifecycle search optimization including deep technical SEO audits, semantic keyword mapping, on-page copy optimization, high-authority editorial link acquisition, Google Business Profile (GBP) local ranking, Core Web Vitals acceleration, and e-commerce SEO.",
  },
  {
    q: "How do you boost our local visibility?",
    a: "We systematically optimize your Google Business Profile, standardize Name-Address-Phone (NAP) citations across top directories, implement LocalBusiness Schema markup, and target high-converting geo-targeted search queries to place your business into the top Google Maps 3-Pack.",
  },
  {
    q: "Can you help startup agencies digitally?",
    a: "Yes. We specialize in fast-tracking search visibility for startups and growing agencies. By targeting high-intent, low-difficulty keyword clusters and establishing authoritative topical authority, we generate qualified organic leads without the heavy budget drain of PPC ads.",
  },
  {
    q: "How does your company measure marketing success?",
    a: "We track business-critical performance indicators rather than vanity metrics. Through customized GA4 and Google Search Console dashboards, we report on organic revenue, form submissions, phone calls, cost-per-acquisition (CPA), and first-page keyword visibility.",
  },
  {
    q: "Why choose Venom Tech as our SEO partner?",
    a: "Venom Tech enforces 100% white-hat, guideline-compliant search strategies with zero risk of algorithmic penalties. You gain a dedicated senior SEO architect, transparent bi-weekly progress reporting, and an aggressive 90-day growth framework engineered for demonstrable ROI.",
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
            Got Questions? <span className="text-brand-gradient">We Have Answers</span>
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

