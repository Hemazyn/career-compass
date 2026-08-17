"use client";

import { ArrowRight, Heart, Scale } from "lucide-react";
import { CAREERS } from "@/data/careers";
import { useSavedStore } from "@/store/useSavedStore";
import { CareerCard } from "@/components/careers/CareerCard";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const MAX_COMPARE = 4;

export default function SavedPage() {
  const { saved, compare, toggleCompare, clearCompare } = useSavedStore();
  const savedCareers = CAREERS.filter((c) => saved.includes(c.slug));

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">Saved careers</h1>
      <p className="text-ink-2 mt-3 max-w-2xl">
        Your shortlist — tap the heart on any career card to add or remove it. Saved locally on this
        device, no account needed.
      </p>

      {savedCareers.length === 0 ? (
        <div className="border-line bg-surface mt-10 rounded-2xl border p-12 text-center shadow-[var(--shadow-card)]">
          <Heart className="text-brand-400 mx-auto h-10 w-10" />
          <h2 className="text-ink mt-4 text-xl font-bold">Nothing saved yet</h2>
          <p className="text-ink-2 mx-auto mt-2 max-w-md text-sm">
            Explore the career list and tap the heart on careers you want to keep — build your
            shortlist, then compare your top picks side by side.
          </p>
          <Button href="/careers" className="mt-6" iconRight={<ArrowRight className="h-4 w-4" />}>
            Explore all careers
          </Button>
        </div>
      ) : (
        <>
          <div className="border-line bg-surface mt-8 rounded-2xl border p-5 shadow-[var(--shadow-card)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Scale className="text-brand-600 dark:text-brand-400 h-5 w-5" />
                <h2 className="text-ink font-bold">Compare your top picks</h2>
                <span className="text-ink-3 text-sm">
                  ({compare.length}/{MAX_COMPARE} selected)
                </span>
              </div>
              {compare.length > 0 && (
                <button
                  type="button"
                  onClick={clearCompare}
                  className="text-ink-3 hover:text-ink-2 text-sm font-medium hover:underline"
                >
                  Clear selection
                </button>
              )}
            </div>
            {savedCareers.length > 0 && (
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {savedCareers.map((c) => {
                  const selected = compare.includes(c.slug);
                  const atMax = compare.length >= MAX_COMPARE && !selected;
                  return (
                    <li key={c.slug}>
                      <label
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition-colors",
                          selected
                            ? "border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-950/60"
                            : "border-line hover:border-brand-300 dark:hover:border-brand-700"
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          disabled={atMax}
                          onChange={() => toggleCompare(c.slug)}
                          className="accent-brand-600 h-4 w-4"
                        />
                        <span className="text-ink font-medium">{c.title}</span>
                        <span className="text-ink-3 ml-auto text-xs">#{c.rank}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="mt-4">
              {compare.length >= 2 ? (
                <Button
                  href={`/compare?${compare.map((s) => `c=${s}`).join("&")}`}
                  size="sm"
                >
                  Compare {compare.length} careers
                </Button>
              ) : (
                <Button size="sm" disabled>
                  Compare {compare.length} career{compare.length === 1 ? "" : "s"}
                </Button>
              )}
              {compare.length < 2 && (
                <p className="text-ink-3 mt-2 text-xs">Select at least 2 careers to compare.</p>
              )}
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {savedCareers.map((career) => (
              <CareerCard key={career.slug} career={career} />
            ))}
          </div>

          <p className="text-ink-3 mt-8 text-center text-xs">
            Saved on this browser only — clear your browser data and it&apos;s gone.
          </p>
        </>
      )}
    </div>
  );
}
