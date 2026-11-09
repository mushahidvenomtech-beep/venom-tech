"use client";

import React, { useState, useRef, useMemo } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import { SERVICES_DATA, Service } from "./servicesData";
import ServiceCard from "./ServiceCard";
import ServicesNav from "./ServicesNav";

const SERVICES_PER_PAGE = 6;

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(SERVICES_PER_PAGE);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Filter services by category if selected
  const filteredServices: Service[] = useMemo(() => {
    if (!activeCategory) return SERVICES_DATA;
    return SERVICES_DATA.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  // Paginated/displayed services slice (defaults to 6)
  const displayedServices: Service[] = useMemo(() => {
    return filteredServices.slice(0, visibleCount);
  }, [filteredServices, visibleCount]);

  // Handle mobile carousel scroll sync to update indicator
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.85; // approx 85vw
    const newSlide = Math.round(scrollLeft / cardWidth);
    setCurrentSlide(Math.min(Math.max(0, newSlide), displayedServices.length - 1));
  };

  // Scroll to previous/next slide on mobile
  const scrollCarousel = (direction: "prev" | "next") => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardWidth = container.offsetWidth * 0.85 + 20; // width + gap
    const scrollAmount = direction === "next" ? cardWidth : -cardWidth;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // When category changes, reset pagination and scroll carousel to start
  const handleSelectCategory = (categoryId: string | null) => {
    setActiveCategory(categoryId);
    setVisibleCount(SERVICES_PER_PAGE);
    setCurrentSlide(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Load more services handler
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + SERVICES_PER_PAGE, filteredServices.length));
  };

  // Collapse back to initial 6 services
  const handleShowLess = () => {
    setVisibleCount(SERVICES_PER_PAGE);
    setCurrentSlide(0);
    const gridTop = document.getElementById("services-grid-top");
    if (gridTop) {
      gridTop.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const hasMore = visibleCount < filteredServices.length;
  const isExpanded = visibleCount > SERVICES_PER_PAGE;

  return (
    <section
      id="services"
      className="relative bg-white py-10 sm:py-14 border-b border-[#E8E2F2] overflow-hidden"
    >
      {/* 1. Introductory Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 mb-8 sm:mb-10">
        <div className="max-w-3xl">
          {/* Subtle Badge */}
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 bg-[#E8F9FF] border border-[#3BC8F6]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#0284C7]" color="#0284C7" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#0284C7] font-semibold">
              Services &amp; Capabilities
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-[44px] sm:text-[44px] lg:text-[44px] text-[#000000] tracking-tight leading-[1.08] mb-6">
            Digitally Engineered <span className="text-brand-gradient">Services &amp; Solutions</span>
          </h2>

          {/* Exact Introductory Text Requested */}
          <p className="font-sans text-stone-700 text-base sm:text-lg lg:text-xl leading-relaxed font-normal">
            Explore the comprehensive range of digitally engineered solutions we provide. For all your digital business concerns, we&apos;ve got you covered.
          </p>
        </div>
      </div>

      {/* 2. Sticky Service-Category Navigation */}
      <ServicesNav
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        totalServicesCount={SERVICES_DATA.length}
        filteredCount={filteredServices.length}
      />

      {/* Anchor for smooth scroll when collapsing */}
      <div id="services-grid-top" className="scroll-mt-28" />

      {/* 3. Service Cards Display Area (3-column desktop grid + tablet 2-column + mobile touch-carousel) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14">
        {/* Mobile Carousel Navigation Header Controls (visible on mobile only) */}
        <div className="flex md:hidden items-center justify-between mb-4 px-1">
          <span className="font-[family-name:var(--font-oswald)] text-xs uppercase tracking-wider text-stone-500 font-semibold">
            Service {Math.min(currentSlide + 1, displayedServices.length)} of {displayedServices.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel("prev")}
              disabled={currentSlide === 0}
              aria-label="Previous service"
              className="w-9 h-9 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#3BC8F6] active:bg-stone-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel("next")}
              disabled={currentSlide >= displayedServices.length - 1}
              aria-label="Next service"
              className="w-9 h-9 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#3BC8F6] active:bg-stone-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Responsive Container: Desktop 3-column grid / Tablet 2-column / Mobile Swipe Carousel */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          tabIndex={0}
          aria-label="Services list"
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-6 md:pb-0 scroll-smooth no-scrollbar"
        >
          {displayedServices.map((service, index) => (
            <div
              key={service.id}
              className="w-[85vw] sm:w-[70vw] md:w-auto flex-shrink-0 md:flex-shrink snap-center md:snap-align-none transition-all duration-300"
            >
              <ServiceCard
                service={service}
                index={index}
                isActive={!activeCategory || service.category === activeCategory}
              />
            </div>
          ))}
        </div>

        {/* Mobile Pagination Indicator Dots */}
        <div className="flex md:hidden items-center justify-center gap-1.5 pt-4" aria-hidden="true">
          {displayedServices.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => {
                if (!carouselRef.current) return;
                const container = carouselRef.current;
                const cardWidth = container.offsetWidth * 0.85 + 20;
                container.scrollTo({ left: dotIdx * cardWidth, behavior: "smooth" });
              }}
              aria-label={`Jump to slide ${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === dotIdx
                  ? "w-6 bg-[#3BC8F6]"
                  : "w-1.5 bg-stone-300 hover:bg-stone-400"
              }`}
            />
          ))}
        </div>

        {/* 4. Pagination / Load More Controls Area */}
        {filteredServices.length > SERVICES_PER_PAGE && (
          <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center gap-4 text-center">
            {/* Progress counter & bar */}
            <div className="flex flex-col items-center gap-2 max-w-xs w-full">
              <div className="flex items-center justify-between w-full text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider text-stone-500 font-semibold">
                <span>Showing {displayedServices.length} of {filteredServices.length} Services</span>
                <span className="text-[#0284C7] font-bold">
                  {Math.round((displayedServices.length / filteredServices.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
                <div
                  className="h-full bg-gradient-to-r from-[#3BC8F6] to-[#0284C7] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(displayedServices.length / filteredServices.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {hasMore ? (
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="group inline-flex items-center gap-3 px-8 py-3.5 bg-black hover:bg-stone-900 text-white rounded-xl font-[family-name:var(--font-oswald)] uppercase text-sm sm:text-base font-semibold tracking-wider shadow-md hover:shadow-xl hover:shadow-[#3BC8F6]/20 transition-all duration-300 cursor-pointer active:scale-95 border border-transparent hover:border-[#3BC8F6]/40"
                >
                  <span>Load More Services</span>
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#3BC8F6] group-hover:text-black transition-colors duration-300">
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-600 font-[family-name:var(--font-oswald)] uppercase text-xs font-semibold tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#3BC8F6] animate-pulse" />
                    <span>All {filteredServices.length} Services Displayed</span>
                  </div>
                  {isExpanded && (
                    <button
                      type="button"
                      onClick={handleShowLess}
                      className="group inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-xl font-[family-name:var(--font-oswald)] uppercase text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer active:scale-95"
                    >
                      <span>Show Less</span>
                      <svg
                        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

