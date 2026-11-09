"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";

const SERVICES_CATALOG = [
  {
    title: "AI Automation Services",
    slug: "/screens/services/ai-automation",
    image: "/images/services/ai-automation.webp",
    leadsCount: 14,
    views: "3,480",
    status: "Live & Active",
    desc: "Intelligent RPA workflows, custom LLM integrations, and predictive enterprise pipelines.",
  },
  {
    title: "Mobile App Development",
    slug: "/screens/services/app-development",
    image: "/images/services/app-development.webp",
    leadsCount: 11,
    views: "2,910",
    status: "Live & Active",
    desc: "High-performance iOS Swift, Android Kotlin, and Flutter cross-platform architecture.",
  },
  {
    title: "Graphic Designing",
    slug: "/screens/services/graphic-designing",
    image: "/images/services/ui-design.webp",
    leadsCount: 9,
    views: "4,120",
    status: "Live & Active",
    desc: "Visual branding, luxury print packaging, corporate guidelines, and social ad creatives.",
  },
  {
    title: "SEO Services in Lahore",
    slug: "/screens/services/seo",
    image: "/images/services/predictive-analytics.webp",
    leadsCount: 8,
    views: "5,640",
    status: "Live & Active",
    desc: "Technical site audits, semantic keyword mapping, Core Web Vitals, and high-DA link building.",
  },
  {
    title: "Performance Advertising Agency",
    slug: "/screens/services/advertising-agency",
    image: "/images/services/digital-marketing.webp",
    leadsCount: 4,
    views: "1,890",
    status: "Live & Active",
    desc: "Meta & Google performance ads, creative video production, and ROAS scaling.",
  },
  {
    title: "Smart BPO Solutions",
    slug: "/screens/services/bpo-services",
    image: "/images/services/bpo-hero.webp",
    leadsCount: 2,
    views: "1,450",
    status: "Live & Active",
    desc: "Inbound/outbound call centers, 24/7 customer support, and administrative back office.",
  },
];

export default function DashboardServices() {
  const { isDark } = useDashboardTheme();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2
            className={`font-[family-name:var(--font-oswald)] uppercase font-extrabold text-2xl sm:text-3xl tracking-tight ${
              isDark ? "text-white" : "text-[#111111]"
            }`}
          >
            Services <span className="text-brand-gradient">Catalog &amp; Funnels</span>
          </h2>
          <p className={`font-sans text-xs sm:text-sm ${isDark ? "text-stone-400" : "text-stone-600"}`}>
            Monitoring active service offerings, conversion rates, and live public landing page endpoints.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-semibold ${
              isDark
                ? "bg-emerald-950/60 border-emerald-500/30 text-emerald-300"
                : "bg-emerald-50 border-emerald-200 text-emerald-700"
            }`}
          >
            6 / 6 Services Active
          </span>
        </div>
      </div>

      {/* Grid of 6 Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES_CATALOG.map((svc) => (
          <div
            key={svc.slug}
            className={`rounded-2xl border overflow-hidden shadow-lg transition-all flex flex-col justify-between group ${
              isDark
                ? "bg-white/[0.03] border-white/10 hover:border-white/20"
                : "bg-white border-[#E8E2F2] hover:border-[#C07DFF]/50 shadow-sm hover:shadow-md"
            }`}
          >
            <div>
              {/* Image Header */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-900">
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  className={`absolute inset-0 ${
                    isDark
                      ? "bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"
                      : "bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"
                  }`}
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-semibold backdrop-blur-md">
                  {svc.status}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 text-[11px] font-mono text-white/90 backdrop-blur-md">
                  {svc.views} views
                </span>
              </div>

              {/* Body */}
              <div className="p-6 space-y-3">
                <h3
                  className={`font-[family-name:var(--font-oswald)] uppercase font-bold text-xl tracking-tight ${
                    isDark ? "text-white" : "text-[#111111]"
                  }`}
                >
                  {svc.title}
                </h3>
                <p className={`font-sans text-xs leading-relaxed ${isDark ? "text-stone-400" : "text-stone-600"}`}>
                  {svc.desc}
                </p>

                <div
                  className={`pt-2 flex items-center justify-between text-xs font-sans border-t ${
                    isDark ? "border-white/5" : "border-stone-100"
                  }`}
                >
                  <span className={isDark ? "text-stone-400" : "text-stone-600"}>Total Inquiries:</span>
                  <span className="font-mono text-[#3BC8F6] font-bold">{svc.leadsCount} leads</span>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-6 pt-0">
              <Link
                href={svc.slug}
                target="_blank"
                className={`w-full py-2.5 rounded-xl border font-[family-name:var(--font-oswald)] uppercase text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                    : "bg-stone-50 hover:bg-[#F4E9FF] border-[#E8E2F2] text-stone-700 hover:text-[#8B5CF6] shadow-sm"
                }`}
              >
                <span>Preview Live Landing Page</span>
                <span>&nearr;</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

