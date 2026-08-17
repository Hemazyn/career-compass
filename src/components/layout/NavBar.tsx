'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui';
import { NAV_LINKS } from '@/lib/site';
import { ThemeToggle } from './ThemeToggle';

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className={cn('sticky top-0 z-50 transition-all duration-300', scrolled ? 'border-line/80 bg-canvas/80 border-b shadow-[0_1px_0_0_var(--line),0_8px_30px_-12px_rgb(9_33_19/0.12)] backdrop-blur-xl' : 'border-b border-transparent bg-transparent')}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}{' '}
        <Link href="/" onClick={() => setOpen(false)} className="text-ink group flex items-center gap-2 text-[17px] font-bold tracking-tight" aria-label="Career Compass — home">
          <Logo className="h-8 w-8 shadow-(--shadow-soft-brand) transition-transform duration-200 group-hover:scale-105" />
          <span>
            Career<span className="text-brand-600 dark:text-brand-400">Compass</span>
          </span>
        </Link>
        {/* Desktop nav */}
        <nav className="border-line/80 bg-surface-2/60 ring-line/60 hidden items-center gap-1 rounded-full p-1 ring-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={isActive(href) ? 'page' : undefined} className={cn('relative rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200', isActive(href) ? 'bg-surface text-brand-700 dark:text-brand-300 ring-line shadow-[0_1px_3px_rgb(9_33_19/0.08)] ring-1' : 'text-ink-2 hover:bg-surface hover:text-ink dark:hover:text-ink')}>
              {label}
            </Link>
          ))}
        </nav>
        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Link href="/quiz" className="group bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400 hidden items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold text-white shadow-(--shadow-soft-brand) transition-all duration-200 hover:gap-2.5 lg:inline-flex">
            Get Started
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className={cn('flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 lg:hidden', open ? 'bg-brand-600 text-white' : 'text-ink-2 hover:bg-surface-2 hover:text-ink')} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>
            <div className="relative h-5 w-5">
              <Menu className={cn('absolute inset-0 h-5 w-5 transition-all duration-200', open ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100')} />
              <X className={cn('absolute inset-0 h-5 w-5 transition-all duration-200', open ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0')} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn('overflow-hidden transition-all duration-300 ease-out lg:hidden', open ? 'max-h-104 opacity-100' : 'max-h-0 opacity-0')}>
        <div className="border-line shadow-card bg-surface mx-4 mb-4 rounded-2xl border p-2">
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className={cn('rounded-xl px-4 py-3 text-sm font-medium transition-colors', isActive(href) ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300' : 'text-ink-2 active:bg-surface-2')}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="bg-line mx-2 my-2 h-px" />

          <Link href="/quiz" onClick={() => setOpen(false)} className="bg-brand-600 dark:bg-brand-500 active:bg-brand-700 flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition-colors">
            Get Started — Find Your Path
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Mobile backdrop */}
      <div className={cn('bg-brand-950/30 fixed inset-0 top-0 -z-10 backdrop-blur-sm transition-opacity duration-300 lg:hidden dark:bg-black/60', open ? 'opacity-100' : 'pointer-events-none opacity-0')} onClick={() => setOpen(false)} />
    </header>
  );
}
