"use client";

import React from "react";
import ContactMultiStepForm from "@/app/component/contactus/form/ContactMultiStepForm";

export default function InquiryForm() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left column: Direct Contacts */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-3xl sm:text-4xl text-[#111111] mb-3">
              Direct Contact Channels
            </h3>
            <p className="font-sans text-stone-600 text-sm leading-relaxed">
              Prefer direct outreach? Contact our leadership team directly via email or scheduled briefing.
            </p>
          </div>

          <div className="space-y-4 font-[family-name:var(--font-oswald)] text-lg">
            <div className="p-6 bg-white/70 backdrop-blur-xl border border-stone-200 rounded-2xl shadow-sm">
              <span className="text-xs uppercase text-stone-400 font-mono block mb-1">General Inquiries</span>
              <a href="mailto:info@venomtech.pk" className="text-[#111111] hover:text-[#C07DFF] font-bold transition-colors">
                info@venomtech.pk
              </a>
            </div>

            <div className="p-6 bg-white/70 backdrop-blur-xl border border-stone-200 rounded-2xl shadow-sm">
              <span className="text-xs uppercase text-stone-400 font-mono block mb-1">Direct Phone</span>
              <a href="tel:+923214774200" className="text-[#111111] hover:text-[#C07DFF] font-bold transition-colors">
                +92 321 4774200
              </a>
            </div>

            <div className="p-6 bg-white/70 backdrop-blur-xl border border-stone-200 rounded-2xl shadow-sm">
              <span className="text-xs uppercase text-stone-400 font-mono block mb-1">Studio Headquarters</span>
              <span className="text-stone-800 font-medium block">
                Medan &bull; Lahore &bull; Global Remote Pods
              </span>
            </div>
          </div>
        </div>

        {/* Right column: Glass Door Multi-Step Form */}
        <div className="lg:col-span-7">
          <ContactMultiStepForm source="contact_inquiry_page" variant="glass" />
        </div>
      </div>
    </section>
  );
}
