import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  BadgeCheck,
  Banknote,
  BookOpen,
  Compass,
  GraduationCap,
  LifeBuoy,
  Route,
  School,
} from "lucide-react";
import { CAREERS, getCareer } from "@/data/careers";
import { getCourse } from "@/data/courses";
import { SaveCareerButton } from "@/components/careers/SaveCareerButton";
import { DifficultyMeter } from "@/components/careers/DifficultyMeter";
import { subjectName } from "@/data/subjects";
import { STREAM_INFO } from "@/data/quiz";
import { formatUsd } from "@/lib/utils";
import { JsonLd } from "@/components/ui";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return CAREERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const career = getCareer(slug);
  if (!career) return { title: "Career not found" };

  const description = `${career.title}: global salary range (${formatUsd(
    career.salaryUsd.entry
  )}–${formatUsd(career.salaryUsd.experienced)}/yr), UTME subject combination, O'Level requirements and the SSS stream you need — traced backwards from the JAMB e-Brochure.`;

  return {
    title: career.title,
    description,
    alternates: { canonical: `/careers/${career.slug}` },
    openGraph: {
      title: `${career.title} — how to become one in Nigeria`,
      description,
      url: `${SITE_URL}/careers/${career.slug}`,
      type: "article",
    },
  };
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const career = getCareer(slug);
  if (!career) notFound();

  const courses = career.courseSlugs.map(getCourse).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const primary = courses[0];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Careers", item: `${SITE_URL}/careers` },
      { "@type": "ListItem", position: 3, name: career.title, item: `${SITE_URL}/careers/${career.slug}` },
    ],
  };

  return (
    <article className="container mx-auto px-4 py-12">
      <Link href="/careers" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 mb-8 inline-flex items-center gap-2 text-sm font-medium">
        <ArrowLeft className="h-4 w-4" /> All careers
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <span className="bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 rounded-full px-3 py-1 text-xs font-semibold uppercase">
          {career.category}
        </span>
        <span className="bg-surface-2 text-ink-2 rounded-full px-3 py-1 text-xs font-semibold capitalize">
          {STREAM_INFO[career.stream].label} stream
        </span>
        <span className="bg-accent-400/15 text-accent-700 dark:text-accent-300 rounded-full px-3 py-1 text-xs font-semibold">
          #{career.rank}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-ink text-4xl font-extrabold tracking-tight sm:text-5xl">{career.title}</h1>
        <SaveCareerButton slug={career.slug} title={career.title} />
      </div>
      <p className="text-ink-2 mt-3 max-w-2xl text-lg">{career.description}</p>

      <section className="border-line bg-surface shadow-[var(--shadow-card)] mt-10 rounded-3xl border p-6 sm:p-8">
        <h2 className="text-ink flex items-center gap-2 text-xl font-bold">
          <Compass className="text-brand-600 dark:text-brand-400 h-6 w-6" />
          Your path, traced backwards
        </h2>

        <ol className="mt-6 space-y-0">
          <PathStep n={1} title="🎯 The goal" last={false}>
            <p className="text-ink font-semibold">{career.title}</p>
            {career.licensing && (
              <p className="text-ink-2 mt-1 text-sm">
                <BadgeCheck className="text-brand-600 dark:text-brand-400 mr-1 inline h-4 w-4" />
                Licensing: {career.licensing}
              </p>
            )}
          </PathStep>

          <PathStep n={2} title="🎓 University course" last={false}>
            {courses.map((course) => (
              <div key={course.slug} className="bg-brand-50/60 dark:bg-brand-950/40 mb-3 rounded-xl p-4 last:mb-0">
                <p className="text-ink font-semibold">
                  {course.name} <span className="text-ink-3 font-normal">· {course.durationYears} years</span>
                </p>
                <p className="text-ink-2 mt-1 text-sm">
                  <School className="mr-1 inline h-4 w-4" />
                  {course.sampleUniversities.join(", ")}
                </p>
                <p className="text-ink-2 mt-1 text-sm">
                  Cutoff reality: JAMB minimum ~{course.cutoffRange.min}, but competitive admission needs{" "}
                  <strong className="text-ink">{course.cutoffRange.competitive}+</strong>
                </p>
                <DifficultyMeter course={course} className="mt-3" />
              </div>
            ))}
          </PathStep>

          {primary && (
            <PathStep n={3} title="📝 UTME subject combination" last={false}>
              <div className="flex flex-wrap gap-2">
                <SubjectChip name="English Language" compulsory />
                {primary.utmeSubjects.map((s) => (
                  <SubjectChip key={s} name={subjectName(s)} />
                ))}
              </div>
              <p className="text-ink-3 mt-2 text-sm">
                Wrong combination = automatic disqualification. Check this <em>before</em> registering.
              </p>
            </PathStep>
          )}

          {primary && (
            <PathStep n={4} title="📋 O'Level (WAEC/NECO) requirements" last={false}>
              <p className="text-ink-2">{primary.oLevel.summary}</p>
              <p className="text-ink-3 mt-1 text-sm">
                Sittings allowed: <strong className="text-ink">{primary.oLevel.maxSittings}</strong>
                {primary.oLevel.maxSittings === 1 && " — all credits must come from ONE exam sitting"}
              </p>
            </PathStep>
          )}

          <PathStep n={5} title="🧭 SSS stream — decided at JSS3" last={true}>
            <p className="text-ink-2">
              You must choose the{" "}
              <strong className="text-brand-700 dark:text-brand-300">{STREAM_INFO[career.stream].label} stream</strong>{" "}
              when entering SSS1. This is how early the path to {career.title} really starts.
            </p>
          </PathStep>
        </ol>
      </section>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <section className="border-line bg-surface rounded-2xl border p-6 shadow-[var(--shadow-card)]">
          <h3 className="text-ink flex items-center gap-2 font-bold">
            <Banknote className="text-brand-600 dark:text-brand-400 h-5 w-5" /> Global salary (USD, annual)
          </h3>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-3">Entry level</dt>
              <dd className="text-ink font-semibold">{formatUsd(career.salaryUsd.entry)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-3">Experienced</dt>
              <dd className="text-ink font-semibold">{formatUsd(career.salaryUsd.experienced)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-3">Demand outlook</dt>
              <dd className="text-ink font-semibold capitalize">{career.outlook}</dd>
            </div>
          </dl>
          {career.nyscNote && (
            <p className="bg-brand-50 text-brand-800 dark:bg-brand-950/60 dark:text-brand-200 mt-4 rounded-lg p-3 text-sm">
              <strong>NYSC:</strong> {career.nyscNote}
            </p>
          )}
        </section>

        <section className="border-line bg-surface rounded-2xl border p-6 shadow-[var(--shadow-card)]">
          <h3 className="text-ink flex items-center gap-2 font-bold">
            <BookOpen className="text-brand-600 dark:text-brand-400 h-5 w-5" /> A typical day
          </h3>
          <ul className="text-ink-2 mt-4 space-y-2 text-sm">
            {career.dayToDay.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="text-brand-500" aria-hidden="true">•</span> {d}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-800/60 dark:bg-amber-950/40">
        <h3 className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
          <LifeBuoy className="h-5 w-5" /> Plan B — if the direct route doesn&apos;t work
        </h3>
        <ul className="text-amber-900/90 dark:text-amber-100/90 mt-3 space-y-2 text-sm">
          {career.altRoutes.map((r) => (
            <li key={r} className="flex gap-2">
              <span aria-hidden="true">→</span> {r}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href={`/roadmap?career=${career.slug}`}
          className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-[var(--shadow-soft-brand)] transition-colors"
        >
          <Route className="h-5 w-5" />
          Get my roadmap
        </Link>
        <Link
          href="/quiz"
          className="border-line-strong text-brand-700 dark:text-brand-300 hover:border-brand-400 inline-flex items-center gap-2 rounded-xl border-2 bg-surface px-6 py-3 font-semibold transition-colors"
        >
          <GraduationCap className="h-5 w-5" />
          Not sure which path fits you? Find your career path
        </Link>
      </div>

      <JsonLd data={breadcrumbSchema} id="breadcrumb-jsonld" />
    </article>
  );
}

function PathStep({ n, title, last, children }: { n: number; title: string; last: boolean; children: React.ReactNode }) {
  return (
    <li className="relative flex gap-4 pb-8 last:pb-0">
      {!last && <span className="bg-brand-100 dark:bg-brand-800 absolute top-10 left-3.75 h-full w-0.5" />}
      <span className="bg-brand-600 dark:bg-brand-500 z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
        {n}
      </span>
      <div className="flex-1 pt-0.5">
        <h3 className="text-ink font-bold">{title}</h3>
        <div className="mt-2">{children}</div>
      </div>
    </li>
  );
}

function SubjectChip({ name, compulsory }: { name: string; compulsory?: boolean }) {
  return (
    <span
      className={
        compulsory
          ? "bg-brand-600 dark:bg-brand-500 rounded-lg px-3 py-1.5 text-sm font-medium text-white"
          : "bg-brand-50 text-brand-800 ring-brand-200 dark:bg-brand-950/60 dark:text-brand-300 dark:ring-brand-800 rounded-lg px-3 py-1.5 text-sm font-medium ring-1"
      }
    >
      {name}
      {compulsory && " (compulsory)"}
    </span>
  );
}
