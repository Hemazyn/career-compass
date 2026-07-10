import type { Course } from "@/types";

/**
 * Course requirements modeled on the JAMB e-Brochure.
 * NOTE: Always verify against the current JAMB brochure (jamb.gov.ng) —
 * requirements can vary slightly by institution.
 */
export const COURSES: Course[] = [
  {
    slug: "medicine-surgery",
    name: "Medicine & Surgery (MBBS)",
    faculty: "Medical Sciences",
    stream: "science",
    utmeSubjects: ["physics", "chemistry", "biology"],
    oLevel: {
      summary: "5 credits in ONE sitting: English, Mathematics, Physics, Chemistry, Biology",
      compulsoryCredits: ["english", "mathematics", "physics", "chemistry", "biology"],
      minCredits: 5,
      maxSittings: 1,
    },
    durationYears: 6,
    cutoffRange: { min: 200, competitive: 280 },
    sampleUniversities: ["UNILAG", "UI", "UNIBEN", "ABU", "UNN", "OAU"],
    description:
      "Trains you to diagnose and treat illness. The most competitive course in Nigeria — most schools require post-UTME scores well above the JAMB minimum.",
  },
  {
    slug: "pharmacy",
    name: "Pharmacy (PharmD)",
    faculty: "Pharmaceutical Sciences",
    stream: "science",
    utmeSubjects: ["physics", "chemistry", "biology"],
    oLevel: {
      summary: "5 credits: English, Mathematics, Physics, Chemistry, Biology",
      compulsoryCredits: ["english", "mathematics", "physics", "chemistry", "biology"],
      minCredits: 5,
      maxSittings: 1,
    },
    durationYears: 6,
    cutoffRange: { min: 200, competitive: 260 },
    sampleUniversities: ["UNILAG", "OAU", "UNIBEN", "UNN", "ABU"],
    description:
      "The science of medicines — formulation, dispensing and pharmaceutical care. Leads to PCN induction and internship.",
  },
  {
    slug: "nursing",
    name: "Nursing Science",
    faculty: "Medical Sciences",
    stream: "science",
    utmeSubjects: ["physics", "chemistry", "biology"],
    oLevel: {
      summary: "5 credits: English, Mathematics, Physics, Chemistry, Biology",
      compulsoryCredits: ["english", "mathematics", "physics", "chemistry", "biology"],
      minCredits: 5,
      maxSittings: 1,
    },
    durationYears: 5,
    cutoffRange: { min: 200, competitive: 260 },
    sampleUniversities: ["UNILAG", "UI", "OAU", "LASU", "UNIBEN"],
    description:
      "Patient care, health promotion and clinical practice. Extremely in demand locally and abroad (UK NMC, US NCLEX routes).",
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    faculty: "Science / Computing",
    stream: "science",
    utmeSubjects: ["mathematics", "physics", "chemistry"],
    oLevel: {
      summary:
        "5 credits: English, Mathematics, Physics + 2 of Chemistry/Biology/Further Maths/Geography",
      compulsoryCredits: ["english", "mathematics", "physics"],
      minCredits: 5,
      maxSittings: 2,
    },
    durationYears: 4,
    cutoffRange: { min: 180, competitive: 250 },
    sampleUniversities: ["UNILAG", "UI", "OAU", "FUTA", "UNN", "Covenant"],
    description:
      "Algorithms, software engineering, data and AI. The most flexible degree for tech careers — though self-taught routes also exist.",
  },
  {
    slug: "electrical-engineering",
    name: "Electrical / Electronics Engineering",
    faculty: "Engineering",
    stream: "science",
    utmeSubjects: ["mathematics", "physics", "chemistry"],
    oLevel: {
      summary: "5 credits: English, Mathematics, Physics, Chemistry + 1 other science",
      compulsoryCredits: ["english", "mathematics", "physics", "chemistry"],
      minCredits: 5,
      maxSittings: 2,
    },
    durationYears: 5,
    cutoffRange: { min: 200, competitive: 250 },
    sampleUniversities: ["UNILAG", "ABU", "FUTA", "UNIBEN", "OAU"],
    description:
      "Power systems, electronics, telecoms. Leads to COREN registration as a professional engineer.",
  },
  {
    slug: "law",
    name: "Law (LLB)",
    faculty: "Law",
    stream: "art",
    utmeSubjects: ["literature", "government", "crs"],
    oLevel: {
      summary:
        "5 credits: English, Literature, Government/History + 2 others (incl. Maths at most schools)",
      compulsoryCredits: ["english", "literature"],
      minCredits: 5,
      maxSittings: 1,
    },
    durationYears: 5,
    cutoffRange: { min: 250, competitive: 280 },
    sampleUniversities: ["UNILAG", "UI", "OAU", "UNIBEN", "ABU", "UNN"],
    description:
      "Legal theory and practice. After LLB you attend Nigerian Law School and are called to the Bar.",
  },
  {
    slug: "mass-communication",
    name: "Mass Communication",
    faculty: "Social Sciences",
    stream: "art",
    utmeSubjects: ["literature", "government", "economics"],
    oLevel: {
      summary: "5 credits: English, Mathematics + Literature + 2 arts/social science subjects",
      compulsoryCredits: ["english", "mathematics", "literature"],
      minCredits: 5,
      maxSittings: 2,
    },
    durationYears: 4,
    cutoffRange: { min: 180, competitive: 240 },
    sampleUniversities: ["UNILAG", "UNN", "LASU", "UI", "Covenant"],
    description:
      "Journalism, broadcasting, PR, advertising and digital media. Increasingly overlaps with content and product marketing.",
  },
  {
    slug: "international-relations",
    name: "International Relations",
    faculty: "Social Sciences",
    stream: "art",
    utmeSubjects: ["government", "economics", "literature"],
    oLevel: {
      summary: "5 credits: English, Mathematics, Government/History + 2 others",
      compulsoryCredits: ["english", "mathematics", "government"],
      minCredits: 5,
      maxSittings: 2,
    },
    durationYears: 4,
    cutoffRange: { min: 180, competitive: 240 },
    sampleUniversities: ["OAU", "Covenant", "LASU", "ABU"],
    description:
      "Diplomacy, foreign policy and global affairs. Routes into foreign service, NGOs and international organisations.",
  },
  {
    slug: "accounting",
    name: "Accounting",
    faculty: "Management Sciences",
    stream: "commercial",
    utmeSubjects: ["mathematics", "economics", "accounting"],
    oLevel: {
      summary: "5 credits: English, Mathematics, Economics + 2 others (Accounting preferred)",
      compulsoryCredits: ["english", "mathematics", "economics"],
      minCredits: 5,
      maxSittings: 2,
    },
    durationYears: 4,
    cutoffRange: { min: 180, competitive: 240 },
    sampleUniversities: ["UNILAG", "OAU", "UI", "UNIBEN", "Covenant"],
    description:
      "Financial reporting, audit and tax. Pairs with ICAN/ACCA professional exams — many start these before graduation.",
  },
  {
    slug: "economics",
    name: "Economics",
    faculty: "Social Sciences",
    stream: "commercial",
    utmeSubjects: ["mathematics", "economics", "government"],
    oLevel: {
      summary: "5 credits: English, Mathematics, Economics + 2 others",
      compulsoryCredits: ["english", "mathematics", "economics"],
      minCredits: 5,
      maxSittings: 2,
    },
    durationYears: 4,
    cutoffRange: { min: 180, competitive: 250 },
    sampleUniversities: ["UNILAG", "UI", "OAU", "ABU", "UNN"],
    description:
      "How people, firms and nations allocate resources. A strong quantitative economics degree opens banking, data and policy careers.",
  },
  {
    slug: "banking-finance",
    name: "Banking & Finance",
    faculty: "Management Sciences",
    stream: "commercial",
    utmeSubjects: ["mathematics", "economics", "commerce"],
    oLevel: {
      summary: "5 credits: English, Mathematics, Economics + 2 others",
      compulsoryCredits: ["english", "mathematics", "economics"],
      minCredits: 5,
      maxSittings: 2,
    },
    durationYears: 4,
    cutoffRange: { min: 170, competitive: 220 },
    sampleUniversities: ["UNILAG", "UNIBEN", "LASU", "UNN"],
    description:
      "Financial institutions, investment and risk. A direct route into Nigeria's banking and fintech sector.",
  },
  {
    slug: "architecture",
    name: "Architecture",
    faculty: "Environmental Sciences",
    stream: "science",
    utmeSubjects: ["mathematics", "physics", "fine-art"],
    oLevel: {
      summary:
        "5 credits: English, Mathematics, Physics + 2 of Chemistry/Geography/Fine Art/Biology",
      compulsoryCredits: ["english", "mathematics", "physics"],
      minCredits: 5,
      maxSittings: 2,
    },
    durationYears: 5,
    cutoffRange: { min: 200, competitive: 250 },
    sampleUniversities: ["UNILAG", "OAU", "FUTA", "ABU", "Covenant"],
    description:
      "Design of buildings and spaces — a blend of art, engineering and environmental science. Leads to ARCON registration.",
  },
  {
    slug: "medical-lab-science",
    name: "Medical Laboratory Science",
    faculty: "Medical Sciences",
    stream: "science",
    utmeSubjects: ["physics", "chemistry", "biology"],
    oLevel: {
      summary: "5 credits: English, Mathematics, Physics, Chemistry, Biology",
      compulsoryCredits: ["english", "mathematics", "physics", "chemistry", "biology"],
      minCredits: 5,
      maxSittings: 1,
    },
    durationYears: 5,
    cutoffRange: { min: 200, competitive: 250 },
    sampleUniversities: ["UNILAG", "UNIBEN", "UNN", "UI"],
    description:
      "Run the diagnostic tests behind every medical decision. Leads to MLSCN licensure — a strong Plan B for Medicine aspirants.",
  },
  {
    slug: "mechanical-engineering",
    name: "Mechanical Engineering",
    faculty: "Engineering",
    stream: "science",
    utmeSubjects: ["mathematics", "physics", "chemistry"],
    oLevel: {
      summary: "5 credits: English, Mathematics, Physics, Chemistry + 1 other science",
      compulsoryCredits: ["english", "mathematics", "physics", "chemistry"],
      minCredits: 5,
      maxSittings: 2,
    },
    durationYears: 5,
    cutoffRange: { min: 200, competitive: 250 },
    sampleUniversities: ["UNILAG", "ABU", "OAU", "FUTA", "UNN"],
    description:
      "Machines, manufacturing and energy systems — the broadest engineering discipline, from oil & gas to automotive.",
  },
  {
    slug: "agriculture",
    name: "Agricultural Science / Agronomy",
    faculty: "Agriculture",
    stream: "science",
    utmeSubjects: ["chemistry", "biology", "agric"],
    oLevel: {
      summary: "5 credits: English, Mathematics, Chemistry, Biology/Agric + 1 other",
      compulsoryCredits: ["english", "mathematics", "chemistry"],
      minCredits: 5,
      maxSittings: 2,
    },
    durationYears: 5,
    cutoffRange: { min: 160, competitive: 200 },
    sampleUniversities: ["FUNAAB", "ABU", "UI", "UNN", "OAU"],
    description:
      "Crop and food production science. Underrated: agritech (Thrive Agric, Babban Gona, Releaf) is one of Nigeria's fastest-growing sectors.",
  },
  {
    slug: "english-literature",
    name: "English & Literary Studies",
    faculty: "Arts",
    stream: "art",
    utmeSubjects: ["literature", "government", "crs"],
    oLevel: {
      summary: "5 credits: English, Literature + 3 arts/social science subjects",
      compulsoryCredits: ["english", "literature"],
      minCredits: 5,
      maxSittings: 2,
    },
    durationYears: 4,
    cutoffRange: { min: 160, competitive: 220 },
    sampleUniversities: ["UI", "UNILAG", "OAU", "UNN"],
    description:
      "Language, literature and critical thinking — the foundation for writing, media, publishing and (with a conversion) law.",
  },
  {
    slug: "theatre-arts",
    name: "Theatre & Film Arts",
    faculty: "Arts",
    stream: "art",
    utmeSubjects: ["literature", "government", "crs"],
    oLevel: {
      summary: "5 credits: English, Literature + 3 others",
      compulsoryCredits: ["english", "literature"],
      minCredits: 5,
      maxSittings: 2,
    },
    durationYears: 4,
    cutoffRange: { min: 160, competitive: 200 },
    sampleUniversities: ["UI", "UNILAG", "OAU", "UNIPORT"],
    description:
      "Acting, directing, production. Nollywood is the world's second-largest film industry by volume — and increasingly professional.",
  },
  {
    slug: "business-admin",
    name: "Business Administration",
    faculty: "Management Sciences",
    stream: "commercial",
    utmeSubjects: ["mathematics", "economics", "commerce"],
    oLevel: {
      summary: "5 credits: English, Mathematics, Economics + 2 others",
      compulsoryCredits: ["english", "mathematics", "economics"],
      minCredits: 5,
      maxSittings: 2,
    },
    durationYears: 4,
    cutoffRange: { min: 160, competitive: 210 },
    sampleUniversities: ["UNILAG", "UI", "ABU", "LASU", "Covenant"],
    description:
      "General management foundation — differentiate it with certifications (project management, HR, digital marketing) or it stays generic.",
  },
];

export const getCourse = (slug: string) => COURSES.find((c) => c.slug === slug);
