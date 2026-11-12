import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as blogSchema from "./schema/blog";
import * as teamSchema from "./schema/team";
import * as projectsSchema from "./schema/projects";
import * as leadsSchema from "./schema/leads";
import * as jobsSchema from "./schema/jobs";

export const schema = {
  ...blogSchema,
  ...teamSchema,
  ...projectsSchema,
  ...leadsSchema,
  ...jobsSchema,
};

let poolConnection: mysql.Pool | null = null;
let dbInstance: any = null;

export function getDatabaseConnection(): { db: any; pool: mysql.Pool | null } {
  if (dbInstance) {
    return { db: dbInstance, pool: poolConnection };
  }

  const databaseUrl = process.env.DATABASE_URL;
  const host = process.env.MYSQL_HOST;
  const user = process.env.MYSQL_USER;
  const password = process.env.MYSQL_PASSWORD;
  const database = process.env.MYSQL_DATABASE;
  const port = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306;

  // If credentials are present, initialize real MySQL pool
  if (databaseUrl || (host && user && database)) {
    try {
      if (databaseUrl) {
        poolConnection = mysql.createPool(databaseUrl);
      } else {
        poolConnection = mysql.createPool({
          host,
          user,
          password,
          database,
          port,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        });
      }

      dbInstance = drizzle(poolConnection, { schema, mode: "default" });
      return { db: dbInstance, pool: poolConnection };
    } catch (err) {
      console.warn("Failed initializing MySQL connection pool:", err);
    }
  }

  return { db: null, pool: null };
}

export { blogSchema, teamSchema, projectsSchema, leadsSchema, jobsSchema };
