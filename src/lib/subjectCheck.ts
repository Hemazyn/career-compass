import type { Career, Course } from "@/types";
import { COURSES } from "@/data/courses";
import { CAREERS } from "@/data/careers";

export interface CheckOptions {
  /** O'Level subject ids the student already has credits in */
  credits: string[];
  /** True if all credits come from a single WAEC/NECO sitting */
  oneSitting: boolean;
  /** Optional planned UTME subject ids (English is always compulsory, don't include it) */
  utme?: string[];
}

export interface CourseCheck {
  course: Course;
  qualifies: boolean;
  /** Compulsory credit subjects the student is missing */
  missingCompulsory: string[];
  /** True if the student has fewer credits than the course minimum */
  insufficientCredits: boolean;
  /** True if the course demands one sitting but the student's credits may span two */
  sittingsBlocked: boolean;
  /** True when the optional UTME combo does not match */
  utmeBlocked: boolean;
}

export function checkCourse(course: Course, opts: CheckOptions): CourseCheck {
  const missingCompulsory = course.oLevel.compulsoryCredits.filter((c) => !opts.credits.includes(c));
  const insufficientCredits = opts.credits.length < course.oLevel.minCredits;
  const sittingsBlocked = !opts.oneSitting && course.oLevel.maxSittings === 1;
  const utmeBlocked = !!opts.utme && !course.utmeSubjects.every((s) => opts.utme!.includes(s));
  const qualifies = !missingCompulsory.length && !insufficientCredits && !sittingsBlocked && !utmeBlocked;
  return { course, qualifies, missingCompulsory, insufficientCredits, sittingsBlocked, utmeBlocked };
}

export function checkAllCourses(opts: CheckOptions): CourseCheck[] {
  return COURSES.map((c) => checkCourse(c, opts));
}

/** Careers whose course list includes the given course slug */
export function careersForCourse(courseSlug: string): Career[] {
  return CAREERS.filter((c) => c.courseSlugs.includes(courseSlug));
}
