"use client";

import React from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import ContactMultiStepForm from "@/app/component/contactus/form/ContactMultiStepForm";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Side: Glass Door Multi-Step Form */}
        <div className="lg:col-span-7">
          <ContactMultiStepForm source="home_page" variant="glass" />
        </div>

        {/* Right Side: Editorial Invitation & Office Details */}
        <div className="lg:col-span-5 lg:pl-4 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F5EBFF] border border-[#C07DFF]/40 rounded-full">
            <AsteriskIcon className="w-4 h-4 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#7C3AED] font-semibold">
              Get In Touch
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-[44px] sm:text-[44px] text-[#111111] tracking-tight leading-[1.08]">
            Let&apos;s Talk, <br />
            <span className="text-[#C07DFF]">Let&apos;s Collaborate.</span>
          </h2>

          <p className="font-sans text-stone-600 text-base sm:text-lg leading-relaxed">
            Have an upcoming project, rebrand, or web application you want to launch? Our senior partners review design and engineering inquiries daily with guaranteed milestone quality.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-stone-200">
            <div>
              <div className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider text-stone-400 font-bold mb-1">
                Email Us
              </div>
              <a
                href="mailto:info@venomtech.pk"
                className="font-[family-name:var(--font-oswald)] font-bold text-base text-[#111111] hover:text-[#C07DFF] transition-colors block"
              >
                info@venomtech.pk
              </a>
            </div>

            <div>
              <div className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider text-stone-400 font-bold mb-1">
                Call Direct
              </div>
              <a
                href="tel:+923214774200"
                className="font-[family-name:var(--font-oswald)] font-bold text-base text-[#111111] hover:text-[#C07DFF] transition-colors block"
              >
                +92 321 4774200
              </a>
            </div>

            <div>
              <div className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider text-stone-400 font-bold mb-1">
                Response SLA
              </div>
              <span className="font-[family-name:var(--font-oswald)] font-bold text-base text-[#111111] block">
                &lt; 24 Hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
