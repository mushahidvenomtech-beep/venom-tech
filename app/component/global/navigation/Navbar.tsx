"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import AsteriskIcon from "./AsteriskIcon";
import SearchModal from "./SearchModal";
import MobileMenu from "./MobileMenu";
import StarBorder from "@/app/component/global/ui/StarBorder";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import GooeyNav, { GooeyNavItem } from "@/app/component/global/ui/GooeyNav";

export interface NavSubItem {
  title: string;
  href: string;
  desc?: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  hasDropdown: boolean;
  subItems?: NavSubItem[];
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/screens/home",
    hasDropdown: false,
  },
  {
    id: "blogs",
    label: "Blogs",
    href: "/screens/blogs",
    hasDropdown: false,
  },
  {
    id: "about",
    label: "About Us",
    href: "/screens/aboutus",
    hasDropdown: false,
  },
  {
    id: "careers",
    label: "Careers",
    href: "/screens/careers",
    hasDropdown: false,
  },
  {
    id: "services",
    label: "Services",
    href: "/screens/services",
    hasDropdown: true,
    subItems: [
      { title: "AI Automation", href: "/screens/services/ai-automation", desc: "Intelligent workflow & RPA solutions" },
      { title: "App Development", href: "/screens/services/app-development", desc: "Custom iOS, Android & hybrid apps" },
      { title: "Graphic Designing", href: "/screens/services/graphic-designing", desc: "Branding, UI/UX & visual identity" },
      { title: "SEO", href: "/screens/services/seo", desc: "Search engine optimization & rankings" },
      { title: "Advertising Agency", href: "/screens/services/advertising-agency", desc: "Performance ads, PPC & media buying" },
      { title: "BPO Services", href: "/screens/services/bpo-services", desc: "Call center, support & back-office operations" },
    ],
  },
  {
    id: "contact",
    label: "Contact Us",
    href: "/screens/contactus",
    hasDropdown: false,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Derive active section cleanly from route without cascading renders
  const activeSection = React.useMemo(() => {
    if (!pathname || pathname === "/" || pathname === "/screens/home" || pathname === "/pages/home") {
      return "home";
    }
    if (pathname.includes("about")) return "about";
    if (pathname.includes("blog")) return "blogs";
    if (pathname.includes("career")) return "careers";
    if (pathname.includes("service")) return "services";
    if (pathname.includes("contact")) return "contact";
    return "home";
  }, [pathname]);

  // Scroll listener for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (target: string) => {
    setActiveDropdown(null);

    let destination = target;
    if (target === "home") destination = "/screens/home";
    else if (target === "blogs" || target === "blog") destination = "/screens/blogs";
    else if (target === "about" || target === "aboutus") destination = "/screens/aboutus";
    else if (target === "careers" || target === "career") destination = "/screens/careers";
    else if (target === "services") destination = "/screens/services";
    else if (target === "contact" || target === "contactus") destination = "/screens/contactus";

    router.push(destination);
  };

  const desktopNavItems = React.useMemo(
    () => NAV_ITEMS.filter((item) => item.id !== "contact"),
    []
  );

  const activeNavIndex = React.useMemo(() => {
    const found = desktopNavItems.findIndex((item) => item.id === activeSection);
    return found >= 0 ? found : 0;
  }, [activeSection, desktopNavItems]);

  const gooeyItems: GooeyNavItem[] = React.useMemo(() => {
    return desktopNavItems.map((item) => {
      const isDropdownOpen = activeDropdown === item.id;

      return {
        id: item.id,
        label: item.label,
        href: item.href,
        suffix: item.hasDropdown ? (
          <span
            className={`inline-block ml-1 transition-transform duration-200 text-[9px] ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        ) : undefined,
        onMouseEnter: () => item.hasDropdown && setActiveDropdown(item.id),
        onMouseLeave: () => item.hasDropdown && setActiveDropdown(null),
        onClick: () => handleNavClick(item.href),
        dropdown: item.hasDropdown && item.subItems ? (
          <div
            className={`absolute top-full left-0 pt-2 transition-all duration-300 origin-top z-50 ${
              item.id === "services" ? "w-[340px]" : "w-72"
            } ${
              isDropdownOpen
                ? "opacity-100 scale-100 translate-y-0 visible pointer-events-auto"
                : "opacity-0 scale-95 -translate-y-2 invisible pointer-events-none"
            }`}
          >
            <div className="card-nav-dropdown-panel p-2.5 space-y-1.5">
              {item.subItems.map((sub, idx) => (
                <Link
                  key={sub.title}
                  href={sub.href}
                  onClick={() => {
                    setActiveDropdown(null);
                  }}
                  style={{
                    animationDelay: isDropdownOpen ? `${idx * 45}ms` : "0ms",
                  }}
                  className={`card-nav-dropdown-item group/item ${
                    isDropdownOpen ? "card-nav-enter" : ""
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="font-[family-name:var(--font-oswald)] font-medium text-[15px] text-[#18181b] group-hover/item:text-[#9333ea] transition-colors leading-snug">
                      {sub.title}
                    </div>
                    {sub.desc && (
                      <div className="text-[12px] text-stone-500 font-sans mt-0.5 leading-snug line-clamp-1">
                        {sub.desc}
                      </div>
                    )}
                  </div>
                  <span className="card-nav-dropdown-arrow" aria-hidden="true">
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={15}
                      className="card-nav__arrow-icon card-nav__arrow-icon--out text-[#9333ea]"
                    />
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={15}
                      className="card-nav__arrow-icon card-nav__arrow-icon--in text-[#9333ea]"
                    />
                  </span>
                </Link>
              ))}

              {/* CardNav dropdown bottom explore bar */}
              <div className="pt-1.5 border-t border-[#E8E2F2]/70 mt-1">
                <Link
                  href={item.href}
                  onClick={() => setActiveDropdown(null)}
                  className="group/all flex items-center justify-between px-3 py-1.5 text-xs font-[family-name:var(--font-oswald)] text-[#9333ea] hover:text-[#7e22ce] tracking-wider uppercase font-semibold transition-colors rounded-lg hover:bg-[#F5EBFF]/60"
                >
                  <span>Explore All {item.label}</span>
                  <span className="text-sm transition-transform duration-200 group-hover/all:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        ) : undefined,
      };
    });
  }, [desktopNavItems, activeDropdown]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "border-b border-[#E8E2F2] shadow-sm bg-white/90 backdrop-blur-md"
            : "border-b border-[#E8E2F2]/60 bg-white/60 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-[72px] sm:h-[80px]">
            {/* 1. Left Side: Brand Logo */}
            <Link
              href="/screens/home"
              className="flex items-center group select-none cursor-pointer py-1.5"
              aria-label="Venom Tech IT Solution Home"
            >
              <Image
                src="/images/logo.png"
                alt="Venom Tech IT Solution"
                width={190}
                height={46}
                priority
                className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />
            </Link>

            {/* 2. Center: Desktop Gooey Navigation with WebGL Droplets */}
            <div className="hidden lg:flex items-center justify-center">
              <GooeyNav
                items={gooeyItems}
                activeIndex={activeNavIndex}
                theme="light"
                color="#9333ea"
                activeTextColor="#ffffff"
                colors={["#C07DFF", "#3BC8F6", "#9333ea", "#A855F7"]}
                size="md"
                frame={true}
                particleCount={15}
                spread={54}
                animationTime={580}
                timeVariance={250}
                gooeyness={0.5}
                wobble={0.48}
                hoverEffect={true}
                onChange={(idx, itm) => {
                  if (itm.href) handleNavClick(itm.href);
                }}
              />
            </div>

            {/* 3. Right Side: Search Icon + CTA Button + Mobile Toggle */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Search Icon Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#000000] hover:text-[#C07DFF] transition-colors duration-200 focus:outline-none"
                aria-label="Open search dialog"
                title="Search (Esc to close)"
              >
                <svg
                  className="w-5 h-5 sm:w-[21px] sm:h-[21px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
                </svg>
              </button>

              {/* Action Buttons: Get Bytely + Contact Us with StarBorder Animation */}
              <div className="hidden sm:flex items-center gap-2 sm:gap-2.5">
                <StarBorder
                  as="link"
                  href="https://bytely.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="#3BC8F6"
                  trailColor="#C07DFF"
                  stars={1}
                  glow={0.7}
                  sparkle
                  radius={10}
                  backgroundColor="#8B5CF6"
                  textColor="#ffffff"
                  className="px-4 py-2 font-[family-name:var(--font-oswald)] uppercase font-semibold text-xs tracking-wider transition-all shadow-sm hover:shadow"
                >
                  Get Bytely
                </StarBorder>
                <StarBorder
                  as="link"
                  href="/screens/contactus"
                  color="#ffffff"
                  trailColor="#3BC8F6"
                  stars={1}
                  glow={0.7}
                  sparkle
                  radius={10}
                  backgroundColor="#9333ea"
                  textColor="#ffffff"
                  className="px-4 py-2 font-[family-name:var(--font-oswald)] uppercase font-semibold text-xs tracking-wider transition-all shadow-sm hover:shadow"
                >
                  Contact Us
                </StarBorder>
              </div>

              {/* Hamburger Button for Mobile / Tablet */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-[#000000] hover:text-[#C07DFF] transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                  <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                  <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Interactive Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateSection={(target) => handleNavClick(target)}
      />

      {/* Responsive Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        navItems={NAV_ITEMS}
        onNavigate={(target) => handleNavClick(target)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
}


