"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import type { Career } from "@/types";
import { useSavedStore } from "@/store/useSavedStore";
import { cn, formatUsd } from "@/lib/utils";

const OUTLOOK_BADGE: Record<string, string> = {
  high: "bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300",
  growing: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
  stable: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  competitive: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
};

export function CareerCard({ career }: { career: Career }) {
  const { saved, toggleSaved } = useSavedStore();
  const isSaved = saved.includes(career.slug);

  return (
    <div className="group border-line bg-surface shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] relative flex flex-col rounded-2xl border transition-all duration-300 hover:-translate-y-0.5">
      <button
        type="button"
        onClick={() => toggleSaved(career.slug)}
        aria-label={isSaved ? `Remove ${career.title} from saved` : `Save ${career.title}`}
        aria-pressed={isSaved}
        className="bg-surface/80 ring-line text-ink-3 hover:text-brand-600 dark:hover:text-brand-400 absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full ring-1 transition-colors"
      >
        <Heart className={cn("h-4 w-4 transition-colors", isSaved && "fill-brand-500 text-brand-500")} />
      </button>

      <Link href={`/careers/${career.slug}`} className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center justify-between gap-2 pr-8">
          <span className="text-brand-700 dark:text-brand-300 font-mono text-xs font-semibold tracking-wide uppercase">
            {career.category}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="bg-accent-400/15 text-accent-700 dark:text-accent-300 rounded-full px-2.5 py-0.5 text-xs font-semibold">
              #{career.rank}
            </span>
            <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", OUTLOOK_BADGE[career.outlook])}>
              {career.outlook} demand
            </span>
          </span>
        </div>
        <h2 className="text-ink group-hover:text-brand-700 dark:group-hover:text-brand-300 text-lg font-bold transition-colors">
          {career.title}
        </h2>
        <p className="text-ink-2 mt-2 line-clamp-2 flex-1 text-sm">{career.description}</p>
        <div className="border-line mt-4 flex items-center justify-between border-t pt-4 text-sm">
          <span className="text-ink-3">
            {formatUsd(career.salaryUsd.entry)}–{formatUsd(career.salaryUsd.experienced)}/yr
          </span>
          <span className="text-brand-600 dark:text-brand-400 flex items-center gap-1 font-medium">
            Trace path <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </div>
  );
}
