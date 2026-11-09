import fs from "fs";
import path from "path";
import { eq, desc, asc, like, and, sql } from "drizzle-orm";
import { getDatabaseConnection, schema } from "@/db";
import {
  BlogPost,
  BlogCategory,
  BlogTag,
  MediaItem,
  BlogStatistics,
  PostFilterOptions,
} from "../types";
import { slugify } from "../validation";
import { calculateReadingTime } from "../sanitize";
import { blogTablesSQL } from "../schema";

const DATA_DIR = path.join(process.cwd(), "data");
const FALLBACK_DB_FILE = path.join(DATA_DIR, "blog-db.json");

interface ServerDatabaseFile {
  posts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  media: MediaItem[];
}

function ensureFallbackFile(): ServerDatabaseFile {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(FALLBACK_DB_FILE)) {
      const raw = fs.readFileSync(FALLBACK_DB_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Could not read fallback DB file:", err);
  }

  const initial: ServerDatabaseFile = {
    posts: [
      {
        id: "test-ai-workflows-2026",
        title: "How Autonomous AI Workflows Are Transforming Modern Digital Operations",
        slug: "autonomous-ai-workflows-modern-digital-operations",
        excerpt:
          "A strategic breakdown of how intelligent agent swarms, automated data pipelines, and custom LLMs eliminate operational friction and deliver compounding ROI.",
        contentBlocks: [
          {
            id: "block-1",
            type: "heading",
            data: { level: 2, text: "The Shift Toward Autonomous Operations" },
          },
          {
            id: "block-2",
            type: "paragraph",
            data: {
              text: "Modern enterprises are moving beyond isolated chatbots to end-to-end autonomous agent swarms. These systems synchronize databases, orchestrate multi-step approval workflows, and triage customer requests with sub-second latency.",
              align: "left",
            },
          },
          {
            id: "block-3",
            type: "quote",
            data: {
              quote: "Automation is not about replacing human ingenuity; it is about freeing teams from mundane execution so they can focus on high-leverage strategic growth.",
              citation: "Venom Tech AI Engineering Team",
            },
          },
          {
            id: "block-4",
            type: "heading",
            data: { level: 3, text: "Benchmarked Impact Across Enterprise Teams" },
          },
          {
            id: "block-5",
            type: "table",
            data: {
              headers: ["Operational Metric", "Traditional Execution", "AI Agent Pipeline", "Efficiency Delta"],
              rows: [
                ["Client Onboarding", "3 Business Days", "< 15 Minutes", "98% Faster"],
                ["Data Reconciliation", "6 Hours / Week", "Instantaneous (< 2s)", "Zero Latency"],
                ["Support Resolution", "45 Mins Average", "2.4 Mins Average", "18.7x Faster"],
              ],
            },
          },
          {
            id: "block-6",
            type: "callout",
            data: {
              variant: "tip",
              title: "Key Takeaway for Tech Leaders",
              text: "Start with high-frequency, rule-defined bottlenecks. Once deterministic pipelines are automated, layer in non-deterministic LLM reasoning agents to handle edge cases.",
            },
          },
        ],
        featuredImage: "/images/blog/blog-hero.webp",
        featuredImageAlt: "High-tech futuristic digital operations screen",
        author: {
          name: "Venom Tech Team",
          role: "AI & Cloud Architecture",
          avatar: "/images/team/team-1.webp",
        },
        categories: ["AI & Automation", "App Development"],
        tags: ["AI Automation", "Next.js 16", "Growth Strategy"],
        status: "published",
        publishedAt: "2026-11-06T04:00:00Z",
        createdAt: "2026-11-06T04:00:00Z",
        updatedAt: "2026-11-06T04:00:00Z",
        views: 185,
        readingTime: 4,
        seo: {
          metaTitle: "Autonomous AI Workflows in 2026 | Venom Tech IT Solution",
          metaDescription:
            "Learn how autonomous AI agent pipelines eliminate operational bottlenecks and drive compounding enterprise efficiency.",
          focusKeyword: "Autonomous AI Workflows",
          canonicalUrl: "https://venomtech.pk/blog/autonomous-ai-workflows-modern-digital-operations",
          noIndex: false,
          noFollow: false,
        },
      },
    ],
    categories: [
      { id: "cat-ai", name: "AI & Automation", slug: "ai-automation", color: "#3BC8F6" },
      { id: "cat-app", name: "App Development", slug: "app-development", color: "#C07DFF" },
      { id: "cat-design", name: "Graphic Design", slug: "graphic-design", color: "#EC4899" },
      { id: "cat-seo", name: "SEO & Growth", slug: "seo-growth", color: "#10B981" },
      { id: "cat-strategy", name: "Strategy & Branding", slug: "strategy-branding", color: "#F59E0B" },
      { id: "cat-bpo", name: "BPO Services", slug: "bpo-services", color: "#8B5CF6" },
    ],
    tags: [
      { id: "tag-ai", name: "AI Automation", slug: "ai-automation" },
      { id: "tag-nextjs", name: "Next.js 16", slug: "nextjs" },
      { id: "tag-branding", name: "Branding", slug: "branding" },
      { id: "tag-flutter", name: "Flutter", slug: "flutter" },
      { id: "tag-seo", name: "SEO Optimization", slug: "seo-optimization" },
      { id: "tag-design", name: "Design Systems", slug: "design-systems" },
      { id: "tag-growth", name: "Growth Strategy", slug: "growth-strategy" },
      { id: "tag-bpo", name: "BPO Operations", slug: "bpo-operations" },
    ],
    media: [],
  };

  try {
    fs.writeFileSync(FALLBACK_DB_FILE, JSON.stringify(initial, null, 2), "utf-8");
  } catch {}

  return initial;
}

