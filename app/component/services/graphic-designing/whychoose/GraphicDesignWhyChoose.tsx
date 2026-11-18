import React from "react";
import Image from "next/image";
import Link from "next/link";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import BorderGlow from "@/app/component/global/ui/BorderGlow";

const SOLUTIONS = [
  {
    title: "Creative Design Services",
    desc: "Fresh, original designs tailored to your audience and goals.",
    image: "/images/services/ui-design.webp",
    tag: "Visual Concepts",
  },
  {
    title: "Brand Identity Design",
    desc: "Complete visual identities that make your brand instantly recognisable.",
    image: "/images/services/animation.webp",
    tag: "Corporate Identity",
  },
  {
    title: "Digital & Social Media Graphics",
    desc: "Platform-ready creatives sized and optimised for engagement.",
    image: "/images/services/digital-marketing.webp",
    tag: "Social Media",
  },
  {
    title: "Marketing & Ad Creatives",
    desc: "High-converting ad designs for Meta, Google and display campaigns.",
    image: "/images/services/lead-funnels.webp",
    tag: "Ad Creatives",
  },
  {
    title: "UI/UX & Web Graphics",
    desc: "Clean interface designs and web visuals that improve user experience.",
    image: "/images/services/software-development.webp",
    tag: "Digital Products",
  },
  {
    title: "Print & Packaging Design",
    desc: "Print-ready files for packaging, brochures, banners and stationery.",
    image: "/images/services/photography.webp",
    tag: "Packaging & Print",
  },
  {
    title: "Motion Graphics & Animation",
    desc: "Animated logos, reels and explainer videos that bring your brand to life.",
    image: "/images/services/ar-vr.webp",
    tag: "Motion Design",
  },
];

export default function GraphicDesignWhyChoose() {
  return (
    <section id="why-choose" className="bg-white py-10 sm:py-14 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F9FF] border border-[#3BC8F6]/30 rounded-full">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#0284C7]" color="#0284C7" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#0284C7] font-semibold">
              The Creative Edge
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#000000] tracking-tight leading-[1.02]">
            Why Choose Venom Tech <span className="text-brand-gradient">for Graphic Design?</span>
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            One creative team for every design need, with fast turnaround and unlimited ideas.
          </p>
        </div>

        {/* 7 Solutions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SOLUTIONS.map((service, idx) => (
            <BorderGlow
              key={service.title}
              borderRadius={18}
              backgroundColor="#ffffff"
              glowColor="200 95 65"
              glowRadius={34}
              colors={["#3BC8F6", "#C07DFF", "#0284C7"]}
              className={`h-full ${
                idx === 6 ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""
              }`}
            >
              <article className="group bg-white h-full transition-all duration-300 flex flex-col justify-between">
                <div>
                  {/* Visual Image Header */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-900">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-[family-name:var(--font-oswald)] text-[11px] uppercase tracking-wider font-semibold border border-white/20">
                      {service.tag}
                    </span>
                    <span className="absolute top-3.5 right-3.5 font-[family-name:var(--font-oswald)] text-lg font-bold text-white/80">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-xl sm:text-2xl text-[#000000] tracking-tight leading-snug mb-3 group-hover:text-[#0284C7] transition-colors">
                      {service.title}
                    </h3>

                    <p className="font-sans text-stone-600 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    href="/screens/contactus"
                    className="inline-flex items-center gap-2 text-xs font-[family-name:var(--font-oswald)] uppercase font-bold tracking-wider text-[#0284C7] group-hover:text-[#C07DFF] transition-colors"
                  >
                    <span>Request a Custom Design Quote</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
              </article>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
