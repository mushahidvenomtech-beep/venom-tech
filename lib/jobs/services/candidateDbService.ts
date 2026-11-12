import { eq, desc, and } from "drizzle-orm";
import { getDatabaseConnection, schema } from "@/db";
import {
  JobCandidate,
  NewCandidateInput,
  UpdateCandidateInput,
  CandidateStatus,
  CandidateCustomAnswer,
  CandidateFilterBucket,
  isAttendedCandidateStatus,
} from "../types";
import {
  parseJsonSafe,
  readFallbackJson,
  writeFallbackJson,
  isMysqlRefusedError,
} from "./storageHelpers";

const FALLBACK_FILE = "candidates-db.json";
let mysqlCooldownUntil = 0;

function canUseMysql(): boolean {
  return Date.now() >= mysqlCooldownUntil;
}

function noteMysqlError(err: any, context: string) {
  if (isMysqlRefusedError(err)) {
    mysqlCooldownUntil = Date.now() + 15000;
  }
  console.warn(`MySQL ${context} failed for candidate, using fallback:`, err);
}

function rowToCandidate(r: any): JobCandidate {
  const status = (r.status as CandidateStatus) || "New";
  const isAttended =
    r.isAttended !== undefined
      ? Boolean(r.isAttended)
      : r.is_attended !== undefined
      ? Boolean(r.is_attended)
      : isAttendedCandidateStatus(status);

  const rawAttendedAt = r.attendedAt ?? r.attended_at ?? null;
  const attendedAt =
    rawAttendedAt instanceof Date
      ? rawAttendedAt.toISOString()
      : rawAttendedAt
      ? String(rawAttendedAt)
      : null;

  return {
    id: r.id,
    jobId: r.jobId || r.job_id || "general",
    jobTitle: r.jobTitle || r.job_title || "General Application",
    name: r.name,
    email: r.email,
    phone: r.phone || "",
    location: r.location || "",
    experienceYears: r.experienceYears ?? r.experience_years ?? "",
    expectedSalary: r.expectedSalary ?? r.expected_salary ?? "",
    availability: r.availability || "",
    portfolioUrl: r.portfolioUrl ?? r.portfolio_url ?? "",
    linkedinUrl: r.linkedinUrl ?? r.linkedin_url ?? "",
    resumeUrl: r.resumeUrl ?? r.resume_url ?? "",
    resumeFileName: r.resumeFileName ?? r.resume_file_name ?? "",
    coverLetter: r.coverLetter ?? r.cover_letter ?? "",
    customAnswers: parseJsonSafe<CandidateCustomAnswer[]>(
      r.customAnswers ?? r.custom_answers,
      []
    ),
    status,
    isAttended,
    notes: r.notes || "",
    attendedAt,
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

export class CandidateDbService {
  /**
   * Fetch candidates with filtering by bucket (all | new | unattended | attended),
   * specific workflow status, jobId, and search query.
   */
  static async getAll(
    options: {
      filter?: CandidateFilterBucket;
      status?: string;
      jobId?: string;
      search?: string;
    } = {}
  ): Promise<JobCandidate[]> {
    const { db, pool } = getDatabaseConnection();
    let list: JobCandidate[] | null = null;

    if (pool && db && canUseMysql()) {
      try {
        let query = db.select().from(schema.jobCandidates);
        const conditions: any[] = [];

        if (options.jobId && options.jobId !== "all") {
          conditions.push(eq(schema.jobCandidates.jobId, options.jobId));
        }

        if (conditions.length > 0) {
          query = query.where(and(...conditions));
        }

        const rows = await query.orderBy(desc(schema.jobCandidates.createdAt));
        if (rows) {
          list = rows.map(rowToCandidate);
        }
      } catch (err: any) {
        noteMysqlError(err, "query");
      }
    }

    if (!list) {
      list = readFallbackJson<JobCandidate>(FALLBACK_FILE).map(rowToCandidate);
      if (options.jobId && options.jobId !== "all") {
        list = list.filter((c) => c.jobId === options.jobId);
      }
      list.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    // Apply bucket filter (New, Unattended, Attended)
    if (options.filter && options.filter !== "all") {
      if (options.filter === "new") {
        list = list.filter((c) => c.status === "New");
      } else if (options.filter === "unattended") {
        list = list.filter((c) => !c.isAttended || c.status === "New" || c.status === "Unattended");
      } else if (options.filter === "attended") {
        list = list.filter((c) => c.isAttended && c.status !== "New" && c.status !== "Unattended");
      }
    }

    // Apply explicit status filter if provided
    if (options.status && options.status !== "All") {
      list = list.filter((c) => c.status === options.status);
    }

    // Apply search term
    if (options.search && options.search.trim()) {
      const q = options.search.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q) ||
          c.jobTitle.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q)
      );
    }

    return list;
  }

  /**
   * Fetch single candidate by ID.
   */
  static async getById(id: string): Promise<JobCandidate | null> {
    const { db, pool } = getDatabaseConnection();

    if (pool && db && canUseMysql()) {
      try {
        const rows = await db
          .select()
          .from(schema.jobCandidates)
          .where(eq(schema.jobCandidates.id, id))
          .limit(1);
        if (rows && rows.length > 0) return rowToCandidate(rows[0]);
      } catch (err: any) {
        noteMysqlError(err, "getById");
      }
    }

    const fallback = readFallbackJson<JobCandidate>(FALLBACK_FILE).map(rowToCandidate);
    return fallback.find((c) => c.id === id) || null;
  }

  /**
   * Record a new job application candidate (always begins as New & unattended).
   */
  static async create(input: NewCandidateInput): Promise<JobCandidate> {
    const id = `cand-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date();

    const newCandidate: JobCandidate = {
      id,
      jobId: (input.jobId || "general").trim(),
      jobTitle: (input.jobTitle || "General Application").trim(),
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: (input.phone || "").trim(),
      location: (input.location || "").trim(),
      experienceYears: (input.experienceYears || "").trim(),
      expectedSalary: (input.expectedSalary || "").trim(),
      availability: (input.availability || "").trim(),
      portfolioUrl: (input.portfolioUrl || "").trim(),
      linkedinUrl: (input.linkedinUrl || "").trim(),
      resumeUrl: (input.resumeUrl || "").trim(),
      resumeFileName: (input.resumeFileName || "").trim(),
      coverLetter: (input.coverLetter || "").trim(),
      customAnswers: Array.isArray(input.customAnswers) ? input.customAnswers : [],
      status: "New",
      isAttended: false,
      notes: "",
      attendedAt: null,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    const { db, pool } = getDatabaseConnection();
    if (pool && db && canUseMysql()) {
      try {
        await db.insert(schema.jobCandidates).values({
          id: newCandidate.id,
          jobId: newCandidate.jobId,
          jobTitle: newCandidate.jobTitle,
          name: newCandidate.name,
          email: newCandidate.email,
          phone: newCandidate.phone,
          location: newCandidate.location,
          experienceYears: newCandidate.experienceYears,
          expectedSalary: newCandidate.expectedSalary,
          availability: newCandidate.availability,
          portfolioUrl: newCandidate.portfolioUrl,
          linkedinUrl: newCandidate.linkedinUrl,
          resumeUrl: newCandidate.resumeUrl,
          resumeFileName: newCandidate.resumeFileName,
          coverLetter: newCandidate.coverLetter,
          customAnswers: newCandidate.customAnswers,
          status: newCandidate.status,
          isAttended: newCandidate.isAttended,
          notes: newCandidate.notes,
          attendedAt: null,
          createdAt: now,
          updatedAt: now,
        });
      } catch (err: any) {
        noteMysqlError(err, "insert");
      }
    }

    const list = readFallbackJson<JobCandidate>(FALLBACK_FILE);
    list.unshift(newCandidate);
    writeFallbackJson(FALLBACK_FILE, list);

    return newCandidate;
  }

  /**
   * Update candidate workflow status, attended flag, or HR notes.
   */
  static async update(
    id: string,
    input: UpdateCandidateInput
  ): Promise<JobCandidate | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const now = new Date();
    let nextStatus = input.status ?? existing.status;
    let nextAttended =
      input.isAttended !== undefined
        ? input.isAttended
        : input.status !== undefined
        ? isAttendedCandidateStatus(input.status)
        : existing.isAttended;

    // Keep status & isAttended consistent when toggled directly via quick action
    if (input.isAttended !== undefined && input.status === undefined) {
      if (input.isAttended && (existing.status === "New" || existing.status === "Unattended")) {
        nextStatus = "Attended";
      } else if (!input.isAttended && isAttendedCandidateStatus(existing.status)) {
        nextStatus = "Unattended";
      }
    }

    const nextAttendedAt = nextAttended
      ? existing.attendedAt || now.toISOString()
      : null;

    const updated: JobCandidate = {
      ...existing,
      jobId: input.jobId !== undefined ? input.jobId.trim() : existing.jobId,
      jobTitle: input.jobTitle !== undefined ? input.jobTitle.trim() : existing.jobTitle,
      name: input.name !== undefined ? input.name.trim() : existing.name,
      email: input.email !== undefined ? input.email.trim().toLowerCase() : existing.email,
      phone: input.phone !== undefined ? input.phone.trim() : existing.phone,
      location: input.location !== undefined ? input.location.trim() : existing.location,
      experienceYears:
        input.experienceYears !== undefined ? input.experienceYears.trim() : existing.experienceYears,
      expectedSalary:
        input.expectedSalary !== undefined ? input.expectedSalary.trim() : existing.expectedSalary,
      availability:
        input.availability !== undefined ? input.availability.trim() : existing.availability,
      portfolioUrl:
        input.portfolioUrl !== undefined ? input.portfolioUrl.trim() : existing.portfolioUrl,
      linkedinUrl:
        input.linkedinUrl !== undefined ? input.linkedinUrl.trim() : existing.linkedinUrl,
      resumeUrl: input.resumeUrl !== undefined ? input.resumeUrl.trim() : existing.resumeUrl,
      resumeFileName:
        input.resumeFileName !== undefined ? input.resumeFileName.trim() : existing.resumeFileName,
      coverLetter:
        input.coverLetter !== undefined ? input.coverLetter.trim() : existing.coverLetter,
      status: nextStatus,
      isAttended: nextAttended,
      notes: input.notes !== undefined ? input.notes : existing.notes,
      attendedAt: nextAttendedAt,
      updatedAt: now.toISOString(),
    };

    const { db, pool } = getDatabaseConnection();
    if (pool && db && canUseMysql()) {
      try {
        await db
          .update(schema.jobCandidates)
          .set({
            jobId: updated.jobId,
            jobTitle: updated.jobTitle,
            name: updated.name,
            email: updated.email,
            phone: updated.phone,
            location: updated.location,
            experienceYears: updated.experienceYears,
            expectedSalary: updated.expectedSalary,
            availability: updated.availability,
            portfolioUrl: updated.portfolioUrl,
            linkedinUrl: updated.linkedinUrl,
            resumeUrl: updated.resumeUrl,
            resumeFileName: updated.resumeFileName,
            coverLetter: updated.coverLetter,
            status: updated.status,
            isAttended: updated.isAttended,
            notes: updated.notes,
            attendedAt: nextAttendedAt ? new Date(nextAttendedAt) : null,
            updatedAt: now,
          })
          .where(eq(schema.jobCandidates.id, id));
      } catch (err: any) {
        noteMysqlError(err, "update");
      }
    }

    const list = readFallbackJson<JobCandidate>(FALLBACK_FILE).map((c) =>
      c.id === id ? updated : c
    );
    writeFallbackJson(FALLBACK_FILE, list);

    return updated;
  }

  /**
   * Delete candidate record by ID.
   */
  static async delete(id: string): Promise<boolean> {
    const { db, pool } = getDatabaseConnection();
    if (pool && db && canUseMysql()) {
      try {
        await db.delete(schema.jobCandidates).where(eq(schema.jobCandidates.id, id));
      } catch (err: any) {
        noteMysqlError(err, "delete");
      }
    }

    const list = readFallbackJson<JobCandidate>(FALLBACK_FILE).filter((c) => c.id !== id);
    writeFallbackJson(FALLBACK_FILE, list);

    return true;
  }
}

