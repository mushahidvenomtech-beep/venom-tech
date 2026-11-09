import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import BorderGlow from "@/app/component/global/ui/BorderGlow";

const SERVICES_DATA = [
  {
    num: "01",
    title: "Brand Strategy & Visual Identity",
    summary: "Creating distinct visual languages, brand positioning, and comprehensive design systems.",
    deliverables: ["Brand Core & Positioning", "Logo & Typography Hierarchy", "Design System Guidelines", "Collateral & Print Systems"],
  },
  {
    num: "02",
    title: "Web & UI/UX Product Design",
    summary: "Transforming complex business logic into intuitive, hyper-engaging digital interfaces.",
    deliverables: ["User Research & User Flow Mapping", "High-Fidelity Wireframes", "Interactive Motion Prototypes", "Figma Design Token Libraries"],
  },
  {
    num: "03",
    title: "Full-Stack Creative Engineering",
    summary: "Developing blazing fast, accessible, and scalable platforms with modern web stacks.",
    deliverables: ["Next.js & React 19 Architecture", "Tailwind CSS & Fluid Responsive Layouts", "Headless CMS Integration", "SEO & Core Web Vitals Optimization"],
  },
  {
    num: "04",
    title: "3D Visuals & Motion Direction",
    summary: "Elevating brand experiences with spatial dimensions, physics-based motion, and micro-interactions.",
    deliverables: ["3D WebGL Assets & Interactive Canvas", "Kinetic Typography Animations", "Product Showcase Renders", "Brand Video Direction"],
  },
];

export default function ServiceCards() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICES_DATA.map((service) => (
          <BorderGlow
            key={service.num}
            borderRadius={20}
            backgroundColor="#ffffff"
            glowColor="275 80 75"
            glowRadius={36}
            colors={["#C07DFF", "#3BC8F6", "#9333ea"]}
            className="h-full"
          >
            <div className="p-8 sm:p-10 bg-white h-full transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-[family-name:var(--font-oswald)] text-[#C07DFF] text-3xl font-bold">
                    {service.num}
                  </span>
                  <AsteriskIcon className="w-5 h-5 text-stone-300" color="currentColor" strokeWidth={3} />
                </div>

                <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-3xl text-[#111111] mb-3">
                  {service.title}
                </h3>
                <p className="font-sans text-stone-600 text-base leading-relaxed mb-6">
                  {service.summary}
                </p>
              </div>

              <div>
                <div className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider text-stone-400 font-semibold mb-3">
                  Key Deliverables
                </div>
                <ul className="space-y-2 border-t border-stone-100 pt-3">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs font-sans text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </BorderGlow>
        ))}
      </div>
    </section>
  );
}

