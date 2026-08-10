"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, ExternalLink, Search } from "lucide-react";
import { RESOURCES, RESOURCE_CATEGORIES, getCategory } from "@/data/resources";
import type { ResourceCategory } from "@/data/resources";
import { cn } from "@/lib/utils";

const CATEGORY_EMOJI: Record<ResourceCategory, string> = {
  "official-exams": "📋",
  "exam-prep": "✏️",
  scholarships: "🎓",
  learning: "🧠",
  design: "🎨",
  jobs: "💼",
  community: "🤝",
};

export function ResourceExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ResourceCategory | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESOURCES.filter((r) => {
      const inCategory = category === "all" || r.category === category;
      const matches =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        getCategory(r.category)?.label.toLowerCase().includes(q) ||
        r.audience.toLowerCase().includes(q);
      return inCategory && matches;
    });
  }, [query, category]);

  const grouped = useMemo(
    () =>
      RESOURCE_CATEGORIES.map((cat) => ({
        ...cat,
        items: filtered.filter((r) => r.category === cat.value),
      })).filter((g) => g.items.length > 0),
    [filtered]
  );

  const visibleCount = grouped.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <div>
      {/* Controls */}
      <div className="mx-auto mt-10 max-w-2xl">
        <div className="relative">
          <label htmlFor="resource-search" className="sr-only">
            Search resources
          </label>
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-ink-3" />
          <input
            id="resource-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources… (JAMB, scholarship, data analytics…)"
            className="border-line bg-surface text-ink placeholder:text-ink-3 focus:border-brand-500 focus:ring-brand-500/20 w-full rounded-2xl border py-4 pr-4 pl-12 shadow-[var(--shadow-card)] outline-none transition focus:ring-2"
          />
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by category">
          <button
            onClick={() => setCategory("all")}
            aria-pressed={category === "all"}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all",
              category === "all"
                ? "bg-brand-600 text-white shadow-[var(--shadow-soft-brand)]"
                : "bg-surface text-ink-2 hover:bg-surface-2 hover:text-ink ring-line ring-1"
            )}
          >
            All
          </button>
          {RESOURCE_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              aria-pressed={category === cat.value}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all",
                category === cat.value
                  ? "bg-brand-600 text-white shadow-[var(--shadow-soft-brand)]"
                  : "bg-surface text-ink-2 hover:bg-surface-2 hover:text-ink ring-line ring-1"
              )}
            >
              {CATEGORY_EMOJI[cat.value]} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category sections */}
      {grouped.length === 0 && (
        <p className="text-ink-3 mt-16 text-center">No resources match your search — try another term.</p>
      )}

      <div className="mt-14 space-y-14">
        {grouped.map((group) => (
          <section key={group.value} id={group.value} className="scroll-mt-24">
            <div className="flex items-baseline gap-3">
              <h2 className="text-ink text-xl font-bold">
                <span aria-hidden="true">{CATEGORY_EMOJI[group.value]}</span> {group.label}
              </h2>
              <span className="text-ink-3 font-mono text-xs font-semibold tracking-wider uppercase">
                {group.items.length}
              </span>
            </div>
            <p className="text-ink-3 mt-1 text-sm">{group.blurb}</p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((r) => (
                <a
                  key={r.slug}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-line bg-surface shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] relative flex h-full flex-col rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-ink group-hover:text-brand-700 dark:group-hover:text-brand-300 font-bold transition-colors">
                      {r.name}
                    </h3>
                    <ExternalLink className="text-ink-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 mt-0.5 h-4 w-4 shrink-0 transition-colors" />
                  </div>
                  <p className="text-ink-2 mt-2 flex-1 text-[13px] leading-relaxed">{r.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-ink-3 text-xs">{r.audience}</span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                        r.free
                          ? "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                      )}
                    >
                      {r.free ? "Free" : "Paid"}
                    </span>
                  </div>
                  <span className="text-brand-600 dark:text-brand-400 absolute right-4 bottom-4 hidden items-center gap-1 text-xs font-medium group-hover:flex">
                    Visit <ArrowUpRight className="h-3 w-3" />
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="text-ink-3 mt-16 text-center text-xs">
        {visibleCount} resource{visibleCount === 1 ? "" : "s"} shown · Links are external — always verify
        costs, dates and eligibility on the official sites.
      </p>
    </div>
  );
}
