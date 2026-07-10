import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { NavBar, Footer } from '@/components/layout';
import './globals.css';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s — Career Compass',
    default: 'Career Compass — Find your path, Nigeria',
  },
  description: 'From JSS3 stream choice to post-NYSC pivots: explore careers, check JAMB subject combinations, and plan your future — built for Nigerian students.',
  openGraph: {
    siteName: 'Career Compass',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} min-h-screen antialiased`}>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
