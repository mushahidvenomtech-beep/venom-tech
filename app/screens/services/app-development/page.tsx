import React from "react";
import type { Metadata } from "next";
import Navbar from "@/app/component/global/navigation/Navbar";
import HomeFooter from "@/app/components/home/footer/HomeFooter";
import PortfolioSection from "@/app/components/home/portfolio/PortfolioSection";
import TestimonialsSection from "@/app/components/home/testimonials/TestimonialsSection";
import AppDevHero from "@/app/component/services/app-development/hero/AppDevHero";
import AppDevStats from "@/app/component/services/app-development/stats/AppDevStats";
import AppDevChallenges from "@/app/component/services/app-development/challenges/AppDevChallenges";
import AppDevSolutions from "@/app/component/services/app-development/solutions/AppDevSolutions";
import AppDevProcess from "@/app/component/services/app-development/process/AppDevProcess";
import AppDevFaq from "@/app/component/services/app-development/faq/AppDevFaq";

export const metadata: Metadata = {
  title: "Mobile App Development Company in Pakistan | Venom Tech",
  description:
    "Venom Tech builds custom iOS, Android and cross-platform mobile apps in Lahore, Pakistan. From UI/UX to App Store launch. Get a free app consultation.",
  alternates: {
    canonical: "/screens/services/app-development",
  },
  openGraph: {
    title: "Mobile App Development Company in Pakistan | Venom Tech",
    description:
      "Venom Tech builds custom iOS, Android and cross-platform mobile apps in Lahore, Pakistan. From UI/UX to App Store launch. Get a free app consultation.",
    url: "/screens/services/app-development",
    images: [{ url: "/images/services/app-development.webp" }],
  },
};

const jsonLdAppDev = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Mobile App Development Services by Venom Tech",
  description:
    "Custom iOS, Android, and cross-platform mobile app development solutions engineered for startups and enterprise scale.",
  provider: {
    "@type": "Organization",
    name: "Venom Tech IT Solution",
    url: "https://venomtech.pk",
    logo: "https://venomtech.pk/images/venom tech logo.webp",
  },
  areaServed: "Global",
  serviceType: [
    "Native iOS App Development (Swift/SwiftUI)",
    "Native Android App Development (Kotlin)",
    "Cross-Platform App Development (Flutter & React Native)",
    "Mobile UI/UX Design & Prototyping",
    "Scalable Cloud Backends & API Integration",
    "App Store Optimization (ASO) & Maintenance",
  ],
};

export default function AppDevelopmentPage() {
  return (
    <div className="min-h-screen bg-transparent text-[#000000] selection:bg-[#C07DFF] selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAppDev) }}
      />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main App Development Content */}
      <main id="main-content">
        {/* 1. Hero with Consultation Form */}
        <AppDevHero />

        {/* 2. Key Metrics Stats Bar (110+, 275+, 10%, 5+) */}
        <AppDevStats />

        {/* 3. How Mobile App Development Solves Business Challenges */}
        <AppDevChallenges />

        {/* 4. Innovative App Solutions (7 Cards) */}
        <AppDevSolutions />

        {/* 5. Our App Development Process (Tree Flowchart) */}
        <AppDevProcess />

        {/* 6. Portfolio Showcase */}
        <PortfolioSection intro="Apps and digital products we've designed and built for our clients." />

        {/* 7. What Our Clients Say (Verified Client Reviews) */}
        <TestimonialsSection />

        {/* 7. Frequently Asked Questions Accordion */}
        <AppDevFaq />
      </main>

      {/* Global Brand Footer with App Development CTA */}
      <HomeFooter
        ctaHeading={
          <>
            Let&apos;s Build Your <span className="text-brand-gradient">App Together</span>
          </>
        }
        ctaLine="Share your idea and get a free consultation and estimate."
        ctaButtonText="Start Project"
      />
    </div>
  );
}

