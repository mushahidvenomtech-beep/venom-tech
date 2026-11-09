"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisOptions } from "lenis";

export { useLenis };

export interface SmoothScrollProps {
  children: ReactNode;
  options?: LenisOptions;
}

/**
 * Global smooth scroll provider using Lenis
 * Configured with fluid inertia, anchor support, and accessibility-first motion preferences.
 * Bypassed on Dashboard routes to ensure 100% native, ultra-responsive mouse scroll across all admin views.
 */
export default function SmoothScroll({ children, options }: SmoothScrollProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.includes("dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        anchors: true,
        stopInertiaOnNavigate: true,
        ...options,
      }}
    >
      {children}
    </ReactLenis>
  );
}

