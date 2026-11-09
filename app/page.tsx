import type { Metadata } from "next";
import HomePage from "./screens/home/page";

export const metadata: Metadata = {
  title: "Explore the Power of Innovation | Venom Tech",
  description: "Helping businesses scale up and convert clicks into revenue. We are Venom Tech, delivering digitally engineered solutions that make your brand unshakable.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Explore the Power of Innovation | Venom Tech",
    description: "Helping businesses scale up and convert clicks into revenue. We are Venom Tech, delivering digitally engineered solutions that make your brand unshakable.",
    url: "/",
    siteName: "Venom Tech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore the Power of Innovation | Venom Tech",
    description: "Helping businesses scale up and convert clicks into revenue. We are Venom Tech, delivering digitally engineered solutions that make your brand unshakable.",
  },
};

export default function RootPage() {
  return <HomePage />;
}
