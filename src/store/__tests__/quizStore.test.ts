import { describe, it, expect, beforeEach } from "vitest";
import { useQuizStore } from "@/store/useQuizStore";

describe("useQuizStore", () => {
  beforeEach(() => {
    useQuizStore.getState().reset();
  });

  it("records answers keyed by question id", () => {
    useQuizStore.getState().setAnswer(1, 4);
    expect(useQuizStore.getState().answers[1]).toBe(4);
  });

  it("advances and goes back through questions without going negative", () => {
    const store = useQuizStore.getState();
    store.next();
    expect(useQuizStore.getState().currentIndex).toBe(1);
    store.next();
    expect(useQuizStore.getState().currentIndex).toBe(2);
    useQuizStore.getState().back();
    expect(useQuizStore.getState().currentIndex).toBe(1);
    useQuizStore.getState().back();
    useQuizStore.getState().back();
    expect(useQuizStore.getState().currentIndex).toBe(0);
  });

  it("reset clears answers and returns to the first question", () => {
    useQuizStore.getState().setAnswer(1, 5);
    useQuizStore.getState().next();
    useQuizStore.getState().reset();
    expect(useQuizStore.getState().answers).toEqual({});
    expect(useQuizStore.getState().currentIndex).toBe(0);
  });
});
