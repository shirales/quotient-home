import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: 'Team',
  description:
    'Meet the Quotient team building forecasting systems, market intelligence infrastructure, and the platform around Q.',
  path: '/team',
})

const team = [
  {
    initials: 'JO',
    name: 'Jordan Olmstead',
    linkedin: 'https://www.linkedin.com/in/jordan-o-5b5845128',
    title: 'CEO & Co-Founder',
    function: 'Leads research, forecasting systems, and product direction.',
    bio: "Background in quantitative research and prediction market design. Built Q's forecasting pipeline and analytical framework.",
    tag: 'INTELLIGENCE SYSTEMS',
  },
  {
    initials: 'CH',
    name: 'Cameron Hejazi',
    linkedin: 'https://www.linkedin.com/in/chejazi',
    title: 'CTO & Co-Founder',
    function: 'Leads engineering, platform, and API infrastructure.',
    bio: 'Background in crypto infrastructure and technical systems. Built the core platform, agent systems, and developer tooling.',
    tag: 'TECHNICAL SYSTEMS \u00B7 CRYPTO INFRASTRUCTURE',
  },
  {
    initials: 'MF',
    name: 'Matthew Ferrick',
    linkedin: 'https://www.linkedin.com/in/matthew-ferrick-b818a5161',
    title: 'COO & Co-Founder',
    function: 'Leads operations, partnerships, and business development.',
    bio: 'Background in strategy, commercial operations, and enterprise relationship building. Drives execution and partnership growth.',
    tag: 'OPERATIONS \u00B7 PARTNERSHIPS',
  },
  {
    initials: 'SS',
    name: 'Shira Stember',
    linkedin: 'https://www.linkedin.com/in/shirastember/',
    title: 'CMO & Co-Founder',
    function: 'Leads brand, marketing, and go-to-market strategy.',
    bio: "Background in brand strategy, product positioning, and growth. Shapes Quotient's narrative, market presence, and launch strategy.",
    tag: 'BRAND \u00B7 GO-TO-MARKET',
  },
]

export default function TeamPage() {
  return (
    <div className='min-h-screen bg-tb-page pt-[44px]'>
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
                <h1 className="font-headline font-bold text-[32px] lg:text-[48px] leading-[0.95] text-white tracking-[-0.03em] mb-4 max-w-[640px]">
                  The team behind Quotient.
                </h1>
                <p className="text-[15px] leading-relaxed text-white/70 max-w-[560px]">
                  Market intelligence, crypto infrastructure, enterprise partnerships, and brand. All pointed at the same problem.
                </p>
              </div>
            </div>
          </section>

          {/* Leadership - Light section */}
          <section className="section-shell bg-tb-page rounded-tb-card py-16 sm:py-20 lg:py-tb-section-y">
            <div className="max-w-content mx-auto">
              <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
                {team.map((member) => (
                  <a
                    key={member.initials}
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tb-primary/50 focus-visible:ring-offset-2"
                  >
                    <div
                      className="bg-white rounded-[10px] p-6 h-full border border-transparent transition-all duration-200 group-hover:border-tb-primary group-hover:-translate-y-0.5 group-hover:shadow-[0_8px_24px_rgba(238,111,75,0.12)]"
                      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-tb-cream flex items-center justify-center">
                          <span className="font-mono text-[18px] font-semibold text-tb-dark/60">
                            {member.initials}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/40 inline-flex items-center gap-1.5">
                          LinkedIn
                          <span className="transition-transform group-hover:translate-x-[3px]">&rarr;</span>
                        </span>
                      </div>

                      <h3 className="text-[18px] font-semibold text-tb-dark mb-1">
                        {member.name}
                      </h3>

                      <div className="text-[14px] text-tb-primary mb-3">
                        {member.title}
                      </div>

                      <p className="text-[14px] italic text-tb-dark/60 mb-4">
                        {member.function}
                      </p>

                      <p className="text-[14px] leading-relaxed text-tb-dark/70 mb-4">
                        {member.bio}
                      </p>

                      <div className="inline-block px-3 py-1.5 bg-tb-cream rounded-[4px]">
                        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-tb-dark/50">
                          {member.tag}
                        </span>
                      </div>
                    </div>
                  </a>
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
