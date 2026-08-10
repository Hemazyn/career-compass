import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavBar, Footer } from "@/components/layout";
import { JsonLd } from "@/components/ui";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SITE_TAGLINE, SITE_LOCALE } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s — ${SITE_NAME}`,
    default: `${SITE_NAME} — Find your path, Nigeria`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "career guidance Nigeria",
    "JAMB subject combination",
    "WAEC requirements",
    "Nigerian students",
    "SSS stream choice",
    "post-NYSC career pivot",
    "careers in Nigeria",
    "stream quiz Nigeria",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    type: "website",
    title: `${SITE_NAME} — Find your path, Nigeria`,
    description: SITE_TAGLINE,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Find your path, Nigeria`,
    description: SITE_TAGLINE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "education",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#07100a" },
  ],
};

const themeScript = `
(function () {
  document.documentElement.classList.remove('no-js');
  try {
    var stored = localStorage.getItem('cc-theme');
    var dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="no-js" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <a
          href="#main-content"
          className="bg-brand-600 focus:ring-brand-500/40 sr-only z-[100] rounded-lg px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:ring-2"
        >
          Skip to content
        </a>
        <NavBar />
        <main id="main-content">{children}</main>
        <Footer />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            inLanguage: "en-NG",
          }}
        />
      </body>
    </html>
  );
}
