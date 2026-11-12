import { eq, desc, and, asc } from "drizzle-orm";
import { getDatabaseConnection, schema } from "@/db";
import {
  Job,
  NewJobInput,
  UpdateJobInput,
  JobStatus,
  EmploymentType,
  WorkMode,
  normalizeApplyFormConfig,
} from "../types";
import {
  parseJsonSafe,
  readFallbackJson,
  writeFallbackJson,
  isMysqlRefusedError,
  slugifyText,
} from "./storageHelpers";

const FALLBACK_FILE = "jobs-db.json";
let mysqlCooldownUntil = 0;

function canUseMysql(): boolean {
  return Date.now() >= mysqlCooldownUntil;
}

function noteMysqlError(err: any, context: string) {
  if (isMysqlRefusedError(err)) {
    mysqlCooldownUntil = Date.now() + 15000;
  }
  console.warn(`MySQL ${context} failed for job, using fallback:`, err);
}

function rowToJob(r: any): Job {
  return {
    id: r.id,
    title: r.title,
    slug: r.slug || slugifyText(r.title || r.id),
    department: r.department || "Engineering",
    employmentType: (r.employmentType || r.employment_type || "Full-Time") as EmploymentType,
    workMode: (r.workMode || r.work_mode || "Hybrid") as WorkMode,
    location: r.location || "Lahore, Pakistan",
    experienceLevel: r.experienceLevel || r.experience_level || "Mid-Level",
    salaryRange: r.salaryRange || r.salary_range || "Competitive",
    summary: r.summary || "",
    description: r.description || "",
    requirements: parseJsonSafe<string[]>(r.requirements, []),
    benefits: parseJsonSafe<string[]>(r.benefits, []),
    applyFormConfig: normalizeApplyFormConfig(
      parseJsonSafe(r.applyFormConfig ?? r.apply_form_config, null)
    ),
    status: (r.status as JobStatus) || "Open",
    isFeatured: Boolean(r.isFeatured ?? r.is_featured ?? false),
    applicationDeadline: r.applicationDeadline ?? r.application_deadline ?? "",
    displayOrder: Number(r.displayOrder ?? r.display_order ?? 0),
    createdAt:
      r.createdAt instanceof Date
        ? r.createdAt.toISOString()
        : String(r.createdAt || r.created_at || new Date().toISOString()),
    updatedAt:
      r.updatedAt instanceof Date
        ? r.updatedAt.toISOString()
        : String(r.updatedAt || r.updated_at || new Date().toISOString()),
  };
}

