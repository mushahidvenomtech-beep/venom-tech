import React from "react";
import type { Metadata } from "next";
import Navbar from "@/app/component/global/navigation/Navbar";
import Footer from "@/app/component/global/footer/Footer";
import PortfolioHero from "@/app/component/portfolio/hero/PortfolioHero";
import PortfolioGrid from "@/app/component/portfolio/grid/PortfolioGrid";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

export const metadata: Metadata = {
  title: "Creative Portfolio & Flagship Works | CREAT*",
  description: "Explore selected brand identities, spatial web applications, and digital platforms engineered by CREAT*.",
  alternates: {
    canonical: "/screens/portfolio",
  },
  openGraph: {
    title: "Portfolio & Case Studies | CREAT*",
    description: "Curated showcase of award-winning digital flagships and visual identity systems.",
    url: "/screens/portfolio",
    type: "website",
  },
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-transparent text-[#000000]">
      <Navbar />

      <main id="main-content">
        <PortfolioHero />
        <PortfolioGrid />

        {/* CTA banner */}
        <section className="py-20 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto text-center">
          <div className="bg-black text-white p-12 sm:p-16 border-2 border-black flex flex-col items-center">
            <AsteriskIcon className="w-10 h-10 text-[#C07DFF] mb-6" color="#C07DFF" strokeWidth={3} />
            <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-6xl max-w-2xl leading-none mb-6">
              Want your brand featured among our next case studies?
            </h2>
            <a
              href="/screens/contactus"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] hover:bg-white hover:text-black text-white px-8 py-4 font-[family-name:var(--font-oswald)] font-bold text-lg uppercase tracking-wide transition-all duration-300"
            >
              <span>Build With Us</span>
              <AsteriskIcon className="w-4 h-4" color="currentColor" strokeWidth={3.4} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

