import type { Metadata } from "next";
import HomePage from "./screens/home/page";

export const metadata: Metadata = {
  title: "Venom Tech | Digital Marketing Agency in Pakistan",
  description: "Venom Tech is a Lahore-based digital marketing agency offering SEO, paid ads, app development, design and AI automation for businesses across Pakistan.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Venom Tech | Digital Marketing Agency in Pakistan",
    description: "Venom Tech is a Lahore-based digital marketing agency offering SEO, paid ads, app development, design and AI automation for businesses across Pakistan.",
    url: "/",
    siteName: "Venom Tech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Venom Tech | Digital Marketing Agency in Pakistan",
    description: "Venom Tech is a Lahore-based digital marketing agency offering SEO, paid ads, app development, design and AI automation for businesses across Pakistan.",
  },
};

export default function RootPage() {
  return <HomePage />;
}
