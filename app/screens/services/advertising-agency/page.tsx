import React from "react";
import type { Metadata } from "next";
import Navbar from "@/app/component/global/navigation/Navbar";
import HomeFooter from "@/app/components/home/footer/HomeFooter";
import PortfolioSection from "@/app/components/home/portfolio/PortfolioSection";
import TestimonialsSection from "@/app/components/home/testimonials/TestimonialsSection";
import AdvertisingHero from "@/app/component/services/advertising-agency/hero/AdvertisingHero";
import AdvertisingStats from "@/app/component/services/advertising-agency/stats/AdvertisingStats";
import AdvertisingServices from "@/app/component/services/advertising-agency/services/AdvertisingServices";
import AdvertisingOfferings from "@/app/component/services/advertising-agency/offerings/AdvertisingOfferings";
import AdvertisingCallout from "@/app/component/services/advertising-agency/callout/AdvertisingCallout";
import AdvertisingWhyChoose from "@/app/component/services/advertising-agency/whychoose/AdvertisingWhyChoose";
import AdvertisingProcess from "@/app/component/services/advertising-agency/process/AdvertisingProcess";
import AdvertisingFaq from "@/app/component/services/advertising-agency/faq/AdvertisingFaq";

export const metadata: Metadata = {
  title: "Leading Advertising Agency in Lahore | Venom Tech IT Solution",
  description:
    "Scale your brand with Venom Tech, a leading advertising agency in Lahore. Multi-channel performance marketing, Meta & Google ads, creative video production, and CRO.",
  alternates: {
    canonical: "/screens/services/advertising-agency",
  },
  openGraph: {
    title: "Leading Advertising Agency in Lahore | Venom Tech IT Solution",
    description:
      "Transform clicks into loyal customers with high-converting digital advertising, precision audience targeting, and real-time ROAS scaling.",
    url: "/screens/services/advertising-agency",
    images: [{ url: "/images/services/digital-marketing.webp" }],
  },
};

const jsonLdAdvertising = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Performance Advertising Agency Services in Lahore by Venom Tech",
  description:
    "Full-funnel digital advertising solutions including Meta ads, Google PPC, TikTok campaigns, creative video production, and conversion rate optimization.",
  provider: {
    "@type": "Organization",
    name: "Venom Tech IT Solution",
    url: "https://venomtech.pk",
    logo: "https://venomtech.pk/images/venom tech logo.webp",
  },
  areaServed: ["Lahore", "Pakistan", "Global"],
  serviceType: [
    "Meta Advertising (Facebook & Instagram Ads)",
    "Google Ads (Search, Performance Max & YouTube Ads)",
    "TikTok & Short-Form Video Advertising",
    "Direct-Response Creative & Copywriting",
    "Omnichannel Attribution & ROAS Optimization",
  ],
};

export default function AdvertisingAgencyPage() {
  return (
    <div className="min-h-screen bg-transparent text-[#000000] selection:bg-[#C07DFF] selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAdvertising) }}
      />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Advertising Agency Content */}
      <main id="main-content">
        {/* 1. Hero with Proposal Request Form */}
        <AdvertisingHero />

        {/* 2. Key Metrics Stats Bar (1,000+, 2,500+, 87%, 100+) */}
        <AdvertisingStats />

        {/* 3. Our Advertising Services (4 Core Cards) */}
        <AdvertisingServices />

        {/* 4. Our Advertising Offerings (5 Visual Cards) */}
        <AdvertisingOfferings />

        {/* 5. Advertising Expert Callout Banner */}
        <AdvertisingCallout />

        {/* 6. Why Choose Venom Tech as Your Advertising Agency */}
        <AdvertisingWhyChoose />

        {/* 7. How Our Advertising Agency Works (5-Stage Tree Flowchart) */}
        <AdvertisingProcess />

        {/* 8. Portfolio Showcase */}
        <PortfolioSection />

        {/* 9. What Our Clients Say (Verified Client Reviews) */}
        <TestimonialsSection />

        {/* 9. Frequently Asked Questions Accordion */}
        <AdvertisingFaq />
      </main>

      {/* Global Brand Footer */}
      <HomeFooter />
    </div>
  );
}

