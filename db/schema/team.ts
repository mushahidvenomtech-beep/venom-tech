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

export const teamMembers = mysqlTable(
  "team_members",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    role: varchar("role", { length: 255 }).notNull(),
    badge: varchar("badge", { length: 50 }).notNull().default("PARTNER"),
    brandLabel: varchar("brand_label", { length: 50 }).notNull().default("CREAT"),
    studioRole: varchar("studio_role", { length: 100 }).notNull().default("STUDIO LEAD"),
    specialty: varchar("specialty", { length: 255 }).notNull(),
    avatarBg: varchar("avatar_bg", { length: 100 }).notNull().default("from-stone-900 to-black"),
    image: text("image"),
    initials: varchar("initials", { length: 10 }).notNull().default(""),
    socialLinks: json("social_links"),
    displayOrder: int("display_order").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: datetime("created_at").notNull(),
    updatedAt: datetime("updated_at").notNull(),
  },
  (table) => [
    index("idx_team_display_order").on(table.displayOrder),
    index("idx_team_is_active").on(table.isActive),
  ]
);

export type TeamMemberRow = typeof teamMembers.$inferSelect;
export type NewTeamMemberRow = typeof teamMembers.$inferInsert;
