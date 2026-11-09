import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const TIERS = [
  {
    name: "Brand Sprint",
    price: "$9,500",
    timeline: "2-3 Weeks",
    desc: "For startups seeking an unmistakable brand identity and style system.",
    features: [
      "Core Positioning & Voice",
      "Full Logo Suite & Color System",
      "Typography Guidelines",
      "Social & Pitch Deck Templates",
      "Figma Brand Guidelines File",
    ],
    highlight: false,
  },
  {
    name: "Flagship Digital",
    price: "$24,000",
    timeline: "4-6 Weeks",
    desc: "Our signature bespoke Next.js website and identity architecture.",
    features: [
      "Complete Custom UI/UX Design",
      "Full Next.js & React 19 Engineering",
      "Fluid Animations & Micro-Interactions",
      "Headless CMS Integration",
      "SEO & Speed Benchmarking",
      "Direct Creative Partner Access",
    ],
    highlight: true,
  },
  {
    name: "Enterprise Studio",
    price: "Custom",
    timeline: "Ongoing Retainer",
    desc: "Dedicated creative director and senior developers embedded in your roadmap.",
    features: [
      "Dedicated Senior Pod",
      "Weekly Sprints & Strategy Calls",
      "Product UI/UX & Web Apps",
      "Continuous Design System Growth",
      "Guaranteed SLAs & Support",
    ],
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`p-8 sm:p-10 border transition-all duration-300 flex flex-col justify-between ${
              tier.highlight
                ? "bg-black text-white border-black shadow-2xl relative"
                : "bg-white text-[#111111] border-stone-200 hover:border-black"
            }`}
          >
            {tier.highlight && (
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white text-[11px] font-[family-name:var(--font-oswald)] uppercase tracking-widest font-bold px-3 py-1">
                Most Popular
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider font-semibold ${
                    tier.highlight ? "text-[#C07DFF]" : "text-stone-500"
                  }`}
                >
                  {tier.timeline}
                </span>
                <AsteriskIcon
                  className={`w-5 h-5 ${tier.highlight ? "text-[#C07DFF]" : "text-stone-300"}`}
                  color="currentColor"
                  strokeWidth={3}
                />
              </div>

              <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-3xl mb-2">
                {tier.name}
              </h3>
              <div className="font-[family-name:var(--font-oswald)] font-extrabold text-4xl sm:text-5xl text-[#C07DFF] mb-4">
                {tier.price}
              </div>
              <p
                className={`font-sans text-sm leading-relaxed mb-8 ${
                  tier.highlight ? "text-stone-300" : "text-stone-600"
                }`}
              >
                {tier.desc}
              </p>

              <div
                className={`font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider font-semibold mb-4 ${
                  tier.highlight ? "text-stone-400" : "text-stone-500"
                }`}
              >
                Included Deliverables
              </div>

              <ul className="space-y-3 border-t border-stone-200/40 pt-4 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-xs font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="/screens/contactus"
              className={`w-full py-4 text-center font-[family-name:var(--font-oswald)] uppercase font-semibold text-sm tracking-wider transition-all duration-300 block ${
                tier.highlight
                  ? "bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] hover:bg-white hover:text-black text-white"
                  : "bg-black hover:bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white"
              }`}
            >
              Select Package
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

