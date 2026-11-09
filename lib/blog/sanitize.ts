/**
 * Blog Content Sanitization Utility
 * Ensures all rendered text, attributes, and embeds are secure against XSS.
 */

export function sanitizeText(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function sanitizeUrl(url: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  // Only allow http, https, mailto, tel, or relative URLs
  if (
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:")
  ) {
    return trimmed;
  }
  return "#invalid-url";
}

export function calculateReadingTime(blocks: unknown[]): number {
  if (!Array.isArray(blocks) || blocks.length === 0) return 1;
  const rawString = JSON.stringify(blocks);
  const words = rawString.replace(/[{}[\]",:]/g, " ").split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

