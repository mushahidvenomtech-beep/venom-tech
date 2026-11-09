import React from "react";
import type { Metadata } from "next";
import Navbar from "@/app/component/global/navigation/Navbar";
import SingleBlogHero from "@/app/components/singleblog/hero/SingleBlogHero";
import SingleBlogContent from "@/app/components/singleblog/content/SingleBlogContent";
import SingleBlogComments from "@/app/components/singleblog/comments/SingleBlogComments";
import HomeFooter from "@/app/components/home/footer/HomeFooter";

export const metadata: Metadata = {
  title: "Building Engaging Campaigns | CREAT* Editorial",
  description: "Explore how modern brands cut through digital noise using bold typography, disciplined creative strategy, and intentional positioning.",
  alternates: {
    canonical: "/screens/singleblog",
  },
  openGraph: {
    title: "Building Engaging Campaigns | CREAT* Editorial",
    description: "An in-depth essay on intentional brand design and cutting through algorithmic noise.",
    url: "/screens/singleblog",
    type: "article",
    publishedTime: "2026-11-18T00:00:00.000Z",
    authors: ["Admin"],
  },
};

const jsonLdArticle = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Building Engaging Campaigns",
  description: "An essay on how modern brands cut through noise with visual conviction and typography.",
  datePublished: "2026-11-18",
  author: {
    "@type": "Person",
    name: "Admin",
  },
  publisher: {
    "@type": "Organization",
    name: "CREAT*",
  },
};

export default function SingleBlogScreen() {
  return (
    <div className="min-h-screen bg-transparent text-[#000000]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Main Article Content */}
      <main id="main-content">
        {/* Article Headline & Gallery Featured Visual */}
        <SingleBlogHero />

        {/* 3 Editorial Paragraphs & Pull Quote */}
        <SingleBlogContent />

        {/* Leave a Reply Form & Comments Thread */}
        <SingleBlogComments />
      </main>

      {/* 3. Comprehensive Brand Footer */}
      <HomeFooter />
    </div>
  );
}

