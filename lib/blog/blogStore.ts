import {
  BlogPost,
  BlogCategory,
  BlogTag,
  MediaItem,
  BlogStatistics,
  PostFilterOptions,
  EditorBlock,
} from "./types";
import { slugify } from "./validation";
import { calculateReadingTime } from "./sanitize";

const STORAGE_KEY = "venom_tech_blog_data_v3";

const DEFAULT_CATEGORIES: BlogCategory[] = [
  {
    id: "cat-ai",
    name: "AI & Automation",
    slug: "ai-automation",
    description: "Enterprise RPA, custom LLMs, autonomous workflows, and machine intelligence.",
    color: "#3BC8F6",
  },
  {
    id: "cat-app",
    name: "App Development",
    slug: "app-development",
    description: "Next.js, Flutter, React Native, iOS Swift, and scalable cloud applications.",
    color: "#C07DFF",
  },
  {
    id: "cat-design",
    name: "Graphic Design",
    slug: "graphic-design",
    description: "Visual identity, brand systems, luxury UI/UX, and packaging design.",
    color: "#EC4899",
  },
  {
    id: "cat-seo",
    name: "SEO & Growth",
    slug: "seo-growth",
    description: "Search engine optimization, semantic search, Core Web Vitals, and organic growth.",
    color: "#10B981",
  },
  {
    id: "cat-strategy",
    name: "Strategy & Branding",
    slug: "strategy-branding",
    description: "Market positioning, digital transformation, and brand strategy for industry leaders.",
    color: "#F59E0B",
  },
  {
    id: "cat-bpo",
    name: "BPO Services",
    slug: "bpo-services",
    description: "Omnichannel customer care, technical support pods, and scalable back office.",
    color: "#8B5CF6",
  },
];

const DEFAULT_TAGS: BlogTag[] = [
  { id: "tag-ai", name: "AI Automation", slug: "ai-automation" },
  { id: "tag-nextjs", name: "Next.js 16", slug: "nextjs" },
  { id: "tag-branding", name: "Branding", slug: "branding" },
  { id: "tag-flutter", name: "Flutter", slug: "flutter" },
  { id: "tag-seo", name: "SEO Optimization", slug: "seo-optimization" },
  { id: "tag-design", name: "Design Systems", slug: "design-systems" },
  { id: "tag-growth", name: "Growth Strategy", slug: "growth-strategy" },
  { id: "tag-bpo", name: "BPO Operations", slug: "bpo-operations" },
];

const DEFAULT_MEDIA: MediaItem[] = [
  {
    id: "media-1",
    url: "/images/blog/blog-hero.webp",
    filename: "blog-hero.webp",
    title: "High Performance AI Computing Setup",
    alt: "Futuristic digital interface with high-tech coding monitors",
    caption: "Modern enterprise infrastructure powered by Venom Tech AI pods.",
    size: "340 KB",
    mimeType: "image/webp",
    uploadedAt: "2026-11-01",
    dimensions: "1920x1080",
  },
  {
    id: "media-2",
    url: "/images/services/ai-automation.webp",
    filename: "ai-automation.webp",
    title: "Autonomous Agent Flowchart",
    alt: "Diagram visualizing automated pipeline triggers",
    caption: "Pipeline integration across enterprise CRM and data stores.",
    size: "285 KB",
    mimeType: "image/webp",
    uploadedAt: "2026-11-02",
    dimensions: "1400x900",
  },
  {
    id: "media-3",
    url: "/images/services/app-development.webp",
    filename: "app-development.webp",
    title: "Cross Platform Mobile Framework",
    alt: "Mobile app interfaces displayed on smartphones",
    caption: "High frame-rate mobile engineering for iOS and Android.",
    size: "410 KB",
    mimeType: "image/webp",
    uploadedAt: "2026-11-03",
    dimensions: "1600x1000",
  },
  {
    id: "media-4",
    url: "/images/services/ui-design.webp",
    filename: "ui-design.webp",
    title: "Luxury Brand Typography & System",
    alt: "Design layout showing typography hierarchy and luxury accents",
    caption: "Brutalist and luxury visual identity craftsmanship.",
    size: "390 KB",
    mimeType: "image/webp",
    uploadedAt: "2026-11-04",
    dimensions: "1600x900",
  },
  {
    id: "media-5",
    url: "/images/services/predictive-analytics.webp",
    filename: "predictive-analytics.webp",
    title: "SEO Semantic Graph",
    alt: "Data visualization of ranking keyword clusters and search intent",
    caption: "Organic visibility scaling with deep keyword cluster architecture.",
    size: "315 KB",
    mimeType: "image/webp",
    uploadedAt: "2026-11-05",
    dimensions: "1440x900",
  },
];

const DEFAULT_POSTS: BlogPost[] = [
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
];

