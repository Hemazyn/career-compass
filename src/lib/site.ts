/**
 * Central site configuration.
 *
 * Update NEXT_PUBLIC_SITE_URL in your environment to point at the real
 * production domain — everything (canonicals, OG tags, sitemap, robots,
 * JSON-LD) is derived from this value.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://careercompass.ng";

export const SITE_NAME = "Career Compass";
export const SITE_TAGLINE =
  "Don't guess your future. Map it. Career guidance for Nigerian students — from JSS3 stream choice to post-NYSC pivots.";
export const SITE_DESCRIPTION =
  "From JSS3 stream choice to post-NYSC pivots: explore careers, check JAMB subject combinations, trace the exact path backwards, and plan your future — built for Nigerian students.";
export const SITE_LOCALE = "en_NG";

export const NAV_LINKS = [
  { href: "/careers", label: "Careers" },
  { href: "/quiz", label: "Stream Quiz" },
  { href: "/pivot", label: "Post-NYSC" },
  { href: "/resources", label: "Resources" },
] as const;
