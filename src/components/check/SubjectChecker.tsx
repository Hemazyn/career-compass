'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ExternalLink, Plus, RotateCcw, X, XCircle } from 'lucide-react';
import { SUBJECTS } from '@/data/subjects';
import { STREAM_INFO } from '@/data/quiz';
import { checkAllCourses, careersForCourse } from '@/lib/subjectCheck';
import { DifficultyMeter } from '@/components/careers/DifficultyMeter';
import { cn } from '@/lib/utils';

function SubjectChips({
  selected,
  onToggle,
  label,
  extra = [],
  onRemoveExtra,
}: {
  selected: string[];
  onToggle: (id: string) => void;
  label: string;
  /** User-added subjects not in the standard list */
  extra?: { id: string; name: string }[];
  onRemoveExtra?: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
      {SUBJECTS.map((s) => {
        const active = selected.includes(s.id);
        return (
          <button key={s.id} type="button" onClick={() => onToggle(s.id)} aria-pressed={active} className={cn('rounded-lg px-3 py-1.5 text-sm font-medium transition-all', active ? 'bg-brand-600 text-white shadow-(--shadow-soft-brand)' : 'bg-surface-2 text-ink-2 ring-line hover:bg-line/60 hover:text-ink ring-1')}>
            {s.name}
          </button>
        );
      })}
      {extra.map((s) => {
        const active = selected.includes(s.id);
        return (
          <span key={s.id} className="inline-flex items-center">
            <button type="button" onClick={() => onToggle(s.id)} aria-pressed={active} className={cn('rounded-l-lg px-3 py-1.5 text-sm font-medium transition-all', active ? 'bg-brand-600 text-white shadow-(--shadow-soft-brand)' : 'bg-surface-2 text-ink-2 ring-line hover:bg-line/60 hover:text-ink ring-1')}>
              {s.name}
            </button>
            <button type="button" onClick={() => onRemoveExtra?.(s.id)} aria-label={`Remove ${s.name}`} className={cn('text-ink-3 -ml-px rounded-r-lg border-l px-1.5 py-1.5 ring-1 transition-colors hover:text-red-500', active ? 'bg-brand-600 border-white/20 text-white/80 shadow-(--shadow-soft-brand) hover:text-white' : 'border-line bg-surface-2 ring-line hover:bg-line/60')}>
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        );
      })}
    </div>
  );
}

