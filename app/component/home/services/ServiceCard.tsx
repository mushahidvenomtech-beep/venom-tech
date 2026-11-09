"use client";

import React from "react";
import Link from "next/link";
import { Service } from "./servicesData";
import TiltedCard from "./TiltedCard";

interface ServiceCardProps {
  service: Service;
  index: number;
  isActive?: boolean;
}

/**
 * Service icon mapper with clean, high-precision SVG icons using blue accents (#3BC8F6)
 */
function renderServiceIcon(iconKey?: string) {
  switch (iconKey) {
    case "cpu":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" strokeLinecap="round" />
        </svg>
      );
    case "megaphone":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M3 11v-1a5 5 0 015-5h1l9-3v14l-9-3H8a5 5 0 01-5-5z" strokeLinejoin="round" />
          <path d="M7 16l3 6M19 8a3 3 0 010 4" strokeLinecap="round" />
        </svg>
      );
    case "mobile":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <rect x="6" y="2" width="12" height="20" rx="3" />
          <line x1="11" y1="18" x2="13" y2="18" strokeLinecap="round" />
          <circle cx="12" cy="5" r="0.7" fill="currentColor" />
        </svg>
      );
    case "cart":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M3 3h2l2.4 11.2a2 2 0 002 1.6h8.4a2 2 0 002-1.6L21 6H6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "palette":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 3.3 1.8 6.2 4.5 7.7.5.3 1.1-.1 1.1-.7v-.8c0-.8.7-1.5 1.5-1.5h1.8c2.8 0 5.1-2.3 5.1-5.1 0-5.3-4.1-9.6-4-9.6z" strokeLinejoin="round" />
          <circle cx="7" cy="8.5" r="1" fill="currentColor" />
          <circle cx="11.5" cy="6.5" r="1" fill="currentColor" />
          <circle cx="16" cy="8.5" r="1" fill="currentColor" />
          <circle cx="17.5" cy="13" r="1" fill="currentColor" />
        </svg>
      );
    case "film":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M7 4v16M17 4v16M2 8h5M2 12h20M2 16h5M17 8h5M17 16h5" strokeLinecap="round" />
        </svg>
      );
    case "cube":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" strokeLinejoin="round" />
          <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "camera":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" strokeLinejoin="round" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      );
    case "bot":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <rect x="3" y="11" width="18" height="10" rx="3" />
          <circle cx="8" cy="16" r="1.5" fill="currentColor" />
          <circle cx="16" cy="16" r="1.5" fill="currentColor" />
          <path d="M12 2v4M8 6h8M2 15h1M21 15h1" strokeLinecap="round" />
        </svg>
      );
    case "chart":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M3 3v18h18" strokeLinecap="round" />
          <path d="M18 9l-5 5-4-4-5 5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="18" cy="9" r="1.5" fill="currentColor" />
        </svg>
      );
    case "mail":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "filter":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" strokeLinejoin="round" />
        </svg>
      );
    case "code":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="8 6 2 12 8 18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "trending":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="17 6 23 6 23 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" />
          <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" strokeWidth="3" />
        </svg>
      );
  }
}

export default function ServiceCard({
  service,
  index,
  isActive = true,
}: ServiceCardProps) {
  const formattedNumber = String(index + 1).padStart(2, "0");

  return (
    <TiltedCard
      imageSrc={service.backgroundImage}
      altText={`${service.title} artwork`}
      containerWidth="100%"
      containerHeight="380px"
      imageWidth="100%"
      imageHeight="380px"
      rotateAmplitude={12}
      scaleOnHover={1.03}
      glare={0.35}
      shadow={0.3}
      radius={20}
      showTooltip={false}
      className={`w-full transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
      }`}
    >
      <div className="relative w-full h-full p-6 sm:p-7 flex flex-col justify-between bg-white/90 backdrop-blur-[2px] border border-[#E8E2F2]/90 rounded-[inherit] transition-colors duration-300 hover:bg-white/80 select-none">
        {/* Top Meta Row: Icon + Number Index */}
        <div>
          <div className="flex items-center justify-between mb-5 relative z-10">
            {/* Blue Accent Icon Container */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E8F9FF] to-[#D4F0FC] border border-[#3BC8F6]/30 text-[#0284C7] flex items-center justify-center transition-all duration-300 shadow-sm">
              {renderServiceIcon(service.icon)}
            </div>

            {/* Sequential Index Tag */}
            <span className="font-[family-name:var(--font-oswald)] font-bold text-xl sm:text-2xl text-stone-300 transition-colors tracking-tight">
              {formattedNumber}
            </span>
          </div>

          {/* Service Title */}
          <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-xl sm:text-2xl text-[#000000] tracking-tight leading-tight mb-3 transition-colors relative z-10">
            {service.title}
          </h3>

          {/* Service Description (Preserved verbatim) */}
          <p className="font-sans text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 relative z-10">
            {service.description}
          </p>
        </div>

        {/* Bottom Row: Optional Route Navigation Link or Status */}
        <div className="pt-3 border-t border-[#E8E2F2]/80 flex items-center justify-between relative z-10">
          {service.route ? (
            <Link
              href={service.route}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold text-[#0284C7] hover:text-[#000000] transition-colors focus-visible:outline-none focus-visible:underline"
              aria-label={`Explore ${service.title}`}
            >
              <span>Explore Service</span>
              <span className="text-[#3BC8F6] transition-transform">
                &rarr;
              </span>
            </Link>
          ) : (
            <span className="text-xs font-sans uppercase tracking-wider text-stone-400 font-medium">
              Tailored Solution
            </span>
          )}

          <span className="w-2 h-2 rounded-full bg-[#3BC8F6] opacity-60 transition-all" />
        </div>
      </div>
    </TiltedCard>
  );
}
