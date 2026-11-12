import React from "react";
import Image from "next/image";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

const REVIEWS = [
  {
    author: "Sarah Johnson",
    rating: 5,
    avatar: "/images/testimonials/avatar-1.webp",
    quote:
      "Venom Tech did an outstanding job building our website. Their professional team delivered a stunning, functional site that has truly elevated our online presence",
  },
  {
    author: "David Lee",
    rating: 4,
    avatar: "/images/testimonials/avatar-2.webp",
    quote:
      "Venom Tech has dramatically strengthened our online presence. Their revolutionary marketing strategies enhanced our client engagement, helping us reach and connect with the right targeted audience. With them redirecting our business in the right direction, our sales have skyrocketed.",
  },
  {
    author: "Emily Brown",
    rating: 5,
    avatar: "/images/testimonials/avatar-3.webp",
    quote:
      "Venom Tech always delivers outstanding SEO services tailored to drive real results. Their expert team combines strategic keyword research, on-page optimization, and high-quality backlinking to boost online visibility and organic rankings.",
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

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="border-b border-[#E8E2F2] overflow-hidden">
      {/* Testimonials Grid */}
      <div className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-4 mb-8 sm:mb-10">
          <AsteriskIcon className="w-8 h-8 sm:w-12 sm:h-12 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
          <h2 className="font-[family-name:var(--font-oswald)] font-extrabold uppercase text-[44px] sm:text-[44px] lg:text-[44px] text-[#111111] tracking-tight leading-[1.08]">
            Echoes of Our <span className="text-brand-gradient">Valued Clients.</span>
          </h2>
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

              {/* Bottom: Author Name */}
              <div className="pt-4 border-t border-stone-100">
                <div className="font-sans font-bold text-base text-[#111111] group-hover:text-[#C07DFF] transition-colors">
                  {rev.author}
                </div>
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
