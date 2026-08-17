import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { Button, Container, JsonLd } from "@/components/ui";
import { FAQ_ITEMS } from "@/data/faq";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Straight answers to the questions parents and students ask most about Career Compass — cost, the quiz, the subject data, saved careers, and the roadmap generator.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ — Career Compass",
    description:
      "Is Career Compass free? Where does the subject data come from? What if I chose the wrong stream? Answered.",
    type: "website",
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

export default function FaqPage() {
  return (
    <Container size="md" className="py-16">
      <p className="text-brand-600 dark:text-brand-400 font-mono text-sm font-semibold tracking-wider uppercase">
        FAQ
      </p>
      <h1 className="text-ink mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Questions? Answered.
      </h1>
      <p className="text-ink-2 mt-3 max-w-2xl">
        The things parents and students ask {SITE_NAME} most — straight answers, no jargon. Can&apos;t
        find yours?{" "}
        <Link href="/contact" className="text-brand-600 hover:underline dark:text-brand-400">
          Ask us directly
        </Link>
        .
      </p>

      <div className="mt-10 space-y-3">
        {FAQ_ITEMS.map((item, i) => (
          <details
            key={item.question}
            className="group border-line bg-surface shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] overflow-hidden rounded-2xl border transition-all duration-300"
            open={i === 0}
          >
            <summary className="text-ink flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[15px] font-semibold select-none [&::-webkit-details-marker]:hidden">
              {item.question}
              <span className="bg-surface-2 text-ink-2 group-open:bg-brand-600 group-open:text-white flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300">
                <Plus className="h-4 w-4 transition-transform duration-300 group-open:rotate-45" />
              </span>
            </summary>
            <p className="text-ink-2 border-line px-6 pb-6 text-sm leading-relaxed border-t pt-4">
              {item.answer}
            </p>
          </details>
        ))}
      </div>

      <div className="border-line bg-surface/60 mt-12 flex flex-col items-center justify-center gap-3 rounded-2xl border p-8 text-center sm:flex-row sm:text-left">
        <div>
          <h2 className="text-ink font-bold">Still unsure about your path?</h2>
          <p className="text-ink-2 mt-1 text-sm">
            The quiz takes 3 minutes and maps you to a stream — free, no sign-up.
          </p>
        </div>
        <Button href="/quiz" className="sm:ml-4" iconRight={<ArrowRight className="h-4 w-4" />}>
          Find your career path
        </Button>
      </div>

      <JsonLd data={faqSchema} id="faq-jsonld" />
    </Container>
  );
}
