export type LeadStatus = "New" | "Contacted" | "In Review" | "Closed";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  message: string;
  status: LeadStatus;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export type NewLeadInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  services?: string[];
  message?: string;
  status?: LeadStatus;
  source?: string;
};

export type UpdateLeadInput = Partial<Omit<Lead, "id" | "createdAt">>;

