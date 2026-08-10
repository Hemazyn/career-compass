import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline" | "success";
  className?: string;
}

const variants = {
  default: "bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 ring-1 ring-brand-200 dark:ring-brand-800",
  accent: "bg-accent-400/15 text-accent-700 dark:text-accent-300 ring-1 ring-accent-400/30",
  outline: "bg-transparent text-ink-2 ring-1 ring-line-strong",
  success: "bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300 ring-1 ring-green-200 dark:ring-green-800",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
