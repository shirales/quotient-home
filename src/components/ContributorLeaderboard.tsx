'use client'

import Link from 'next/link'

// Pulsing dot for live label
function PulseDot() {
  return (
    <span className="relative inline-flex mr-2">
      <span className="w-2 h-2 bg-green-500 rounded-full" />
      <span className="absolute w-2 h-2 bg-green-500 rounded-full motion-safe:animate-ping opacity-75" />
    </span>
  )
}

// Avatar with gradient background
function Avatar({ name }: { name: string }) {
  // Generate consistent color based on name
  const colors = [
    'from-orange-400 to-red-500',
    'from-blue-400 to-indigo-500',
    'from-green-400 to-teal-500',
    'from-purple-400 to-pink-500',
    'from-yellow-400 to-orange-500',
  ]
  const colorIndex = name.charCodeAt(0) % colors.length

  return (
    <div
      className={`w-7 h-7 rounded-full bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center text-white text-[11px] font-semibold`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

// Real leaderboard data from Signal
const LEADERBOARD_DATA = [
  { rank: 1, contributor: 'ruminations', score: 77.8 },
  { rank: 2, contributor: 'kan1902', score: 66.8 },
  { rank: 3, contributor: 'yiky', score: 63.0 },
  { rank: 4, contributor: 'monteluna', score: 63.0 },
  { rank: 5, contributor: 'shira', score: 56.1 },
]

export default function ContributorLeaderboard() {
  return (
    <section className="section-shell bg-tb-cream rounded-tb-card py-16 sm:py-20 lg:py-tb-section-y">
      <div className="max-w-content mx-auto">
        {/* Eyebrow */}
        <span className="block uppercase mb-3 font-mono text-tb-primary text-[11px] tracking-[0.08em]">
          Contributor Leaderboard
        </span>

        {/* Headline */}
        <h2 className="font-headline font-bold text-tb-dark text-[24px] lg:text-[36px] leading-[0.95] tracking-[-0.02em] mb-2 uppercase">
          The People Sharpening Q
        </h2>

        {/* Subhead */}
        <p className="text-[15px] leading-[1.7] text-tb-dark/60 max-w-[560px] mb-4">
          Contributors review forecasts, surface context, and compete for monthly rewards. Here&apos;s who&apos;s leading.
        </p>

        {/* Block label with pulse dot */}
        <div className="flex items-center text-[13px] font-semibold text-tb-dark mb-3">
          <PulseDot />
          Top contributors
        </div>

        {/* Leaderboard table */}
        <div
          className="rounded-[10px] bg-white overflow-hidden max-w-[720px]"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
        >
          {/* Table header */}
          <div className="flex px-4 py-2.5 bg-tb-card-inner border-b border-tb-dark/10">
            <div className="w-[52px] sm:w-[60px] font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50">
              Rank
            </div>
            <div className="flex-1 font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50">
              Contributor
            </div>
            <div className="w-[64px] sm:w-[80px] text-right font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50">
              Score
            </div>
          </div>

          {/* Table rows */}
          {LEADERBOARD_DATA.map((row, i) => (
            <div
              key={row.contributor}
              className={`flex items-center px-4 py-3 ${i < LEADERBOARD_DATA.length - 1 ? 'border-b border-tb-dark/10' : ''} ${row.rank === 1 ? 'bg-tb-primary/[0.03]' : ''}`}
            >
              <div className={`w-[52px] sm:w-[60px] font-mono text-[14px] ${row.rank === 1 ? 'font-bold text-tb-primary' : 'text-tb-dark/40'}`}>
                #{row.rank}
              </div>
              <div className="flex-1 flex items-center gap-2">
                <Avatar name={row.contributor} />
                <span className={`text-[14px] ${row.rank === 1 ? 'font-semibold text-tb-dark' : 'text-tb-dark/80'}`}>
                  {row.contributor}
                </span>
              </div>
              <div className={`w-[64px] sm:w-[80px] text-right font-mono text-[14px] ${row.rank === 1 ? 'font-bold text-tb-dark' : 'text-tb-dark/60'}`}>
                {row.score.toFixed(1)}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="https://signal.quotient.social"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.08em] text-tb-primary hover:text-tb-cta-hover transition-colors mt-4 group"
        >
          View full leaderboard
          <span className="transition-transform group-hover:translate-x-[3px]">&rarr;</span>
        </Link>

        {/* Footnote */}
        <p className="text-[11px] text-tb-dark/40 mt-3 max-w-[560px]">
          Scores reflect contributor accuracy across resolved forecasts. $250 in monthly rewards for the top 25. Leaderboard updates live via the Signal app.
        </p>
      </div>
    </section>
  )
}
