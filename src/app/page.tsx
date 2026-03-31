import Nav from '@/components/Nav'
import HomeV2Content from '@/components/home-v2/HomeV2Draft'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: 'Quotient — AI Superforecasting for Prediction Market Traders',
  description:
    "Q is an AI superforecasting agent with an 85.1% win rate. See where markets are mispriced, understand why, and act on it. Follow the calls, trade the signals, or build with the API.",
  ogDescription:
    "Q is an AI superforecasting agent with an 85.1% win rate. Follow the calls. Trade the signals. Build with the API.",
  path: '/',
})

// Product schema for homepage — static, trusted content
const PRODUCT_SCHEMA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Q',
  description:
    "AI superforecasting agent for prediction markets. Identifies mispriced markets, surfaces the spread between Q's forecast and market odds, and organizes forecasts into actionable narratives.",
  brand: { '@type': 'Brand', name: 'Quotient' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '85.1',
    ratingCount: '120',
    bestRating: '100',
    worstRating: '0',
  },
})

export default function Home() {
  return (
    <div className="h-screen overflow-hidden sm:overflow-hidden overflow-y-auto flex flex-col bg-white pt-[44px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: PRODUCT_SCHEMA }}
      />
      <Nav />
      <main className="flex-1 min-h-0 flex flex-col px-4 pb-4">
        <HomeV2Content />
      </main>
      <footer className="flex-shrink-0 flex items-center justify-between px-4 sm:px-10 py-3 bg-white border-t border-gray-100">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9ca3af] font-medium">
          © 2026 Quotient Inc.
        </span>
        <div className="flex items-center gap-4 sm:gap-7">
          <a href="https://x.com/QuotientHQ" className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9ca3af] font-medium hover:text-tb-dark transition-colors">X</a>
          <a href="https://farcaster.xyz/quotient" className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9ca3af] font-medium hover:text-tb-dark transition-colors">Farcaster</a>
          <a href="https://quotient.substack.com" className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9ca3af] font-medium hover:text-tb-dark transition-colors">Substack</a>
        </div>
      </footer>
    </div>
  )
}
