import React from "react";
import type { Metadata } from "next";
import DashboardMain from "@/app/component/dashboard/main/DashboardMain";

export const metadata: Metadata = {
  title: "Enterprise Dashboard | Venom Tech IT Solution",
  description: "Secure administrative control center for Leads, Services, Blogs, and Projects.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return <DashboardMain />;
}

