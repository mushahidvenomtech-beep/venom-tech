import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/about", destination: "/screens/aboutus" },
      { source: "/aboutus", destination: "/screens/aboutus" },
      { source: "/careers", destination: "/screens/careers" },
      { source: "/services", destination: "/screens/services" },
      { source: "/portfolio", destination: "/screens/portfolio" },
      { source: "/pages", destination: "/screens/pages" },
      { source: "/blogs", destination: "/screens/blogs" },
      { source: "/blog", destination: "/screens/blogs" },
      { source: "/singleblog", destination: "/screens/singleblog" },
      { source: "/blog/single", destination: "/screens/singleblog" },
      { source: "/contact", destination: "/screens/contactus" },
      { source: "/contactus", destination: "/screens/contactus" },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
