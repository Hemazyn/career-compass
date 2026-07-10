// ─── Core domain types for Career Compass ────────────────────────────────

/** Senior secondary school stream */
export type Stream = "science" | "art" | "commercial";

/** RIASEC (Holland Codes) dimensions used by the Stream Selector quiz */
export type RiasecKey = "R" | "I" | "A" | "S" | "E" | "C";

export type RiasecScores = Record<RiasecKey, number>;

export interface Subject {
  id: string;
  name: string;
  /** Which streams typically offer this subject at SSS level */
  streams: Stream[];
}

export interface OLevelRequirement {
  /** e.g. "5 credits including English, Mathematics, Physics, Chemistry, Biology" */
  summary: string;
  /** subject ids that MUST be credits */
  compulsoryCredits: string[];
  minCredits: number;
  maxSittings: 1 | 2;
}

export interface Course {
  slug: string;
  name: string;
  faculty: string;
  stream: Stream;
  /** UTME = English (compulsory) + these 3 subject ids, per the JAMB brochure */
  utmeSubjects: [string, string, string];
  oLevel: OLevelRequirement;
  durationYears: number;
  /** Typical competitive UTME score range at popular federal universities */
  cutoffRange: { min: number; competitive: number };
  sampleUniversities: string[];
  description: string;
}

export interface Career {
  slug: string;
  title: string;
  category: string;
  stream: Stream;
  /** Primary course(s) that lead here */
  courseSlugs: string[];
  riasec: RiasecKey[]; // dominant Holland codes for this career
  description: string;
  dayToDay: string[];
  /** Monthly salary range in Nigeria, NGN */
  salaryNgn: { entry: number; experienced: number };
  outlook: "high" | "growing" | "stable" | "competitive";
  licensing?: string; // e.g. "MDCN induction + housemanship"
  nyscNote?: string;
  /** Realistic alternative routes if UTME/admission doesn't work out */
  altRoutes: string[];
}

export interface QuizQuestion {
  id: number;
  text: string;
  dimension: RiasecKey;
}

export interface StreamResult {
  stream: Stream;
  scores: RiasecScores;
  topCodes: [RiasecKey, RiasecKey];
  matchedCareers: Career[];
  opens: string[];
  closes: string[];
}
