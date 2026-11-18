import React from "react";
import Image from "next/image";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const REVIEWS = [
  {
    author: "Haris Munir",
    role: "Founder, Apex Retail",
    rating: 5,
    avatar: "/images/testimonials/avatar-1.webp",
    quote:
      "Venom Tech built an automated WhatsApp and CRM pipeline that handles over 800 customer queries daily. Our response time dropped from 4 hours to under 30 seconds, and customer retention increased by 35% in just two months.",
  },
  {
    author: "Usman Farooq",
    role: "Head of Operations, Nexa Logistics",
    rating: 5,
    avatar: "/images/testimonials/avatar-2.webp",
    quote:
      "Their RPA solution automated our multi-vendor invoice matching and accounting reconciliation. What used to take our finance team 3 days every week is now processed error-free in minutes. An incredible return on investment.",
  },
  {
    author: "Ayesha Siddiqui",
    role: "Managing Director, Prime Properties",
    rating: 5,
    avatar: "/images/testimonials/avatar-3.webp",
    quote:
      "The custom lead qualification chatbot and CRM automation engineered by Venom Tech transformed our real estate business. We capture and qualify leads 24/7 without missing a single prospect, doubling our booked consultations.",
  },
];

const BRANDS = [
  "FORBES",
  "TECHCRUNCH",
  "WIRED",
  "STRIPE",
  "VERCEL",
  "DRIBBBLE",
  "AWWWARDS",
];

export default function AiAutomationTestimonials() {
  return (
    <section id="testimonials" className="border-b border-[#E8E2F2] overflow-hidden bg-white">
      {/* Testimonials Grid */}
      <div className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 max-w-2xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 bg-[#F4E9FF] border border-[#C07DFF]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
              Testimonials
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 mb-3">
            <AsteriskIcon
              className="w-8 h-8 sm:w-10 sm:h-10 text-[#C07DFF] flex-shrink-0"
              color="#C07DFF"
              strokeWidth={3}
            />
            <h2 className="font-[family-name:var(--font-oswald)] font-extrabold uppercase text-[34px] sm:text-[44px] lg:text-[44px] text-[#111111] tracking-tight leading-[1.08]">
              What Our <span className="text-brand-gradient">Automation Clients Say</span>
            </h2>
          </div>

          <p className="font-sans text-stone-600 text-base sm:text-lg leading-relaxed">
            Real feedback from businesses scaling faster with our intelligent AI automation solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.author}
              className="p-7 sm:p-8 bg-white border border-[#E8E2F2] rounded-2xl hover:border-[#C07DFF] hover:shadow-[0_16px_36px_rgba(192,125,255,0.12)] transition-all duration-300 flex flex-col justify-between shadow-sm group"
            >
              <div>
                {/* Top Row: Circular Avatar + Star Rating */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[#E8E2F2] relative flex-shrink-0 bg-stone-100 shadow-sm">
                    <Image
                      src={rev.avatar}
                      alt={rev.author}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1" aria-label={`${rev.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-base sm:text-lg ${
                          i < rev.rating ? "text-amber-400" : "text-stone-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Review Quote */}
                <p className="font-sans text-stone-700 text-sm sm:text-base leading-relaxed mb-6 italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Bottom: Author Name & Role */}
              <div className="pt-4 border-t border-stone-100">
                <div className="font-sans font-bold text-base text-[#111111] group-hover:text-[#C07DFF] transition-colors">
                  {rev.author}
                </div>
                {rev.role && (
                  <div className="font-sans text-xs text-stone-500 mt-0.5">
                    {rev.role}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Width Client Logos Strip */}
      <div className="bg-[#FAF7FD] py-12 border-t border-[#E8E2F2]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center font-[family-name:var(--font-oswald)] text-xs uppercase tracking-widest text-stone-500 mb-8 font-semibold">
            Trusted By High-Growth Innovators Worldwide
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-8 sm:gap-12 opacity-70">
            {BRANDS.map((brand) => (
              <span
                key={brand}
                className="font-[family-name:var(--font-oswald)] font-extrabold text-2xl sm:text-3xl tracking-tight text-stone-800 hover:text-[#C07DFF] transition-colors cursor-default select-none"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
