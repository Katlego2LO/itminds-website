export type FacultyAccent = "software" | "networking" | "data" | "support" | "design" | "emerging";

export interface Programme {
  slug: string;
  name: string;
  facultySlug: string;
  nqfLevel: 4 | 5;
  qualificationType: string | null;
  saqaId: string | null;
  duration: string | null;
  mode: string | null;
  entryRequirements: string | null;
  summary: string | null;
  aiIntegrated: boolean;
}

export interface Faculty {
  slug: string;
  name: string;
  accent: FacultyAccent;
  summary: string;
}

export interface TrainingCourse {
  slug: string;
  name: string;
  track: "corporate" | "ai_emerging_tech";
  audience: string | null;
  duration: string | null;
  deliveryMode: string | null;
  summary: string | null;
  partner: boolean;
}
