import Link from 'next/link';
import { Compass } from 'lucide-react';
import { Container } from '@/components/ui';

const FOOTER_NAV = [
  {
    heading: 'Explore',
    links: [
      { label: 'All Careers', href: '/careers' },
      { label: 'Stream Quiz', href: '/quiz' },
      { label: 'Post-NYSC Pivot', href: '/pivot' },
    ],
  },
  {
    heading: 'Streams',
    links: [
      { label: 'Science', href: '/s/science' },
      { label: 'Arts', href: '/s/arts' },
      { label: 'Commercial', href: '/s/commercial' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      {
        label: 'JAMB e-Brochure',
        href: 'https://www.jamb.gov.ng',
        external: true,
      },
      {
        label: 'WAEC Syllabus',
        href: 'https://www.waecdirect.org',
        external: true,
      },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-brand-950 mt-10 text-white">
        <div className="container mx-auto py-16 px-4">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
            {/* Brand column */}
            <div className="lg:col-span-5">
              <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold">
                <Compass className="text-brand-400 h-5 w-5" />
                CareerCompass
              </Link>
              <p className="text-brand-300/80 mt-3 max-w-xs text-sm leading-relaxed">The free reverse-path engine for Nigerian students. From JSS3 stream choice to post-NYSC pivots — every decision mapped.</p>

              {/* Newsletter-style CTA */}
              <div className="mt-6">
                <Link href="/quiz" className="group inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2.5 text-[13px] font-semibold text-white ring-1 ring-white/1 transition-all hover:bg-white/12 hover:ring-white/2">
                  <span className="relative flex h-2 w-2">
                    <span className="bg-brand-400 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                    <span className="bg-brand-400 relative inline-flex h-2 w-2 rounded-full" />
                  </span>
                  Take the free stream quiz
                </Link>
              </div>
            </div>

            {/* Nav columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
              {FOOTER_NAV.map(({ heading, links }) => (
                <div key={heading}>
                  <p className="text-[11px] font-semibold tracking-[0.15em] text-white/40 uppercase">{heading}</p>
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

          {/* Divider */}
          <div className="my-10 h-px bg-white/8" />

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-[12px] leading-relaxed text-white/40">
              © {new Date().getFullYear()} Career Compass. Requirements modelled on the JAMB e-Brochure — always{' '}
              <a href="https://www.jamb.gov.ng" target="_blank" rel="noopener noreferrer" className="text-white/60 underline underline-offset-2 transition-colors hover:text-white">
                confirm at jamb.gov.ng
              </a>{' '}
              before registering.
            </p>
            <p className="text-[12px] whitespace-nowrap text-white/40">Built with 💚 in Nigeria</p>
          </div>
        </div>
    </footer>
  );
}
