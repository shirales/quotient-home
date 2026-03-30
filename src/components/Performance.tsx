'use client'

import { useEffect, useRef, useState } from 'react'

// Star icon for Q row
function StarIcon() {
  return (
    <svg className="w-4 h-4 text-tb-primary" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

// Animated number component for the Q win rate
function AnimatedNumber({ value, suffix = '%' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 1500
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplayValue(eased * value)

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      {displayValue.toFixed(1)}{suffix}
    </span>
  )
}

// Pulsing dot for "Where Q called it right" label
function PulseDot() {
  return (
    <span className="relative inline-flex mr-2">
      <span className="w-2 h-2 bg-green-500 rounded-full" />
      <span className="absolute w-2 h-2 bg-green-500 rounded-full motion-safe:animate-ping opacity-75" />
    </span>
  )
}

// Win rate comparison data
const WIN_RATE_DATA = [
  { name: 'Q', value: 85.1, isQ: true },
  { name: 'Gemini 3.1 Pro', value: 50.9, isQ: false },
  { name: 'Claude Opus 4.6', value: 42.6, isQ: false },
  { name: 'GLM 5', value: 25.0, isQ: false },
]

// Brier score data (lower is better)
const BRIER_DATA = [
  { name: 'Q', score: 0.076, color: '#1C1A17' },
  { name: 'Superforecasters', score: 0.086, color: '#639922' },
  { name: 'Best LLMs', score: 0.103, color: '#BA7517' },
  { name: 'Public median', score: 0.123, color: '#D85A30' },
]

// Recent calls data
const RECENT_CALLS = [
  {
    market: 'US or Israel strike Iran by Mar 31?',
    qCalled: 'Yes',
    qCalledColor: 'text-green-600',
    marketOdds: '63%',
    whatHappened: 'Yes ✓',
    returnPct: '+60.0%',
  },
  {
    market: 'Houthi strike on Israel by Mar 15?',
    qCalled: 'No',
    qCalledColor: 'text-tb-primary',
    marketOdds: '36%',
    whatHappened: 'No ✓',
    returnPct: '+55.0%',
  },
]

// JORDAN: Replace with actual missed calls and dates
const MISSED_CALLS = [
  {
    market: 'U.S. strike on Iran by [date]?',
    qCalled: 'No',
    qCalledColor: 'text-tb-primary',
    marketOdds: '40%',
    whatHappened: 'Yes',
    miss: 'Escalation risk',
  },
  {
    market: 'Israeli strike triggers U.S. action?',
    qCalled: 'Low',
    qCalledColor: 'text-tb-primary',
    marketOdds: '[TBD]%',
    whatHappened: 'Yes',
    miss: 'Linked markets',
  },
]

interface PerformanceProps {
  showCta?: boolean
}

export function PerformanceBenchmarks() {
  return (
    <>
      <div className="max-w-[720px]">
        <h3 className="text-[15px] font-semibold mb-1 text-tb-dark">
          Q vs. frontier AI models
        </h3>
        <p className="text-[13px] text-tb-dark/50 mb-3">
          How often each model&apos;s forecast matched the eventual market outcome.
        </p>

        <div
          className="rounded-[10px] p-5 bg-white"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
        >
          <div className="space-y-3">
            {WIN_RATE_DATA.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className={`w-[96px] sm:w-[110px] text-[12px] sm:text-[13px] flex items-center ${item.isQ ? 'font-bold text-tb-dark' : 'text-tb-dark/40'}`}>
                  {item.name}
                  {item.isQ && <StarIcon />}
                </span>
                <div className="flex-1 h-5 bg-tb-dark/5 rounded-[3px] overflow-hidden">
                  {item.value !== null && (
                    <div
                      className={`h-full rounded-[3px] ${item.isQ ? 'bg-tb-dark' : 'bg-tb-dark/20'}`}
                      style={{ width: `${item.value}%` }}
                    />
                  )}
                </div>
                <span className={`w-[48px] sm:w-[55px] text-right font-mono ${item.isQ ? 'text-[15px] sm:text-[16px] font-bold text-tb-dark' : 'text-[12px] sm:text-[13px] text-tb-dark/40'}`}>
                  {item.value !== null ? (
                    item.isQ ? <AnimatedNumber value={item.value} /> : `${item.value}%`
                  ) : (
                    '—'
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[10px] text-tb-dark/40 mt-2">
          Based on 120+ resolved forecasts. Frontier model data via{' '}
          <a
            href="https://www.predictionarena.ai/?platform=polymarket"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-tb-dark/60 transition-colors"
          >
            PredictionArena
          </a>
          . As of March 23, 2026.
        </p>
      </div>

      <div className="max-w-[720px] mt-12">
        <h3 className="text-[15px] font-semibold mb-1 text-tb-dark">
          Q vs. top forecasting benchmarks
        </h3>
        <p className="text-[13px] text-tb-dark/50 mb-3">
          Lower is better. Brier score measures forecast accuracy and Q scores alongside elite human superforecasters and ahead of leading AI model benchmarks.
        </p>

        <div
          className="rounded-[10px] p-5 bg-white"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
        >
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-[10px] text-tb-dark/40">← Better</span>
              <span className="text-[10px] text-tb-dark/40">Worse →</span>
            </div>
            <div className="relative h-6 rounded-[4px] bg-gradient-to-r from-green-400 via-yellow-400 to-red-400">
              {BRIER_DATA.map((item) => {
                const position = (item.score / 0.25) * 100
                return (
                  <div
                    key={item.name}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                    style={{ left: `${position}%` }}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between mt-1">
              <span className="font-mono text-[10px] text-tb-dark/40">Perfect (0)</span>
              <span className="font-mono text-[10px] text-tb-dark/40">Coin flip (0.25)</span>
            </div>
          </div>

          <div className="grid grid-cols-4 max-md:grid-cols-2 gap-2">
            {BRIER_DATA.map((item) => (
              <div
                key={item.name}
                className="bg-tb-card-inner rounded-[6px] p-3"
                style={{ borderBottom: `3px solid ${item.color}` }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <div className={`font-mono text-[10px] uppercase tracking-[0.08em] flex items-center ${item.name === 'Q' ? 'font-bold text-tb-dark' : 'text-tb-dark/50'}`}>
                      {item.name}
                      {item.name === 'Q' && <StarIcon />}
                    </div>
                    <div
                      className={`font-mono text-[18px] ${item.name === 'Q' ? 'font-bold text-tb-dark' : ''}`}
                      style={{ color: item.name !== 'Q' ? item.color : undefined }}
                    >
                      {item.score.toFixed(3)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export function PerformanceReview() {
  return (
    <>
      <div className="max-w-[720px]">
        <h3 className="text-[15px] font-semibold mb-1 text-tb-dark flex items-center">
          <PulseDot />
          Where Q called it right
        </h3>
        <p className="text-[13px] text-tb-dark/50 mb-3">
          Recent markets where Q diverged from consensus, and the outcome proved Q right.
        </p>

        <div className="md:hidden space-y-3">
          {RECENT_CALLS.map((call, i) => (
            <div
              key={i}
              className="rounded-[10px] bg-white p-4"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
            >
              <div className="text-[13px] font-medium text-tb-dark mb-3">{call.market}</div>
              <div className="grid grid-cols-2 gap-3 text-[12px]">
                <div>
                  <div className="font-mono uppercase tracking-[0.08em] text-tb-dark/40 text-[10px] mb-1">Q Called</div>
                  <div className={`font-mono font-medium ${call.qCalledColor}`}>{call.qCalled}</div>
                </div>
                <div>
                  <div className="font-mono uppercase tracking-[0.08em] text-tb-dark/40 text-[10px] mb-1">Outcome</div>
                  <div className="text-tb-dark">{call.whatHappened}</div>
                </div>
                <div>
                  <div className="font-mono uppercase tracking-[0.08em] text-tb-dark/40 text-[10px] mb-1">Market Odds</div>
                  <div className="font-mono text-tb-dark/60">{call.marketOdds}</div>
                </div>
                <div>
                  <div className="font-mono uppercase tracking-[0.08em] text-tb-dark/40 text-[10px] mb-1">Return</div>
                  <div className="font-mono font-bold text-green-600">{call.returnPct}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="hidden md:block rounded-[10px] bg-white overflow-hidden"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
        >
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[35%]" />
              <col className="w-[12%]" />
              <col className="w-[15%] max-md:hidden" />
              <col className="w-[18%]" />
              <col className="w-[20%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-tb-dark/10 bg-tb-card-inner">
                <th className="text-left px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50">Market</th>
                <th className="text-left px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50">Q Called</th>
                <th className="text-left px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50 max-md:hidden">Market Odds</th>
                <th className="text-left px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50">What Happened</th>
                <th className="text-right px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50">Return</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_CALLS.map((call, i) => (
                <tr key={i} className={i < RECENT_CALLS.length - 1 ? 'border-b border-tb-dark/10' : ''}>
                  <td className="px-3 py-2.5 text-[13px] text-tb-dark">{call.market}</td>
                  <td className={`px-3 py-2.5 font-mono text-[13px] font-medium ${call.qCalledColor}`}>{call.qCalled}</td>
                  <td className="px-3 py-2.5 font-mono text-[13px] text-tb-dark/40 max-md:hidden">{call.marketOdds}</td>
                  <td className="px-3 py-2.5 text-[13px] text-tb-dark">{call.whatHappened}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-[14px] font-bold text-green-600">{call.returnPct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="max-w-[720px] mt-12">
        <h3 className="text-[15px] font-semibold mb-1 text-tb-dark flex items-center">
          <span className="relative inline-flex mr-2">
            <span className="w-2 h-2 bg-tb-primary rounded-full" />
            <span className="absolute w-2 h-2 bg-tb-primary rounded-full motion-safe:animate-ping opacity-75" />
          </span>
          Where Q missed and what we learned
        </h3>
        <p className="text-[13px] text-tb-dark/50 mb-3">
          Q is always learning. When a forecast misses, we trace the reasoning, find the breakdown, and come back sharper.
        </p>

        <div className="md:hidden space-y-3">
          {MISSED_CALLS.map((call, i) => (
            <div
              key={i}
              className="rounded-[10px] bg-white p-4"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
            >
              <div className="text-[13px] font-medium text-tb-dark mb-3">{call.market}</div>
              <div className="grid grid-cols-2 gap-3 text-[12px]">
                <div>
                  <div className="font-mono uppercase tracking-[0.08em] text-tb-dark/40 text-[10px] mb-1">Q Called</div>
                  <div className={`font-mono font-medium ${call.qCalledColor}`}>{call.qCalled}</div>
                </div>
                <div>
                  <div className="font-mono uppercase tracking-[0.08em] text-tb-dark/40 text-[10px] mb-1">Outcome</div>
                  <div className="text-tb-dark">{call.whatHappened}</div>
                </div>
                <div>
                  <div className="font-mono uppercase tracking-[0.08em] text-tb-dark/40 text-[10px] mb-1">Market Odds</div>
                  <div className="font-mono text-tb-dark/60">{call.marketOdds}</div>
                </div>
                <div>
                  <div className="font-mono uppercase tracking-[0.08em] text-tb-dark/40 text-[10px] mb-1">Miss</div>
                  <div className="font-mono text-[11px] text-tb-primary">{call.miss}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="hidden md:block rounded-[10px] bg-white overflow-hidden"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
        >
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[35%]" />
              <col className="w-[12%]" />
              <col className="w-[15%] max-md:hidden" />
              <col className="w-[18%]" />
              <col className="w-[20%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-tb-dark/10 bg-tb-card-inner">
                <th className="text-left px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50">Market</th>
                <th className="text-left px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50">Q Called</th>
                <th className="text-left px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50 max-md:hidden">Market Odds</th>
                <th className="text-left px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50">What Happened</th>
                <th className="text-left px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50">Miss</th>
              </tr>
            </thead>
            <tbody>
              {MISSED_CALLS.map((call, i) => (
                <tr key={i} className={i < MISSED_CALLS.length - 1 ? 'border-b border-tb-dark/10' : ''}>
                  <td className="px-3 py-2.5 text-[13px] text-tb-dark">{call.market}</td>
                  <td className={`px-3 py-2.5 font-mono text-[13px] font-medium ${call.qCalledColor}`}>{call.qCalled}</td>
                  <td className="px-3 py-2.5 font-mono text-[13px] text-tb-dark/40 max-md:hidden">{call.marketOdds}</td>
                  <td className="px-3 py-2.5 text-[13px] text-tb-dark">{call.whatHappened}</td>
                  <td className="px-3 py-2.5 text-left font-mono text-[11px] text-tb-primary whitespace-nowrap">
                    {call.miss}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-l-[3px] border-tb-primary rounded-[6px] pl-4 py-3 mt-3 bg-white" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h4 className="text-[14px] font-semibold text-tb-dark mb-2">What we learned from it</h4>
          <p className="text-[13px] leading-relaxed text-tb-dark/60">
            Markets don&apos;t move in isolation. An Israeli strike on Iran raises the odds of a U.S. strike too. Q was missing that dependency.<br /><br />
            We updated the pipeline to track correlated outcomes across linked markets. Forecasts on escalation events are now better calibrated, and Q&apos;s spreads reflect it.
          </p>
          <a
            href="https://quotient.substack.com/i/189897966/what-we-got-wrong-and-what-were-fixing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.08em] text-tb-primary hover:text-tb-cta-hover transition-colors mt-3 group"
          >
            Read the full postmortem on Substack
            <span className="transition-transform group-hover:translate-x-[3px]">&rarr;</span>
          </a>
        </div>
      </div>
    </>
  )
}

export default function Performance({ showCta = true }: PerformanceProps) {
  return (
    <section
      id="performance"
      className="section-shell bg-tb-cream rounded-tb-card py-16 sm:py-20 lg:py-tb-section-y"
    >
      <div className="max-w-content mx-auto">
        {/* Eyebrow */}
        <span className="block uppercase mb-3 font-mono text-tb-primary text-[11px] tracking-[0.08em]">
          Performance
        </span>

        {/* Headline */}
        <h2 className="font-headline font-bold text-tb-dark text-[24px] lg:text-[36px] leading-[0.95] tracking-[-0.02em] mb-2 uppercase">
          Q&apos;S PERFORMANCE, VERIFIED.
        </h2>

        {/* Subhead */}
        <p className="text-[15px] leading-[1.7] text-tb-dark/60 max-w-[560px] mb-8">
          Benchmarked against frontier models and tested against real market outcomes, Q performs at a level worth paying attention to.
        </p>

        <PerformanceBenchmarks />
        <div className="mt-12">
          <PerformanceReview />
        </div>

        {showCta && (
          <div className="max-w-[720px] mt-8">
            <a
              href="/case-studies/geopolitical"
              className="inline-flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.08em] text-tb-primary hover:text-tb-cta-hover transition-colors group"
            >
              See the geopolitical case study
              <span className="transition-transform group-hover:translate-x-[3px]">&rarr;</span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
