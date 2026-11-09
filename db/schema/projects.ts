import {
  mysqlTable,
  varchar,
  text,
  datetime,
  int,
  json,
  boolean,
  index,
} from "drizzle-orm/mysql-core";

export const projects = mysqlTable(
  "projects",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    subtitle: varchar("subtitle", { length: 255 }).notNull().default(""),
    client: varchar("client", { length: 255 }).notNull().default(""),
    service: varchar("service", { length: 100 }).notNull().default("Web Design"),
    year: varchar("year", { length: 10 }).notNull().default("2026"),
    progress: int("progress").notNull().default(100),
    status: varchar("status", { length: 50 }).notNull().default("Completed"),
    team: varchar("team", { length: 100 }).notNull().default("Engineering Pod"),
    dueDate: varchar("due_date", { length: 50 }).notNull().default("Delivered"),
    liveUrl: varchar("live_url", { length: 512 }),
    caseStudyUrl: varchar("case_study_url", { length: 512 }),
    buttonText: varchar("button_text", { length: 100 }).default("Live Project"),
    image: text("image"),
    mockupType: varchar("mockup_type", { length: 50 }).default("custom_image"),
    color: varchar("color", { length: 100 }).default("from-stone-900 to-black"),
    tags: json("tags"),
    displayOrder: int("display_order").notNull().default(0),
    isFeatured: boolean("is_featured").notNull().default(false),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: datetime("created_at").notNull(),
    updatedAt: datetime("updated_at").notNull(),
  },
  (table) => [
    index("idx_projects_display_order").on(table.displayOrder),
    index("idx_projects_is_featured").on(table.isFeatured),
    index("idx_projects_is_active").on(table.isActive),
    index("idx_projects_status").on(table.status),
  ]
);

export type ProjectRow = typeof projects.$inferSelect;
export type NewProjectRow = typeof projects.$inferInsert;

export const projectCategories = mysqlTable(
  "project_categories",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 100 }).notNull().unique(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    description: text("description"),
    color: varchar("color", { length: 30 }).default("#3BC8F6"),
    displayOrder: int("display_order").notNull().default(0),
    createdAt: datetime("created_at").notNull(),
  },
  (table) => [
    index("idx_project_categories_slug").on(table.slug),
    index("idx_project_categories_display_order").on(table.displayOrder),
  ]
);

export type ProjectCategoryRow = typeof projectCategories.$inferSelect;
export type NewProjectCategoryRow = typeof projectCategories.$inferInsert;

