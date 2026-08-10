import type { Metadata } from "next";
import { CareersExplorer } from "@/components/careers/CareersExplorer";
import { JsonLd } from "@/components/ui";
import { CAREERS } from "@/data/careers";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Explore Careers in Nigeria — trace the path backwards",
  description:
    "Browse 22+ careers with Nigerian salary ranges, demand outlook, UTME subject combinations, O'Level requirements, and the SSS stream each path needs — modelled on the JAMB e-Brochure.",
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
      <CareersExplorer />
      <JsonLd data={itemListSchema} id="careers-itemlist-jsonld" />
    </>
  );
}
