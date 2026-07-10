'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, User, Users, Briefcase } from 'lucide-react';
import { Container, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

const AUDIENCES = [
  {
    id: 'jss3',
    icon: User,
    tab: 'JSS3 Student',
    who: 'JSS3 Students & Parents',
    problem: "I don't know which stream to pick",
    pain: ['Parents pushing Science "because it\'s the best"', 'Friends all choosing the same stream', 'No idea which careers each stream unlocks', 'Fear of making a permanent mistake at age 14'],
    solution: 'A 3-minute quiz that maps your interests and dream career to the right stream — Science, Arts, or Commercial. No guesswork, no pressure.',
    cta: { label: 'Take the stream quiz', href: '/quiz' },
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    ringColor: 'ring-purple-500/20',
  },
  {
    id: 'jamb',
    icon: Users,
    tab: 'JAMB Candidate',
    who: 'SSS Students & JAMB Candidates',
    problem: 'Will my subjects even work for this course?',
    pain: ['Wrong UTME combination = automatic rejection', 'Conflicting info from friends vs. JAMB brochure', 'Not sure which courses accept your subject combo', 'Discovering the mistake AFTER paying ₦7,000 to register'],
    solution: "Search any career and instantly see the required UTME subjects, O'Level credits, and courses that match. Sourced from the JAMB e-Brochure.",
    cta: { label: 'Explore careers', href: '/careers' },
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    ringColor: 'ring-blue-500/20',
  },
  {
    id: 'grad',
    icon: Briefcase,
    tab: 'Graduate',
    who: 'Graduates & Corps Members',
    problem: 'I studied X but I want to do Y',
    pain: ["Spent 4-6 years in a course you didn't choose", 'NYSC ending with no career plan', '"Start over" feels impossible', 'Every pivot guide is written for Americans'],
    solution: 'Honest pivot guides built for Nigeria — with realistic timelines, steps you can start this week, and mostly-free resources.',
    cta: { label: 'Find a pivot path', href: '/pivot' },
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    ringColor: 'ring-amber-500/20',
  },
] as const;

export function WhoIsThisForSection() {
  const [active, setActive] = useState(0);
  const audience = AUDIENCES[active];

  return (
    <section className="py-20">
      <Container>
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-text-primary text-3xl font-extrabold tracking-tight sm:text-4xl">Where are you in the journey?</h2>
          <p className="text-text-secondary mt-4 text-base leading-relaxed sm:text-lg">Career Compass meets you exactly where you are — whether you&apos;re 14 and choosing a stream, or 24 and rethinking everything.</p>
        </div>

        {/* Tab bar */}
        <div className="mx-auto max-w-3xl">
          <div className="bg-brand-950/3 flex rounded-2xl p-1.5">
            {AUDIENCES.map((a, i) => {
              const Icon = a.icon;
              return (
                <button key={a.id} onClick={() => setActive(i)} className={cn('flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-300', active === i ? 'text-text-primary shadow-brand-950/5 bg-white shadow-md' : 'text-text-tertiary hover:text-text-secondary')}>
                  <Icon className={cn('h-4 w-4 shrink-0 transition-colors duration-300', active === i ? audience.textColor : 'text-text-tertiary')} />
                  <span className="hidden sm:inline">{a.tab}</span>
                </button>
              );
            })}
          </div>

          {/* Content panel */}
          <div key={audience.id} className="shadow-brand-950/4 ring-brand-950/4 mt-6 overflow-hidden rounded-3xl bg-white shadow-xl ring-1">
            {/* Header strip */}
            <div className="flex items-start gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
              <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-4', audience.lightColor, audience.ringColor)}>
                <audience.icon className={cn('h-5 w-5', audience.textColor)} />
              </div>
              <div>
                <h3 className="text-text-primary text-lg font-bold sm:text-xl">{audience.who}</h3>
                <p className="text-text-tertiary mt-0.5 text-[15px] italic">&ldquo;{audience.problem}&rdquo;</p>
              </div>
            </div>

            {/* Pain points */}
            <div className="mt-5 px-6 sm:px-8">
              <p className="text-text-tertiary mb-3 text-[12px] font-semibold tracking-wider uppercase">Sound familiar?</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {audience.pain.map((point) => (
                  <div key={point} className="flex items-start gap-2.5 rounded-xl bg-red-500/4 px-3.5 py-2.5">
                    <span className="mt-0.5 text-xs text-red-400">✕</span>
                    <p className="text-text-secondary text-[13px] leading-snug">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div className="mt-5 px-6 sm:px-8">
              <div className="bg-brand-50/70 rounded-xl px-4 py-3.5">
                <p className="text-brand-600 mb-1 text-[12px] font-semibold tracking-wider uppercase">How Career Compass helps</p>
                <p className="text-text-primary text-[14px] leading-relaxed">{audience.solution}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between px-6 py-5 sm:px-8">
              <Button href={audience.cta.href} size="md" iconRight={<ArrowRight className="h-4 w-4" />}>
                {audience.cta.label}
              </Button>
              <Link href="/careers" className="text-text-tertiary hover:text-text-secondary hidden text-[13px] font-medium transition-colors sm:block">
                or browse all careers →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
