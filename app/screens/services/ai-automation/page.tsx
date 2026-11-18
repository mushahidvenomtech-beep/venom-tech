import React from "react";
import type { Metadata } from "next";
import Navbar from "@/app/component/global/navigation/Navbar";
import HomeFooter from "@/app/components/home/footer/HomeFooter";
import PortfolioSection from "@/app/components/home/portfolio/PortfolioSection";
import AiAutomationTestimonials from "@/app/component/services/ai-automation/testimonials/AiAutomationTestimonials";
import AiAutomationFaq from "@/app/component/services/ai-automation/faq/AiAutomationFaq";
import AiAutomationHero from "@/app/component/services/ai-automation/hero/AiAutomationHero";
import AiAutomationOverview from "@/app/component/services/ai-automation/overview/AiAutomationOverview";
import AiAutomationIndustries from "@/app/component/services/ai-automation/industries/AiAutomationIndustries";
import AiAutomationOfferings from "@/app/component/services/ai-automation/offerings/AiAutomationOfferings";
import AiAutomationCallout from "@/app/component/services/ai-automation/callout/AiAutomationCallout";
import AiAutomationWhyChoose from "@/app/component/services/ai-automation/whychoose/AiAutomationWhyChoose";
import AiAutomationProcess from "@/app/component/services/ai-automation/process/AiAutomationProcess";

export const metadata: Metadata = {
  title: "AI Automation Services in Pakistan | Venom Tech",
  description:
    "Venom Tech helps businesses in Pakistan save time and cut costs by automating repetitive work with AI. Custom chatbots, workflow automation, and real-time reporting.",
  alternates: {
    canonical: "/screens/services/ai-automation",
  },
  openGraph: {
    title: "AI Automation Services in Pakistan | Venom Tech",
    description:
      "Venom Tech helps businesses in Pakistan save time and cut costs by automating repetitive work with AI. Custom chatbots, workflow automation, and real-time reporting.",
    url: "/screens/services/ai-automation",
    images: [{ url: "/images/services/ai-automation.webp" }],
  },
};

const jsonLdAiAutomation = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Automation Services by Venom Tech",
  description:
    "Empower your business with smart AI automation solutions tailored to streamline operations, reduce costs, and accelerate digital transformation.",
  provider: {
    "@type": "Organization",
    name: "Venom Tech IT Solution",
    url: "https://venomtech.pk",
    logo: "https://venomtech.pk/images/venom tech logo.webp",
  },
  areaServed: "Global",
  serviceType: [
    "Robotic Process Automation (RPA)",
    "Workflow Automation & Integration",
    "AI Chatbots & Virtual Assistants",
    "CRM & Marketing Automation",
    "Custom AI Workflow Automation",
    "Data & Analytics Automation",
  ],
};

export default function AiAutomationPage() {
  return (
    <div className="min-h-screen bg-transparent text-[#000000] selection:bg-[#C07DFF] selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAiAutomation) }}
      />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main AI Automation Page Content */}
      <main id="main-content">
        {/* 1. Hero with Lead Form */}
        <AiAutomationHero />

        {/* 2. What is AI Automation? */}
        <AiAutomationOverview />

        {/* 3. Industries We Serve */}
        <AiAutomationIndustries />

        {/* 4. Our AI Automation Services */}
        <AiAutomationOfferings />

        {/* 5. Consultation Expert Callout Banner */}
        <AiAutomationCallout />

        {/* 6. Why Choose Venom Tech as Your AI Automation Agency? */}
        <AiAutomationWhyChoose />

        {/* 7. Our AI Automation Process Flowchart */}
        <AiAutomationProcess />

        {/* 8. Portfolio Showcase */}
        <PortfolioSection />

        {/* 9. What Our Automation Clients Say (Real Reviews) */}
        <AiAutomationTestimonials />

        {/* 10. Frequently Asked Questions */}
        <AiAutomationFaq />
      </main>

      {/* Global Brand Footer with AI Automation CTA */}
      <HomeFooter
        ctaHeading={
          <>
            Ready to Automate Your Business? <span className="text-brand-gradient">Let&apos;s Start Today.</span>
          </>
        }
        ctaButtonText="Start Project"
      />
    </div>
  );
}

