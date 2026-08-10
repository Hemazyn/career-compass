import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Route } from "lucide-react";
import { DEGREE_GROUPS } from "@/data/pivots";
import { JsonLd } from "@/components/ui";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Post-NYSC Pivot Guide — realistic career paths for Nigerian graduates",
  description:
    "Finished NYSC and asking 'what now?' Realistic career paths Nigerian graduates actually take, by degree — with first steps, timelines and free resources.",
  alternates: { canonical: "/pivot" },
  openGraph: {
    title: "Post-NYSC Pivot Guide — Career Compass",
    description:
      "Finished NYSC and asking 'what now?' Realistic career paths Nigerian graduates actually take, by degree — with first steps, timelines and free resources.",
    url: `${SITE_URL}/pivot`,
    type: "website",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Post-NYSC Pivot paths",
  numberOfItems: DEGREE_GROUPS.length,
  itemListElement: DEGREE_GROUPS.map((group, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: group.label,
    url: `${SITE_URL}/pivot/${group.slug}`,
  })),
};

export default function PivotIndexPage() {
  return (
    <div className="mx-auto container px-4 py-12">
      <span className="bg-brand-50 text-brand-700 ring-brand-200 dark:bg-brand-950/60 dark:text-brand-300 dark:ring-brand-800 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs font-medium tracking-wider uppercase ring-1">
        <Route className="h-4 w-4" /> Post-NYSC Pivot Guide
      </span>
      <h1 className="text-ink mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Finished NYSC. Now what?</h1>
      <p className="text-ink-2 mt-3 max-w-2xl text-base leading-relaxed sm:text-lg">
        You&apos;re not starting from zero — you&apos;re starting from your degree, even if it
        wasn&apos;t the one you wanted. Pick your degree family and see the{" "}
        <strong className="text-ink">realistic paths graduates like you actually take</strong>, with first
        steps, honest timelines, and mostly-free Nigerian resources.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {DEGREE_GROUPS.map((group) => (
          <Link
            key={group.slug}
            href={`/pivot/${group.slug}`}
            className="group border-line bg-surface shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5"
          >
            <h2 className="text-ink group-hover:text-brand-700 dark:group-hover:text-brand-300 text-lg font-bold transition-colors">
              {group.label}
            </h2>
            <p className="text-ink-3 mt-1 text-sm">{group.examples}</p>
            <div className="border-line mt-4 flex items-center justify-between border-t pt-4">
              <span className="text-ink-3 text-sm">{group.paths.length} realistic paths</span>
              <span className="text-brand-600 dark:text-brand-400 flex items-center gap-1 text-sm font-medium">
                See paths <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="bg-brand-50 text-brand-900 dark:bg-brand-950/60 dark:text-brand-100 mt-12 rounded-2xl p-6 text-sm">
        <strong>The honest rule of pivoting:</strong> one focused skill beats five certificates.
        Pick a path, commit for 6 months minimum, and build evidence (portfolio, numbers, projects) —
        evidence is what employers buy, not potential.
      </p>

      <JsonLd data={itemListSchema} id="pivot-itemlist-jsonld" />
    </div>
  );
}
