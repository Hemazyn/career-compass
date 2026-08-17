import { describe, it, expect } from "vitest";
import { buildRoadmap } from "@/lib/roadmap";
import { getCareer } from "@/data/careers";
import { getCourse, courseDifficulty } from "@/data/courses";

describe("buildRoadmap", () => {
  it("builds a full JSS3-to-career roadmap for a doctor", () => {
    const career = getCareer("doctor")!;
    const course = getCourse("medicine-surgery")!;
    const steps = buildRoadmap(career, course);

    expect(steps.length).toBeGreaterThanOrEqual(5);
    // Starts at the JSS3 stream decision
    expect(steps[0].phase).toContain("JSS3");
    expect(steps[0].title).toContain("Science");
    // Covers the UTME combination with the actual subjects
    const jamb = steps.find((s) => s.phase.includes("JAMB"))!;
    expect(jamb.details.join(" ")).toContain("Physics");
    expect(jamb.details.join(" ")).toContain("Chemistry");
    expect(jamb.details.join(" ")).toContain("Biology");
    // Includes the licensing path
    const launch = steps.find((s) => s.phase.includes("After graduation"))!;
    expect(launch.details.join(" ")).toContain("MDCN");
    // Always ends with a Plan B
    expect(steps[steps.length - 1].phase).toContain("Plan B");
    expect(steps[steps.length - 1].details.length).toBeGreaterThan(0);
  });

  it("mentions one-sitting requirements when the course demands them", () => {
    const career = getCareer("doctor")!;
    const course = getCourse("medicine-surgery")!;
    const steps = buildRoadmap(career, course);
    const oLevel = steps.find((s) => s.phase.includes("SSS1"))!;
    expect(oLevel.details.join(" ")).toContain("ONE sitting");
  });
});

describe("courseDifficulty", () => {
  it("rates medicine as extremely competitive and agriculture as accessible", () => {
    expect(courseDifficulty(getCourse("medicine-surgery")!).level).toBe(5);
    expect(courseDifficulty(getCourse("agriculture")!).level).toBeLessThanOrEqual(2);
  });

  it("returns label, blurb and color classes for every course", () => {
    for (const course of [getCourse("law")!, getCourse("computer-science")!, getCourse("architecture")!]) {
      const d = courseDifficulty(course);
      expect(d.label.length).toBeGreaterThan(0);
      expect(d.blurb).toContain("JAMB");
      expect(d.dot).toMatch(/^bg-/);
      expect(d.text).toMatch(/^text-/);
    }
  });
});
