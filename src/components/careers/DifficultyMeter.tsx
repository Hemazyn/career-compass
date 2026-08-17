import type { Course } from "@/types";
import { courseDifficulty } from "@/data/courses";
import { cn } from "@/lib/utils";

export function DifficultyMeter({ course, className }: { course: Course; className?: string }) {
  const { level, label, blurb, dot, text } = courseDifficulty(course);

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="text-ink font-medium">Admission difficulty</span>
        <span className={cn("text-xs font-semibold", text)}>{label}</span>
      </div>
      <div className="mt-1.5 flex gap-1" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={cn("h-2 flex-1 rounded-full", i <= level ? dot : "bg-line")} />
        ))}
      </div>
      <p className="text-ink-3 mt-1.5 text-xs">{blurb}</p>
    </div>
  );
}
