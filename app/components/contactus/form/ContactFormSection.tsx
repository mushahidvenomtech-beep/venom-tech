"use client";

import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import ContactMultiStepForm from "@/app/component/contactus/form/ContactMultiStepForm";

export default function ContactFormSection() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Interactive Multi-Step Form with Page Flip Transition & Glass Door UI */}
        <div className="lg:col-span-7">
          <ContactMultiStepForm source="contactus_page" variant="glass" />
        </div>

        {/* Right Column: Editorial & Contact Details matching image */}
        <div className="lg:col-span-5 lg:pl-4">
          <div className="inline-flex items-center gap-2 mb-4">
            <AsteriskIcon className="w-4 h-4 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
              Connect With Us
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-[44px] sm:text-[44px] text-[#111111] tracking-tight leading-[1.08] mb-6">
            <span className="text-stone-400 font-light">Reach Out,</span> <br />
            Let&apos;s <span className="text-[#C07DFF]">Collaborate.</span>
          </h2>

          <p className="font-sans text-stone-600 text-base leading-relaxed mb-10">
            Tell us about your next project, technical brief, or transformation roadmap. Our senior creative and engineering partners engage directly on every engagement.
          </p>

          {/* 3 Contact Info Columns matching image */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-stone-200">
            {/* Location */}
            <div>
              <h4 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-base text-[#111111] mb-2">
                Location
              </h4>
              <p className="font-sans text-xs text-stone-600 leading-relaxed">
                456 Creative District<br />
                Ahmad Yani, Medan,<br />
                North Sumatera
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-base text-[#111111] mb-2">
                Contact
              </h4>
              <div className="font-sans text-xs text-stone-600 space-y-1">
                <a href="mailto:hola@dominantsite.com" className="hover:text-[#C07DFF] transition-colors block">
                  hola@dominantsite.com
                </a>
                <p>+800-3374-4676</p>
                <p>555-278-4364</p>
              </div>
            </div>

            {/* Stalk Us */}
            <div>
              <h4 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-base text-[#111111] mb-2">
                Stalk Us
              </h4>
              <div className="flex items-center gap-2 pt-1 text-stone-800">
                <a
                  href="https://www.facebook.com/people/Venom-Tech/61581955490808/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded border border-stone-300 flex items-center justify-center hover:bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] hover:text-white hover:border-[#C07DFF] transition-colors text-xs font-bold"
                  aria-label="Facebook"
                >
                  f
                </a>
                <a
                  href="https://www.instagram.com/venomtech.pk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded border border-stone-300 flex items-center justify-center hover:bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] hover:text-white hover:border-[#C07DFF] transition-colors text-xs font-bold"
                  aria-label="Instagram"
                >
                  ig
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
