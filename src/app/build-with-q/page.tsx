import Nav from '@/components/Nav'
import ApiCodeBlock from '@/components/ApiCodeBlock'
import Footer from '@/components/Footer'
import DotGridBackground from '@/components/DotGridBackground'
import { InsideAForecastContent } from '@/components/InsideAForecast'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: 'Build with Q — AI Forecasting API for Prediction Markets',
  description:
    "API access to Q's forecasts, signals, and mispriced markets. Built for humans and agents alike. Power trading platforms, dashboards, and autonomous agents including via the Bankr skill.",
  ogImage: '/og/og-build.png',
  path: '/build-with-q',
})

// FAQ schema — static, trusted content only (no user input)
const FAQ_SCHEMA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does the Quotient API return?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The Quotient API returns structured forecasts for prediction markets. Each market object includes the slug, question text, Q's probability estimate (quotient_odds), current market odds, a bottom-line summary (bluf), the spread between Q's forecast and market odds, spread direction, last updated timestamp, and signal count. Forecasts are organized into narratives \u2014 groups of related markets under a single thesis.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does authentication work for the Quotient API?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Quotient API supports two payment methods. The first is x402 microtransactions: make a request without a key, receive a 402 challenge in PAYMENT-REQUIRED, then settle and retry with PAYMENT-SIGNATURE. This is best for pay-as-you-go flows and agent-native payment rails. The second is prepaid API credits purchased via Stripe, used with the x-quotient-api-key header. Enterprise onboarding is available via sales@quotient.social. API keys are available at dev.quotient.social/dashboard.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the Quotient API endpoints and their pricing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Quotient API has five endpoints. GET /api/v1/markets returns the full market catalog with forecast coverage and pagination (5 credits / $0.005 per request). GET /api/v1/markets/lookup does batch lookup by slug or condition IDs (5 credits / $0.005). GET /api/v1/markets/mispriced returns markets where Q diverges most from market odds (100 credits / $0.10). GET /api/v1/markets/{slug}/intelligence returns a full intelligence briefing for a single market (250 credits / $0.25). GET /api/v1/markets/{slug}/signals returns paginated analyst signals for a market (25 credits / $0.025). Current pricing is also available programmatically at https://q-api.quotient.social/api/public/pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What can I build with the Quotient API?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The Quotient API is designed for trading platforms, research dashboards, and autonomous agents. It powers the Bankr skill \u2014 a plug-and-play integration that gives AI agents access to Q's forecasts, signals, and strategy across 1,200+ prediction markets on Polymarket. The API is agent-native with x402 micropayment support, making it compatible with self-sustaining AI agent workflows.",
      },
    },
    {
      '@type': 'Question',
      name: 'How is Quotient different from other prediction market platforms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Unlike other platforms, Quotient tells users what to trade and why. Q tracks 1,600+ sources for events that impact global markets, links them to Polymarket, assesses impact, and generates structured forecasts focused on world events markets. Q has an 85.1% win rate and a Brier score of 0.076, outperforming frontier AI models and human superforecaster benchmarks.',
      },
    },
  ],
})

// Breadcrumb schema — static, trusted content only (no user input)
const BREADCRUMB_SCHEMA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Quotient', item: 'https://www.quotient.social' },
    { '@type': 'ListItem', position: 2, name: 'Build with Q', item: 'https://www.quotient.social/build-with-q' },
  ],
})

export default function BuildWithQPage() {
  return (
    <div className='min-h-screen bg-tb-page pt-[44px]'>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />
      <Nav />

      <main id="main-content" className="flex flex-col p-tb-gap pt-0 w-full">
        <div className="flex flex-col gap-tb-gap">
          <BuildWithQHero />
          <BuildWithQIntro />
          <WhatsAvailable />
          <ForecastBreakdown />
          <CoreEndpoints />
          <BankrPartnership />
          <Footer />
        </div>
      </main>
    </div>
  )
}

