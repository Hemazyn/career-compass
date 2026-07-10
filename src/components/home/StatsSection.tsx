import { Container } from '@/components/ui';
import { CAREERS } from '@/data/careers';
import { COURSES } from '@/data/courses';

const STATS = [
  { value: `${CAREERS.length}+`, label: 'Careers mapped' },
  { value: `${COURSES.length}+`, label: 'Courses tracked' },
  { value: '3', label: 'Streams decoded' },
  { value: 'Free', label: 'No signup ever' },
];

export function StatsSection() {
  return (
      <Container size="sm">
        <div className="shadow-brand-950/3 ring-brand-950/4 flex items-center justify-between gap-6 rounded-2xl bg-white px-6 py-5 shadow-sm ring-1 sm:px-10 sm:py-7">
          {STATS.map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-text-primary text-2xl font-extrabold tracking-tight sm:text-3xl">{value}</p>
                <p className="text-text-tertiary mt-0.5 text-[12px]">{label}</p>
              </div>

              {i < STATS.length - 1 && <div className="bg-brand-950/6 h-8 w-px" />}
            </div>
          ))}
        </div>
      </Container>
  );
}
