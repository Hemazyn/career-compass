'use client';
import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { CAREERS } from '@/data/careers';
import type { Stream } from '@/types';
import { CareerCard } from '@/components/careers/CareerCard';
import { cn } from '@/lib/utils';

export const CAREERS_PER_PAGE = 12;

const STREAM_TABS: { value: Stream | 'all'; label: string }[] = [
  { value: 'all', label: 'All streams' },
  { value: 'science', label: 'Science' },
  { value: 'art', label: 'Art' },
  { value: 'commercial', label: 'Commercial' },
];

function pageNumbers(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const wanted = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...wanted].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | '…')[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) out.push('…');
    out.push(p);
    prev = p;
  }
  return out;
}

export function CareersExplorer() {
  const [query, setQuery] = useState('');
  const [stream, setStream] = useState<Stream | 'all'>('all');
  const [page, setPage] = useState(1);

  // Jump back to the first page whenever the search or stream filter changes
  // (adjusted during render, per React's recommended pattern)
  const [filterKey, setFilterKey] = useState(`${query}|${stream}`);
  if (`${query}|${stream}` !== filterKey) {
    setFilterKey(`${query}|${stream}`);
    setPage(1);
  }

  const filtered = useMemo(() => CAREERS.filter((c) => (stream === 'all' || c.stream === stream) && (c.title + c.category + c.description).toLowerCase().includes(query.toLowerCase())), [query, stream]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / CAREERS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * CAREERS_PER_PAGE, currentPage * CAREERS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">Explore careers</h1>
      <p className="text-ink-2 mt-3 max-w-2xl">
        <strong className="text-ink">{CAREERS.length} careers</strong> ranked from the world&apos;s top career roles. Pick one to trace its full path backwards — course, UTME subjects, O&apos;Level requirements, and the stream you need to choose at JSS3.
      </p>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <label htmlFor="career-search" className="sr-only">
            Search careers
          </label>
          <Search className="text-ink-3 absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2" />
          <input id="career-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search careers… (doctor, lawyer, software…)" className="border-line bg-surface text-ink placeholder:text-ink-3 focus:border-brand-500 focus:ring-brand-500/20 w-full rounded-xl border py-3 pr-4 pl-11 shadow-(--shadow-card) transition outline-none focus:ring-2" />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by stream">
          {STREAM_TABS.map((t) => (
            <button key={t.value} onClick={() => setStream(t.value)} aria-pressed={stream === t.value} className={cn('rounded-lg px-4 py-2 text-sm font-medium transition-all', stream === t.value ? 'bg-brand-600 text-white shadow-(--shadow-soft-brand)' : 'bg-surface text-ink-2 hover:bg-surface-2 hover:text-ink ring-line ring-1')}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((career) => (
          <CareerCard key={career.slug} career={career} />
        ))}
      </div>

      {filtered.length === 0 && <p className="text-ink-3 mt-16 text-center">No careers match — try a different search or stream.</p>}

      {totalPages > 1 && (
        <nav className="mt-12 flex flex-col items-center gap-4" aria-label="Career list pages">
          <p className="text-ink-3 text-sm">
            Page {currentPage} of {totalPages} · {filtered.length} careers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page" className={cn('inline-flex h-9 w-9 items-center justify-center rounded-lg transition-all', currentPage === 1 ? 'text-ink-3/40 cursor-not-allowed' : 'bg-surface text-ink-2 ring-line hover:bg-surface-2 hover:text-ink ring-1')}>
              <ChevronLeft className="h-4 w-4" />
            </button>

            {pageNumbers(currentPage, totalPages).map((p, i) =>
              p === '…' ? (
                <span key={`ellipsis-${i}`} className="text-ink-3 px-1 text-sm">
                  …
                </span>
              ) : (
                <button key={p} onClick={() => setPage(p)} aria-current={p === currentPage ? 'page' : undefined} aria-label={`Page ${p}`} className={cn('h-9 min-w-9 rounded-lg px-2 text-sm font-medium transition-all', p === currentPage ? 'bg-brand-600 text-white shadow-(--shadow-soft-brand)' : 'bg-surface text-ink-2 ring-line hover:bg-surface-2 hover:text-ink ring-1')}>
                  {p}
                </button>
              )
            )}

            <button onClick={() => setPage(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page" className={cn('inline-flex h-9 w-9 items-center justify-center rounded-lg transition-all', currentPage === totalPages ? 'text-ink-3/40 cursor-not-allowed' : 'bg-surface text-ink-2 ring-line hover:bg-surface-2 hover:text-ink ring-1')}>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
