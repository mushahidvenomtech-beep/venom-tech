import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

export default function SingleBlogHero() {
  return (
    <section className="pt-14 pb-10 px-4 sm:px-6 lg:px-10 max-w-[1100px] mx-auto">
      {/* Category / Breadcrumb Tag */}
      <div className="flex items-center gap-2 mb-4">
        <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
        <a href="/screens/blogs" className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] hover:underline font-semibold">
          &larr; Back to Blogs &bull; Strategy &bull; Brand Campaigns
        </a>
      </div>

      {/* Main Big Article Title */}
      <h1 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-[-0.03em] leading-[0.92] text-[#111111] mb-8">
        Building Engaging <br />
        Campaigns
      </h1>

      {/* Author and Date Meta Row */}
      <div className="flex items-center gap-6 pb-8 border-b border-stone-200 text-xs font-sans text-stone-500 mb-8">
        <span className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-black text-white font-[family-name:var(--font-oswald)] font-bold text-xs flex items-center justify-center">
            A
          </span>
          <span className="font-semibold text-stone-900">Admin</span>
        </span>
        <span>&bull;</span>
        <span>November 18, 2026</span>
        <span>&bull;</span>
        <span>5 Min Read</span>
      </div>

      {/* Featured Media Showcase: Person Looking at "CREATIVE UNDISPUTED" poster */}
      <div className="w-full aspect-[16/10] bg-[#121315] border-2 border-stone-900 overflow-hidden shadow-2xl relative flex items-center justify-center">
        {/* Stylized Vector / Graphic of the Gallery Scene */}
        <svg viewBox="0 0 1000 625" className="w-full h-full object-cover" fill="none">
          <defs>
            <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E2024" />
              <stop offset="60%" stopColor="#141517" />
              <stop offset="100%" stopColor="#0B0C0D" />
            </linearGradient>
            <linearGradient id="posterBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5F3EF" />
              <stop offset="100%" stopColor="#D9D5CD" />
            </linearGradient>
            <linearGradient id="lightBeam" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Dark Gallery Wall */}
          <rect width="1000" height="625" fill="url(#wallGrad)" />

          {/* Warm Light Shaft from Top Right */}
          <polygon points="1000 0, 700 0, 400 625, 850 625" fill="url(#lightBeam)" />

          {/* Large Exhibition Poster on Wall ("CREATIVE UNDISPUTED") */}
          <g transform="translate(360, 90)">
            {/* Poster Sheet */}
            <rect width="320" height="420" fill="url(#posterBg)" rx="2" filter="drop-shadow(0 20px 30px rgba(0,0,0,0.8))" />

            {/* Poster Purple Header Slash */}
            <path d="M 0 0 L 140 0 L 100 120 L 0 120 Z" fill="#C07DFF" />

            {/* Poster Typography */}
            <text x="30" y="80" fill="#111111" fontFamily="Impact, sans-serif" fontSize="38" fontWeight="bold" letterSpacing="0.02em">
              CREATIVE
            </text>
            <text x="30" y="120" fill="#111111" fontFamily="Impact, sans-serif" fontSize="38" fontWeight="bold" letterSpacing="0.02em">
              UNDISPUTED
            </text>

            {/* Poster Body Micro-text */}
            <g transform="translate(30, 145)" opacity="0.6">
              <line x1="0" y1="0" x2="260" y2="0" stroke="#111" strokeWidth="3" />
              <line x1="0" y1="10" x2="240" y2="10" stroke="#111" strokeWidth="2" />
              <line x1="0" y1="20" x2="250" y2="20" stroke="#111" strokeWidth="2" />
              <line x1="0" y1="30" x2="200" y2="30" stroke="#111" strokeWidth="2" />
              <line x1="0" y1="40" x2="220" y2="40" stroke="#111" strokeWidth="2" />
            </g>

            {/* Geometric Poster Illustration Elements */}
            <g transform="translate(50, 220)">
              <polygon points="120 40, 210 160, 40 160" fill="#7E74FF" opacity="0.8" />
              <polygon points="60 20, 160 170, 0 170" fill="#1C1E22" />
              <circle cx="160" cy="80" r="30" fill="#3BC8F6" opacity="0.9" />
            </g>

            {/* Bottom Signature */}
            <text x="30" y="395" fill="#777" fontFamily="monospace" fontSize="10" letterSpacing="0.2em">
              EXHIBITION &bull; CREAT 2026
            </text>
          </g>

          {/* Silhouette of Person in Foreground Viewing Poster */}
          <g transform="translate(180, 160)">
            {/* Soft Shadow / Rim Lighting */}
            <ellipse cx="140" cy="460" rx="160" ry="25" fill="#000000" opacity="0.6" />

            {/* Back of Head / Hair */}
            <ellipse cx="140" cy="110" rx="55" ry="65" fill="#08090A" />

            {/* Jacket Silhouette (Back View) */}
            <path
              d="M 50 200 C 60 160 110 150 140 150 C 170 150 220 160 230 200 L 260 480 L 20 480 Z"
              fill="#0F1012"
            />
            {/* Subtle Blue/Cyan Ambient Rim Light on Silhouette */}
            <path
              d="M 50 200 C 60 160 110 150 140 150"
              stroke="#4A7599"
              strokeWidth="5"
              fill="none"
              opacity="0.5"
            />
          </g>

          {/* Top Left Watermark in Canvas */}
          <g transform="translate(40, 40)" opacity="0.4">
            <text x="0" y="20" fill="#FFFFFF" fontFamily="monospace" fontSize="12" letterSpacing="0.3em">
              CREAT* GALLERY / EXHIBITION NO. 44
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}

