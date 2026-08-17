import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NavBar, Footer, ThemeScript, ServiceWorkerRegister, InstallPrompt } from '@/components/layout';
import { JsonLd } from '@/components/ui';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SITE_TAGLINE, SITE_LOCALE } from '@/lib/site';
import './globals.css';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s — ${SITE_NAME}`,
    default: `${SITE_NAME} — Find your path, Nigeria`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ['career guidance Nigeria', 'JAMB subject combination', 'WAEC requirements', 'Nigerian students', 'SSS stream choice', 'post-NYSC career pivot', 'careers in Nigeria', 'career path quiz Nigeria'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    type: 'website',
    title: `${SITE_NAME} — Find your path, Nigeria`,
    description: SITE_TAGLINE,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Find your path, Nigeria`,
    description: SITE_TAGLINE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'education',
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: 'default',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f9f6' },
    { media: '(prefers-color-scheme: dark)', color: '#07100a' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="no-js" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Legacy iOS install meta — Next.js emits the modern mobile-web-app-capable variant */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/* iOS home-screen icon (manual link so the filename can be versioned to bust caches) */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <ThemeScript />
        <ServiceWorkerRegister />
        <InstallPrompt />
        <a href="#main-content" className="bg-brand-600 focus:ring-brand-500/40 sr-only z-100 rounded-lg px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:ring-2">
          Skip to content
        </a>
        <NavBar />
        <main id="main-content">{children}</main>
        <Footer />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            inLanguage: 'en-NG',
          }}
        />
      </body>
    </html>
  );
}
