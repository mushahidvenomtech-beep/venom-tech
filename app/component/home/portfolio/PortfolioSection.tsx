"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import PortfolioCard from "./PortfolioCard";
import { Project } from "@/lib/projects/types";

const INITIAL_FEATURED_PROJECTS: Project[] = [
  {
    id: "proj-aura-sound",
    title: "Aura Spatial Sound",
    subtitle: "Next.js Flagship / UI & UX",
    client: "Aura Technologies Inc.",
    service: "Graphic Design & UI/UX",
    year: "2026",
    progress: 92,
    status: "Final Review",
    team: "Design Pod 01",
    dueDate: "Nov 15, 2026",
    liveUrl: "https://aura-sound.io",
    caseStudyUrl: "/screens/portfolio",
    buttonText: "Live Project ↗",
    image: "/images/services/ai-automation.webp",
    mockupType: "laptop",
    color: "from-stone-900 to-black",
    tags: ["Next.js", "UI/UX", "Spatial Audio"],
    displayOrder: 1,
    isFeatured: true,
    isActive: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "proj-studio-form",
    title: "Studio Form & Space",
    subtitle: "Brand Identity / Packaging",
    client: "Studio Form & Space LLC",
    service: "Branding",
    year: "2026",
    progress: 100,
    status: "Completed",
    team: "Brand Pod 02",
    dueDate: "Delivered",
    liveUrl: "https://studioform.design",
    caseStudyUrl: "/screens/portfolio",
    buttonText: "View Showcase ↗",
    image: "/images/services/ui-design.webp",
    mockupType: "bag",
    color: "from-stone-800 to-neutral-900",
    tags: ["Brand Identity", "Packaging", "Visual System"],
    displayOrder: 2,
    isFeatured: true,
    isActive: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "proj-verve-kinetic",
    title: "Verve Kinetic Type",
    subtitle: "Spatial Motion / 3D Canvas",
    client: "Verve Media Labs",
    service: "Development",
    year: "2025",
    progress: 100,
    status: "Completed",
    team: "Creative Tech Pod",
    dueDate: "Delivered",
    liveUrl: "https://verve-kinetic.art",
    caseStudyUrl: "/screens/portfolio",
    buttonText: "Explore Platform ↗",
    image: "/images/services/animation.webp",
    mockupType: "editorial",
    color: "from-neutral-950 to-black",
    tags: ["React", "WebGL", "3D Canvas", "Motion"],
    displayOrder: 3,
    isFeatured: true,
    isActive: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_FEATURED_PROJECTS);

  const fetchLatest = useCallback(async () => {
    try {
      const res = await fetch("/api/projects?featured=true&active=true");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects.slice(0, 6));
        }
      }
    } catch (err) {
      // Keep static defaults on network error
    }
  }, []);

  useEffect(() => {
    fetchLatest();
  }, [fetchLatest]);

  return (
    <section
      id="portfolio"
      className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto relative border-b border-[#E8E2F2] overflow-hidden"
    >
      {/* Giant Outlined Watermark Asterisk in Top Right Background */}
      <div className="absolute top-4 right-0 pointer-events-none opacity-20 hidden md:block">
        <AsteriskIcon className="w-72 h-72 text-[#C07DFF]" color="#C07DFF" strokeWidth={1.5} />
      </div>

      {/* Section Header matching Image 2 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="font-[family-name:var(--font-oswald)] font-extrabold uppercase text-[44px] sm:text-[44px] text-[#111111] tracking-tight leading-[1.08]">
              PORTFOLIO
            </h2>
            <AsteriskIcon
              className="w-8 h-8 sm:w-10 sm:h-10 text-[#C07DFF]"
              color="#C07DFF"
              strokeWidth={3.4}
            />
          </div>
          <p className="font-sans text-stone-600 text-base max-w-lg">
            A curated glimpse into our latest brand launches, e-commerce flagships, and spatial digital platforms.
          </p>
        </div>

        <Link
          href="/screens/portfolio"
          className="inline-flex items-center gap-2.5 bg-black hover:bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white px-7 py-3.5 font-[family-name:var(--font-oswald)] uppercase text-sm tracking-wider font-semibold transition-all duration-300 self-start md:self-auto group"
        >
          <span>View All Projects</span>
          <span className="text-[#C07DFF] group-hover:text-white transition-colors">&rarr;</span>
        </Link>
      </div>

      {/* 3 Showcase Project Cards with accessible URL buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {projects.map((project, idx) => (
          <PortfolioCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}

