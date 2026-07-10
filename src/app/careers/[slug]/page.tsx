import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BadgeCheck, Banknote, BookOpen, Compass, GraduationCap, LifeBuoy, School } from 'lucide-react';
import { CAREERS, getCareer } from '@/data/careers';
import { getCourse } from '@/data/courses';
import { subjectName } from '@/data/subjects';
import { STREAM_INFO } from '@/data/quiz';
import { formatNaira } from '@/lib/utils';

export function generateStaticParams() {
  return CAREERS.map((c) => ({ slug: c.slug }));
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const career = getCareer(slug);
  if (!career) notFound();

  const courses = career.courseSlugs.map(getCourse).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const primary = courses[0];

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/careers" className="text-brand-600 hover:text-brand-700 mb-8 inline-flex items-center gap-2 text-sm font-medium">
        <ArrowLeft className="h-4 w-4" /> All careers
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <span className="bg-brand-50 text-brand-700 rounded-full px-3 py-1 text-xs font-semibold uppercase">{career.category}</span>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 capitalize">{STREAM_INFO[career.stream].label} stream</span>
      </div>
      <h1 className="mt-4 text-4xl font-extrabold text-gray-900">{career.title}</h1>
      <p className="mt-3 text-lg text-gray-600">{career.description}</p>

      <section className="border-brand-100 mt-10 rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <Compass className="text-brand-600 h-6 w-6" />
          Your path, traced backwards
        </h2>

        <ol className="mt-6 space-y-0">
          {/* Step 1: Career */}
          <PathStep n={1} title="🎯 The goal" last={false}>
            <p className="font-semibold text-gray-900">{career.title}</p>
            {career.licensing && (
              <p className="mt-1 text-sm text-gray-600">
                <BadgeCheck className="text-brand-600 mr-1 inline h-4 w-4" />
                Licensing: {career.licensing}
              </p>
            )}
          </PathStep>

          {/* Step 2: Course */}
          <PathStep n={2} title="🎓 University course" last={false}>
            {courses.map((course) => (
              <div key={course.slug} className="bg-brand-50/60 mb-3 rounded-xl p-4 last:mb-0">
                <p className="font-semibold text-gray-900">
                  {course.name} <span className="font-normal text-gray-500">· {course.durationYears} years</span>
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  <School className="mr-1 inline h-4 w-4" />
                  {course.sampleUniversities.join(', ')}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Cutoff reality: JAMB minimum ~{course.cutoffRange.min}, but competitive admission needs <strong>{course.cutoffRange.competitive}+</strong>
                </p>
              </div>
            ))}
          </PathStep>

          {/* Step 3: UTME */}
          {primary && (
            <PathStep n={3} title="📝 UTME subject combination" last={false}>
              <div className="flex flex-wrap gap-2">
                <SubjectChip name="English Language" compulsory />
                {primary.utmeSubjects.map((s) => (
                  <SubjectChip key={s} name={subjectName(s)} />
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Wrong combination = automatic disqualification. Check this <em>before</em> registering.
              </p>
            </PathStep>
          )}

          {/* Step 4: O'Level */}
          {primary && (
            <PathStep n={4} title="📋 O'Level (WAEC/NECO) requirements" last={false}>
              <p className="text-gray-700">{primary.oLevel.summary}</p>
              <p className="mt-1 text-sm text-gray-500">
                Sittings allowed: <strong>{primary.oLevel.maxSittings}</strong>
                {primary.oLevel.maxSittings === 1 && ' — all credits must come from ONE exam sitting'}
              </p>
            </PathStep>
          )}

          {/* Step 5: Stream */}
          <PathStep n={5} title="🧭 SSS stream — decided at JSS3" last={true}>
            <p className="text-gray-700">
              You must choose the <strong className="text-brand-700">{STREAM_INFO[career.stream].label} stream</strong> when entering SSS1. This is how early the path to {career.title} really starts.
            </p>
          </PathStep>
        </ol>
      </section>

      {/* Salary + day-to-day */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <section className="border-brand-100 rounded-2xl border bg-white p-6">
          <h3 className="flex items-center gap-2 font-bold text-gray-900">
            <Banknote className="text-brand-600 h-5 w-5" /> Salary reality (Nigeria, monthly)
          </h3>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Entry level</dt>
              <dd className="font-semibold">{formatNaira(career.salaryNgn.entry)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Experienced</dt>
              <dd className="font-semibold">{formatNaira(career.salaryNgn.experienced)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Demand outlook</dt>
              <dd className="font-semibold capitalize">{career.outlook}</dd>
            </div>
          </dl>
          {career.nyscNote && (
            <p className="bg-brand-50 text-brand-800 mt-4 rounded-lg p-3 text-sm">
              <strong>NYSC:</strong> {career.nyscNote}
            </p>
          )}
        </section>

        <section className="border-brand-100 rounded-2xl border bg-white p-6">
          <h3 className="flex items-center gap-2 font-bold text-gray-900">
            <BookOpen className="text-brand-600 h-5 w-5" /> A typical day
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            {career.dayToDay.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="text-brand-500">•</span> {d}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Plan B */}
      <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h3 className="flex items-center gap-2 font-bold text-amber-900">
          <LifeBuoy className="h-5 w-5" /> Plan B — if the direct route doesn&apos;t work
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-amber-900/90">
          {career.altRoutes.map((r) => (
            <li key={r} className="flex gap-2">
              <span>→</span> {r}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 flex justify-center">
        <Link href="/quiz" className="bg-brand-600 hover:bg-brand-700 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white">
          <GraduationCap className="h-5 w-5" />
          Not sure this fits you? Take the stream quiz
        </Link>
      </div>
    </div>
  );
}

function PathStep({ n, title, last, children }: { n: number; title: string; last: boolean; children: React.ReactNode }) {
  return (
    <li className="relative flex gap-4 pb-8 last:pb-0">
      {!last && <span className="bg-brand-100 absolute top-10 left-3.75 h-full w-0.5" />}
      <span className="bg-brand-600 z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">{n}</span>
      <div className="flex-1 pt-0.5">
        <h3 className="font-bold text-gray-900">{title}</h3>
        <div className="mt-2">{children}</div>
      </div>
    </li>
  );
}

function SubjectChip({ name, compulsory }: { name: string; compulsory?: boolean }) {
  return (
    <span className={compulsory ? 'bg-brand-600 rounded-lg px-3 py-1.5 text-sm font-medium text-white' : 'bg-brand-50 text-brand-800 ring-brand-200 rounded-lg px-3 py-1.5 text-sm font-medium ring-1'}>
      {name}
      {compulsory && ' (compulsory)'}
    </span>
  );
}
