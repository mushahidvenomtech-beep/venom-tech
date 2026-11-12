"use client";

import React, { useState, useEffect, useCallback } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import TeamCard from "./TeamCard";
import { TeamMember } from "@/lib/team/types";

const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: "team-alex-rivera",
    name: "Alex Rivera",
    role: "Founding Partner & Creative Director",
    badge: "PARTNER",
    brandLabel: "CREAT",
    studioRole: "STUDIO LEAD",
    specialty: "Brand Systems & Art Direction",
    avatarBg: "from-stone-900 to-black",
    image: "/images/team/alex-rivera.webp",
    initials: "AR",
    socialLinks: { linkedin: "https://linkedin.com", twitter: "https://twitter.com" },
    displayOrder: 1,
    isActive: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "team-maya-chen",
    name: "Maya Chen",
    role: "Principal Product Architect",
    badge: "PARTNER",
    brandLabel: "CREAT",
    studioRole: "STUDIO LEAD",
    specialty: "Design Systems & UI/UX",
    avatarBg: "from-neutral-900 to-stone-900",
    image: "/images/team/maya-chen.webp",
    initials: "MC",
    socialLinks: { linkedin: "https://linkedin.com", github: "https://github.com" },
    displayOrder: 2,
    isActive: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "team-liam-oconnor",
    name: "Liam O'Connor",
    role: "Head of Creative Technology",
    badge: "PARTNER",
    brandLabel: "CREAT",
    studioRole: "STUDIO LEAD",
    specialty: "Full-Stack Web & Next.js",
    avatarBg: "from-stone-950 to-neutral-900",
    image: "/images/team/liam-oconnor.webp",
    initials: "LO",
    socialLinks: { linkedin: "https://linkedin.com", github: "https://github.com" },
    displayOrder: 3,
    isActive: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "team-sofia-rossi",
    name: "Sofia Rossi",
    role: "Lead 3D & Motion Artist",
    badge: "PARTNER",
    brandLabel: "CREAT",
    studioRole: "STUDIO LEAD",
    specialty: "Kinetic Visuals & Spatial Canvas",
    avatarBg: "from-black to-stone-900",
    image: "/images/team/sofia-rossi.webp",
    initials: "SR",
    socialLinks: { linkedin: "https://linkedin.com", portfolio: "https://sofia.art" },
    displayOrder: 4,
    isActive: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);

  const fetchMembers = useCallback(async () => {
    try {
      const res = await fetch("/api/team/members?active=true");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.members) && data.members.length > 0) {
          setMembers(data.members);
        }
      }
    } catch (err) {
      // Fallback data maintained
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return (
    <section
      id="team"
      className="py-10 sm:py-14 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto border-b border-[#E8E2F2]"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <AsteriskIcon className="w-3.5 h-3.5 text-[#C07DFF]" color="#C07DFF" strokeWidth={3} />
          <span className="font-[family-name:var(--font-oswald)] uppercase text-xs tracking-widest text-[#C07DFF] font-semibold">
            Our Senior Collective
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-[44px] sm:text-[44px] text-[#111111] tracking-tight leading-[1.08] mb-4">
          The Minds <span className="text-[#C07DFF]">Behind The Magic.</span>
        </h2>
        <p className="font-sans text-stone-600 text-base sm:text-lg">
          Direct partner involvement on every engagement. No junior delegates, just senior craft and strategic firepower.
        </p>
      </div>

      {/* Dynamic Team Member Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}
