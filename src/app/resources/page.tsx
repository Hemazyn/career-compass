import type { Metadata } from "next";
import { ResourceExplorer } from "@/components/resources/ResourceExplorer";
import { JsonLd } from "@/components/ui";
import { RESOURCES } from "@/data/resources";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources for Nigerian Students — exams, scholarships, skills & jobs",
  description:
    "Curated resources for Nigerian students: official JAMB/WAEC/NECO portals, JAMB CBT practice, scholarships, free learning platforms, job boards and tech communities — all verified and organised.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources for Nigerian Students — exams, scholarships, skills & jobs",
    description:
      "Official exam portals, CBT practice, scholarships, free learning platforms, and job boards — curated for Nigerian students at every stage.",
    url: `${SITE_URL}/resources`,
    type: "website",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Resources for Nigerian students",
  numberOfItems: RESOURCES.length,
  itemListElement: RESOURCES.map((r, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: r.name,
    description: r.description,
    url: r.url,
  })),
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto container px-4 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <span className="bg-brand-50 text-brand-700 ring-brand-200 dark:bg-brand-950/60 dark:text-brand-300 dark:ring-brand-800 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs font-medium tracking-wider uppercase ring-1">
          📚 Resource Hub
        </span>
        <h1 className="text-ink mt-4 text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
          Everything you need, one click away
        </h1>
        <p className="text-ink-2 mt-4 text-base leading-relaxed sm:text-lg">
          Official exam portals, free learning platforms, scholarships and job boards — curated and
          organised for Nigerian students at every stage of the journey.
        </p>
      </div>

      <ResourceExplorer />

      <JsonLd data={itemListSchema} id="resources-itemlist-jsonld" />
    </div>
  );
}
