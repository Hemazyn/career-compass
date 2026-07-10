import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'outline';
  className?: string;
}

const variants = {
  default: 'bg-brand-50 text-brand-700 ring-1 ring-brand-200',
  accent: 'bg-accent-400/15 text-accent-600 ring-1 ring-accent-400/30',
  outline: 'bg-transparent text-text-secondary ring-1 ring-border-default',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return <span className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide', variants[variant], className)}>{children}</span>;
}
