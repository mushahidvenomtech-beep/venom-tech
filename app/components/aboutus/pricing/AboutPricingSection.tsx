import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const PRICING_TIERS = [
  {
    name: "Silver Package",
    price: "299",
    period: "/ Month",
    desc: "Ideal for early-stage startups needing rapid identity sprint and design foundation.",
    features: [
      "Brand Core & Identity Guidelines",
      "Essential UI/UX Wireframe Systems",
      "One Landing Page Design (Next.js)",
      "Weekly Progress Review Calls",
      "Figma Source Assets Included",
    ],
    highlight: false,
    peachBg: false,
  },
  {
    name: "Golden Package",
    price: "499",
    period: "/ Month",
    desc: "Our most requested full-service engagement for scaling digital companies.",
    features: [
      "Complete Brand Strategy & Design System",
      "Full Next.js & React 19 Frontend App",
      "Fluid Motion & Micro-Interactions",
      "Dedicated Slack Channel & Senior Lead",
      "Headless CMS Integration",
      "SEO & Speed Benchmarking Guarantee",
    ],
    highlight: true,
    peachBg: false,
  },
  {
    name: "Platinum Package",
    price: "799",
    period: "/ Month",
    desc: "Embedded senior design and engineering pod for category-defining enterprises.",
    features: [
      "Full Digital Ecosystem & App Suite",
      "Continuous Iteration & Design Sprints",
      "Kinetic 3D Visuals & Custom Canvas",
      "Priority Same-Day Turnaround SLAs",
      "Direct Founder / Partner Involvements",
      "Full Intellectual Property Handover",
    ],
    highlight: false,
    peachBg: true,
  },
];

export default function AboutPricingSection() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
          <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
            Pricing Plans
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-6xl text-[#111111] tracking-tight mb-4">
          Flexible Plans, <span className="text-[#C07DFF]">Big Impact.</span>
        </h2>
        <p className="font-sans text-stone-600 text-base sm:text-lg">
          Transparent, predictable investment models structured for rapid execution, senior craft, and measurable business momentum.
        </p>
      </div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`p-8 sm:p-10 border transition-all duration-300 flex flex-col justify-between shadow-sm relative ${
              tier.peachBg
                ? "bg-[#FDF0E7] border-[#E8E2F2] hover:border-black"
                : tier.highlight
                ? "bg-white border-2 border-black shadow-xl"
                : "bg-white border-stone-200 hover:border-black"
            }`}
          >
            {tier.highlight && (
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white text-[11px] font-[family-name:var(--font-oswald)] uppercase tracking-widest font-bold px-3 py-1">
                Recommended
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider text-stone-500 font-bold">
                  {tier.name}
                </span>
                <AsteriskIcon className="w-5 h-5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-[family-name:var(--font-oswald)] font-extrabold text-2xl text-[#C07DFF]">$</span>
                <span className="font-[family-name:var(--font-oswald)] font-extrabold text-5xl sm:text-6xl text-[#111111] leading-none">
                  {tier.price}
                </span>
                <span className="font-sans text-xs uppercase tracking-wider text-stone-500 ml-1">
                  {tier.period}
                </span>
              </div>

              <p className="font-sans text-stone-600 text-sm leading-relaxed mb-6">
                {tier.desc}
              </p>

              <div className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider font-semibold text-stone-400 mb-3">
                Included Features
              </div>

              <ul className="space-y-3 border-t border-stone-200/60 pt-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-xs font-sans text-stone-700">
                    <span className="text-[#C07DFF] font-bold mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="/screens/contactus"
              className="w-full py-4 text-center font-[family-name:var(--font-oswald)] uppercase font-semibold text-sm tracking-wider transition-all duration-300 block bg-black hover:bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white group"
            >
              <span>Get Started</span>
              <span className="text-[#C07DFF] group-hover:text-white transition-colors ml-1.5">&rarr;</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

