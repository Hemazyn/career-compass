import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, align = "center", className }: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-2xl text-center", className)}>
      {eyebrow && (
        <span className="text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 ring-brand-200 dark:ring-brand-800 mb-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-wider uppercase ring-1">
          {eyebrow}
        </span>
      )}
      <h2 className="text-ink text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="text-ink-2 mt-4 text-base leading-relaxed text-pretty sm:text-lg">{description}</p>
      )}
    </div>
  );
}
