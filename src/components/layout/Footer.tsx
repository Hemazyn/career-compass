import Link from 'next/link';
import { ArrowRight, Compass, Globe, Heart, Linkedin, Mail } from 'lucide-react';
import { Container } from '@/components/ui';
import { CONTACT } from '@/lib/site';

const FOOTER_NAV = [
  {
    heading: 'Explore',
    links: [
      { label: 'All Careers', href: '/careers' },
      { label: 'Subject Check', href: '/check' },
      { label: 'Saved Careers', href: '/saved' },
      { label: 'Career Path Quiz', href: '/quiz' },
      { label: 'Post-NYSC Pivot', href: '/pivot' },
      { label: 'Resources', href: '/resources' },
    ],
  },
  {
    heading: 'Streams',
    links: [
      { label: 'Science', href: '/s/science' },
      { label: 'Art', href: '/s/art' },
      { label: 'Commercial', href: '/s/commercial' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'JAMB e-Brochure', href: 'https://www.jamb.gov.ng', external: true },
      { label: 'WAEC Syllabus', href: 'https://www.waecdirect.org', external: true },
      { label: 'NECO', href: 'https://www.neco.gov.ng', external: true },
      { label: 'Resource Hub', href: '/resources' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
] as const;

const SOCIALS = [
  {
    label: 'X (Twitter)',
    href: CONTACT.x,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: CONTACT.linkedin,
    icon: <Linkedin className="h-4 w-4" aria-hidden="true" />,
  },
  {
    label: 'Email',
    href: `mailto:${CONTACT.email}`,
    icon: <Mail className="h-4 w-4" aria-hidden="true" />,
  },
  {
    label: 'Portfolio',
    href: CONTACT.portfolio,
    icon: <Globe className="h-4 w-4" aria-hidden="true" />,
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-brand-950 text-white">
      {/* Top accent line */}
      <div aria-hidden="true" className="from-brand-600 via-brand-400 to-accent-500 h-px bg-linear-to-r" />

      <Container size="lg" className="pt-16 pb-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 text-lg font-bold">
              <span className="bg-brand-600 flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-(--shadow-soft-brand)">
                <Compass className="h-5 w-5" />
              </span>
              Career<span className="text-brand-400">Compass</span>
            </Link>
            <p className="text-brand-300/80 mt-4 max-w-xs text-sm leading-relaxed">The free reverse-path engine for Nigerian students. From JSS3 stream choice to post-NYSC pivots — every decision mapped.</p>

            <div className="mt-6">
              <Link href="/quiz" className="group inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2.5 text-[13px] font-semibold ring-1 ring-white/10 transition-all hover:bg-white/12 hover:ring-white/20">
                Find your career path
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <ul className="mt-6 flex items-center gap-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target={s.href.startsWith('mailto:') ? undefined : '_blank'} rel={s.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'} aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white">
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {FOOTER_NAV.map(({ heading, links }) => (
              <div key={heading}>
                <h2 className="font-mono text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">{heading}</h2>
                <ul className="mt-4 space-y-3">
                  {links.map(({ label, href, ...rest }) => {
                    const external = 'external' in rest && rest.external;
                    return (
                      <li key={label}>
                        {external ? (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 transition-colors hover:text-white">
                            {label}
                            <span className="ml-1 text-[10px] text-white/30">↗</span>
                          </a>
                        ) : (
                          <Link href={href} className="text-sm text-white/60 transition-colors hover:text-white">
                            {label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* JAMB disclaimer */}
        <p className="text-brand-300/50 mt-10 text-center text-xs leading-relaxed">
          Requirements modelled on the JAMB e-Brochure — always{' '}
          <a href="https://www.jamb.gov.ng" target="_blank" rel="noopener noreferrer" className="text-white/60 underline underline-offset-2 transition-colors hover:text-white">
            confirm at jamb.gov.ng
          </a>{' '}
          before registering.
        </p>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-white/8 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
              <p className="text-[12px] text-white/40">© {new Date().getFullYear()} Career Compass</p>
              <nav className="flex items-center gap-4 text-[12px] text-white/40" aria-label="Legal">
                <Link href="/privacy" className="transition-colors hover:text-white">
                  Privacy Policy
                </Link>
                <span aria-hidden="true">·</span>
                <Link href="/terms" className="transition-colors hover:text-white">
                  Terms of Use
                </Link>
              </nav>
            </div>
            <p className="flex items-center gap-1.5 text-[12px] whitespace-nowrap text-white/40">
              Made with <Heart className="text-brand-400 h-3 w-3 fill-current" /> by{' '}
              <a href={CONTACT.portfolio} target="_blank" rel="noopener noreferrer" className="font-medium text-white/70 underline underline-offset-2 transition-colors hover:text-white">
                devEmma
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
