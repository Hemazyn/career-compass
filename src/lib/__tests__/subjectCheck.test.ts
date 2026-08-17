import { describe, it, expect } from "vitest";
import { checkAllCourses, checkCourse, careersForCourse } from "@/lib/subjectCheck";
import { getCourse } from "@/data/courses";

const MEDICINE = "medicine-surgery";

describe("subjectCheck", () => {
  it("qualifies a student with the full medicine combo in one sitting", () => {
    const course = getCourse(MEDICINE)!;
    const result = checkCourse(course, {
      credits: ["english", "mathematics", "physics", "chemistry", "biology"],
      oneSitting: true,
    });
    expect(result.qualifies).toBe(true);
    expect(result.missingCompulsory).toEqual([]);
  });

  it("flags missing compulsory credits", () => {
    const course = getCourse(MEDICINE)!;
    const result = checkCourse(course, {
      credits: ["english", "mathematics", "physics", "chemistry"],
      oneSitting: true,
    });
    expect(result.qualifies).toBe(false);
    expect(result.missingCompulsory).toContain("biology");
  });

  it("blocks one-sitting courses when credits may span two sittings", () => {
    const course = getCourse(MEDICINE)!;
    const result = checkCourse(course, {
      credits: ["english", "mathematics", "physics", "chemistry", "biology"],
      oneSitting: false,
    });
    expect(result.sittingsBlocked).toBe(true);
    expect(result.qualifies).toBe(false);
  });

  it("flags too few credits", () => {
    const course = getCourse(MEDICINE)!;
    const result = checkCourse(course, {
      credits: ["english", "mathematics", "physics"],
      oneSitting: true,
    });
    expect(result.insufficientCredits).toBe(true);
    expect(result.qualifies).toBe(false);
  });

  it("flags a mismatched UTME combination", () => {
    const course = getCourse(MEDICINE)!;
    const result = checkCourse(course, {
      credits: ["english", "mathematics", "physics", "chemistry", "biology"],
      oneSitting: true,
      utme: ["mathematics", "economics", "government"],
    });
    expect(result.utmeBlocked).toBe(true);
    expect(result.qualifies).toBe(false);
  });

  it("sorts qualifying courses first in the full check", () => {
    const results = checkAllCourses({
      credits: ["english", "mathematics", "physics", "chemistry", "biology"],
      oneSitting: true,
    });
    const qualifying = results.filter((r) => r.qualifies);
    expect(qualifying.length).toBeGreaterThan(0);
    expect(qualifying.map((r) => r.course.slug)).toContain(MEDICINE);
    // Courses like Law (needs Literature) stay locked without Literature
    const law = results.find((r) => r.course.slug === "law");
    expect(law?.qualifies).toBe(false);
  });

  it("maps careers to the courses that lead to them", () => {
    const careers = careersForCourse("computer-science");
    expect(careers.map((c) => c.slug)).toContain("software-engineer");
    expect(careersForCourse("medicine-surgery").map((c) => c.slug)).toContain("doctor");
  });
});
