"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AsteriskIcon from "./AsteriskIcon";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

interface NavSubItem {
  title: string;
  href: string;
  desc?: string;
}

interface NavItem {
  id: string;
  label: string;
  href?: string;
  hasDropdown: boolean;
  subItems?: NavSubItem[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  navItems: NavItem[];
  onNavigate: (sectionId: string) => void;
  onOpenSearch: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  activeSection,
  navItems,
  onNavigate,
  onOpenSearch,
}: MobileMenuProps) {
  const router = useRouter();
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setExpandedDropdown((prev) => (prev === id ? null : id));
  };

  const handleLinkClick = (sectionId: string) => {
    onNavigate(sectionId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="fixed inset-0 z-50 lg:hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-gradient-to-b from-white via-[#F5EBFF] to-[#E8F9FF] border-l border-[#E8E2F2] shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 overflow-hidden">
        {/* Top Header inside Drawer */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E2F2] bg-white/70">
          <div className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Venom Tech IT Solution"
              width={160}
              height={38}
              className="h-8 w-auto object-contain"
            />
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-700 hover:text-[#C07DFF] hover:bg-white/80 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quick Search Bar inside Mobile Drawer */}
        <div className="p-5 border-b border-[#E8E2F2] bg-white/50">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-[#E8E2F2] text-stone-600 text-sm hover:border-[#C07DFF] transition-colors"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" strokeWidth="2" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>Search site...</span>
            </span>
            <kbd className="text-[10px] bg-stone-100 border border-stone-200 px-1.5 py-0.5 text-stone-600 font-mono">
              /
            </kbd>
          </button>
        </div>

        {/* Navigation Links list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#E8E2F2]" data-lenis-prevent>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const isExpanded = expandedDropdown === item.id;

            return (
              <div key={item.id} className="py-2.5">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleLinkClick(item.href || item.id)}
                    className={`font-[family-name:var(--font-oswald)] text-xl font-medium tracking-tight text-left transition-colors flex items-center gap-2 ${
                      isActive ? "text-[#C07DFF]" : "text-[#000000] hover:text-[#C07DFF]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C07DFF]" />
                    )}
                  </button>

                  {item.hasDropdown && (
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className="p-2 text-stone-500 hover:text-[#C07DFF] transition-transform duration-200"
                      aria-label={`Toggle ${item.label} submenu`}
                    >
                      <span
                        className={`inline-block font-sans text-lg font-light transition-transform duration-200 ${
                          isExpanded ? "rotate-45 text-[#C07DFF]" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                  )}
                </div>

                {/* Submenu Accordion with CardNav Animation */}
                {item.hasDropdown && isExpanded && item.subItems && (
                  <div className="mt-2.5 ml-1 space-y-1.5 py-1">
                    {item.subItems.map((sub, idx) => (
                      <button
                        key={sub.title}
                        onClick={() => {
                          onClose();
                          router.push(sub.href);
                        }}
                        style={{
                          animationDelay: `${idx * 40}ms`,
                        }}
                        className="card-nav-dropdown-item card-nav-enter group/item w-full text-left"
                      >
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="font-[family-name:var(--font-oswald)] font-medium text-[15px] text-[#18181b] group-hover/item:text-[#9333ea] transition-colors leading-snug">
                            {sub.title}
                          </div>
                          {sub.desc && (
                            <div className="text-[11.5px] text-stone-500 font-sans mt-0.5 line-clamp-1">
                              {sub.desc}
                            </div>
                          )}
                        </div>
                        <span className="card-nav-dropdown-arrow" aria-hidden="true">
                          <HugeiconsIcon
                            icon={ArrowUpRight01Icon}
                            size={14}
                            className="card-nav__arrow-icon card-nav__arrow-icon--out text-[#9333ea]"
                          />
                          <HugeiconsIcon
                            icon={ArrowUpRight01Icon}
                            size={14}
                            className="card-nav__arrow-icon card-nav__arrow-icon--in text-[#9333ea]"
                          />
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-6 border-t border-[#E8E2F2] bg-white/60 space-y-4">
          <button
            onClick={() => handleLinkClick("contact")}
            className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white px-5 py-3.5 transition-all font-[family-name:var(--font-oswald)] font-semibold tracking-wider text-base uppercase shadow-md shadow-[#C07DFF]/25 hover:opacity-95"
          >
            <span>Ready to Create?</span>
            <AsteriskIcon className="w-4 h-4 text-white" color="#FFFFFF" strokeWidth={3.4} />
          </button>

          <div className="flex items-center justify-between text-xs text-stone-500 font-sans pt-1">
            <span>hello@creat-agency.com</span>
            <span>+1 (800) 273-2883</span>
          </div>
        </div>
      </div>
    </div>
  );
}

