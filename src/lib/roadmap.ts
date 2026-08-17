import type { Career, Course } from "@/types";
import { STREAM_INFO } from "@/data/quiz";
import { subjectName } from "@/data/subjects";

export interface RoadmapStep {
  /** Life phase label, e.g. "JSS3 — right now" */
  phase: string;
  title: string;
  details: string[];
}

export function buildRoadmap(career: Career, course: Course): RoadmapStep[] {
  const stream = STREAM_INFO[career.stream];
  const utme = ["English Language", ...course.utmeSubjects.map(subjectName)];

  const steps: RoadmapStep[] = [
    {
      phase: "JSS3 — right now",
      title: `Choose the ${stream.label} stream`,
      details: [
        `Every path to ${career.title} starts with the ${stream.label} stream when you enter SSS1.`,
        "This is the earliest decision that locks or unlocks your options — make it with your plan in mind.",
        "Not sure it fits? Take the free 3-minute quiz and check before you choose.",
      ],
    },
    {
      phase: "SSS1 – SSS3",
      title: "Aim for the right O'Level credits",
      details: [
        `Target: ${course.oLevel.summary}.`,
        course.oLevel.maxSittings === 1
          ? "All credits must come from ONE sitting (WAEC or NECO) — plan your exams carefully."
          : "Credits may come from up to two sittings, but one sitting keeps every door open.",
        "English and Mathematics are effectively compulsory for almost every course.",
      ],
    },
    {
      phase: "SSS3 — JAMB year",
      title: "Register with the correct UTME combination",
      details: [
        `Your UTME subjects: ${utme.join(", ")} — English is compulsory for everyone.`,
        `Aim for at least ${course.cutoffRange.competitive}+ to be competitive at popular federal schools.`,
        "A wrong combination means automatic disqualification — always confirm on jamb.gov.ng before registering.",
      ],
    },
    {
      phase: "University",
      title: `Study ${course.name} (${course.durationYears} years)`,
      details: [
        `Typical admission: JAMB minimum ~${course.cutoffRange.min}, but competitive schools need ~${course.cutoffRange.competitive}+.`,
        `Sample universities: ${course.sampleUniversities.join(", ")}.`,
        "Strong O'Level results and a good post-UTME score matter as much as the JAMB score.",
      ],
    },
    {
      phase: "After graduation",
      title: "License, serve & launch",
      details: [
        ...(career.licensing ? [`Licensing path: ${career.licensing}.`] : []),
        ...(career.nyscNote ? [`NYSC: ${career.nyscNote}`] : []),
        "Graduation is the start line — the licensing and experience years are where the career really begins.",
      ],
    },
    {
      phase: "Plan B — always have one",
      title: "Alternative routes if the direct path stalls",
      details:
        career.altRoutes.length > 0
          ? career.altRoutes.map((r) => `• ${r}`)
          : ["Talk to a teacher or mentor about realistic alternatives."],
    },
  ];

  return steps.filter((s) => s.details.length > 0);
}
