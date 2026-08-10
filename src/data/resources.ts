export type ResourceCategory =
  | "official-exams"
  | "exam-prep"
  | "scholarships"
  | "learning"
  | "design"
  | "jobs"
  | "community";

export interface Resource {
  slug: string;
  name: string;
  description: string;
  url: string;
  category: ResourceCategory;
  /** true = free to use, false = paid or freemium */
  free: boolean;
  audience: string;
}

export const RESOURCE_CATEGORIES: { value: ResourceCategory; label: string; blurb: string }[] = [
  {
    value: "official-exams",
    label: "Official Exam Portals",
    blurb: "The single source of truth — registration, syllabi, results and brochures.",
  },
  {
    value: "exam-prep",
    label: "Exam Prep & CBT",
    blurb: "Practice with past questions and CBT simulators before the real day.",
  },
  {
    value: "scholarships",
    label: "Scholarships & Funding",
    blurb: "Free money is out there — know where it lives and how to apply.",
  },
  {
    value: "learning",
    label: "Skills & Learning",
    blurb: "Free and paid paths to job-ready skills, from data to software to design.",
  },
  {
    value: "design",
    label: "Design & Creative",
    blurb: "UI/UX, visual design and creative tools — portfolio beats degree in this industry.",
  },
  {
    value: "jobs",
    label: "Jobs & Internships",
    blurb: "Where Nigerian employers and graduate trainees actually post openings.",
  },
  {
    value: "community",
    label: "Communities & Mentorship",
    blurb: "Learn faster with people who are already where you want to be.",
  },
];

