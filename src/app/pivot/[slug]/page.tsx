import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ExternalLink, ListChecks } from "lucide-react";
import { DEGREE_GROUPS, getDegreeGroup } from "@/data/pivots";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return DEGREE_GROUPS.map((g) => ({ slug: g.slug }));
}

const FIT_BADGE = {
  natural: { label: "Natural fit", cls: "bg-green-100 text-green-800" },
  stretch: { label: "Stretch", cls: "bg-blue-100 text-blue-800" },
  bold: { label: "Bold move", cls: "bg-amber-100 text-amber-800" },
} as const;

export default async function PivotDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const group = getDegreeGroup(slug);
  if (!group) notFound();

  return (
    <div className="mx-auto container px-4 py-12">
      <Link
        href="/pivot"
        className="text-brand-600 hover:text-brand-700 mb-8 inline-flex items-center gap-2 text-sm font-medium"
      >
        <ArrowLeft className="h-4 w-4" /> All degree families
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{group.label}</h1>
      <p className="mt-1 text-gray-500">{group.examples}</p>

      <div className="border-brand-100 bg-brand-50/60 mt-6 rounded-2xl border p-6">
        <h2 className="text-brand-900 font-bold">The honest reality</h2>
        <p className="text-brand-900/80 mt-2">{group.reality}</p>
      </div>

      <div className="mt-10 space-y-8">
        {group.paths.map((path, i) => {
          const badge = FIT_BADGE[path.fit];
          return (
            <section
              key={path.title}
              className="border-brand-100 rounded-2xl border bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-brand-600 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h2 className="text-xl font-bold text-gray-900">{path.title}</h2>
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", badge.cls)}>
                  {badge.label}
                </span>
              </div>

              <p className="mt-3 text-gray-600">{path.why}</p>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                    <ListChecks className="text-brand-600 h-4 w-4" /> First steps
                  </h3>
                  <ol className="mt-2 space-y-1.5 text-sm text-gray-600">
                    {path.firstSteps.map((s, idx) => (
                      <li key={s} className="flex gap-2">
                        <span className="text-brand-500 font-semibold">{idx + 1}.</span> {s}
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                    <Clock className="text-brand-600 h-4 w-4" /> Time to employable
                  </h3>
                  <p className="text-brand-700 mt-2 text-sm font-semibold">
                    {path.timeToEmployable}
                  </p>
                  <h3 className="mt-4 text-sm font-bold text-gray-900">Resources</h3>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {path.resources.map((r) => (
                      <li key={r.name}>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-600 inline-flex items-center gap-1 hover:underline"
                        >
                          {r.name} <ExternalLink className="h-3 w-3" />
                        </a>{" "}
                        {r.free && (
                          <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
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

      <p className="mt-10 text-center text-sm text-gray-500">
        Resource links are external — verify costs and dates on the official sites.
      </p>
    </div>
  );
}
