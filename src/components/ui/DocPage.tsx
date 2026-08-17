interface DocPageProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function DocPage({ eyebrow, title, lastUpdated, children }: DocPageProps) {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <p className="text-brand-600 dark:text-brand-400 font-mono text-xs font-semibold tracking-wider uppercase">
        {eyebrow}
      </p>
      <h1 className="text-ink mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
      <p className="text-ink-3 mt-3 text-sm">Last updated: {lastUpdated}</p>
      <div className="mt-10 space-y-10">{children}</div>
    </div>
  );
}

export function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-ink text-lg font-bold">{title}</h2>
      <div className="text-ink-2 mt-3 space-y-3 text-sm leading-relaxed">{children}</div>
    </section>
  );
}
