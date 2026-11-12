import fs from "fs";
import path from "path";
import { eq, asc, desc, sql } from "drizzle-orm";
import { getDatabaseConnection, schema } from "@/db";
import { TeamMember, NewTeamMemberInput, UpdateTeamMemberInput } from "../types";

const DATA_DIR = path.join(process.cwd(), "data");
const FALLBACK_FILE = path.join(DATA_DIR, "team-db.json");

function calculateInitials(name: string): string {
  if (!name) return "VT";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: "team-alex-rivera",
    name: "Alex Rivera",
    role: "Founding Partner & Creative Director",
    badge: "PARTNER",
    brandLabel: "CREAT",
    studioRole: "STUDIO LEAD",
    specialty: "Brand Systems & Art Direction",
    avatarBg: "from-stone-900 to-black",
    image: "/images/team/alex-rivera.webp",
    initials: "AR",
    socialLinks: { linkedin: "https://linkedin.com", twitter: "https://twitter.com" },
    displayOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "team-maya-chen",
    name: "Maya Chen",
    role: "Principal Product Architect",
    badge: "PARTNER",
    brandLabel: "CREAT",
    studioRole: "STUDIO LEAD",
    specialty: "Design Systems & UI/UX",
    avatarBg: "from-neutral-900 to-stone-900",
    image: "/images/team/maya-chen.webp",
    initials: "MC",
    socialLinks: { linkedin: "https://linkedin.com", github: "https://github.com" },
    displayOrder: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "team-liam-oconnor",
    name: "Liam O'Connor",
    role: "Head of Creative Technology",
    badge: "PARTNER",
    brandLabel: "CREAT",
    studioRole: "STUDIO LEAD",
    specialty: "Full-Stack Web & Next.js",
    avatarBg: "from-stone-950 to-neutral-900",
    image: "/images/team/liam-oconnor.webp",
    initials: "LO",
    socialLinks: { linkedin: "https://linkedin.com", github: "https://github.com" },
    displayOrder: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "team-sofia-rossi",
    name: "Sofia Rossi",
    role: "Lead 3D & Motion Artist",
    badge: "PARTNER",
    brandLabel: "CREAT",
    studioRole: "STUDIO LEAD",
    specialty: "Kinetic Visuals & Spatial Canvas",
    avatarBg: "from-black to-stone-900",
    image: "/images/team/sofia-rossi.webp",
    initials: "SR",
    socialLinks: { linkedin: "https://linkedin.com", portfolio: "https://sofia.art" },
    displayOrder: 4,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function getFallbackData(): TeamMember[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(FALLBACK_FILE)) {
      const raw = fs.readFileSync(FALLBACK_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Failed reading team fallback file:", e);
  }
  saveFallbackData(DEFAULT_MEMBERS);
  return DEFAULT_MEMBERS;
}

function saveFallbackData(members: TeamMember[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(members, null, 2), "utf-8");
  } catch (e) {
    console.warn("Failed writing team fallback file:", e);
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

let mysqlFailed = false;

export class TeamDbService {
  /**
   * Fetch all team members (ordered by displayOrder ascending)
   */
  static async getAll(onlyActive: boolean = false): Promise<TeamMember[]> {
    const { db, pool } = getDatabaseConnection();

    if (pool && db && !mysqlFailed) {
      try {
        let query = db.select().from(schema.teamMembers);
        if (onlyActive) {
          query = query.where(eq(schema.teamMembers.isActive, true));
        }
        const rows = await query.orderBy(asc(schema.teamMembers.displayOrder), asc(schema.teamMembers.createdAt));

        if (rows && rows.length > 0) {
          return rows.map((r: any) => ({
            id: r.id,
            name: r.name,
            role: r.role,
            badge: r.badge || "PARTNER",
            brandLabel: r.brandLabel || "CREAT",
            studioRole: r.studioRole || "STUDIO LEAD",
            specialty: r.specialty,
            avatarBg: r.avatarBg || "from-stone-900 to-black",
            image: r.image || "",
            initials: r.initials || calculateInitials(r.name),
            socialLinks: parseJsonSafe(r.socialLinks, {}),
            displayOrder: r.displayOrder ?? 0,
            isActive: Boolean(r.isActive),
            createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt),
            updatedAt: r.updatedAt instanceof Date ? r.updatedAt.toISOString() : String(r.updatedAt),
          }));
        }
      } catch (err: any) {
        if (err?.code === "ECONNREFUSED" || err?.cause?.code === "ECONNREFUSED") {
          mysqlFailed = true;
        }
        console.warn("MySQL query failed for team members, using fallback:", err);
      }
    }

    // Fallback
    const fallback = getFallbackData();
    if (onlyActive) {
      return fallback.filter((m) => m.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
    }
    return fallback.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  /**
   * Fetch single team member by ID
   */
  static async getById(id: string): Promise<TeamMember | null> {
    const { db, pool } = getDatabaseConnection();

    if (pool && db) {
      try {
        const rows = await db
          .select()
          .from(schema.teamMembers)
          .where(eq(schema.teamMembers.id, id))
          .limit(1);

        if (rows && rows.length > 0) {
          const r = rows[0];
          return {
            id: r.id,
            name: r.name,
            role: r.role,
            badge: r.badge || "PARTNER",
            brandLabel: r.brandLabel || "CREAT",
            studioRole: r.studioRole || "STUDIO LEAD",
            specialty: r.specialty,
            avatarBg: r.avatarBg || "from-stone-900 to-black",
            image: r.image || "",
            initials: r.initials || calculateInitials(r.name),
            socialLinks: parseJsonSafe(r.socialLinks, {}),
            displayOrder: r.displayOrder ?? 0,
            isActive: Boolean(r.isActive),
            createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt),
            updatedAt: r.updatedAt instanceof Date ? r.updatedAt.toISOString() : String(r.updatedAt),
          };
        }
      } catch (err) {
        console.warn("MySQL query failed for team member by id:", err);
      }
    }

    const fallback = getFallbackData();
    return fallback.find((m) => m.id === id) || null;
  }

  /**
   * Create a new team member
   */
  static async create(input: NewTeamMemberInput): Promise<TeamMember> {
    const id = input.id || `team-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date();
    const initials = input.initials?.trim() || calculateInitials(input.name);

    const newMember: TeamMember = {
      id,
      name: input.name.trim(),
      role: input.role.trim(),
      badge: input.badge?.trim() || "PARTNER",
      brandLabel: input.brandLabel?.trim() || "CREAT",
      studioRole: input.studioRole?.trim() || "STUDIO LEAD",
      specialty: input.specialty.trim(),
      avatarBg: input.avatarBg || "from-stone-900 to-black",
      image: input.image || "",
      initials,
      socialLinks: input.socialLinks || {},
      displayOrder: input.displayOrder ?? 0,
      isActive: input.isActive ?? true,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    const { db, pool } = getDatabaseConnection();
    if (pool && db) {
      try {
        await db.insert(schema.teamMembers).values({
          id: newMember.id,
          name: newMember.name,
          role: newMember.role,
          badge: newMember.badge,
          brandLabel: newMember.brandLabel,
          studioRole: newMember.studioRole,
          specialty: newMember.specialty,
          avatarBg: newMember.avatarBg,
          image: newMember.image,
          initials: newMember.initials,
          socialLinks: newMember.socialLinks,
          displayOrder: newMember.displayOrder,
          isActive: newMember.isActive,
          createdAt: now,
          updatedAt: now,
        });
      } catch (err) {
        console.warn("MySQL insert failed for team member:", err);
      }
    }

    // Always mirror in fallback
    const list = getFallbackData();
    list.push(newMember);
    saveFallbackData(list);

    return newMember;
  }

  /**
   * Update an existing team member
   */
  static async update(id: string, input: UpdateTeamMemberInput): Promise<TeamMember | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const now = new Date();
    const initials =
      input.initials !== undefined
        ? input.initials.trim() || calculateInitials(input.name || existing.name)
        : existing.initials;

    const updated: TeamMember = {
      ...existing,
      ...input,
      initials,
      updatedAt: now.toISOString(),
    };

    const { db, pool } = getDatabaseConnection();
    if (pool && db) {
      try {
        await db
          .update(schema.teamMembers)
          .set({
            name: updated.name,
            role: updated.role,
            badge: updated.badge,
            brandLabel: updated.brandLabel,
            studioRole: updated.studioRole,
            specialty: updated.specialty,
            avatarBg: updated.avatarBg,
            image: updated.image,
            initials: updated.initials,
            socialLinks: updated.socialLinks,
            displayOrder: updated.displayOrder,
            isActive: updated.isActive,
            updatedAt: now,
          })
          .where(eq(schema.teamMembers.id, id));
      } catch (err) {
        console.warn("MySQL update failed for team member:", err);
      }
    }

    // Mirror in fallback
    const list = getFallbackData();
    const idx = list.findIndex((m) => m.id === id);
    if (idx !== -1) {
      list[idx] = updated;
      saveFallbackData(list);
    }

    return updated;
  }

  /**
   * Delete a team member
   */
  static async delete(id: string): Promise<boolean> {
    const { db, pool } = getDatabaseConnection();
    if (pool && db) {
      try {
        await db.delete(schema.teamMembers).where(eq(schema.teamMembers.id, id));
      } catch (err) {
        console.warn("MySQL delete failed for team member:", err);
      }
    }

    // Mirror in fallback
    const list = getFallbackData();
    const filtered = list.filter((m) => m.id !== id);
    saveFallbackData(filtered);

    return true;
  }

  /**
   * Toggle active state
   */
  static async toggleActive(id: string): Promise<TeamMember | null> {
    const existing = await this.getById(id);
    if (!existing) return null;
    return this.update(id, { isActive: !existing.isActive });
  }
}
