'use client'

import { useState } from 'react'

// SVG Icons for legend cards - using brand orange stroke
function TargetIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#F35B28" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#F35B28" strokeWidth={1.5}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#F35B28" strokeWidth={1.5}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

// What's inside every forecast items
const FORECAST_ITEMS = [
  { icon: TargetIcon, title: 'The call', desc: 'What Q predicts, with a confidence level' },
  { icon: GridIcon, title: 'Key factors', desc: "Ranked and weighted evidence driving Q's view" },
  { icon: DocumentIcon, title: 'Full analysis', desc: 'Reasoning, assumptions, and scenario analysis' },
]

// Legend card component
function LegendCard({ icon: Icon, title, desc }: { icon: React.ComponentType; title: string; desc: string }) {
  return (
    <div
      className="bg-white rounded-[10px] border border-tb-border p-4 flex items-start gap-3"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-[6px] bg-tb-primary/10 flex items-center justify-center">
        <Icon />
      </div>
      <div>
        <h4 className="font-headline text-[15px] font-semibold text-tb-dark mb-1">
          {title}
        </h4>
        <p className="text-[13px] leading-relaxed text-tb-dark/50">
          {desc}
        </p>
      </div>
    </div>
  )
}

// Info button component
function InfoButton({ isHovered }: { isHovered: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-4 h-4 rounded-full border text-[9px] font-medium transition-colors duration-150 ${
        isHovered
          ? 'border-tb-primary text-tb-primary'
          : 'border-tb-dark/30 text-tb-dark/40'
      }`}
    >
      i
    </span>
  )
}

// Tooltip component
function Tooltip({ children, visible }: { children: React.ReactNode; visible: boolean }) {
  if (!visible) return null
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-20">
      {/* Arrow */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 w-3 h-3 bg-tb-dark rotate-45" />
      {/* Tooltip body */}
      <div className="relative bg-tb-dark text-tb-page text-[12px] leading-relaxed px-3 py-2 rounded-[6px] w-[180px]">
        {children}
      </div>
    </div>
  )
}

// Metric tile component with hover tooltip
function MetricTile({
  label,
  value,
  valueColor,
  descriptor,
  tooltip,
  isEdge = false,
}: {
  label: string
  value: string
  valueColor: string
  descriptor: string
  tooltip: string
  isEdge?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const visible = hovered || expanded

  return (
    <div
      className={`relative rounded-[8px] border border-tb-border/60 py-4 px-4 ${isEdge ? 'bg-tb-primary/10' : 'bg-white/70'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50">
          {label}
        </span>
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="inline-flex"
          aria-expanded={visible}
          aria-label={`More information about ${label}`}
        >
          <InfoButton isHovered={visible} />
        </button>
      </div>
      <span className={`block font-headline text-[24px] font-semibold mb-1 ${valueColor}`}>
        {value}
      </span>
      <span className="block text-[11px] text-tb-dark/40">
        {descriptor}
      </span>
      <div className="mt-3 md:hidden">
        {visible && (
          <div className="rounded-[6px] bg-tb-dark px-3 py-2 text-[12px] leading-relaxed text-tb-page">
            {tooltip}
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <Tooltip visible={visible}>{tooltip}</Tooltip>
      </div>
    </div>
  )
}

// Key factors data - no em dashes or hyphens
const KEY_FACTORS = [
  { weight: 'critical', percentage: '30%', text: 'Military posture mirrors June 2025 pre-strike configuration' },
  { weight: 'critical', percentage: '20%', text: 'Nuclear program degraded, no enrichment for 7 to 8 months' },
  { weight: 'significant', percentage: '15%', text: 'Trump one-month deadline plus Israeli officials warning of war' },
]

export function InsideAForecastContent() {
  return (
    <div className="flex max-lg:flex-col gap-6 items-center">
      <div
        className="max-w-[720px] w-full rounded-tb-card overflow-hidden border border-tb-border flex-shrink-0"
        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
      >
        <div className="bg-tb-dark px-6 py-5">
          <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-tb-page/50 mb-2">
            Example Forecast · Feb 18, 2026
          </span>
          <h3 className="font-headline text-[18px] lg:text-[22px] font-medium text-tb-page leading-tight">
            Will US or Israel strike Iran by March 31, 2026?
          </h3>
        </div>

        <div className="bg-tb-card-inner">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 p-4">
            <MetricTile
              label="Q's Call"
              value="Yes"
              valueColor="text-green-600"
              descriptor="What Q predicts"
              tooltip="This is the direction Q is betting. Yes or No. The probability comes separately."
            />
            <MetricTile
              label="Q's Forecast"
              value="52%"
              valueColor="text-tb-dark"
              descriptor="Q's probability estimate"
              tooltip="Q thinks there's a 52% chance this happens. This is Q's independent probability estimate."
            />
            <MetricTile
              label="Market Odds"
              value="63%"
              valueColor="text-tb-dark"
              descriptor="What the crowd is pricing"
              tooltip="What Polymarket was pricing when Q made this call. This is the crowd's view, not Q's."
            />
            <MetricTile
              label="Q's Edge"
              value="11 pts"
              valueColor="text-tb-primary"
              descriptor="Gap vs. the market"
              tooltip="The gap between Q's view and the market's. This is where the opportunity lives."
              isEdge
            />
          </div>
        </div>

        <div className="bg-tb-card-inner px-6 py-5 border-t border-tb-border">
          <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50 mb-4">
            Key Factors
          </span>
          <div className="md:hidden space-y-2">
            {KEY_FACTORS.map((factor, i) => (
              <div
                key={i}
                className={`rounded-[6px] border border-tb-border/50 bg-white p-4 ${
                  factor.weight === 'critical'
                    ? 'border-l-[3px] border-l-tb-primary'
                    : 'border-l-[3px] border-l-tb-dark/20'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase tracking-[0.04em] font-medium text-center ${
                      factor.weight === 'critical'
                        ? 'bg-tb-primary/10 text-tb-primary'
                        : 'bg-tb-dark/5 text-tb-dark/50'
                    }`}
                  >
                    {factor.weight}
                  </span>
                  <span className="font-mono text-[12px] text-tb-dark/40">{factor.percentage}</span>
                </div>
                <p className="text-[13px] leading-relaxed text-tb-dark/80">{factor.text}</p>
              </div>
            ))}
          </div>
          <table className="hidden md:table w-full">
            <tbody>
              {KEY_FACTORS.map((factor, i) => (
                <tr
                  key={i}
                  className={`bg-white border border-tb-border/50 ${
                    factor.weight === 'critical'
                      ? 'border-l-2 border-l-tb-primary'
                      : 'border-l-2 border-l-tb-dark/20'
                  } ${i > 0 ? 'mt-2' : ''}`}
                  style={{ display: 'table', width: '100%', marginBottom: i < KEY_FACTORS.length - 1 ? '8px' : '0', borderRadius: '6px' }}
                >
                  <td className="py-3 px-4 whitespace-nowrap" style={{ width: '90px' }}>
                    <span
                      className={`inline-block w-[80px] px-2 py-0.5 rounded text-[10px] uppercase tracking-[0.04em] font-medium text-center ${
                        factor.weight === 'critical'
                          ? 'bg-tb-primary/10 text-tb-primary'
                          : 'bg-tb-dark/5 text-tb-dark/50'
                      }`}
                    >
                      {factor.weight}
                    </span>
                  </td>
                  <td className="py-3 px-2 font-mono text-[12px] text-tb-dark/40 text-right whitespace-nowrap" style={{ width: '50px' }}>
                    {factor.percentage}
                  </td>
                  <td className="py-3 px-4 text-[13px] text-tb-dark/80">
                    {factor.text}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-tb-card-inner px-6 py-5 border-t border-tb-border">
          <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50 mb-4">
            Full Analysis
          </span>
          <p className="text-[14px] text-tb-dark/50 leading-relaxed italic">
            The current military posture closely mirrors the configuration observed before the June 2025 strikes. Combined with Iran&apos;s degraded nuclear capabilities and explicit deadline language from the administration, Q assesses near-term strike probability higher than the market is pricing...
          </p>
        </div>
      </div>

      <div className="w-full max-w-[320px] max-lg:max-w-none">
        <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/40 mb-4">
          What&apos;s inside every forecast
        </span>
        <div className="flex flex-col gap-2">
          {FORECAST_ITEMS.map((item) => (
            <LegendCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function InsideAForecast() {
  return (
    <section className="section-shell bg-tb-cream rounded-tb-card py-16 sm:py-20 lg:py-tb-section-y">
      <div className="max-w-content mx-auto">
        <span className="block uppercase mb-3 font-mono text-tb-primary text-[11px] tracking-[0.08em]">
          Q in Action
        </span>

        <h2 className="font-headline font-bold text-tb-dark text-[24px] lg:text-[36px] leading-[0.95] tracking-[-0.02em] mb-2 uppercase">
          SEE INSIDE A Q FORECAST
        </h2>

        <p className="text-[15px] leading-[1.7] text-tb-dark/60 max-w-[560px] mb-8">
          Each forecast includes a directional call, the key factors driving the view, and the full analysis reasoning behind.
        </p>

        <InsideAForecastContent />
      </div>
    </section>
  )
}
