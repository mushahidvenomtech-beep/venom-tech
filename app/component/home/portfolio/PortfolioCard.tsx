"use client";

import React from "react";
import Image from "next/image";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import { Project } from "@/lib/projects/types";

interface PortfolioCardProps {
  project: Project;
  index: number;
}

export default function PortfolioCard({ project, index }: PortfolioCardProps) {
  const numberStr = String(index + 1).padStart(2, "0");
  const targetUrl = project.liveUrl || project.caseStudyUrl || "/screens/portfolio";
  const isExternal = targetUrl.startsWith("http");

  return (
    <div className="group bg-white border border-stone-200 hover:border-black transition-all duration-300 flex flex-col justify-between p-6 shadow-sm">
      {/* 1. Visual Mockup / Media Frame */}
      <div className="w-full aspect-[4/3] mb-6 overflow-hidden relative">
        {project.image ? (
          <div className="w-full h-full bg-stone-950 relative overflow-hidden group/img">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/90 uppercase border border-white/10">
              {project.service}
            </div>
          </div>
        ) : project.mockupType === "laptop" ? (
          <div className="w-full h-full bg-[#EAE6E1] p-4 flex items-center justify-center">
            {/* Minimalist Laptop Vector Frame */}
            <div className="w-[90%] aspect-[16/10] bg-[#1C1C1E] rounded-t-lg p-2 shadow-xl flex flex-col justify-between border border-stone-700">
              <div className="flex items-center gap-1.5 pb-1 border-b border-stone-800">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                <span className="text-[7px] text-stone-400 font-mono ml-2">
                  {project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, "") : "aura-sound.io"}
                </span>
              </div>
              <div className="flex-1 bg-gradient-to-br from-stone-900 to-black p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-[family-name:var(--font-oswald)] font-bold text-white uppercase">
                    AURA
                  </span>
                  <span className="text-[8px] text-[#C07DFF] font-mono">Q1 LAUNCH</span>
                </div>
                <div className="text-center py-2">
                  <div className="text-xs font-[family-name:var(--font-oswald)] text-[#C07DFF] font-extrabold uppercase">
                    SPATIAL ACOUSTICS
                  </div>
                  <div className="text-[8px] text-stone-400">Pure immersive precision</div>
                </div>
                <div className="h-1 w-full bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6]" />
                </div>
              </div>
            </div>
          </div>
        ) : project.mockupType === "bag" ? (
          <div className="w-full h-full bg-[#E5E1DC] p-4 flex items-center justify-center gap-4">
            <div className="w-28 aspect-[3/4] bg-stone-900 shadow-xl flex flex-col items-center justify-between p-3 relative transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <div className="w-12 h-6 border-t-2 border-x-2 border-stone-700 rounded-t-full -mt-6" />
              <div className="font-[family-name:var(--font-oswald)] text-white text-xl font-extrabold tracking-tighter">
                BAG
              </div>
              <div className="text-[7px] text-stone-400 uppercase tracking-widest font-mono">
                STUDIO FORM
              </div>
            </div>

            <div className="w-28 aspect-[3/4] bg-stone-800 shadow-xl flex flex-col items-center justify-between p-3 relative transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <div className="w-12 h-6 border-t-2 border-x-2 border-stone-600 rounded-t-full -mt-6" />
              <div className="font-[family-name:var(--font-oswald)] text-[#C07DFF] text-xl font-extrabold tracking-tighter">
                BAG
              </div>
              <div className="text-[7px] text-stone-400 uppercase tracking-widest font-mono">
                COTTON 100%
              </div>
            </div>
          </div>
        ) : project.mockupType === "editorial" ? (
          <div className="w-full h-full bg-gradient-to-br from-stone-900 to-black p-6 flex flex-col justify-between relative">
            <div className="absolute top-2 right-2 font-[family-name:var(--font-oswald)] font-extrabold text-7xl text-stone-800 pointer-events-none select-none">
              ISS
            </div>
            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C07DFF]">ARCHIVE</span>
              <AsteriskIcon
                className="w-5 h-5 text-white/50 group-hover:text-[#C07DFF] group-hover:rotate-45 transition-all duration-300"
                color="currentColor"
                strokeWidth={3}
              />
            </div>
            <div className="relative z-10">
              <div className="font-[family-name:var(--font-oswald)] font-extrabold text-2xl uppercase text-white tracking-tight">
                {project.title}
              </div>
              <div className="font-sans text-xs text-stone-400 mt-1 line-clamp-1">
                {project.subtitle || "Spatial typography & interactive 3D platform"}
              </div>
            </div>
          </div>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${project.color || "from-stone-900 to-black"} p-6 flex flex-col justify-between text-white`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C07DFF]">
                {project.year}
              </span>
              <AsteriskIcon className="w-5 h-5 text-white/40" color="currentColor" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-[family-name:var(--font-oswald)] font-bold text-xl uppercase">
                {project.title}
              </div>
              <div className="text-xs text-stone-400 font-sans mt-1">
                {project.service} &bull; {project.client}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Project Details */}
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C07DFF]">
            {project.year}
          </span>
          <span className="text-xs font-sans uppercase tracking-wider text-stone-400 font-semibold">
            {numberStr}
          </span>
        </div>

        <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl text-[#111111] group-hover:text-[#C07DFF] transition-colors leading-tight">
          {project.title}
        </h3>

        <p className="font-sans text-xs text-stone-500 uppercase tracking-wider">
          {project.subtitle || project.service}
        </p>

        {/* 3. Action Button for URLs requested by user */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
          <a
            href={targetUrl}
            target={isExternal ? "_blank" : "_self"}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black hover:bg-gradient-to-r hover:from-[#C07DFF] hover:to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider transition-all duration-300 shadow-sm active:scale-95 group/btn cursor-pointer"
          >
            <span>{project.buttonText || "Live Project"}</span>
            <span className="text-[#C07DFF] group-hover/btn:text-white transition-colors text-sm font-normal">
              &nearr;
            </span>
          </a>

          {project.caseStudyUrl && project.caseStudyUrl !== targetUrl && (
            <a
              href={project.caseStudyUrl}
              className="text-xs font-[family-name:var(--font-oswald)] uppercase font-semibold text-stone-500 hover:text-black tracking-wider transition-colors"
            >
              Case Study &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

