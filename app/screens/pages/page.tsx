import React from "react";
import type { Metadata } from "next";
import Navbar from "@/app/component/global/navigation/Navbar";
import Footer from "@/app/component/global/footer/Footer";
import PagesHero from "@/app/component/pages/hero/PagesHero";
import PricingSection from "@/app/component/pages/pricing/PricingSection";
import FaqAccordion from "@/app/component/pages/faq/FaqAccordion";

export const metadata: Metadata = {
  title: "Agency Plans & FAQ | CREAT* - Pricing & Answers",
  description: "Transparent partnership models, deliverables, and answers to common client questions at CREAT*.",
  alternates: {
    canonical: "/screens/pages",
  },
  openGraph: {
    title: "Pricing Plans & FAQ | CREAT*",
    description: "Transparent partnership models and answers to common client questions.",
    url: "/screens/pages",
    type: "website",
  },
};

export default function PagesPage() {
  return (
    <div className="min-h-screen bg-transparent text-[#000000]">
      <Navbar />

      <main id="main-content">
        <PagesHero />
        <PricingSection />
        <FaqAccordion />
      </main>

      <Footer />
    </div>
  );
}

