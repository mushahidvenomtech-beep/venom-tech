"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import { TeamMember } from "@/lib/team/types";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";

interface TeamMembersListProps {
  onAddNew: () => void;
  onEdit: (member: TeamMember) => void;
}

export default function TeamMembersList({ onAddNew, onEdit }: TeamMembersListProps) {
  const { isDark } = useDashboardTheme();

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Fetch all members
  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/team/members", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.members)) {
          setMembers(data.members);
        }
      }
    } catch (err) {
      console.error("Failed to load team members:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Show transient notification
  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3500);
  };

  // Toggle active status
  const handleToggleActive = async (member: TeamMember) => {
    try {
      const res = await fetch(`/api/team/members/${member.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !member.isActive }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMembers((prev) =>
          prev.map((m) => (m.id === member.id ? { ...m, isActive: !member.isActive } : m))
        );
        showNotification(`${member.name} is now ${!member.isActive ? "active" : "hidden"}`);
      } else {
        throw new Error(data.error || "Failed to update status");
      }
    } catch (err: any) {
      showNotification(err.message || "Failed to update status", "error");
    }
  };

  // Confirm delete
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/team/members/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMembers((prev) => prev.filter((m) => m.id !== deleteTarget.id));
        showNotification(`${deleteTarget.name} removed successfully.`);
      } else {
        throw new Error(data.error || "Failed to delete team member");
      }
    } catch (err: any) {
      showNotification(err.message || "Delete failed", "error");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  // Filter members
  const filtered = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (statusFilter === "active") return m.isActive;
    if (statusFilter === "inactive") return !m.isActive;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-sm flex items-center gap-2 border transition-all ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
              : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
          }`}
        >
          <AsteriskIcon className="w-4 h-4" color="currentColor" strokeWidth={3} />
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Top Controls Bar */}
      <div
        className={`p-5 rounded-2xl border shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 ${
          isDark ? "bg-slate-900/80 border-white/10" : "bg-white border-stone-200"
        }`}
      >
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <svg
              className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team members by name, role, or focus..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 dark:border-white/10 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-[#C07DFF]"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-white/5 rounded-xl border border-stone-200 dark:border-white/10">
            {(["all", "active", "inactive"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-[family-name:var(--font-oswald)] uppercase font-semibold tracking-wider transition-all ${
                  statusFilter === tab
                    ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                    : "text-stone-500 hover:text-stone-900 dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button: Add Member */}
        <button
          type="button"
          onClick={onAddNew}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider hover:bg-gradient-to-r hover:from-[#C07DFF] hover:to-[#3BC8F6] hover:text-white dark:hover:text-white transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <AsteriskIcon className="w-3.5 h-3.5" color="currentColor" strokeWidth={3} />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Team Members List / Table */}
      {isLoading ? (
        <div className="py-20 text-center">
          <AsteriskIcon className="w-8 h-8 mx-auto text-[#C07DFF] animate-spin mb-3" color="#C07DFF" strokeWidth={2.5} />
          <p className="font-[family-name:var(--font-oswald)] uppercase text-sm tracking-wider text-stone-500">
            Loading Team Members From Database...
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div
          className={`py-16 text-center rounded-2xl border border-dashed ${
            isDark ? "border-white/10 bg-slate-900/40" : "border-stone-300 bg-stone-50/50"
          }`}
        >
          <AsteriskIcon className="w-10 h-10 mx-auto text-stone-300 dark:text-stone-700 mb-3" color="currentColor" strokeWidth={2} />
          <h4 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-lg text-stone-700 dark:text-stone-300">
            No Team Members Found
          </h4>
          <p className="font-sans text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-4">
            {searchQuery
              ? "No team members matched your search criteria."
              : "Get started by adding your first senior collective partner or team lead."}
          </p>
          <button
            type="button"
            onClick={onAddNew}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider hover:opacity-90 transition-opacity"
          >
            <span>+ Add New Member</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((member) => (
            <div
              key={member.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 relative group shadow-sm ${
                isDark
                  ? "bg-slate-900/80 border-white/10 hover:border-[#C07DFF]/50"
                  : "bg-white border-stone-200 hover:border-black"
              }`}
            >
              <div>
                {/* Member Image & Badge Top */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    {member.image ? (
                      <div className="w-14 h-14 rounded-full border border-stone-700 overflow-hidden relative shadow-md">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-14 h-14 rounded-full border border-stone-700 bg-gradient-to-br ${
                          member.avatarBg || "from-stone-900 to-black"
                        } flex items-center justify-center font-[family-name:var(--font-oswald)] font-extrabold text-xl text-white`}
                      >
                        {member.initials || "VT"}
                      </div>
                    )}
                    <span
                      className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 ${
                        isDark ? "border-slate-900" : "border-white"
                      } ${member.isActive ? "bg-emerald-500" : "bg-stone-400"}`}
                      title={member.isActive ? "Active" : "Hidden"}
                    />
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-stone-100 dark:bg-white/10 text-stone-600 dark:text-stone-300 uppercase tracking-wider font-semibold">
                      {member.badge || "PARTNER"}
                    </span>
                    <span className="font-mono text-[10px] text-stone-400">
                      Order #{member.displayOrder}
                    </span>
                  </div>
                </div>

                {/* Name & Role */}
                <h4 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-lg text-stone-900 dark:text-white leading-tight">
                  {member.name}
                </h4>
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[#C07DFF] mt-1 line-clamp-1">
                  {member.role}
                </p>

                {/* Specialty */}
                <div className="mt-3 pt-3 border-t border-stone-100 dark:border-white/10">
                  <span className="text-[11px] font-sans text-stone-500 line-clamp-1">
                    {member.specialty}
                  </span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 mt-4 border-t border-stone-100 dark:border-white/10 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleActive(member)}
                  className={`text-[11px] font-[family-name:var(--font-oswald)] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                    member.isActive
                      ? "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                      : "text-stone-500 hover:bg-stone-100 dark:hover:bg-white/10"
                  }`}
                >
                  {member.isActive ? "Active" : "Hidden"}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onEdit(member)}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-black dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
                    title="Edit Member"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteTarget(member)}
                    className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    title="Delete Member"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl ${
              isDark ? "bg-slate-900 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"
            }`}
          >
            <h4 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-xl text-red-600 dark:text-red-400 mb-2">
              Confirm Delete Member
            </h4>
            <p className="font-sans text-sm text-stone-600 dark:text-stone-300 mb-6">
              Are you sure you want to delete <span className="font-bold">{deleteTarget.name}</span>? This action will permanently remove this team member from the database.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl border border-stone-300 dark:border-white/20 text-xs font-[family-name:var(--font-oswald)] uppercase font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-[family-name:var(--font-oswald)] uppercase font-semibold tracking-wider transition-colors"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
