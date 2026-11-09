import React from "react";
import type { Metadata } from "next";
import Navbar from "@/app/component/global/navigation/Navbar";
import HomeFooter from "@/app/components/home/footer/HomeFooter";
import TestimonialsSection from "@/app/components/home/testimonials/TestimonialsSection";
import SeoHero from "@/app/component/services/seo/hero/SeoHero";
import SeoStats from "@/app/component/services/seo/stats/SeoStats";
import SeoServices from "@/app/component/services/seo/offerings/SeoServices";
import SeoCallout from "@/app/component/services/seo/callout/SeoCallout";
import SeoWhyNeed from "@/app/component/services/seo/whyneed/SeoWhyNeed";
import SeoProcess from "@/app/component/services/seo/process/SeoProcess";
import SeoFaq from "@/app/component/services/seo/faq/SeoFaq";

export const metadata: Metadata = {
  title: "Expert SEO Services in Lahore | Venom Tech IT Solution",
  description:
    "Dominate Google rankings with expert SEO services in Lahore by Venom Tech. High-intent keyword strategy, technical SEO audits, local GMB optimization, and high-authority link building.",
  alternates: {
    canonical: "/screens/services/seo",
  },
  openGraph: {
    title: "Expert SEO Services in Lahore | Venom Tech IT Solution",
    description:
      "Boost your online presence and turn Google search clicks into paying customers with data-backed SEO strategies by Venom Tech.",
    url: "/screens/services/seo",
    images: [{ url: "/images/services/predictive-analytics.webp" }],
  },
};

const jsonLdSeo = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Expert SEO Services in Lahore by Venom Tech",
  description:
    "Comprehensive search engine optimization services including technical audits, semantic keyword mapping, high-authority link acquisition, and local GMB ranking.",
  provider: {
    "@type": "Organization",
    name: "Venom Tech IT Solution",
    url: "https://venomtech.pk",
    logo: "https://venomtech.pk/images/venom tech logo.png",
  },
  areaServed: ["Lahore", "Pakistan", "Global"],
  serviceType: [
    "Technical SEO & Core Web Vitals Auditing",
    "On-Page Optimization & Semantic Keyword Mapping",
    "Local SEO & Google Business Profile Domination",
    "High-Authority Link Building & Digital PR",
    "E-Commerce & International Enterprise SEO",
  ],
};

export default function SeoPage() {
  return (
    <div className="min-h-screen bg-transparent text-[#000000] selection:bg-[#C07DFF] selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSeo) }}
      />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main SEO Content */}
      <main id="main-content">
        {/* 1. Hero with Audit Submission Form */}
        <SeoHero />

        {/* 2. Key Metrics Stats Bar (1,000+, 2,500+, 87%, 100+) */}
        <SeoStats />

        {/* 3. Our SEO Services in Lahore (4 Core Cards) */}
        <SeoServices />

        {/* 4. Trusted SEO Company Callout Banner */}
        <SeoCallout />

        {/* 5. Why You Need Professional SEO Services in Lahore */}
        <SeoWhyNeed />

        {/* 6. One-Stop Solution Process Flowchart */}
        <SeoProcess />

        {/* 7. What Our Clients Say (Verified Client Reviews) */}
        <TestimonialsSection />

        {/* 8. Frequently Asked Questions Accordion */}
        <SeoFaq />
      </main>

      {/* Global Brand Footer */}
      <HomeFooter />
    </div>
  );
}

