import { ArrowRight, Compass } from "lucide-react";
import { Button, Container, Reveal } from "@/components/ui";

export function CTASection() {
  return (
    <section className="py-24">
      <Container size="md">
        <Reveal>
          <div className="from-brand-700 via-brand-800 to-brand-950 relative overflow-hidden rounded-3xl px-6 py-16 text-center text-white shadow-[var(--shadow-pop)] sm:px-12 sm:py-20">
            {/* Decorative backdrop */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="bg-dots absolute inset-0 opacity-20 [background-size:26px_26px]" />
              <div className="from-brand-400/20 absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] blur-3xl" />
              <svg viewBox="0 0 800 400" fill="none" className="absolute inset-x-0 bottom-0 h-64 w-full opacity-30">
                <path
                  d="M-20 340 C 160 340, 200 200, 380 210 S 620 120, 820 140"
                  stroke="var(--color-accent-400)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="5 10"
                  className="animate-dash"
                />
                <circle cx="380" cy="210" r="5" fill="var(--color-accent-400)" />
                <circle cx="820" cy="140" r="4" fill="var(--color-brand-200)" />
              </svg>
            </div>

            <div className="relative">
              <span className="bg-white/10 mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ring-white/20">
                <Compass className="h-6 w-6 text-accent-400" />
              </span>
              <h2 className="mx-auto max-w-xl text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                Your future shouldn&apos;t depend on luck.
              </h2>
              <p className="text-brand-200 mx-auto mt-4 max-w-md text-base leading-relaxed sm:text-lg">
                3 minutes. No sign-up. No cost.
                <br />
                Just a clear map from where you are to where you want to be.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/quiz" variant="accent" size="lg" iconRight={<ArrowRight className="h-4 w-4" />} className="w-full sm:w-auto">
                  Start the quiz
                </Button>
                <Button
                  href="/careers"
                  variant="secondary"
                  size="lg"
                  className="w-full text-white ring-1 ring-white/25 hover:bg-white/10 sm:w-auto dark:text-white dark:ring-white/25 dark:hover:bg-white/10"
                >
                  Browse careers
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
