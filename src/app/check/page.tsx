import type { Metadata } from "next";
import { SubjectChecker } from "@/components/check/SubjectChecker";

export const metadata: Metadata = {
  title: "Subject Checker — will your O'Level subjects work for your course?",
  description:
    "Select your WAEC/NECO credits (and planned UTME subjects) and instantly see which Nigerian university courses and careers you qualify for — and which are locked out, before you pay to register.",
  alternates: { canonical: "/check" },
  openGraph: {
    title: "Subject Checker — will your subjects work?",
    description:
      "See which courses and careers your O'Level subjects unlock — before you pay for JAMB registration. Modelled on the JAMB e-Brochure.",
    type: "website",
  },
};

export default function CheckPage() {
  return <SubjectChecker />;
}
