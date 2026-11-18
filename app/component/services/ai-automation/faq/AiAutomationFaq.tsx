"use client";

import React, { useState } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const AI_AUTOMATION_FAQS = [
  {
    q: "What AI automation services do you offer?",
    a: "RPA, workflow automation, AI chatbots, CRM and marketing automation, custom AI workflows and data/reporting automation.",
  },
  {
    q: "What business tasks can be automated?",
    a: "Customer support replies, lead capture, data entry, invoicing, appointment booking, reporting and follow-up emails are common examples.",
  },
  {
    q: "Is AI automation affordable for small businesses?",
    a: "Yes. Many automations use low-cost tools and pay for themselves within months by saving staff time.",
  },
  {
    q: "Can AI chatbots work on WhatsApp?",
    a: "Yes. We build chatbots for WhatsApp Business, Facebook Messenger, Instagram and websites, in English and Urdu.",
  },
  {
    q: "Will automation replace my staff?",
    a: "No. It removes repetitive work so your team can focus on sales, service and growth.",
  },
  {
    q: "Which tools can you integrate?",
    a: "CRMs, Google Workspace, Shopify, WooCommerce, accounting software, payment gateways and most tools with an API.",
  },
  {
    q: "How long does an automation project take?",
    a: "Simple automations take 1–2 weeks; custom AI systems typically take 4–10 weeks.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We use secure APIs, access controls and encryption, and can sign an NDA.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. We monitor, maintain and improve your automations over time.",
  },
  {
    q: "How do I get started?",
    a: "Fill in the form or call us for a free feasibility review.",
  },
];

export default function AiAutomationFaq() {
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
            AI Automation <span className="text-brand-gradient">FAQs</span>
          </h2>
        </div>

        {/* Card-Style Accordion List */}
        <div className="space-y-4">
          {AI_AUTOMATION_FAQS.map((item, idx) => {
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
