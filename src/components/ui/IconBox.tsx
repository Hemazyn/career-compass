import { cn } from '@/lib/utils';

interface IconBoxProps {
  children: React.ReactNode;
  variant?: 'brand' | 'accent' | 'muted';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles = {
  brand: 'bg-brand-50 text-brand-600',
  accent: 'bg-accent-400/15 text-accent-600',
  muted: 'bg-surface-sunken text-text-tertiary',
};

const sizeStyles = {
  sm: 'h-9 w-9 rounded-lg [&>svg]:h-4 [&>svg]:w-4',
  md: 'h-11 w-11 rounded-xl [&>svg]:h-5 [&>svg]:w-5',
  lg: 'h-14 w-14 rounded-2xl [&>svg]:h-6 [&>svg]:w-6',
};

export function IconBox({ children, variant = 'brand', size = 'md', className }: IconBoxProps) {
  return <div className={cn('flex items-center justify-center', variantStyles[variant], sizeStyles[size], className)}>{children}</div>;
}
