import {
  mysqlTable,
  varchar,
  text,
  datetime,
  json,
  index,
} from "drizzle-orm/mysql-core";

export const leads = mysqlTable(
  "leads",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }).notNull().default(""),
    company: varchar("company", { length: 255 }).notNull().default(""),
    services: json("services").$type<string[]>().notNull(),
    message: text("message").notNull(),
    status: varchar("status", { length: 50 }).notNull().default("New"),
    source: varchar("source", { length: 100 }).notNull().default("contact_page"),
    createdAt: datetime("created_at").notNull(),
    updatedAt: datetime("updated_at").notNull(),
  },
  (table) => [
    index("idx_leads_status").on(table.status),
    index("idx_leads_created_at").on(table.createdAt),
    index("idx_leads_email").on(table.email),
  ]
);

export type LeadRow = typeof leads.$inferSelect;
export type NewLeadRow = typeof leads.$inferInsert;

