import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import BorderGlow from "@/app/component/global/ui/BorderGlow";

const INDUSTRIES = [
  {
    title: "E-Commerce & Retail",
    desc: "Automating inventory reconciliation, order fulfillment routing, and hyper-personalized customer recommendations.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
        <path d="M3 3h2l2.4 11.2a2 2 0 002 1.6h8.4a2 2 0 002-1.6L21 6H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badgeColor: "from-[#FDF4FF] to-[#FAE8FF] border-[#E879F9]/30 text-[#C026D3]",
  },
  {
    title: "Real Estate",
    desc: "Automated multi-MLS listing syndication, AI tenant pre-qualification, smart valuations, and CRM follow-ups.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M3 21h18M3 7v14M21 7v14M6 11h3M6 15h3M15 11h3M15 15h3M9 3l3-2 3 2v4H9V3z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badgeColor: "from-[#E0F2FE] to-[#BAE6FD] border-[#38BDF8]/30 text-[#0284C7]",
  },
  {
    title: "Healthcare",
    desc: "Automating patient intake, AI appointment triage, HIPAA-compliant messaging, and diagnostic reporting workflows.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 4v16m-8-8h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        <rect x="3" y="3" width="18" height="18" rx="4" />
      </svg>
    ),
    badgeColor: "from-[#FEE2E2] to-[#FECACA] border-[#F87171]/30 text-[#DC2626]",
  },
  {
    title: "Finance & Banking",
    desc: "Real-time compliance monitoring, automated invoice reconciliation, fraud anomaly alerts, and tax computation.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 2l9 4-9 4-9-4 9-4zM3 10v7l9 4 9-4v-7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12v9" strokeLinecap="round" />
      </svg>
    ),
    badgeColor: "from-[#EDE9FE] to-[#DDD6FE] border-[#A78BFA]/30 text-[#7C3AED]",
  },
  {
    title: "Legal & Corporate",
    desc: "Automating multi-clause contract extraction, legal research indexing, non-disclosure validation, and filings.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" />
        <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" />
      </svg>
    ),
    badgeColor: "from-[#EFF6FF] to-[#DBEAFE] border-[#60A5FA]/30 text-[#2563EB]",
  },
  {
    title: "Agencies & Marketing",
    desc: "Automated multi-channel ad attribution, automated executive reporting decks, lead scoring, and pipeline handoffs.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinejoin="round" />
      </svg>
    ),
    badgeColor: "from-[#FEF3C7] to-[#FDE68A] border-[#FBBF24]/30 text-[#D97706]",
  },
];

export default function AiAutomationIndustries() {
  return (
    <section className="bg-gradient-to-b from-white via-[#F5EBFF]/30 to-[#E8F9FF]/40 py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F9FF] border border-[#3BC8F6]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#0284C7]" color="#0284C7" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#0284C7] font-semibold">
              Targeted Domains
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#000000] tracking-tight leading-[1.02]">
            Industries <span className="text-brand-gradient">We Serve</span>
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Tailored AI automation solutions engineered for diverse enterprise domains, driving operational excellence and scalable momentum.
          </p>
        </div>

        {/* 6 Industry Cards (3x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {INDUSTRIES.map((ind) => (
            <BorderGlow
              key={ind.title}
              borderRadius={18}
              backgroundColor="#ffffff"
              glowColor="200 95 65"
              glowRadius={32}
              colors={["#3BC8F6", "#C07DFF", "#0284C7"]}
              className="h-full"
            >
              <div className="group bg-white rounded-2xl p-7 transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  {/* Icon Container */}
                  <div
                    className={`w-13 h-13 rounded-xl bg-gradient-to-br ${ind.badgeColor} border flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform`}
                  >
                    {ind.icon}
                  </div>

                  <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-xl sm:text-2xl text-[#000000] tracking-tight leading-snug mb-3 group-hover:text-[#0284C7] transition-colors">
                    {ind.title}
                  </h3>

                  <p className="font-sans text-stone-600 text-sm leading-relaxed">
                    {ind.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider text-stone-400 group-hover:text-[#3BC8F6] transition-colors">
                  <span>Enterprise Ready</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}

