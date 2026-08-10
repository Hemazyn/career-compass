import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";
type ButtonSize = "sm" | "md" | "lg";

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
  type?: "button" | "submit";
  disabled?: boolean;
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[var(--shadow-cta)] hover:bg-brand-700 hover:shadow-[var(--shadow-cta-hover)] active:bg-brand-800 active:translate-y-px",
  secondary:
    "bg-surface text-brand-700 dark:text-brand-300 ring-1 ring-line-strong hover:ring-brand-400/60 hover:bg-brand-50/60 dark:hover:bg-brand-950/40 dark:hover:ring-brand-500/40 active:bg-brand-100 dark:active:bg-brand-950/70 active:translate-y-px",
  ghost:
    "text-ink-2 hover:bg-surface-2 hover:text-ink dark:hover:text-ink active:bg-line/60",
  accent:
    "bg-accent-500 text-brand-950 shadow-[var(--shadow-accent)] hover:bg-accent-400 active:bg-accent-600 active:translate-y-px",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-[52px] px-7 text-base gap-2.5",
};

export function Button({ variant = "primary", size = "md", children, className, icon, iconRight, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 select-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
    "disabled:opacity-50 disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if ("href" in props && props.href) {
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

  const { onClick, type = "button", disabled } = props as ButtonAsButton;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {icon}
      {children}
      {iconRight}
    </button>
  );
}
