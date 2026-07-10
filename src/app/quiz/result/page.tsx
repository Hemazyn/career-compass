"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Lock, LockOpen, RotateCcw, Share2 } from "lucide-react";
import {
  QUIZ_QUESTIONS,
  RIASEC_LABELS,
  STREAM_INFO,
  recommendStream,
  scoreQuiz,
} from "@/data/quiz";
import { careersByStream } from "@/data/careers";
import { useQuizStore } from "@/store/useQuizStore";
import { cn } from "@/lib/utils";

export default function QuizResultPage() {
  const { answers, reset } = useQuizStore();
  const answeredCount = Object.keys(answers).length;

  const result = useMemo(() => {
    if (answeredCount < QUIZ_QUESTIONS.length) return null;
    const scores = scoreQuiz(answers);
    return { scores, ...recommendStream(scores) };
  }, [answers, answeredCount]);

  if (!result) {
    return (
      <div className="container mx-auto min-h-[max(600px,30vh)] px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Quiz not finished yet</h1>
        <p className="mt-2 text-gray-600">
          Answer all {QUIZ_QUESTIONS.length} questions to see your stream recommendation.
        </p>
        <Link
          href="/quiz"
          className="bg-brand-600 hover:bg-brand-700 mt-6 inline-block rounded-xl px-6 py-3 font-semibold text-white"
        >
          Continue quiz
        </Link>
      </div>
    );
  }

  const info = STREAM_INFO[result.stream];
  const careers = careersByStream(result.stream).slice(0, 6);
  const [code1, code2] = result.topCodes;
  const maxScore = Math.max(...result.ranking.map((r) => r.score));

  async function share() {
    const shareUrl = `${location.origin}/s/${result!.stream}`;
    const text = `🧭 Career Compass says my SSS stream is ${info.label.toUpperCase()}! My type: ${RIASEC_LABELS[code1].name} + ${RIASEC_LABELS[code2].name}. Find yours 👉`;
    if (navigator.share) {
      await navigator.share({ title: "My Career Compass result", text, url: shareUrl });
    } else {
      await navigator.clipboard.writeText(`${text} ${shareUrl}`);
      alert("Result copied — paste it in WhatsApp!");
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <p className="text-brand-600 text-sm font-semibold tracking-wide uppercase">
          Your recommended stream
        </p>
        <h1 className="text-brand-700 mt-2 text-5xl font-extrabold sm:text-6xl">{info.label}</h1>
        <p className="mx-auto mt-4 max-w-lg text-gray-600">
          Your strongest traits: <strong>{RIASEC_LABELS[code1].name}</strong> (
          {RIASEC_LABELS[code1].blurb.toLowerCase()}) + <strong>{RIASEC_LABELS[code2].name}</strong>{" "}
          ({RIASEC_LABELS[code2].blurb.toLowerCase()}).
        </p>
      </div>

      {/* Stream fit bars */}
      <section className="border-brand-100 mt-10 rounded-2xl border bg-white p-6">
        <h2 className="font-bold text-gray-900">How each stream fits you</h2>
        <div className="mt-4 space-y-4">
          {result.ranking.map(({ stream, score }) => (
            <div key={stream}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium capitalize">{STREAM_INFO[stream].label}</span>
                <span className="text-gray-500">{Math.round((score / maxScore) * 100)}% fit</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-700",
                    stream === result.stream ? "bg-brand-500" : "bg-brand-200"
                  )}
                  style={{ width: `${(score / maxScore) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Opens / Closes — the informed-choice moment */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <section className="rounded-2xl border border-green-200 bg-green-50 p-6">
          <h3 className="flex items-center gap-2 font-bold text-green-900">
            <LockOpen className="h-5 w-5" /> {info.label} opens these doors
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
            <Lock className="h-5 w-5" /> …and closes these
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-red-900/90">
            {info.closes.map((c) => (
              <li key={c} className="flex gap-2">
                <span>✗</span> {c}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-red-700/70">
            Know what you&apos;re trading before you choose — that&apos;s an informed decision.
          </p>
        </section>
      </div>

      {/* Matched careers */}
      <section className="mt-6">
        <h2 className="text-xl font-bold text-gray-900">Careers that fit your stream</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {careers.map((c) => (
            <Link
              key={c.slug}
              href={`/careers/${c.slug}`}
              className="group border-brand-100 hover:border-brand-300 flex items-center justify-between rounded-xl border bg-white p-4 transition hover:shadow-sm"
            >
              <div>
                <p className="group-hover:text-brand-700 font-semibold text-gray-900">{c.title}</p>
                <p className="text-xs text-gray-500">{c.category}</p>
              </div>
              <ArrowRight className="text-brand-400 h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>

      {/* Actions */}
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          onClick={share}
          className="bg-brand-600 hover:bg-brand-700 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white"
        >
          <Share2 className="h-5 w-5" /> Share result on WhatsApp
        </button>
        <button
          onClick={reset}
          className="border-brand-200 text-brand-700 hover:border-brand-400 inline-flex items-center justify-center gap-2 rounded-xl border-2 bg-white px-6 py-3 font-semibold"
        >
          <RotateCcw className="h-5 w-5" /> Retake quiz
        </button>
      </div>

      <p className="mt-8 text-center text-xs text-gray-400">
        This is guidance, not gospel — based on the RIASEC interest model. Talk it through with a
        teacher, parent or mentor before deciding.
      </p>
    </div>
  );
}
