"use client";

import React, { useState } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const SERVICE_FAQS = [
  {
    q: "What digital marketing services do you offer?",
    a: "Branding, web design and development, content creation, video marketing, graphic design, SEO, paid ads, social media management and creative strategy.",
  },
  {
    q: "Do you provide support after a project ends?",
    a: "Yes. We offer maintenance, monthly marketing retainers and on-call support so your site and campaigns keep performing.",
  },
  {
    q: "Which industries do you serve?",
    a: "Retail, e-commerce, real estate, healthcare, education, hospitality, tech and professional services across Pakistan and internationally.",
  },
  {
    q: "How do you ensure quality?",
    a: "Clear briefs, milestone approvals, internal QA and performance tracking on every project.",
  },
  {
    q: "Can you improve my Google rankings?",
    a: "Yes, through our dedicated SEO services: technical audits, keyword research, content and link building.",
  },
  {
    q: "Do you build custom websites and apps?",
    a: "Yes. See our App Development service for mobile apps.",
  },
  {
    q: "How long does a typical project take?",
    a: "Branding 2–4 weeks, websites 3–6 weeks, apps 8–16 weeks. Marketing retainers run monthly.",
  },
  {
    q: "Is my business data secure?",
    a: "Yes. We follow strict access controls and sign NDAs on request.",
  },
  {
    q: "Do you work with startups?",
    a: "Yes. We offer starter packages built for small budgets and fast growth.",
  },
  {
    q: "How do you increase conversions?",
    a: "Through better UX, landing page testing, sharper ad targeting and clear calls to action.",
  },
];

export default function ServicesFaqSection() {
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
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 mb-3 px-3.5 py-1.5 bg-[#F4E9FF] border border-[#C07DFF]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
              FAQ
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-[34px] sm:text-[44px] lg:text-[48px] text-[#111111] tracking-tight leading-[1.08]">
            Questions About Our <span className="text-brand-gradient">Digital Marketing Services</span>
          </h2>
        </div>

        {/* Card-Style Accordion List */}
        <div className="space-y-4">
          {SERVICE_FAQS.map((item, idx) => {
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
