"use client";

import { Heart } from "lucide-react";
import { useSavedStore } from "@/store/useSavedStore";
import { cn } from "@/lib/utils";

export function SaveCareerButton({ slug, title }: { slug: string; title: string }) {
  const { saved, toggleSaved } = useSavedStore();
  const isSaved = saved.includes(slug);

  return (
    <button
      type="button"
      onClick={() => toggleSaved(slug)}
      aria-pressed={isSaved}
      aria-label={isSaved ? `Remove ${title} from saved careers` : `Save ${title} to my careers`}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-colors",
        isSaved
          ? "bg-brand-600 text-white ring-brand-600"
          : "bg-surface text-ink-2 ring-line-strong hover:text-brand-700 hover:ring-brand-400 dark:hover:text-brand-300"
      )}
    >
      <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
      {isSaved ? "Saved" : "Save"}
    </button>
  );
}
