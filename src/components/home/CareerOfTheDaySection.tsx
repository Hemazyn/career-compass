import { ArrowRight, CalendarDays, Compass } from "lucide-react";
import { CAREERS } from "@/data/careers";
import { STREAM_INFO } from "@/data/quiz";
import { formatUsd } from "@/lib/utils";
import { Button, Container, Reveal } from "@/components/ui";

function careerOfTheDay() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return CAREERS[dayOfYear % CAREERS.length];
}

export function CareerOfTheDaySection() {
  const career = careerOfTheDay();

  return (
    <section className="py-16" id="career-of-the-day">
      <Container size="md">
        <Reveal>
          <div className="from-brand-700 via-brand-800 to-brand-950 relative overflow-hidden rounded-3xl px-6 py-10 text-white shadow-[var(--shadow-pop)] sm:px-10">
            <div className="bg-dots pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
            <div className="relative">
              <span className="bg-white/10 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-wider uppercase ring-1 ring-white/20">
                <CalendarDays className="h-3.5 w-3.5 text-accent-400" /> Career of the day
              </span>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="bg-accent-400 text-brand-950 rounded-full px-2.5 py-0.5 text-xs font-bold">
                  #{career.rank}
                </span>
                <span className="text-brand-200 text-sm">{career.category}</span>
                <span className="text-brand-200 text-sm">·</span>
                <span className="text-brand-200 text-sm">{STREAM_INFO[career.stream].label} stream</span>
              </div>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                {career.title}
              </h2>
              <p className="text-brand-200 mt-3 max-w-xl text-base leading-relaxed">
                {career.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="bg-white/10 rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/20">
                  {formatUsd(career.salaryUsd.entry)}–{formatUsd(career.salaryUsd.experienced)}/yr
                </span>
                <span className="text-brand-200 text-sm">New one every day — come back tomorrow.</span>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href={`/careers/${career.slug}`} variant="accent" iconRight={<ArrowRight className="h-4 w-4" />}>
                  Explore this career
                </Button>
                <Button href="/careers" variant="secondary" icon={<Compass className="h-4 w-4" />}>
                  See all {CAREERS.length} careers
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
