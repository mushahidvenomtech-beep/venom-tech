import React from "react";
import type { Metadata } from "next";
import Navbar from "@/app/component/global/navigation/Navbar";
import ContactHeaderBanner from "@/app/components/contactus/header/ContactHeaderBanner";
import ContactFormSection from "@/app/components/contactus/form/ContactFormSection";
import ContactCtaBanner from "@/app/components/contactus/cta/ContactCtaBanner";
import ContactMapSection from "@/app/components/contactus/map/ContactMapSection";
import HomeFooter from "@/app/components/home/footer/HomeFooter";

export const metadata: Metadata = {
  title: "Contact Us & Project Brief | CREAT* Studio",
  description: "Reach out to CREAT*. Initiate your digital product partnership, brand redesign, or Next.js engineering brief.",
  alternates: {
    canonical: "/screens/contactus",
  },
  openGraph: {
    title: "Contact CREAT* Creative Studio",
    description: "Tell us about your upcoming project or request a discovery session.",
    url: "/screens/contactus",
    type: "website",
  },
};

const jsonLdContact = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact CREAT*",
  description: "Direct contact inquiry page for CREAT* studio.",
  mainEntity: {
    "@type": "Organization",
    name: "CREAT*",
    telephone: "+1-800-273-2883",
    email: "hello@creat-studio.com",
  },
};

export default function ContactUsScreen() {
  return (
    <div className="min-h-screen bg-transparent text-[#000000]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdContact) }}
      />
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Main Contact Us Content */}
      <main id="main-content">
        {/* Breadcrumb Header Banner */}
        <ContactHeaderBanner />

        {/* Form and Office Details Split */}
        <ContactFormSection />

        {/* Full-Width Black CTA Banner */}
        <ContactCtaBanner />

        {/* Studio Location Map */}
        <ContactMapSection />
      </main>

      {/* 3. Comprehensive Brand Footer */}
      <HomeFooter />
    </div>
  );
}

