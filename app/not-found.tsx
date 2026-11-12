import Link from "next/link";
import Image from "next/image";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-transparent text-[#111111] flex flex-col justify-between selection:bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] selection:text-white">
      {/* Top Bar */}
      <header className="border-b border-[#E8E2F2] px-6 py-5 max-w-[1440px] mx-auto w-full flex items-center justify-between">
        <Link href="/screens/home" className="inline-flex items-center group">
          <Image
            src="/images/logo.webp"
            alt="Venom Tech IT Solution"
            width={160}
            height={38}
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <Link
          href="/screens/contactus"
          className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-wider text-stone-600 hover:text-[#C07DFF] font-semibold transition-colors"
        >
          Need Support?
        </Link>
      </header>

      {/* Main 404 Hero */}
      <main id="main-content" className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10 py-16 relative overflow-hidden">
        {/* Decorative Giant Asterisk Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10">
          <AsteriskIcon className="w-96 h-96 sm:w-[500px] sm:h-[500px] text-black" color="#000000" strokeWidth={1.5} />
        </div>

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#C07DFF]/30 bg-[#F4E9FF] rounded-full mb-6">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3.4} />
            <span className="font-[family-name:var(--font-oswald)] uppercase text-xs font-semibold tracking-wider text-[#C07DFF]">
              Error 404 &bull; Missing Coordinates
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-7xl sm:text-9xl tracking-tight leading-none text-[#111111] mb-6">
            4<span className="text-[#C07DFF]">0</span>4
          </h1>

          <h2 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl sm:text-3xl text-stone-900 mb-4 tracking-tight">
            The page you are looking for does not exist.
          </h2>

          <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed mb-10 max-w-lg mx-auto">
            The destination link may have moved, expired, or been re-architected. You can return to our home flagship or explore our capabilities.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/screens/home"
              className="inline-flex items-center gap-2.5 bg-black hover:bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white px-8 py-4 font-[family-name:var(--font-oswald)] font-semibold text-sm uppercase tracking-wider transition-all duration-300 shadow-md group"
            >
              <span>Return To Flagship</span>
              <span className="text-[#C07DFF] group-hover:text-white transition-colors">&rarr;</span>
            </Link>

            <Link
              href="/screens/services"
              className="inline-flex items-center gap-2.5 bg-white hover:bg-stone-100 border border-stone-300 px-8 py-4 font-[family-name:var(--font-oswald)] font-semibold text-sm uppercase tracking-wider text-[#111111] transition-all duration-300"
            >
              <span>Explore Services</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="border-t border-[#E8E2F2] px-6 py-6 text-center text-xs font-sans text-stone-500">
        &copy; 2026 CREAT Studio Inc. All rights reserved.
      </footer>
    </div>
  );
}

