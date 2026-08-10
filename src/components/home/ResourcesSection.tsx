import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Container, Reveal, SectionHeader } from "@/components/ui";
import { RESOURCE_CATEGORIES, RESOURCES } from "@/data/resources";

const CATEGORY_ICON: Record<string, string> = {
  "official-exams": "📋",
  "exam-prep": "✏️",
  scholarships: "🎓",
  learning: "🧠",
  design: "🎨",
  jobs: "💼",
  community: "🤝",
};

export function ResourcesSection() {
  return (
    <section className="py-24" id="resources">
      <Container size="lg">
        <Reveal>
          <SectionHeader
            eyebrow="Resource hub"
            title="Everything you need, one click away"
            description="Official exam portals, free learning platforms, scholarships, and job boards — curated for Nigerian students at every stage."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCE_CATEGORIES.map((cat, i) => {
            const count = RESOURCES.filter((r) => r.category === cat.value).length;
            return (
              <Reveal key={cat.value} delay={i * 60}>
                <Link
                  href={`/resources#${cat.value}`}
                  className="group border-line bg-surface shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {CATEGORY_ICON[cat.value] ?? "📚"}
                  </span>
                  <h3 className="text-ink group-hover:text-brand-700 dark:group-hover:text-brand-300 mt-4 text-lg font-bold transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-ink-2 mt-1.5 flex-1 text-sm leading-relaxed">{cat.blurb}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-mono text-[11px] font-semibold tracking-wider text-ink-3 uppercase">
                      {count} resources
                    </span>
                    <ArrowRight className="text-ink-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 h-4 w-4 transition-all duration-200 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={150} className="mt-10 text-center">
          <Link
            href="/resources"
            className="text-brand-700 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-950/50 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            Open the full resource hub
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
