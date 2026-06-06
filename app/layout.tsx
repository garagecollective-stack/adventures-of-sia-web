import type { Metadata } from 'next';
import { Fredoka, Nunito, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const BASE_URL = 'https://adventuresofsiaofficial.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Adventures of Sia Official Website',
    template: '%s Adventures of Sia',
  },
  description: 'A little bunny with a big, curious heart. Join Sia, Milo and Arlo on magical meadow adventures! Free games, colouring books and activities for kids aged 2–6.',
  keywords: ['Adventures of Sia', 'kids cartoon', 'bunny', 'children animation', 'kids games', 'colouring pages', 'toddler show', 'preschool cartoon', 'free kids activities'],
  authors: [{ name: 'Garage Collective' }],
  creator: 'Garage Collective',
  publisher: 'Garage Collective',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Adventures of Sia',
    title: 'Adventures of Sia Official Website',
    description: 'A little bunny with a big, curious heart. Free games, colouring books and activities for kids aged 2–6.',
    images: [
      {
        url: '/images/og-image.jpeg',
        width: 1200,
        height: 630,
        alt: 'Adventures of Sia Sia the bunny in her magical meadow',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adventures of Sia Official Website',
    description: 'A little bunny with a big, curious heart. Free games, colouring and activities for kids 2–6!',
    images: ['/images/og-image.jpeg'],
  },
  icons: {
    icon: '/images/favicon-32.png',
    apple: '/images/apple-touch-icon.png',
    shortcut: '/images/favicon-32.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable} ${plusJakarta.variable} scroll-smooth`}>
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TVSeries',
              name: 'Adventures of Sia',
              description: 'An animated children\'s series about Sia, a curious little bunny, and her family.',
              genre: ['Animation', 'Children', 'Family'],
              audience: { '@type': 'PeopleAudience', suggestedMinAge: 2, suggestedMaxAge: 6 },
              character: [
                { '@type': 'Person', name: 'Sia', description: 'A curious little bunny explorer' },
                { '@type': 'Person', name: 'Milo', description: 'Sia\'s warm and nurturing mum' },
                { '@type': 'Person', name: 'Arlo', description: 'Sia\'s gentle and thoughtful dad' },
              ],
              url: BASE_URL,
              image: `${BASE_URL}/images/logo-landscape.jpeg`,
            }),
          }}
        />
      </head>
      <body className="font-body bg-brand-white text-text-deep antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
