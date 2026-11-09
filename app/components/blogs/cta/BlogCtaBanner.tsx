import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import StarBorder from "@/app/component/global/ui/StarBorder";

export default function BlogCtaBanner() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]">
      <div className="bg-gradient-to-r from-white via-[#F5EBFF] to-[#E8F9FF] p-10 sm:p-16 lg:p-20 relative overflow-hidden border-2 border-[#C07DFF]/30 shadow-[0_20px_50px_rgba(192,125,255,0.12)] rounded-3xl flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Large Decorative Outlined Asterisk on Left */}
        <div className="absolute -left-12 -top-12 opacity-15 pointer-events-none hidden lg:block">
          <AsteriskIcon className="w-64 h-64 text-[#C07DFF]" color="#C07DFF" strokeWidth={1.8} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#F4E9FF] border border-[#C07DFF]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
              Have A Project In Mind?
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.95] text-[#000000] mb-6">
            Let&apos;s Work <span className="text-brand-gradient">Together!</span>
          </h2>

          <p className="font-sans text-stone-700 text-base sm:text-lg leading-relaxed">
            Ready to translate ideas into a high-converting digital presence? Let&apos;s turn your vision into an iconic digital flagship.
          </p>
        </div>

        {/* Action Button: Get in Touch * */}
        <div className="relative z-10">
          <StarBorder
            as="a"
            href="/screens/contactus"
            color="#3BC8F6"
            trailColor="#C07DFF"
            stars={2}
            glow={0.8}
            sparkle
            radius={12}
            backgroundColor="#9333ea"
            textColor="#ffffff"
            className="inline-flex items-center gap-3 text-white px-8 sm:px-10 py-5 font-[family-name:var(--font-oswald)] font-bold text-base uppercase tracking-wider transition-all duration-300 group shadow-lg shadow-[#C07DFF]/25 rounded-xl cursor-pointer"
          >
            <span>Get In Touch</span>
            <AsteriskIcon
              className="w-4 h-4 text-white group-hover:rotate-45 transition-all duration-300"
              color="#FFFFFF"
              strokeWidth={3.4}
            />
          </StarBorder>
        </div>
      </div>
    </section>
  );
}

