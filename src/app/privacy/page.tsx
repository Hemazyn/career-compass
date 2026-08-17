import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection } from "@/components/ui";
import { CONTACT, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Career Compass stores everything on your device. We don't run accounts, analytics, or trackers — read how your data is handled.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — Career Compass",
    description:
      "Everything you do on Career Compass stays on your device. No accounts, no trackers, no data collected on our servers.",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <DocPage eyebrow="Legal" title="Privacy Policy" lastUpdated="August 17, 2026">
      <DocSection title="The short version">
        <p>
          {SITE_NAME} is free and requires no sign-up or account. We do not collect, store, or
          process your personal data on our servers. Everything you do on the site — saved careers,
          quiz answers, your theme preference — stays{" "}
          <strong className="text-ink">on your own device</strong>.
        </p>
      </DocSection>

      <DocSection title="What we store on your device">
        <p>
          The site uses your browser&apos;s <strong className="text-ink">localStorage</strong> to
          remember things between visits, including:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Careers you&apos;ve saved and your compare selections</li>
          <li>Your quiz answers and result</li>
          <li>Your light/dark theme preference</li>
        </ul>
        <p>
          This data never leaves your browser and is never transmitted to us. Clearing your browser
          data (or using a private/incognito window) removes it.
        </p>
      </DocSection>

      <DocSection title="What we don't collect">
        <p>
          We don&apos;t run analytics, advertising trackers, or cookies that follow you across the
          web. We don&apos;t collect names, emails, phone numbers, or IP-based profiles, and there
          is nothing to sign up for. If we ever add analytics or any form of data collection, this
          policy will be updated before it happens.
        </p>
      </DocSection>

      <DocSection title="WhatsApp and sharing">
        <p>
          When you share a quiz result or roadmap, the content is sent from{" "}
          <strong className="text-ink">your own device</strong> through the app you choose (WhatsApp,
          etc.). That sharing happens on your phone, not through our servers, and the app you use has
          its own privacy policy that applies.
        </p>
      </DocSection>

      <DocSection title="Third-party links">
        <p>
          We link to external sites — JAMB, WAEC, NECO, institutions, LinkedIn and others — to help
          you verify requirements. Once you leave {SITE_NAME}, their own privacy policies apply. We
          aren&apos;t responsible for the content or practices of those sites.
        </p>
      </DocSection>

      <DocSection title="Children's privacy">
        <p>
          {SITE_NAME} is built for Nigerian students, including students under 13 making their JSS3
          stream choice. We do not knowingly collect personal information from anyone, including
          children, and we don&apos;t ask for it. If you believe a child has shared personal data
          with us through any channel,{" "}
          <Link href="/contact" className="text-brand-600 hover:underline dark:text-brand-400">
            contact us
          </Link>{" "}
          and we&apos;ll address it promptly.
        </p>
      </DocSection>

      <DocSection title="Data security">
        <p>
          Because there are no accounts or passwords, there are no credentials for anyone to steal.
          We still recommend you avoid sharing sensitive personal information (like your JAMB
          registration number) in any feedback you send us.
        </p>
      </DocSection>

      <DocSection title="Changes to this policy">
        <p>
          If this policy changes, we&apos;ll update the &ldquo;Last updated&rdquo; date above and,
          where practical, note the change. Your continued use of the site after a change means you
          accept the updated policy.
        </p>
      </DocSection>

      <DocSection title="Contact">
        <p>
          Questions about this policy? Reach us at{" "}
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-brand-600 hover:underline dark:text-brand-400"
          >
            {CONTACT.email}
          </a>{" "}
          or through any channel on our{" "}
          <Link href="/contact" className="text-brand-600 hover:underline dark:text-brand-400">
            contact page
          </Link>
          .
        </p>
      </DocSection>
    </DocPage>
  );
}
