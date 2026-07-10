import type { Stream } from "@/types";

export interface PivotPath {
  title: string;
  fit: "natural" | "stretch" | "bold";
  why: string;
  firstSteps: string[];
  timeToEmployable: string;
  resources: { name: string; url: string; free: boolean }[];
}

export interface DegreeGroup {
  slug: string;
  label: string;
  examples: string;
  stream: Stream | "any";
  reality: string;
  paths: PivotPath[];
}

/**
 * Post-NYSC Pivot Guide — realistic paths Nigerian graduates actually take,
 * grouped by degree family. "Time to employable" assumes focused part-time effort.
 */
export const DEGREE_GROUPS: DegreeGroup[] = [
  {
    slug: "sciences",
    label: "Pure & Applied Sciences",
    examples: "Biochemistry, Microbiology, Botany, Zoology, Chemistry, Physics, Geology…",
    stream: "science",
    reality:
      "The classic 'I wanted Medicine, got Botany' outcome. Lab jobs are scarce and underpaid — but your analytical training is a genuine asset in tech, data and health-adjacent industries.",
    paths: [
      {
        title: "Data Analysis / Data Science",
        fit: "natural",
        why: "You already think in hypotheses and evidence. Add SQL, Excel, Power BI and Python — banks, telcos and health orgs hire science grads constantly.",
        firstSteps: [
          "Learn Excel deeply, then SQL (free: Khan Academy, SQLBolt)",
          "One Google Data Analytics or ALX Data course",
          "Build 3 portfolio analyses with Nigerian datasets (NBS data is public)",
        ],
        timeToEmployable: "6–9 months",
        resources: [
          { name: "ALX Africa Data Analytics", url: "https://www.alxafrica.com", free: true },
          {
            name: "Google Data Analytics (Coursera)",
            url: "https://www.coursera.org/professional-certificates/google-data-analytics",
            free: false,
          },
          { name: "DataCamp", url: "https://www.datacamp.com", free: false },
        ],
      },
      {
        title: "Health & Pharma Industry Roles",
        fit: "natural",
        why: "Medical sales reps, QA/QC in manufacturing, regulatory affairs, clinical research associates — pharma companies prefer science grads and train on the job.",
        firstSteps: [
          "Target pharma/FMCG grad trainee programs (May & Baker, Fidson, Emzor, Nestlé)",
          "Get a professional CV review; apply through LinkedIn and MyJobMag",
          "Consider NAFDAC/regulatory short courses",
        ],
        timeToEmployable: "3–6 months",
        resources: [
          { name: "MyJobMag (grad trainee alerts)", url: "https://www.myjobmag.com", free: true },
          {
            name: "LinkedIn Learning — Pharma QA",
            url: "https://www.linkedin.com/learning",
            free: false,
          },
        ],
      },
      {
        title: "Software Engineering",
        fit: "stretch",
        why: "Longer runway than data, but the ceiling is much higher (remote/global pay). Science grads consistently do well in structured programs.",
        firstSteps: [
          "Pick ONE path: frontend (HTML/CSS/JS/React) or backend (Python)",
          "AltSchool or Zuri structured program > random YouTube",
          "Ship 3 real projects; learn Git from day one",
        ],
        timeToEmployable: "12–18 months",
        resources: [
          { name: "AltSchool Africa", url: "https://altschoolafrica.com", free: false },
          { name: "Zuri Training", url: "https://training.zuri.team", free: true },
          { name: "freeCodeCamp", url: "https://www.freecodecamp.org", free: true },
        ],
      },
    ],
  },
  {
    slug: "engineering",
    label: "Engineering",
    examples: "Mechanical, Electrical, Civil, Chemical, Petroleum, Agric Engineering…",
    stream: "science",
    reality:
      "Core engineering jobs exist (oil & gas, power, construction) but are fewer than graduates. The good news: engineering degrees are the most respected 'pivot passport' in Nigeria — every industry takes you seriously.",
    paths: [
      {
        title: "Stay Core: Field & Design Engineering",
        fit: "natural",
        why: "If you genuinely like it, double down: COREN registration, industry software (AutoCAD, ETAP, MATLAB), and target grad programs relentlessly.",
        firstSteps: [
          "Master the industry software for your discipline",
          "NSE membership + COREN path started",
          "Apply to every grad trainee intake: Dangote, Shell SPDC, Seplat, Julius Berger, IHS",
        ],
        timeToEmployable: "3–12 months (intake cycles)",
        resources: [
          { name: "Nigerian Society of Engineers", url: "https://nse.org.ng", free: false },
          { name: "Dangote Graduate Trainee", url: "https://www.dangote.com/careers", free: true },
        ],
      },
      {
        title: "Product Management (Tech)",
        fit: "stretch",
        why: "Engineers make strong PMs — structured thinking plus user empathy. Nigerian fintechs actively hire engineering grads into associate PM roles.",
        firstSteps: [
          "Learn the toolkit: user stories, roadmaps, Figma basics, SQL basics",
          "AltSchool product school or Product School free resources",
          "Volunteer as PM on a community/open-source project for portfolio",
        ],
        timeToEmployable: "6–12 months",
        resources: [
          { name: "AltSchool Product", url: "https://altschoolafrica.com", free: false },
          { name: "Utiva Product School", url: "https://utiva.io", free: false },
        ],
      },
      {
        title: "Energy & Solar Industry",
        fit: "natural",
        why: "Nigeria's power gap = boom in solar/mini-grid companies (Arnergy, Husk, Daystar). Electrical/mechanical grads are their exact hiring profile.",
        firstSteps: [
          "Short solar PV design & installation certification",
          "Learn PVsyst/Homer software",
          "Target renewables startups and REA mini-grid projects",
        ],
        timeToEmployable: "4–8 months",
        resources: [
          { name: "REA Nigeria", url: "https://rea.gov.ng", free: true },
          { name: "Solar Energy Intl (online)", url: "https://www.solarenergy.org", free: false },
        ],
      },
    ],
  },
  {
    slug: "social-sciences",
    label: "Social Sciences",
    examples: "Economics, Political Science, Sociology, Psychology, Geography, IR…",
    stream: "art",
    reality:
      "The most flexible degree family — and the most crowded. Differentiation is everything: a hard skill (data, digital marketing, finance certs) on top of your degree changes your market position completely.",
    paths: [
      {
        title: "Banking & Fintech Operations",
        fit: "natural",
        why: "Banks hire social science grads at scale (grad trainee programs). Fintech ops/compliance/customer-success roles are the modern version with better culture.",
        firstSteps: [
          "Apply to every bank grad program: GTB, Access, Zenith, UBA, Sterling",
          "Learn Excel + basic SQL — instant differentiation",
          "CBN/NDIC also run competitive grad intakes",
        ],
        timeToEmployable: "3–9 months (intake cycles)",
        resources: [
          { name: "GTBank Entry Programme", url: "https://www.gtbank.com/careers", free: true },
          {
            name: "Corporate Finance Institute (free tier)",
            url: "https://corporatefinanceinstitute.com",
            free: true,
          },
        ],
      },
      {
        title: "Digital Marketing & Growth",
        fit: "natural",
        why: "Every Nigerian business needs it; barrier to entry is portfolio, not degree. Psychology/sociology grads have a real edge in consumer insight.",
        firstSteps: [
          "Google Digital Skills for Africa certificate (free)",
          "Run real campaigns: offer a small business free social management for 3 months",
          "Learn Meta Ads + Google Ads + basic Canva/CapCut",
        ],
        timeToEmployable: "4–8 months",
        resources: [
          {
            name: "Google Digital Skills for Africa",
            url: "https://learndigital.withgoogle.com/digitalskills",
            free: true,
          },
          { name: "Meta Blueprint", url: "https://www.facebook.com/business/learn", free: true },
        ],
      },
      {
        title: "Development Sector / NGO",
        fit: "stretch",
        why: "UN agencies, NGOs and development consultancies value social science training — M&E (monitoring & evaluation) is the most hireable entry skill.",
        firstSteps: [
          "Learn M&E fundamentals + KoboToolbox",
          "Volunteer/intern with a local NGO for field experience",
          "Track openings on UNjobs, ReliefWeb, Jobzilla NGO section",
        ],
        timeToEmployable: "6–12 months",
        resources: [
          { name: "KoboToolbox (free)", url: "https://www.kobotoolbox.org", free: true },
          { name: "ReliefWeb Jobs", url: "https://reliefweb.int/jobs", free: true },
        ],
      },
    ],
  },
  {
    slug: "arts-humanities",
    label: "Arts & Humanities",
    examples: "English, History, Linguistics, Theatre Arts, Philosophy, Languages…",
    stream: "art",
    reality:
      "Teaching is the default everyone warns you about — but your actual superpower is communication. The content economy, tech writing and media industries pay real money for people who can think and write clearly.",
    paths: [
      {
        title: "Content Strategy & Copywriting",
        fit: "natural",
        why: "Brands, fintechs and agencies pay well for writers who understand persuasion. Copywriting is one of the fastest freelance-income skills in Nigeria.",
        firstSteps: [
          "Study direct-response copy basics (free swipe files online)",
          "Write 10 spec pieces; pitch small businesses",
          "Build presence on LinkedIn/X — writers get discovered there",
        ],
        timeToEmployable: "3–6 months",
        resources: [
          { name: "Copyblogger (free)", url: "https://copyblogger.com", free: true },
          {
            name: "HubSpot Content Marketing Cert",
            url: "https://academy.hubspot.com",
            free: true,
          },
        ],
      },
      {
        title: "Technical Writing (Tech)",
        fit: "stretch",
        why: "Tech companies pay strong salaries for people who explain products clearly. English/Linguistics grads with basic tech literacy do very well.",
        firstSteps: [
          "Learn Markdown, Git basics, API fundamentals",
          "Contribute docs to open-source projects (great portfolio)",
          "Google's free technical writing course",
        ],
        timeToEmployable: "6–10 months",
        resources: [
          {
            name: "Google Technical Writing Course",
            url: "https://developers.google.com/tech-writing",
            free: true,
          },
          { name: "Write the Docs community", url: "https://www.writethedocs.org", free: true },
        ],
      },
      {
        title: "UX Design",
        fit: "bold",
        why: "Humanities training = user empathy. The Lagos design community is strong and welcoming; portfolio matters, not degree.",
        firstSteps: [
          "Learn Figma (free) + design fundamentals",
          "Redesign 3 Nigerian apps as case studies",
          "Join Friends of Figma Lagos / usable.ng community",
        ],
        timeToEmployable: "8–14 months",
        resources: [
          { name: "Figma (free)", url: "https://www.figma.com", free: true },
          {
            name: "Google UX Design Cert",
            url: "https://www.coursera.org/professional-certificates/google-ux-design",
            free: false,
          },
        ],
      },
    ],
  },
  {
    slug: "management",
    label: "Management Sciences",
    examples: "Accounting, Business Admin, Banking & Finance, Marketing, Insurance…",
    stream: "commercial",
    reality:
      "You have the most direct corporate runway — but 'Business Admin' alone is generic. Professional certifications (ICAN, CFA, CIPM) are the multiplier that separates ₦150k jobs from ₦600k jobs.",
    paths: [
      {
        title: "Chartered Accounting (ICAN/ACCA)",
        fit: "natural",
        why: "Still Nigeria's most reliable professional ladder. Audit firms (KPMG, PwC, EY, Deloitte + strong local firms) hire yearly and fund your exams.",
        firstSteps: [
          "Register ICAN (or ACCA if targeting international)",
          "Apply to Big 4 + BDO, Grant Thornton grad intakes",
          "Pass exams on schedule — speed of qualification matters",
        ],
        timeToEmployable: "3–6 months (then 2–3 yrs to chartered)",
        resources: [
          { name: "ICAN Nigeria", url: "https://icanig.org", free: false },
          {
            name: "PwC Nigeria careers",
            url: "https://www.pwc.com/ng/en/careers.html",
            free: true,
          },
        ],
      },
      {
        title: "Fintech Product / Operations",
        fit: "natural",
        why: "Paystack, Flutterwave, Moniepoint, Kuda, PiggyVest hire commercial grads into ops, payment operations, reconciliation, compliance and growth roles.",
        firstSteps: [
          "Learn how payments actually work (free: Paystack/Flutterwave engineering blogs)",
          "Excel + SQL + one no-code tool",
          "Network in Lagos fintech communities; apply directly",
        ],
        timeToEmployable: "4–8 months",
        resources: [
          { name: "Paystack blog", url: "https://paystack.com/blog", free: true },
          { name: "SQLBolt", url: "https://sqlbolt.com", free: true },
        ],
      },
      {
        title: "Entrepreneurship / SME Growth",
        fit: "bold",
        why: "Commercial training is the founder's toolkit. De-risk it: keep a job, start a side business, apply for youth funding (TEF gives $5k grants).",
        firstSteps: [
          "Apply: Tony Elumelu Foundation ($5k), YouWiN successors, LSETF loans",
          "Start with trade/service you understand — not what's trending",
          "Keep clean simple accounts from day one (your degree's edge)",
        ],
        timeToEmployable: "Immediate start, 12–24 months to sustainable",
        resources: [
          {
            name: "Tony Elumelu Foundation",
            url: "https://www.tonyelumelufoundation.org",
            free: true,
          },
          { name: "LSETF (Lagos)", url: "https://lsetf.ng", free: true },
        ],
      },
    ],
  },
  {
    slug: "any-degree",
    label: "Any Degree (skills-first paths)",
    examples: "For everyone — these paths don't care what you studied",
    stream: "any",
    reality:
      "Some of Nigeria's best-paying career paths are certification- and portfolio-based. Your degree got you the NYSC certificate; these skills get you the salary.",
    paths: [
      {
        title: "Software Engineering (self-taught/bootcamp)",
        fit: "bold",
        why: "The highest ceiling of any pivot — remote roles pay in dollars. Requires 12+ months of real consistency; most people quit at month 3. Don't be most people.",
        firstSteps: [
          "100 days of code, no excuses — freeCodeCamp or The Odin Project",
          "Then a structured program (AltSchool/Zuri) for accountability",
          "Ship projects publicly; build in the open on GitHub/X",
        ],
        timeToEmployable: "12–18 months",
        resources: [
          { name: "The Odin Project", url: "https://www.theodinproject.com", free: true },
          { name: "AltSchool Africa", url: "https://altschoolafrica.com", free: false },
        ],
      },
      {
        title: "Sales & Business Development",
        fit: "natural",
        why: "Chronically undersupplied with talent, zero degree requirement, and top salespeople out-earn managers. Tech sales especially (SaaS, fintech B2B).",
        firstSteps: [
          "Read/watch fundamentals (SPIN Selling, sales YouTube)",
          "Take any sales role for 6 months — reps are always hiring",
          "Track your numbers; your results become your CV",
        ],
        timeToEmployable: "1–3 months",
        resources: [
          { name: "HubSpot Sales Cert (free)", url: "https://academy.hubspot.com", free: true },
        ],
      },
      {
        title: "Cybersecurity",
        fit: "bold",
        why: "Global shortage, growing Nigerian demand (banks, telcos). Entry via certifications: Security+, then blue-team skills. More structured path than general software.",
        firstSteps: [
          "CompTIA Security+ as the entry credential",
          "Free labs: TryHackMe beginner paths",
          "Target SOC analyst roles at banks/MSSPs",
        ],
        timeToEmployable: "9–15 months",
        resources: [
          { name: "TryHackMe", url: "https://tryhackme.com", free: true },
          { name: "Cybrary", url: "https://www.cybrary.it", free: true },
        ],
      },
    ],
  },
];

export const getDegreeGroup = (slug: string) => DEGREE_GROUPS.find((g) => g.slug === slug);