function BuildWithQHero() {
  return (
    <section className="section-shell bg-tb-dark rounded-tb-card py-16 lg:py-24 min-h-[220px] sm:min-h-[280px] lg:min-h-[340px] flex items-center relative overflow-hidden">
      <DotGridBackground />
      <div className="max-w-content mx-auto w-full relative z-10">
        <div className="border-l-[3px] border-tb-primary pl-5">
          <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-tb-primary mb-3">
            Build with Q
          </span>
          <h1 className="font-headline font-bold text-[32px] lg:text-[48px] leading-[0.92] uppercase tracking-[-0.02em] mb-4 max-w-[640px]">
            <span className="text-white">Q&apos;s intelligence layer,</span>
            <br />
            <span className="text-white/70">via API</span>
          </h1>
          <p className="text-[15px] leading-[1.7] max-w-[480px] mb-6 text-white/70">
            Forecasts, signals, and trading strategies for apps, agents, and workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-start">
            <a
              href="https://dev.quotient.social/dashboard"
              className="inline-flex items-center gap-2 text-[13px] font-mono uppercase tracking-[0.08em] px-6 sm:px-7 py-3 bg-tb-primary text-white rounded-tb-card hover:bg-tb-cta-hover transition-colors group"
            >
              Get API Key
              <span className="transition-transform group-hover:translate-x-[3px]">&rarr;</span>
            </a>
            <a
              href="https://dev.quotient.social/docs#tag/markets/GET/api/v1/markets"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-mono uppercase tracking-[0.08em] px-6 sm:px-7 py-3 border border-white/30 text-white rounded-tb-card hover:border-white/60 transition-colors group"
            >
              Read the docs
              <span className="transition-transform group-hover:translate-x-[3px]">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ForecastBreakdown() {
  return (
    <section className="section-shell bg-tb-cream rounded-tb-card py-16 sm:py-20 lg:py-tb-section-y">
      <div className="max-w-content mx-auto">
        <span className="block uppercase mb-3 font-mono text-tb-primary text-[11px] tracking-[0.08em]">
          What you get back
        </span>
        <h2 className="font-headline font-bold text-tb-dark text-[24px] lg:text-[36px] leading-[0.95] tracking-[-0.02em] mb-2 uppercase">
          See inside a Q forecast.
        </h2>
        <p className="text-[15px] leading-[1.7] text-tb-dark/60 max-w-[560px] mb-8">
          Each forecast includes a directional call, the key factors driving the view, and the full analysis behind it.
        </p>
        <InsideAForecastContent />
      </div>
    </section>
  )
}

function BuildWithQIntro() {
  return (
    <section className="section-shell bg-tb-cream rounded-tb-card py-8 lg:py-12 relative overflow-hidden">
      <DotGridBackground />
      <div className="max-w-content mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-10 items-start">
          <div className="flex flex-col gap-3">
            <div className="mb-2">
              <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-tb-primary mb-3">
                Technical Details
              </span>
              <h2 className="font-headline font-bold uppercase text-tb-dark text-[24px] lg:text-[36px] leading-[0.95] tracking-[-0.02em] mb-3">
                The API at a glance
              </h2>
              <p className="text-[15px] text-tb-dark/70 leading-[1.7]">
                Five endpoints. Two payment methods. Structured intelligence ready to consume.
              </p>
            </div>

            <div className="bg-white rounded-[10px] p-5 border border-tb-dark/[0.06]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div className="flex items-start gap-3.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-[6px] bg-tb-primary/10 flex items-center justify-center text-tb-primary">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-tb-dark mb-1">Response format</div>
                  <div className="text-[13px] text-tb-dark/60 leading-[1.6]">
                    JSON. Every endpoint returns structured data with consistent schema.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[10px] p-5 border border-tb-dark/[0.06]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div className="flex items-start gap-3.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-[6px] bg-tb-primary/10 flex items-center justify-center text-tb-primary">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-tb-dark mb-1">Authentication</div>
                  <div className="text-[13px] text-tb-dark/60 leading-[1.6]">
                    API key via <span className="font-mono text-tb-primary">x-quotient-api-key</span> header, or x402 micropayments for keyless access.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[10px] p-5 border border-tb-dark/[0.06]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div className="flex items-start gap-3.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-[6px] bg-tb-primary/10 flex items-center justify-center text-tb-primary">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-tb-dark mb-1">Pricing</div>
                  <div className="text-[13px] text-tb-dark/60 leading-[1.6]">
                    Pay per request or subscribe for unlimited access.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <ApiCodeBlock />
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatsAvailable() {
  const topRow = [
    {
      label: 'MARKETS',
      title: 'Every active market, one call',
      desc: 'Live odds, Q\'s forecast, and spread. Filterable by category, platform, and resolution date.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
      ),
    },
    {
      label: 'SIGNALS',
      title: 'Q\'s signals, sourced and attributed',
      desc: 'Directional analyst takes for any market, paginated and timestamped.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
    },
  ]

  const bottomRow = [
    {
      label: 'INTELLIGENCE',
      title: 'Full briefing on any market',
      desc: 'Confidence score, key factors, and bottom line assessment in one response.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      ),
    },
    {
      label: 'MISPRICED',
      title: 'Where Q disagrees with the crowd',
      desc: "Markets ranked by spread between Q's forecast and market odds.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'STRATEGIES',
      title: 'Trading strategies, ready to execute',
      desc: 'Repeatable, signal-based strategies structured for agent workflows.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="section-shell bg-tb-cream rounded-tb-card py-16 sm:py-20 lg:py-tb-section-y">
      <div className="max-w-content mx-auto text-center">
        <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-tb-primary mb-3">
          What&apos;s Available
        </span>
        <h2 className="font-headline font-bold uppercase text-tb-dark text-[24px] lg:text-[36px] leading-[0.95] tracking-[-0.02em] mb-2">
          What Q delivers
        </h2>
        <p className="text-[14px] text-tb-dark/60 mb-7 max-w-[480px] mx-auto">
          Structured data designed for agents, dashboards, and trading workflows.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 max-w-[680px] mx-auto">
          {topRow.map((card) => (
            <FeatureCard key={card.label} {...card} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-[680px] mx-auto">
          {bottomRow.map((card) => (
            <FeatureCard key={card.label} {...card} />
          ))}
        </div>

        <p className="text-[12px] text-tb-dark/50 mt-6">
          Used for dashboards, scanners, alerts, research feeds, trading agents, and agent workflows.
        </p>
      </div>
    </section>
  )
}

function FeatureCard({ label, title, desc, icon }: { label: string; title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div
      className="bg-white rounded-[12px] p-6 text-left h-full flex flex-col transition-all hover:shadow-lg hover:-translate-y-0.5"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-[6px] bg-tb-primary/10 flex items-center justify-center mb-3 text-tb-primary">
        {icon}
      </div>
      <span className="block font-mono text-[10px] uppercase tracking-[0.06em] text-tb-primary mb-2">
        {label}
      </span>
      <h3 className="text-[16px] font-semibold text-tb-dark mb-1">{title}</h3>
      <p className="text-[13px] text-tb-dark/60 leading-[1.5] flex-1">{desc}</p>
    </div>
  )
}

function BankrPartnership() {
  const steps = [
    {
      num: 1,
      title: 'Add the Quotient skill',
      desc: "Your agent learns Q's markets, signals, and strategy.",
    },
    {
      num: 2,
      title: 'Run it on Bankr',
      desc: 'Built for agents that trade. Pay per call.',
    },
    {
      num: 3,
      title: 'Collect the returns',
      desc: 'Your agent trades. You keep the upside.',
    },
  ]

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[400px] rounded-tb-card overflow-hidden bg-tb-cream">
      <div className="bg-tb-cream section-shell py-12 sm:py-16 lg:py-tb-section-y flex flex-col justify-center">
        <div className="max-w-[510px] lg:ml-auto">
          <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-tb-primary mb-3">
            Featured Integration: Bankr
          </span>

          <h2 className="font-headline font-bold uppercase text-tb-dark text-[24px] lg:text-[36px] leading-[0.95] tracking-[-0.02em] mb-2">
            Trade with Q on Bankr
          </h2>

          <p className="text-[15px] italic text-tb-dark/70 mb-4">
            Give your agent a superforecaster.
          </p>

          <p className="text-[15px] text-tb-dark/70 leading-[1.7] mb-6 max-w-[480px]">
            Bankr is the financial infrastructure for self-sustaining AI agents. Add the Quotient skill and your agent gets Q&apos;s forecasts, signals, and strategy on every position.
          </p>

          <div className="space-y-4 mb-6">
            {steps.map((step) => (
              <div key={step.num} className="flex items-start gap-3">
                <div className="w-7 h-7 bg-tb-primary text-white rounded-[6px] flex items-center justify-center text-[14px] font-bold flex-shrink-0">
                  {step.num}
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-tb-dark mb-1">{step.title}</div>
                  <div className="text-[14px] text-tb-dark/60 leading-[1.5]">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="https://skills.bankr.bot/skills/quotient"
            target="_blank"
            rel="noopener"
            className="inline-block font-mono text-[13px] uppercase tracking-[0.08em] px-6 sm:px-7 py-3 bg-tb-primary text-white rounded-tb-card hover:bg-tb-cta-hover transition-colors"
          >
            Add the Quotient Skill
          </Link>
        </div>
      </div>

      <div className="bg-tb-dark rounded-[10px] flex flex-col section-shell mx-3 mb-3 mt-0 lg:m-4">
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <img
            src="/bankr-quotient-partnership.png"
            alt="Bankr × Quotient partnership"
            className="max-w-[300px] sm:max-w-[400px] w-full h-auto"
          />
        </div>

        <div className="border-t border-white/10" />

        <div className="py-4 sm:py-5 px-4 sm:px-6">
          <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-white/50 mb-2">
            About Bankr
          </span>
          <p className="text-[13px] text-white/60 leading-[1.6]">
            Bankr gives every AI agent a wallet, a token, and the tools to trade. Skills are plug-and-play modules that teach your agent new capabilities.
          </p>
        </div>
      </div>
    </section>
  )
}

function CoreEndpoints() {
  const endpoints = [
    { method: 'GET', path: '/api/v1/markets', desc: 'Market catalog with forecast coverage and pagination' },
    { method: 'GET', path: '/api/v1/markets/lookup', desc: 'Batch lookup by slug or condition IDs' },
    { method: 'GET', path: '/api/v1/markets/mispriced', desc: 'Markets where Q diverges most from market odds' },
    { method: 'GET', path: '/api/v1/markets/{slug}/intelligence', desc: 'Full intelligence briefing for a single market' },
    { method: 'GET', path: '/api/v1/markets/{slug}/signals', desc: 'Paginated analyst signals for a market' },
  ]

  return (
    <section className="section-shell bg-tb-cream rounded-tb-card py-16 sm:py-20 lg:py-tb-section-y relative overflow-hidden">
      <DotGridBackground />
      <div className="max-w-content mx-auto relative z-10">
        <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-tb-primary mb-3">
          Endpoints
        </span>
        <h2 className="font-headline font-bold uppercase text-tb-dark text-[24px] lg:text-[36px] leading-[0.95] tracking-[-0.02em] mb-2">
          Core endpoints
        </h2>
        <p className="text-[14px] text-tb-dark/60 mb-6 max-w-[480px]">
          Start with /api/v1/markets to orient, then pull signal detail per market.
        </p>

        <div className="max-w-[720px]">
          {endpoints.map((ep) => (
            <div
              key={ep.path}
              className="flex gap-3 py-4 border-b border-tb-dark/[0.08] last:border-b-0 items-start"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-tb-primary bg-tb-primary/[0.12] px-2 py-1 rounded flex-shrink-0 mt-0.5">
                {ep.method}
              </span>
              <div>
                <div className="font-mono text-[14px] sm:text-[15px] text-tb-primary font-medium break-all sm:break-words">{ep.path}</div>
                <div className="text-[13px] text-tb-dark/60 mt-0.5">{ep.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
