import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { CareersExplorer } from "@/components/careers/CareersExplorer";
import { JsonLd } from "@/components/ui";
import { CAREERS } from "@/data/careers";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Explore Careers in Nigeria — trace the path backwards",
  description:
    `Browse ${CAREERS.length}+ careers ranked from the world's top career roles — with Nigerian salary ranges, demand outlook, UTME subject combinations, O'Level requirements, and the SSS stream each path needs — modelled on the JAMB e-Brochure.`,
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Explore Careers in Nigeria — trace the path backwards",
    description:
      "Search any career and trace its full path backwards: course, UTME subjects, O'Level requirements, and the stream you must choose at JSS3.",
    url: `${SITE_URL}/careers`,
    type: "website",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Careers in Nigeria",
  numberOfItems: CAREERS.length,
  itemListElement: CAREERS.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.title,
    description: c.description,
    url: `${SITE_URL}/careers/${c.slug}`,
  })),
};

export default function CareersPage() {
  return (
    <>
      <div className="container mx-auto px-4 pt-10">
        <Link
          href="/check"
          className="border-brand-200 bg-brand-50/70 dark:border-brand-800/60 dark:bg-brand-950/50 group flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-5 py-4 transition-colors hover:border-brand-300 dark:hover:border-brand-700"
        >
          <span className="flex items-center gap-3">
            <ShieldCheck className="text-brand-600 dark:text-brand-400 h-6 w-6 shrink-0" />
            <span>
              <span className="text-ink block font-bold">Worried your subjects won&apos;t work?</span>
              <span className="text-ink-2 block text-sm">
                Check your WAEC/NECO credits against every course — before you pay for JAMB.
              </span>
            </span>
          </span>
          <span className="text-brand-600 dark:text-brand-400 flex items-center gap-1.5 text-sm font-semibold">
            Check my subjects <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
      <CareersExplorer />
      <JsonLd data={itemListSchema} id="careers-itemlist-jsonld" />
    </>
  );
}
