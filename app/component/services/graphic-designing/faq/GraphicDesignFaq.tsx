"use client";

import React, { useState } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const FAQS = [
  {
    q: "What graphic design services does Venom Tech provide?",
    a: "Logo and brand identity design, social media graphics, ad creatives, website and app UI, packaging, print design and motion graphics.",
  },
  {
    q: "Do you offer graphic design packages for startups?",
    a: "Yes. We offer affordable startup branding packages and monthly social media design plans.",
  },
  {
    q: "How long does a graphic design project take?",
    a: "A logo takes 5–7 working days, a full brand identity 2–4 weeks, and social media posts are delivered on a weekly schedule.",
  },
  {
    q: "Why choose Venom Tech for graphic design?",
    a: "Experienced designers in Lahore, quick turnaround, revisions included and designs built with marketing performance in mind.",
  },
  {
    q: "Can you handle digital marketing and design together?",
    a: "Yes. Our design and advertising teams work together so your creatives and campaigns stay aligned.",
  },
];

export default function GraphicDesignFaq() {
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
            Graphic Design <span className="text-brand-gradient">FAQs</span>
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about our graphic design workflows, deliverables, turnaround times, and ownership.
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
