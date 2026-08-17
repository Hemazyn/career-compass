import { useId } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/**
 * Brand mark — the Career Compass logo: green gradient tile, white ring and
 * amber needle. Renders the same artwork as `src/app/icon.svg`, so the
 * favicon, PWA icons and in-page branding stay consistent.
 *
 * The gradient id is namespaced per instance so NavBar + Footer (and any
 * other spot) can render the logo on the same page without id collisions.
 */
export function Logo({ className }: LogoProps) {
  const gradientId = `cc-logo-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-8 w-8", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b8a57" />
          <stop offset="1" stopColor="#14472e" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill={`url(#${gradientId})`} />
      <circle cx="32" cy="32" r="17.5" fill="none" stroke="#f4faf6" strokeWidth="3.5" />
      <path d="M32 14.5 L37.5 32 L32 49.5 L26.5 32 Z" fill="#fbbf24" />
      <path d="M32 14.5 L32 49.5" stroke="#f4faf6" strokeWidth="2.5" opacity="0.9" />
      <path d="M14.5 32 L49.5 32" stroke="#f4faf6" strokeWidth="2.5" opacity="0.9" />
    </svg>
  );
}
