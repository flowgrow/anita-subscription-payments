import { Metadata } from 'next';
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';
import { Toaster } from '@/components/ui/Toasts/toaster';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import 'styles/main.css';

import localFont from 'next/font/local';

const AnitaFont = localFont({
  src: '../public/assets/AnitaSansVF.woff2',
  variable: '--font-sans'
});

const meta = {
  title: 'Anita App',
  description: 'Brought to you by Bureau Fabian Draxl.',
  cardImage: '/og.png',
  robots: 'follow, index',
  url: getURL()
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: meta.title,
    description: meta.description,
    referrer: 'origin-when-cross-origin',
    keywords: ['Anita', 'Subscription'],
    authors: [{ name: 'Anita', url: 'https://anita.vision/' }],
    creator: 'Anita',
    publisher: 'Anita',
    robots: meta.robots,
    metadataBase: new URL(meta.url),
    openGraph: {
      url: meta.url,
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
      type: 'website',
      siteName: meta.title
    },
    twitter: {
      card: 'summary_large_image',
      site: '@anita_vision',
      creator: '@anita_vision',
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage]
    }
  };
}

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={AnitaFont.variable}>
      <body className="loading overflow-x-hidden">
        <Header />
        <main
          id="skip"
          className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
        >
          {children}
        </main>
        <Footer />
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
