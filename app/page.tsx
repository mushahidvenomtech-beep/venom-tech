import type { Metadata } from "next";
import HomePage from "./screens/home/page";

export const metadata: Metadata = {
  title: "Digital Marketing That Grows Your Business | Venom Tech",
  description: "Venom Tech is a full-service digital marketing agency in Lahore, Pakistan. We combine SEO, paid advertising, creative design, app development and AI automation to bring you more traffic, more leads and more sales.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Digital Marketing That Grows Your Business | Venom Tech",
    description: "Venom Tech is a full-service digital marketing agency in Lahore, Pakistan. We combine SEO, paid advertising, creative design, app development and AI automation to bring you more traffic, more leads and more sales.",
    url: "/",
    siteName: "Venom Tech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing That Grows Your Business | Venom Tech",
    description: "Venom Tech is a full-service digital marketing agency in Lahore, Pakistan. We combine SEO, paid advertising, creative design, app development and AI automation to bring you more traffic, more leads and more sales.",
  },
};

export default function RootPage() {
  return <HomePage />;
}
