import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  external?: boolean;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never;
  external?: never;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white shadow-md shadow-brand-600/15 hover:bg-brand-700 active:bg-brand-800',
  secondary: 'bg-surface-raised text-brand-700 ring-1 ring-brand-200 hover:ring-brand-300 hover:bg-brand-50 active:bg-brand-100',
  ghost: 'text-text-secondary hover:bg-brand-50 hover:text-brand-700 active:bg-brand-100',
  accent: 'bg-accent-500 text-brand-950 shadow-md shadow-accent-500/20 hover:bg-accent-400 active:bg-accent-600',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-13 px-7 text-base gap-2.5',
};

export function Button({ variant = 'primary', size = 'md', children, className, icon, iconRight, ...props }: ButtonProps) {
  const classes = cn('inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150', 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500', 'disabled:opacity-50 disabled:pointer-events-none', variantStyles[variant], sizeStyles[size], className);

  if ('href' in props && props.href) {
    const { href, external } = props as ButtonAsLink;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {icon}
          {children}
          {iconRight}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {icon}
        {children}
        {iconRight}
      </Link>
    );
  }

  const { onClick, type = 'button', disabled } = props as ButtonAsButton;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {icon}
      {children}
      {iconRight}
    </button>
  );
}
