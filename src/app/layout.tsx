import type { Metadata, Viewport } from 'next'
import {
  Newsreader,
  DM_Mono,
  Inter,
  Instrument_Sans,
} from 'next/font/google'
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SITE_OG_DESCRIPTION,
  DEFAULT_OG_IMAGE_PATH,
} from '@/lib/site'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_OG_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} social sharing image`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@QuotientHQ',
    title: SITE_TITLE,
    description: SITE_OG_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: { url: '/favicons/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#161514',
}

// Organization schema — static, trusted content only
const ORGANIZATION_SCHEMA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Quotient',
  url: 'https://www.quotient.social',
  logo: 'https://www.quotient.social/logos/quotient-wordmark.svg',
  description:
    'AI superforecasting platform for prediction market traders. Q identifies mispriced markets with an 85.1% win rate and Brier score of 0.076.',
  sameAs: [
    'https://x.com/QuotientHQ',
    'https://quotient.substack.com',
    'https://farcaster.xyz/quotient',
  ],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const fontVars = [
    newsreader.variable,
    dmMono.variable,
    inter.variable,
    instrumentSans.variable,
  ].join(' ')

  return (
    <html lang="en" className={fontVars}>
      <body className="font-body text-brand-black bg-brand-white text-sm leading-relaxed">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ORGANIZATION_SCHEMA }}
        />
        {children}
      </body>
    </html>
  )
}
