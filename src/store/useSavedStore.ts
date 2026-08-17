import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_COMPARE = 4;

interface SavedState {
  /** Career slugs the student has saved */
  saved: string[];
  /** Career slugs selected for side-by-side comparison (max 4) */
  compare: string[];
  toggleSaved: (slug: string) => void;
  toggleCompare: (slug: string) => void;
  clearCompare: () => void;
}

export const useSavedStore = create<SavedState>()(
  persist(
    (set) => ({
      saved: [],
      compare: [],
      toggleSaved: (slug) =>
        set((s) => ({
          saved: s.saved.includes(slug)
            ? s.saved.filter((x) => x !== slug)
            : [...s.saved, slug],
        })),
      toggleCompare: (slug) =>
        set((s) => {
          if (s.compare.includes(slug)) {
            return { compare: s.compare.filter((x) => x !== slug) };
          }
          if (s.compare.length >= MAX_COMPARE) return s;
          return { compare: [...s.compare, slug] };
        }),
      clearCompare: () => set({ compare: [] }),
    }),
    { name: "career-compass-saved" }
  )
);
