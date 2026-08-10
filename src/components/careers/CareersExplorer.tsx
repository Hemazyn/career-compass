"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { CAREERS } from "@/data/careers";
import type { Stream } from "@/types";
import { cn, formatNaira } from "@/lib/utils";

const STREAM_TABS: { value: Stream | "all"; label: string }[] = [
  { value: "all", label: "All streams" },
  { value: "science", label: "Science" },
  { value: "art", label: "Art" },
  { value: "commercial", label: "Commercial" },
];

const OUTLOOK_BADGE: Record<string, string> = {
  high: "bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300",
  growing: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
  stable: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  competitive: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
};

export function CareersExplorer() {
  const [query, setQuery] = useState("");
  const [stream, setStream] = useState<Stream | "all">("all");

  const filtered = useMemo(
    () =>
      CAREERS.filter(
        (c) =>
          (stream === "all" || c.stream === stream) &&
          (c.title + c.category + c.description).toLowerCase().includes(query.toLowerCase())
      ),
    [query, stream]
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">Explore careers</h1>
      <p className="text-ink-2 mt-3 max-w-2xl">
        Pick a career to trace its full path backwards — course, UTME subjects, O&apos;Level
        requirements, and the stream you need to choose at JSS3.
      </p>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <label htmlFor="career-search" className="sr-only">
            Search careers
          </label>
          <Search className="absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-ink-3" />
          <input
            id="career-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search careers… (doctor, lawyer, software…)"
            className="border-line bg-surface text-ink placeholder:text-ink-3 focus:border-brand-500 focus:ring-brand-500/20 w-full rounded-xl border py-3 pr-4 pl-11 shadow-[var(--shadow-card)] outline-none transition focus:ring-2"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by stream">
          {STREAM_TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setStream(t.value)}
              aria-pressed={stream === t.value}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                stream === t.value
                  ? "bg-brand-600 text-white shadow-[var(--shadow-soft-brand)]"
                  : "bg-surface text-ink-2 hover:bg-surface-2 hover:text-ink ring-line ring-1"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((career) => (
          <Link
            key={career.slug}
            href={`/careers/${career.slug}`}
            className="group border-line bg-surface shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="text-brand-700 dark:text-brand-300 font-mono text-xs font-semibold tracking-wide uppercase">
                {career.category}
              </span>
              <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", OUTLOOK_BADGE[career.outlook])}>
                {career.outlook} demand
              </span>
            </div>
            <h2 className="text-ink group-hover:text-brand-700 dark:group-hover:text-brand-300 text-lg font-bold transition-colors">
              {career.title}
            </h2>
            <p className="text-ink-2 mt-2 line-clamp-2 flex-1 text-sm">{career.description}</p>
            <div className="border-line mt-4 flex items-center justify-between border-t pt-4 text-sm">
              <span className="text-ink-3">
                {formatNaira(career.salaryNgn.entry)}–{formatNaira(career.salaryNgn.experienced)}/mo
              </span>
              <span className="text-brand-600 dark:text-brand-400 flex items-center gap-1 font-medium">
                Trace path <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-ink-3 mt-16 text-center">No careers match — try a different search or stream.</p>
      )}
    </div>
  );
}
