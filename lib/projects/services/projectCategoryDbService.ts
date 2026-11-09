import fs from "fs";
import path from "path";
import { eq, asc } from "drizzle-orm";
import { getDatabaseConnection, schema } from "@/db";
import { ProjectCategory, NewProjectCategoryInput } from "../types";

const DATA_DIR = path.join(process.cwd(), "data");
const FALLBACK_CATEGORIES_FILE = path.join(DATA_DIR, "project-categories.json");

let mysqlFailed = false;

const DEFAULT_CATEGORIES: ProjectCategory[] = [
  {
    id: "cat-web-design",
    name: "Web Design",
    slug: "web-design",
    description: "Custom bespoke websites, high-performance web applications, and landing pages",
    color: "#C07DFF",
    displayOrder: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cat-branding",
    name: "Branding",
    slug: "branding",
    description: "Brand identities, visual systems, guidelines, and packaging",
    color: "#3BC8F6",
    displayOrder: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cat-development",
    name: "Development",
    slug: "development",
    description: "Full-stack engineering, interactive 3D WebGL platforms, and cloud backends",
    color: "#F59E0B",
    displayOrder: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cat-ai-automation",
    name: "AI Automation",
    slug: "ai-automation",
    description: "Autonomous agents, workflow orchestration, and generative intelligence",
    color: "#10B981",
    displayOrder: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cat-app-dev",
    name: "App Development",
    slug: "app-development",
    description: "Cross-platform mobile apps for iOS and Android built on React Native & Flutter",
    color: "#EC4899",
    displayOrder: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cat-seo",
    name: "SEO Services",
    slug: "seo-services",
    description: "Algorithmic search dominance, semantic indexation, and technical site performance",
    color: "#8B5CF6",
    displayOrder: 6,
    createdAt: new Date().toISOString(),
  },
];

function getFallbackData(): ProjectCategory[] {
  try {
    if (!fs.existsSync(FALLBACK_CATEGORIES_FILE)) {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(FALLBACK_CATEGORIES_FILE, JSON.stringify(DEFAULT_CATEGORIES, null, 2), "utf-8");
      return DEFAULT_CATEGORIES;
    }
    const raw = fs.readFileSync(FALLBACK_CATEGORIES_FILE, "utf-8");
    return JSON.parse(raw) as ProjectCategory[];
  } catch (e) {
    console.warn("Failed reading project categories fallback file:", e);
    return DEFAULT_CATEGORIES;
  }
}

function saveFallbackData(categories: ProjectCategory[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(FALLBACK_CATEGORIES_FILE, JSON.stringify(categories, null, 2), "utf-8");
  } catch (e) {
    console.warn("Failed writing project categories fallback file:", e);
  }
}

export class ProjectCategoryDbService {
  /**
   * Fetch all project categories with project counts
   */
  static async getAll(): Promise<ProjectCategory[]> {
    const { db, pool } = getDatabaseConnection();

    if (pool && db && !mysqlFailed) {
      try {
        const rows = await db
          .select()
          .from(schema.projectCategories)
          .orderBy(asc(schema.projectCategories.displayOrder));

        if (rows && rows.length > 0) {
          // Fetch project count per category
          const [projects] = await pool.query("SELECT service FROM projects WHERE is_active = 1");
          const counts: Record<string, number> = {};
          if (Array.isArray(projects)) {
            projects.forEach((p: any) => {
              const s = (p.service || "").toLowerCase();
              counts[s] = (counts[s] || 0) + 1;
            });
          }

          return rows.map((r: any) => ({
            id: r.id,
            name: r.name,
            slug: r.slug,
            description: r.description || "",
            color: r.color || "#3BC8F6",
            displayOrder: Number(r.displayOrder ?? 0),
            projectCount: counts[r.name.toLowerCase()] || 0,
            createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt),
          }));
        }
      } catch (err: any) {
        if (err?.code === "ECONNREFUSED" || err?.cause?.code === "ECONNREFUSED") {
          mysqlFailed = true;
        }
        console.warn("MySQL query failed for project categories, using fallback:", err);
      }
    }

    return getFallbackData();
  }

  /**
   * Fetch single category by ID
   */
  static async getById(id: string): Promise<ProjectCategory | null> {
    const list = await this.getAll();
    return list.find((c) => c.id === id) || null;
  }

  /**
   * Create a new category
   */
  static async create(input: NewProjectCategoryInput): Promise<ProjectCategory> {
    const id = input.id || `cat-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date();
    const slug = (input.slug || input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")).replace(/(^-|-$)/g, "");

    const newCategory: ProjectCategory = {
      id,
      name: input.name.trim(),
      slug,
      description: (input.description || "").trim(),
      color: input.color || "#3BC8F6",
      displayOrder: Number(input.displayOrder ?? 0),
      projectCount: 0,
      createdAt: now.toISOString(),
    };

    const { db, pool } = getDatabaseConnection();
    if (pool && db && !mysqlFailed) {
      try {
        await db.insert(schema.projectCategories).values({
          id: newCategory.id,
          name: newCategory.name,
          slug: newCategory.slug,
          description: newCategory.description,
          color: newCategory.color,
          displayOrder: newCategory.displayOrder,
          createdAt: now,
        });
      } catch (err: any) {
        if (err?.code === "ECONNREFUSED" || err?.cause?.code === "ECONNREFUSED") {
          mysqlFailed = true;
        }
        console.warn("MySQL insert failed for project category:", err);
      }
    }

    const list = getFallbackData();
    list.push(newCategory);
    saveFallbackData(list);

    return newCategory;
  }

  /**
   * Update category
   */
  static async update(id: string, input: Partial<NewProjectCategoryInput>): Promise<ProjectCategory | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const updated: ProjectCategory = {
      ...existing,
      ...input,
    };

    const { db, pool } = getDatabaseConnection();
    if (pool && db && !mysqlFailed) {
      try {
        await db
          .update(schema.projectCategories)
          .set({
            name: updated.name,
            slug: updated.slug,
            description: updated.description,
            color: updated.color,
            displayOrder: updated.displayOrder,
          })
          .where(eq(schema.projectCategories.id, id));
      } catch (err: any) {
        if (err?.code === "ECONNREFUSED" || err?.cause?.code === "ECONNREFUSED") {
          mysqlFailed = true;
        }
        console.warn("MySQL update failed for project category:", err);
      }
    }

    const list = getFallbackData().map((c) => (c.id === id ? updated : c));
    saveFallbackData(list);

    return updated;
  }

  /**
   * Delete category
   */
  static async delete(id: string): Promise<boolean> {
    const { db, pool } = getDatabaseConnection();
    if (pool && db && !mysqlFailed) {
      try {
        await db.delete(schema.projectCategories).where(eq(schema.projectCategories.id, id));
      } catch (err: any) {
        if (err?.code === "ECONNREFUSED" || err?.cause?.code === "ECONNREFUSED") {
          mysqlFailed = true;
        }
        console.warn("MySQL delete failed for project category:", err);
      }
    }

    const list = getFallbackData().filter((c) => c.id !== id);
    saveFallbackData(list);

    return true;
  }
}

