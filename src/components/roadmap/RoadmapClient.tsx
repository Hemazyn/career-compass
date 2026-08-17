"use client";

import Link from "next/link";
import { ArrowLeft, Compass, Printer, Share2 } from "lucide-react";
import { getCareer } from "@/data/careers";
import { getCourse } from "@/data/courses";
import { buildRoadmap } from "@/lib/roadmap";
import { formatUsd } from "@/lib/utils";
import { DifficultyMeter } from "@/components/careers/DifficultyMeter";
import { Button } from "@/components/ui";

export function RoadmapClient({ careerSlug }: { careerSlug: string }) {
  const career = getCareer(careerSlug);

  if (!career) {
    return (
      <div className="container mx-auto max-w-xl px-4 py-16 text-center">
        <Compass className="text-brand-400 mx-auto h-10 w-10" />
        <h1 className="text-ink mt-4 text-2xl font-extrabold">Pick a career to map</h1>
        <p className="text-ink-2 mt-2 text-sm">
          Choose a career and we&apos;ll build your year-by-year roadmap — from the stream you pick at
          JSS3 to a licensed professional.
        </p>
        <Button href="/careers" className="mt-6">
          Explore careers
        </Button>
      </div>
    );
  }

  const course = getCourse(career.courseSlugs[0]);
  const steps = course ? buildRoadmap(career, course) : [];
  const careerTitle = career.title;
  const careerHref = career.slug;

  function print() {
    window.print();
  }

  async function share() {
    const url = `${location.origin}/roadmap?career=${careerHref}`;
    const headline = `🧭 My career roadmap: ${careerTitle} — from JSS3 to licensed pro!`;
    const milestones = steps.map((s, i) => `${i + 1}. ${s.title}`).join("\n");
    const text = `${headline}\n\n${milestones}\n\nBuild yours 👉 ${url}`;
    if (navigator.share) {
      await navigator.share({ title: `Roadmap to ${careerTitle}`, text, url });
    } else {
      await navigator.clipboard.writeText(text);
      alert("Roadmap copied — paste it in WhatsApp!");
    }
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      {/* print-only header */}
      <div className="hidden print:block">
        <h1 className="text-2xl font-extrabold">Career Roadmap: {career.title}</h1>
        <p className="mt-1 text-sm">Career Compass</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href={`/careers/${career.slug}`} className="text-brand-600 hover:text-brand-700 dark:text-brand-400 inline-flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" /> Back to {career.title}
        </Link>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={print} icon={<Printer className="h-4 w-4" />}>
            Print / Save PDF
          </Button>
          <Button variant="primary" size="sm" onClick={share} icon={<Share2 className="h-4 w-4" />}>
            Share
          </Button>
        </div>
      </div>

      <h1 className="text-ink mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Your roadmap to <span className="text-brand-600 dark:text-brand-400">{career.title}</span>
      </h1>
      <p className="text-ink-2 mt-2">
        From the stream you choose at JSS3 to a licensed professional — every step, in order.
      </p>

      {course && (
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="bg-accent-400/15 text-accent-700 dark:text-accent-300 rounded-full px-3 py-1 font-semibold">
            #{career.rank}
          </span>
          <span className="bg-surface-2 text-ink-2 rounded-full px-3 py-1 font-medium">
            {formatUsd(career.salaryUsd.entry)}–{formatUsd(career.salaryUsd.experienced)}/yr
          </span>
        </div>
      )}

      <ol className="mt-10 space-y-0">
        {steps.map((step, i) => (
          <li key={step.title} className="relative flex gap-4 pb-8 last:pb-0">
            {i < steps.length - 1 && (
              <span className="bg-brand-100 dark:bg-brand-800 absolute top-10 left-3.75 h-full w-0.5" aria-hidden="true" />
            )}
            <span className="bg-brand-600 dark:bg-brand-500 z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
              {i + 1}
            </span>
            <div className="flex-1 pt-0.5">
              <p className="text-brand-600 dark:text-brand-400 font-mono text-[11px] font-semibold tracking-wider uppercase">
                {step.phase}
              </p>
              <h2 className="text-ink mt-0.5 font-bold">{step.title}</h2>
              <ul className="text-ink-2 mt-2 space-y-1.5 text-sm">
                {step.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="text-brand-500" aria-hidden="true">•</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      {course && (
        <div className="border-line bg-surface mt-4 rounded-2xl border p-6 shadow-[var(--shadow-card)]">
          <DifficultyMeter course={course} />
        </div>
      )}

      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row print:hidden">
        <Button href="/careers" variant="secondary" iconRight={<Compass className="h-4 w-4" />}>
          Explore more careers
        </Button>
        <Button href="/check" iconRight={<Compass className="h-4 w-4" />}>
          Check your subjects
        </Button>
      </div>
    </div>
  );
}
