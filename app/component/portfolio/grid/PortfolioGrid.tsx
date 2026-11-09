"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import { Project } from "@/lib/projects/types";

const INITIAL_PROJECTS: Array<Project & { categoryTag?: string }> = [
  {
    id: "proj-aura-sound",
    title: "Aura Spatial Sound",
    subtitle: "Next.js Flagship / UI & UX",
    client: "Aura Technologies Inc.",
    service: "Graphic Design & UI/UX",
    categoryTag: "Web Design",
    year: "2026",
    progress: 92,
    status: "Final Review",
    team: "Design Pod 01",
    dueDate: "Nov 15, 2026",
    liveUrl: "https://aura-sound.io",
    caseStudyUrl: "/screens/portfolio",
    buttonText: "Live Project ↗",
    image: "/images/services/ai-automation.webp",
    color: "from-zinc-900 to-black",
    tags: ["Next.js", "Brand Identity", "Turbopack"],
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
    categoryTag: "Branding",
    year: "2026",
    progress: 100,
    status: "Completed",
    team: "Brand Pod 02",
    dueDate: "Delivered",
    liveUrl: "https://studioform.design",
    caseStudyUrl: "/screens/portfolio",
    buttonText: "View Showcase ↗",
    image: "/images/services/ui-design.webp",
    color: "from-stone-900 to-neutral-950",
    tags: ["Design System", "3D Model", "Packaging"],
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
    categoryTag: "Development",
    year: "2025",
    progress: 100,
    status: "Completed",
    team: "Creative Tech Pod",
    dueDate: "Delivered",
    liveUrl: "https://verve-kinetic.art",
    caseStudyUrl: "/screens/portfolio",
    buttonText: "Explore Platform ↗",
    image: "/images/services/animation.webp",
    color: "from-neutral-900 to-zinc-900",
    tags: ["React 19", "Micro-Interactions", "Canvas"],
    displayOrder: 3,
    isFeatured: true,
    isActive: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

const INITIAL_CATEGORIES = ["All", "Web Design", "Branding", "Development", "AI Automation"];

export default function PortfolioGrid() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [categories, setCategories] = useState<string[]>(INITIAL_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function loadData() {
      try {
        const [resProjects, resCats] = await Promise.all([
          fetch("/api/projects?active=true"),
          fetch("/api/projects/categories"),
        ]);

        if (resProjects.ok) {
          const data = await resProjects.json();
          if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
            setProjects(data.projects);
          }
        }

        if (resCats.ok) {
          const catData = await resCats.json();
          if (catData.success && Array.isArray(catData.categories) && catData.categories.length > 0) {
            const dynamicNames = catData.categories.map((c: any) => c.name);
            setCategories(["All", ...dynamicNames]);
          }
        }
      } catch (err) {
        // Keep static fallback
      }
    }
    loadData();
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === "All") return true;
    const s = (p.service || "").toLowerCase();
    const cat = activeCategory.toLowerCase();
    return s.includes(cat) || (p.tags && p.tags.some((t) => t.toLowerCase().includes(cat)));
  });

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-3 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`font-[family-name:var(--font-oswald)] uppercase text-sm font-semibold tracking-wider px-5 py-2.5 transition-all duration-200 border cursor-pointer ${
              activeCategory === cat
                ? "bg-black text-white border-black shadow-md"
                : "bg-white text-stone-700 border-stone-300 hover:border-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((proj) => {
          const targetUrl = proj.liveUrl || proj.caseStudyUrl || "/screens/portfolio";
          const isExternal = targetUrl.startsWith("http");
          const cleanBtnText = (proj.buttonText || "Live Project").replace(/[\u2197\u2192↗→]+$/, "").trim();

          return (
            <div
              key={proj.id}
              className="group border border-stone-300 bg-white p-6 hover:border-black transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="w-full aspect-[4/3] bg-stone-950 relative overflow-hidden mb-6">
                  {proj.image ? (
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${
                        proj.color || "from-stone-900 to-black"
                      } p-6 flex flex-col justify-between`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-mono tracking-widest text-[#C07DFF]">
                          {proj.year || "2026"}
                        </span>
                        <AsteriskIcon
                          className="w-5 h-5 text-stone-400 group-hover:text-[#C07DFF] group-hover:rotate-45 transition-all duration-300"
                          color="currentColor"
                          strokeWidth={3}
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[#3BC8F6] uppercase tracking-wider block mb-1">
                          {proj.service}
                        </span>
                        <div className="font-[family-name:var(--font-oswald)] font-extrabold text-2xl uppercase text-white tracking-tight">
                          {proj.title}
                        </div>
                      </div>
                    </div>
                  )}

                  {proj.image && (
                    <>
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/90 uppercase border border-white/10">
                        {proj.service}
                      </div>
                      <div className="absolute top-3 right-3 text-xs uppercase font-mono tracking-widest text-[#C07DFF] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                        {proj.year || "2026"}
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-1 mb-4">
                  <h3 className="font-[family-name:var(--font-oswald)] font-bold text-2xl uppercase text-[#111111] group-hover:text-[#C07DFF] transition-colors leading-tight">
                    {proj.title}
                  </h3>
                  <p className="text-xs font-sans text-stone-500 uppercase tracking-wider">
                    {proj.subtitle || proj.service} &bull; {proj.client}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-stone-100">
                {/* Accessible live URL button */}
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={targetUrl}
                    target={isExternal ? "_blank" : "_self"}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black hover:bg-gradient-to-r hover:from-[#C07DFF] hover:to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider transition-all duration-300 shadow-sm active:scale-95 group/btn cursor-pointer"
                  >
                    <span>{cleanBtnText}</span>
                    <span className="text-[#C07DFF] group-hover/btn:text-white transition-colors text-sm font-normal">
                      &nearr;
                    </span>
                  </a>

                  {proj.caseStudyUrl && proj.caseStudyUrl !== targetUrl && (
                    <a
                      href={proj.caseStudyUrl}
                      className="text-xs font-[family-name:var(--font-oswald)] uppercase font-semibold text-stone-500 hover:text-black tracking-wider transition-colors"
                    >
                      Case Study &rarr;
                    </a>
                  )}
                </div>

                {proj.tags && proj.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-50">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono uppercase tracking-wider text-stone-600 bg-stone-100 px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
