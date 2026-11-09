export interface Project {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  service: string;
  year: string;
  progress: number;
  status: string;
  team: string;
  dueDate: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  buttonText?: string;
  image?: string;
  mockupType?: "laptop" | "bag" | "editorial" | "custom_image";
  color?: string;
  tags?: string[];
  displayOrder: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type NewProjectInput = Omit<Project, "id" | "createdAt" | "updatedAt"> & {
  id?: string;
};

export type UpdateProjectInput = Partial<NewProjectInput>;

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  displayOrder?: number;
  projectCount?: number;
  createdAt?: string;
}

export type NewProjectCategoryInput = Omit<ProjectCategory, "id" | "createdAt" | "projectCount"> & {
  id?: string;
};