interface BlogDatabase {
  posts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  media: MediaItem[];
}

function loadDatabase(): BlogDatabase {
  if (typeof window !== "undefined") {
    try {
      // If legacy storage key exists, purge old sample posts and migrate
      if (localStorage.getItem("venom_tech_blog_data_v2")) {
        try {
          const old = JSON.parse(localStorage.getItem("venom_tech_blog_data_v2") || "{}");
          const realPosts = (old.posts || []).filter(
            (p: BlogPost) => !p.id.startsWith("post-") && !p.id.startsWith("sample-")
          );
          const migrated: BlogDatabase = {
            posts: realPosts,
            categories: old.categories || DEFAULT_CATEGORIES,
            tags: old.tags || DEFAULT_TAGS,
            media: old.media || DEFAULT_MEDIA,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        } catch {}
        localStorage.removeItem("venom_tech_blog_data_v2");
      }

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: BlogDatabase = JSON.parse(stored);
        if (parsed.posts && parsed.categories && parsed.tags) {
          // Filter out any legacy dummy sample posts
          parsed.posts = parsed.posts.filter(
            (p: BlogPost) => !p.id.startsWith("post-") && !p.id.startsWith("sample-")
          );
          // If stored posts are empty, populate with DEFAULT_POSTS test article
          if (parsed.posts.length === 0 && DEFAULT_POSTS.length > 0) {
            parsed.posts = DEFAULT_POSTS;
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
            } catch {}
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Failed reading blog database from localStorage:", e);
    }
  }

  return {
    posts: DEFAULT_POSTS,
    categories: DEFAULT_CATEGORIES,
    tags: DEFAULT_TAGS,
    media: DEFAULT_MEDIA,
  };
}

function saveDatabase(db: BlogDatabase): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
      window.dispatchEvent(new Event("venom_blog_updated"));
    } catch (e) {
      console.warn("Failed saving blog database to localStorage:", e);
    }
  }
}

