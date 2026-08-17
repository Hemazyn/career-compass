import type { Metadata } from "next";
import { CompareClient } from "@/components/compare/CompareClient";

export const metadata: Metadata = {
  title: "Compare Careers — side by side",
  description:
    "Compare up to 4 careers side by side: salary, stream, UTME subjects, O'Level requirements, admission difficulty and more — before you choose a path.",
  alternates: { canonical: "/compare" },
};

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string | string[] }>;
}) {
  const { c } = await searchParams;
  const slugs = Array.isArray(c) ? c : c ? [c] : [];
  return <CompareClient slugs={slugs} />;
}
