import React from "react";

export default function ContactMapSection() {
  return (
    <section className="w-full relative h-[420px] sm:h-[480px] bg-stone-200 border-b border-[#E8E2F2] overflow-hidden">
      {/* Interactive Map Iframe with Silver / Minimalist Styling */}
      <iframe
        title="CREAT Studio Location Map"
        width="100%"
        height="100%"
        className="w-full h-full grayscale contrast-125 opacity-90 border-0"
        loading="lazy"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.9961688647565!2d98.6738!3d3.5852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303131bf4e2b0001%3A0x1b2d7c5a0e0e0e0e!2sMedan%2C%20North%20Sumatra%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
      />

      {/* Studio Location Card Overlay (Top-Left, matching reference) */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-10 bg-white/95 backdrop-blur-md p-5 border border-stone-300 shadow-2xl max-w-xs animate-in fade-in duration-300">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h4 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-base text-[#111111]">
              Taman Ahmad Yani Medan
            </h4>
            <p className="font-sans text-xs text-stone-500 mt-0.5">
              Jl. Imam Bonjol, Medan Maimun, Kota Medan, North Sumatra, Indonesia
            </p>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] mt-1 flex-shrink-0 animate-ping" />
        </div>

        <div className="flex items-center gap-1.5 text-xs font-sans text-stone-600 mb-4">
          <span className="font-bold text-stone-900">4.6</span>
          <span className="text-[#C07DFF]">★★★★★</span>
          <span className="text-stone-400">(4,450)</span>
        </div>

        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-[family-name:var(--font-oswald)] uppercase font-bold tracking-wider text-black hover:text-[#C07DFF] transition-colors"
        >
          <span>Open in Maps</span>
          <span>&rarr;</span>
        </a>
      </div>
    </section>
  );
}

