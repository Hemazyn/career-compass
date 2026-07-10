import type { QuizQuestion, RiasecKey, RiasecScores, Stream } from "@/types";

/**
 * Stream Selector quiz — 18 questions, 3 per RIASEC dimension.
 * Answered on a 1–5 agree scale. Grounded in Holland Codes (RIASEC),
 * adapted to Nigerian JSS3 student context.
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Realistic — hands-on, practical
  {
    id: 1,
    text: "I enjoy fixing things — phones, bikes, electronics, anything broken.",
    dimension: "R",
  },
  {
    id: 2,
    text: "I would rather build something with my hands than write about it.",
    dimension: "R",
  },
  {
    id: 3,
    text: "Practical subjects (Intro Tech, Agric practicals) are my favourite classes.",
    dimension: "R",
  },
  // Investigative — analytical, curious
  {
    id: 4,
    text: "I love figuring out WHY things happen — I ask 'how does this work?' a lot.",
    dimension: "I",
  },
  {
    id: 5,
    text: "Solving a hard maths or puzzle question feels satisfying, even fun.",
    dimension: "I",
  },
  { id: 6, text: "I enjoy science experiments and would happily do more of them.", dimension: "I" },
  // Artistic — creative, expressive
  {
    id: 7,
    text: "I express myself best through drawing, writing, music or performance.",
    dimension: "A",
  },
  {
    id: 8,
    text: "I notice design — why one poster, outfit or building looks better than another.",
    dimension: "A",
  },
  {
    id: 9,
    text: "Essay and story writing come naturally to me; I enjoy literature.",
    dimension: "A",
  },
  // Social — helping, teaching
  {
    id: 10,
    text: "Friends come to me for advice, and I genuinely like helping them.",
    dimension: "S",
  },
  {
    id: 11,
    text: "I enjoy explaining topics to classmates until they understand.",
    dimension: "S",
  },
  {
    id: 12,
    text: "I care about people's wellbeing — I'd enjoy work that helps others directly.",
    dimension: "S",
  },
  // Enterprising — leading, persuading
  {
    id: 13,
    text: "I like leading groups — class captain, team lead, organising people.",
    dimension: "E",
  },
  { id: 14, text: "I can persuade people to see things my way (and I enjoy it).", dimension: "E" },
  {
    id: 15,
    text: "I've sold things, run a small hustle, or dreamt up business ideas.",
    dimension: "E",
  },
  // Conventional — organised, detail
  { id: 16, text: "I keep my notes, files and belongings neatly organised.", dimension: "C" },
  {
    id: 17,
    text: "I enjoy working with numbers, records and keeping track of money.",
    dimension: "C",
  },
  {
    id: 18,
    text: "I prefer clear rules and step-by-step instructions over 'figure it out'.",
    dimension: "C",
  },
];

/** Weights mapping RIASEC dimensions to SSS streams */
const STREAM_WEIGHTS: Record<Stream, Partial<Record<RiasecKey, number>>> = {
  science: { I: 1.0, R: 0.8, C: 0.3, A: 0.15 },
  art: { A: 1.0, S: 0.8, E: 0.35, I: 0.15 },
  commercial: { E: 1.0, C: 0.9, S: 0.3, I: 0.2 },
};

export function scoreQuiz(answers: Record<number, number>): RiasecScores {
  const scores: RiasecScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  for (const q of QUIZ_QUESTIONS) {
    const a = answers[q.id];
    if (a) scores[q.dimension] += a;
  }
  return scores;
}

export function recommendStream(scores: RiasecScores): {
  stream: Stream;
  ranking: { stream: Stream; score: number }[];
  topCodes: [RiasecKey, RiasecKey];
} {
  const ranking = (Object.keys(STREAM_WEIGHTS) as Stream[])
    .map((stream) => {
      const weights = STREAM_WEIGHTS[stream];
      const score = (Object.entries(weights) as [RiasecKey, number][]).reduce(
        (sum, [dim, w]) => sum + scores[dim] * w,
        0
      );
      return { stream, score: Math.round(score * 10) / 10 };
    })
    .sort((a, b) => b.score - a.score);

  const sortedCodes = (Object.entries(scores) as [RiasecKey, number][]).sort((a, b) => b[1] - a[1]);

  return {
    stream: ranking[0].stream,
    ranking,
    topCodes: [sortedCodes[0][0], sortedCodes[1][0]],
  };
}

export const RIASEC_LABELS: Record<RiasecKey, { name: string; blurb: string }> = {
  R: { name: "Realistic", blurb: "Hands-on builder — you like tools, machines and practical work" },
  I: {
    name: "Investigative",
    blurb: "Thinker — you like solving problems and understanding how things work",
  },
  A: {
    name: "Artistic",
    blurb: "Creator — you express ideas through words, design and performance",
  },
  S: { name: "Social", blurb: "Helper — you enjoy teaching, advising and caring for people" },
  E: { name: "Enterprising", blurb: "Leader — you persuade, organise and spot opportunities" },
  C: {
    name: "Conventional",
    blurb: "Organiser — you like structure, numbers and getting details right",
  },
};

export const STREAM_INFO: Record<Stream, { label: string; opens: string[]; closes: string[] }> = {
  science: {
    label: "Science",
    opens: [
      "Medicine, Pharmacy, Nursing & all health careers",
      "Engineering (all branches)",
      "Computer Science & tech degrees",
      "Architecture & environmental sciences",
    ],
    closes: ["Law (needs Literature at O'Level in most schools)", "Literature-based arts courses"],
  },
  art: {
    label: "Art",
    opens: [
      "Law — Nigeria's most competitive arts course",
      "Mass Communication, journalism & media",
      "International Relations & diplomacy",
      "Languages, History, Theatre Arts",
    ],
    closes: [
      "Medicine, Engineering & all core science courses",
      "Most computing degrees (need Physics)",
    ],
  },
  commercial: {
    label: "Commercial",
    opens: [
      "Accounting & the ICAN/ACCA path",
      "Economics, Banking & Finance",
      "Business Administration & entrepreneurship",
      "Insurance, Taxation, Marketing",
    ],
    closes: [
      "Medicine, Engineering & science courses",
      "Law at many universities (Literature requirement)",
    ],
  },
};
