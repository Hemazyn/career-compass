import { describe, it, expect } from "vitest";
import { CAREERS, careersByStream } from "@/data/careers";
import { COURSES, getCourse } from "@/data/courses";
import { SUBJECTS } from "@/data/subjects";
import { DEGREE_GROUPS, getDegreeGroup } from "@/data/pivots";
import { RESOURCES, RESOURCE_CATEGORIES } from "@/data/resources";
import type { Stream } from "@/types";

const STREAMS: Stream[] = ["science", "art", "commercial"];
const VALID_OUTLOOKS = ["high", "growing", "stable", "competitive"];

describe("careers data graph", () => {
  it("has unique career slugs", () => {
    const slugs = CAREERS.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has a valid stream and outlook on every career", () => {
    for (const c of CAREERS) {
      expect(STREAMS).toContain(c.stream);
      expect(VALID_OUTLOOKS).toContain(c.outlook);
      expect(c.salaryNgn.experienced).toBeGreaterThanOrEqual(c.salaryNgn.entry);
    }
  });

  it("links every career to at least one real course", () => {
    const courseSlugs = new Set(COURSES.map((c) => c.slug));
    for (const c of CAREERS) {
      expect(c.courseSlugs.length).toBeGreaterThan(0);
      for (const slug of c.courseSlugs) {
        expect(courseSlugs.has(slug), `${c.title} links to unknown course ${slug}`).toBe(true);
      }
    }
  });

  it("matches career stream to its course stream", () => {
    // These careers intentionally pull in courses from other streams
    const KNOWN_CROSS_STREAM = new Set(["data-scientist", "product-manager"]);
    for (const c of CAREERS) {
      for (const slug of c.courseSlugs) {
        const course = getCourse(slug);
        if (course && course.stream !== c.stream) {
          expect(KNOWN_CROSS_STREAM.has(c.slug), `${c.title} links to mismatched course ${slug}`).toBe(true);
        }
      }
    }
  });

  it("has non-empty descriptions, dayToDay and altRoutes", () => {
    for (const c of CAREERS) {
      expect(c.description.length).toBeGreaterThan(40);
      expect(c.dayToDay.length).toBeGreaterThan(0);
      expect(c.altRoutes.length).toBeGreaterThan(0);
    }
  });
});

describe("courses data", () => {
  it("has unique course slugs", () => {
    const slugs = COURSES.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("references only known subjects in UTME combinations", () => {
    const subjectIds = new Set(SUBJECTS.map((s) => s.id));
    for (const course of COURSES) {
      for (const subjectId of course.utmeSubjects) {
        expect(subjectIds.has(subjectId), `${course.name} references unknown subject ${subjectId}`).toBe(true);
      }
      for (const credit of course.oLevel.compulsoryCredits) {
        expect(subjectIds.has(credit), `${course.name} references unknown credit ${credit}`).toBe(true);
      }
    }
  });

  it("has sensible cutoffs and durations", () => {
    for (const c of COURSES) {
      expect(c.durationYears).toBeGreaterThanOrEqual(3);
      expect(c.cutoffRange.min).toBeLessThanOrEqual(c.cutoffRange.competitive);
    }
  });
});

describe("quiz/stream helpers", () => {
  it("can list careers for every stream", () => {
    for (const stream of STREAMS) {
      expect(careersByStream(stream).length).toBeGreaterThan(0);
    }
  });
});

describe("pivot data", () => {
  it("has unique degree-group slugs and valid streams", () => {
    const slugs = DEGREE_GROUPS.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const g of DEGREE_GROUPS) {
      expect(["science", "art", "commercial", "any"]).toContain(g.stream);
      expect(g.paths.length).toBeGreaterThan(0);
      expect(getDegreeGroup(g.slug)).toBe(g);
    }
  });

  it("gives every pivot path real resources and first steps", () => {
    for (const g of DEGREE_GROUPS) {
      for (const p of g.paths) {
        expect(p.firstSteps.length).toBeGreaterThan(0);
        expect(p.resources.length).toBeGreaterThan(0);
        expect(["natural", "stretch", "bold"]).toContain(p.fit);
        for (const r of p.resources) {
          expect(r.url).toMatch(/^https?:\/\//);
        }
      }
    }
  });
});

describe("resources data", () => {
  it("has unique slugs and valid categories", () => {
    const slugs = RESOURCES.map((r) => r.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const categoryValues = new Set(RESOURCE_CATEGORIES.map((c) => c.value));
    for (const r of RESOURCES) {
      expect(categoryValues.has(r.category)).toBe(true);
      expect(r.url).toMatch(/^https?:\/\//);
      expect(r.description.length).toBeGreaterThan(30);
    }
  });
});
