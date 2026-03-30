'use client'

import { useState, useEffect, useRef } from 'react'
import { APP_HREF } from '@/lib/links'
import type { MarketCard } from '@/app/api/featured-markets/route'

/* ------------------------------------------------------------------ */
/*  Historical win rate for projected return adjustment                */
/* ------------------------------------------------------------------ */

const HISTORICAL_WIN_RATE = 0.85

/* ------------------------------------------------------------------ */
/*  Projected return calculation                                       */
/* ------------------------------------------------------------------ */

/**
 * Calculate projected return based on the difference between Q's forecast
 * and market pricing, adjusted by historical win rate.
 *
 * @param qProbability - Q's forecast probability (0-1)
 * @param marketProbability - Current market price (0-1)
 * @returns Projected return as a decimal (e.g., 0.57 for 57%)
 */
function calculateProjectedReturn(
  qProbability: number,
  marketProbability: number | null
): number | null {
  if (marketProbability === null || marketProbability === 0 || marketProbability === 1) {
    return null
  }

  // Step 1: Determine position based on Q vs market
  const isNoPosition = qProbability < marketProbability

  // Step 2: Calculate raw return based on position
  let rawReturn: number
  if (isNoPosition) {
    // NO position: cost is (1 - market), profit is (market - Q)
    rawReturn = (marketProbability - qProbability) / (1 - marketProbability)
  } else {
    // YES position: cost is market, profit is (Q - market)
    rawReturn = (qProbability - marketProbability) / marketProbability
  }

  // Step 3: Adjust by historical win rate
  return rawReturn * HISTORICAL_WIN_RATE
}

/* ------------------------------------------------------------------ */
/*  Fallback data (same shape as API response)                         */
/* ------------------------------------------------------------------ */

const FALLBACK_MARKETS: MarketCard[] = [
  {
    slug: 'us-x-iran-ceasefire-by',
    title: 'US x Iran ceasefire by May 31?',
    category: 'GEOPOLITICS',
    qProbability: 0.14,
    marketProbability: 0.60,
    spreadPoints: 46,
    isLive: false,
    lastUpdatedAt: '',
    marketSource: 'fallback',
    tradeUrl: 'https://polymarket.com/event/us-x-iran-ceasefire-by',
  },
  {
    slug: 'miguel-daz-canel-out-as-president-of-cuba-by-june-30',
    title: 'Diaz-Canel out as President of Cuba by June 30?',
    category: 'GEOPOLITICS',
    qProbability: 0.09,
    marketProbability: 0.44,
    spreadPoints: 35,
    isLive: false,
    lastUpdatedAt: '',
    marketSource: 'fallback',
    tradeUrl: 'https://polymarket.com/event/miguel-daz-canel-out-as-president-of-cuba-by-june-30',
  },
  {
    slug: 'will-the-us-confirm-that-aliens-exist-before-2027',
    title: 'Will the US confirm aliens exist before 2027?',
    category: 'CULTURE',
    qProbability: 0.07,
    marketProbability: 0.16,
    spreadPoints: 9,
    isLive: false,
    lastUpdatedAt: '',
    marketSource: 'fallback',
    tradeUrl: 'https://polymarket.com/event/will-the-us-confirm-that-aliens-exist-before-2027',
  },
]

const CARD_DELAYS = ['0.2s', '0.45s', '0.7s']

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */


/* ------------------------------------------------------------------ */
/*  Skeleton card                                                      */
/* ------------------------------------------------------------------ */

