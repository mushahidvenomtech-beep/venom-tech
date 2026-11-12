import React from "react";
import type { Metadata } from "next";
import Navbar from "@/app/component/global/navigation/Navbar";
import BlogHeaderBanner from "@/app/components/blogs/header/BlogHeaderBanner";
import BlogGridSection from "@/app/components/blogs/grid/BlogGridSection";
import PortfolioSection from "@/app/components/home/portfolio/PortfolioSection";
import BlogCtaBanner from "@/app/components/blogs/cta/BlogCtaBanner";
import HomeFooter from "@/app/components/home/footer/HomeFooter";

export const metadata: Metadata = {
  title: "Insights & Articles | CREAT* - Design & Engineering Journal",
  description: "Read thoughts on brand strategy, brutalist design systems, Next.js architecture, and spatial motion from the CREAT* studio team.",
  alternates: {
    canonical: "/screens/blogs",
  },
  openGraph: {
    title: "Insights & Articles | CREAT* Studio Journal",
    description: "Thought leadership, design patterns, and engineering insights from our creative collective.",
    url: "/screens/blogs",
    type: "website",
  },
};

const jsonLdBlog = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "CREAT* Journal",
  description: "Insights on brand strategy, digital architecture, and creative technology.",
  publisher: {
    "@type": "Organization",
    name: "CREAT*",
  },
};

export default function BlogsScreen() {
  return (
    <div className="min-h-screen bg-transparent text-[#000000]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBlog) }}
      />
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Main Blog Page Content */}
      <main id="main-content">
        {/* Breadcrumb Header Banner */}
        <BlogHeaderBanner />

        {/* 12 Blog Posts Dataset with Pagination */}
        <BlogGridSection />

        {/* Portfolio Showcase */}
        <PortfolioSection />

        {/* Full-Width Black CTA Banner */}
        <BlogCtaBanner />
      </main>

      {/* 3. Comprehensive Brand Footer */}
      <HomeFooter />
    </div>
  );
}

