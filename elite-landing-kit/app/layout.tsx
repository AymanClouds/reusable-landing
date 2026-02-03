import * as React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'EliteLanding Kit',
  description: 'Enterprise-grade landing page registry with AI personalization and motion systems.',
  metadataBase: new URL('https://elite-landing-kit.local'),
  openGraph: {
    title: 'EliteLanding Kit',
    description: 'Composable, animated landing pages powered by Shadcn UI registry.',
    url: 'https://elite-landing-kit.local',
    siteName: 'EliteLanding Kit',
    images: [{ url: '/svgs/wave.svg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website'
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
