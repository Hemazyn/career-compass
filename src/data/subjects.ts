import type { Subject } from "@/types";

export const SUBJECTS: Subject[] = [
  { id: "english", name: "English Language", streams: ["science", "art", "commercial"] },
  { id: "mathematics", name: "Mathematics", streams: ["science", "art", "commercial"] },
  { id: "physics", name: "Physics", streams: ["science"] },
  { id: "chemistry", name: "Chemistry", streams: ["science"] },
  { id: "biology", name: "Biology", streams: ["science"] },
  { id: "further-maths", name: "Further Mathematics", streams: ["science"] },
  { id: "agric", name: "Agricultural Science", streams: ["science"] },
  { id: "geography", name: "Geography", streams: ["science", "art"] },
  { id: "economics", name: "Economics", streams: ["science", "art", "commercial"] },
  { id: "literature", name: "Literature in English", streams: ["art"] },
  { id: "government", name: "Government", streams: ["art", "commercial"] },
  { id: "history", name: "History", streams: ["art"] },
  { id: "crs", name: "Christian Religious Studies", streams: ["art"] },
  { id: "irs", name: "Islamic Religious Studies", streams: ["art"] },
  { id: "fine-art", name: "Fine Art", streams: ["art"] },
  { id: "yoruba", name: "Yoruba / Nigerian Language", streams: ["art"] },
  { id: "accounting", name: "Financial Accounting", streams: ["commercial"] },
  { id: "commerce", name: "Commerce", streams: ["commercial"] },
  { id: "business-studies", name: "Business Studies", streams: ["commercial"] },
  { id: "civic", name: "Civic Education", streams: ["science", "art", "commercial"] },
];

export const subjectName = (id: string) => SUBJECTS.find((s) => s.id === id)?.name ?? id;
