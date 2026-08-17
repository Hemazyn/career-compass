import type { Metadata } from "next";
import {
  ArrowRight,
  Compass,
  GraduationCap,
  Map,
  Route,
  Scale,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Button, Container, JsonLd, SectionHeader } from "@/components/ui";
import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/site";
import { CAREERS } from "@/data/careers";
import { COURSES } from "@/data/courses";

export const metadata: Metadata = {
  title: "About",
  description:
    "Career Compass traces careers backwards — from licensed professional to the stream choice you make at JSS3 — so Nigerian students decide with data, not guesswork.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Career Compass",
    description:
      "Free, data-backed career guidance for Nigerian students — from JSS3 stream choice to post-NYSC pivots.",
    type: "website",
  },
};

const TOOLS = [
  {
    icon: Search,
    title: "Career Explorer",
    description: `${CAREERS.length} careers ranked from the world's top career roles, with salaries, demand outlook, licensing paths and NYSC notes.`,
    href: "/careers",
    cta: "Browse careers",
  },
  {
    icon: GraduationCap,
    title: "Career Path Quiz",
    description:
      "18 questions grounded in the RIASEC interest model that recommend Science, Arts or Commercial — and show which doors each choice opens and closes.",
    href: "/quiz",
    cta: "Take the quiz",
  },
  {
    icon: ShieldCheck,
    title: "Subject Checker",
    description:
      "Pick your WAEC/NECO credits and instantly see which of our mapped courses and careers stay open — before you pay to register.",
    href: "/check",
    cta: "Check your subjects",
  },
  {
    icon: Route,
    title: "Roadmap Generator",
    description:
      "Turn any career into a year-by-year plan: the stream choice at JSS3, JAMB combination, university, licensing, and a Plan B — printable and shareable.",
    href: "/roadmap",
    cta: "Build a roadmap",
  },
  {
    icon: Scale,
    title: "Post-NYSC Pivot Guide",
    description:
      "Already holding a degree? Pick your degree family and see realistic, Nigeria-specific pivot paths graduates actually take — with honest timelines.",
    href: "/pivot",
    cta: "Explore pivots",
  },
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `About ${SITE_NAME}`,
  url: `${SITE_URL}/about`,
  description: metadata.description,
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <Container size="md" className="py-20 text-center">
        <p className="text-brand-600 dark:text-brand-400 font-mono text-sm font-semibold tracking-wider uppercase">
          About {SITE_NAME}
        </p>
        <h1 className="text-ink mt-3 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
          Your career is a map, <span className="text-gradient-brand">not a guess</span>
        </h1>
        <p className="text-ink-2 mx-auto mt-5 max-w-2xl text-lg leading-relaxed">
          {SITE_NAME} helps Nigerian students trace the exact path from a dream career back to the
          decision they need to make today — the stream they pick at JSS3.
        </p>
      </Container>

      {/* The problem */}
      <section className="border-line bg-surface/60 border-y">
        <Container size="md" className="py-16">
          <SectionHeader
            align="left"
            eyebrow="The problem"
            title="Three decisions. Three blind spots. Zero second chances."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "JSS3 → SSS1",
                text: "Science, Art or Commercial — often chosen by parents or peer pressure, not aptitude.",
              },
              {
                step: "2",
                title: "JAMB subject combination",
                text: "One wrong subject quietly locks out the course you actually wanted.",
              },
              {
                step: "3",
                title: "Post-NYSC 'what now?'",
                text: "A degree in hand, no clear direction — and nobody explained the pivot paths.",
              },
            ].map((b) => (
              <div
                key={b.step}
                className="border-line bg-surface shadow-[var(--shadow-card)] rounded-2xl border p-6"
              >
                <span className="bg-brand-600 dark:bg-brand-500 flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white">
                  {b.step}
                </span>
                <h3 className="text-ink mt-4 font-bold">{b.title}</h3>
                <p className="text-ink-2 mt-2 text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <Container size="md" className="py-16">
        <SectionHeader
          align="left"
          eyebrow="How it works"
          title="The reverse path engine"
          description="Instead of asking 'what can I do with these subjects?', we start at the career and trace it backwards — so every requirement is visible before you commit."
        />
        <ol className="mt-8 space-y-3">
          {[
            ["🎯", "Career", "Pick a dream career from our ranked list of careers."],
            ["🪪", "Licensing", "See the professional body (MDCN, ICAN, COREN, Law School…) that regulates it."],
            ["🎓", "University course", "The degree that leads there, with realistic cutoff ranges."],
            ["📝", "UTME combination", "The exact JAMB subjects you must register with."],
            ["📋", "O'Level credits", "Compulsory subjects, minimum credits, and one-sitting rules."],
            ["🧭", "SSS stream", "The Science / Arts / Commercial choice you make at JSS3."],
          ].map(([icon, step, text], i) => (
            <li
              key={step}
              className="border-line bg-surface flex items-center gap-4 rounded-2xl border p-5 shadow-[var(--shadow-card)]"
            >
              <span className="text-2xl" aria-hidden="true">
                {icon}
              </span>
              <div>
                <p className="font-mono text-[11px] font-semibold tracking-wider text-ink-3 uppercase">
                  Step {i + 1}
                </p>
                <h3 className="text-ink font-bold">{step}</h3>
                <p className="text-ink-2 text-sm">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>

      {/* Tools */}
      <section className="border-line bg-surface/60 border-y">
        <Container size="md" className="py-16">
          <SectionHeader
            align="left"
            eyebrow="The tools"
            title="One site, every decision mapped"
            description={`${CAREERS.length} careers across ${COURSES.length} university courses — plus a quiz, a subject checker, roadmaps, and pivot guides. All free, no sign-up.`}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {TOOLS.map((t) => (
              <div
                key={t.title}
                className="border-line bg-surface shadow-[var(--shadow-card)] flex flex-col rounded-2xl border p-6"
              >
                <div className="bg-brand-600 dark:bg-brand-500 flex h-10 w-10 items-center justify-center rounded-xl text-white">
                  <t.icon className="h-5 w-5" />
                </div>
                <h3 className="text-ink mt-4 font-bold">{t.title}</h3>
                <p className="text-ink-2 mt-2 flex-1 text-sm leading-relaxed">{t.description}</p>
                <Button
                  href={t.href}
                  variant="secondary"
                  size="sm"
                  className="mt-4 self-start"
                  iconRight={<ArrowRight className="h-4 w-4" />}
                >
                  {t.cta}
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Data */}
      <Container size="md" className="py-16">
        <SectionHeader
          align="left"
          eyebrow="The data"
          title="Modelled on the JAMB e-Brochure — always verify"
        />
        <p className="text-ink-2 mt-4 text-sm leading-relaxed">
          Course requirements on {SITE_NAME} are modelled on the JAMB e-Brochure and WAEC subject
          rules, but requirements vary by institution and year. That&apos;s why every page reminds
          you to confirm the current details at{" "}
          <a
            href="https://www.jamb.gov.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:underline dark:text-brand-400"
          >
            jamb.gov.ng
          </a>{" "}
          before registering. If you spot something out of date, tell us and we&apos;ll fix it.
        </p>
        <div className="border-line bg-surface mt-6 flex flex-wrap gap-3 rounded-2xl border p-5 text-sm">
          <span className="bg-surface-2 text-ink-2 rounded-full px-3 py-1 font-medium">
            <Map className="text-brand-600 dark:text-brand-400 mr-1 inline h-4 w-4" />
            {CAREERS.length} careers
          </span>
          <span className="bg-surface-2 text-ink-2 rounded-full px-3 py-1 font-medium">
            <GraduationCap className="text-brand-600 dark:text-brand-400 mr-1 inline h-4 w-4" />
            {COURSES.length} mapped courses
          </span>
          <span className="bg-surface-2 text-ink-2 rounded-full px-3 py-1 font-medium">
            <Compass className="text-brand-600 dark:text-brand-400 mr-1 inline h-4 w-4" />
            3 streams · 1 free quiz
          </span>
        </div>
      </Container>

      {/* Behind it */}
      <section className="border-line bg-surface/60 border-y">
        <Container size="md" className="py-16 text-center">
          <SectionHeader
            eyebrow="Behind it"
            title="Built by someone who lived the confusion"
            description="Career Compass is a solo project by devEmma — built for the JSS3 student who gets asked 'so, what do you want to be?' and has no idea where to start."
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href={CONTACT.portfolio}
              external
              variant="secondary"
              icon={<Compass className="h-4 w-4" />}
            >
              Visit the builder&apos;s portfolio
            </Button>
            <Button href="/quiz" iconRight={<ArrowRight className="h-4 w-4" />}>
              Find your career path
            </Button>
          </div>
        </Container>
      </section>

      <JsonLd data={aboutSchema} id="about-jsonld" />
    </div>
  );
}
