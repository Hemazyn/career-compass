"use client";

import { useEffect, useRef, useState } from "react";
import { GitBranch, GraduationCap, Map } from "lucide-react";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";

const CHAIN_STEPS = [
  {
    icon: GitBranch,
    stage: "JSS3 → SSS1",
    problem: "The Stream Choice",
    text: "Science, Art or Commercial — often chosen by parents or peer pressure, not aptitude. One wrong turn here quietly locks doors that last a lifetime.",
    stat: "Ages 13–14",
    statLabel: "When this decision happens",
    color: "text-red-500",
    bg: "bg-red-500",
    ring: "ring-red-500/20",
    lightBg: "bg-red-500/8",
  },
  {
    icon: GraduationCap,
    stage: "SSS3 → JAMB",
    problem: "The Subject Trap",
    text: "Wrong UTME subject combination means automatic disqualification — even with perfect grades. Thousands discover this only after paying to register.",
    stat: "4 subjects",
    statLabel: "Must match exactly",
    color: "text-amber-500",
    bg: "bg-amber-500",
    ring: "ring-amber-500/20",
    lightBg: "bg-amber-500/8",
  },
  {
    icon: Map,
    stage: "Uni → NYSC → ???",
    problem: "The Identity Gap",
    text: "Four years in a course you never intentionally chose, then entering the job market with no clear career identity and no roadmap forward.",
    stat: "4–6 years",
    statLabel: "Before realizing the mismatch",
    color: "text-brand-500",
    bg: "bg-brand-500",
    ring: "ring-brand-500/20",
    lightBg: "bg-brand-500/8",
  },
] as const;

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function BrokenChainSection() {
  const { ref, inView } = useInView();

  return (
    <section className="py-24" id="problem">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="bg-red-500/8 text-red-600 dark:text-red-400 mb-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-wider uppercase ring-1 ring-red-500/15">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            The problem
          </span>
          <h2 className="text-ink text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Three decisions. Three blind spots.{" "}
            <span className="text-ink-3">Zero second chances.</span>
          </h2>
        </div>

        <div ref={ref} className="relative mt-16">
          <div className="absolute top-14 right-0 left-0 hidden md:block">
            <div className="from-transparent via-line to-transparent mx-auto h-px max-w-3xl bg-linear-to-r" />
            <div
              className={cn(
                "to-brand-400 mx-auto -mt-px h-[2px] max-w-3xl origin-left bg-linear-to-r from-red-400 via-amber-400 transition-transform duration-[1.5s] ease-out",
                inView ? "scale-x-100" : "scale-x-0"
              )}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {CHAIN_STEPS.map(({ icon: Icon, stage, problem, text, stat, statLabel, color, bg, ring, lightBg }, i) => (
              <div
                key={stage}
                className={cn(
                  "group relative transition-all duration-700",
                  inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}
                style={{ transitionDelay: `${i * 150 + 200}ms` }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className={cn("relative flex h-12 w-12 items-center justify-center rounded-2xl ring-4", lightBg, ring)}>
                    <Icon className={cn("h-5 w-5", color)} />
                    <span className={cn("absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white", bg)}>
                      {i + 1}
                    </span>
                  </div>
                  <span className="bg-surface-2 text-ink-3 font-mono rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase">{stage}</span>
                </div>

                <div className="border-line bg-surface shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] rounded-2xl border p-5 transition-all duration-300 group-hover:-translate-y-1">
                  <h3 className="text-ink text-lg font-bold">{problem}</h3>
                  <p className="text-ink-2 mt-2 text-[14px] leading-relaxed">{text}</p>

                  <div className="bg-surface-2/70 mt-4 flex items-center gap-3 rounded-xl px-3.5 py-2.5">
                    <div className={cn("h-8 w-1 rounded-full", bg)} />
                    <div>
                      <p className="text-ink text-sm font-bold">{stat}</p>
                      <p className="text-ink-3 text-[12px]">{statLabel}</p>
                    </div>
                  </div>
                </div>

                {i < CHAIN_STEPS.length - 1 && (
                  <div className="flex justify-center py-2 md:hidden">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-ink-3/30">
                      <path d="M10 4L10 14M10 14L6 10M10 14L14 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            className={cn(
              "mx-auto mt-12 max-w-md text-center transition-all delay-700 duration-700",
              inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <div className="border-line bg-surface shadow-[var(--shadow-card)] inline-flex items-center gap-2 rounded-full border px-5 py-2.5">
              <div className="flex -space-x-1">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="bg-brand-400 h-2 w-2 rounded-full" />
              </div>
              <p className="text-ink-2 text-[13px] font-medium">
                One wrong choice cascades into the next. <span className="text-brand-600 dark:text-brand-400 font-semibold">We fix the chain.</span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
