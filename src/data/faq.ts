export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is Career Compass really free?",
    answer:
      "Yes — completely. No sign-up, no paywall, no email required. Every career path, quiz result, and pivot guide is free to use, forever.",
  },
  {
    question: "How does the quiz decide which career path fits me?",
    answer:
      "The quiz has 18 questions grounded in the RIASEC (Holland Codes) interest model, adapted for Nigerian students. Your answers build scores across six interest dimensions, which are weighted to recommend Science, Arts, or Commercial — and, just as importantly, show which doors each stream opens and closes.",
  },
  {
    question: "Where does the subject combination data come from?",
    answer:
      "Course requirements are modelled on the JAMB e-Brochure and WAEC subject rules. Requirements can vary by institution and year, so always confirm the current details on jamb.gov.ng before registering.",
  },
  {
    question: "What if I already chose the 'wrong' stream or course?",
    answer:
      "The Post-NYSC Pivot Guide is built for exactly this. Pick your degree family and see realistic, Nigeria-specific paths graduates actually take — with first steps, honest timelines, and mostly-free resources. One focused skill beats five certificates.",
  },
  {
    question: "I'm a parent — can I use this to guide my child?",
    answer:
      "Absolutely. Parents are one of our core audiences. Start with the career path quiz together, then explore careers side by side — it turns a stressful, high-pressure decision into an informed conversation.",
  },
  {
    question: "Does choosing a stream lock me out of other careers forever?",
    answer:
      "Not forever, but it makes some paths longer. That's why we show both what each stream opens and what it closes — so the choice is informed. Many careers (especially tech, design, and entrepreneurship) are reachable from any stream with the right skills and portfolio.",
  },
  {
    question: "What does the subject checker do?",
    answer:
      "Pick the WAEC/NECO subjects you already have credits in (plus your planned UTME subjects, optionally) and the checker instantly shows which mapped courses and careers you qualify for — and which are locked, with the exact reason why. Know before you pay to register.",
  },
  {
    question: "Where are my saved careers stored?",
    answer:
      "On your own device, in your browser's local storage — the same place your theme preference lives. No account, no server, nothing sent to us. Clear your browser data and they're gone.",
  },
  {
    question: "What is the roadmap generator?",
    answer:
      "Pick a career and we turn it into a year-by-year plan: the stream you choose at JSS3, your SSS subjects, the JAMB combination, university, licensing, and a Plan B. You can print it or share it on WhatsApp.",
  },
];
