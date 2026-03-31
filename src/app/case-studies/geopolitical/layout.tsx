import type { ReactNode } from 'react'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: 'Case Studies — How Q Called It Before the Crowd',
  description:
    'See how Q identified mispriced prediction markets before they resolved. Real calls, real outcomes, real returns. 85.1% win rate across 120+ resolved forecasts.',
  ogImage: '/og/og-case-studies.png',
  path: '/case-studies/geopolitical',
})

// Breadcrumb schema — all values are hardcoded string literals, no user input
const BREADCRUMB_SCHEMA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Quotient', item: 'https://www.quotient.social' },
    { '@type': 'ListItem', position: 2, name: 'Case Studies', item: 'https://www.quotient.social/case-studies' },
    { '@type': 'ListItem', position: 3, name: 'Geopolitical', item: 'https://www.quotient.social/case-studies/geopolitical' },
  ],
})

export default function GeopoliticalCaseStudyLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />
      {children}
    </>
  )
}
