import Link from "next/link";
import { ArrowRight, Route } from "lucide-react";
import { Button, Container, Reveal } from "@/components/ui";

const PIVOT_PATHS = [
  {
    degree: "Sciences",
    examples: "Biology, Chemistry, Physics, Biochemistry…",
    pivots: ["Data Analysis", "Pharma Industry", "Software Dev"],
    href: "/pivot/sciences",
  },
  {
    degree: "Engineering",
    examples: "Mechanical, Electrical, Civil, Chemical…",
    pivots: ["Core Eng. Roles", "Product Management", "Solar & Energy"],
    href: "/pivot/engineering",
  },
  {
    degree: "Arts & Humanities",
    examples: "English, History, Philosophy, Linguistics…",
    pivots: ["Copywriting", "Technical Writing", "UX Design"],
    href: "/pivot/arts-humanities",
  },
  {
    degree: "Management & Social Sci",
    examples: "Accounting, Economics, Business Admin…",
    pivots: ["ICAN / ACCA", "Fintech Ops", "Entrepreneurship"],
    href: "/pivot/management",
  },
] as const;

export function PivotSection() {
  return (
    <section className="py-24" id="pivot">
      <Container>
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 ring-brand-200 dark:ring-brand-800 mb-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-wider uppercase ring-1">
            <Route className="h-3.5 w-3.5" /> Already graduated?
          </span>
          <h2 className="text-ink text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Your degree isn&apos;t a dead end.
          </h2>
          <p className="text-ink-2 mt-4 text-base leading-relaxed sm:text-lg">
            Pick your degree family. See the realistic paths Nigerian graduates actually take — with
            honest timelines and mostly-free resources.
          </p>
        </Reveal>

        <Reveal delay={120} className="mx-auto max-w-3xl space-y-2.5">
          {PIVOT_PATHS.map(({ degree, examples, pivots, href }) => (
            <Link
              key={degree}
              href={href}
              className="group border-line bg-surface shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] flex items-center gap-5 rounded-2xl border px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 sm:px-6 sm:py-5"
            >
              <div className="min-w-0 flex-1">
                <h3 className="text-ink text-[15px] font-bold">{degree}</h3>
                <p className="text-ink-3 mt-0.5 truncate text-[13px]">{examples}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden flex-wrap justify-end gap-1.5 sm:flex">
                  {pivots.map((p) => (
                    <span
                      key={p}
                      className="bg-surface-2 text-ink-2 group-hover:bg-brand-50 group-hover:text-brand-700 dark:group-hover:bg-brand-950/60 dark:group-hover:text-brand-300 rounded-full px-2.5 py-0.5 text-[12px] font-medium transition-colors"
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <ArrowRight className="text-ink-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 h-4 w-4 shrink-0 transition-all duration-200 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </Reveal>

        <Reveal delay={200} className="mt-10 text-center">
          <Button href="/pivot" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
            Explore all pivot paths
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
