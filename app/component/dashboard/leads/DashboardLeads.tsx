"use client";

import React, { useState, useEffect, useCallback } from "react";
import AsteriskIcon from "@/app/component/global/navigation/AsteriskIcon";
import SwipeToast from "@/app/component/global/ui/SwipeToast";
import { Lead, LeadStatus } from "@/lib/leads/types";
import { formatIsoDateUTC } from "@/lib/jobs/types";
import { useDashboardTheme } from "@/app/component/dashboard/context/DashboardThemeContext";

const LEAD_SERVICE_OPTIONS = [
  "AI Automation",
  "App Development",
  "Web Development",
  "Graphic Design & UI/UX",
  "SEO Services",
  "Advertising Agency",
  "BPO Services",
  "E-Commerce",
  "API Development",
  "General Inquiry",
];

export default function DashboardLeads() {
  const { isDark } = useDashboardTheme();

  // Database-driven state: NO dummy data
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [toast, setToast] = useState<{ open: boolean; title: string; desc: string; isError?: boolean }>({
    open: false,
    title: "",
    desc: "",
  });
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Add / Edit Lead Modal state
  const [formOpen, setFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formStatus, setFormStatus] = useState<LeadStatus>("New");
  const [formServices, setFormServices] = useState<string[]>(["Web Development"]);
  const [formMessage, setFormMessage] = useState("");
  const [isSavingForm, setIsSavingForm] = useState(false);
  const [formError, setFormError] = useState("");

  // Fetch real leads from API
  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/leads", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.leads)) {
          setLeads(data.leads);
        }
      }
    } catch (err) {
      console.error("Failed to load leads from database:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setFeedback({ message, type });
    setToast({
      open: true,
      title: type === "error" ? "Lead Action Failed" : "Lead Synchronized",
      desc: message,
      isError: type === "error",
    });
    setTimeout(() => setFeedback(null), 3500);
  };

  const openAddLeadModal = () => {
    setEditingLead(null);
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setFormCompany("");
    setFormStatus("New");
    setFormServices(["Web Development"]);
    setFormMessage("");
    setFormError("");
    setFormOpen(true);
  };

  const openEditLeadModal = (lead: Lead) => {
    setEditingLead(lead);
    setFormName(lead.name);
    setFormEmail(lead.email);
    setFormPhone(lead.phone || "");
    setFormCompany(lead.company || "");
    setFormStatus(lead.status);
    setFormServices(lead.services.length > 0 ? lead.services : ["General Inquiry"]);
    setFormMessage(lead.message || "");
    setFormError("");
    setSelectedLead(null);
    setFormOpen(true);
  };

  const toggleFormService = (svc: string) => {
    setFormServices((prev) =>
      prev.includes(svc) ? prev.filter((item) => item !== svc) : [...prev, svc]
    );
  };

  const handleSaveLeadForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!formName.trim() || !formEmail.trim()) {
      setFormError("Client Name and Email are required.");
      return;
    }

    setIsSavingForm(true);
    try {
      const payload = {
        name: formName.trim(),
        email: formEmail.trim(),
        phone: formPhone.trim(),
        company: formCompany.trim(),
        status: formStatus,
        services: formServices.length > 0 ? formServices : ["General Inquiry"],
        message: formMessage.trim(),
        source: editingLead?.source || "dashboard_manual",
      };

      const res = await fetch(
        editingLead ? `/api/leads/${editingLead.id}` : "/api/leads",
        {
          method: editingLead ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save lead");
      }

      if (editingLead) {
        setLeads((prev) => prev.map((l) => (l.id === editingLead.id ? data.lead : l)));
        showNotification(`Lead "${data.lead.name}" updated.`);
      } else {
        setLeads((prev) => [data.lead, ...prev]);
        showNotification(`New lead "${data.lead.name}" added to MySQL database.`);
      }
      setFormOpen(false);
    } catch (err: any) {
      setFormError(err.message || "Error saving lead");
    } finally {
      setIsSavingForm(false);
    }
  };

  // Status Change via API
  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        showNotification(`Lead status updated to "${newStatus}"`);
      } else {
        throw new Error(data.error || "Failed to update status");
      }
    } catch (err: any) {
      showNotification(err.message || "Failed to update lead status", "error");
    }
  };

  // Delete Lead
  const handleDeleteLead = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/leads/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== deleteTarget.id));
        if (selectedLead && selectedLead.id === deleteTarget.id) {
          setSelectedLead(null);
        }
        showNotification(`Lead "${deleteTarget.name}" deleted.`);
      } else {
        throw new Error(data.error || "Failed to delete lead");
      }
    } catch (err: any) {
      showNotification(err.message || "Delete failed", "error");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  // Filter Leads
  const filteredLeads = leads.filter((lead) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      lead.name.toLowerCase().includes(s) ||
      lead.email.toLowerCase().includes(s) ||
      lead.company.toLowerCase().includes(s) ||
      lead.services.some((srv) => srv.toLowerCase().includes(s));
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Export to CSV
  const exportCsv = () => {
    if (leads.length === 0) {
      showNotification("No leads available to export.", "error");
      return;
    }
    const headers = "ID,Name,Email,Phone,Company,Services,Status,CreatedAt,Message\n";
    const rows = leads
      .map(
        (l) =>
          `"${l.id}","${l.name}","${l.email}","${l.phone}","${l.company}","${l.services.join("; ")}","${l.status}","${l.createdAt}","${(l.message || "").replace(/"/g, '""')}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `venom_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("Exported leads to CSV file.");
  };

  return (
    <div className="space-y-6">
      {toast.open && (
        <SwipeToast
          open={toast.open}
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          title={toast.title}
          description={toast.desc}
          background={toast.isError ? "#7f1d1d" : "#18181b"}
          fuseColor={toast.isError ? "#f87171" : "#3BC8F6"}
        />
      )}

      {/* Toast Notification */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs font-mono transition-all animate-in fade-in slide-in-from-top duration-300 ${
            feedback.type === "success"
              ? isDark
                ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-300"
                : "bg-emerald-50 border-emerald-300 text-emerald-800"
              : isDark
              ? "bg-red-950/80 border-red-500/30 text-red-300"
              : "bg-red-50 border-red-300 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="hover:opacity-70 text-base leading-none px-2"
          >
            &times;
          </button>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase mb-1">
            <span className="text-stone-400">CONSOLE</span>
            <span className="text-stone-400">&bull;</span>
            <span className="text-[#3BC8F6]">LEADS</span>
            <span className="text-stone-400">&bull;</span>
            <span className="text-[#C07DFF]">REAL-TIME INQUIRIES</span>
          </div>
          <h2
            className={`font-[family-name:var(--font-oswald)] uppercase font-extrabold text-2xl sm:text-3xl tracking-tight ${
              isDark ? "text-white" : "text-[#111111]"
            }`}
          >
            Inbound <span className="text-brand-gradient">Leads Management</span>
          </h2>
          <p className={`font-sans text-xs sm:text-sm ${isDark ? "text-stone-400" : "text-stone-600"}`}>
            Live inquiries submitted via the multi-step contact workflow, backed by MySQL.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={openAddLeadModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider shadow-md hover:opacity-95 transition-all cursor-pointer"
          >
            <span>+ Add Lead</span>
          </button>

          <button
            onClick={fetchLeads}
            disabled={isLoading}
            className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              isDark
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-stone-300"
                : "bg-white hover:bg-stone-50 border-stone-200 text-stone-700 shadow-sm"
            }`}
            title="Refresh Leads from Database"
          >
            <span className={isLoading ? "animate-spin" : ""}>↻</span>
            <span>Refresh</span>
          </button>

          <button
            onClick={exportCsv}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border font-[family-name:var(--font-oswald)] uppercase text-xs font-bold tracking-wider transition-all cursor-pointer ${
              isDark
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                : "bg-white hover:bg-stone-50 border-[#E8E2F2] text-stone-800 shadow-sm"
            }`}
          >
            <svg className="w-4 h-4 text-[#3BC8F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs transition-colors ${
          isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E8E2F2] shadow-sm"
        }`}
      >
        {/* Search Input */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Search leads by name, email, company, service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-[#3BC8F6] transition-colors ${
              isDark
                ? "bg-white/5 border-white/10 text-white placeholder-stone-500"
                : "bg-white border-[#E8E2F2] text-slate-900 placeholder-stone-400 shadow-sm"
            }`}
          />
          <svg className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
          </svg>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {["All", "New", "Contacted", "In Review", "Closed"].map((status) => {
            const count =
              status === "All"
                ? leads.length
                : leads.filter((l) => l.status === status).length;
            const isActive = statusFilter === status;

            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl font-mono text-[11px] transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-bold shadow-sm"
                    : isDark
                    ? "bg-white/5 text-stone-400 hover:text-white hover:bg-white/10"
                    : "bg-stone-100 text-stone-600 hover:text-slate-900 hover:bg-stone-200"
                }`}
              >
                <span>{status}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-black/30 text-white"
                      : isDark
                      ? "bg-white/10 text-stone-400"
                      : "bg-stone-200 text-stone-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Leads Table */}
      <div
        className={`rounded-2xl border overflow-hidden transition-colors ${
          isDark ? "bg-white/[0.03] border-white/10 shadow-xl" : "bg-white border-[#E8E2F2] shadow-sm"
        }`}
      >
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 rounded-lg border border-[#3BC8F6]/30 animate-spin flex items-center justify-center">
              <AsteriskIcon className="w-5 h-5 text-[#3BC8F6]" color="#3BC8F6" strokeWidth={3} />
            </div>
            <p className="text-xs font-mono text-stone-400 uppercase tracking-widest">
              Fetching leads from MySQL database...
            </p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#C07DFF]/10 flex items-center justify-center">
              <AsteriskIcon className="w-6 h-6 text-[#C07DFF]" color="#C07DFF" strokeWidth={2.5} />
            </div>
            <h3
              className={`font-[family-name:var(--font-oswald)] uppercase font-bold text-lg ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              No Leads Found
            </h3>
            <p className="font-sans text-xs text-stone-500 max-w-sm mx-auto">
              {searchTerm || statusFilter !== "All"
                ? "No leads matched your search or status filter."
                : "No inquiries currently recorded in the database. Inquiries submitted via the Contact page will appear here in real time."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs">
              <thead>
                <tr
                  className={`border-b uppercase tracking-wider font-semibold font-[family-name:var(--font-oswald)] text-[11px] ${
                    isDark
                      ? "border-white/10 bg-white/[0.02] text-stone-400"
                      : "border-[#E8E2F2] bg-stone-50/70 text-stone-600"
                  }`}
                >
                  <th className="py-3.5 pl-6">ID &amp; Client</th>
                  <th className="py-3.5">Contact Details</th>
                  <th className="py-3.5">Services Requested</th>
                  <th className="py-3.5">Status</th>
                  <th className="py-3.5">Submission Date</th>
                  <th className="py-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-white/5" : "divide-stone-100"}`}>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className={`transition-colors group ${
                      isDark ? "hover:bg-white/[0.02]" : "hover:bg-purple-50/30"
                    }`}
                  >
                    <td className="py-4 pl-6">
                      <span className="font-mono text-[10px] text-[#C07DFF] block mb-0.5 font-bold">
                        {lead.id}
                      </span>
                      <span
                        className={`font-semibold text-sm transition-colors block ${
                          isDark ? "text-white group-hover:text-[#3BC8F6]" : "text-[#111111] group-hover:text-[#8B5CF6]"
                        }`}
                      >
                        {lead.name}
                      </span>
                      <span className={`text-[11px] ${isDark ? "text-stone-400" : "text-stone-500"}`}>
                        {lead.company || "Independent"}
                      </span>
                    </td>

                    <td className="py-4">
                      <div className={`font-mono text-[11px] font-medium ${isDark ? "text-stone-300" : "text-stone-800"}`}>
                        {lead.email}
                      </div>
                      <div className={`font-mono text-[11px] ${isDark ? "text-stone-500" : "text-stone-400"}`}>
                        {lead.phone || "No phone provided"}
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {lead.services.map((svc) => (
                          <span
                            key={svc}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${
                              isDark
                                ? "bg-white/5 border-white/10 text-[#3BC8F6]"
                                : "bg-cyan-50 border-cyan-200 text-[#0284C7]"
                            }`}
                          >
                            {svc}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border focus:outline-none cursor-pointer ${
                          lead.status === "New"
                            ? isDark
                              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                              : "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : lead.status === "Contacted"
                            ? isDark
                              ? "bg-[#C07DFF]/20 border-[#C07DFF]/40 text-[#C07DFF]"
                              : "bg-[#F4E9FF] border-[#C07DFF]/30 text-[#8B5CF6]"
                            : lead.status === "In Review"
                            ? isDark
                              ? "bg-[#3BC8F6]/20 border-[#3BC8F6]/40 text-[#3BC8F6]"
                              : "bg-cyan-50 border-cyan-200 text-[#0284C7]"
                            : isDark
                            ? "bg-white/5 border-white/10 text-stone-400"
                            : "bg-stone-100 border-stone-200 text-stone-600"
                        }`}
                      >
                        <option value="New" className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}>New</option>
                        <option value="Contacted" className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}>Contacted</option>
                        <option value="In Review" className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}>In Review</option>
                        <option value="Closed" className={isDark ? "bg-slate-900" : "bg-white text-slate-900"}>Closed</option>
                      </select>
                    </td>

                    <td className={`py-4 font-mono text-[11px] ${isDark ? "text-stone-400" : "text-stone-500"}`}>
                      {formatIsoDateUTC(lead.createdAt)}
                    </td>

                    <td className="py-4 pr-6 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openEditLeadModal(lead)}
                        className={`px-2.5 py-1.5 rounded-lg border font-[family-name:var(--font-oswald)] uppercase text-[11px] font-bold tracking-wider transition-all cursor-pointer ${
                          isDark
                            ? "bg-white/5 hover:bg-white/15 border-white/15 text-stone-200"
                            : "bg-stone-50 hover:bg-stone-200 text-stone-700 border-stone-200"
                        }`}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => setSelectedLead(lead)}
                        className={`px-3 py-1.5 rounded-lg border font-[family-name:var(--font-oswald)] uppercase text-[11px] font-bold tracking-wider transition-all cursor-pointer ${
                          isDark
                            ? "bg-gradient-to-r from-[#C07DFF]/20 to-[#3BC8F6]/20 hover:from-[#C07DFF]/40 hover:to-[#3BC8F6]/40 border-[#3BC8F6]/40 text-white"
                            : "bg-[#F4E9FF] hover:bg-[#C07DFF] text-[#8B5CF6] hover:text-white border-[#C07DFF]/40 shadow-sm"
                        }`}
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => setDeleteTarget(lead)}
                        className={`p-1.5 rounded-lg border transition-all text-xs cursor-pointer ${
                          isDark
                            ? "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                            : "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                        }`}
                        title="Delete Lead"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div
            className={`w-full max-w-xl rounded-3xl border p-6 sm:p-8 space-y-6 shadow-2xl relative transition-colors ${
              isDark ? "bg-slate-900 border-white/20 text-white" : "bg-white border-[#E8E2F2] text-slate-900"
            }`}
          >
            <div
              className={`flex items-start justify-between border-b pb-4 ${
                isDark ? "border-white/10" : "border-[#E8E2F2]"
              }`}
            >
              <div>
                <span className="font-mono text-xs text-[#C07DFF] font-bold block">{selectedLead.id}</span>
                <h3
                  className={`font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl ${
                    isDark ? "text-white" : "text-[#111111]"
                  }`}
                >
                  {selectedLead.name}
                </h3>
                <span className="text-xs text-stone-400">{selectedLead.company || "Independent"}</span>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10 border-white/10 text-stone-400 hover:text-white"
                    : "bg-stone-100 hover:bg-stone-200 border-stone-200 text-stone-600"
                }`}
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-stone-50 border-stone-100"}`}>
                  <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1">Email Address</span>
                  <a href={`mailto:${selectedLead.email}`} className="font-mono font-medium text-[#3BC8F6] hover:underline">
                    {selectedLead.email}
                  </a>
                </div>

                <div className={`p-3 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-stone-50 border-stone-100"}`}>
                  <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1">Phone Number</span>
                  <a href={`tel:${selectedLead.phone}`} className="font-mono font-medium hover:underline">
                    {selectedLead.phone || "None"}
                  </a>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-stone-400 uppercase block mb-2">
                  Requested Services ({selectedLead.services.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedLead.services.map((svc) => (
                    <span
                      key={svc}
                      className="px-3 py-1 rounded-lg bg-[#3BC8F6]/15 text-[#3BC8F6] font-[family-name:var(--font-oswald)] uppercase text-xs font-bold border border-[#3BC8F6]/30"
                    >
                      ✓ {svc}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1.5">
                  Project Brief &amp; Scope
                </span>
                <div
                  className={`p-4 rounded-xl border leading-relaxed ${
                    isDark ? "bg-black/30 border-white/10 text-stone-300" : "bg-stone-50 border-stone-200 text-stone-800"
                  }`}
                >
                  {selectedLead.message || "No additional message supplied."}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-stone-400">Current Status:</span>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                    className="px-3 py-1 rounded-lg text-xs font-semibold border cursor-pointer dark:bg-slate-800 dark:border-white/20"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Review">In Review</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openEditLeadModal(selectedLead)}
                    className="px-3 py-1 rounded-lg bg-[#C07DFF]/15 border border-[#C07DFF]/40 text-[#C07DFF] text-xs font-[family-name:var(--font-oswald)] uppercase font-bold cursor-pointer"
                  >
                    Edit Lead
                  </button>
                  <span className="text-[10px] font-mono text-stone-400">
                    Logged: {formatIsoDateUTC(selectedLead.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Lead Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div
            className={`w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 sm:p-8 space-y-5 shadow-2xl ${
              isDark ? "bg-slate-900 border-white/20 text-white" : "bg-white border-[#E8E2F2] text-slate-900"
            }`}
          >
            <div className="flex items-center justify-between border-b pb-4 border-stone-200 dark:border-white/10">
              <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-2xl">
                {editingLead ? `Edit Lead: ${editingLead.name}` : "Add New Inbound Lead"}
              </h3>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer border-stone-300 dark:border-white/15"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSaveLeadForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-[family-name:var(--font-oswald)] uppercase font-bold mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Client Name"
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-300 text-slate-900"
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-[family-name:var(--font-oswald)] uppercase font-bold mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="client@company.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-300 text-slate-900"
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-[family-name:var(--font-oswald)] uppercase font-bold mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+92 300 0000000"
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-300 text-slate-900"
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-[family-name:var(--font-oswald)] uppercase font-bold mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    placeholder="Company / Organization"
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-300 text-slate-900"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-[family-name:var(--font-oswald)] uppercase font-bold mb-1.5">
                  Lead Status
                </label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as LeadStatus)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${
                    isDark ? "bg-slate-800 border-white/10 text-white" : "bg-white border-stone-300 text-slate-900"
                  }`}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Review">In Review</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block font-[family-name:var(--font-oswald)] uppercase font-bold mb-1.5">
                  Services Interested In
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {LEAD_SERVICE_OPTIONS.map((svc) => {
                    const active = formServices.includes(svc);
                    return (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => toggleFormService(svc)}
                        className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono cursor-pointer transition-colors ${
                          active
                            ? "bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white border-transparent font-bold"
                            : isDark
                            ? "bg-white/5 border-white/10 text-stone-400"
                            : "bg-stone-100 border-stone-200 text-stone-600"
                        }`}
                      >
                        {svc}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-[family-name:var(--font-oswald)] uppercase font-bold mb-1">
                  Project Brief / Notes
                </label>
                <textarea
                  rows={3}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Project scope, budget, or call notes..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${
                    isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-300 text-slate-900"
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-mono uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingForm}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase font-bold tracking-wider cursor-pointer disabled:opacity-50"
                >
                  {isSavingForm ? "Saving..." : editingLead ? "Save Changes" : "Create Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div
            className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${
              isDark ? "bg-slate-900 border-white/10 text-white" : "bg-white border-[#E8E2F2] text-slate-900"
            }`}
          >
            <div className="flex items-center gap-3 text-red-400">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-oswald)] uppercase font-bold text-lg">
                  Confirm Lead Deletion
                </h3>
                <p className="text-xs text-stone-400">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-stone-400">
              Are you sure you want to delete lead for{" "}
              <strong className={isDark ? "text-white" : "text-black"}>
                &quot;{deleteTarget.name}&quot;
              </strong>{" "}
              ({deleteTarget.email})?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider border cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteLead}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl text-xs font-[family-name:var(--font-oswald)] uppercase font-bold tracking-wider bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20 cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
