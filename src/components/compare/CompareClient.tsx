"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Scale, X } from "lucide-react";
import { getCareer } from "@/data/careers";
import { getCourse, courseDifficulty } from "@/data/courses";
import { STREAM_INFO } from "@/data/quiz";
import { subjectName } from "@/data/subjects";
import { formatUsd } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function CompareClient({ slugs }: { slugs: string[] }) {
  const careers = slugs
    .map(getCareer)
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .slice(0, 4);

  if (careers.length < 2) {
    return (
      <div className="container mx-auto max-w-xl px-4 py-16 text-center">
        <Scale className="text-brand-400 mx-auto h-10 w-10" />
        <h1 className="text-ink mt-4 text-2xl font-extrabold">Compare careers side by side</h1>
        <p className="text-ink-2 mt-2 text-sm">
          Pick at least two careers to compare — salary, stream, UTME subjects, difficulty and more.
          Head to your{" "}
          <Link href="/saved" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
            saved careers
          </Link>{" "}
          or the{" "}
          <Link href="/careers" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
            career list
          </Link>{" "}
          to choose.
        </p>
      </div>
    );
  }

  const primaryCourses = careers.map((c) => getCourse(c.courseSlugs[0]));

  const rows: { label: string; values: (string | string[])[] }[] = [
    { label: "Global rank", values: careers.map((c) => `#${c.rank}`) },
    { label: "Category", values: careers.map((c) => c.category) },
    { label: "Stream", values: careers.map((c) => STREAM_INFO[c.stream].label) },
    {
      label: "Salary (USD/yr)",
      values: careers.map((c) => `${formatUsd(c.salaryUsd.entry)}–${formatUsd(c.salaryUsd.experienced)}`),
    },
    { label: "Demand outlook", values: careers.map((c) => c.outlook) },
    {
      label: "Admission difficulty",
      values: primaryCourses.map((course) => (course ? courseDifficulty(course).label : "—")),
    },
    {
      label: "UTME subjects",
      values: primaryCourses.map((course) =>
        course ? ["English Language", ...course.utmeSubjects.map(subjectName)] : []
      ),
    },
    {
      label: "O'Level requirement",
      values: primaryCourses.map((course) => (course ? course.oLevel.summary : "—")),
    },
    {
      label: "Course & duration",
      values: primaryCourses.map((course) =>
        course ? `${course.name} · ${course.durationYears} yrs` : "—"
      ),
    },
    {
      label: "Licensing",
      values: careers.map((c) => (c.licensing ? c.licensing : "None required")),
    },
    {
      label: "Plan B",
      values: careers.map((c) => c.altRoutes.join("; ")),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/saved" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 mb-6 inline-flex items-center gap-2 text-sm font-medium">
        <ArrowLeft className="h-4 w-4" /> Back to saved careers
      </Link>

      <h1 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">Compare careers</h1>
      <p className="text-ink-2 mt-2 max-w-2xl text-sm">
        Side-by-side view of your shortlist. Salaries are indicative global USD ranges; JAMB
        requirements vary by institution — always{" "}
        <a href="https://www.jamb.gov.ng" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 inline-flex items-center gap-0.5 font-medium hover:underline">
          confirm at jamb.gov.ng <ExternalLink className="h-3 w-3" />
        </a>
        .
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {careers.map((c) => (
          <Link
            key={c.slug}
            href={`/careers/${c.slug}`}
            className="group border-line bg-surface hover:border-brand-300 dark:hover:border-brand-700 rounded-2xl border p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="bg-accent-400/15 text-accent-700 dark:text-accent-300 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                #{c.rank}
              </span>
              <X className="text-ink-3/50 h-4 w-4" aria-hidden="true" />
            </div>
            <h2 className="text-ink group-hover:text-brand-700 dark:group-hover:text-brand-300 mt-3 font-bold transition-colors">
              {c.title}
            </h2>
            <p className="text-ink-3 mt-1 text-xs">{c.category}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-line shadow-[var(--shadow-card)]">
        <table className="w-full min-w-[640px] border-collapse bg-surface text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className="bg-surface-2/60 px-4 py-3 text-xs font-semibold tracking-wide text-ink-3 uppercase">
                Attribute
              </th>
              {careers.map((c) => (
                <th key={c.slug} className="text-ink px-4 py-3 font-bold whitespace-nowrap">
                  {c.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={cn("border-line", i !== rows.length - 1 && "border-b")}>
                <th scope="row" className="text-ink-3 bg-surface-2/40 px-4 py-3 align-top text-xs font-semibold tracking-wide uppercase">
                  {row.label}
                </th>
                {row.values.map((v, j) => (
                  <td key={j} className="text-ink-2 px-4 py-3 align-top">
                    {Array.isArray(v) ? (
                      <div className="flex flex-wrap gap-1">
                        {v.map((s) => (
                          <span key={s} className="bg-brand-50 text-brand-800 ring-brand-200 dark:bg-brand-950/60 dark:text-brand-300 dark:ring-brand-800 rounded-md px-2 py-0.5 text-xs font-medium ring-1">
                            {s}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span>{v}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-ink-3 mt-6 text-center text-xs">
        Comparing helps — but talk it through with a teacher, parent or mentor before deciding.
      </p>
    </div>
  );
}
