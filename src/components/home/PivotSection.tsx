import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container, Button } from '@/components/ui';

const PIVOT_PATHS = [
  {
    degree: 'Sciences',
    examples: 'Biology, Chemistry, Physics, Biochemistry…',
    pivots: ['Data Analysis', 'Pharma Industry', 'Software Dev'],
    href: '/pivot/sciences',
  },
  {
    degree: 'Engineering',
    examples: 'Mechanical, Electrical, Civil, Chemical…',
    pivots: ['Core Eng. Roles', 'Product Management', 'Solar & Energy'],
    href: '/pivot/engineering',
  },
  {
    degree: 'Arts & Humanities',
    examples: 'English, History, Philosophy, Linguistics…',
    pivots: ['Copywriting', 'Technical Writing', 'UX Design'],
    href: '/pivot/arts',
  },
  {
    degree: 'Management & Social Sci',
    examples: 'Accounting, Economics, Business Admin…',
    pivots: ['ICAN / ACCA', 'Fintech Ops', 'Entrepreneurship'],
    href: '/pivot/management',
  },
] as const;

export function PivotSection() {
  return (
    <section className="py-20">
      <Container>
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-brand-600 mb-3 text-[13px] font-semibold tracking-wider uppercase">Already graduated?</p>
          <h2 className="text-text-primary text-3xl font-extrabold tracking-tight sm:text-4xl">Your degree isn&apos;t a dead end.</h2>
          <p className="text-text-secondary mt-4 text-base leading-relaxed sm:text-lg">Pick your degree family. See the realistic paths Nigerian graduates actually take — with honest timelines and mostly-free resources.</p>
        </div>

        {/* Pivot rows */}
        <div className="mx-auto max-w-3xl space-y-2">
          {PIVOT_PATHS.map(({ degree, examples, pivots, href }) => (
            <Link key={degree} href={href} className="group shadow-brand-950/3 ring-brand-950/4 hover:shadow-brand-950/6 flex items-center gap-5 rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:px-6 sm:py-5">
              {/* Left — degree info */}
              <div className="min-w-0 flex-1">
                <h3 className="text-text-primary text-[15px] font-bold">{degree}</h3>
                <p className="text-text-tertiary mt-0.5 truncate text-[13px]">{examples}</p>
              </div>

              {/* Right — pivot tags + arrow */}
              <div className="flex items-center gap-3">
                <div className="hidden flex-wrap justify-end gap-1.5 sm:flex">
                  {pivots.map((p) => (
                    <span key={p} className="bg-brand-950/4 text-text-secondary group-hover:bg-brand-50 group-hover:text-brand-700 rounded-full px-2.5 py-0.5 text-[12px] font-medium transition-colors">
                      {p}
                    </span>
                  ))}
                </div>
                <ArrowRight className="text-text-tertiary group-hover:text-brand-600 h-4 w-4 shrink-0 transition-all duration-200 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Button href="/pivot" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
            Explore all pivot paths
          </Button>
        </div>
      </Container>
    </section>
  );
}
