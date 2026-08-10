import type { Metadata } from "next";
import {
  HeroSection,
  BrokenChainSection,
  ReversePathSection,
  WhoIsThisForSection,
  StatsSection,
  PivotSection,
  ResourcesSection,
  FAQSection,
  CTASection,
} from "@/components/home";
import { Divider, JsonLd } from "@/components/ui";
import { FAQ_ITEMS } from "@/data/faq";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Find your path, Nigeria`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} — Find your path, Nigeria`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  sameAs: [],
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrokenChainSection />
      <Divider className="mx-auto max-w-5xl px-4" />
      <ReversePathSection />
      <WhoIsThisForSection />
      <StatsSection />
      <Divider className="mx-auto max-w-5xl px-4" />
      <PivotSection />
      <ResourcesSection />
      <FAQSection />
      <CTASection />
      <JsonLd data={faqSchema} id="faq-jsonld" />
      <JsonLd data={orgSchema} id="org-jsonld" />
    </>
  );
}
