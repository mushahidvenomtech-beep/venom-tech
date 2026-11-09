import React from "react";
import type { Metadata } from "next";
import LoginForm from "@/app/component/auth/login/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Venom Tech IT Solution Console",
  description: "Secure administrative login portal for Venom Tech IT Solution management console.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginForm />;
}

