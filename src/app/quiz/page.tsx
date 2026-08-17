"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { QUIZ_QUESTIONS } from "@/data/quiz";
import { useQuizStore } from "@/store/useQuizStore";
import { cn } from "@/lib/utils";

const SCALE = [
  { value: 1, label: "No way" },
  { value: 2, label: "Not really" },
  { value: 3, label: "Maybe" },
  { value: 4, label: "Yes" },
  { value: 5, label: "That's so me" },
];

export default function QuizPage() {
  const router = useRouter();
  const { answers, currentIndex, setAnswer, next, back, reset } = useQuizStore();

  const question = QUIZ_QUESTIONS[currentIndex];
  const total = QUIZ_QUESTIONS.length;
  const progress = Math.round(((currentIndex + 1) / total) * 100);
  const isLast = currentIndex === total - 1;

  function handleAnswer(value: number) {
    setAnswer(question.id, value);
    if (isLast) {
      router.push("/quiz/result");
    } else {
      next();
    }
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      {/* Page intro */}
      <header className="mb-10 text-center">
        <h1 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">Find your career path</h1>
        <p className="text-ink-2 mx-auto mt-3 max-w-md">
          18 quick questions, 3 minutes. We&apos;ll match you to the SSS stream —{" "}
          <strong className="text-ink">Science, Arts or Commercial</strong> — that fits how you think and work.
        </p>
      </header>

      {/* Progress */}
      <div className="mb-10">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-ink-3 font-mono font-medium">
            Question {currentIndex + 1} of {total}
          </span>
          <button onClick={reset} className="text-brand-600 hover:text-brand-700 dark:text-brand-400 hover:underline">
            Start over
          </button>
        </div>
        <div className="bg-line h-2 overflow-hidden rounded-full">
          <div
            className="bg-brand-500 dark:bg-brand-400 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h1 className="text-ink text-2xl leading-snug font-bold sm:text-3xl" key={question.id}>
        {question.text}
      </h1>
      <p className="text-ink-3 mt-2">Be honest — there are no wrong answers.</p>

      <div className="mt-8 grid gap-3">
        {SCALE.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option.value)}
            className={cn(
              "group flex items-center justify-between rounded-xl border-2 px-6 py-4 text-left font-medium transition-all duration-200",
              answers[question.id] === option.value
                ? "border-brand-500 bg-brand-50 text-brand-800 dark:border-brand-400 dark:bg-brand-950/60 dark:text-brand-200 shadow-[var(--shadow-soft-brand)]"
                : "border-line bg-surface text-ink-2 hover:border-brand-300 hover:bg-brand-50/50 dark:hover:border-brand-700 dark:hover:bg-brand-950/40 hover:-translate-y-0.5"
            )}
          >
            {option.label}
            <ArrowRight className="text-brand-400 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        ))}
      </div>

      {currentIndex > 0 && (
        <button
          onClick={back}
          className="text-ink-3 hover:text-brand-600 dark:hover:text-brand-400 mt-8 inline-flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Previous question
        </button>
      )}
    </div>
  );
}
