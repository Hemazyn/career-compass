import { cn } from '@/lib/utils';

interface DividerProps {
  className?: string;
  label?: string;
}

export function Divider({ className, label }: DividerProps) {
  if (label) {
    return (
      <div className={cn('flex items-center gap-4', className)}>
        <div className="bg-border-subtle h-px flex-1" />
        <span className="text-text-tertiary text-xs font-medium tracking-widest uppercase">{label}</span>
        <div className="bg-border-subtle h-px flex-1" />
      </div>
    );
  }
  return <div className={cn('bg-border-subtle h-px', className)} />;
}
