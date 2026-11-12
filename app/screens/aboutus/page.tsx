import React from "react";
import type { Metadata } from "next";
import Navbar from "@/app/component/global/navigation/Navbar";
import AboutHeaderBanner from "@/app/components/aboutus/header/AboutHeaderBanner";
import AboutMissionOverview from "@/app/components/aboutus/mission/AboutMissionOverview";
import AboutStatsBar from "@/app/components/aboutus/stats/AboutStatsBar";
import AboutAwardsSection from "@/app/components/aboutus/awards/AboutAwardsSection";
import AboutMissionSection from "@/app/components/aboutus/mission/AboutMissionSection";
import AboutTeamSection from "@/app/components/aboutus/team/AboutTeamSection";
import PortfolioSection from "@/app/components/home/portfolio/PortfolioSection";
import AboutCtaBanner from "@/app/components/aboutus/cta/AboutCtaBanner";
import AboutClientsStrip from "@/app/components/aboutus/clients/AboutClientsStrip";
import HomeFooter from "@/app/components/home/footer/HomeFooter";

export const metadata: Metadata = {
  title: "About Us | CREAT* - Digital Studio & Creative Collective",
  description: "Learn about CREAT*, an award-winning creative studio engineering high-impact visual identities, digital platforms, and spatial motion since 1998.",
  alternates: {
    canonical: "/screens/aboutus",
  },
  openGraph: {
    title: "About Us | CREAT* Creative Studio",
    description: "Explore our story, leadership, global awards, and design ethos.",
    url: "/screens/aboutus",
    type: "website",
  },
};

const jsonLdAbout = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About CREAT*",
  description: "Independent creative studio engineering visual identities and bespoke web platforms.",
  mainEntity: {
    "@type": "Organization",
    name: "CREAT*",
    foundingDate: "1998",
    award: ["Awwwards Site of the Year 2025", "FWA of the Month", "Red Dot Design Award"],
  },
};

export default function AboutUsScreen() {
  return (
    <div className="min-h-screen bg-transparent text-[#000000]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAbout) }}
      />
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Main About Us Page Sections */}
      <main id="main-content">
        {/* Breadcrumb Header Banner */}
        <AboutHeaderBanner />

        {/* Mission Overview with 3 Highlights & Team Collaborative Visual */}
        <AboutMissionOverview />

        {/* By The Numbers / Stats */}
        <AboutStatsBar />

        {/* Our Vision Section */}
        <AboutAwardsSection />

        {/* Our Mission Section */}
        <AboutMissionSection />

        {/* The Minds Behind The Magic (4 Team Members) */}
        <AboutTeamSection />

        {/* Portfolio Showcase */}
        <PortfolioSection />

        {/* Full-Width Black CTA Banner */}
        <AboutCtaBanner />

        {/* Recognized By Global Brands Client Strip */}
        <AboutClientsStrip />
      </main>

      {/* 3. Comprehensive Brand Footer */}
      <HomeFooter />
    </div>
  );
}

