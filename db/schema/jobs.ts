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

export interface CustomFormQuestionRow {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "url";
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface JobApplyFormConfigRow {
  headline?: string;
  submitButtonText?: string;
  askPhone: boolean;
  askLocation: boolean;
  askExperience: boolean;
  askExpectedSalary: boolean;
  askAvailability: boolean;
  askPortfolio: boolean;
  askLinkedIn: boolean;
  askCoverLetter: boolean;
  requireResume: boolean;
  customQuestions: CustomFormQuestionRow[];
}

export interface CandidateCustomAnswerRow {
  questionId: string;
  label: string;
  answer: string;
}

export const jobs = mysqlTable(
  "jobs",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    department: varchar("department", { length: 100 }).notNull().default("Engineering"),
    employmentType: varchar("employment_type", { length: 60 }).notNull().default("Full-Time"),
    workMode: varchar("work_mode", { length: 60 }).notNull().default("Hybrid"),
    location: varchar("location", { length: 150 }).notNull().default("Lahore, Pakistan"),
    experienceLevel: varchar("experience_level", { length: 100 }).notNull().default("Mid-Level"),
    salaryRange: varchar("salary_range", { length: 120 }).notNull().default("Competitive"),
    summary: text("summary").notNull(),
    description: text("description").notNull(),
    requirements: json("requirements").$type<string[]>().notNull(),
    benefits: json("benefits").$type<string[]>().notNull(),
    applyFormConfig: json("apply_form_config").$type<JobApplyFormConfigRow>().notNull(),
    status: varchar("status", { length: 40 }).notNull().default("Open"),
    isFeatured: boolean("is_featured").notNull().default(false),
    applicationDeadline: varchar("application_deadline", { length: 60 }).notNull().default(""),
    displayOrder: int("display_order").notNull().default(0),
    createdAt: datetime("created_at").notNull(),
    updatedAt: datetime("updated_at").notNull(),
  },
  (table) => [
    index("idx_jobs_status").on(table.status),
    index("idx_jobs_department").on(table.department),
    index("idx_jobs_slug").on(table.slug),
    index("idx_jobs_created_at").on(table.createdAt),
  ]
);

export type JobRow = typeof jobs.$inferSelect;
export type NewJobRow = typeof jobs.$inferInsert;

export const jobCandidates = mysqlTable(
  "job_candidates",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    jobId: varchar("job_id", { length: 36 }).notNull().default("general"),
    jobTitle: varchar("job_title", { length: 255 }).notNull().default("General Application"),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }).notNull().default(""),
    location: varchar("location", { length: 150 }).notNull().default(""),
    experienceYears: varchar("experience_years", { length: 80 }).notNull().default(""),
    expectedSalary: varchar("expected_salary", { length: 100 }).notNull().default(""),
    availability: varchar("availability", { length: 100 }).notNull().default(""),
    portfolioUrl: varchar("portfolio_url", { length: 512 }).notNull().default(""),
    linkedinUrl: varchar("linkedin_url", { length: 512 }).notNull().default(""),
    resumeUrl: text("resume_url").notNull(),
    resumeFileName: varchar("resume_file_name", { length: 255 }).notNull().default(""),
    coverLetter: text("cover_letter").notNull(),
    customAnswers: json("custom_answers").$type<CandidateCustomAnswerRow[]>().notNull(),
    status: varchar("status", { length: 50 }).notNull().default("New"),
    isAttended: boolean("is_attended").notNull().default(false),
    notes: text("notes").notNull(),
    attendedAt: datetime("attended_at"),
    createdAt: datetime("created_at").notNull(),
    updatedAt: datetime("updated_at").notNull(),
  },
  (table) => [
    index("idx_candidates_job_id").on(table.jobId),
    index("idx_candidates_status").on(table.status),
    index("idx_candidates_attended").on(table.isAttended),
    index("idx_candidates_created_at").on(table.createdAt),
    index("idx_candidates_email").on(table.email),
  ]
);

export type JobCandidateRow = typeof jobCandidates.$inferSelect;
export type NewJobCandidateRow = typeof jobCandidates.$inferInsert;

