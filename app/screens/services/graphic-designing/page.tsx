import React from "react";
import type { Metadata } from "next";
import Navbar from "@/app/component/global/navigation/Navbar";
import HomeFooter from "@/app/components/home/footer/HomeFooter";
import PortfolioSection from "@/app/components/home/portfolio/PortfolioSection";
import TestimonialsSection from "@/app/components/home/testimonials/TestimonialsSection";
import GraphicDesignHero from "@/app/component/services/graphic-designing/hero/GraphicDesignHero";
import GraphicDesignStats from "@/app/component/services/graphic-designing/stats/GraphicDesignStats";
import GraphicDesignServices from "@/app/component/services/graphic-designing/offerings/GraphicDesignServices";
import GraphicDesignCallout from "@/app/component/services/graphic-designing/callout/GraphicDesignCallout";
import GraphicDesignWhyNeed from "@/app/component/services/graphic-designing/whyneed/GraphicDesignWhyNeed";
import GraphicDesignWhyChoose from "@/app/component/services/graphic-designing/whychoose/GraphicDesignWhyChoose";
import GraphicDesignProcess from "@/app/component/services/graphic-designing/process/GraphicDesignProcess";
import GraphicDesignFaq from "@/app/component/services/graphic-designing/faq/GraphicDesignFaq";

export const metadata: Metadata = {
  title: "Professional Graphic Designing Services in Lahore | Venom Tech IT Solution",
  description:
    "Award-winning graphic design services by Venom Tech in Lahore. Brand identity, custom logo design, high-converting social media creatives, packaging, and UI/UX graphics.",
  alternates: {
    canonical: "/screens/services/graphic-designing",
  },
  openGraph: {
    title: "Professional Graphic Designing in Lahore | Venom Tech IT Solution",
    description:
      "Turn your business vision into visual reality with bespoke brand identity, logo design, packaging, and digital marketing graphics by Venom Tech.",
    url: "/screens/services/graphic-designing",
    images: [{ url: "/images/services/ui-design.webp" }],
  },
};

const jsonLdGraphicDesign = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Professional Graphic Designing Services in Lahore by Venom Tech",
  description:
    "Creative visual branding, logo design, marketing collateral, social media creatives, and print packaging engineered for modern enterprises.",
  provider: {
    "@type": "Organization",
    name: "Venom Tech IT Solution",
    url: "https://venomtech.pk",
    logo: "https://venomtech.pk/images/venom tech logo.webp",
  },
  areaServed: ["Lahore", "Pakistan", "Global"],
  serviceType: [
    "Logo Design & Brand Identity Systems",
    "Social Media Graphics & Paid Ad Creatives",
    "Website & Mobile App UI/UX Design",
    "Packaging & Print Media Design",
    "Corporate Stationery & Marketing Collaterals",
    "Motion Graphics & Visual Animation",
  ],
};

export default function GraphicDesigningPage() {
  return (
    <div className="min-h-screen bg-transparent text-[#000000] selection:bg-[#C07DFF] selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraphicDesign) }}
      />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Graphic Design Content */}
      <main id="main-content">
        {/* 1. Hero with Consultation Form */}
        <GraphicDesignHero />

        {/* 2. Key Metrics Stats Bar (60+, 24+, 11%, 1+) */}
        <GraphicDesignStats />

        {/* 3. Our Graphic Design Services (4 Core Cards) */}
        <GraphicDesignServices />

        {/* 4. Visual Reality Callout Banner */}
        <GraphicDesignCallout />

        {/* 5. Why You Need Professional Graphic Designing in Lahore */}
        <GraphicDesignWhyNeed />

        {/* 6. Why Choose Venom Tech? (7 Visual Service Cards) */}
        <GraphicDesignWhyChoose />

        {/* 7. Our Graphic Design Process (5-Stage Tree Flowchart) */}
        <GraphicDesignProcess />

        {/* 8. Portfolio Showcase */}
        <PortfolioSection />

        {/* 9. What Our Clients Say (Verified Client Reviews) */}
        <TestimonialsSection />

        {/* 9. Frequently Asked Questions Accordion */}
        <GraphicDesignFaq />
      </main>

      {/* Global Brand Footer */}
      <HomeFooter />
    </div>
  );
}

