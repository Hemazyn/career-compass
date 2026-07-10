import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8 sm:p-10',
};

export function Card({ children, className, hover = false, padding = 'md' }: CardProps) {
  return <div className={cn('border-border-subtle bg-surface-raised rounded-2xl border shadow-sm', hover && 'hover:border-brand-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md', paddingStyles[padding], className)}>{children}</div>;
}
