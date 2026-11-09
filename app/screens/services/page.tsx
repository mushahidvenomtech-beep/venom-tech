import React from "react";
import type { Metadata } from "next";
import Navbar from "@/app/component/global/navigation/Navbar";
import ServicesHeaderBanner from "@/app/components/services/header/ServicesHeaderBanner";
import ServicesGridSection from "@/app/components/services/grid/ServicesGridSection";
import ServicesSmartEffort from "@/app/components/services/smart-effort/ServicesSmartEffort";
import ServicesStatsSection from "@/app/components/services/stats/ServicesStatsSection";
import ServicesPortfolioSection from "@/app/components/services/portfolio/ServicesPortfolioSection";
import ServicesCtaBanner from "@/app/components/services/cta/ServicesCtaBanner";
import ServicesFaqSection from "@/app/components/services/faq/ServicesFaqSection";
import HomeFooter from "@/app/components/home/footer/HomeFooter";

export const metadata: Metadata = {
  title: "Our Services & Capabilities | CREAT* - Digital Studio",
  description: "Explore our creative capabilities: AI Automation, App Development, Graphic Designing, SEO, Brand Identity, and Digital Strategy.",
  alternates: {
    canonical: "/screens/services",
  },
  openGraph: {
    title: "Services & Capabilities | CREAT* Creative Agency",
    description: "From concept to completion. Comprehensive creative and technical services tailored for scaling brands.",
    url: "/screens/services",
    type: "website",
  },
};

const jsonLdServices = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "CREAT* Agency Capabilities",
  itemListElement: [
    { "@type": "Service", name: "AI Automation", serviceType: "AI & Workflow Automation" },
    { "@type": "Service", name: "App Development", serviceType: "Full-Stack Web & Mobile Engineering" },
    { "@type": "Service", name: "Graphic Designing", serviceType: "Visual Identity & Editorial Design" },
    { "@type": "Service", name: "SEO", serviceType: "Search Engine & Conversion Optimization" },
    { "@type": "Service", name: "Advertising Agency", serviceType: "Digital Campaigns & Brand Media" },
    { "@type": "Service", name: "BPO Services", serviceType: "Business Process Operations" },
  ],
};

export default function ServicesScreen() {
  return (
    <div className="min-h-screen bg-transparent text-[#000000]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdServices) }}
      />
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Main Services Page Content */}
      <main id="main-content">
        {/* Breadcrumb Header Banner */}
        <ServicesHeaderBanner />

        {/* 8 Capability Cards Grid */}
        <ServicesGridSection />

        {/* We Work Smart, Effort That Counts */}
        <ServicesSmartEffort />

        {/* Impact in Numbers and Results */}
        <ServicesStatsSection />

        {/* Portfolio Showcase */}
        <ServicesPortfolioSection />

        {/* Full-Width Black CTA Banner */}
        <ServicesCtaBanner />

        {/* FAQ Accordion */}
        <ServicesFaqSection />
      </main>

      {/* 3. Comprehensive Brand Footer */}
      <HomeFooter />
    </div>
  );
}
