import React from "react";
import type { Metadata } from "next";
import Navbar from "@/app/component/global/navigation/Navbar";
import HomeFooter from "@/app/components/home/footer/HomeFooter";
import PortfolioSection from "@/app/components/home/portfolio/PortfolioSection";
import CareersHero from "@/app/component/careers/hero/CareersHero";
import CareersWhyChoose from "@/app/component/careers/whychoose/CareersWhyChoose";
import CareersJobPortal from "@/app/component/careers/portal/CareersJobPortal";

export const metadata: Metadata = {
  title: "Careers | Join Our Creative Digital Team | Venom Tech IT Solution",
  description:
    "Explore career opportunities at Venom Tech IT Solution. Join our team of developers, designers, and innovators working on modern digital platforms.",
  openGraph: {
    title: "Careers at Venom Tech IT Solution",
    description: "Join our creative digital team. Flexible work, career growth, and cutting-edge digital projects.",
    images: [{ url: "/images/careers-hero.webp" }],
  },
};

const jsonLdCareers = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Careers at Venom Tech IT Solution",
  description: "Join our creative digital team at Venom Tech IT Solution.",
  url: "https://venomtech.pk/screens/careers",
  publisher: {
    "@type": "Organization",
    name: "Venom Tech IT Solution",
    url: "https://venomtech.pk",
    logo: "https://venomtech.pk/images/venom tech logo.webp",
  },
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans selection:bg-[#C07DFF] selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCareers) }}
      />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Careers Content */}
      <main id="main-content" className="flex-1">
        {/* 1. Hero Section */}
        <CareersHero />

        {/* 2. Why Choose Venom Tech IT Solution */}
        <CareersWhyChoose />

        {/* 3. Job Available Portal */}
        <CareersJobPortal />

        {/* 4. Portfolio Showcase */}
        <PortfolioSection />
      </main>

      {/* Unified Global Brand Footer */}
      <HomeFooter />
    </div>
  );
}

