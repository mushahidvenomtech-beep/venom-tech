import React from "react";
import Image from "next/image";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const OFFERINGS = [
  {
    title: "Marketing Automation",
    desc: "Automated lead nurture sequences, behavioral SMS/email triggers, and real-time CRM data sync that maximize sales velocity.",
    image: "/images/services/lead-funnels.webp",
    tag: "Automation Funnels",
  },
  {
    title: "Paid Social Campaigns",
    desc: "High-ROAS Meta (Instagram & Facebook), TikTok, and LinkedIn performance campaigns engineered for maximum impulse conversion.",
    image: "/images/services/digital-marketing.webp",
    tag: "Paid Social",
  },
  {
    title: "Performance Analytics",
    desc: "Multi-touch attribution models, customer lifetime value (LTV) forecasting, and live real-time marketing intelligence dashboards.",
    image: "/images/services/predictive-analytics.webp",
    tag: "Attribution & ROAS",
  },
  {
    title: "Search Advertising & PPC",
    desc: "High-intent Google Search, Performance Max, and Shopping campaigns optimized to capture ready-to-buy consumers immediately.",
    image: "/images/services/ai-bots.webp",
    tag: "Google Ads & PPC",
  },
  {
    title: "Conversion Rate Optimization",
    desc: "Custom high-velocity landing pages, multivariate split testing, and post-click user journeys that double your return on every ad dollar.",
    image: "/images/services/ui-design.webp",
    tag: "Landing Page CRO",
  },
];

export default function AdvertisingOfferings() {
  return (
    <section id="offerings" className="bg-white py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F9FF] border border-[#3BC8F6]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#0284C7]" color="#0284C7" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#0284C7] font-semibold">
              Advanced Solutions
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#000000] tracking-tight leading-[1.02]">
            Our Advertising <span className="text-brand-gradient">Capabilities</span>
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Cutting-edge paid media engineering tailored to scale your brand across every stage of the customer acquisition funnel.
          </p>
        </div>

        {/* 5 Solutions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {OFFERINGS.map((service, idx) => (
            <article
              key={service.title}
              className={`group bg-white border border-[#E8E2F2] hover:border-[#3BC8F6] rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_18px_40px_rgba(59,200,246,0.14)] transition-all duration-300 flex flex-col justify-between ${
                idx === 3 ? "lg:col-start-1" : idx === 4 ? "lg:col-start-2" : ""
              }`}
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-900">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-[family-name:var(--font-oswald)] text-[11px] uppercase tracking-wider font-semibold border border-white/20">
                    {service.tag}
                  </span>
                  <span className="absolute top-3.5 right-3.5 font-[family-name:var(--font-oswald)] text-lg font-bold text-white/80">
                    0{idx + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-xl sm:text-2xl text-[#000000] tracking-tight leading-snug mb-3 group-hover:text-[#0284C7] transition-colors">
                    {service.title}
                  </h3>

                  <p className="font-sans text-stone-600 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="px-6 pb-6 pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-[family-name:var(--font-oswald)] uppercase font-bold tracking-wider text-[#0284C7] group-hover:text-[#C07DFF] transition-colors"
                >
                  <span>Request Media Audit</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

