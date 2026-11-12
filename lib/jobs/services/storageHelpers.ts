import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export function parseJsonSafe<T>(val: unknown, fallback: T): T {
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

export function readFallbackJson<T>(filename: string): T[] {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch (err) {
    console.warn(`Failed reading fallback file ${filename}:`, err);
    return [];
  }
}

export function writeFallbackJson<T>(filename: string, items: T[]): void {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.warn(`Failed writing fallback file ${filename}:`, err);
  }
}

export function isMysqlRefusedError(err: any): boolean {
  return (
    err?.code === "ECONNREFUSED" ||
    err?.cause?.code === "ECONNREFUSED" ||
    err?.errno === -4078
  );
}

export function slugifyText(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

