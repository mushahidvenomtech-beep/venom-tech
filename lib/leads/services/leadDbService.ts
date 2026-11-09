import fs from "fs";
import path from "path";
import { eq, desc, and, like } from "drizzle-orm";
import { getDatabaseConnection, schema } from "@/db";
import { Lead, NewLeadInput, UpdateLeadInput, LeadStatus } from "../types";

const DATA_DIR = path.join(process.cwd(), "data");
const FALLBACK_LEADS_FILE = path.join(DATA_DIR, "leads-db.json");

let mysqlFailed = false;

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

function getFallbackData(): Lead[] {
  try {
    if (!fs.existsSync(FALLBACK_LEADS_FILE)) {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(FALLBACK_LEADS_FILE, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    const raw = fs.readFileSync(FALLBACK_LEADS_FILE, "utf-8");
    return JSON.parse(raw) as Lead[];
  } catch (e) {
    console.warn("Failed reading leads fallback file:", e);
    return [];
  }
}

function saveFallbackData(leads: Lead[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(FALLBACK_LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (e) {
    console.warn("Failed writing leads fallback file:", e);
  }
}

function rowToLead(r: any): Lead {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone || "",
    company: r.company || "",
    services: parseJsonSafe(r.services, []),
    message: r.message || "",
    status: (r.status as LeadStatus) || "New",
    source: r.source || "contact_page",
    createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt || r.created_at || new Date().toISOString()),
    updatedAt: r.updatedAt instanceof Date ? r.updatedAt.toISOString() : String(r.updatedAt || r.updated_at || new Date().toISOString()),
  };
}

export class LeadDbService {
  /**
   * Fetch all leads with status & search filtering
   */
  static async getAll(options: { status?: string; search?: string } = {}): Promise<Lead[]> {
    const { db, pool } = getDatabaseConnection();

    if (pool && db && !mysqlFailed) {
      try {
        let query = db.select().from(schema.leads);
        const conditions: any[] = [];

        if (options.status && options.status !== "All") {
          conditions.push(eq(schema.leads.status, options.status));
        }
        if (options.search) {
          conditions.push(like(schema.leads.name, `%${options.search}%`));
        }

        if (conditions.length > 0) {
          query = query.where(and(...conditions));
        }

        const rows = await query.orderBy(desc(schema.leads.createdAt));
        if (rows) {
          return rows.map(rowToLead);
        }
      } catch (err: any) {
        if (err?.code === "ECONNREFUSED" || err?.cause?.code === "ECONNREFUSED") {
          mysqlFailed = true;
        }
        console.warn("MySQL query failed for leads, using fallback:", err);
      }
    }

    let list = getFallbackData();
    if (options.status && options.status !== "All") {
      list = list.filter((l) => l.status === options.status);
    }
    if (options.search) {
      const q = options.search.toLowerCase();
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q) ||
          l.services.some((s) => s.toLowerCase().includes(q))
      );
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  /**
   * Fetch single lead by ID
   */
  static async getById(id: string): Promise<Lead | null> {
    const { db, pool } = getDatabaseConnection();

    if (pool && db && !mysqlFailed) {
      try {
        const rows = await db.select().from(schema.leads).where(eq(schema.leads.id, id)).limit(1);
        if (rows && rows.length > 0) {
          return rowToLead(rows[0]);
        }
      } catch (err: any) {
        if (err?.code === "ECONNREFUSED" || err?.cause?.code === "ECONNREFUSED") {
          mysqlFailed = true;
        }
        console.warn("MySQL query failed for lead by id:", err);
      }
    }

    const fallback = getFallbackData();
    return fallback.find((l) => l.id === id) || null;
  }

  /**
   * Create a new lead from user form submission
   */
  static async create(input: NewLeadInput): Promise<Lead> {
    const id = `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date();

    const newLead: Lead = {
      id,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: (input.phone || "").trim(),
      company: (input.company || "").trim(),
      services: input.services || [],
      message: (input.message || "").trim(),
      status: input.status || "New",
      source: input.source || "contact_page",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    const { db, pool } = getDatabaseConnection();
    if (pool && db && !mysqlFailed) {
      try {
        await db.insert(schema.leads).values({
          id: newLead.id,
          name: newLead.name,
          email: newLead.email,
          phone: newLead.phone,
          company: newLead.company,
          services: newLead.services,
          message: newLead.message,
          status: newLead.status,
          source: newLead.source,
          createdAt: now,
          updatedAt: now,
        });
      } catch (err: any) {
        if (err?.code === "ECONNREFUSED" || err?.cause?.code === "ECONNREFUSED") {
          mysqlFailed = true;
        }
        console.warn("MySQL insert failed for lead:", err);
      }
    }

    const list = getFallbackData();
    list.unshift(newLead);
    saveFallbackData(list);

    return newLead;
  }

  /**
   * Update lead status or details
   */
  static async update(id: string, input: UpdateLeadInput): Promise<Lead | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const now = new Date();
    const updated: Lead = {
      ...existing,
      ...input,
      updatedAt: now.toISOString(),
    };

    const { db, pool } = getDatabaseConnection();
    if (pool && db && !mysqlFailed) {
      try {
        await db
          .update(schema.leads)
          .set({
            name: updated.name,
            email: updated.email,
            phone: updated.phone,
            company: updated.company,
            services: updated.services,
            message: updated.message,
            status: updated.status,
            source: updated.source,
            updatedAt: now,
          })
          .where(eq(schema.leads.id, id));
      } catch (err: any) {
        if (err?.code === "ECONNREFUSED" || err?.cause?.code === "ECONNREFUSED") {
          mysqlFailed = true;
        }
        console.warn("MySQL update failed for lead:", err);
      }
    }

    const list = getFallbackData().map((l) => (l.id === id ? updated : l));
    saveFallbackData(list);

    return updated;
  }

  /**
   * Delete lead
   */
  static async delete(id: string): Promise<boolean> {
    const { db, pool } = getDatabaseConnection();
    if (pool && db && !mysqlFailed) {
      try {
        await db.delete(schema.leads).where(eq(schema.leads.id, id));
      } catch (err: any) {
        if (err?.code === "ECONNREFUSED" || err?.cause?.code === "ECONNREFUSED") {
          mysqlFailed = true;
        }
        console.warn("MySQL delete failed for lead:", err);
      }
    }

    const list = getFallbackData().filter((l) => l.id !== id);
    saveFallbackData(list);

    return true;
  }
}

