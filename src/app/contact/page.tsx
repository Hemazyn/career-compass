import type { Metadata } from "next";
import { ExternalLink, Globe, Linkedin, Mail, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui";
import { CONTACT, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Spot an outdated JAMB requirement or a missing career? Tell us — or reach out for feedback, corrections, and partnerships.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Career Compass",
    description:
      "Corrections, feedback, and partnerships — reach the team behind Career Compass.",
    type: "website",
  },
};

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    hint: "Best for corrections, feedback, and detailed questions.",
  },
  {
    icon: MessageSquare,
    label: "X (Twitter)",
    value: "@imanuel_tofunmi",
    href: CONTACT.x,
    hint: "Quick questions and public shout-outs.",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/devemma",
    href: CONTACT.linkedin,
    hint: "Professional and partnership enquiries.",
  },
  {
    icon: Globe,
    label: "Portfolio",
    value: "iamtofunmi.vercel.app",
    href: CONTACT.portfolio,
    hint: "More about the builder and other projects.",
  },
];

export default function ContactPage() {
  return (
    <Container size="md" className="py-16">
      <p className="text-brand-600 dark:text-brand-400 font-mono text-sm font-semibold tracking-wider uppercase">
        Contact
      </p>
      <h1 className="text-ink mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Tell us what we got wrong — or right
      </h1>
      <p className="text-ink-2 mt-3 max-w-2xl">
        {SITE_NAME} is built on data, and data goes stale. If a course requirement looks outdated, a
        career is missing, or a resource link is dead, we want to know.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {CHANNELS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group border-line bg-surface shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="bg-brand-600 dark:bg-brand-500 flex h-10 w-10 items-center justify-center rounded-xl text-white">
                <c.icon className="h-5 w-5" />
              </span>
              <ExternalLink className="text-ink-3/50 group-hover:text-brand-500 h-4 w-4 transition-colors" />
            </div>
            <p className="text-ink-3 mt-4 font-mono text-[11px] font-semibold tracking-wider uppercase">
              {c.label}
            </p>
            <p className="text-ink mt-1 font-semibold break-all group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
              {c.value}
            </p>
            <p className="text-ink-3 mt-1 text-sm">{c.hint}</p>
          </a>
        ))}
      </div>

      <div className="border-line bg-surface/60 mt-10 rounded-2xl border p-6 text-sm leading-relaxed">
        <h2 className="text-ink font-bold">Before you ask about admissions</h2>
        <p className="text-ink-2 mt-2">
          For anything about a specific application — cutoffs, deadlines, or whether your
          combination is accepted this year — please contact{" "}
          <a
            href="https://www.jamb.gov.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:underline dark:text-brand-400"
          >
            JAMB
          </a>{" "}
          or the institution directly. We keep our data as accurate as we can, but only the official
          bodies can give you a binding answer.
        </p>
      </div>
    </Container>
  );
}
