'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { CAREERS } from '@/data/careers';
import type { Stream } from '@/types';
import { cn, formatNaira } from '@/lib/utils';

const STREAM_TABS: { value: Stream | 'all'; label: string }[] = [
  { value: 'all', label: 'All streams' },
  { value: 'science', label: 'Science' },
  { value: 'art', label: 'Art' },
  { value: 'commercial', label: 'Commercial' },
];

const OUTLOOK_BADGE: Record<string, string> = {
  high: 'bg-green-100 text-green-800',
  growing: 'bg-blue-100 text-blue-800',
  stable: 'bg-gray-100 text-gray-700',
  competitive: 'bg-amber-100 text-amber-800',
};

export default function CareersPage() {
  const [query, setQuery] = useState('');
  const [stream, setStream] = useState<Stream | 'all'>('all');

  const filtered = useMemo(() => CAREERS.filter((c) => (stream === 'all' || c.stream === stream) && (c.title + c.category + c.description).toLowerCase().includes(query.toLowerCase())), [query, stream]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Explore careers</h1>
      <p className="container mt-2 text-gray-600">Pick a career to trace its full path backwards — course, UTME subjects, O&apos;Level requirements, and the stream you need to choose at JSS3.</p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search careers… (doctor, lawyer, software…)" className="focus:border-0 w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-11 outline-none ring-0 focus:outline-0 focus:ring-0" />
        </div>
        <div className="flex gap-2">
          {STREAM_TABS.map((t) => (
            <button key={t.value} onClick={() => setStream(t.value)} className={cn('rounded-lg px-4 py-2 text-sm font-medium transition', stream === t.value ? 'bg-brand-600 text-white' : 'hover:bg-brand-50 bg-white text-gray-600 ring-1 ring-gray-200')}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((career) => (
          <Link key={career.slug} href={`/careers/${career.slug}`} className="group border-brand-100 flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-brand-600 text-xs font-semibold tracking-wide uppercase">{career.category}</span>
              <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium capitalize', OUTLOOK_BADGE[career.outlook])}>{career.outlook} demand</span>
            </div>
            <h2 className="group-hover:text-brand-700 text-lg font-bold text-gray-900">{career.title}</h2>
            <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-600">{career.description}</p>
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
              <span className="text-gray-500">
                {formatNaira(career.salaryNgn.entry)}–{formatNaira(career.salaryNgn.experienced)}/mo
              </span>
              <span className="text-brand-600 flex items-center gap-1 font-medium">
                Trace path <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && <p className="mt-16 text-center text-gray-500">No careers match — try a different search or stream.</p>}
    </div>
  );
}
