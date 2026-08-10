import { Container, Reveal } from "@/components/ui";
import { CAREERS } from "@/data/careers";
import { COURSES } from "@/data/courses";
import { DEGREE_GROUPS } from "@/data/pivots";

const STATS = [
  { value: `${CAREERS.length}+`, label: "Careers mapped" },
  { value: `${COURSES.length}+`, label: "Courses tracked" },
  { value: `${DEGREE_GROUPS.length}`, label: "Pivot families" },
  { value: "Free", label: "No signup ever" },
];

export function StatsSection() {
  return (
    <section className="py-10">
      <Container size="md">
        <Reveal>
          <div className="border-line bg-surface shadow-[var(--shadow-card)] flex items-center justify-between gap-4 rounded-2xl border px-6 py-5 sm:px-10 sm:py-7">
            {STATS.map(({ value, label }, i) => (
              <div key={label} className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-ink text-2xl font-extrabold tracking-tight sm:text-3xl">
                    <span className="text-gradient-brand">{value}</span>
                  </p>
                  <p className="text-ink-3 mt-0.5 text-[12px]">{label}</p>
                </div>
                {i < STATS.length - 1 && <div className="bg-line h-8 w-px" />}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
