export interface TeamSocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  portfolio?: string;
  [key: string]: string | undefined;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  badge: string;
  brandLabel: string;
  studioRole: string;
  specialty: string;
  avatarBg: string;
  image?: string;
  initials: string;
  socialLinks?: TeamSocialLinks;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type NewTeamMemberInput = Omit<TeamMember, "id" | "createdAt" | "updatedAt"> & {
  id?: string;
};

export type UpdateTeamMemberInput = Partial<NewTeamMemberInput>;
