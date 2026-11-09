"use client";

import React, { useState } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

export default function SingleBlogContent() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <article className="pt-6 pb-16 px-4 sm:px-6 lg:px-10 max-w-[1100px] mx-auto border-b border-[#E8E2F2]">
      {/* Editorial Body Text */}
      <div className="space-y-6 font-sans text-stone-700 text-base sm:text-lg leading-relaxed max-w-none">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus magna vitae dui mollis, eget accumsan dolor posuere. Maecenas non maximus ipsum, vitae venenatis neque. Phasellus tincidunt velit ac elit blandit commodo. Aenean euismod, diam id gravida bibendum, nibh libero finibus arcu, sit amet porttitor ipsum odio a massa. Donec fermentum suscipit molestie. Suspendisse potenti. Praesent lacinia ex quis arcu porttitor hendrerit. Etiam vitae nisi magna. In hac habitasse platea dictumst. Phasellus felis quam, ultrices nec cursus a, commodo nec orci. Aenean egestas, lacus vitae cursus gravida, ligula tellus imperdiet lacus, nec congue quam nisl ut odio. In sollicitudin auctor urna, in feugiat erat consectetur consequat.
        </p>

        <p>
          Pellentesque vulputate lobortis nisl laoreet vehicula. Ut quam ligula, sagittis a sodales et, gravida vel nunc. Donec dignissim tristique mattis. Quisque euismod libero leo, eget porttitor ex imperdiet vitae. Nunc blandit dolor eget nulla ultrices lobortis. Cras sed metus in diam pulvinar suscipit. Duis ullamcorper quis massa sit amet tincidunt. Nullam et fringilla mauris. Nulla facilisi. Aenean pharetra a ex vel molestie. Mauris ultricies dui quis egestas venenatis. Donec aliquet ut lectus a mollis. Phasellus faucibus, ipsum nec euismod posuere, ante turpis consectetur mauris, sed sollicitudin lacus nisl a felis. Pellentesque id fringilla lorem.
        </p>

        {/* Pull Quote Highlight */}
        <div className="my-10 p-8 sm:p-10 bg-white border-l-4 border-[#C07DFF] shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <AsteriskIcon className="w-5 h-5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3.2} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider text-[#C07DFF] font-bold">
              Core Campaign Tenet
            </span>
          </div>
          <blockquote className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl sm:text-3xl text-[#111111] leading-snug">
            &ldquo;Distinctive brands do not emerge by copying standard market playbooks. They are forged through intentional tension, fearless typography, and mathematical layout discipline.&rdquo;
          </blockquote>
          <span className="font-sans text-xs text-stone-500 uppercase tracking-wider font-semibold block mt-4">
            &mdash; Julian Vance, Principal Creative Director
          </span>
        </div>

        <p>
          Etiam ac dignissim erat, nec dignissim nunc. Sed eu enim odio. Aenean id scelerisque nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas ex lectus, consectetur a efficitur vitae, imperdiet non nibh. Sed eu metus interdum, euismod justo vel, egestas justo. Nullam ullamcorper lectus ligula, eget pulvinar nisl accumsan ac. Nunc lectus diam, ultricies quis mi ac, ullamcorper ultrices dolor. Fusce mi quam, gravida vel nisl et, posuere porta nibh. Nulla facilisi. Sed eget commodo neque. Donec sem nibh, convallis eu finibus quis, porta ut felis.
        </p>
      </div>

      {/* Tags and Social Share Bar */}
      <div className="mt-12 pt-8 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider text-stone-500 font-bold mr-2">
            Tags:
          </span>
          {["Strategy", "Campaigns", "ArtDirection", "Identity", "NextJS"].map((t) => (
            <span
              key={t}
              className="text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider text-stone-700 bg-white border border-stone-200 px-3 py-1 hover:border-black transition-colors cursor-pointer"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* Share */}
        <div className="flex items-center gap-3">
          <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider text-stone-500 font-bold">
            Share Article:
          </span>
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 bg-black text-white text-xs font-[family-name:var(--font-oswald)] uppercase tracking-wider hover:bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] transition-colors flex items-center gap-1.5"
          >
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

