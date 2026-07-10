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
  const progress = Math.round((currentIndex / total) * 100);
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
    <div className="container mx-auto px-4 py-16">
      {/* Progress */}
      <div className="mb-10">
        <div className="mb-2 flex justify-between text-sm text-gray-500">
          <span>
            Question {currentIndex + 1} of {total}
          </span>
          <button onClick={reset} className="text-brand-600 hover:underline">
            Start over
          </button>
        </div>
        <div className="bg-brand-100 h-2 overflow-hidden rounded-full">
          <div
            className="bg-brand-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h1 className="text-2xl leading-snug font-bold text-gray-900 sm:text-3xl">{question.text}</h1>
      <p className="mt-2 text-gray-500">Be honest — there are no wrong answers.</p>

      <div className="mt-8 grid gap-3">
        {SCALE.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option.value)}
            className={cn(
              "flex items-center justify-between rounded-xl border-2 px-6 py-4 text-left font-medium transition",
              answers[question.id] === option.value
                ? "border-brand-500 bg-brand-50 text-brand-800"
                : "hover:border-brand-300 hover:bg-brand-50/50 border-gray-200 bg-white text-gray-700"
            )}
          >
            {option.label}
            <ArrowRight className="text-brand-400 h-4 w-4" />
          </button>
        ))}
      </div>

      {currentIndex > 0 && (
        <button
          onClick={back}
          className="hover:text-brand-600 mt-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500"
        >
          <ArrowLeft className="h-4 w-4" /> Previous question
        </button>
      )}
    </div>
  );
}
