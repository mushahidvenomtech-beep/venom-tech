import React from "react";
import Image from "next/image";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import BorderGlow from "@/app/component/global/ui/BorderGlow";

const OFFERINGS = [
  {
    title: "Robotic Process Automation (RPA)",
    desc: "Automate repetitive, high-volume rule-based tasks across desktop, cloud, and legacy enterprise software without modifying existing architectures.",
    image: "/images/services/ai-bots.webp",
    tag: "Core Automation",
  },
  {
    title: "Workflow Automation & Integration",
    desc: "Connect disparate SaaS tools, ERPs, and databases into cohesive, self-healing automated pipelines with real-time webhooks and triggers.",
    image: "/images/services/ai-automation.webp",
    tag: "System Integration",
  },
  {
    title: "AI Chatbots & Virtual Assistants",
    desc: "Deploy context-aware conversational AI agents trained on your proprietary knowledge base for 24/7 autonomous customer onboarding and support.",
    image: "/images/services/ar-vr.webp",
    tag: "Conversational AI",
  },
  {
    title: "CRM & Marketing Automation",
    desc: "Automate high-converting lead capture, behavioral segmentation, dynamic email campaigns, and pipeline handoffs with zero manual friction.",
    image: "/images/services/lead-funnels.webp",
    tag: "Growth Engine",
  },
  {
    title: "Custom AI Workflow Automation",
    desc: "Bespoke AI solutions leveraging state-of-the-art LLMs, neural networks, and computer vision tailored to your proprietary operational logic.",
    image: "/images/services/software-development.webp",
    tag: "Bespoke Models",
  },
  {
    title: "Data & Analytics Automation",
    desc: "Automate real-time data ingestion, transformation, and automated predictive intelligence dashboards that deliver actionable insight instantly.",
    image: "/images/services/predictive-analytics.webp",
    tag: "Predictive Intelligence",
  },
];

export default function AiAutomationOfferings() {
  return (
    <section id="offerings" className="bg-white py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F9FF] border border-[#3BC8F6]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#0284C7]" color="#0284C7" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#0284C7] font-semibold">
              Capabilities
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#000000] tracking-tight leading-[1.02]">
            Our AI Automation <span className="text-brand-gradient">Services</span>
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Enterprise-grade AI automation workflows engineered to scale operations, eliminate manual bottlenecks, and maximize bottom-line profitability.
          </p>
        </div>

        {/* 6 Visual Service Cards (3x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {OFFERINGS.map((service, idx) => (
            <BorderGlow
              key={service.title}
              borderRadius={18}
              backgroundColor="#ffffff"
              glowColor="200 95 65"
              glowRadius={34}
              colors={["#3BC8F6", "#C07DFF", "#0284C7"]}
              className="h-full"
            >
              <article className="group bg-white h-full transition-all duration-300 flex flex-col justify-between">
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

                {/* Bottom Footer Link */}
                <div className="p-6 sm:p-7 pt-0 border-t border-stone-100 mt-4 flex items-center justify-between">
                  <a
                    href="/screens/contactus"
                    className="inline-flex items-center gap-2 text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-[#0284C7] hover:text-[#000000] transition-colors"
                  >
                    <span>Request Custom Setup</span>
                    <span>&rarr;</span>
                  </a>
                  <span className="w-2 h-2 rounded-full bg-[#3BC8F6] opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
              </article>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}

