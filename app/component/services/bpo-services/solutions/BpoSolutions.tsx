import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import BorderGlow from "@/app/component/global/ui/BorderGlow";

const SERVICES = [
  {
    title: "Inbound Call Center Services",
    desc: "Our trained agents manage incoming calls with care and accuracy, resolving customer inquiries swiftly while creating positive customer experiences that build long-term trust.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Outbound Call Center Services",
    desc: "We execute targeted outbound outreach to connect with potential customers and strengthen existing relationships, focusing on meaningful conversations that drive lead generation and revenue growth.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Telemarketing Services",
    desc: "Our telemarketing teams engage prospects with clear messaging and strategic communication, designed to increase awareness, generate interest, and support sales objectives.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Customer Support Services",
    desc: "Deliver consistent assistance across multiple channels with our dedicated support teams. We provide responsive, reliable help 24/7 to ensure satisfaction at every customer touchpoint.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Lead Generation Services",
    desc: "We help businesses attract and qualify potential customers through focused outreach and data-driven strategies, delivering relevant leads that align with your growth goals.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "AI & Automation Support",
    desc: "We implement intelligent tools to simplify operations and boost productivity. By automating repetitive tasks and optimizing workflows, we help teams save time, reduce effort, and operate efficiently.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Content Moderation Services",
    desc: "Protect your brand with expert moderation that ensures platform safety, compliance, and user trust across all user-generated content.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Back Office Support",
    desc: "Offload routine administrative tasks including data entry, processing, and operational maintenance to keep your business running smoothly.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function BpoSolutions() {
  return (
    <section id="services" className="bg-white py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F5EBFF] border border-[#C07DFF]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#7C3AED] font-semibold">
              Our Services
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#000000] tracking-tight leading-[1.02]">
            Outsourcing Solutions Designed <span className="text-brand-gradient">Around Your Business</span>
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Our services are built to adapt to your operational needs, not the other way around. We provide dependable outsourcing support that helps businesses improve efficiency, maintain accuracy, and scale confidently.
          </p>
        </div>

        {/* 8 Cards Grid (3 cols on lg, last 2 centered) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((item, idx) => (
            <BorderGlow
              key={item.title}
              borderRadius={18}
              backgroundColor="#ffffff"
              glowColor="275 80 75"
              glowRadius={32}
              colors={["#C07DFF", "#3BC8F6", "#9333ea"]}
              className={`h-full ${
                idx === 6 ? "lg:col-start-1" : idx === 7 ? "lg:col-start-2" : ""
              }`}
            >
              <div className="group p-8 bg-white h-full transition-all duration-300 flex flex-col justify-between">
                <div>
                  {/* Purple Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-[#F5EBFF] border border-[#C07DFF]/30 text-[#7C3AED] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#C07DFF] group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-xl sm:text-2xl text-[#111111] tracking-tight leading-snug mb-3 group-hover:text-[#7C3AED] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-stone-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom decorative bar */}
                <div className="pt-6 mt-6 border-t border-[#F5EBFF] flex items-center justify-between text-xs font-semibold text-[#7C3AED]">
                  <span className="font-[family-name:var(--font-oswald)] uppercase tracking-wider">
                    Learn More
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}

