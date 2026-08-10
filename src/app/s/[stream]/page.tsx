import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Compass, Lock, LockOpen } from "lucide-react";
import { STREAM_INFO } from "@/data/quiz";
import { careersByStream } from "@/data/careers";
import type { Stream } from "@/types";
import { JsonLd } from "@/components/ui";
import { SITE_URL } from "@/lib/site";

const STREAMS: Stream[] = ["science", "art", "commercial"];

export function generateStaticParams() {
  return STREAMS.map((stream) => ({ stream }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stream: string }>;
}): Promise<Metadata> {
  const { stream } = await params;
  if (!STREAMS.includes(stream as Stream)) return {};
  const label = STREAM_INFO[stream as Stream].label;
  return {
    title: `My stream is ${label}! — Career Compass`,
    description: `Career Compass matched me with the ${label} stream. Take the free quiz and find yours — know which doors your choice opens and closes.`,
    alternates: { canonical: `/s/${stream}` },
    openGraph: {
      title: `My stream is ${label}!`,
      description: `Career Compass matched me with the ${label} stream. Take the free quiz and find yours — know which doors your choice opens and closes.`,
      url: `${SITE_URL}/s/${stream}`,
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function SharePage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream } = await params;
  if (!STREAMS.includes(stream as Stream)) notFound();

  const s = stream as Stream;
  const info = STREAM_INFO[s];
  const careers = careersByStream(s).slice(0, 6);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: `${info.label} stream result`, item: `${SITE_URL}/s/${s}` },
    ],
  };

  return (
    <div className="mx-auto container px-4 py-16 text-center">
      <p className="text-brand-600 dark:text-brand-400 font-mono text-sm font-semibold tracking-wider uppercase">
        A friend&apos;s Career Compass result
      </p>
      <h1 className="text-gradient-brand mt-2 text-5xl font-extrabold sm:text-6xl">{info.label}</h1>
      <p className="text-ink-2 mx-auto mt-4 max-w-lg">
        Career Compass matched them with the <strong className="text-ink">{info.label} stream</strong> — based on
        the RIASEC interest model, adapted for Nigerian students.
      </p>

      <div className="mt-10 grid gap-6 text-left sm:grid-cols-2">
        <section className="rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-800/60 dark:bg-green-950/40">
          <h3 className="flex items-center gap-2 font-bold text-green-900 dark:text-green-200">
            <LockOpen className="h-5 w-5" /> {info.label} opens
          </h3>
          <ul className="text-green-900/90 dark:text-green-100/90 mt-3 space-y-2 text-sm">
            {info.opens.map((o) => (
              <li key={o} className="flex gap-2">
                <span aria-hidden="true">✓</span> {o}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-800/60 dark:bg-red-950/40">
          <h3 className="flex items-center gap-2 font-bold text-red-900 dark:text-red-200">
            <Lock className="h-5 w-5" /> …and closes
          </h3>
          <ul className="text-red-900/90 dark:text-red-100/90 mt-3 space-y-2 text-sm">
            {info.closes.map((c) => (
              <li key={c} className="flex gap-2">
                <span aria-hidden="true">✗</span> {c}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-8 text-left">
        <h2 className="text-ink text-lg font-bold">Careers in this stream</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {careers.map((c) => (
            <Link
              key={c.slug}
              href={`/careers/${c.slug}`}
              className="bg-brand-50 text-brand-800 ring-brand-200 dark:bg-brand-950/60 dark:text-brand-300 dark:ring-brand-800 hover:bg-brand-100 dark:hover:bg-brand-900/60 rounded-lg px-3 py-1.5 text-sm font-medium ring-1 transition-colors"
            >
              {c.title}
            </Link>
          ))}
        </div>
      </section>

      <div className="from-brand-700 via-brand-800 to-brand-950 relative mt-12 overflow-hidden rounded-3xl px-6 py-10 text-white">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
        <Compass className="text-accent-400 relative mx-auto h-10 w-10" />
        <h2 className="relative mt-3 text-2xl font-bold">What&apos;s YOUR stream?</h2>
        <p className="text-brand-200 relative mx-auto mt-2 max-w-md">
          18 questions, 3 minutes, free. Know which doors you&apos;re opening — and closing — before you
          choose.
        </p>
        <Link
          href="/quiz"
          className="bg-accent-500 text-brand-950 hover:bg-accent-400 relative mt-6 inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold shadow-[var(--shadow-accent)] transition-colors"
        >
          Take the quiz <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      <JsonLd data={breadcrumbSchema} id="breadcrumb-jsonld" />
    </div>
  );
}
