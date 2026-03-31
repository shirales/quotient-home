import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: 'The Team Behind Quotient',
  description:
    'Market intelligence, crypto infrastructure, enterprise partnerships, and brand. All pointed at the same problem.',
  path: '/team',
})

const capabilities = [
  'Intelligence',
  'Product & infrastructure',
  'Operations & growth',
  'Brand & go-to-market',
]

const team = [
  {
    initials: 'JO',
    name: 'Jordan Olmstead',
    title: 'CEO & Co-Founder',
    function: 'Leads research, forecasting systems, and product direction.',
    bio: "Background in quantitative research and prediction market design. Built Q's forecasting pipeline and analytical framework.",
    tag: 'INTELLIGENCE SYSTEMS',
  },
  {
    initials: 'CH',
    name: 'Cameron Hejazi',
    title: 'CTO & Co-Founder',
    function: 'Leads engineering, platform, and API infrastructure.',
    bio: 'Background in crypto infrastructure and technical systems. Built the core platform, agent systems, and developer tooling.',
    tag: 'TECHNICAL SYSTEMS \u00B7 CRYPTO INFRASTRUCTURE',
  },
  {
    initials: 'MF',
    name: 'Matthew Ferrick',
    title: 'COO & Co-Founder',
    function: 'Leads operations, partnerships, and business development.',
    bio: 'Background in strategy, commercial operations, and enterprise relationship building. Drives execution and partnership growth.',
    tag: 'OPERATIONS \u00B7 PARTNERSHIPS',
  },
  {
    initials: 'SS',
    name: 'Shira Stember',
    title: 'CMO & Co-Founder',
    function: 'Leads brand, marketing, and go-to-market strategy.',
    bio: "Background in brand strategy, product positioning, and growth. Shapes Quotient's narrative, market presence, and launch strategy.",
    tag: 'BRAND \u00B7 GO-TO-MARKET',
  },
]

// Breadcrumb — hardcoded string literals only, safe for rendering
const BREADCRUMB_SCHEMA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Quotient', item: 'https://www.quotient.social' },
    { '@type': 'ListItem', position: 2, name: 'Team', item: 'https://www.quotient.social/team' },
  ],
})

export default function TeamPage() {
  return (
    <div className='min-h-screen bg-tb-page pt-[44px]'>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: BREADCRUMB_SCHEMA }} />
      <Nav />

      <main id="main-content" className="flex flex-col p-tb-gap pt-0 w-full">
        <div className="flex flex-col gap-tb-gap">
          {/* Hero - Dark section */}
          <section className="section-shell bg-tb-dark rounded-tb-card py-16 lg:py-24 min-h-[220px] sm:min-h-[280px] lg:min-h-[340px] flex items-center">
            <div className="max-w-content mx-auto w-full">
              {/* Content with 3px orange left border */}
              <div className="border-l-[3px] border-tb-primary pl-5">
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-tb-primary mb-3">
                  Team
                </span>
                <h1 className="font-headline font-bold text-[32px] lg:text-[48px] leading-[0.95] text-white uppercase tracking-[-0.02em] mb-4 max-w-[640px]">
                  Built by People Who Understand Intelligence, Infrastructure, and Markets.
                </h1>
                <p className="text-[15px] leading-relaxed text-white/70 max-w-[560px]">
                  Intelligence background. Crypto infrastructure. Enterprise partnerships.
                </p>
              </div>
            </div>
          </section>

          {/* Capability Strip - Cream section */}
          <section className="section-shell bg-tb-cream rounded-tb-card py-12">
            <div className="max-w-content mx-auto">
              <div className="grid grid-cols-4 max-md:grid-cols-2 gap-4">
                {capabilities.map((cap) => (
                  <div
                    key={cap}
                    className="bg-white rounded-[10px] p-5 text-center"
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-tb-dark/70">
                      {cap}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Leadership - Light section */}
          <section className="section-shell bg-tb-page rounded-tb-card py-16 sm:py-20 lg:py-tb-section-y">
            <div className="max-w-content mx-auto">
              <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
                {team.map((member) => (
                  <div
                    key={member.initials}
                    className="bg-white rounded-[10px] p-6"
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
                  >
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full bg-tb-cream flex items-center justify-center mb-4">
                      <span className="font-mono text-[18px] font-semibold text-tb-dark/60">
                        {member.initials}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-[18px] font-semibold text-tb-dark mb-1">
                      {member.name}
                    </h3>

                    {/* Title */}
                    <div className="text-[14px] text-tb-primary mb-3">
                      {member.title}
                    </div>

                    {/* Function summary */}
                    <p className="text-[14px] italic text-tb-dark/60 mb-4">
                      {member.function}
                    </p>

                    {/* Bio */}
                    <p className="text-[14px] leading-relaxed text-tb-dark/70 mb-4">
                      {member.bio}
                    </p>

                    {/* Tag */}
                    <div className="inline-block px-3 py-1.5 bg-tb-cream rounded-[4px]">
                      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50">
                        {member.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA - Dark section */}
          <section className="section-shell bg-tb-dark rounded-tb-card py-16 lg:py-20">
            <div className="max-w-content mx-auto text-center">
              <h2 className="font-headline font-bold text-[24px] lg:text-[32px] leading-[0.95] text-white uppercase mb-6">
                Interested in working with us?
              </h2>
              <a
                href="mailto:jordan@quotient.social?subject=Interest%20in%20Working%20With%20Quotient"
                className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.08em] px-7 py-3 bg-tb-primary text-white rounded-tb-card hover:bg-tb-cta-hover transition-colors group"
              >
                Get in touch
                <span className="transition-transform group-hover:translate-x-[3px]">&rarr;</span>
              </a>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  )
}
