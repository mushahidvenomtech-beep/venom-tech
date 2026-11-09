"use client";

import React, { useState, useEffect, useCallback } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import { TeamMember } from "@/lib/team/types";

const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: "team-alex-rivera",
    name: "Alex Rivera",
    role: "Founding Partner & Creative Director",
    badge: "Partner / Founder",
    brandLabel: "CREAT",
    studioRole: "Verified Lead",
    specialty: "Pioneering visual languages and design systems for enterprise flagships.",
    avatarBg: "from-stone-800 to-black",
    image: "/images/team/alex-rivera.jpg",
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
    badge: "Principal Architect",
    brandLabel: "CREAT",
    studioRole: "Verified Lead",
    specialty: "Translating human behavioral psychology into seamless product interfaces.",
    avatarBg: "from-neutral-800 to-stone-900",
    image: "/images/team/maya-chen.jpg",
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
    badge: "Tech Director",
    brandLabel: "CREAT",
    studioRole: "Verified Lead",
    specialty: "Architecting blazing-fast Next.js engines, headless APIs, and fluid physics.",
    avatarBg: "from-stone-900 to-neutral-950",
    image: "/images/team/liam-oconnor.jpg",
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
    badge: "Strategy Lead",
    brandLabel: "CREAT",
    studioRole: "Verified Lead",
    specialty: "Aligning cultural resonance and brand defensibility across global markets.",
    avatarBg: "from-neutral-900 to-black",
    image: "/images/team/sofia-rossi.jpg",
    initials: "SR",
    socialLinks: { linkedin: "https://linkedin.com", portfolio: "https://sofia.art" },
    displayOrder: 4,
    isActive: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

function TeamMemberAvatar({
  image,
  name,
  initials,
}: {
  image?: string;
  name: string;
  initials: string;
}) {
  const [imgError, setImgError] = useState(false);

  if (image && !imgError) {
    return (
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-stone-700 bg-stone-900 overflow-hidden relative shadow-xl group-hover:scale-105 group-hover:border-[#C07DFF]/70 transition-all duration-300">
        <img
          src={image}
          alt={name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="w-20 h-20 rounded-full border border-stone-600 bg-stone-800/80 flex items-center justify-center font-[family-name:var(--font-oswald)] font-extrabold text-3xl text-white group-hover:scale-105 transition-transform duration-300 shadow-lg">
      {initials}
    </div>
  );
}

export default function AboutTeamSection() {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);

  const fetchMembers = useCallback(async () => {
    try {
      const res = await fetch("/api/team/members?active=true", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.members) && data.members.length > 0) {
          setMembers(data.members);
        }
      }
    } catch (err) {
      // Fallback data maintained gracefully
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
      <div className="text-center max-w-3xl mx-auto mb-16">
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
          Meet the practitioners who bring radical vision, technical rigor, and relentless passion to every collaboration.
        </p>
      </div>

      {/* Dynamic Team Member Cards Grid from Database */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((member) => {
          const avatarBg = member.avatarBg || "from-stone-800 to-black";
          const initials =
            member.initials ||
            member.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase();
          const tag = member.badge || "Partner / Founder";
          const brand = member.brandLabel || "CREAT";
          const studioRole = member.studioRole || "Verified Lead";
          const specialty = member.specialty || "Senior collective specialist";

          const twitterUrl = member.socialLinks?.twitter;
          const linkedinUrl = member.socialLinks?.linkedin;
          const portfolioUrl =
            member.socialLinks?.portfolio || member.socialLinks?.github;

          return (
            <div
              key={member.id}
              className="group bg-white border border-stone-200 hover:border-black transition-all duration-300 p-6 flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Member Visual Frame */}
                <div
                  className={`w-full aspect-[4/5] bg-gradient-to-br ${avatarBg} p-4 flex flex-col justify-between mb-6 relative overflow-hidden rounded-sm`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-stone-400 relative z-10">
                    <span className="text-[#C07DFF] font-semibold">{brand}</span>
                    <span className="tracking-wider uppercase text-[11px]">{tag}</span>
                  </div>

                  <div className="self-center my-auto relative z-10">
                    <TeamMemberAvatar
                      image={member.image}
                      name={member.name}
                      initials={initials}
                    />
                  </div>

                  <div className="flex items-center justify-between text-stone-400 text-xs relative z-10">
                    <span className="uppercase tracking-widest text-[10px] font-mono">
                      {studioRole}
                    </span>
                    <AsteriskIcon
                      className="w-4 h-4 text-stone-400 group-hover:text-[#C07DFF] group-hover:rotate-90 transition-all duration-500"
                      color="currentColor"
                      strokeWidth={3}
                    />
                  </div>
                </div>

                <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl text-[#111111] group-hover:text-[#C07DFF] transition-colors leading-tight">
                  {member.name}
                </h3>
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[#C07DFF] mt-1 mb-3">
                  {member.role}
                </p>
                <p className="font-sans text-stone-600 text-xs leading-relaxed min-h-[36px]">
                  {specialty}
                </p>
              </div>

              {/* Social Links Row */}
              <div className="pt-4 mt-6 border-t border-stone-100 flex items-center gap-3 text-stone-400">
                <span className="text-xs uppercase font-[family-name:var(--font-oswald)] tracking-wider text-stone-500 font-semibold mr-auto">
                  Connect:
                </span>
                {twitterUrl ? (
                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C07DFF] transition-colors text-xs font-bold font-mono"
                  >
                    TW
                  </a>
                ) : (
                  <span className="text-xs font-bold font-mono text-stone-400 hover:text-[#C07DFF] cursor-pointer">
                    TW
                  </span>
                )}

                {linkedinUrl ? (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C07DFF] transition-colors text-xs font-bold font-mono"
                  >
                    LI
                  </a>
                ) : (
                  <span className="text-xs font-bold font-mono text-stone-400 hover:text-[#C07DFF] cursor-pointer">
                    LI
                  </span>
                )}

                {portfolioUrl ? (
                  <a
                    href={portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C07DFF] transition-colors text-xs font-bold font-mono"
                  >
                    DR
                  </a>
                ) : (
                  <span className="text-xs font-bold font-mono text-stone-400 hover:text-[#C07DFF] cursor-pointer">
                    DR
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

