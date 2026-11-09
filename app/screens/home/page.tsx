import type { Metadata } from "next";
import React from "react";
import Navbar from "@/app/component/global/navigation/Navbar";
import HeroSection from "@/app/components/home/hero/HeroSection";
import ServicesSection from "@/app/component/home/services/ServicesSection";
import AboutMissionSection from "@/app/components/home/about/AboutMissionSection";
import StatsBarSection from "@/app/components/home/stats/StatsBarSection";
import WhyChooseSection from "@/app/components/home/why-choose/WhyChooseSection";
import PortfolioSection from "@/app/components/home/portfolio/PortfolioSection";
import TestimonialsSection from "@/app/components/home/testimonials/TestimonialsSection";
import TeamSection from "@/app/components/home/team/TeamSection";
import ContactSection from "@/app/components/home/contact/ContactSection";
import FaqSection from "@/app/components/home/faq/FaqSection";
import CtaBannerSection from "@/app/components/home/cta-banner/CtaBannerSection";
import BlogSection from "@/app/components/home/blog/BlogSection";
import HomeFooter from "@/app/components/home/footer/HomeFooter";

export const metadata: Metadata = {
  title: "Explore the Power of Innovation | Venom Tech",
  description: "Helping businesses scale up and convert clicks into revenue. We are Venom Tech, delivering digitally engineered solutions that make your brand unshakable.",
  alternates: {
    canonical: "/screens/home",
  },
  openGraph: {
    title: "Explore the Power of Innovation | Venom Tech",
    description: "Helping businesses scale up and convert clicks into revenue. We are Venom Tech, delivering digitally engineered solutions that make your brand unshakable.",
    url: "/screens/home",
    siteName: "Venom Tech",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-transparent text-[#000000]">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Main Page Sections */}
      <main id="main-content">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Why Choose Us */}
        <WhyChooseSection />

        {/* Section 3: About Us */}
        <AboutMissionSection />

        {/* Section 4: Services & Solutions */}
        <ServicesSection />

        {/* Section 5: Our Impact in Numbers and Results */}
        <StatsBarSection />

        {/* Section 6: Portfolio Showcase */}
        <PortfolioSection />

        {/* Section 7: Echoes of Our Valued Clients & Brand Bar */}
        <TestimonialsSection />

        {/* Section 8: The Minds Behind The Magic */}
        <TeamSection />

        {/* Section 9: Quick Form & Let's Collaborate */}
        <ContactSection />

        {/* Section 10: FAQ Accordion */}
        <FaqSection />

        {/* Section 11: Full-Width Black CTA Banner */}
        <CtaBannerSection />

        {/* Section 12: Latest Articles & Insights */}
        <BlogSection />
      </main>

      {/* 3. Comprehensive Brand Footer */}
      <HomeFooter />
    </div>
  );
}
