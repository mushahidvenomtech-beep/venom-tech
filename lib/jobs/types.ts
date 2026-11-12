export type JobStatus = "Open" | "Paused" | "Closed" | "Draft";
export type EmploymentType = "Full-Time" | "Part-Time" | "Contract" | "Internship" | "Freelance";
export type WorkMode = "On-Site" | "Remote" | "Hybrid";

export interface CustomFormQuestion {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "url";
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface JobApplyFormConfig {
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
  customQuestions: CustomFormQuestion[];
}

export const DEFAULT_APPLY_FORM_CONFIG: JobApplyFormConfig = {
  headline: "Submit Your Application",
  submitButtonText: "Submit Application",
  askPhone: true,
  askLocation: true,
  askExperience: true,
  askExpectedSalary: true,
  askAvailability: true,
  askPortfolio: true,
  askLinkedIn: true,
  askCoverLetter: true,
  requireResume: true,
  customQuestions: [],
};

export const JOB_DEPARTMENTS = [
  "Engineering",
  "AI & Automation",
  "Design & UI/UX",
  "SEO & Growth",
  "Advertising & Media",
  "BPO & Operations",
  "Sales & Strategy",
  "Management",
] as const;

export const EMPLOYMENT_TYPES: EmploymentType[] = [
  "Full-Time",
  "Part-Time",
  "Contract",
  "Internship",
  "Freelance",
];

export const WORK_MODES: WorkMode[] = ["Hybrid", "On-Site", "Remote"];

export const JOB_STATUSES: JobStatus[] = ["Open", "Paused", "Closed", "Draft"];

export interface Job {
  id: string;
  title: string;
  slug: string;
  department: string;
  employmentType: EmploymentType;
  workMode: WorkMode;
  location: string;
  experienceLevel: string;
  salaryRange: string;
  summary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  applyFormConfig: JobApplyFormConfig;
  status: JobStatus;
  isFeatured: boolean;
  applicationDeadline: string;
  displayOrder: number;
  applicantsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export type NewJobInput = {
  title: string;
  slug?: string;
  department?: string;
  employmentType?: EmploymentType;
  workMode?: WorkMode;
  location?: string;
  experienceLevel?: string;
  salaryRange?: string;
  summary?: string;
  description?: string;
  requirements?: string[];
  benefits?: string[];
  applyFormConfig?: Partial<JobApplyFormConfig>;
  status?: JobStatus;
  isFeatured?: boolean;
  applicationDeadline?: string;
  displayOrder?: number;
};

export type UpdateJobInput = Partial<NewJobInput>;

export type CandidateStatus =
  | "New"
  | "Unattended"
  | "Attended"
  | "Shortlisted"
  | "Interview"
  | "Hired"
  | "Rejected";

export type CandidateFilterBucket = "all" | "new" | "unattended" | "attended";

export const CANDIDATE_STATUSES: CandidateStatus[] = [
  "New",
  "Unattended",
  "Attended",
  "Shortlisted",
  "Interview",
  "Hired",
  "Rejected",
];

export interface CandidateCustomAnswer {
  questionId: string;
  label: string;
  answer: string;
}

export interface JobCandidate {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  experienceYears: string;
  expectedSalary: string;
  availability: string;
  portfolioUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
  resumeFileName: string;
  coverLetter: string;
  customAnswers: CandidateCustomAnswer[];
  status: CandidateStatus;
  isAttended: boolean;
  notes: string;
  attendedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type NewCandidateInput = {
  jobId?: string;
  jobTitle?: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  experienceYears?: string;
  expectedSalary?: string;
  availability?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  resumeFileName?: string;
  coverLetter?: string;
  customAnswers?: CandidateCustomAnswer[];
};

export type UpdateCandidateInput = Partial<NewCandidateInput> & {
  status?: CandidateStatus;
  isAttended?: boolean;
  notes?: string;
};

/**
 * Returns true when a workflow status means the candidate has been attended to.
 */
export function isAttendedCandidateStatus(status: CandidateStatus): boolean {
  return status !== "New" && status !== "Unattended";
}

const UTC_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Deterministic UTC date formatting so SSR and client hydration never mismatch.
 */
export function formatIsoDateUTC(iso?: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const month = UTC_MONTHS[d.getUTCMonth()];
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}

export function normalizeApplyFormConfig(
  config?: Partial<JobApplyFormConfig> | null
): JobApplyFormConfig {
  return {
    ...DEFAULT_APPLY_FORM_CONFIG,
    ...(config || {}),
    customQuestions: Array.isArray(config?.customQuestions)
      ? config.customQuestions
      : [],
  };
}

