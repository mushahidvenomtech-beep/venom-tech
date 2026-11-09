import React from "react";
import type { Metadata } from "next";
import Navbar from "@/app/component/global/navigation/Navbar";
import HomeFooter from "@/app/components/home/footer/HomeFooter";
import BpoHero from "@/app/component/services/bpo-services/hero/BpoHero";
import BpoSolutions from "@/app/component/services/bpo-services/solutions/BpoSolutions";
import BpoFoundations from "@/app/component/services/bpo-services/foundations/BpoFoundations";
import BpoProcess from "@/app/component/services/bpo-services/process/BpoProcess";

export const metadata: Metadata = {
  title: "Smart BPO Solutions & Outsourcing Services | Venom Tech IT Solution",
  description:
    "Scale operations seamlessly with smart BPO solutions by Venom Tech. Inbound/outbound call centers, telemarketing, 24/7 customer support, lead generation, and back-office support.",
  alternates: {
    canonical: "/screens/services/bpo-services",
  },
  openGraph: {
    title: "Smart BPO Solutions Built for Modern Businesses | Venom Tech",
    description:
      "Dependable outsourcing support that helps businesses improve efficiency, maintain accuracy, and scale confidently around the clock.",
    url: "/screens/services/bpo-services",
    images: [{ url: "/images/services/bpo-hero.webp" }],
  },
};

const jsonLdBpo = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Smart BPO Solutions & Business Process Outsourcing by Venom Tech",
  description:
    "Professional business process outsourcing services including inbound/outbound call centers, customer support, telemarketing, lead generation, and back-office processing.",
  provider: {
    "@type": "Organization",
    name: "Venom Tech IT Solution",
    url: "https://venomtech.pk",
    logo: "https://venomtech.pk/images/venom tech logo.png",
  },
  areaServed: ["Pakistan", "Global"],
  serviceType: [
    "Inbound & Outbound Call Center Services",
    "24/7 Omnichannel Customer Support",
    "Telemarketing & Inside Sales",
    "Targeted B2B Lead Generation",
    "AI & Workflow Automation Support",
    "Content Moderation & Compliance",
    "Back Office Data Processing & Operations",
  ],
};

export default function BpoServicesPage() {
  return (
    <div className="min-h-screen bg-transparent text-[#000000] selection:bg-[#C07DFF] selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBpo) }}
      />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main BPO Services Content */}
      <main id="main-content">
        {/* 1. Hero with Team Office Photography */}
        <BpoHero />

        {/* 2. Outsourcing Solutions Designed Around Your Business (8 Cards) */}
        <BpoSolutions />

        {/* 3. Foundations That Shape How We Work (4 Pillars) */}
        <BpoFoundations />

        {/* 4. A Clear Path From Planning to Growth (4 Steps) */}
        <BpoProcess />
      </main>

      {/* Global Brand Footer */}
      <HomeFooter />
    </div>
  );
}

