import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  label?: string;
}

export function Divider({ className, label }: DividerProps) {
  if (label) {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <div className="bg-line h-px flex-1" />
        <span className="text-ink-3 font-mono text-xs font-medium tracking-widest uppercase">{label}</span>
        <div className="bg-line h-px flex-1" />
      </div>
    );
  }
  return <div className={cn("bg-line h-px", className)} />;
}
