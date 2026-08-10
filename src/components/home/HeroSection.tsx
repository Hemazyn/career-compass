import { ArrowRight, Compass } from "lucide-react";
import { Button, Container } from "@/components/ui";

function PathGraphic() {
  return (
    <svg viewBox="0 0 1200 640" fill="none" className="animate-fade-in absolute inset-0 h-full w-full opacity-[0.5] dark:opacity-40" aria-hidden="true">
      {/* Lat/long-style grid */}
      <defs>
        <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" stroke="var(--line-strong)" strokeOpacity="0.5" fill="none" />
        </pattern>
        <linearGradient id="dash-grad" x1="0" y1="0" x2="1200" y2="640" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-brand-500)" />
          <stop offset="1" stopColor="var(--color-accent-500)" />
        </linearGradient>
      </defs>

      <rect width="1200" height="640" fill="url(#hero-grid)" />

      {/* Animated dashed career paths */}
      <path
        d="M150 540 C 300 540, 320 420, 460 420 S 620 300, 760 300 S 950 180, 1060 160"
        stroke="url(#dash-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 10"
        className="animate-dash"
      />
      <path
        d="M180 120 C 340 120, 360 240, 520 240 S 700 380, 840 380 S 980 480, 1060 500"
        stroke="var(--color-brand-300)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 12"
        className="animate-dash dark:opacity-60"
        style={{ animationDirection: "reverse" }}
      />

      {/* Path nodes */}
      {[
        [150, 540],
        [460, 420],
        [760, 300],
        [1060, 160],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="14" fill="var(--color-brand-400)" fillOpacity="0.12" />
          <circle cx={cx} cy={cy} r="5" fill="var(--color-brand-500)" />
          <circle cx={cx} cy={cy} r="2" fill="white" />
        </g>
      ))}
      {[
        [180, 120],
        [520, 240],
        [840, 380],
        [1060, 500],
      ].map(([cx, cy], i) => (
        <circle key={`b${i}`} cx={cx} cy={cy} r="4" fill="var(--color-accent-500)" fillOpacity="0.8" />
      ))}
    </svg>
  );
}

function FloatingStep({ label, value, className, icon }: { label: string; value: string; className: string; icon: string }) {
  return (
    <div
      className={`glass border-line shadow-[var(--shadow-card-hover)] absolute hidden rounded-2xl border px-3.5 py-2.5 lg:block ${className}`}
      aria-hidden="true"
    >
      <p className="font-mono text-[10px] font-semibold tracking-wider text-brand-700 uppercase dark:text-brand-300">{label}</p>
      <p className="text-ink mt-0.5 flex items-center gap-1.5 text-xs font-bold">
        <span aria-hidden="true">{icon}</span> {value}
      </p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-[max(640px,72vh)] items-center overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="from-brand-200/50 dark:from-brand-500/10 absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,#cfe9d8,transparent_70%)] dark:bg-[radial-gradient(60%_50%_at_50%_0%,rgba(43,138,87,0.14),transparent_70%)]" />
        <PathGraphic />
        <div className="bg-gradient-to-b from-transparent to-canvas absolute right-0 bottom-0 left-0 h-40" />
      </div>

      {/* Floating path chips */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        <FloatingStep label="Stream" value="Science ✓" icon="🧭" className="animate-float-a top-[22%] left-[7%]" />
        <FloatingStep label="UTME" value="PHY · CHM · BIO" icon="📝" className="animate-float-b top-[16%] right-[10%]" />
        <FloatingStep label="Course" value="Pharmacy" icon="🎓" className="animate-float-b bottom-[30%] left-[6%]" />
        <FloatingStep label="Career" value="Pharmacist" icon="🎯" className="animate-float-a right-[7%] bottom-[24%]" />
        <FloatingStep label="O'Level" value="5 credits · 1 sitting" icon="📋" className="animate-float-a top-[48%] right-[3%]" />
      </div>

      {/* Content */}
      <Container size="lg" className="relative z-10">
        <div className="mx-auto max-w-3xl pt-12 pb-16 text-center">
          <div className="animate-fade-in glass border-line mb-8 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 shadow-[var(--shadow-card)]">
            <span className="relative flex h-2 w-2">
              <span className="bg-brand-500 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
              <span className="bg-brand-600 dark:bg-brand-400 relative inline-flex h-2 w-2 rounded-full" />
            </span>
            <span className="text-ink-2 text-[13px] font-medium">
              <span className="hidden sm:inline">Live career maps for Nigerian students — </span>JSS3 to post-NYSC
            </span>
          </div>

          <h1 className="text-ink animate-fade-in-up text-[2.6rem] leading-[1.08] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]">
            Your career is a <span className="text-gradient-brand">map</span>, not a guess.
          </h1>

          <p className="text-ink-2 animate-fade-in-up mx-auto mt-6 max-w-xl text-base leading-relaxed [animation-delay:100ms] sm:text-lg">
            Tell us where you want to end up. We&apos;ll trace every JAMB subject, O&apos;Level
            requirement, and stream choice back to the decision you need to make{" "}
            <strong className="text-ink font-semibold">right now</strong>.
          </p>

          <div className="animate-fade-in-up mt-10 flex flex-col items-center justify-center gap-3 [animation-delay:200ms] sm:flex-row">
            <Button href="/quiz" size="lg" icon={<Compass className="h-5 w-5" />} className="w-full sm:w-auto">
              Find my stream
            </Button>
            <Button href="/careers" variant="secondary" size="lg" iconRight={<ArrowRight className="h-4 w-4" />} className="w-full sm:w-auto">
              Explore all careers
            </Button>
          </div>

          <div className="text-ink-3 animate-fade-in mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[13px] [animation-delay:400ms]">
            <span className="flex items-center gap-1.5">
              <span className="bg-brand-500 text-brand-50 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold">✓</span> No sign-up
            </span>
            <span className="flex items-center gap-1.5">
              <span className="bg-brand-500 text-brand-50 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold">✓</span> 100% free
            </span>
            <span className="flex items-center gap-1.5">
              <span className="bg-brand-500 text-brand-50 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold">✓</span> 3 minutes
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