function SkeletonCard({ delay }: { delay: string }) {
  return (
    <div
      className="flex-1 min-w-0 mx-1 opacity-0"
      style={{
        animation: `hv2-slideUp 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay} forwards`,
      }}
    >
      <div className="h-full bg-white/[0.04] border border-white/[0.12] rounded-[10px] flex flex-col overflow-hidden">
        {/* Top section skeleton */}
        <div className="px-4 pt-4 pb-3">
          <div className="h-3 w-32 bg-white/[0.07] rounded animate-pulse mb-3" />
          <div className="h-5 w-full bg-white/[0.05] rounded animate-pulse mb-1" />
          <div className="h-5 w-2/3 bg-white/[0.05] rounded animate-pulse" />
        </div>
        {/* Middle section skeleton */}
        <div className="px-4 pb-3">
          <div className="flex">
            <div className="flex-1">
              <div className="h-2 w-16 bg-white/[0.05] rounded animate-pulse mb-2" />
              <div className="h-7 w-14 bg-white/[0.05] rounded animate-pulse" />
            </div>
            <div className="flex-1 flex flex-col items-end">
              <div className="h-2 w-14 bg-white/[0.05] rounded animate-pulse mb-2" />
              <div className="h-7 w-20 bg-white/[0.05] rounded animate-pulse" />
            </div>
          </div>
        </div>
        {/* Divider skeleton */}
        <div className="h-[3px] mx-4 bg-white/[0.05]" />
        {/* Bottom section skeleton */}
        <div className="px-4 pt-3 pb-4 flex items-end justify-between mt-auto">
          <div>
            <div className="h-2 w-20 bg-white/[0.05] rounded animate-pulse mb-2" />
            <div className="h-6 w-14 bg-white/[0.05] rounded animate-pulse" />
          </div>
          <div className="h-9 w-20 bg-white/[0.05] rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Info tooltip component                                             */
/* ------------------------------------------------------------------ */

function InfoTooltip({ text }: { text: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const showTooltip = () => {
    hoverTimeoutRef.current = setTimeout(() => setIsVisible(true), 150)
  }

  const hideTooltip = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setIsVisible(false)
  }

  // Split text into paragraphs on period followed by space and capital letter
  const paragraphs = text.split(/(?<=\.) (?=[A-Z])/)

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        className="ml-1 text-white/30 hover:text-white/50 transition-colors focus:outline-none focus:text-white/50"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={() => setIsVisible(true)}
        onBlur={hideTooltip}
        onClick={() => setIsVisible(!isVisible)}
        aria-label="More information"
        aria-describedby="tooltip"
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13zM7.25 7.5v4.25a.75.75 0 001.5 0V7.5a.75.75 0 00-1.5 0zM8 4.5a1 1 0 100 2 1 1 0 000-2z"/>
        </svg>
      </button>
      {isVisible && (
        <div
          ref={tooltipRef}
          id="tooltip"
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[260px] px-3 py-2.5 text-[10px] leading-[1.45] text-white/80 bg-[#2a2825] border border-white/10 rounded-md shadow-lg z-50 pointer-events-none"
        >
          {paragraphs.map((p, i) => (
            <p key={i} className={i > 0 ? 'mt-2' : ''}>
              {p}
            </p>
          ))}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
            <div className="border-4 border-transparent border-t-[#2a2825]" />
          </div>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Small activity/pulse icon for Q Signal                             */
/* ------------------------------------------------------------------ */

function QSignalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="inline-block mr-1">
      <path d="M3 12h4l3-9 4 18 3-9h4" stroke="#e65c38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Polymarket logo + wordmark (using actual SVG file)                 */
/* ------------------------------------------------------------------ */

function PolymarketLogo() {
  return (
    <img
      src="/logos/logo-white.svg"
      alt="Polymarket"
      className="h-[9px] w-auto opacity-40"
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Market card                                                        */
/* ------------------------------------------------------------------ */

function MarketCard({
  title,
  category,
  qProbability,
  marketProbability,
  delay,
}: Omit<MarketCard, 'tradeUrl' | 'spreadPoints'> & { delay: string }) {
  const qPercent = Math.round(qProbability * 100)
  const marketPercent = marketProbability != null ? Math.round(marketProbability * 100) : null

  // Calculate projected return
  const projectedReturn = calculateProjectedReturn(qProbability, marketProbability)
  const projectedReturnDisplay = projectedReturn != null
    ? `${Math.round(projectedReturn * 100)}%`
    : '—'

  // Determine position based on Q vs market price
  // If Q < market → Buy NO (betting against the event)
  // If Q > market → Buy YES (betting for the event)
  const position = marketProbability != null && qProbability < marketProbability ? 'Buy NO' : 'Buy YES'

  return (
    <div
      className="flex-1 min-w-0 mx-1 opacity-0"
      style={{
        animation: `hv2-slideUp 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay} forwards`,
      }}
    >
      <div className="group/card h-full bg-white/[0.04] border border-white/[0.12] hover:border-white/[0.22] rounded-[10px] flex flex-col overflow-hidden hover:-translate-y-[2px] transition-all duration-[250ms] ease-in-out">
        {/* Top section: Tag + Title */}
        <div className="px-4 pt-4 pb-5">
          <div className="flex items-center gap-1.5 mb-2">
            <PolymarketLogo />
            <span className="text-white/40">·</span>
            <span className="font-mono text-[9px] font-medium tracking-[0.08em] uppercase text-white/40">
              {category}
            </span>
          </div>
          <h3 className="text-[15px] font-normal text-white leading-[1.35] min-h-[40px]">
            {title}
          </h3>
        </div>

        {/* Middle section: Market Price vs Q Signal */}
        <div className="px-4 pb-4">
          <div className="flex">
            {/* Left: Market Price (muted, secondary) */}
            <div className="flex-1">
              <div className="font-mono text-[9px] font-medium tracking-[0.08em] uppercase text-white/30 mb-1">
                Market Price
              </div>
              <div className="text-[22px] sm:text-[28px] font-medium tabular-nums leading-none text-white/40">
                {marketPercent ?? '—'}
                <span className="text-[13px] sm:text-[16px]">%</span>
              </div>
            </div>
            {/* Right: Q Signal (prominent, white) - centered over the orange line */}
            <div className="flex-1 flex flex-col items-center">
              <div className="font-mono text-[9px] font-medium tracking-[0.08em] uppercase text-[#e65c38] mb-1 flex items-center">
                <QSignalIcon />
                Q Forecast
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[22px] sm:text-[28px] font-medium tabular-nums leading-none text-white">
                  {qPercent}
                  <span className="text-[13px] sm:text-[16px]">%</span>
                </span>
                <span className="font-mono text-[10px] font-medium tracking-[0.02em] text-white/70 border border-white/30 px-1.5 py-0.5 rounded-[2px]">
                  {position}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider: subtle line full-width, orange line on right half */}
        <div className="relative h-[3px] mx-4">
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
          <div className="absolute right-0 top-1/2 w-1/2 h-[2.5px] bg-[#e65c38] -translate-y-1/2" />
        </div>

        {/* Bottom section: Projected Return + Trade button */}
        <div className="px-4 pt-3 pb-4 flex items-end justify-between mt-auto">
          <div>
            <div className="font-mono text-[9px] font-medium tracking-[0.08em] uppercase text-white/30 mb-1 flex items-center">
              Projected Return
              <InfoTooltip text="Projected return estimates expected profit based on the gap between Q's forecast and market pricing. We calculate the expected return of the position and adjust it using our historical win rate (85%) to reflect real-world performance." />
            </div>
            <div className="text-[20px] font-medium tabular-nums leading-none text-[#4ade80]">
              {projectedReturnDisplay}
            </div>
          </div>
          <a
            href={APP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="group/trade font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-white px-4 py-2 rounded-tb-card border border-white/20 bg-white/5 hover:border-tb-primary hover:bg-white/10 transition-all cursor-pointer inline-flex items-center gap-1"
          >
            Trade
            <span className="transition-transform group-hover/trade:translate-x-[3px]">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page content                                                       */
/* ------------------------------------------------------------------ */

export default function HomeV2Content() {
  const [markets, setMarkets] = useState<MarketCard[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/featured-markets')
      .then((res) => res.json())
      .then((data) => {
        setMarkets(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const displayMarkets = markets ?? FALLBACK_MARKETS

  return (
    <div className="bg-tb-dark flex-1 rounded-[22px] flex flex-col relative overflow-y-auto sm:overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
      {/* Background effects */}
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[50%] h-[40%] bg-tb-primary/[0.08] rounded-full blur-[140px] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Hero — top section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6 text-center relative z-20">
        <div
          className="font-mono text-[10px] uppercase tracking-[0.25em] font-medium text-tb-primary mb-5 flex items-center gap-3.5 opacity-0"
          style={{ animation: 'hv2-fadeUp 0.6s ease-out forwards' }}
        >
          <span className="w-[30px] h-px bg-tb-primary/40" />
          AI Superforecasting for Prediction Markets
          <span className="w-[30px] h-px bg-tb-primary/40" />
        </div>

        <h1
          className="font-headline text-[clamp(32px,7.5vw,96px)] leading-[0.95] text-surface-light tracking-[-0.03em] mb-4 opacity-0"
          style={{ animation: 'hv2-fadeUp 0.6s ease-out 0.1s forwards' }}
        >
          Spot mispriced markets.
          <br />
          <span className="text-white/45">Trade with an edge.</span>
        </h1>

        <a
          href={APP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 border border-white/20 text-surface-light bg-white/5 font-mono text-[13px] uppercase tracking-[0.08em] px-7 py-3 rounded-tb-card cursor-pointer hover:border-tb-primary hover:bg-white/10 transition-all opacity-0 group"
          style={{ animation: 'hv2-fadeUp 0.6s ease-out 0.2s forwards' }}
        >
          Explore the app
          <span className="transition-transform group-hover:translate-x-[3px]">→</span>
        </a>
      </div>

      {/* Floating panel — bottom section with fixed min-height */}
      <div className="flex-[0_0_auto] w-full flex items-end justify-center px-2 sm:px-4 lg:px-12 relative z-10 pb-0">
        <div className="w-full max-w-[960px] min-w-0 min-h-[320px] sm:min-h-[380px] bg-[rgba(28,26,23,0.95)] backdrop-blur-xl border border-white/10 border-b-0 rounded-t-[10px] shadow-[0_-20px_60px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
          {/* Panel topbar */}
          <div className="border-b border-white/[0.07] px-4 sm:px-6 py-3 sm:py-4 flex items-start justify-between gap-4 sm:gap-6 flex-shrink-0 bg-white/[0.02]">
            <div className="min-w-0">
              <div className="font-mono text-[9px] font-medium tracking-[0.12em] uppercase text-[rgba(255,255,255,0.6)]">
                Active Narratives
              </div>
              <p className="text-[11px] leading-[1.5] text-[rgba(255,255,255,0.7)] mt-2">
                US-Iran conflict is unlikely to de-escalate near-term.
              </p>
            </div>
            <div className="flex items-center gap-[7px] font-mono text-[9px] font-medium tracking-[0.12em] uppercase text-white/40 pt-0.5">
              <div
                className="w-1.5 h-1.5 rounded-full bg-[#4ade80] shadow-[0_0_6px_rgba(74,222,128,0.6)]"
                style={{ animation: 'hv2-pulse 2s infinite' }}
              />
              Live
            </div>
          </div>

          {/* Cards row */}
          <div className="flex-1 flex max-sm:flex-col items-stretch gap-2 sm:gap-0 px-2 sm:px-3 lg:px-5 pt-3 sm:pt-4 pb-3 sm:pb-4 min-w-0 overflow-hidden">
            {loading
              ? CARD_DELAYS.map((d, i) => <SkeletonCard key={i} delay={d} />)
              : displayMarkets.map((m, i) => (
                  <MarketCard
                    key={m.slug}
                    slug={m.slug}
                    title={m.title}
                    category={m.category}
                    qProbability={m.qProbability}
                    marketProbability={m.marketProbability}
                    isLive={m.isLive}
                    lastUpdatedAt={m.lastUpdatedAt}
                    marketSource={m.marketSource}
                    delay={CARD_DELAYS[i]}
                  />
                ))}
          </div>

          {/* Disclaimer */}
          <div className="px-4 sm:px-6 pt-2 pb-3 text-center border-t border-white/[0.05]">
            <p className="text-[10px] text-white/[0.35] leading-[1.7] tracking-[0.01em]">
              Q provides forecasts organized into narratives. These are estimates based on our models and past performance. Always do your own research.{' '}
              <a href={APP_HREF} className="text-tb-primary hover:text-tb-cta-hover transition-colors">
                See what&apos;s live now →
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