export function SubjectChecker() {
  const [credits, setCredits] = useState<string[]>([]);
  const [oneSitting, setOneSitting] = useState(false);
  const [utme, setUtme] = useState<string[]>([]);
  const [customSubjects, setCustomSubjects] = useState<{ id: string; name: string }[]>([]);
  const [customInput, setCustomInput] = useState('');

  const results = useMemo(() => checkAllCourses({ credits, oneSitting, utme: utme.length ? utme : undefined }), [credits, oneSitting, utme]);
  const qualifying = results.filter((r) => r.qualifies);
  const locked = results.filter((r) => !r.qualifies);
  const hasInput = credits.length > 0;

  const toggleCredits = (id: string) => setCredits((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  const toggleUtme = (id: string) => setUtme((u) => (u.includes(id) ? u.filter((x) => x !== id) : [...u, id]));

  function addCustomSubject() {
    const raw = customInput.trim().replace(/\s+/g, ' ');
    if (!raw) return;
    // Title-case the input so the chip looks like a real subject name
    const name = raw
      .split(' ')
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
      .join(' ');
    const normalized = name.toLowerCase();

    // If it's actually a listed subject (e.g. they typed it instead of tapping), just select it
    const listed = SUBJECTS.find((s) => s.name.toLowerCase() === normalized);
    if (listed) {
      toggleCredits(listed.id);
      setCustomInput('');
      return;
    }
    if (customSubjects.some((c) => c.name.toLowerCase() === normalized)) {
      setCustomInput('');
      return;
    }

    const id = `custom-${customSubjects.length + 1}`;
    setCustomSubjects((prev) => [...prev, { id, name }]);
    setCredits((c) => [...c, id]);
    setCustomInput('');
  }

  function removeCustomSubject(id: string) {
    setCustomSubjects((prev) => prev.filter((c) => c.id !== id));
    setCredits((c) => c.filter((x) => x !== id));
  }

  function reset() {
    setCredits([]);
    setOneSitting(false);
    setUtme([]);
    setCustomSubjects([]);
    setCustomInput('');
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">Will your subjects work?</h1>
      <p className="text-ink-2 mt-3 max-w-2xl">Pick the subjects you already have credits in, and we&apos;ll show you exactly which courses — and careers — stay open, and which are locked. No guessing, no paying to find out after registration.</p>

      {/* JAMB confirmation */}
      <div className="bg-brand-50 text-brand-900 dark:bg-brand-950/60 dark:text-brand-100 border-brand-200 dark:border-brand-800/60 mt-6 rounded-2xl border p-5 text-sm">
        <p>
          <strong>Always confirm with JAMB:</strong> these checks are modelled on the JAMB e-Brochure and WAEC subject rules, but requirements vary by institution and year. Before you register, verify the current details on{' '}
          <a href="https://www.jamb.gov.ng" target="_blank" rel="noopener noreferrer" className="text-brand-700 dark:text-brand-300 inline-flex items-center gap-1 font-semibold underline underline-offset-2">
            jamb.gov.ng <ExternalLink className="h-3 w-3" />
          </a>
          .
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <section className="border-line bg-surface rounded-2xl border p-6 shadow-(--shadow-card)">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-ink font-bold">1 · Your O&apos;Level credits</h2>
              <p className="text-ink-3 mt-1 text-sm">
                Tap every subject you have a credit in (WAEC/NECO). <span className="font-medium">{credits.length} selected</span>
              </p>
            </div>
            {hasInput && (
              <button type="button" onClick={reset} className="text-brand-600 hover:text-brand-700 dark:text-brand-400 inline-flex items-center gap-1.5 text-sm font-medium hover:underline">
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            )}
          </div>
          <div className="mt-4">
            <SubjectChips selected={credits} onToggle={toggleCredits} label="O'Level credit subjects" extra={customSubjects} onRemoveExtra={removeCustomSubject} />
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label htmlFor="custom-subject" className="sr-only">
              Add a subject not listed
            </label>
            <input
              id="custom-subject"
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCustomSubject();
                }
              }}
              placeholder="Forgot a subject or it's not listed? Type it — e.g. French, Data Processing"
              className="border-line bg-surface-2 text-ink placeholder:text-ink-3 focus:border-brand-500 focus:ring-brand-500/20 w-full rounded-lg border px-3 py-2 text-sm transition outline-none focus:ring-2"
            />
            <button type="button" onClick={addCustomSubject} className="text-brand-700 dark:text-brand-300 ring-line-strong hover:bg-surface-2 inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold ring-1 transition-colors">
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
          <p className="text-ink-3 mt-2 text-xs">Anything you add counts toward your total credits — even if it&apos;s not mapped to a specific course requirement.</p>
          <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-sm">
            <input type="checkbox" checked={oneSitting} onChange={(e) => setOneSitting(e.target.checked)} className="accent-brand-600 mt-0.5 h-4 w-4" />
            <span>
              <strong className="text-ink">All my credits are from ONE sitting</strong>
              <span className="text-ink-3 block">Some competitive courses (like Medicine and Law) require one sitting — check this only if yours are.</span>
            </span>
          </label>
        </section>

        <section className="border-line bg-surface rounded-2xl border p-6 shadow-(--shadow-card)">
          <h2 className="text-ink font-bold">2 · Your planned UTME subjects (optional)</h2>
          <p className="text-ink-3 mt-1 text-sm">English is compulsory for everyone, so don&apos;t select it — just add your other three (or whatever you&apos;re planning).</p>
          <div className="mt-4">
            <SubjectChips selected={utme} onToggle={toggleUtme} label="Planned UTME subjects" />
          </div>
          {utme.length > 0 && utme.length < 3 && <p className="text-ink-3 mt-3 text-xs">You&apos;ve selected {utme.length} of 3 — most courses need English + 3 subjects.</p>}
        </section>
      </div>

      {!hasInput ? (
        <div className="border-line bg-surface mt-10 rounded-2xl border p-8 text-center">
          <CheckCircle2 className="text-brand-500 mx-auto h-8 w-8" />
          <p className="text-ink-2 mt-3">Select at least one credit above to see which courses and careers are open to you.</p>
        </div>
      ) : (
        <div className="mt-10">
          <h2 className="text-ink text-xl font-bold">
            You qualify for {qualifying.length} of {results.length} courses
          </h2>

          {qualifying.length > 0 ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {qualifying.map(({ course }) => {
                const careers = careersForCourse(course.slug);
                return (
                  <div key={course.slug} className="border-line bg-surface rounded-2xl border p-5 shadow-(--shadow-card)">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-green-500" />
                      <h3 className="text-ink font-bold">{course.name}</h3>
                    </div>
                    <p className="text-ink-3 mt-1 text-xs">
                      {STREAM_INFO[course.stream].label} stream · {course.durationYears} years · {course.faculty}
                    </p>
                    <DifficultyMeter course={course} className="mt-3" />
                    <p className="text-ink-3 mt-3 text-xs">
                      <strong className="text-ink">UTME:</strong> English + {course.utmeSubjects.map((s) => SUBJECTS.find((sub) => sub.id === s)?.name ?? s).join(', ')}
                    </p>
                    {careers.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {careers.slice(0, 3).map((c) => (
                          <Link key={c.slug} href={`/careers/${c.slug}`} className="bg-brand-50 text-brand-800 ring-brand-200 dark:bg-brand-950/60 dark:text-brand-300 dark:ring-brand-800 hover:bg-brand-100 dark:hover:bg-brand-900/60 rounded-lg px-2.5 py-1 text-xs font-medium ring-1 transition-colors">
                            {c.title}
                          </Link>
                        ))}
                        {careers.length > 3 && <span className="text-ink-3 px-1 text-xs">+{careers.length - 3} more</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-900 dark:border-red-800/60 dark:bg-red-950/40 dark:text-red-100">None of our mapped courses match that combination yet — your subjects may still work at some institutions. Confirm with the JAMB brochure before giving up on any course.</div>
          )}

          {locked.length > 0 && (
            <div className="mt-10">
              <h3 className="text-ink text-lg font-bold">Locked out for now — here&apos;s why</h3>
              <p className="text-ink-3 mt-1 text-sm">Add the missing credits below and these open up. This is exactly what we mean by &ldquo;know before you choose.&rdquo;</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {locked.map(({ course, missingCompulsory, insufficientCredits, sittingsBlocked, utmeBlocked }) => {
                  const reasons: string[] = [];
                  if (missingCompulsory.length) {
                    reasons.push(`Missing: ${missingCompulsory.map((s) => SUBJECTS.find((sub) => sub.id === s)?.name ?? s).join(', ')}`);
                  }
                  if (insufficientCredits) reasons.push(`Needs ${course.oLevel.minCredits} credits total`);
                  if (sittingsBlocked) reasons.push('Needs ONE-sitting credits');
                  if (utmeBlocked) reasons.push("UTME combination doesn't match");
                  return (
                    <div key={course.slug} className="border-line bg-surface rounded-xl border p-4">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 shrink-0 text-red-400" />
                        <h4 className="text-ink text-sm font-semibold">{course.name}</h4>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {reasons.map((r) => (
                          <span key={r} className="rounded-md bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-700 dark:bg-red-950/50 dark:text-red-300">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="from-brand-50 dark:from-brand-950/40 mt-12 flex flex-col items-center justify-center gap-3 rounded-2xl bg-linear-to-b to-transparent p-6 text-center sm:flex-row">
        <p className="text-ink-2 text-sm">Not sure which stream to choose in the first place?</p>
        <Link href="/quiz" className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-(--shadow-soft-brand) transition-colors">
          Find your career path <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
