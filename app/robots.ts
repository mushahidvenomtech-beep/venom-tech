import type { MetadataRoute } from "next";
import { getSiteUrl, isVercelPreview } from "../lib/seo/siteUrl";

export default function robots(): MetadataRoute.Robots {
  // Prevent indexing of temporary preview / staging deployments on Vercel
  if (isVercelPreview()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  const baseUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/dashboard/",
          "/screens/dashboard",
          "/screens/dashboard/",
          "/login",
          "/screens/login",
          "/api/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
