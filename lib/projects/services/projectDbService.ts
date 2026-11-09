import fs from "fs";
import path from "path";
import { eq, asc, desc, and, like } from "drizzle-orm";
import { getDatabaseConnection, schema } from "@/db";
import { Project, NewProjectInput, UpdateProjectInput } from "../types";

const DATA_DIR = path.join(process.cwd(), "data");
const FALLBACK_FILE = path.join(DATA_DIR, "projects-db.json");

let mysqlFailed = false;

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "proj-aura-sound",
    title: "Aura Spatial Sound",
    subtitle: "Next.js Flagship / UI & UX",
    client: "Aura Technologies Inc.",
    service: "Graphic Design & UI/UX",
    year: "2026",
    progress: 92,
    status: "Final Review",
    team: "Design Pod 01",
    dueDate: "Nov 15, 2026",
    liveUrl: "https://aura-sound.io",
    caseStudyUrl: "/screens/portfolio",
    buttonText: "Live Project ↗",
    image: "/images/services/ai-automation.webp",
    mockupType: "laptop",
    color: "from-stone-900 to-black",
    tags: ["Next.js", "UI/UX", "Spatial Audio"],
    displayOrder: 1,
    isFeatured: true,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj-studio-form",
    title: "Studio Form & Space",
    subtitle: "Brand Identity / Packaging",
    client: "Studio Form & Space LLC",
    service: "Branding",
    year: "2026",
    progress: 100,
    status: "Completed",
    team: "Brand Pod 02",
    dueDate: "Delivered",
    liveUrl: "https://studioform.design",
    caseStudyUrl: "/screens/portfolio",
    buttonText: "View Showcase ↗",
    image: "/images/services/ui-design.webp",
    mockupType: "bag",
    color: "from-stone-800 to-neutral-900",
    tags: ["Brand Identity", "Packaging", "Visual System"],
    displayOrder: 2,
    isFeatured: true,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj-verve-kinetic",
    title: "Verve Kinetic Type",
    subtitle: "Spatial Motion / 3D Canvas",
    client: "Verve Media Labs",
    service: "Development",
    year: "2025",
    progress: 100,
    status: "Completed",
    team: "Creative Tech Pod",
    dueDate: "Delivered",
    liveUrl: "https://verve-kinetic.art",
    caseStudyUrl: "/screens/portfolio",
    buttonText: "Explore Platform ↗",
    image: "/images/services/animation.webp",
    mockupType: "editorial",
    color: "from-neutral-950 to-black",
    tags: ["React", "WebGL", "3D Canvas", "Motion"],
    displayOrder: 3,
    isFeatured: true,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj-nexus-ecommerce",
    title: "Nexus E-Commerce Automation Pipeline",
    subtitle: "Multi-Vendor Sync & Smart Logistics",
    client: "Nexus Retail Group",
    service: "AI Automation",
    year: "2026",
    progress: 75,
    status: "Active Sprint",
    team: "AI Engineering",
    dueDate: "Nov 24, 2026",
    liveUrl: "https://nexus-retail.com",
    caseStudyUrl: "/screens/portfolio",
    buttonText: "Live Pipeline ↗",
    image: "/images/services/e-commerce.webp",
    mockupType: "custom_image",
    color: "from-stone-900 to-zinc-950",
    tags: ["Automation", "E-Commerce", "Next.js"],
    displayOrder: 4,
    isFeatured: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj-fintech-wallet",
    title: "FinTech Digital Wallet iOS & Android",
    subtitle: "Cross-Platform Microfinance App",
    client: "PayWave Microfinance",
    service: "App Development",
    year: "2026",
    progress: 60,
    status: "Active Sprint",
    team: "Mobile Engineering",
    dueDate: "Dec 05, 2026",
    liveUrl: "https://paywave.app",
    caseStudyUrl: "/screens/portfolio",
    buttonText: "App Prototype ↗",
    image: "/images/services/app-development.webp",
    mockupType: "custom_image",
    color: "from-slate-900 to-neutral-950",
    tags: ["iOS", "Android", "FinTech", "Flutter"],
    displayOrder: 5,
    isFeatured: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj-seo-dominance",
    title: "Nationwide SEO Dominance Campaign",
    subtitle: "Semantic Keyword Architecture & Core Vitals",
    client: "Prime Real Estate Lahore",
    service: "SEO Services",
    year: "2026",
    progress: 88,
    status: "Active Sprint",
    team: "SEO & Growth",
    dueDate: "Nov 30, 2026",
    liveUrl: "https://primerealestate.pk",
    caseStudyUrl: "/screens/portfolio",
    buttonText: "Ranking Report ↗",
    image: "/images/services/digital-marketing.webp",
    mockupType: "custom_image",
    color: "from-zinc-900 to-stone-900",
    tags: ["SEO", "Organic Growth", "Analytics"],
    displayOrder: 6,
    isFeatured: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj-meta-google-ads",
    title: "Q4 Meta & Google Performance Ads",
    subtitle: "Omnichannel Performance Funnels",
    client: "Velocity Apparel",
    service: "Advertising Agency",
    year: "2026",
    progress: 100,
    status: "Completed",
    team: "Media Buying",
    dueDate: "Delivered",
    liveUrl: "https://velocityapparel.com",
    caseStudyUrl: "/screens/portfolio",
    buttonText: "Campaign Metrics ↗",
    image: "/images/services/lead-funnels.webp",
    mockupType: "custom_image",
    color: "from-black to-stone-950",
    tags: ["PPC", "Meta Ads", "Conversion Rate"],
    displayOrder: 7,
    isFeatured: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function getFallbackData(): Project[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(FALLBACK_FILE)) {
      const raw = fs.readFileSync(FALLBACK_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Failed reading projects fallback file:", e);
  }
  saveFallbackData(DEFAULT_PROJECTS);
  return DEFAULT_PROJECTS;
}

