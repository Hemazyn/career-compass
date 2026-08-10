import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8 sm:p-10",
};

export function Card({ children, className, hover = false, padding = "md" }: CardProps) {
  return (
    <div
      className={cn(
        "border-line bg-surface rounded-2xl border shadow-[var(--shadow-card)]",
        hover && "hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-300 hover:border-line-strong",
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