export const BlogStore = {
  // Check and publish scheduled posts
  checkScheduled(): void {
    if (typeof window === "undefined") return;
    const db = loadDatabase();
    const now = new Date().toISOString();
    let updated = false;

    db.posts = db.posts.map((post) => {
      if (
        post.status === "scheduled" &&
        post.scheduledFor &&
        post.scheduledFor <= now
      ) {
        updated = true;
        return {
          ...post,
          status: "published",
          publishedAt: post.scheduledFor,
          updatedAt: now,
        };
      }
      return post;
    });

    if (updated) {
      saveDatabase(db);
    }
  },

  getPosts(options: PostFilterOptions = {}): {
    posts: BlogPost[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  } {
    this.checkScheduled();
    const db = loadDatabase();
    let result = [...db.posts];

    // Status filter
    if (options.status && options.status !== "all") {
      result = result.filter(
        (p) => p.status.toLowerCase() === options.status?.toLowerCase()
      );
    }

    // Category filter
    if (options.category && options.category !== "all") {
      result = result.filter((p) =>
        p.categories.some(
          (c) =>
            c.toLowerCase() === options.category?.toLowerCase() ||
            slugify(c) === slugify(options.category || "")
        )
      );
    }

    // Tag filter
    if (options.tag && options.tag !== "all") {
      result = result.filter((p) =>
        p.tags.some(
          (t) =>
            t.toLowerCase() === options.tag?.toLowerCase() ||
            slugify(t) === slugify(options.tag || "")
        )
      );
    }

    // Search query filter
    if (options.search && options.search.trim()) {
      const q = options.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.author.name.toLowerCase().includes(q) ||
          p.categories.some((c) => c.toLowerCase().includes(q))
      );
    }

    // Sorting
    const sort = options.sortBy || "newest";
    if (sort === "newest") {
      result.sort(
        (a, b) =>
          Date.parse(b.publishedAt || b.createdAt || "2026-01-01") -
          Date.parse(a.publishedAt || a.createdAt || "2026-01-01")
      );
    } else if (sort === "oldest") {
      result.sort(
        (a, b) =>
          Date.parse(a.publishedAt || a.createdAt || "2026-01-01") -
          Date.parse(b.publishedAt || b.createdAt || "2026-01-01")
      );
    } else if (sort === "views") {
      result.sort((a, b) => b.views - a.views);
    } else if (sort === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    const total = result.length;
    const page = options.page || 1;
    const pageSize = options.pageSize || 10;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    const paginated = result.slice((page - 1) * pageSize, page * pageSize);

    return {
      posts: paginated,
      total,
      page,
      pageSize,
      totalPages,
    };
  },

  getPostById(id: string): BlogPost | null {
    const db = loadDatabase();
    return db.posts.find((p) => p.id === id) || null;
  },

  getPostBySlug(slug: string): BlogPost | null {
    const db = loadDatabase();
    const cleanSlug = slugify(slug);
    const post = db.posts.find((p) => slugify(p.slug) === cleanSlug);
    if (post) {
      // Increment views on client read
      post.views = (post.views || 0) + 1;
      saveDatabase(db);
    }
    return post || null;
  },

  createPost(data: Partial<BlogPost>): BlogPost {
    const db = loadDatabase();
    const now = new Date().toISOString();

    const title = data.title?.trim() || "Untitled Article";
    let baseSlug = data.slug ? slugify(data.slug) : slugify(title);
    if (!baseSlug) baseSlug = `post-${Date.now()}`;

    // Ensure unique slug
    let finalSlug = baseSlug;
    let counter = 1;
    while (db.posts.some((p) => p.slug === finalSlug)) {
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    const readingTime = calculateReadingTime(data.contentBlocks || []);

    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title,
      slug: finalSlug,
      excerpt: data.excerpt || "",
      contentBlocks: data.contentBlocks || [
        {
          id: `b-${Date.now()}`,
          type: "paragraph",
          data: { text: "Start writing your article here..." },
        },
      ],
      featuredImage: data.featuredImage || "/images/blog/blog-hero.webp",
      featuredImageAlt: data.featuredImageAlt || title,
      author: data.author || {
        name: "Venom Editorial",
        role: "Editor",
        avatar: "/images/team/team-1.webp",
      },
      categories: data.categories || ["Strategy & Branding"],
      tags: data.tags || ["Next.js 16"],
      status: data.status || "draft",
      publishedAt: data.status === "published" ? now : undefined,
      scheduledFor: data.scheduledFor,
      createdAt: now,
      updatedAt: now,
      views: 0,
      readingTime,
      seo: data.seo || {
        metaTitle: title,
        metaDescription: data.excerpt || "",
        focusKeyword: "",
        noIndex: false,
        noFollow: false,
      },
      revisions: [
        {
          id: `rev-${Date.now()}`,
          savedAt: now,
          title,
          author: data.author?.name || "Venom Editorial",
          contentBlocks: data.contentBlocks || [],
          note: "Initial version",
        },
      ],
    };

    db.posts.unshift(newPost);
    saveDatabase(db);
    return newPost;
  },

  updatePost(id: string, updates: Partial<BlogPost>, recordRevision = true): BlogPost | null {
    const db = loadDatabase();
    const index = db.posts.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const existing = db.posts[index];
    const now = new Date().toISOString();

    let newSlug = existing.slug;
    if (updates.slug && slugify(updates.slug) !== existing.slug) {
      let candidate = slugify(updates.slug);
      let counter = 1;
      while (db.posts.some((p) => p.id !== id && p.slug === candidate)) {
        candidate = `${slugify(updates.slug)}-${counter}`;
        counter++;
      }
      newSlug = candidate;
    }

    const blocks = updates.contentBlocks !== undefined ? updates.contentBlocks : existing.contentBlocks;
    const readingTime = calculateReadingTime(blocks);

    let publishedAt = existing.publishedAt;
    if (updates.status === "published" && existing.status !== "published" && !existing.publishedAt) {
      publishedAt = now;
    }

    const updatedPost: BlogPost = {
      ...existing,
      ...updates,
      slug: newSlug,
      readingTime,
      publishedAt,
      updatedAt: now,
    };

    if (recordRevision && updates.contentBlocks) {
      const revisions = existing.revisions ? [...existing.revisions] : [];
      revisions.unshift({
        id: `rev-${Date.now()}`,
        savedAt: now,
        title: updatedPost.title,
        author: updatedPost.author.name,
        contentBlocks: updatedPost.contentBlocks,
        note: updates.status ? `Status changed to ${updates.status}` : "Content updated",
      });
      // Keep up to 15 revisions
      updatedPost.revisions = revisions.slice(0, 15);
    }

    db.posts[index] = updatedPost;
    saveDatabase(db);
    return updatedPost;
  },

  deletePost(id: string): boolean {
    const db = loadDatabase();
    const lenBefore = db.posts.length;
    db.posts = db.posts.filter((p) => p.id !== id);
    if (db.posts.length !== lenBefore) {
      saveDatabase(db);
      return true;
    }
    return false;
  },

  clearAllPosts(): void {
    if (typeof window === "undefined") return;
    const db = loadDatabase();
    db.posts = [];
    saveDatabase(db);
  },

  duplicatePost(id: string): BlogPost | null {
    const post = this.getPostById(id);
    if (!post) return null;

    return this.createPost({
      ...post,
      title: `${post.title} (Copy)`,
      slug: `${post.slug}-copy`,
      status: "draft",
    });
  },

  getStatistics(): BlogStatistics {
    this.checkScheduled();
    const db = loadDatabase();
    const totalPosts = db.posts.length;
    let publishedPosts = 0;
    let draftPosts = 0;
    let scheduledPosts = 0;
    let reviewPosts = 0;
    let totalViews = 0;

    db.posts.forEach((p) => {
      totalViews += p.views || 0;
      if (p.status === "published") publishedPosts++;
      else if (p.status === "draft") draftPosts++;
      else if (p.status === "scheduled") scheduledPosts++;
      else if (p.status === "review") reviewPosts++;
    });

    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      scheduledPosts,
      reviewPosts,
      totalViews,
    };
  },

  // Categories CRUD
  getCategories(): BlogCategory[] {
    const db = loadDatabase();
    return db.categories.map((c) => {
      const postCount = db.posts.filter((p) =>
        p.categories.some(
          (catName) =>
            catName.toLowerCase() === c.name.toLowerCase() ||
            slugify(catName) === c.slug
        )
      ).length;
      return { ...c, postCount };
    });
  },

  createCategory(data: Partial<BlogCategory>): BlogCategory {
    const db = loadDatabase();
    const name = data.name?.trim() || "New Category";
    let baseSlug = data.slug ? slugify(data.slug) : slugify(name);
    let finalSlug = baseSlug;
    let count = 1;
    while (db.categories.some((c) => c.slug === finalSlug)) {
      finalSlug = `${baseSlug}-${count}`;
      count++;
    }

    const newCat: BlogCategory = {
      id: `cat-${Date.now()}`,
      name,
      slug: finalSlug,
      description: data.description || "",
      color: data.color || "#C07DFF",
    };

    db.categories.push(newCat);
    saveDatabase(db);
    return newCat;
  },

  updateCategory(id: string, updates: Partial<BlogCategory>): BlogCategory | null {
    const db = loadDatabase();
    const idx = db.categories.findIndex((c) => c.id === id);
    if (idx === -1) return null;

    db.categories[idx] = {
      ...db.categories[idx],
      ...updates,
      slug: updates.slug ? slugify(updates.slug) : db.categories[idx].slug,
    };
    saveDatabase(db);
    return db.categories[idx];
  },

  deleteCategory(id: string): boolean {
    const db = loadDatabase();
    const len = db.categories.length;
    db.categories = db.categories.filter((c) => c.id !== id);
    if (db.categories.length !== len) {
      saveDatabase(db);
      return true;
    }
    return false;
  },

  // Tags CRUD
  getTags(): BlogTag[] {
    const db = loadDatabase();
    return db.tags.map((t) => {
      const postCount = db.posts.filter((p) =>
        p.tags.some(
          (tagName) =>
            tagName.toLowerCase() === t.name.toLowerCase() ||
            slugify(tagName) === t.slug
        )
      ).length;
      return { ...t, postCount };
    });
  },

  createTag(data: Partial<BlogTag>): BlogTag {
    const db = loadDatabase();
    const name = data.name?.trim() || "New Tag";
    let baseSlug = data.slug ? slugify(data.slug) : slugify(name);
    let finalSlug = baseSlug;
    let count = 1;
    while (db.tags.some((t) => t.slug === finalSlug)) {
      finalSlug = `${baseSlug}-${count}`;
      count++;
    }

    const newTag: BlogTag = {
      id: `tag-${Date.now()}`,
      name,
      slug: finalSlug,
    };

    db.tags.push(newTag);
    saveDatabase(db);
    return newTag;
  },

  deleteTag(id: string): boolean {
    const db = loadDatabase();
    const len = db.tags.length;
    db.tags = db.tags.filter((t) => t.id !== id);
    if (db.tags.length !== len) {
      saveDatabase(db);
      return true;
    }
    return false;
  },

  // Media Library CRUD
  getMedia(): MediaItem[] {
    const db = loadDatabase();
    return db.media;
  },

  addMedia(item: Partial<MediaItem>): MediaItem {
    const db = loadDatabase();
    const newMedia: MediaItem = {
      id: `media-${Date.now()}`,
      url: item.url || "/images/blog/blog-hero.webp",
      filename: item.filename || "upload.webp",
      title: item.title || "Uploaded Image",
      alt: item.alt || "Venom Tech Media",
      caption: item.caption || "",
      size: item.size || "250 KB",
      mimeType: item.mimeType || "image/webp",
      uploadedAt: new Date().toISOString().split("T")[0],
      dimensions: item.dimensions || "1200x800",
    };

    db.media.unshift(newMedia);
    saveDatabase(db);
    return newMedia;
  },

  deleteMedia(id: string): boolean {
    const db = loadDatabase();
    const len = db.media.length;
    db.media = db.media.filter((m) => m.id !== id);
    if (db.media.length !== len) {
      saveDatabase(db);
      return true;
    }
    return false;
  },
};
