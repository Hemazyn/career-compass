import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, align = 'center', className }: SectionHeaderProps) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      {eyebrow && <p className="text-brand-600 mb-3 text-sm font-semibold tracking-widest uppercase">{eyebrow}</p>}
      <h2 className="text-text-primary text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className={cn('text-text-secondary mt-3 text-lg leading-relaxed', align === 'center' && 'mx-auto max-w-2xl')}>{description}</p>}
    </div>
  );
}