function saveFallbackData(projects: Project[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(projects, null, 2), "utf-8");
  } catch (e) {
    console.warn("Failed writing projects fallback file:", e);
  }
}

function parseJsonSafe<T>(val: any, fallback: T): T {
  if (val === null || val === undefined) return fallback;
  if (typeof val === "object") return val as T;
  if (typeof val === "string") {
    try {
      return JSON.parse(val) as T;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

function rowToProject(r: any): Project {
  return {
    id: r.id,
    title: r.title,
    subtitle: r.subtitle || "",
    client: r.client || "",
    service: r.service || "Web Design",
    year: r.year || "2026",
    progress: Number(r.progress ?? 100),
    status: r.status || "Completed",
    team: r.team || "Engineering Pod",
    dueDate: r.dueDate || r.due_date || "Delivered",
    liveUrl: r.liveUrl || r.live_url || "",
    caseStudyUrl: r.caseStudyUrl || r.case_study_url || "",
    buttonText: r.buttonText || r.button_text || "Live Project ↗",
    image: r.image || "",
    mockupType: r.mockupType || r.mockup_type || "custom_image",
    color: r.color || "from-stone-900 to-black",
    tags: parseJsonSafe(r.tags, []),
    displayOrder: Number(r.displayOrder ?? r.display_order ?? 0),
    isFeatured: Boolean(r.isFeatured ?? r.is_featured),
    isActive: Boolean(r.isActive ?? r.is_active),
    createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt || r.created_at || new Date().toISOString()),
    updatedAt: r.updatedAt instanceof Date ? r.updatedAt.toISOString() : String(r.updatedAt || r.updated_at || new Date().toISOString()),
  };
}

export class ProjectDbService {
  /**
   * Fetch all projects with flexible filtering (status, featured, search)
   */
  static async getAll(options: {
    status?: string;
    isFeatured?: boolean;
    onlyActive?: boolean;
    search?: string;
  } = {}): Promise<Project[]> {
    const { db, pool } = getDatabaseConnection();

    if (pool && db && !mysqlFailed) {
      try {
        let query = db.select().from(schema.projects);
        const conditions: any[] = [];

        if (options.onlyActive) {
          conditions.push(eq(schema.projects.isActive, true));
        }
        if (options.isFeatured !== undefined) {
          conditions.push(eq(schema.projects.isFeatured, options.isFeatured));
        }
        if (options.status && options.status !== "all") {
          conditions.push(eq(schema.projects.status, options.status));
        }
        if (options.search) {
          conditions.push(like(schema.projects.title, `%${options.search}%`));
        }

        if (conditions.length > 0) {
          query = query.where(and(...conditions));
        }

        const rows = await query.orderBy(asc(schema.projects.displayOrder), desc(schema.projects.createdAt));

        if (rows && rows.length > 0) {
          return rows.map(rowToProject);
        }
      } catch (err: any) {
        if (err?.code === "ECONNREFUSED" || err?.cause?.code === "ECONNREFUSED") {
          mysqlFailed = true;
        }
        console.warn("MySQL query failed for projects, using fallback:", err);
      }
    }

    // Fallback file
    let list = getFallbackData();
    if (options.onlyActive) {
      list = list.filter((p) => p.isActive);
    }
    if (options.isFeatured !== undefined) {
      list = list.filter((p) => p.isFeatured === options.isFeatured);
    }
    if (options.status && options.status !== "all") {
      list = list.filter((p) => p.status.toLowerCase() === options.status?.toLowerCase());
    }
    if (options.search) {
      const q = options.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.client.toLowerCase().includes(q) ||
          p.service.toLowerCase().includes(q)
      );
    }

    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  /**
   * Fetch single project by ID
   */
  static async getById(id: string): Promise<Project | null> {
    const { db, pool } = getDatabaseConnection();

    if (pool && db && !mysqlFailed) {
      try {
        const rows = await db
          .select()
          .from(schema.projects)
          .where(eq(schema.projects.id, id))
          .limit(1);

        if (rows && rows.length > 0) {
          return rowToProject(rows[0]);
        }
      } catch (err: any) {
        if (err?.code === "ECONNREFUSED" || err?.cause?.code === "ECONNREFUSED") {
          mysqlFailed = true;
        }
        console.warn("MySQL query failed for project by id:", err);
      }
    }

    const fallback = getFallbackData();
    return fallback.find((p) => p.id === id) || null;
  }

  /**
   * Create a new project
   */
  static async create(input: NewProjectInput): Promise<Project> {
    const id = input.id || `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date();

    const newProject: Project = {
      id,
      title: input.title.trim(),
      subtitle: (input.subtitle || "").trim(),
      client: (input.client || "").trim(),
      service: input.service || "Web Design",
      year: input.year || String(now.getFullYear()),
      progress: Math.min(100, Math.max(0, Number(input.progress ?? 100))),
      status: input.status || "Active Sprint",
      team: (input.team || "Engineering Pod").trim(),
      dueDate: (input.dueDate || "Nov 2026").trim(),
      liveUrl: (input.liveUrl || "").trim(),
      caseStudyUrl: (input.caseStudyUrl || "").trim(),
      buttonText: (input.buttonText || "Live Project ↗").trim(),
      image: (input.image || "").trim(),
      mockupType: input.mockupType || "custom_image",
      color: input.color || "from-stone-900 to-black",
      tags: input.tags || [],
      displayOrder: Number(input.displayOrder ?? 0),
      isFeatured: Boolean(input.isFeatured),
      isActive: input.isActive ?? true,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    const { db, pool } = getDatabaseConnection();
    if (pool && db && !mysqlFailed) {
      try {
        await db.insert(schema.projects).values({
          id: newProject.id,
          title: newProject.title,
          subtitle: newProject.subtitle,
          client: newProject.client,
          service: newProject.service,
          year: newProject.year,
          progress: newProject.progress,
          status: newProject.status,
          team: newProject.team,
          dueDate: newProject.dueDate,
          liveUrl: newProject.liveUrl,
          caseStudyUrl: newProject.caseStudyUrl,
          buttonText: newProject.buttonText,
          image: newProject.image,
          mockupType: newProject.mockupType,
          color: newProject.color,
          tags: newProject.tags,
          displayOrder: newProject.displayOrder,
          isFeatured: newProject.isFeatured,
          isActive: newProject.isActive,
          createdAt: now,
          updatedAt: now,
        });
      } catch (err: any) {
        if (err?.code === "ECONNREFUSED" || err?.cause?.code === "ECONNREFUSED") {
          mysqlFailed = true;
        }
        console.warn("MySQL insert failed for project:", err);
      }
    }

    // Mirror to fallback
    const list = getFallbackData();
    list.push(newProject);
    saveFallbackData(list);

    return newProject;
  }

  /**
   * Update an existing project
   */
  static async update(id: string, input: UpdateProjectInput): Promise<Project | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const now = new Date();
    const updated: Project = {
      ...existing,
      ...input,
      updatedAt: now.toISOString(),
    };

    const { db, pool } = getDatabaseConnection();
    if (pool && db && !mysqlFailed) {
      try {
        await db
          .update(schema.projects)
          .set({
            title: updated.title,
            subtitle: updated.subtitle,
            client: updated.client,
            service: updated.service,
            year: updated.year,
            progress: updated.progress,
            status: updated.status,
            team: updated.team,
            dueDate: updated.dueDate,
            liveUrl: updated.liveUrl,
            caseStudyUrl: updated.caseStudyUrl,
            buttonText: updated.buttonText,
            image: updated.image,
            mockupType: updated.mockupType,
            color: updated.color,
            tags: updated.tags,
            displayOrder: updated.displayOrder,
            isFeatured: updated.isFeatured,
            isActive: updated.isActive,
            updatedAt: now,
          })
          .where(eq(schema.projects.id, id));
      } catch (err: any) {
        if (err?.code === "ECONNREFUSED" || err?.cause?.code === "ECONNREFUSED") {
          mysqlFailed = true;
        }
        console.warn("MySQL update failed for project:", err);
      }
    }

    // Mirror to fallback
    const list = getFallbackData();
    const idx = list.findIndex((p) => p.id === id);
    if (idx !== -1) {
      list[idx] = updated;
      saveFallbackData(list);
    }

    return updated;
  }

  /**
   * Delete a project
   */
  static async delete(id: string): Promise<boolean> {
    const { db, pool } = getDatabaseConnection();
    if (pool && db && !mysqlFailed) {
      try {
        await db.delete(schema.projects).where(eq(schema.projects.id, id));
      } catch (err: any) {
        if (err?.code === "ECONNREFUSED" || err?.cause?.code === "ECONNREFUSED") {
          mysqlFailed = true;
        }
        console.warn("MySQL delete failed for project:", err);
      }
    }

    const list = getFallbackData();
    const filtered = list.filter((p) => p.id !== id);
    saveFallbackData(filtered);

    return true;
  }

  /**
   * Toggle featured on homepage
   */
  static async toggleFeatured(id: string): Promise<Project | null> {
    const existing = await this.getById(id);
    if (!existing) return null;
    return this.update(id, { isFeatured: !existing.isFeatured });
  }

  /**
   * Toggle active state
   */
  static async toggleActive(id: string): Promise<Project | null> {
    const existing = await this.getById(id);
    if (!existing) return null;
    return this.update(id, { isActive: !existing.isActive });
  }
}

