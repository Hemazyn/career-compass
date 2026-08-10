import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Clock, ExternalLink, ListChecks } from "lucide-react";
import { DEGREE_GROUPS, getDegreeGroup } from "@/data/pivots";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/ui";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return DEGREE_GROUPS.map((g) => ({ slug: g.slug }));
}

const FIT_BADGE = {
  natural: { label: "Natural fit", cls: "bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300" },
  stretch: { label: "Stretch", cls: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300" },
  bold: { label: "Bold move", cls: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300" },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const group = getDegreeGroup(slug);
  if (!group) return { title: "Pivot path not found" };

  return {
    title: `${group.label} — post-NYSC career pivots`,
    description: group.reality,
    alternates: { canonical: `/pivot/${group.slug}` },
    openGraph: {
      title: `${group.label} — realistic post-NYSC pivot paths`,
      description: group.reality,
      url: `${SITE_URL}/pivot/${group.slug}`,
      type: "article",
    },
  };
}

export default async function PivotDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const group = getDegreeGroup(slug);
  if (!group) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Post-NYSC Pivot", item: `${SITE_URL}/pivot` },
      { "@type": "ListItem", position: 3, name: group.label, item: `${SITE_URL}/pivot/${group.slug}` },
    ],
  };

  return (
    <div className="mx-auto container px-4 py-12">
      <Link href="/pivot" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 mb-8 inline-flex items-center gap-2 text-sm font-medium">
        <ArrowLeft className="h-4 w-4" /> All degree families
      </Link>

      <h1 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">{group.label}</h1>
      <p className="text-ink-3 mt-1">{group.examples}</p>

      <div className="border-brand-100 bg-brand-50/60 dark:border-brand-800/70 dark:bg-brand-950/50 mt-6 rounded-2xl border p-6">
        <h2 className="text-brand-900 dark:text-brand-100 font-bold">The honest reality</h2>
        <p className="text-brand-900/80 dark:text-brand-100/80 mt-2">{group.reality}</p>
      </div>

      <div className="mt-10 space-y-8">
        {group.paths.map((path, i) => {
          const badge = FIT_BADGE[path.fit];
          return (
            <section
              key={path.title}
              className="border-line bg-surface shadow-[var(--shadow-card)] rounded-2xl border p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-brand-600 dark:bg-brand-500 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h2 className="text-ink text-xl font-bold">{path.title}</h2>
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", badge.cls)}>{badge.label}</span>
              </div>

              <p className="text-ink-2 mt-3">{path.why}</p>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <h3 className="text-ink flex items-center gap-2 text-sm font-bold">
                    <ListChecks className="text-brand-600 dark:text-brand-400 h-4 w-4" /> First steps
                  </h3>
                  <ol className="text-ink-2 mt-2 space-y-1.5 text-sm">
                    {path.firstSteps.map((s, idx) => (
                      <li key={s} className="flex gap-2">
                        <span className="text-brand-500 font-semibold">{idx + 1}.</span> {s}
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="text-ink flex items-center gap-2 text-sm font-bold">
                    <Clock className="text-brand-600 dark:text-brand-400 h-4 w-4" /> Time to employable
                  </h3>
                  <p className="text-brand-700 dark:text-brand-300 mt-2 text-sm font-semibold">{path.timeToEmployable}</p>
                  <h3 className="text-ink mt-4 text-sm font-bold">Resources</h3>
                  <ul className="text-ink-2 mt-2 space-y-1.5 text-sm">
                    {path.resources.map((r) => (
                      <li key={r.name}>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-600 dark:text-brand-400 inline-flex items-center gap-1 hover:underline"
                        >
                          {r.name} <ExternalLink className="h-3 w-3" />
                        </a>{" "}
                        {r.free && (
                          <span className="bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-300 rounded px-1.5 py-0.5 text-xs font-medium">
                            free
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <p className="text-ink-3 mt-10 text-center text-sm">
        Resource links are external — verify costs and dates on the official sites.
      </p>

      <JsonLd data={breadcrumbSchema} id="breadcrumb-jsonld" />
    </div>
  );
}
