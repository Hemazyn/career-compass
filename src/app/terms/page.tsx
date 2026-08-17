import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection } from "@/components/ui";
import { CONTACT, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Career Compass is a free educational tool, not official admission advice. Read the terms — including the JAMB data disclaimer — before relying on the site.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Use — Career Compass",
    description:
      "The terms for using Career Compass, including the important disclaimer that course requirements must always be verified with JAMB.",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <DocPage eyebrow="Legal" title="Terms of Use" lastUpdated="August 17, 2026">
      <DocSection title="Acceptance">
        <p>
          By using {SITE_NAME} you agree to these terms. If you don&apos;t agree, please don&apos;t
          use the site. This is a free, educational service — nothing here creates a contract with
          any university, examination body, or employer.
        </p>
      </DocSection>

      <DocSection title="Informational purpose only">
        <p>
          {SITE_NAME} helps students explore careers and understand the paths to them. The content —
          career profiles, quiz recommendations, subject checks, roadmaps, and pivot guides — is{" "}
          <strong className="text-ink">educational guidance</strong>, not official admission advice,
          counselling, or a guarantee of any outcome.
        </p>
      </DocSection>

      <DocSection title="Data disclaimer — please read">
        <p>
          Course requirements on this site are modelled on the{" "}
          <strong className="text-ink">JAMB e-Brochure</strong> and WAEC/NECO subject rules, but they
          <strong className="text-ink"> vary by institution and by year</strong>. Before registering
          for anything, always confirm the current requirements on{" "}
          <a
            href="https://www.jamb.gov.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:underline dark:text-brand-400"
          >
            jamb.gov.ng
          </a>{" "}
          and with the institution you&apos;re applying to.
        </p>
        <p>
          Salary figures are indicative global USD ranges (and historic NGN ranges where shown) and
          vary widely by country, employer and specialisation. Demand outlooks, difficulty ratings,
          and rank positions are editorial estimates to help you compare options — they are not
          employment or admission guarantees.
        </p>
        <p>
          If you spot something outdated or wrong, please tell us via the{" "}
          <Link href="/contact" className="text-brand-600 hover:underline dark:text-brand-400">
            contact page
          </Link>{" "}
          so we can fix it.
        </p>
      </DocSection>

      <DocSection title="Not professional advice">
        <p>
          The quiz, subject checker, and roadmap tools are decision-support aids. They don&apos;t
          replace a school counsellor, a qualified careers adviser, or official guidance from JAMB,
          WAEC, NECO, or your school. Important life decisions deserve human input too.
        </p>
      </DocSection>

      <DocSection title="Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Scrape, bulk-download, or republish the site&apos;s data at scale without permission</li>
          <li>Misrepresent the site, its data, or its results as official</li>
          <li>Use the site for any unlawful purpose</li>
        </ul>
      </DocSection>

      <DocSection title="Intellectual property">
        <p>
          The content on this site — text, data, design, and tools — belongs to {SITE_NAME} unless
          stated otherwise. You&apos;re welcome to share pages and results for personal,
          non-commercial use, and teachers are welcome to use them in class, with attribution.
        </p>
      </DocSection>

      <DocSection title="Third-party links">
        <p>
          We link to external resources (JAMB, WAEC, NECO, institutions, LinkedIn, and others) for
          your convenience. We don&apos;t control their content and aren&apos;t responsible for
          anything on their sites.
        </p>
      </DocSection>

      <DocSection title="Limitation of liability">
        <p>
          The site is provided &ldquo;as is&rdquo; and free of charge. To the fullest extent
          permitted by law, {SITE_NAME} is not liable for any decisions you make — or outcomes of
          those decisions — based on the content of this site. Always verify critical details
          independently before acting on them.
        </p>
      </DocSection>

      <DocSection title="Changes to these terms">
        <p>
          We may update these terms from time to time; the &ldquo;Last updated&rdquo; date above
          reflects the latest version. Continuing to use the site after changes means you accept
          them.
        </p>
      </DocSection>

      <DocSection title="Contact">
        <p>
          Questions about these terms? Email{" "}
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-brand-600 hover:underline dark:text-brand-400"
          >
            {CONTACT.email}
          </a>{" "}
          or use the{" "}
          <Link href="/contact" className="text-brand-600 hover:underline dark:text-brand-400">
            contact page
          </Link>
          .
        </p>
      </DocSection>
    </DocPage>
  );
}
