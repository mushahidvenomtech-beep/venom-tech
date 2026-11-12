import type { Metadata, Viewport } from "next";
import { Oswald, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import "@/app/component/global/ui/StarBorder.css";
import "@/app/component/global/ui/CardNav.css";
import "@/app/component/global/ui/GooeyNav.css";
import "@/app/component/global/ui/BorderGlow.css";
import "@/app/component/global/ui/DecayCard.css";
import "@/app/component/global/ui/Stepper.css";
import "@/app/component/global/ui/SwipeToast.css";
import SmoothScroll from "@/app/component/global/scroll/SmoothScroll";
import ClickSpark from "@/app/component/global/ui/ClickSpark";
import { getSiteUrl } from "@/lib/seo/siteUrl";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  themeColor: "#C07DFF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CREAT* - Modern Digital Creative Agency & Studio",
    template: "%s | CREAT*",
  },
  description: "Next-generation creative studio crafting high-conviction visual identities, award-winning web platforms, and immersive motion systems.",
  applicationName: "CREAT*",
  authors: [{ name: "CREAT Studio Team", url: siteUrl }],
  generator: "Next.js 16",
  keywords: [
    "creative agency",
    "brand identity",
    "digital studio",
    "web development",
    "Next.js engineering",
    "AI automation",
    "UI/UX design",
    "SEO services",
    "advertising agency",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CREAT* - Modern Digital Creative Studio",
    description: "Creating Stories, Capturing Attention. High-conviction brand identities, bespoke digital flagships, and spatial motion.",
    url: siteUrl,
    siteName: "CREAT*",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CREAT* - Modern Digital Creative Studio",
    description: "Creating Stories, Capturing Attention. High-conviction brand identities, bespoke digital flagships, and spatial motion.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Venom Tech IT Solution",
      url: siteUrl,
      logo: `${siteUrl}/images/venom tech logo.webp`,
      description: "Redefining digital marketing with visionary and innovative solutions. We are Venom Tech, where visions and strategies meet.",
      sameAs: [
        "https://www.facebook.com/people/Venom-Tech/61581955490808/",
        "https://www.instagram.com/venomtech.pk/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+92-321-4774200",
        contactType: "customer service",
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "CREAT*",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${oswald.variable} ${plusJakarta.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-transparent text-[#111111] antialiased"
      >
        <SmoothScroll>
          <ClickSpark
            sparkColor={["#C07DFF", "#3BC8F6", "#ffffff"]}
            shape="line"
            sparkCount={8}
            sparkSize={14}
            sparkRadius={30}
            duration={500}
            className="flex-1 flex flex-col w-full min-h-screen"
          >
            {/* Accessible Skip-to-Content Link */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-gradient-to-r from-[#C07DFF] to-[#3BC8F6] focus:text-white focus:font-[family-name:var(--font-oswald)] focus:uppercase focus:text-xs focus:tracking-wider focus:font-bold focus:shadow-xl focus:outline-none"
            >
              Skip to main content
            </a>
            {children}
          </ClickSpark>
        </SmoothScroll>
      </body>
    </html>
  );
}
