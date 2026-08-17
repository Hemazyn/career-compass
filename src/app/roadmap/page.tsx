import type { Metadata } from "next";
import { RoadmapClient } from "@/components/roadmap/RoadmapClient";

export const metadata: Metadata = {
  title: "Career Roadmap — from JSS3 to licensed professional",
  description:
    "A year-by-year roadmap from your JSS3 stream choice to a licensed career: SSS subjects, JAMB combination, university, licensing and Plan B — printable and shareable.",
  alternates: { canonical: "/roadmap" },
};

export default async function RoadmapPage({
  searchParams,
}: {
  searchParams: Promise<{ career?: string }>;
}) {
  const { career } = await searchParams;
  return <RoadmapClient careerSlug={career ?? ""} />;
}
