import { describe, it, expect } from "vitest";
import { QUIZ_QUESTIONS, recommendStream, scoreQuiz, STREAM_INFO } from "@/data/quiz";
import type { RiasecScores, Stream } from "@/types";

const STREAMS: Stream[] = ["science", "art", "commercial"];

describe("scoreQuiz", () => {
  it("returns all zero scores for an empty answers map", () => {
    const scores = scoreQuiz({});
    expect(scores).toEqual({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
  });

  it("accumulates scores per RIASEC dimension", () => {
    const answers = {
      1: 5, // R
      2: 4, // R
      3: 3, // R
      4: 2, // I
    };
    const scores = scoreQuiz(answers);
    expect(scores.R).toBe(12);
    expect(scores.I).toBe(2);
    expect(scores.A).toBe(0);
  });

  it("has exactly 3 questions per RIASEC dimension", () => {
    const perDimension = QUIZ_QUESTIONS.reduce<Record<string, number>>((acc, q) => {
      acc[q.dimension] = (acc[q.dimension] ?? 0) + 1;
      return acc;
    }, {});
    expect(Object.values(perDimension)).toEqual([3, 3, 3, 3, 3, 3]);
  });

  it("has unique sequential question ids 1..18", () => {
    const ids = QUIZ_QUESTIONS.map((q) => q.id);
    expect(ids).toEqual([...Array(18)].map((_, i) => i + 1));
    expect(new Set(ids).size).toBe(18);
  });
});

describe("recommendStream", () => {
  it("recommends science for an investigative/realistic profile", () => {
    const scores: RiasecScores = { R: 5, I: 5, A: 1, S: 1, E: 1, C: 1 };
    const { stream } = recommendStream(scores);
    expect(stream).toBe("science");
  });

  it("recommends art for an artistic/social profile", () => {
    const scores: RiasecScores = { R: 1, I: 1, A: 5, S: 5, E: 1, C: 1 };
    const { stream } = recommendStream(scores);
    expect(stream).toBe("art");
  });

  it("recommends commercial for an enterprising/conventional profile", () => {
    const scores: RiasecScores = { R: 1, I: 1, A: 1, S: 2, E: 5, C: 5 };
    const { stream } = recommendStream(scores);
    expect(stream).toBe("commercial");
  });

  it("is deterministic for the same scores", () => {
    const scores: RiasecScores = { R: 3, I: 3, A: 3, S: 3, E: 3, C: 3 };
    const a = recommendStream(scores);
    const b = recommendStream(scores);
    expect(a).toEqual(b);
  });

  it("returns a full ranking of all three streams", () => {
    const scores: RiasecScores = { R: 1, I: 1, A: 1, S: 1, E: 1, C: 1 };
    const { ranking } = recommendStream(scores);
    expect(ranking.map((r) => r.stream).sort()).toEqual([...STREAMS].sort());
    // ranking must be sorted descending by score
    const values = ranking.map((r) => r.score);
    expect(values).toEqual([...values].sort((a, b) => b - a));
  });

  it("returns the two highest-scoring RIASEC codes", () => {
    const scores: RiasecScores = { R: 2, I: 5, A: 4, S: 1, E: 1, C: 1 };
    const { topCodes } = recommendStream(scores);
    expect(topCodes).toEqual(["I", "A"]);
  });
});

describe("STREAM_INFO", () => {
  it("provides opens/closes content for every stream", () => {
    for (const stream of STREAMS) {
      const info = STREAM_INFO[stream];
      expect(info.opens.length).toBeGreaterThan(0);
      expect(info.closes.length).toBeGreaterThan(0);
    }
  });
});
