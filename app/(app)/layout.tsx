import { getActiveProfile } from '@/actions';
import { Toaster } from '@/components/ui/sonner';
import { host, isDevelopment, url } from '@/lib/env';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import LocalFont from 'next/font/local';
import '../../global.css';
import { Footer } from './components/footer';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const profile = await getActiveProfile();

  return {
    title: {
      default: profile.name,
      template: `%s | ${profile.name}`,
    },
    authors: {
      name: profile.name,
      url
    },
    keywords: profile.keywords,
    description: profile.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: profile.name,
      description: profile.description,
      url: url,
      siteName: host,
      images: [
        {
          url: `${url}/seo_1024x1024.jpg`,
          width: 1024,
          height: 1024,
        },
        {
          url: `${url}/seo_1024x576.jpg`,
          width: 1024,
          height: 576,
        },
        {
          url: `${url}/seo_576x1024.jpg`,
          width: 576,
          height: 1024,
        },
      ],
      locale,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      title: profile.name,
      card: 'summary_large_image',
    },
    icons: {
      icon: {
        url: '/favicon.png',
        type: 'image/png'
      },
      shortcut: {
        url: '/favicon.png',
        type: 'image/png'
      },
      apple: {
        url: '/apple-touch-icon.png',
        type: 'image/png'
      },
    },
    manifest: `${url}/site.webmanifest`
  };
}
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const calSans = LocalFont({
  src: '../../public/fonts/CalSans-SemiBold.ttf',
  variable: '--font-calsans',
});

const devicon = LocalFont({
  src: '../../node_modules/devicon/fonts/devicon.ttf',
  variable: '--font-devicon',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={[inter.variable, calSans.variable, devicon.variable].join(' ')}
    >
      <body
        className={`dark bg-black ${isDevelopment ? 'debug-screens' : undefined
          }`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <Footer />
          <Toaster />
        </NextIntlClientProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
