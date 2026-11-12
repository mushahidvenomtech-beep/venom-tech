"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SwipeToast from "@/app/component/global/ui/SwipeToast";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // React Bits SwipeToast State
  const [toast, setToast] = useState<{
    open: boolean;
    title: string;
    description: string;
    fuseColor: string;
  }>({
    open: false,
    title: "",
    description: "",
    fuseColor: "#3BC8F6",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      // Validate requested admin credentials
      const validEmail = "adminvenomtech@gmail.com";
      const validPassword = "password";

      if (email.trim().toLowerCase() === validEmail && password === validPassword) {
        setSuccess(true);
        setToast({
          open: true,
          title: "Authentication Verified",
          description: "Welcome to Venom Tech Enterprise Dashboard.",
          fuseColor: "#3BC8F6",
        });
        if (typeof window !== "undefined") {
          localStorage.setItem("venom_admin_logged_in", "true");
          localStorage.setItem("venom_admin_user", validEmail);
          document.cookie = "venom_admin_auth=true; path=/; max-age=86400";
        }
        setTimeout(() => {
          router.push("/dashboard");
        }, 800);
      } else {
        setIsLoading(false);
        setError("Access Denied: Invalid administrator email or password.");
        setToast({
          open: true,
          title: "Authentication Failed",
          description: "Invalid administrator email or password.",
          fuseColor: "#ef4444",
        });
      }
    }, 600);
  };

  const handleFillDemo = () => {
    setEmail("adminvenomtech@gmail.com");
    setPassword("password");
    setError(null);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden selection:bg-[#C07DFF] selection:text-white">
      {/* Luxury Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:28px_28px] opacity-15" />
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#C07DFF]/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-[#3BC8F6]/20 rounded-full blur-[140px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Top Brand Emblem */}
        <div className="text-center mb-6">
          <Link href="/screens/home" className="inline-block group">
            <Image
              src="/images/logo.webp"
              alt="Venom Tech IT Solution"
              width={200}
              height={48}
              className="h-10 w-auto mx-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Luxury Glassmorphic Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
          {/* Subtle top edge gradient highlight */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C07DFF] to-transparent opacity-75" />

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-center gap-3 animate-shake">
              <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                ✕
              </span>
              <span>{error}</span>
            </div>
          )}

          {/* Success Banner */}
          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center gap-3 animate-pulse">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                ✓
              </span>
              <span>Access Granted! Redirecting to Enterprise Dashboard...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 font-sans">
            {/* Email Field */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="adminvenomtech@gmail.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-[#3BC8F6] focus:bg-white/[0.08] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold">
                  Security Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-[#3BC8F6] hover:text-[#C07DFF] font-medium transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-[#3BC8F6] focus:bg-white/[0.08] transition-all"
                />
              </div>
            </div>

            {/* Quick Demo Credentials Pill */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleFillDemo}
                className="w-full py-2 px-3 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#C07DFF]/50 text-stone-400 hover:text-white text-[11px] flex items-center justify-between transition-all group"
              >
                <span>Default credentials:</span>
                <span className="font-mono text-[#C07DFF] group-hover:underline">adminvenomtech@gmail.com</span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C07DFF] via-[#7F8BFF] to-[#3BC8F6] text-white font-[family-name:var(--font-oswald)] uppercase font-bold text-sm tracking-wider shadow-lg shadow-[#3BC8F6]/20 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : success ? (
                <span>Access Granted &rarr;</span>
              ) : (
                <span>Authorize &amp; Enter Dashboard &rarr;</span>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <Link
              href="/screens/home"
              className="text-xs text-stone-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <span>&larr;</span>
              <span>Return to Public Homepage</span>
            </Link>
          </div>
        </div>
      </div>

      {/* React Bits SwipeToast on Login Submission */}
      {toast.open && (
        <SwipeToast
          open={toast.open}
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          title={toast.title}
          description={toast.description}
          background="#09090b"
          color="#f5f5f5"
          fuseColor={toast.fuseColor}
          width={360}
          radius={12}
          duration={3500}
          fuse="bottom"
          pauseOnHover
          closeButton
        />
      )}
    </div>
  );
}