export const RESOURCES: Resource[] = [
  // ── Official exam portals ───────────────────────────────────────────────
  {
    slug: "jamb",
    name: "JAMB (UTME)",
    description:
      "The official portal for UTME registration, the e-Brochure, syllabus, and results. Verify every subject combination here before you register.",
    url: "https://www.jamb.gov.ng",
    category: "official-exams",
    free: true,
    audience: "JAMB candidates",
  },
  {
    slug: "waec",
    name: "WAEC",
    description:
      "West African Examinations Council — the official site for WASSCE registration and the result-checking portal (waecdirect).",
    url: "https://www.waecdirect.org",
    category: "official-exams",
    free: true,
    audience: "SSS students",
  },
  {
    slug: "neco",
    name: "NECO",
    description:
      "National Examinations Council — SSCE registration, results and timetables. A second sitting is allowed here for many courses.",
    url: "https://www.neco.gov.ng",
    category: "official-exams",
    free: true,
    audience: "SSS students",
  },
  {
    slug: "nabteb",
    name: "NABTEB",
    description:
      "National Business and Technical Examinations Board — the technical/vocational equivalent of WASSCE, accepted by many courses.",
    url: "https://www.nabtebnigeria.org",
    category: "official-exams",
    free: true,
    audience: "Technical students",
  },

  // ── Exam prep ───────────────────────────────────────────────────────────
  {
    slug: "myschool",
    name: "MySchool",
    description:
      "Nigeria's largest education community — JAMB past questions, cut-off marks, school news and admission guidance.",
    url: "https://myschool.ng",
    category: "exam-prep",
    free: true,
    audience: "JAMB candidates",
  },
  {
    slug: "pass-ng",
    name: "Pass.ng",
    description:
      "JAMB CBT practice with past questions across all subjects, plus performance analytics to show where you're weak.",
    url: "https://pass.ng",
    category: "exam-prep",
    free: false,
    audience: "JAMB candidates",
  },
  {
    slug: "testdriller",
    name: "TestDriller",
    description:
      "CBT-style practice for JAMB, WAEC, NECO and post-UTME — realistic exam simulation on any device.",
    url: "https://www.testdriller.com",
    category: "exam-prep",
    free: false,
    audience: "Exam candidates",
  },

  // ── Scholarships & funding ──────────────────────────────────────────────
  {
    slug: "tef",
    name: "Tony Elumelu Foundation",
    description:
      "The $5,000 seed capital program for young African entrepreneurs. The most famous youth grant in Nigeria — apply annually.",
    url: "https://www.tonyelumelufoundation.org",
    category: "scholarships",
    free: true,
    audience: "Entrepreneurs",
  },
  {
    slug: "mtn-foundation",
    name: "MTN Foundation Scholarships",
    description:
      "Annual scholarship awards for brilliant but underprivileged Nigerian students in public universities across all disciplines.",
    url: "https://www.mtnfoundationonline.com",
    category: "scholarships",
    free: true,
    audience: "University students",
  },
  {
    slug: "tetfund",
    name: "TETFund",
    description:
      "Tertiary Education Trust Fund — intervention funds and academic staff development for Nigerian public universities.",
    url: "https://tetfund.gov.ng",
    category: "scholarships",
    free: true,
    audience: "Tertiary institutions",
  },
  {
    slug: "scholars4dev",
    name: "Scholarships for Development",
    description:
      "The internet's best-maintained directory of international scholarships — filter by country and level to find funding abroad.",
    url: "https://www.scholars4dev.com",
    category: "scholarships",
    free: true,
    audience: "Postgraduate aspirants",
  },
  {
    slug: "scholarpath",
    name: "ScholarPath",
    description:
      "Search thousands of scholarships worldwide, get real-time alerts matched to your profile, track every application from discovery to acceptance, and navigate visa requirements — all in one place.",
    url: "https://tryscholarpath.vercel.app",
    category: "scholarships",
    free: true,
    audience: "Scholarship hunters",
  },

  // ── Skills & learning ───────────────────────────────────────────────────
  {
    slug: "freecodecamp",
    name: "freeCodeCamp",
    description:
      "Hundreds of hours of free, project-based coding curriculum. Complete their certifications in responsive web, JS, data and more.",
    url: "https://www.freecodecamp.org",
    category: "learning",
    free: true,
    audience: "Self-taught learners",
  },
  {
    slug: "alx",
    name: "ALX Africa",
    description:
      "Structured, cohort-based programs in software engineering, data analytics and product management — built for African learners.",
    url: "https://www.alxafrica.com",
    category: "learning",
    free: false,
    audience: "Career switchers",
  },
  {
    slug: "khan-academy",
    name: "Khan Academy",
    description:
      "World-class free lessons in maths, science and economics — excellent for WAEC maths and foundation building at any age.",
    url: "https://www.khanacademy.org",
    category: "learning",
    free: true,
    audience: "Students & parents",
  },
  {
    slug: "google-digital-skills",
    name: "Google Digital Skills for Africa",
    description:
      "Free certificates in digital marketing and career essentials. One of the fastest free wins for job seekers in Nigeria.",
    url: "https://learndigital.withgoogle.com/digitalskills",
    category: "learning",
    free: true,
    audience: "Job seekers",
  },
  {
    slug: "roadmap-sh",
    name: "roadmap.sh",
    description:
      "Step-by-step visual roadmaps for becoming a developer, data scientist, DevOps engineer and more — with curated topics, projects and resources for every stage.",
    url: "https://roadmap.sh",
    category: "learning",
    free: true,
    audience: "Aspiring developers",
  },
  {
    slug: "the-odin-project",
    name: "The Odin Project",
    description:
      "A free, full-stack web development curriculum built around real projects — HTML/CSS, JavaScript, Node and React, backed by a strong community.",
    url: "https://www.theodinproject.com",
    category: "learning",
    free: true,
    audience: "Self-taught learners",
  },
  {
    slug: "leetcode",
    name: "LeetCode",
    description:
      "Thousands of coding problems for interview preparation — the standard practice ground for software engineering roles, with free daily challenges.",
    url: "https://leetcode.com",
    category: "learning",
    free: true,
    audience: "Developers & job seekers",
  },
  {
    slug: "mdn-web-docs",
    name: "MDN Web Docs",
    description:
      "The definitive, free reference for HTML, CSS and JavaScript, maintained by Mozilla — bookmark it the day you start learning web development.",
    url: "https://developer.mozilla.org",
    category: "learning",
    free: true,
    audience: "Web developers",
  },
  {
    slug: "coursera",
    name: "Coursera",
    description:
      "University-level courses and professional certificates in tech, business and data — apply for financial aid to study major programs for free.",
    url: "https://www.coursera.org",
    category: "learning",
    free: false,
    audience: "Career switchers",
  },

  // ── Design & creative ───────────────────────────────────────────────────
  {
    slug: "figma",
    name: "Figma",
    description:
      "The industry-standard design tool — free for students and individuals. Learn UI/UX through interactive prototypes and real-world file collaboration.",
    url: "https://www.figma.com",
    category: "design",
    free: true,
    audience: "UI/UX designers",
  },
  {
    slug: "google-ux-cert",
    name: "Google UX Design Certificate",
    description:
      "A job-ready UX design certificate from Google on Coursera — includes three portfolio projects that employers actually look at, with financial aid available.",
    url: "https://www.coursera.org/professional-certificates/google-ux-design",
    category: "design",
    free: false,
    audience: "UX designers",
  },
  {
    slug: "dribbble",
    name: "Dribbble",
    description:
      "See how professional designers solve visual problems — study trends, get inspired, and browse design jobs from companies worldwide.",
    url: "https://dribbble.com",
    category: "design",
    free: true,
    audience: "Visual designers",
  },
  {
    slug: "behance",
    name: "Behance",
    description:
      "Adobe's creative portfolio platform — browse thousands of real project case studies for inspiration, and publish your own work for recruiters to find.",
    url: "https://www.behance.net",
    category: "design",
    free: true,
    audience: "Creative professionals",
  },
  {
    slug: "canva-design-school",
    name: "Canva Design School",
    description:
      "Free design courses and tutorials that teach non-designers layout, colour and brand skills in hours — the fastest on-ramp to basic design confidence.",
    url: "https://www.canva.com/designschool",
    category: "design",
    free: true,
    audience: "Design beginners",
  },

  // ── Jobs & internships ──────────────────────────────────────────────────
  {
    slug: "jobberman",
    name: "Jobberman",
    description:
      "Nigeria's biggest job board — thousands of fresh graduate, internship and experienced roles, plus the famous Jobberman soft-skills course.",
    url: "https://www.jobberman.com",
    category: "jobs",
    free: true,
    audience: "Job seekers",
  },
  {
    slug: "myjobmag",
    name: "MyJobMag",
    description:
      "Fast-updating job aggregator with a dedicated graduate trainee section — set alerts for intake cycles at banks and corporates.",
    url: "https://www.myjobmag.com",
    category: "jobs",
    free: true,
    audience: "Graduates & corps members",
  },
  {
    slug: "linkedin",
    name: "LinkedIn",
    description:
      "Where recruiters actually look. Build a profile, follow target companies, and apply before openings hit job boards.",
    url: "https://www.linkedin.com",
    category: "jobs",
    free: true,
    audience: "Everyone",
  },

  // ── Communities & mentorship ────────────────────────────────────────────
  {
    slug: "ingressive-for-good",
    name: "Ingressive For Good",
    description:
      "Free tech training, mentorship and community programs that connect young Africans with global opportunities.",
    url: "https://ingressive.org",
    category: "community",
    free: true,
    audience: "Aspiring techies",
  },
  {
    slug: "shecodeafrica",
    name: "SheCodeAfrica",
    description:
      "Africa's largest community for women in tech — free events, mentorship and a supportive network in 30+ countries.",
    url: "https://shecodeafrica.org",
    category: "community",
    free: true,
    audience: "Women in tech",
  },
  {
    slug: "google-developer-groups",
    name: "Google Developer Groups",
    description:
      "Local developer communities in Lagos, Abuja and cities worldwide — free meetups, talks, hackathons and study jams for beginners and pros alike.",
    url: "https://gdg.community.dev",
    category: "community",
    free: true,
    audience: "Aspiring developers",
  },
  {
    slug: "oscafrica",
    name: "Open Source Community Africa",
    description:
      "Africa's open-source movement — free events, mentorship and a friendly community for contributing to real projects and building a public portfolio.",
    url: "https://oscafrica.org",
    category: "community",
    free: true,
    audience: "Open-source contributors",
  },
  {
    slug: "hng-internship",
    name: "HNG Internship",
    description:
      "Nigeria's famous two-month internship — train on real client projects, get mentored, and connect with companies hiring finalists across the globe.",
    url: "https://hng.tech",
    category: "community",
    free: true,
    audience: "Developers & job seekers",
  },
  {
    slug: "cchub",
    name: "Co-Creation Hub (CcHub)",
    description:
      "Lagos' leading innovation hub — programs, funding and community for founders and tech talent across Africa, from EdTech fellowships to startup support.",
    url: "https://cchub.africa",
    category: "community",
    free: true,
    audience: "Founders & techies",
  },
];

export const getCategory = (value: ResourceCategory) =>
  RESOURCE_CATEGORIES.find((c) => c.value === value);
