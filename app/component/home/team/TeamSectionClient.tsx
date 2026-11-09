"use client";

import React, { useState, useEffect } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import TeamCard from "./TeamCard";
import { TeamMember } from "@/lib/team/types";

interface TeamSectionClientProps {
  initialMembers: TeamMember[];
}

export default function TeamSectionClient({ initialMembers }: TeamSectionClientProps) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);

  // Optionally refresh active members on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchLatest() {
      try {
        const res = await fetch("/api/team/members?active=true", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.members) && data.members.length > 0 && isMounted) {
            setMembers(data.members);
          }
        }
      } catch (err) {
        // Keep initialMembers on network error
      }
    }
    fetchLatest();
    return () => {
      isMounted = false;
    };
  }, []);

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
        <h2 className="font-[family-name:var(--font-oswald)] uppercase font-extrabold text-4xl sm:text-6xl text-[#111111] tracking-tight mb-4">
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
