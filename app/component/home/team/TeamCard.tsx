"use client";

import React from "react";
import Image from "next/image";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import { TeamMember } from "@/lib/team/types";

interface TeamCardProps {
  member: TeamMember;
  className?: string;
}

export default function TeamCard({ member, className = "" }: TeamCardProps) {
  const avatarBg = member.avatarBg || "from-stone-900 to-black";
  const initials = member.initials || member.name.split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <div
      className={`group bg-white border border-stone-200 hover:border-black transition-all duration-300 p-6 flex flex-col justify-between shadow-sm relative ${className}`}
    >
      <div>
        {/* Member Portrait Frame */}
        <div
          className={`w-full aspect-square bg-gradient-to-br ${avatarBg} p-5 flex flex-col justify-between mb-6 relative overflow-hidden rounded-sm`}
        >
          {/* Top Bar: Brand tag & Badge */}
          <div className="flex items-center justify-between text-xs font-mono text-stone-400 relative z-10">
            <span className="text-[#C07DFF] font-semibold tracking-wider">
              {member.brandLabel || "CREAT"}
            </span>
            <span className="tracking-widest uppercase text-[11px]">
              {member.badge || "PARTNER"}
            </span>
          </div>

          {/* Center Portrait / Avatar */}
          <div className="self-center my-auto relative z-10">
            {member.image ? (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-stone-700 bg-stone-900 overflow-hidden relative shadow-xl group-hover:scale-105 group-hover:border-[#C07DFF]/70 transition-all duration-300">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 96px, 112px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full border border-stone-700 bg-stone-800 flex items-center justify-center font-[family-name:var(--font-oswald)] font-extrabold text-3xl text-white group-hover:scale-105 group-hover:border-[#C07DFF] transition-all duration-300 shadow-lg">
                {initials}
              </div>
            )}
          </div>

          {/* Bottom Bar inside frame: Studio Role & Asterisk */}
          <div className="flex items-center justify-between text-stone-400 text-xs relative z-10">
            <span className="uppercase tracking-widest text-[10px] font-mono">
              {member.studioRole || "STUDIO LEAD"}
            </span>
            <AsteriskIcon
              className="w-4 h-4 text-stone-500 group-hover:text-[#C07DFF] group-hover:rotate-90 transition-all duration-500"
              color="currentColor"
              strokeWidth={3}
            />
          </div>
        </div>

        {/* Member Name */}
        <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl text-[#111111] group-hover:text-[#C07DFF] transition-colors leading-tight">
          {member.name}
        </h3>

        {/* Member Role / Title */}
        <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[#C07DFF] mt-1.5 line-clamp-1">
          {member.role}
        </p>
      </div>

      {/* Specialty & Action Arrow */}
      <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-sans text-stone-500">
        <span className="line-clamp-1">{member.specialty}</span>
        <span className="group-hover:translate-x-1 transition-transform text-[#C07DFF] font-bold text-sm">
          &rarr;
        </span>
      </div>
    </div>
  );
}
