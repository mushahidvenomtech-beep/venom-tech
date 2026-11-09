import { BlogPost, BlogCategory, BlogTag } from "./types";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function validatePost(post: Partial<BlogPost>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!post.title || post.title.trim().length < 3) {
    errors.title = "Article title must be at least 3 characters long.";
  } else if (post.title.trim().length > 200) {
    errors.title = "Article title cannot exceed 200 characters.";
  }

  if (!post.slug || post.slug.trim().length < 2) {
    errors.slug = "URL slug is required.";
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug.trim())) {
    errors.slug = "Slug must contain only lowercase letters, numbers, and single hyphens.";
  }

  if (!post.contentBlocks || post.contentBlocks.length === 0) {
    errors.content = "Article must contain at least one content block.";
  }

  if (!post.categories || post.categories.length === 0) {
    errors.categories = "Please select at least one primary category.";
  }

  if (post.excerpt && post.excerpt.length > 500) {
    errors.excerpt = "Excerpt cannot exceed 500 characters.";
  }

  if (post.status === "scheduled" && !post.scheduledFor) {
    errors.scheduledFor = "Scheduled publishing date and time are required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateCategory(category: Partial<BlogCategory>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!category.name || category.name.trim().length < 2) {
    errors.name = "Category name must be at least 2 characters.";
  }

  if (!category.slug || category.slug.trim().length < 2) {
    errors.slug = "Category slug is required.";
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(category.slug.trim())) {
    errors.slug = "Slug must be URL-safe (lowercase letters, numbers, hyphens).";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateTag(tag: Partial<BlogTag>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!tag.name || tag.name.trim().length < 2) {
    errors.name = "Tag name must be at least 2 characters.";
  }

  if (!tag.slug || tag.slug.trim().length < 2) {
    errors.slug = "Tag slug is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface SeoAnalysis {
  score: number; // 0 - 100
  titleStatus: "good" | "warning" | "error";
  descStatus: "good" | "warning" | "error";
  keywordInTitle: boolean;
  keywordInDesc: boolean;
  keywordInSlug: boolean;
  keywordInContent: boolean;
  recommendations: string[];
}

export function analyzeSeo(post: Partial<BlogPost>): SeoAnalysis {
  const recommendations: string[] = [];
  let score = 50;

  const keyword = (post.seo?.focusKeyword || "").trim().toLowerCase();
  const title = (post.seo?.metaTitle || post.title || "").trim();
  const desc = (post.seo?.metaDescription || post.excerpt || "").trim();
  const slug = (post.slug || "").trim().toLowerCase();

  // 1. Title length analysis (recommended 40 - 60 chars)
  let titleStatus: "good" | "warning" | "error" = "good";
  if (!title) {
    titleStatus = "error";
    recommendations.push("Add an SEO meta title for search engines.");
    score -= 15;
  } else if (title.length < 30) {
    titleStatus = "warning";
    recommendations.push("Title is relatively short (aim for 40-60 characters).");
  } else if (title.length > 65) {
    titleStatus = "warning";
    recommendations.push("Title exceeds 65 characters and may be truncated on Google SERPs.");
  } else {
    score += 15;
  }

  // 2. Meta description analysis (recommended 120 - 160 chars)
  let descStatus: "good" | "warning" | "error" = "good";
  if (!desc) {
    descStatus = "error";
    recommendations.push("Add a meta description to summarize the article for search results.");
    score -= 15;
  } else if (desc.length < 90) {
    descStatus = "warning";
    recommendations.push("Meta description is brief (optimal length is 120-160 characters).");
  } else if (desc.length > 165) {
    descStatus = "warning";
    recommendations.push("Meta description exceeds 160 characters and will likely be clipped.");
  } else {
    score += 15;
  }

  // 3. Focus keyword checks
  let keywordInTitle = false;
  let keywordInDesc = false;
  let keywordInSlug = false;
  let keywordInContent = false;

  if (keyword) {
    keywordInTitle = title.toLowerCase().includes(keyword);
    keywordInDesc = desc.toLowerCase().includes(keyword);
    keywordInSlug = slug.includes(slugify(keyword));

    const contentSnippet = JSON.stringify(post.contentBlocks || []).toLowerCase();
    keywordInContent = contentSnippet.includes(keyword);

    if (keywordInTitle) score += 10;
    else recommendations.push(`Include your focus keyword ("${keyword}") in the SEO title.`);

    if (keywordInDesc) score += 5;
    else recommendations.push(`Include your focus keyword ("${keyword}") in the meta description.`);

    if (keywordInSlug) score += 5;
    else recommendations.push(`Include your focus keyword ("${keyword}") in the URL slug.`);

    if (keywordInContent) score += 10;
    else recommendations.push(`Mention your focus keyword inside the article headings or paragraphs.`);
  } else {
    recommendations.push("Set a focus keyword to evaluate search optimization.");
  }

  // 4. Featured image check
  if (post.featuredImage) {
    score += 5;
  } else {
    recommendations.push("Set a high-resolution featured image for social previews and rich snippets.");
  }

  return {
    score: Math.min(100, Math.max(10, score)),
    titleStatus,
    descStatus,
    keywordInTitle,
    keywordInDesc,
    keywordInSlug,
    keywordInContent,
    recommendations,
  };
}

