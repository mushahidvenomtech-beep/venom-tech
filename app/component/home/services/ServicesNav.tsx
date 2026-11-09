"use client";

import React, { useRef } from "react";
import { SERVICE_CATEGORIES } from "./servicesData";

interface ServicesNavProps {
  activeCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  totalServicesCount: number;
  filteredCount: number;
}

export default function ServicesNav({
  activeCategory,
  onSelectCategory,
  totalServicesCount,
  filteredCount,
}: ServicesNavProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (categoryId: string) => {
    // If clicking already active category, toggle back to show all
    if (activeCategory === categoryId) {
      onSelectCategory(null);
    } else {
      onSelectCategory(categoryId);
    }
  };

  return (
    <nav
      aria-label="Service categories navigation"
      className="sticky top-[72px] sm:top-[80px] z-30 bg-white/95 backdrop-blur-md border-y border-[#E8E2F2] py-3.5 shadow-sm transition-all"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
        {/* Horizontal Category Navigation (Scrollable on mobile, flex-wrap/horizontal on desktop) */}
        <div
          ref={scrollContainerRef}
          role="tablist"
          aria-label="Filter services by category"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 w-full"
          tabIndex={0}
        >
          {/* "All Services" Filter Pill */}
          <button
            role="tab"
            aria-selected={activeCategory === null}
            onClick={() => onSelectCategory(null)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl font-[family-name:var(--font-oswald)] uppercase text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 cursor-pointer flex-shrink-0 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3BC8F6] ${
              activeCategory === null
                ? "bg-[#000000] text-white shadow-md"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            <span>All Services</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeCategory === null
                  ? "bg-white text-black font-bold"
                  : "bg-stone-200 text-stone-700"
              }`}
            >
              {totalServicesCount}
            </span>
          </button>

          {/* 7 Specific Categories in Exact Order */}
          {SERVICE_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleCategoryClick(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl font-[family-name:var(--font-oswald)] uppercase text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 cursor-pointer flex-shrink-0 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3BC8F6] ${
                  isSelected
                    ? "bg-gradient-to-r from-[#3BC8F6] to-[#0284C7] text-white shadow-md shadow-[#3BC8F6]/25 scale-[1.02]"
                    : "bg-white border border-[#E8E2F2] text-stone-800 hover:border-[#3BC8F6] hover:text-[#0284C7] hover:bg-[#E8F9FF]/40"
                }`}
              >
                <span>{cat.title}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Live Filter Indicator count on larger screens */}
        {activeCategory !== null && (
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0 text-xs font-sans text-stone-500 font-medium">
            <span>Showing {filteredCount} items</span>
            <button
              onClick={() => onSelectCategory(null)}
              className="text-[#0284C7] hover:underline font-semibold text-xs"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

