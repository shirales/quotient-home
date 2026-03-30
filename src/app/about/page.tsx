import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContributorLeaderboard from '@/components/ContributorLeaderboard'
import WhatPowersQ from '@/components/WhatPowersQ'
import { PerformanceBenchmarks, PerformanceReview } from '@/components/Performance'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: 'About',
  description:
    'Learn how Quotient combines structured AI reasoning, broad source coverage, and contributor signal to improve market forecasts.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className='min-h-screen bg-tb-page pt-[44px]'>
      <Nav />

      <main id="main-content" className="flex flex-col p-tb-gap pt-0 w-full">
        <div className="flex flex-col gap-tb-gap">
          <AboutHero />
          <WhatPowersQ variant="about" />
          <TrackRecord />
          <BuildingOn />
          <TrackRecordReview />
          <ImprovementLoop />
          <ContributorLeaderboard />
          <WhyThisTeam />
          <Footer />
        </div>
      </main>
    </div>
  )
}

function AboutHero() {
  return (
    <section className="section-shell bg-tb-dark rounded-tb-card py-16 lg:py-24 min-h-[220px] sm:min-h-[280px] lg:min-h-[340px] flex items-center">
      <div className="max-w-content mx-auto w-full">
        {/* Content with 3px orange left border */}
        <div className="border-l-[3px] border-tb-primary pl-5">
          <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-tb-primary mb-3">
            About Quotient
          </span>
          <h1 className="font-headline font-bold text-[32px] lg:text-[48px] leading-[0.95] text-white uppercase tracking-[-0.02em] mb-4 max-w-[640px]">
            Turns market noise<br />
            into actionable<br />
            trading strategies.
          </h1>
          <p className="text-[15px] leading-relaxed text-white/70 max-w-[560px]">
            We combine broad source coverage, structured AI reasoning, and human contributor signal to surface where consensus breaks down.
          </p>
        </div>
      </div>
    </section>
  )
}

function TrackRecord() {
  return (
    <section className='section-shell bg-tb-cream rounded-tb-card py-16 sm:py-20 lg:py-tb-section-y'>
      <div className="max-w-content mx-auto">
        <span className="block text-[11px] uppercase mb-3 font-mono tracking-[0.08em] text-tb-primary">
          Performance
        </span>
        <h2 className='font-headline font-bold uppercase text-tb-dark text-[24px] lg:text-[36px] leading-[0.95] tracking-[-0.02em] mb-2'>
          Q&apos;s performance, verified.
        </h2>
        <p className="text-[15px] leading-[1.7] max-w-[560px] mb-8 text-tb-dark/60">
          Benchmarked against frontier models and tested against real market outcomes. Q performs at a level worth paying attention to.
        </p>
        <PerformanceBenchmarks />
      </div>
    </section>
  )
}

function TrackRecordReview() {
  return (
    <section className='section-shell bg-tb-cream rounded-tb-card py-16 sm:py-20 lg:py-tb-section-y'>
      <div className="max-w-content mx-auto">
        <span className="block text-[11px] uppercase mb-3 font-mono tracking-[0.08em] text-tb-primary">
          The track record
        </span>
        <h2 className='font-headline font-bold uppercase text-tb-dark text-[24px] lg:text-[36px] leading-[0.95] tracking-[-0.02em] mb-2'>
          Where Q called it and where it learned.
        </h2>
        <p className="text-[15px] leading-[1.7] max-w-[560px] mb-8 text-tb-dark/60">
          Every resolved market is reviewed. Wins and misses are published so you can evaluate conviction.
        </p>
        <PerformanceReview />
      </div>
    </section>
  )
}

function BuildingOn() {
  const partners = [
    { name: 'Polymarket', src: '/logos/Polymarket.png' },
    { name: 'Bankr', src: '/logos/Bankr.png' },
    { name: 'World', src: '/logos/World.png' },
    { name: 'Base', src: '/logos/Base.png' },
  ]

  return (
    <section className='section-shell bg-tb-primary rounded-tb-card py-14 sm:py-16'>
      <div className="max-w-content mx-auto">
        <span className="block text-[11px] uppercase mb-3 font-mono tracking-[0.08em] text-white/70 text-center">
          Building on
        </span>
        <h2 className='font-headline font-bold uppercase text-white text-[24px] lg:text-[36px] leading-[0.95] tracking-[-0.02em] mb-8 text-center'>
          Where Quotient plugs in.
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="rounded-[10px] bg-white/[0.10] border border-white/20 h-[80px] sm:h-[112px] flex items-center justify-center px-4 sm:px-6 backdrop-blur-sm"
            >
              <img
                src={partner.src}
                alt={partner.name}
                className="max-h-10 sm:max-h-16 w-auto brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ImprovementLoop() {
  const steps = [
    {
      num: 1,
      title: 'Forecast',
      desc: 'Q analyzes markets, sources context, and assigns probabilities with structured confidence.',
    },
    {
      num: 2,
      title: 'Review',
      desc: 'Contributors surface context, flag errors, and add signal that Q may have missed.',
    },
    {
      num: 3,
      title: 'Learn',
      desc: 'Every resolved market feeds back into the system. Q gets sharper with each outcome.',
    },
  ]

  return (
    <section className='section-shell bg-tb-cream rounded-tb-card py-16 sm:py-20 lg:py-tb-section-y'>
      <div className="max-w-content mx-auto">
        <span className="block text-[11px] uppercase mb-3 font-mono tracking-[0.08em] text-tb-primary">
          The Improvement Loop
        </span>
        <h2 className='font-headline font-bold uppercase text-tb-dark text-[24px] lg:text-[36px] leading-[0.95] tracking-[-0.02em] mb-2'>
          How Quotient Gets Better
        </h2>
        <p className="text-[15px] leading-[1.7] max-w-[560px] mb-8 text-tb-dark/60">
          Quotient improves through a loop of forecasting, review, and feedback. Each cycle tightens the signal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-0 items-stretch">
          {steps.map((step, i) => (
            <>
              <div key={step.num} className='bg-white rounded-[10px] p-6 h-full' style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-[4px] bg-tb-primary flex items-center justify-center">
                    <span className="text-white text-[13px] font-semibold">{step.num}</span>
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold mb-1 text-tb-dark">
                      {step.title}
                    </div>
                    <div className="text-[13px] leading-relaxed text-tb-dark/60">
                      {step.desc}
                    </div>
                  </div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div key={`arrow-${i}`} className="hidden md:flex items-center justify-center px-3">
                  <span className="text-tb-dark/30 text-[18px]">&rarr;</span>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyThisTeam() {
  return (
    <section className='section-shell bg-tb-cream rounded-tb-card py-16 sm:py-20 lg:py-tb-section-y'>
      <div className="max-w-content mx-auto">
        <span className="block text-[11px] uppercase mb-3 font-mono tracking-[0.08em] text-tb-primary">
          Why This Team
        </span>
        <h2 className='font-headline font-bold uppercase text-tb-dark text-[24px] lg:text-[36px] leading-[0.95] tracking-[-0.02em] mb-6'>
          Built by People Who Understand Intelligence, Infrastructure, and Markets
        </h2>
        <Link
          href="/team"
          className="inline-flex items-center gap-2 text-[13px] font-mono uppercase tracking-[0.08em] px-7 py-3 bg-tb-primary text-white rounded-tb-card hover:bg-tb-cta-hover transition-colors group"
        >
          Meet the team
          <span className="transition-transform group-hover:translate-x-[3px]">&rarr;</span>
        </Link>
      </div>
    </section>
  )
}
