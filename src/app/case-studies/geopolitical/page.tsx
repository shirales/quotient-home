'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { APP_HREF } from '@/lib/links'
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  LineController,
} from 'chart.js'

// Register Chart.js components
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, LineController)

const metrics = [
  { value: '700+', label: 'MARKETS' },
  { value: '1,600+', label: 'SOURCES' },
  { value: '250+', label: 'ARTICLES/DAY' },
  { value: '85%', label: 'WIN RATE' },
  { value: '900+', label: 'CONTRIBUTORS' },
]

// Chart.js Line Chart Component
function MarketOddsChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  // Data points from Polymarket
  const labels = [
    'Jan 20', 'Jan 25', 'Feb 1', 'Feb 8', 'Feb 15', 'Feb 22',
    'Mar 1', 'Mar 5', 'Mar 7', 'Mar 8', 'Mar 10', 'Mar 11', 'Mar 12', 'Mar 13', 'Mar 14'
  ]
  const data = [50, 20, 18, 15, 17, 20, 60, 40, 65, 45, 65, 80, 85, 92, 99]
  const qCallIndex = 6 // Mar 1

  useEffect(() => {
    if (!canvasRef.current) return

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    // Create point styles - orange for Q's call point
    const pointBackgroundColors = data.map((_, i) =>
      i === qCallIndex ? '#F35B28' : 'transparent'
    )
    const pointBorderColors = data.map((_, i) =>
      i === qCallIndex ? '#F35B28' : 'transparent'
    )
    const pointRadii = data.map((_, i) =>
      i === qCallIndex ? 6 : 0
    )

    // Custom plugin to draw the vertical line and label
    const qCallPlugin = {
      id: 'qCallAnnotation',
      afterDraw: (chart: any) => {
        const ctx = chart.ctx
        const xScale = chart.scales.x
        const yScale = chart.scales.y

        const x = xScale.getPixelForValue(qCallIndex)
        const y = yScale.getPixelForValue(data[qCallIndex])
        const bottom = yScale.bottom

        // Draw vertical dashed line
        ctx.save()
        ctx.beginPath()
        ctx.setLineDash([4, 4])
        ctx.strokeStyle = '#F35B28'
        ctx.lineWidth = 1
        ctx.moveTo(x, y)
        ctx.lineTo(x, bottom)
        ctx.stroke()
        ctx.restore()

        // Draw label above the point
        const labelText = 'Q called 91% · market at 60%'
        ctx.save()
        ctx.font = '10px monospace'
        const textWidth = ctx.measureText(labelText).width
        const padding = 6
        const labelX = x - (textWidth / 2) - padding
        const labelY = y - 28

        // Label background
        ctx.fillStyle = '#1A1A1A'
        ctx.beginPath()
        ctx.roundRect(labelX, labelY, textWidth + padding * 2, 20, 4)
        ctx.fill()

        // Label text
        ctx.fillStyle = '#FFFFFF'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(labelText, x, labelY + 10)
        ctx.restore()
      }
    }

    // Create the chart
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data,
          borderColor: '#B4B2A9',
          borderWidth: 2,
          fill: false,
          tension: 0.1,
          pointBackgroundColor: pointBackgroundColors,
          pointBorderColor: pointBorderColors,
          pointRadius: pointRadii,
          pointHoverRadius: pointRadii,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 10,
                family: 'monospace'
              },
              color: '#1A1A1A80',
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 6
            },
            border: {
              display: false
            }
          },
          y: {
            min: 0,
            max: 100,
            grid: {
              color: (context: any) => {
                const value = context.tick.value
                if (value === 25 || value === 50 || value === 75) {
                  return '#E5E5E5'
                }
                return 'transparent'
              },
              lineWidth: 1
            },
            ticks: {
              stepSize: 25,
              font: {
                size: 10,
                family: 'monospace'
              },
              color: '#1A1A1A50',
              callback: function(value: any) {
                return value + '%'
              }
            },
            border: {
              display: false
            }
          }
        }
      },
      plugins: [qCallPlugin]
    })

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className="bg-white rounded-[10px] p-5 sm:p-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
      {/* Chart label */}
      <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/40 mb-4">
        Market odds over time · Q&apos;s call marked
      </div>
      <div style={{ height: '200px' }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}

