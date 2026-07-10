import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Compass, Lock, LockOpen } from "lucide-react";
import { STREAM_INFO } from "@/data/quiz";
import { careersByStream } from "@/data/careers";
import type { Stream } from "@/types";

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
  };
}

export default async function SharePage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream } = await params;
  if (!STREAMS.includes(stream as Stream)) notFound();

  const s = stream as Stream;
  const info = STREAM_INFO[s];
  const careers = careersByStream(s).slice(0, 6);

  return (
    <div className="mx-auto container px-4 py-16 text-center">
      <p className="text-brand-600 text-sm font-semibold tracking-wide uppercase">
        A friend&apos;s Career Compass result
      </p>
      <h1 className="text-brand-700 mt-2 text-5xl font-extrabold sm:text-6xl">{info.label}</h1>
      <p className="mx-auto mt-4 max-w-lg text-gray-600">
        Career Compass matched them with the <strong>{info.label} stream</strong> — based on the
        RIASEC interest model, adapted for Nigerian students.
      </p>

      <div className="mt-10 grid gap-6 text-left sm:grid-cols-2">
        <section className="rounded-2xl border border-green-200 bg-green-50 p-6">
          <h3 className="flex items-center gap-2 font-bold text-green-900">
            <LockOpen className="h-5 w-5" /> {info.label} opens
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-green-900/90">
            {info.opens.map((o) => (
              <li key={o} className="flex gap-2">
                <span>✓</span> {o}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h3 className="flex items-center gap-2 font-bold text-red-900">
            <Lock className="h-5 w-5" /> …and closes
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-red-900/90">
            {info.closes.map((c) => (
              <li key={c} className="flex gap-2">
                <span>✗</span> {c}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-8 text-left">
        <h2 className="text-lg font-bold text-gray-900">Careers in this stream</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {careers.map((c) => (
            <Link
              key={c.slug}
              href={`/careers/${c.slug}`}
              className="bg-brand-50 text-brand-800 ring-brand-200 hover:bg-brand-100 rounded-lg px-3 py-1.5 text-sm font-medium ring-1"
            >
              {c.title}
            </Link>
          ))}
        </div>
      </section>

      <div className="bg-brand-950 mt-12 rounded-3xl px-6 py-10 text-white">
        <Compass className="text-accent-400 mx-auto h-10 w-10" />
        <h2 className="mt-3 text-2xl font-bold">What&apos;s YOUR stream?</h2>
        <p className="text-brand-200 mx-auto mt-2 max-w-md">
          18 questions, 3 minutes, free. Know which doors you&apos;re opening — and closing — before
          you choose.
        </p>
        <Link
          href="/quiz"
          className="bg-accent-500 text-brand-950 hover:bg-accent-400 mt-6 inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold transition"
        >
          Take the quiz <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
