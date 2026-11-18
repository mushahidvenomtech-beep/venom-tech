import React from "react";
import Link from "next/link";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import BorderGlow from "@/app/component/global/ui/BorderGlow";

const SERVICES_8 = [
  {
    num: "01",
    title: "Brand Identity",
    desc: "Logos, colour palettes and brand guidelines that make your business instantly recognisable.",
    link: "/screens/services/graphic-designing",
    icon: (
      <svg className="w-6 h-6 text-[#C07DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Website Design & Development",
    desc: "Fast, mobile-friendly, SEO-ready websites designed to convert visitors into customers.",
    link: "/screens/services/app-development",
    icon: (
      <svg className="w-6 h-6 text-[#C07DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Content Creation",
    desc: "Blogs, website copy and social content written to rank on Google and engage your audience.",
    link: "/screens/services/seo",
    icon: (
      <svg className="w-6 h-6 text-[#C07DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Video Marketing",
    desc: "Reels, explainer videos and video ads that capture attention and drive action.",
    link: "/screens/services/advertising-agency",
    icon: (
      <svg className="w-6 h-6 text-[#C07DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Graphic Design",
    desc: "Social media posts, marketing materials and print designs that look professional and on-brand.",
    link: "/screens/services/graphic-designing",
    icon: (
      <svg className="w-6 h-6 text-[#C07DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polygon points="12 8 8 12 12 16 16 12 12 8" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Digital Marketing",
    desc: "SEO, Google Ads and Meta Ads campaigns built around measurable ROI.",
    link: "/screens/services/advertising-agency",
    icon: (
      <svg className="w-6 h-6 text-[#C07DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    num: "07",
    title: "Social Media Management",
    desc: "Content calendars, posting, community management and monthly reporting.",
    link: "/screens/services/advertising-agency",
    icon: (
      <svg className="w-6 h-6 text-[#C07DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
  {
    num: "08",
    title: "Creative Strategy",
    desc: "Research-backed campaign ideas and positioning that set you apart from competitors.",
    link: "/screens/services",
    icon: (
      <svg className="w-6 h-6 text-[#C07DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

export default function ServicesGridSection() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 bg-[#F4E9FF] border border-[#C07DFF]/30 rounded-full">
          <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
          <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
            Our Services
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-[34px] sm:text-[44px] lg:text-[48px] text-[#111111] tracking-tight leading-[1.08] mb-4">
          From Concept <span className="text-brand-gradient">to Completion</span>
        </h2>
        <p className="font-sans text-stone-600 text-base sm:text-lg leading-relaxed">
          Venom Tech supports your brand at every stage, from the first brainstorm and wireframe to launch, promotion and ongoing optimization. Whether you need a new identity, a high-converting website or a full digital marketing plan, our Lahore-based team delivers services that work together to grow your business across Pakistan and beyond.
        </p>
      </div>

      {/* 8 Capability Cards (4x2 Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES_8.map((service) => (
          <BorderGlow
            key={service.num}
            borderRadius={18}
            backgroundColor="#ffffff"
            glowColor="275 80 75"
            glowRadius={32}
            colors={["#C07DFF", "#3BC8F6", "#9333ea"]}
            className="h-full"
          >
            <Link
              href={service.link}
              className="p-7 sm:p-8 bg-white h-full transition-all duration-300 group flex flex-col justify-between block cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6]/10 border border-[#C07DFF]/20 flex items-center justify-center group-hover:bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] group-hover:text-white transition-colors duration-300 rounded-lg">
                    {service.icon}
                  </div>
                  <span className="font-[family-name:var(--font-oswald)] font-bold text-lg text-stone-300 group-hover:text-[#C07DFF] transition-colors">
                    {service.num}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl text-[#111111] mb-2 group-hover:text-[#C07DFF] transition-colors">
                  {service.title}
                </h3>
                <p className="font-sans text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-stone-100 flex items-center justify-between text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-stone-400 group-hover:text-[#C07DFF] transition-colors">
                <span>Explore Service</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>
          </BorderGlow>
        ))}
      </div>
    </section>
  );
}

