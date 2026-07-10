import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
};

export function Container({ children, className, as: Component = 'div', size = 'md' }: ContainerProps) {
  return <Component className={cn('mx-auto px-4 sm:px-6', sizes[size], className)}>{children}</Component>;
}
