import {
  mysqlTable,
  varchar,
  text,
  mediumtext,
  int,
  datetime,
  mysqlEnum,
  boolean,
  json,
  index,
} from "drizzle-orm/mysql-core";
import { EditorBlock } from "@/lib/blog/types";

/**
 * 1. Blog Posts Table
 *
 * Designed for high performance and infinite future flexibility:
 * - `content_blocks` is stored as structured JSON, allowing arbitrary new
 *   interactive blocks (charts, video, embeds, tables, callouts) without schema migrations.
 * - `meta` JSON column allows arbitrary future plugin/workflow extensions.
 * - Indexes on `slug`, `status`, and `published_at` for sub-millisecond querying.
 */
export const blogPosts = mysqlTable(
  "blog_posts",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    excerpt: text("excerpt"),
    contentBlocks: json("content_blocks").$type<EditorBlock[]>().notNull(),
    featuredImage: mediumtext("featured_image"),
    featuredImageAlt: varchar("featured_image_alt", { length: 255 }),
    featuredImageCaption: varchar("featured_image_caption", { length: 512 }),
    authorName: varchar("author_name", { length: 100 }).notNull().default("Venom Tech Team"),
    authorRole: varchar("author_role", { length: 100 }),
    authorAvatar: varchar("author_avatar", { length: 512 }),
    categories: json("categories").$type<string[]>().notNull(),
    tags: json("tags").$type<string[]>().notNull(),
    status: mysqlEnum("status", ["draft", "review", "scheduled", "published", "archived"])
      .notNull()
      .default("draft"),
    views: int("views").notNull().default(0),
    readingTime: int("reading_time").notNull().default(3),
    publishedAt: datetime("published_at"),
    scheduledFor: datetime("scheduled_for"),
    seoMetaTitle: varchar("seo_meta_title", { length: 255 }),
    seoMetaDescription: text("seo_meta_description"),
    seoFocusKeyword: varchar("seo_focus_keyword", { length: 100 }),
    seoCanonicalUrl: varchar("seo_canonical_url", { length: 512 }),
    seoOgImage: varchar("seo_og_image", { length: 512 }),
    seoNoIndex: boolean("seo_no_index").notNull().default(false),
    seoNoFollow: boolean("seo_no_follow").notNull().default(false),
    meta: json("meta").$type<Record<string, unknown>>(),
    createdAt: datetime("created_at").notNull(),
    updatedAt: datetime("updated_at").notNull(),
  },
  (table) => [
    index("idx_posts_slug").on(table.slug),
    index("idx_posts_status").on(table.status),
    index("idx_posts_published_at").on(table.publishedAt),
  ]
);

/**
 * 2. Blog Categories Table
 */
export const blogCategories = mysqlTable(
  "blog_categories",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 100 }).notNull().unique(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    description: text("description"),
    color: varchar("color", { length: 30 }).default("#C07DFF"),
    createdAt: datetime("created_at").notNull(),
  },
  (table) => [index("idx_categories_slug").on(table.slug)]
);

/**
 * 3. Blog Tags Table
 */
export const blogTags = mysqlTable(
  "blog_tags",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 100 }).notNull().unique(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    createdAt: datetime("created_at").notNull(),
  },
  (table) => [index("idx_tags_slug").on(table.slug)]
);

/**
 * 4. Blog Media Library Table
 */
export const blogMedia = mysqlTable(
  "blog_media",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    url: mediumtext("url").notNull(),
    filename: varchar("filename", { length: 255 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    alt: varchar("alt", { length: 255 }).notNull().default(""),
    caption: text("caption"),
    size: varchar("size", { length: 50 }),
    mimeType: varchar("mime_type", { length: 100 }),
    dimensions: varchar("dimensions", { length: 50 }),
    uploadedAt: datetime("uploaded_at").notNull(),
  },
  (table) => [index("idx_media_filename").on(table.filename)]
);

export type BlogPostRow = typeof blogPosts.$inferSelect;
export type NewBlogPostRow = typeof blogPosts.$inferInsert;
export type BlogCategoryRow = typeof blogCategories.$inferSelect;
export type BlogTagRow = typeof blogTags.$inferSelect;
export type BlogMediaRow = typeof blogMedia.$inferSelect;