export default function GeopoliticalCaseStudiesPage() {
  return (
    <div className="min-h-screen bg-tb-page pt-[44px]">
      <Nav />

      <main id="main-content" className="flex flex-col p-tb-gap pt-0 w-full">
        <div className="flex flex-col gap-tb-gap">
          {/* Hero - Dark section */}
          <section className="section-shell bg-tb-dark rounded-tb-card py-16 lg:py-24 min-h-[220px] sm:min-h-[280px] lg:min-h-[340px] flex items-center">
            <div className="max-w-content mx-auto w-full">
              {/* Content with 3px orange left border */}
              <div className="border-l-[3px] border-tb-primary pl-5">
                {/* Eyebrow */}
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-tb-primary mb-3">
                  Case Studies · Geopolitical
                </div>

                {/* Headline */}
                <h1 className="font-headline font-bold text-[32px] lg:text-[48px] leading-[0.95] text-white tracking-[-0.03em] mb-4 max-w-[640px]">
                  How Q identified mispriced<br />
                  markets before the crowd.
                </h1>

                {/* Subhead */}
                <p className="text-[15px] leading-relaxed text-white/70 max-w-[560px]">
                  A closer look at the calls, evidence, and outcomes behind Q&apos;s strongest reads.
                </p>
              </div>
            </div>
          </section>

          {/* Case Study - Cream section */}
          <section className="section-shell bg-tb-cream rounded-tb-card py-16 lg:py-20">
            <div className="max-w-content mx-auto">
              <div className="space-y-6">
                {/* Label - matching hero eyebrow styling */}
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-tb-primary">
                  Case Study · Geopolitical
                </div>

                {/* Market Question */}
                <h3 className="font-headline font-bold text-[24px] lg:text-[28px] leading-[1.1] text-tb-dark uppercase">
                  Will Iran close the Strait of Hormuz by March 31st?
                </h3>

                {/* Subheadline */}
                <p className="text-[15px] leading-relaxed text-tb-dark/70">
                  Q was 31 points ahead of the market. The market caught up. Settled Yes on March 14, 2026.
                </p>

                {/* 4-column stat grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Q Forecast */}
                  <div className="bg-white rounded-[10px] p-5 text-center" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                    <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50 mb-2">
                      Q Forecast
                    </div>
                    <div className="font-headline font-bold text-[32px] lg:text-[40px] leading-none text-tb-primary">
                      91%
                    </div>
                  </div>

                  {/* Market Odds */}
                  <div className="bg-white rounded-[10px] p-5 text-center" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                    <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50 mb-2">
                      Market Odds
                    </div>
                    <div className="font-headline font-bold text-[32px] lg:text-[40px] leading-none text-tb-dark">
                      60%
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="bg-white rounded-[10px] p-5 text-center" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                    <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50 mb-2">
                      Outcome
                    </div>
                    <div className="font-headline font-bold text-[32px] lg:text-[40px] leading-none text-tb-dark">
                      Yes
                    </div>
                  </div>

                  {/* Return if Followed - with light orange background */}
                  <div className="rounded-[10px] p-5 text-center" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)', backgroundColor: '#FEF6F3' }}>
                    <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50 mb-2">
                      Return if Followed
                    </div>
                    <div className="font-headline font-bold text-[32px] lg:text-[40px] leading-none text-green-600">
                      +51%
                    </div>
                  </div>
                </div>

                {/* Market odds chart */}
                <MarketOddsChart />

                {/* Two side-by-side cards: Takeaway and Market context */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Takeaway card */}
                  <div className="bg-white rounded-[10px] p-5 sm:p-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                    <div className="font-semibold text-[15px] text-tb-dark mb-2">Takeaway</div>
                    <p className="text-[14px] leading-relaxed text-tb-dark/70">
                      Q identified signals in regional military positioning and diplomatic channels that the market was underweighting. The 31-point spread was the opportunity.
                    </p>
                  </div>

                  {/* Market context card */}
                  <div className="bg-white rounded-[10px] p-5 sm:p-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                    <div className="font-semibold text-[15px] text-tb-dark mb-2">Market context</div>
                    <p className="text-[14px] leading-relaxed text-tb-dark/70">
                      $5.77M in total volume. The resolution was disputed twice before final settlement confirmed Yes on March 14.
                    </p>
                  </div>
                </div>

                {/* Why Q saw it differently */}
                <div>
                  <div className="font-semibold text-[15px] text-tb-dark mb-3">Why Q saw it differently</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      'Iranian naval exercises showed defensive posturing, not offensive preparation',
                      'Diplomatic back-channels indicated de-escalation signals',
                      'Economic incentives strongly favored keeping shipping lanes open',
                    ].map((bullet, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-[10px] p-4 flex items-start gap-3"
                        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
                      >
                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-tb-primary mt-1.5" />
                        <span className="text-[14px] leading-relaxed text-tb-dark/70">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Q by the Numbers - Cream section */}
          <section className="section-shell bg-tb-cream rounded-tb-card py-16 lg:py-20">
            <div className="max-w-content mx-auto">
              {/* Eyebrow */}
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-tb-primary mb-3">
                Q by the Numbers
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-[10px] p-5 text-center"
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
                  >
                    <div className="font-headline font-bold text-[28px] lg:text-[32px] leading-none text-tb-dark mb-1">
                      {metric.value}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA - Orange section */}
          <section className="section-shell bg-tb-primary rounded-tb-card py-16 lg:py-20">
            <div className="max-w-content mx-auto text-center">
              <h2 className="font-headline font-bold text-[24px] lg:text-[32px] leading-[0.95] text-white uppercase mb-6">
                Want to see how Q thinks in real time?
              </h2>

              <div className="flex items-center justify-center gap-6 flex-wrap">
                <Link
                  href={APP_HREF}
                  className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.08em] px-7 py-3 border border-white/30 text-white rounded-tb-card hover:border-white/60 transition-colors group"
                >
                  Explore the app
                  <span className="transition-transform group-hover:translate-x-[3px]">&rarr;</span>
                </Link>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  )
}
