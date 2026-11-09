import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema/blog.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      `mysql://${process.env.MYSQL_USER || "root"}:${process.env.MYSQL_PASSWORD || ""}@${
        process.env.MYSQL_HOST || "localhost"
      }:${process.env.MYSQL_PORT || "3306"}/${process.env.MYSQL_DATABASE || "venom-tech"}`,
  },
});

