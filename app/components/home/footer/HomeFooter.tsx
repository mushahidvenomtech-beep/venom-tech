import React from "react";
import Link from "next/link";
import Image from "next/image";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import StarBorder from "@/app/component/global/ui/StarBorder";

export default function HomeFooter() {
  return (
    <footer className="bg-gradient-to-b from-transparent via-[#F5EBFF]/40 to-[#E8F9FF]/60 pt-10 sm:pt-14 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-10 border-t border-[#E8E2F2] relative overflow-hidden">
      {/* Large Decorative Asterisk Watermark in Bottom Right */}
      <div className="absolute -bottom-16 -right-16 pointer-events-none opacity-5">
        <AsteriskIcon className="w-80 h-80 text-[#C07DFF]" color="#C07DFF" strokeWidth={1.5} />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Top Footer CTA Heading Banner */}
        <div className="pb-8 sm:pb-10 mb-8 sm:mb-12 border-b border-[#E8E2F2] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8">
          <div className="max-w-4xl xl:max-w-5xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 bg-[#E8F9FF] border border-[#3BC8F6]/30 rounded-full">
              <AsteriskIcon className="w-3.5 h-3.5 text-[#0284C7]" color="#0284C7" strokeWidth={3} />
              <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#0284C7] font-semibold">
                Let&apos;s Build Together
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-[44px] sm:text-[44px] lg:text-[44px] text-[#000000] tracking-tight leading-[1.08]">
              Join hands with us and <br className="hidden sm:inline" />
              <span className="text-brand-gradient">start your success journey today.</span>
            </h2>
          </div>

          <StarBorder
            as="link"
            href="/screens/contactus"
            color="#3BC8F6"
            trailColor="#C07DFF"
            stars={2}
            glow={0.8}
            sparkle
            radius={12}
            backgroundColor="#9333ea"
            textColor="#ffffff"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-white font-[family-name:var(--font-oswald)] uppercase font-bold text-sm tracking-wider shadow-lg shadow-[#3BC8F6]/20 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all flex-shrink-0 self-start lg:self-center cursor-pointer"
          >
            <span>Start Project</span>
            <span>&rarr;</span>
          </StarBorder>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Brand Info & Contact */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/screens/home" className="inline-flex items-center group">
              <Image
                src="/images/venom tech logo.png"
                alt="Venom Tech IT Solution"
                width={220}
                height={55}
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed max-w-md">
              Redefining digital marketing with visionary and innovative solutions. We are Venom Tech, where visions and strategies meet.
            </p>

            {/* Direct Email & Phone from Attachment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#E8E2F2]/70">
              <div>
                <span className="text-xs uppercase tracking-wider text-stone-400 block font-sans font-medium mb-1">
                  Say hello to Email
                </span>
                <a
                  href="mailto:info@venomtech.pk"
                  className="font-medium text-sm sm:text-base text-stone-900 hover:text-[#0284C7] transition-colors"
                >
                  info@venomtech.pk
                </a>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-stone-400 block font-sans font-medium mb-1">
                  Phone No
                </span>
                <a
                  href="tel:+923214774200"
                  className="font-medium text-sm sm:text-base text-stone-900 hover:text-[#0284C7] transition-colors"
                >
                  +92 321 4774200
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider text-[#C07DFF] font-semibold block">
                Accepting New Partnerships &bull; 2026
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 sm:col-span-6">
            <h4 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-sm tracking-widest text-[#000000] mb-5">
              Navigation
            </h4>
            <ul className="space-y-3 font-[family-name:var(--font-oswald)] text-base text-stone-600">
              <li><Link href="/screens/home" className="hover:text-[#C07DFF] transition-colors">Home</Link></li>
              <li><Link href="/screens/aboutus" className="hover:text-[#C07DFF] transition-colors">About Us</Link></li>
              <li><Link href="/screens/careers" className="hover:text-[#C07DFF] transition-colors">Careers</Link></li>
              <li><Link href="/screens/blogs" className="hover:text-[#C07DFF] transition-colors">Blogs</Link></li>
              <li><Link href="/screens/contactus" className="hover:text-[#C07DFF] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="md:col-span-4 sm:col-span-6">
            <h4 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-sm tracking-widest text-[#000000] mb-5">
              Capabilities
            </h4>
            <ul className="space-y-3 font-sans text-xs sm:text-sm text-stone-600">
              <li><Link href="/screens/services/ai-automation" className="hover:text-[#C07DFF] transition-colors">AI Automation</Link></li>
              <li><Link href="/screens/services/app-development" className="hover:text-[#C07DFF] transition-colors">App Development</Link></li>
              <li><Link href="/screens/services/graphic-designing" className="hover:text-[#C07DFF] transition-colors">Graphic Designing</Link></li>
              <li><Link href="/screens/services/seo" className="hover:text-[#C07DFF] transition-colors">SEO</Link></li>
              <li><Link href="/screens/services/advertising-agency" className="hover:text-[#C07DFF] transition-colors">Advertising Agency</Link></li>
              <li><Link href="/screens/services/bpo-services" className="hover:text-[#C07DFF] transition-colors">BPO Services</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E8E2F2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-stone-500">
          <div>
            &copy; 2026 Venom Tech IT Solution. All rights reserved.
          </div>

          <div className="flex items-center gap-6 uppercase tracking-wider font-[family-name:var(--font-oswald)] text-stone-600">
            <a
              href="https://www.facebook.com/people/Venom-Tech/61581955490808/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0284C7] transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/venomtech.pk/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C07DFF] transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
