import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QuizState {
  answers: Record<number, number>;
  currentIndex: number;
  setAnswer: (questionId: number, value: number) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      answers: {},
      currentIndex: 0,
      setAnswer: (questionId, value) =>
        set((s) => ({ answers: { ...s.answers, [questionId]: value } })),
      next: () => set((s) => ({ currentIndex: s.currentIndex + 1 })),
      back: () => set((s) => ({ currentIndex: Math.max(0, s.currentIndex - 1) })),
      reset: () => set({ answers: {}, currentIndex: 0 }),
    }),
    { name: "career-compass-quiz" }
  )
);