function saveFallbackFile(data: ServerDatabaseFile) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(FALLBACK_DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write fallback DB file:", err);
  }
}

// Ensure database tables exist if MySQL is active
let tablesInitialized = true;
let mysqlConnectionFailed = false;

async function ensureMySQLTables(pool: any) {
  if (tablesInitialized || !pool || mysqlConnectionFailed) return;
  try {
    await pool.query(blogTablesSQL.postsTable);
    await pool.query(blogTablesSQL.categoriesTable);
    await pool.query(blogTablesSQL.tagsTable);
    await pool.query(blogTablesSQL.mediaTable);
    tablesInitialized = true;
  } catch (e: any) {
    if (e?.code === "ECONNREFUSED" || e?.code === "ETIMEDOUT") {
      mysqlConnectionFailed = true;
    }
    console.warn("MySQL auto table verification note:", e?.message || e);
  }
}

function parseJsonSafe<T>(val: any, fallback: T): T {
  if (val === null || val === undefined) return fallback;
  if (Array.isArray(val)) return val as unknown as T;
  if (typeof val === "object") return val as T;
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      return parsed as T;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

function rowToPost(row: any): BlogPost {
  const contentBlocks = parseJsonSafe(row.contentBlocks ?? row.content_blocks, []);
  const categories = parseJsonSafe(row.categories, []);
  const tags = parseJsonSafe(row.tags, []);

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || "",
    contentBlocks: Array.isArray(contentBlocks) ? contentBlocks : [],
    featuredImage: row.featuredImage || row.featured_image || "",
    featuredImageAlt: row.featuredImageAlt || row.featured_image_alt || "",
    featuredImageCaption: row.featuredImageCaption || row.featured_image_caption || "",
    author: {
      name: row.authorName || row.author_name || "Venom Tech Team",
      role: row.authorRole || row.author_role || undefined,
      avatar: row.authorAvatar || row.author_avatar || undefined,
    },
    categories: Array.isArray(categories) ? categories : [],
    tags: Array.isArray(tags) ? tags : [],
    status: row.status || "draft",
    views: Number(row.views || 0),
    readingTime: Number(row.readingTime || row.reading_time || 3),
    publishedAt: row.publishedAt || row.published_at ? new Date(row.publishedAt || row.published_at).toISOString() : undefined,
    scheduledFor: row.scheduledFor || row.scheduled_for ? new Date(row.scheduledFor || row.scheduled_for).toISOString() : undefined,
    seo: {
      metaTitle: row.seoMetaTitle || row.seo_meta_title || undefined,
      metaDescription: row.seoMetaDescription || row.seo_meta_description || undefined,
      focusKeyword: row.seoFocusKeyword || row.seo_focus_keyword || undefined,
      canonicalUrl: row.seoCanonicalUrl || row.seo_canonical_url || undefined,
      ogImage: row.seoOgImage || row.seo_og_image || undefined,
      noIndex: Boolean(row.seoNoIndex ?? row.seo_no_index),
      noFollow: Boolean(row.seoNoFollow ?? row.seo_no_follow),
    },
    createdAt: row.createdAt || row.created_at ? new Date(row.createdAt || row.created_at).toISOString() : new Date().toISOString(),
    updatedAt: row.updatedAt || row.updated_at ? new Date(row.updatedAt || row.updated_at).toISOString() : new Date().toISOString(),
  };
}

