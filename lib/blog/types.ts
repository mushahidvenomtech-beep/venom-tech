export type BlockType =
  | "heading"
  | "paragraph"
  | "list"
  | "image"
  | "quote"
  | "table"
  | "code"
  | "callout"
  | "divider";

export interface HeadingBlockData {
  level: 1 | 2 | 3 | 4;
  text: string;
}

export interface ParagraphBlockData {
  text: string;
  align?: "left" | "center" | "right";
}

export interface ListBlockData {
  style: "unordered" | "ordered";
  items: string[];
}

export interface ImageBlockData {
  url: string;
  alt: string;
  caption?: string;
  align?: "left" | "center" | "right" | "full";
}

export interface QuoteBlockData {
  quote: string;
  citation?: string;
}

export interface TableBlockData {
  headers: string[];
  rows: string[][];
}

export interface CodeBlockData {
  code: string;
  language: string;
}

export interface CalloutBlockData {
  variant: "info" | "warning" | "tip" | "success";
  title?: string;
  text: string;
}

export interface DividerBlockData {
  style?: "solid" | "dots" | "gradient";
}

export interface EditorBlock {
  id: string;
  type: BlockType;
  data:
    | HeadingBlockData
    | ParagraphBlockData
    | ListBlockData
    | ImageBlockData
    | QuoteBlockData
    | TableBlockData
    | CodeBlockData
    | CalloutBlockData
    | DividerBlockData;
}

export type PostStatus =
  | "draft"
  | "review"
  | "scheduled"
  | "published"
  | "archived";

export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

export interface PostRevision {
  id: string;
  savedAt: string;
  title: string;
  author: string;
  contentBlocks: EditorBlock[];
  note?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentBlocks: EditorBlock[];
  featuredImage: string;
  featuredImageAlt?: string;
  featuredImageCaption?: string;
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  categories: string[];
  tags: string[];
  status: PostStatus;
  publishedAt?: string;
  scheduledFor?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  readingTime: number; // in minutes
  renderType?: string;
  seo: SeoSettings;
  revisions?: PostRevision[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  postCount?: number;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  postCount?: number;
}

export interface MediaItem {
  id: string;
  url: string;
  filename: string;
  title: string;
  alt: string;
  caption?: string;
  size: string;
  mimeType: string;
  uploadedAt: string;
  dimensions?: string;
}

export interface BlogStatistics {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  scheduledPosts: number;
  reviewPosts: number;
  totalViews: number;
}

export interface PostFilterOptions {
  search?: string;
  status?: string;
  category?: string;
  tag?: string;
  sortBy?: "newest" | "oldest" | "views" | "title";
  page?: number;
  pageSize?: number;
}

