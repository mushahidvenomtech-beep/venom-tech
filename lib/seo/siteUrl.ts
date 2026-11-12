/**
 * Technical SEO & Canonical Domain Helper
 *
 * Resolves the canonical site URL for production, staging, and preview environments.
 *
 * Priority order:
 * 1. NEXT_PUBLIC_SITE_URL (explicit user override via Vercel or environment)
 * 2. NEXT_PUBLIC_APP_URL (if set and not pointing to localhost)
 * 3. Fallback canonical production domain for Venom Tech: https://venomtech.pk
 */

export const CANONICAL_PRODUCTION_DOMAIN = "https://venomtech.pk";

/**
 * Returns the resolved canonical base URL without trailing slash.
 */
export function getSiteUrl(): string {
  // 1. Explicit user-configured environment variable
  const explicitSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicitSiteUrl) {
    return cleanUrl(explicitSiteUrl);
  }

  // 2. Explicit app URL (ignore localhost)
  const explicitAppUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (explicitAppUrl && !explicitAppUrl.includes("localhost") && !explicitAppUrl.includes("127.0.0.1")) {
    return cleanUrl(explicitAppUrl);
  }

  // 3. Fallback to official production domain
  return CANONICAL_PRODUCTION_DOMAIN;
}

/**
 * Detects whether the current build or request is running in a Vercel Preview environment.
 */
export function isVercelPreview(): boolean {
  return process.env.VERCEL_ENV === "preview";
}

function cleanUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