export const BlogDbService = {
  async getPosts(options: PostFilterOptions = {}): Promise<{
    posts: BlogPost[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const { db, pool } = getDatabaseConnection();
    const page = Math.max(1, options.page || 1);
    const pageSize = Math.max(1, Math.min(100, options.pageSize || 10));

    // Case 1: MySQL with Drizzle ORM
    if (db && pool && !mysqlConnectionFailed) {
      try {
        const conditions: any[] = [];
        if (options.status && options.status !== "all") {
          conditions.push(eq(schema.blogPosts.status, options.status as any));
        }
        if (options.search) {
          conditions.push(like(schema.blogPosts.title, `%${options.search}%`));
        }

        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

        let orderBy = desc(schema.blogPosts.createdAt);
        if (options.sortBy === "newest") {
          orderBy = desc(schema.blogPosts.publishedAt);
        } else if (options.sortBy === "oldest") {
          orderBy = asc(schema.blogPosts.publishedAt);
        } else if (options.sortBy === "views") {
          orderBy = desc(schema.blogPosts.views);
        } else if (options.sortBy === "title") {
          orderBy = asc(schema.blogPosts.title);
        }

        const offset = (page - 1) * pageSize;
        const rows = await db
          .select()
          .from(schema.blogPosts)
          .where(whereClause)
          .orderBy(orderBy)
          .limit(pageSize)
          .offset(offset);

        // Count total
        const countResult = await db
          .select({ count: sql<number>`count(*)` })
          .from(schema.blogPosts)
          .where(whereClause);

        const total = Number(countResult[0]?.count || 0);
        return {
          posts: rows.map(rowToPost),
          total,
          page,
          pageSize,
          totalPages: Math.max(1, Math.ceil(total / pageSize)),
        };
      } catch (err) {
        console.warn("MySQL query failed, using server fallback:", err);
      }
    }

    // Case 2: Server Fallback DB
    const fileDb = ensureFallbackFile();
    let filtered = [...fileDb.posts];

    if (options.status && options.status !== "all") {
      filtered = filtered.filter((p) => p.status === options.status);
    }
    if (options.category && options.category !== "all") {
      filtered = filtered.filter((p) =>
        p.categories.some((c) => c.toLowerCase() === options.category?.toLowerCase())
      );
    }
    if (options.tag && options.tag !== "all") {
      filtered = filtered.filter((p) =>
        p.tags.some((t) => t.toLowerCase() === options.tag?.toLowerCase())
      );
    }
    if (options.search) {
      const q = options.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
      );
    }

    if (options.sortBy === "newest") {
      filtered.sort(
        (a, b) =>
          new Date(b.publishedAt || b.createdAt).getTime() -
          new Date(a.publishedAt || a.createdAt).getTime()
      );
    } else if (options.sortBy === "oldest") {
      filtered.sort(
        (a, b) =>
          new Date(a.publishedAt || a.createdAt).getTime() -
          new Date(b.publishedAt || b.createdAt).getTime()
      );
    } else if (options.sortBy === "views") {
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (options.sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    const total = filtered.length;
    const offset = (page - 1) * pageSize;
    const paginated = filtered.slice(offset, offset + pageSize);

    return {
      posts: paginated,
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    };
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    if (!slug || slug.startsWith("zzzzzz")) return null;
    const { db, pool } = getDatabaseConnection();
    if (db && pool && !mysqlConnectionFailed) {
      try {
        const rows = await db
          .select()
          .from(schema.blogPosts)
          .where(eq(schema.blogPosts.slug, slug))
          .limit(1);

        if (rows.length > 0) {
          return rowToPost(rows[0]);
        }
      } catch (err) {
        console.warn("MySQL getPostBySlug error:", err);
      }
    }

    const fileDb = ensureFallbackFile();
    return fileDb.posts.find((p) => p.slug === slug) || null;
  },

  async getPostById(id: string): Promise<BlogPost | null> {
    const { db, pool } = getDatabaseConnection();
    if (db && pool) {
      try {
        const rows = await db
          .select()
          .from(schema.blogPosts)
          .where(eq(schema.blogPosts.id, id))
          .limit(1);

        if (rows.length > 0) {
          return rowToPost(rows[0]);
        }
      } catch (err) {
        console.warn("MySQL getPostById error:", err);
      }
    }

    const fileDb = ensureFallbackFile();
    return fileDb.posts.find((p) => p.id === id) || null;
  },

  async createPost(input: Partial<BlogPost>): Promise<BlogPost> {
    const now = new Date();
    const id = input.id || `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const title = input.title?.trim() || "Untitled Article";
    const slug = input.slug?.trim() ? slugify(input.slug) : slugify(title);
    const readingTime = calculateReadingTime(input.contentBlocks || []);

    const newPost: BlogPost = {
      id,
      title,
      slug,
      excerpt: input.excerpt || "",
      contentBlocks: input.contentBlocks || [],
      featuredImage: input.featuredImage || "",
      featuredImageAlt: input.featuredImageAlt || "",
      featuredImageCaption: input.featuredImageCaption || "",
      author: input.author || { name: "Venom Tech Team" },
      categories: input.categories || ["AI & Automation"],
      tags: input.tags || [],
      status: input.status || "draft",
      views: input.views || 0,
      readingTime: readingTime || 3,
      publishedAt: input.status === "published" ? input.publishedAt || now.toISOString() : undefined,
      scheduledFor: input.scheduledFor,
      seo: input.seo || {
        metaTitle: title,
        metaDescription: input.excerpt || "",
        focusKeyword: "",
        canonicalUrl: `/blog/${slug}`,
        noIndex: false,
        noFollow: false,
      },
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    // 1. MySQL Persist
    const { db, pool } = getDatabaseConnection();
    if (db && pool) {
      try {
        await ensureMySQLTables(pool);
        await db.insert(schema.blogPosts).values({
          id: newPost.id,
          title: newPost.title,
          slug: newPost.slug,
          excerpt: newPost.excerpt,
          contentBlocks: newPost.contentBlocks,
          featuredImage: newPost.featuredImage,
          featuredImageAlt: newPost.featuredImageAlt,
          featuredImageCaption: newPost.featuredImageCaption,
          authorName: newPost.author.name,
          authorRole: newPost.author.role,
          authorAvatar: newPost.author.avatar,
          categories: newPost.categories,
          tags: newPost.tags,
          status: newPost.status,
          views: newPost.views,
          readingTime: newPost.readingTime,
          publishedAt: newPost.publishedAt ? new Date(newPost.publishedAt) : null,
          scheduledFor: newPost.scheduledFor ? new Date(newPost.scheduledFor) : null,
          seoMetaTitle: newPost.seo?.metaTitle,
          seoMetaDescription: newPost.seo?.metaDescription,
          seoFocusKeyword: newPost.seo?.focusKeyword,
          seoCanonicalUrl: newPost.seo?.canonicalUrl,
          seoOgImage: newPost.seo?.ogImage,
          seoNoIndex: Boolean(newPost.seo?.noIndex),
          seoNoFollow: Boolean(newPost.seo?.noFollow),
          createdAt: now,
          updatedAt: now,
        });
      } catch (err) {
        console.warn("MySQL insert error:", err);
      }
    }

    // 2. Always sync fallback file for dual resilience
    const fileDb = ensureFallbackFile();
    fileDb.posts = [newPost, ...fileDb.posts.filter((p) => p.id !== id && p.slug !== slug)];
    saveFallbackFile(fileDb);

    return newPost;
  },

  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const existing = await this.getPostById(id);
    if (!existing) return null;

    const now = new Date();
    const readingTime = updates.contentBlocks
      ? calculateReadingTime(updates.contentBlocks)
      : existing.readingTime;

    const updatedPost: BlogPost = {
      ...existing,
      ...updates,
      readingTime: readingTime || existing.readingTime,
      updatedAt: now.toISOString(),
    };

    if (updates.status === "published" && !updatedPost.publishedAt) {
      updatedPost.publishedAt = now.toISOString();
    }

    // 1. MySQL Update
    const { db, pool } = getDatabaseConnection();
    if (db && pool) {
      try {
        await ensureMySQLTables(pool);
        await db
          .update(schema.blogPosts)
          .set({
            title: updatedPost.title,
            slug: updatedPost.slug,
            excerpt: updatedPost.excerpt,
            contentBlocks: updatedPost.contentBlocks,
            featuredImage: updatedPost.featuredImage,
            featuredImageAlt: updatedPost.featuredImageAlt,
            featuredImageCaption: updatedPost.featuredImageCaption,
            authorName: updatedPost.author.name,
            authorRole: updatedPost.author.role,
            authorAvatar: updatedPost.author.avatar,
            categories: updatedPost.categories,
            tags: updatedPost.tags,
            status: updatedPost.status,
            views: updatedPost.views,
            readingTime: updatedPost.readingTime,
            publishedAt: updatedPost.publishedAt ? new Date(updatedPost.publishedAt) : null,
            scheduledFor: updatedPost.scheduledFor ? new Date(updatedPost.scheduledFor) : null,
            seoMetaTitle: updatedPost.seo?.metaTitle,
            seoMetaDescription: updatedPost.seo?.metaDescription,
            seoFocusKeyword: updatedPost.seo?.focusKeyword,
            seoCanonicalUrl: updatedPost.seo?.canonicalUrl,
            seoOgImage: updatedPost.seo?.ogImage,
            seoNoIndex: Boolean(updatedPost.seo?.noIndex),
            seoNoFollow: Boolean(updatedPost.seo?.noFollow),
            updatedAt: now,
          })
          .where(eq(schema.blogPosts.id, id));
      } catch (err) {
        console.warn("MySQL update error:", err);
      }
    }

    // 2. Sync fallback file
    const fileDb = ensureFallbackFile();
    fileDb.posts = fileDb.posts.map((p) => (p.id === id ? updatedPost : p));
    saveFallbackFile(fileDb);

    return updatedPost;
  },

  async deletePost(id: string): Promise<boolean> {
    // 1. MySQL Delete
    const { db, pool } = getDatabaseConnection();
    if (db && pool) {
      try {
        await ensureMySQLTables(pool);
        await db.delete(schema.blogPosts).where(eq(schema.blogPosts.id, id));
      } catch (err) {
        console.warn("MySQL delete error:", err);
      }
    }

    // 2. Sync fallback file
    const fileDb = ensureFallbackFile();
    const lenBefore = fileDb.posts.length;
    fileDb.posts = fileDb.posts.filter((p) => p.id !== id);
    saveFallbackFile(fileDb);

    return fileDb.posts.length !== lenBefore;
  },

  async getStatistics(): Promise<BlogStatistics> {
    const res = await this.getPosts({ pageSize: 1000 });
    const posts = res.posts;

    return {
      totalPosts: posts.length,
      publishedPosts: posts.filter((p) => p.status === "published").length,
      draftPosts: posts.filter((p) => p.status === "draft").length,
      scheduledPosts: posts.filter((p) => p.status === "scheduled").length,
      reviewPosts: posts.filter((p) => p.status === "review").length,
      totalViews: posts.reduce((acc, p) => acc + (p.views || 0), 0),
    };
  },

  async getCategories(): Promise<BlogCategory[]> {
    const { db, pool } = getDatabaseConnection();
    if (db && pool) {
      try {
        await ensureMySQLTables(pool);
        const rows = await db
          .select()
          .from(schema.blogCategories)
          .orderBy(asc(schema.blogCategories.name));
        if (rows.length > 0) {
          return rows.map((r: any) => ({
            id: r.id,
            name: r.name,
            slug: r.slug,
            description: r.description || undefined,
            color: r.color || "#C07DFF",
          }));
        }
      } catch (e) {
        console.warn("MySQL getCategories failed:", e);
      }
    }
    const fileDb = ensureFallbackFile();
    return fileDb.categories;
  },

  async createCategory(cat: Omit<BlogCategory, "id"> & { id?: string }): Promise<BlogCategory> {
    const id = cat.id || `cat-${slugify(cat.name)}-${Date.now()}`;
    const slug = cat.slug || slugify(cat.name);
    const newCat: BlogCategory = {
      id,
      name: cat.name,
      slug,
      description: cat.description,
      color: cat.color || "#C07DFF",
    };

    const { db, pool } = getDatabaseConnection();
    if (db && pool) {
      try {
        await ensureMySQLTables(pool);
        await db.insert(schema.blogCategories).values({
          id,
          name: cat.name,
          slug,
          description: cat.description || null,
          color: cat.color || "#C07DFF",
          createdAt: new Date(),
        }).onDuplicateKeyUpdate({
          set: {
            name: cat.name,
            description: cat.description || null,
            color: cat.color || "#C07DFF",
          },
        });
      } catch (e) {
        console.warn("MySQL createCategory error:", e);
      }
    }

    const fileDb = ensureFallbackFile();
    fileDb.categories = [newCat, ...fileDb.categories.filter((c) => c.slug !== slug)];
    saveFallbackFile(fileDb);

    return newCat;
  },

  async updateCategory(id: string, updates: Partial<BlogCategory>): Promise<BlogCategory | null> {
    const { db, pool } = getDatabaseConnection();
    if (db && pool) {
      try {
        await ensureMySQLTables(pool);
        await db
          .update(schema.blogCategories)
          .set({
            ...(updates.name ? { name: updates.name } : {}),
            ...(updates.slug ? { slug: updates.slug } : {}),
            ...(updates.description !== undefined ? { description: updates.description } : {}),
            ...(updates.color ? { color: updates.color } : {}),
          })
          .where(eq(schema.blogCategories.id, id));
      } catch (e) {
        console.warn("MySQL updateCategory error:", e);
      }
    }

    const fileDb = ensureFallbackFile();
    const idx = fileDb.categories.findIndex((c) => c.id === id);
    if (idx !== -1) {
      fileDb.categories[idx] = { ...fileDb.categories[idx], ...updates };
      saveFallbackFile(fileDb);
      return fileDb.categories[idx];
    }
    return null;
  },

  async deleteCategory(id: string): Promise<boolean> {
    const { db, pool } = getDatabaseConnection();
    if (db && pool) {
      try {
        await ensureMySQLTables(pool);
        await db.delete(schema.blogCategories).where(eq(schema.blogCategories.id, id));
      } catch (e) {
        console.warn("MySQL deleteCategory error:", e);
      }
    }
    const fileDb = ensureFallbackFile();
    const lenBefore = fileDb.categories.length;
    fileDb.categories = fileDb.categories.filter((c) => c.id !== id);
    saveFallbackFile(fileDb);
    return fileDb.categories.length !== lenBefore;
  },

  async getTags(): Promise<BlogTag[]> {
    const { db, pool } = getDatabaseConnection();
    if (db && pool) {
      try {
        await ensureMySQLTables(pool);
        const rows = await db
          .select()
          .from(schema.blogTags)
          .orderBy(asc(schema.blogTags.name));
        if (rows.length > 0) {
          return rows.map((r: any) => ({
            id: r.id,
            name: r.name,
            slug: r.slug,
          }));
        }
      } catch (e) {
        console.warn("MySQL getTags failed:", e);
      }
    }
    const fileDb = ensureFallbackFile();
    return fileDb.tags;
  },

  async createTag(tag: Omit<BlogTag, "id"> & { id?: string }): Promise<BlogTag> {
    const id = tag.id || `tag-${slugify(tag.name)}-${Date.now()}`;
    const slug = tag.slug || slugify(tag.name);
    const newTag: BlogTag = { id, name: tag.name, slug };

    const { db, pool } = getDatabaseConnection();
    if (db && pool) {
      try {
        await ensureMySQLTables(pool);
        await db.insert(schema.blogTags).values({
          id,
          name: tag.name,
          slug,
          createdAt: new Date(),
        }).onDuplicateKeyUpdate({
          set: { name: tag.name },
        });
      } catch (e) {
        console.warn("MySQL createTag error:", e);
      }
    }

    const fileDb = ensureFallbackFile();
    fileDb.tags = [newTag, ...fileDb.tags.filter((t) => t.slug !== slug)];
    saveFallbackFile(fileDb);

    return newTag;
  },

  async deleteTag(id: string): Promise<boolean> {
    const { db, pool } = getDatabaseConnection();
    if (db && pool) {
      try {
        await ensureMySQLTables(pool);
        await db.delete(schema.blogTags).where(eq(schema.blogTags.id, id));
      } catch (e) {
        console.warn("MySQL deleteTag error:", e);
      }
    }
    const fileDb = ensureFallbackFile();
    const lenBefore = fileDb.tags.length;
    fileDb.tags = fileDb.tags.filter((t) => t.id !== id);
    saveFallbackFile(fileDb);
    return fileDb.tags.length !== lenBefore;
  },

  async getMedia(): Promise<MediaItem[]> {
    const { db, pool } = getDatabaseConnection();
    if (db && pool) {
      try {
        await ensureMySQLTables(pool);
        const rows = await db
          .select()
          .from(schema.blogMedia)
          .orderBy(desc(schema.blogMedia.uploadedAt));
        return rows.map((r: any) => ({
          id: r.id,
          url: r.url,
          filename: r.filename,
          title: r.title,
          alt: r.alt || "",
          caption: r.caption || undefined,
          size: r.size || undefined,
          mimeType: r.mimeType || undefined,
          dimensions: r.dimensions || undefined,
          uploadedAt: r.uploadedAt ? new Date(r.uploadedAt).toISOString() : new Date().toISOString(),
        }));
      } catch (e) {
        console.warn("MySQL getMedia error:", e);
      }
    }
    const fileDb = ensureFallbackFile();
    return fileDb.media;
  },

  async updateMedia(
    id: string,
    updates: Partial<Pick<MediaItem, "title" | "alt" | "caption">>
  ): Promise<MediaItem | null> {
    const { db, pool } = getDatabaseConnection();
    if (db && pool) {
      try {
        await ensureMySQLTables(pool);
        const setValues: any = {};
        if (updates.title !== undefined) setValues.title = updates.title;
        if (updates.alt !== undefined) setValues.alt = updates.alt;
        if (updates.caption !== undefined) setValues.caption = updates.caption;

        if (Object.keys(setValues).length > 0) {
          await db
            .update(schema.blogMedia)
            .set(setValues)
            .where(eq(schema.blogMedia.id, id));
        }
      } catch (e) {
        console.warn("MySQL updateMedia error:", e);
      }
    }

    const fileDb = ensureFallbackFile();
    const idx = fileDb.media.findIndex((m) => m.id === id);
    if (idx !== -1) {
      fileDb.media[idx] = { ...fileDb.media[idx], ...updates };
      saveFallbackFile(fileDb);
      return fileDb.media[idx];
    }
    return null;
  },

  async addMedia(media: Omit<MediaItem, "id" | "uploadedAt">): Promise<MediaItem> {
    const id = `media-${Date.now()}`;
    const uploadedAt = new Date().toISOString();
    const newItem: MediaItem = { id, uploadedAt, ...media };

    const { db, pool } = getDatabaseConnection();
    if (db && pool) {
      try {
        await ensureMySQLTables(pool);
        await db.insert(schema.blogMedia).values({
          id,
          url: media.url,
          filename: media.filename,
          title: media.title,
          alt: media.alt || "",
          caption: media.caption || null,
          size: media.size || null,
          mimeType: media.mimeType || null,
          dimensions: media.dimensions || null,
          uploadedAt: new Date(uploadedAt),
        });
      } catch (e) {
        console.warn("MySQL addMedia error:", e);
      }
    }

    const fileDb = ensureFallbackFile();
    fileDb.media = [newItem, ...fileDb.media];
    saveFallbackFile(fileDb);

    return newItem;
  },

  async deleteMedia(id: string): Promise<boolean> {
    const { db, pool } = getDatabaseConnection();
    if (db && pool) {
      try {
        await ensureMySQLTables(pool);
        await db.delete(schema.blogMedia).where(eq(schema.blogMedia.id, id));
      } catch (e) {
        console.warn("MySQL deleteMedia error:", e);
      }
    }
    const fileDb = ensureFallbackFile();
    const lenBefore = fileDb.media.length;
    fileDb.media = fileDb.media.filter((m) => m.id !== id);
    saveFallbackFile(fileDb);
    return fileDb.media.length !== lenBefore;
  },
};
