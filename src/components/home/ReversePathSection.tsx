"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, Compass } from "lucide-react";
import { Button, Container, Reveal } from "@/components/ui";
import { cn } from "@/lib/utils";
import { CAREERS as ALL_CAREERS } from "@/data/careers";

const CAREERS = [
  {
    title: "Aeronautical Engineer",
    course: "Aeronautical / Aerospace Engineering (B.Eng)",
    utme: ["English", "Mathematics", "Physics", "Chemistry"],
    olevel: "5 credits incl. Maths, English, Physics & Chemistry — one sitting",
    stream: "Science",
  },
  {
    title: "Neuroscientist",
    course: "Medicine & Surgery / Biochemistry (MBBS · B.Sc)",
    utme: ["English", "Physics", "Chemistry", "Biology"],
    olevel: "5 credits incl. Maths, English & three Sciences — one sitting",
    stream: "Science",
  },
  {
    title: "Actuary",
    course: "Actuarial Science (B.Sc)",
    utme: ["English", "Mathematics", "Economics", "Further Maths"],
    olevel: "5 credits incl. Maths, English & Economics — one sitting",
    stream: "Commercial",
  },
] as const;

export function ReversePathSection() {
  const [active, setActive] = useState(0);
  const career = CAREERS[active];

  return (
    <section className="py-24" id="how-it-works">
      <Container>
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 ring-brand-200 dark:ring-brand-800 mb-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-wider uppercase ring-1">
            <Compass className="h-3.5 w-3.5" />
            How it works
          </span>
          <h2 className="text-ink text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Pick a career. <span className="text-brand-600 dark:text-brand-400">Watch us trace it back.</span>
          </h2>
          <p className="text-ink-2 mt-4 text-base leading-relaxed sm:text-lg">
            Every other tool asks you to guess forward. We start from the end and reverse-engineer every step.
          </p>
        </Reveal>

        <Reveal delay={120} className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CAREERS.map((c, i) => (
              <button
                key={c.title}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
                  active === i
                    ? "bg-brand-600 text-white shadow-[var(--shadow-soft-brand)]"
                    : "bg-surface-2 text-ink-2 hover:bg-line/70 hover:text-ink"
                )}
              >
                {c.title}
              </button>
            ))}
          </div>

          <div className="border-line bg-surface shadow-[var(--shadow-pop)] mt-8 overflow-hidden rounded-3xl border">
            <div className="bg-brand-600 flex items-center gap-3 px-6 py-4">
              <span className="text-2xl" aria-hidden="true">🎯</span>
              <div>
                <p className="text-brand-200 text-xs font-medium">I want to be a</p>
                <p className="text-lg font-bold text-white">{career.title}</p>
              </div>
            </div>

            <div className="divide-line divide-y">
              {[
                { step: "Course required", value: career.course, icon: "🎓" },
                { step: "UTME subjects", value: career.utme, icon: "📝" },
                { step: "O'Level (WAEC/NECO)", value: career.olevel, icon: "📋" },
                { step: "SSS Stream — decided at JSS3", value: career.stream, icon: "🧭", highlight: true },
              ].map(({ step, value, icon, highlight }, i) => (
                <div
                  key={step}
                  className={cn("animate-fade-in-up flex items-start gap-4 px-6 py-5", highlight && "bg-accent-400/8 dark:bg-accent-400/10")}
                  style={{ animationDelay: `${i * 90 + 80}ms` }}
                >
                  <div className="flex flex-col items-center gap-1 pt-0.5">
                    <span className="text-xl" aria-hidden="true">{icon}</span>
                    {i < 3 && <ChevronDown className="text-ink-3/40 h-3.5 w-3.5" />}
                  </div>

                  <div className="flex-1">
                    <p className="text-ink-3 font-mono text-[11px] font-semibold tracking-wider uppercase">{step}</p>
                    {Array.isArray(value) ? (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {value.map((subject) => (
                          <span key={subject} className="bg-surface-2 text-ink ring-line rounded-lg px-2.5 py-1 text-sm font-semibold ring-1">
                            {subject}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className={cn("mt-1 text-[15px] font-semibold", highlight ? "text-brand-700 dark:text-brand-300" : "text-ink")}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-surface-2/70 flex flex-wrap items-center justify-between gap-3 px-6 py-4">
              <p className="text-brand-700 dark:text-brand-300 text-[13px] font-medium">
                ✓ Full path traced — from career to JSS3 stream
              </p>
              <Button href="/careers" size="sm" iconRight={<ArrowRight className="h-3.5 w-3.5" />}>
                Try yours
              </Button>
            </div>
          </div>

          <p className="text-ink-3 mt-6 text-center text-[13px]">
            Just one example — we have <span className="text-ink-2 font-semibold">{ALL_CAREERS.length}+ careers</span> fully mapped with reverse paths.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
