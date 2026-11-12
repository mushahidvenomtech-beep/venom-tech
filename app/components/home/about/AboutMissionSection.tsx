import React from "react";
import Image from "next/image";
import Link from "next/link";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

export default function AboutMissionSection() {
  return (
    <section
      id="about"
      className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Mission Content */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#F4E9FF] border border-[#C07DFF]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
              About Us
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#000000] tracking-tight leading-[0.95] mb-6">
            Your Vision, <span className="text-brand-gradient">Our Expertise</span> Every Step of the Way
          </h2>

          <p className="font-sans text-stone-600 text-base sm:text-lg leading-relaxed mb-8">
            At Venom Tech, we are driven forward with the mission of helping businesses, large or small, dominate the digital landscape. Since 2022, we have been delivering top-tier digital marketing services in Lahore, helping our clients across the spectrum to achieve success and making their online presence unshakable. With a strong zeal for turning your business visions into a digital reality, we keep things simplified, smooth, effective, and in alignment with your requirements. We&apos;ve set the bar high, breaking new records with each success. With a focus on SEO, SEM, PPC, Social Media Marketing, Web Design and Development, Mobile App Development, Reputation Management, Branding, Email Marketing, and Google Products services, we provide innovative digital solutions designed to accelerate your business growth and enhance your online visibility. Partner with us and watch the magic happen!
          </p>

          <Link
            href="/screens/aboutus"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white px-8 py-4 font-[family-name:var(--font-oswald)] font-semibold text-base uppercase tracking-wider transition-all duration-300 group shadow-lg shadow-[#C07DFF]/25 hover:opacity-95 rounded-xl"
          >
            <span>Discover More</span>
            <span className="text-white group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        {/* Right Column: Visual Frame with New Venom2 Image */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          {/* Asterisk Watermark in Top Right */}
          <div className="absolute -top-10 -right-4 sm:-right-8 z-10 pointer-events-none">
            <AsteriskIcon className="w-24 h-24 sm:w-32 sm:h-32 text-[#C07DFF]" color="#C07DFF" strokeWidth={2.4} />
          </div>

          {/* Visual Frame */}
          <div className="relative w-full max-w-[500px] aspect-square bg-gradient-to-b from-[#F5EBFF] to-[#E8F9FF] border-2 border-[#C07DFF]/20 overflow-hidden shadow-2xl rounded-3xl flex items-center justify-center p-3 sm:p-5 group">
            {/* New Venom2 Brand Showcase Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/images/Venom2-DPoeIvKb.webp"
                alt="Venom Tech - Your Vision, Our Expertise"
                width={1000}
                height={1000}
                priority
                className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Overlapping Gradient Badge */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 bg-gradient-to-br from-[#C07DFF] to-[#3BC8F6] text-white p-4 sm:p-5 shadow-2xl border border-white/40 rounded-2xl max-w-[190px] sm:max-w-[210px] backdrop-blur-sm">
              <div className="font-[family-name:var(--font-oswald)] font-extrabold text-3xl sm:text-5xl leading-none mb-1">
                150+
              </div>
              <div className="font-[family-name:var(--font-oswald)] uppercase text-[11px] sm:text-xs tracking-wider font-semibold leading-tight text-white/95">
                Projects Completed To Perfection
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
