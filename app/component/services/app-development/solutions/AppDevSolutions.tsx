import React from "react";
import Image from "next/image";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import BorderGlow from "@/app/component/global/ui/BorderGlow";

const SOLUTIONS = [
  {
    title: "Business Automation Solutions",
    desc: "Streamline field operations, enterprise workflow approvals, inventory scans, and internal messaging with secure enterprise mobile applications.",
    image: "/images/services/ai-bots.webp",
    tag: "Enterprise Automation",
  },
  {
    title: "Custom AI Workflow Automation",
    desc: "Embed on-device machine learning, voice transcription, computer vision, and context-aware predictive recommendations directly into mobile workflows.",
    image: "/images/services/ai-automation.webp",
    tag: "Mobile AI Models",
  },
  {
    title: "Custom Mobile App Development",
    desc: "Full-lifecycle bespoke mobile engineering from architectural blueprint through App Store submission, engineered for ultra-fast load times and fluid 60FPS UI.",
    image: "/images/services/app-development.webp",
    tag: "Bespoke Mobile",
  },
  {
    title: "Seamless System Integration",
    desc: "Effortlessly bridge your mobile app with legacy enterprise databases, custom REST/GraphQL APIs, Salesforce/HubSpot CRMs, and payment gateways.",
    image: "/images/services/software-development.webp",
    tag: "APIs & Webhooks",
  },
  {
    title: "Scalable Cloud Backends",
    desc: "High-concurrency serverless and microservices architectures built on AWS, GCP, and Firebase delivering sub-50ms latency at million-user scale.",
    image: "/images/services/predictive-analytics.webp",
    tag: "Cloud Infrastructure",
  },
  {
    title: "Agile Development Process",
    desc: "Bi-weekly sprint iterations, transparent GitHub/Jira roadmaps, continuous CI/CD pipelines, and early prototype validation with your team.",
    image: "/images/services/lead-funnels.webp",
    tag: "Agile Sprints",
  },
  {
    title: "Performance & Security Optimization",
    desc: "End-to-end AES-256 data encryption, biometric authentication (FaceID/Fingerprint), OWASP Mobile compliance, and battery-efficient network caching.",
    image: "/images/services/digital-marketing.webp",
    tag: "Hardened Security",
  },
];

export default function AppDevSolutions() {
  return (
    <section id="solutions" className="bg-white py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F9FF] border border-[#3BC8F6]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#0284C7]" color="#0284C7" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#0284C7] font-semibold">
              Comprehensive Capabilities
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#000000] tracking-tight leading-[1.02]">
            Innovative <span className="text-brand-gradient">App Solutions</span>
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            Cutting-edge mobile applications tailored for your industry and user base, built to scale effortlessly from MVP to millions of active users.
          </p>
        </div>

        {/* 7 Solutions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SOLUTIONS.map((service, idx) => (
            <BorderGlow
              key={service.title}
              borderRadius={18}
              backgroundColor="#ffffff"
              glowColor="200 95 65"
              glowRadius={34}
              colors={["#3BC8F6", "#C07DFF", "#0284C7"]}
              className={`h-full ${
                idx === 6 ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""
              }`}
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

                {/* Card Footer CTA */}
                <div className="px-6 pb-6 pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs font-[family-name:var(--font-oswald)] uppercase font-bold tracking-wider text-[#0284C7] group-hover:text-[#C07DFF] transition-colors"
                  >
                    <span>Consult Mobile Architect</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </a>
                </div>
              </article>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}

