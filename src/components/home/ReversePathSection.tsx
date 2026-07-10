'use client';
import { useState } from 'react';
import { ArrowRight, ChevronDown, Compass } from 'lucide-react';
import { Container, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

const CAREERS = [
  {
    title: 'Pharmacist',
    course: 'Pharmacy (B.Pharm)',
    utme: ['English', 'Physics', 'Chemistry', 'Biology'],
    olevel: '5 credits incl. Maths, English & three Sciences — one sitting',
    stream: 'Science',
  },
  {
    title: 'Lawyer',
    course: 'Law (LL.B)',
    utme: ['English', 'Literature', 'Government', 'CRK/IRK'],
    olevel: '5 credits incl. Maths, English & Literature — one sitting',
    stream: 'Arts',
  },
  {
    title: 'Accountant',
    course: 'Accounting (B.Sc)',
    utme: ['English', 'Mathematics', 'Economics', 'Commerce/Govt'],
    olevel: '5 credits incl. Maths, English & Economics — one sitting',
    stream: 'Commercial',
  },
] as const;

export function ReversePathSection() {
  const [active, setActive] = useState(0);
  const career = CAREERS[active];

  return (
    <section className="py-20">
      <Container>
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="bg-brand-600/8 text-brand-700 mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold">
            <Compass className="h-3.5 w-3.5" />
            How it works
          </div>
          <h2 className="text-text-primary text-3xl font-extrabold tracking-tight sm:text-4xl">
            Pick a career. <span className="text-brand-600">Watch us trace it back.</span>
          </h2>
          <p className="text-text-secondary mt-4 text-base leading-relaxed sm:text-lg">Every other tool asks you to guess forward. We start from the end and reverse-engineer every step.</p>
        </div>

        {/* Interactive demo */}
        <div className="mx-auto max-w-3xl">
          {/* Career selector tabs */}
          <div className="flex items-center justify-center gap-2">
            {CAREERS.map((c, i) => (
              <button key={c.title} onClick={() => setActive(i)} className={cn('rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300', active === i ? 'bg-brand-600 shadow-brand-600/20 text-white shadow-md' : 'bg-brand-950/4 text-text-secondary hover:bg-brand-950/[0.07] hover:text-text-primary')}>
                {c.title}
              </button>
            ))}
          </div>

          {/* Result card */}
          <div className="shadow-brand-950/[5 ring-brand-950/4 mt-8 overflow-hidden rounded-3xl bg-white shadow-xl ring-1">
            {/* Top bar — selected career */}
            <div className="bg-brand-600 flex items-center gap-3 px-6 py-4">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="text-brand-200 text-xs font-medium">I want to be a</p>
                <p className="text-lg font-bold text-white">{career.title}</p>
              </div>
            </div>

            {/* Trace rows */}
            <div className="divide-brand-950/4 divide-y">
              {[
                {
                  step: 'Course required',
                  value: career.course,
                  icon: '🎓',
                },
                {
                  step: 'UTME subjects',
                  value: career.utme,
                  icon: '📝',
                },
                {
                  step: "O'Level (WAEC/NECO)",
                  value: career.olevel,
                  icon: '📋',
                },
                {
                  step: 'SSS Stream — decided at JSS3',
                  value: career.stream,
                  icon: '🧭',
                  highlight: true,
                },
              ].map(({ step, value, icon, highlight }, i) => (
                <div
                  key={step}
                  className={cn('flex items-start gap-4 px-6 py-5 transition-all duration-500', highlight && 'bg-accent-400/6')}
                  style={{
                    animation: `reveal 0.4s ease-out ${i * 100 + 100}ms both`,
                  }}
                >
                  {/* Left — step indicator */}
                  <div className="flex flex-col items-center gap-1 pt-0.5">
                    <span className="text-xl">{icon}</span>
                    {i < 3 && <ChevronDown className="text-text-tertiary/40 h-3.5 w-3.5" />}
                  </div>

                  {/* Right — content */}
                  <div className="flex-1">
                    <p className="text-text-tertiary text-[12px] font-semibold tracking-wider uppercase">{step}</p>
                    {Array.isArray(value) ? (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {value.map((subject) => (
                          <span key={subject} className="bg-brand-950/4 text-text-primary rounded-lg px-2.5 py-1 text-sm font-semibold">
                            {subject}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className={cn('mt-1 text-[15px] font-semibold', highlight ? 'text-brand-700' : 'text-text-primary')}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="bg-brand-50/60 flex items-center justify-between px-6 py-4">
              <p className="text-brand-700 text-[13px] font-medium">✓ Full path traced — from career to JSS3 stream</p>
              <Button href="/careers" size="sm" iconRight={<ArrowRight className="h-3.5 w-3.5" />}>
                Try yours
              </Button>
            </div>
          </div>

          {/* Bottom nudge */}
          <p className="text-text-tertiary mt-6 text-center text-[13px]">
            This is just one example — we have <span className="text-text-secondary font-semibold">50+ careers</span> fully mapped with reverse paths.
          </p>
        </div>
      </Container>

      <style>{`
        @keyframes reveal {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
