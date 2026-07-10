import Link from "next/link";
import { ArrowRight, Route } from "lucide-react";
import { DEGREE_GROUPS } from "@/data/pivots";

export const metadata = {
  title: "Post-NYSC Pivot Guide — Career Compass",
  description:
    "Finished NYSC and asking 'what now?' Realistic career paths Nigerian graduates actually take, by degree — with first steps, timelines and free resources.",
};

export default function PivotIndexPage() {
  return (
    <div className="mx-auto container px-4 py-12">
      <span className="bg-brand-50 text-brand-700 ring-brand-200 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ring-1">
        <Route className="h-4 w-4" /> Post-NYSC Pivot Guide
      </span>
      <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
        Finished NYSC. Now what?
      </h1>
      <p className="mt-3 container text-gray-600">
        You&apos;re not starting from zero — you&apos;re starting from your degree, even if it
        wasn&apos;t the one you wanted. Pick your degree family and see the{" "}
        <strong>realistic paths graduates like you actually take</strong>, with first steps, honest
        timelines, and mostly-free Nigerian resources.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {DEGREE_GROUPS.map((group) => (
          <Link
            key={group.slug}
            href={`/pivot/${group.slug}`}
            className="group border-brand-100 rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="group-hover:text-brand-700 text-lg font-bold text-gray-900">
              {group.label}
            </h2>
            <p className="mt-1 text-sm text-gray-500">{group.examples}</p>
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-sm text-gray-500">{group.paths.length} realistic paths</span>
              <span className="text-brand-600 flex items-center gap-1 text-sm font-medium">
                See paths <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="bg-brand-50 text-brand-900 mt-12 rounded-2xl p-6 text-sm">
        <strong>The honest rule of pivoting:</strong> one focused skill beats five certificates.
        Pick a path, commit for 6 months minimum, and build evidence (portfolio, numbers, projects)
        — evidence is what employers buy, not potential.
      </p>
    </div>
  );
}
