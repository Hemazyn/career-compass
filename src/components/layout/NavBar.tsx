'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/careers', label: 'Careers' },
  { href: '/quiz', label: 'Stream Quiz' },
  { href: '/pivot', label: 'Post-NYSC' },
] as const;

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className={cn('sticky top-0 z-50 transition-all duration-300', scrolled ? 'bg-white/90 shadow-[0_1px_3px_rgba(12,32,17,0.06)] backdrop-blur-xl' : 'bg-transparent')}>
      <div className="mx-auto flex h-16 container items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-text-primary flex items-center gap-2 text-lg font-bold tracking-tight">
          <Compass className="text-brand-600 h-5 w-5" />
          CareerCompass
        </Link>

        {/* Desktop — pill nav */}
        <div className="hidden items-center gap-6 md:flex">
          <nav className="bg-brand-950/4 flex items-center rounded-full p-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className={cn('relative rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200', isActive(href) ? 'text-brand-700 bg-white shadow-sm' : 'text-text-secondary hover:text-text-primary hover:bg-white/60 hover:shadow-sm')}>
                {label}
              </Link>
            ))}
          </nav>

          {!pathname.startsWith('/quiz') && (
            <Link href="/quiz" className="group bg-brand-600 hover:bg-brand-700 flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold text-white transition-all duration-200 hover:gap-2.5">
              Get Started
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className={cn('flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 md:hidden', open ? 'bg-brand-600 text-white' : 'bg-brand-950/4 text-text-secondary hover:bg-brand-950/8')} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>
          <div className="relative h-5 w-5">
            <Menu className={cn('absolute inset-0 h-5 w-5 transition-all duration-200', open ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100')} />
            <X className={cn('absolute inset-0 h-5 w-5 transition-all duration-200', open ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0')} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={cn('overflow-hidden transition-all duration-300 ease-out md:hidden', open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0')}>
        <div className="shadow-brand-950/6 ring-brand-950/4 mx-4 mb-4 rounded-2xl bg-white p-2 shadow-lg ring-1">
          <nav className="flex flex-col">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className={cn('rounded-xl px-4 py-3 text-sm font-medium transition-colors', isActive(href) ? 'bg-brand-50 text-brand-700' : 'text-text-secondary active:bg-brand-50')}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="bg-brand-950/6 mx-2 my-2 h-px" />

          <Link href="/quiz" className="bg-brand-600 active:bg-brand-700 flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition-colors">
            Get Started — Take the Quiz
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Mobile backdrop */}
      <div className={cn('bg-brand-950/20 fixed inset-0 top-0 -z-10 backdrop-blur-sm transition-opacity duration-300 md:hidden', open ? 'opacity-100' : 'pointer-events-none opacity-0')} onClick={() => setOpen(false)} />
    </header>
  );
}