export class JobDbService {
  /**
   * Fetch all jobs with optional status, department, workMode, and search filtering.
   */
  static async getAll(
    options: {
      status?: string;
      department?: string;
      workMode?: string;
      search?: string;
    } = {}
  ): Promise<Job[]> {
    const { db, pool } = getDatabaseConnection();
    let list: Job[] | null = null;

    if (pool && db && canUseMysql()) {
      try {
        let query = db.select().from(schema.jobs);
        const conditions: any[] = [];

        if (options.status && options.status !== "All") {
          conditions.push(eq(schema.jobs.status, options.status));
        }
        if (options.department && options.department !== "All") {
          conditions.push(eq(schema.jobs.department, options.department));
        }
        if (options.workMode && options.workMode !== "All") {
          conditions.push(eq(schema.jobs.workMode, options.workMode));
        }

        if (conditions.length > 0) {
          query = query.where(and(...conditions));
        }

        const rows = await query.orderBy(
          desc(schema.jobs.isFeatured),
          asc(schema.jobs.displayOrder),
          desc(schema.jobs.createdAt)
        );
        if (rows) {
          list = rows.map(rowToJob);
        }
      } catch (err: any) {
        noteMysqlError(err, "query");
      }
    }

    if (!list) {
      list = readFallbackJson<Job>(FALLBACK_FILE).map(rowToJob);
      if (options.status && options.status !== "All") {
        list = list.filter((j) => j.status === options.status);
      }
      if (options.department && options.department !== "All") {
        list = list.filter((j) => j.department === options.department);
      }
      if (options.workMode && options.workMode !== "All") {
        list = list.filter((j) => j.workMode === options.workMode);
      }
      list.sort((a, b) => {
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
        if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }

    if (options.search && options.search.trim()) {
      const q = options.search.toLowerCase().trim();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.department.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.summary.toLowerCase().includes(q) ||
          j.requirements.some((req) => req.toLowerCase().includes(q))
      );
    }

    return list;
  }

  /**
   * Fetch single job by ID or slug.
   */
  static async getById(idOrSlug: string): Promise<Job | null> {
    const { db, pool } = getDatabaseConnection();

    if (pool && db && canUseMysql()) {
      try {
        const byId = await db
          .select()
          .from(schema.jobs)
          .where(eq(schema.jobs.id, idOrSlug))
          .limit(1);
        if (byId && byId.length > 0) return rowToJob(byId[0]);

        const bySlug = await db
          .select()
          .from(schema.jobs)
          .where(eq(schema.jobs.slug, idOrSlug))
          .limit(1);
        if (bySlug && bySlug.length > 0) return rowToJob(bySlug[0]);
      } catch (err: any) {
        noteMysqlError(err, "getById");
      }
    }

    const fallback = readFallbackJson<Job>(FALLBACK_FILE).map(rowToJob);
    return fallback.find((j) => j.id === idOrSlug || j.slug === idOrSlug) || null;
  }

  /**
   * Create a new job posting.
   */
  static async create(input: NewJobInput): Promise<Job> {
    const id = `job-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date();
    const baseSlug = slugifyText(input.slug || input.title) || id;

    const newJob: Job = {
      id,
      title: input.title.trim(),
      slug: `${baseSlug}-${id.slice(-4)}`,
      department: (input.department || "Engineering").trim(),
      employmentType: input.employmentType || "Full-Time",
      workMode: input.workMode || "Hybrid",
      location: (input.location || "Lahore, Pakistan").trim(),
      experienceLevel: (input.experienceLevel || "Mid-Level").trim(),
      salaryRange: (input.salaryRange || "Competitive").trim(),
      summary: (input.summary || "").trim(),
      description: (input.description || "").trim(),
      requirements: Array.isArray(input.requirements)
        ? input.requirements.map((r) => r.trim()).filter(Boolean)
        : [],
      benefits: Array.isArray(input.benefits)
        ? input.benefits.map((b) => b.trim()).filter(Boolean)
        : [],
      applyFormConfig: normalizeApplyFormConfig(input.applyFormConfig),
      status: input.status || "Open",
      isFeatured: Boolean(input.isFeatured),
      applicationDeadline: (input.applicationDeadline || "").trim(),
      displayOrder: Number(input.displayOrder ?? 0),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    const { db, pool } = getDatabaseConnection();
    if (pool && db && canUseMysql()) {
      try {
        await db.insert(schema.jobs).values({
          id: newJob.id,
          title: newJob.title,
          slug: newJob.slug,
          department: newJob.department,
          employmentType: newJob.employmentType,
          workMode: newJob.workMode,
          location: newJob.location,
          experienceLevel: newJob.experienceLevel,
          salaryRange: newJob.salaryRange,
          summary: newJob.summary,
          description: newJob.description,
          requirements: newJob.requirements,
          benefits: newJob.benefits,
          applyFormConfig: newJob.applyFormConfig,
          status: newJob.status,
          isFeatured: newJob.isFeatured,
          applicationDeadline: newJob.applicationDeadline,
          displayOrder: newJob.displayOrder,
          createdAt: now,
          updatedAt: now,
        });
      } catch (err: any) {
        noteMysqlError(err, "insert");
      }
    }

    const list = readFallbackJson<Job>(FALLBACK_FILE);
    list.unshift(newJob);
    writeFallbackJson(FALLBACK_FILE, list);

    return newJob;
  }

  /**
   * Update an existing job posting.
   */
  static async update(id: string, input: UpdateJobInput): Promise<Job | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const now = new Date();
    const updated: Job = {
      ...existing,
      ...input,
      title: input.title !== undefined ? input.title.trim() : existing.title,
      department: input.department !== undefined ? input.department.trim() : existing.department,
      location: input.location !== undefined ? input.location.trim() : existing.location,
      experienceLevel:
        input.experienceLevel !== undefined ? input.experienceLevel.trim() : existing.experienceLevel,
      salaryRange: input.salaryRange !== undefined ? input.salaryRange.trim() : existing.salaryRange,
      summary: input.summary !== undefined ? input.summary.trim() : existing.summary,
      description: input.description !== undefined ? input.description.trim() : existing.description,
      requirements:
        input.requirements !== undefined
          ? input.requirements.map((r) => r.trim()).filter(Boolean)
          : existing.requirements,
      benefits:
        input.benefits !== undefined
          ? input.benefits.map((b) => b.trim()).filter(Boolean)
          : existing.benefits,
      applyFormConfig:
        input.applyFormConfig !== undefined
          ? normalizeApplyFormConfig({ ...existing.applyFormConfig, ...input.applyFormConfig })
          : existing.applyFormConfig,
      applicationDeadline:
        input.applicationDeadline !== undefined
          ? input.applicationDeadline.trim()
          : existing.applicationDeadline,
      updatedAt: now.toISOString(),
    };

    const { db, pool } = getDatabaseConnection();
    if (pool && db && canUseMysql()) {
      try {
        await db
          .update(schema.jobs)
          .set({
            title: updated.title,
            slug: updated.slug,
            department: updated.department,
            employmentType: updated.employmentType,
            workMode: updated.workMode,
            location: updated.location,
            experienceLevel: updated.experienceLevel,
            salaryRange: updated.salaryRange,
            summary: updated.summary,
            description: updated.description,
            requirements: updated.requirements,
            benefits: updated.benefits,
            applyFormConfig: updated.applyFormConfig,
            status: updated.status,
            isFeatured: updated.isFeatured,
            applicationDeadline: updated.applicationDeadline,
            displayOrder: updated.displayOrder,
            updatedAt: now,
          })
          .where(eq(schema.jobs.id, id));
      } catch (err: any) {
        noteMysqlError(err, "update");
      }
    }

    const list = readFallbackJson<Job>(FALLBACK_FILE).map((j) => (j.id === id ? updated : j));
    writeFallbackJson(FALLBACK_FILE, list);

    return updated;
  }

  /**
   * Delete a job posting by ID.
   */
  static async delete(id: string): Promise<boolean> {
    const { db, pool } = getDatabaseConnection();
    if (pool && db && canUseMysql()) {
      try {
        await db.delete(schema.jobs).where(eq(schema.jobs.id, id));
      } catch (err: any) {
        noteMysqlError(err, "delete");
      }
    }

    const list = readFallbackJson<Job>(FALLBACK_FILE).filter((j) => j.id !== id);
    writeFallbackJson(FALLBACK_FILE, list);

    return true;
  }
}

