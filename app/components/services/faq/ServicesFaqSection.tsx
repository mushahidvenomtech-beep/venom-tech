"use client";

import React, { useState } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const SERVICE_FAQS = [
  {
    q: "What services does Venom Tech provide?",
    a: "Venom Tech specializes in digital innovation, including SEO, SEM, PPC, Social Media Marketing, Web Design and Development, Mobile App Development, Branding, Reputation Management, Email Marketing, and Google Products services for businesses of all sizes.",
  },
  {
    q: "Does Venom Tech offer support after project completion?",
    a: "Absolutely. We provide ongoing maintenance, performance monitoring, redesigns, security updates, and optimization to ensure your digital products remain efficient, secure, and up to date.",
  },
  {
    q: "What industries does Venom Tech work with?",
    a: "We work with startups, small businesses, enterprises, and organizations across industries such as eCommerce, healthcare, real estate, education, fintech, logistics, and more.",
  },
  {
    q: "How does Venom Tech ensure project quality?",
    a: "Our projects follow a structured workflow that includes research, planning, development, quality assurance, and performance testing to ensure high-quality results and long-term success.",
  },
  {
    q: "Can Venom Tech help improve my website’s SEO ranking?",
    a: "Yes. Our SEO strategies are data-driven and tailored to your business goals, focusing on keyword optimization, technical SEO, content strategy, and link building to improve visibility and rankings.",
  },
  {
    q: "Do you provide custom web and mobile app development?",
    a: "Yes. We build fully customized websites and mobile applications tailored to your business requirements, ensuring scalability, performance, and user-friendly experiences.",
  },
  {
    q: "How long does a typical project take?",
    a: "Project timelines vary depending on complexity and scope. Simple websites may take a few weeks, while larger platforms and applications may require several months.",
  },
  {
    q: "Is my data secure with Venom Tech?",
    a: "Yes. We follow industry-standard security practices, including secure coding, data protection protocols, and regular updates to safeguard your data and digital assets.",
  },
  {
    q: "Does Venom Tech work with startups and small businesses?",
    a: "Definitely. We offer flexible solutions and scalable packages designed specifically to help startups and small businesses grow efficiently and competitively.",
  },
  {
    q: "How does Venom Tech help increase conversions?",
    a: "We focus on user experience, performance optimization, targeted marketing strategies, and analytics-driven improvements to convert visitors into customers and maximize ROI.",
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
        <div className="text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 mb-3 px-3.5 py-1.5 bg-[#F4E9FF] border border-[#C07DFF]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-6xl text-[#111111] tracking-tight leading-[0.95]">
            Everything You Need to Know About <span className="text-brand-gradient">Our Capabilities.</span>
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
                  <span className="font-sans font-semibold text-base sm:text-lg text-[#111111] leading-snug">
                    {item.q}
                  </span>

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
