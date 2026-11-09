import React from "react";

const CLIENTS_ROW_1 = [
  "Attitude",
  "FORCE",
  "INTERVAL",
  "IFOCUS",
  "H2O",
  "NOBILE",
];

const CLIENTS_ROW_2 = [
  "SIGNA",
  "pro-d",
  "Stenn",
  "BLEE",
  "MIKIC",
  "KNIFE",
];

export default function AboutClientsStrip() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-10 border-b border-[#E8E2F2]">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-stone-400 font-bold mb-10">
          Recognized by Pioneering Global Brands &bull; 1998 &ndash; 2026
        </div>

        {/* Row 1 */}
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-8 sm:gap-10 pb-8 border-b border-stone-100">
          {CLIENTS_ROW_1.map((logo) => (
            <span
              key={logo}
              className="font-[family-name:var(--font-oswald)] font-extrabold text-2xl sm:text-3xl tracking-tight text-stone-800 hover:text-[#C07DFF] transition-colors cursor-default select-none uppercase"
            >
              {logo}
            </span>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-8 sm:gap-10 pt-8">
          {CLIENTS_ROW_2.map((logo) => (
            <span
              key={logo}
              className="font-[family-name:var(--font-oswald)] font-extrabold text-2xl sm:text-3xl tracking-tight text-stone-800 hover:text-[#C07DFF] transition-colors cursor-default select-none uppercase"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

