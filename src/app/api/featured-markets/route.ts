import { NextResponse } from 'next/server'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface MarketCard {
  slug: string
  title: string
  category: string
  qProbability: number
  marketProbability: number | null
  spreadPoints: number | null
  isLive: boolean
  lastUpdatedAt: string
  marketSource: 'quotient' | 'fallback'
  tradeUrl: string | null
}

interface QuotientMarket {
  slug: string
  question?: string
  title?: string
  quotient_odds?: number
  market_odds?: number
  spread?: number
}

/* ------------------------------------------------------------------ */
/*  Curated markets config                                             */
/* ------------------------------------------------------------------ */

interface FeaturedMarketConfig {
  slug: string
  title: string
  category: string
  fallbackQProbability: number
  fallbackMarketProbability: number
}

// These are the specific markets you want to show
const FEATURED_MARKETS: FeaturedMarketConfig[] = [
  {
    slug: 'us-x-iran-ceasefire-by-may-31-313-373-916',
    title: 'US x Iran ceasefire by May 31?',
    category: 'GEOPOLITICS',
    fallbackQProbability: 0.18,
    fallbackMarketProbability: 0.46,
  },
  {
    slug: 'strait-of-hormuz-traffic-returns-to-normal-by-april-30',
    title: 'Strait of Hormuz traffic returns to normal by end of April?',
    category: 'GEOPOLITICS',
    fallbackQProbability: 0.12,
    fallbackMarketProbability: 0.24,
  },
  {
    slug: 'kharg-island-no-longer-under-iranian-control-by-april-30',
    title: 'Kharg Island no longer under Iranian control by April 30?',
    category: 'GEOPOLITICS',
    fallbackQProbability: 0.03,
    fallbackMarketProbability: 0.305,
  },
]

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const QUOTIENT_API_BASE = 'https://q-api.quotient.social'
const FETCH_TIMEOUT_MS = 30_000 // 30 seconds - lookup can be slow

// Cache settings: revalidate every 6 hours (21600 seconds)
// Uses /markets/lookup endpoint: 5 credits per call = ~$0.02/day
const CACHE_REVALIDATE_SECONDS = 21600

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function withTimeout(ms: number): AbortSignal {
  const controller = new AbortController()
  setTimeout(() => controller.abort(), ms)
  return controller.signal
}

/* ------------------------------------------------------------------ */
/*  Quotient API: lookup specific markets                              */
/* ------------------------------------------------------------------ */

async function fetchQuotientMarkets(): Promise<Map<string, QuotientMarket> | null> {
  const apiKey = process.env.QUOTIENT_API_KEY

  if (!apiKey) {
    console.warn('[featured-markets] No QUOTIENT_API_KEY set, using fallback data')
    return null
  }

  try {
    const slugs = FEATURED_MARKETS.map(m => m.slug).join(',')
    const url = new URL('/api/v1/markets/lookup', QUOTIENT_API_BASE)
    url.searchParams.set('slugs', slugs)

    const res = await fetch(url.toString(), {
      headers: {
        'x-quotient-api-key': apiKey,
      },
      next: { revalidate: CACHE_REVALIDATE_SECONDS },
      signal: withTimeout(FETCH_TIMEOUT_MS),
    })

    if (!res.ok) {
      const errorText = await res.text().catch(() => '')
      console.error(`[featured-markets] Quotient API returned ${res.status}: ${errorText}`)
      return null
    }

    const response = await res.json()
    // API returns { results: [...], not_found: [...] }
    const markets: QuotientMarket[] = response.results || []

    // Create a map for easy lookup
    const marketMap = new Map<string, QuotientMarket>()
    for (const m of markets) {
      marketMap.set(m.slug, m)
    }

    console.log(`[featured-markets] Fetched ${markets.length} markets from Quotient API`)
    return marketMap
  } catch (err) {
    console.error('[featured-markets] Quotient API fetch failed:', err)
    return null
  }
}

/* ------------------------------------------------------------------ */
/*  GET handler                                                        */
/* ------------------------------------------------------------------ */

export async function GET() {
  const lastUpdatedAt = new Date().toISOString()

  // Try to fetch live data from Quotient API
  const liveData = await fetchQuotientMarkets()

  // Build cards from curated list, enriched with live data if available
  const cards: MarketCard[] = FEATURED_MARKETS.map((config) => {
    const live = liveData?.get(config.slug)

    const qProbability = live?.quotient_odds ?? config.fallbackQProbability
    const marketProbability = live?.market_odds ?? config.fallbackMarketProbability
    const spreadPoints = Math.round(Math.abs(marketProbability - qProbability) * 100)

    return {
      slug: config.slug,
      title: live?.question || live?.title || config.title,
      category: config.category,
      qProbability,
      marketProbability,
      spreadPoints,
      isLive: live != null,
      lastUpdatedAt,
      marketSource: live != null ? 'quotient' : 'fallback',
      tradeUrl: null,
    }
  })

  return NextResponse.json(cards, {
    headers: {
      'Cache-Control': `public, s-maxage=${CACHE_REVALIDATE_SECONDS}, stale-while-revalidate=${CACHE_REVALIDATE_SECONDS * 2}`,
    },
  })
}
