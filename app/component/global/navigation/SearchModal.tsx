"use client";

import React, { useEffect, useRef } from "react";
import AsteriskIcon from "./AsteriskIcon";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

const QUICK_LINKS = [
  { label: "Home Overview", section: "/screens/home", category: "Navigation" },
  { label: "About Venom Tech", section: "/screens/aboutus", category: "Company" },
  { label: "Digital Strategy & Services", section: "/screens/services", category: "Services" },
  { label: "AI Automation Services", section: "/screens/services/ai-automation", category: "Services" },
  { label: "Mobile App Development Services", section: "/screens/services/app-development", category: "Services" },
  { label: "Graphic Designing Services", section: "/screens/services/graphic-designing", category: "Services" },
  { label: "Search Engine Optimization (SEO)", section: "/screens/services/seo", category: "Services" },
  { label: "Advertising Agency Services", section: "/screens/services/advertising-agency", category: "Services" },
  { label: "Smart BPO & Outsourcing Services", section: "/screens/services/bpo-services", category: "Services" },
  { label: "Creative Portfolio & Projects", section: "/screens/portfolio", category: "Work" },
  { label: "Agency Capabilities & Pages", section: "/screens/pages", category: "Explore" },
  { label: "Careers - Join Our Team", section: "/screens/careers", category: "Company" },
  { label: "Blogs & Articles", section: "/screens/blogs", category: "Editorial" },
  { label: "Single Blog Story", section: "/screens/singleblog", category: "Editorial" },
  { label: "Get in Touch / Contact Us", section: "/screens/contactus", category: "Inquiries" },
];

export default function SearchModal({
  isOpen,
  onClose,
  onNavigateSection,
}: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleClose = React.useCallback(() => {
    setSearchTerm("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const filteredLinks = QUICK_LINKS.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (section: string) => {
    handleClose();
    if (onNavigateSection) {
      onNavigateSection(section);
    } else {
      const el = document.getElementById(section);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search site"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6 transition-all duration-300"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-white via-[#F5EBFF] to-[#E8F9FF] border border-[#E8E2F2] shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Search Input */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E8E2F2] bg-white/80">
          <svg
            className="w-5 h-5 text-[#C07DFF] flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.2"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search pages, services, case studies..."
            className="flex-1 bg-transparent text-[#000000] placeholder-stone-400 font-sans text-base focus:outline-none"
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-xs uppercase tracking-wider text-stone-500 hover:text-black font-semibold px-2 py-1"
            >
              Clear
            </button>
          )}

          <button
            onClick={handleClose}
            className="p-1.5 text-stone-600 hover:text-[#C07DFF] hover:bg-white/80 transition-colors"
            aria-label="Close search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Results / Quick Links */}
        <div className="p-6 max-h-[60vh] overflow-y-auto" data-lenis-prevent>
          <div className="flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-stone-500 mb-3">
            <span>{searchTerm ? "Search Results" : "Quick Navigation"}</span>
            <span className="flex items-center gap-1 text-[#C07DFF]">
              <AsteriskIcon className="w-3.5 h-3.5" color="#C07DFF" strokeWidth={3} />
              Single Page Links
            </span>
          </div>

          <div className="space-y-1">
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link) => (
                <button
                  key={link.section}
                  onClick={() => handleSelect(link.section)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/70 transition-colors group rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C07DFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="font-[family-name:var(--font-oswald)] font-medium text-lg text-[#000000] group-hover:text-[#C07DFF] transition-colors">
                      {link.label}
                    </span>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-stone-500 border border-[#E8E2F2] px-2 py-0.5 group-hover:border-[#C07DFF] group-hover:text-[#C07DFF] transition-colors bg-white/60">
                    {link.category}
                  </span>
                </button>
              ))
            ) : (
              <div className="py-8 text-center text-stone-500 font-sans">
                No matching results found for &ldquo;{searchTerm}&rdquo;
              </div>
            )}
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 text-stone-800 font-mono text-[11px]">ESC</kbd> to exit</span>
          <span className="font-[family-name:var(--font-oswald)] tracking-wider uppercase text-[#111111] font-medium">Venom Tech Search</span>
        </div>
      </div>
    </div>
  );
}

