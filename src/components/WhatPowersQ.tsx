// SVG Icons
function GlobeIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function NetworkIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2"/>
      <circle cx="18" cy="6" r="2"/>
      <circle cx="12" cy="18" r="2"/>
      <line x1="8" y1="6" x2="16" y2="6"/>
      <line x1="7" y1="8" x2="11" y2="16"/>
      <line x1="17" y1="8" x2="13" y2="16"/>
    </svg>
  )
}

function PeopleIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

type WhatPowersQVariant = 'home' | 'about'

const HOME_CARDS = [
  {
    icon: GlobeIcon,
    title: '1,600+ global sources',
    desc: 'News, data, and event signals tracked across markets and geographies.',
  },
  {
    icon: NetworkIcon,
    title: 'AI superforecasting',
    desc: "A team of agents weighs evidence, identifies key factors, and turns market uncertainty into a reasoned view.",
  },
  {
    icon: PeopleIcon,
    title: '900+ human contributors',
    desc: "Contributors review forecasts, surface relevant context, and help sharpen Q's reasoning.",
  },
]

const ABOUT_CARDS = [
  {
    icon: GlobeIcon,
    title: '1,000+ global sources',
    desc: 'News, data, and event signals tracked across markets and geographies.',
  },
  {
    icon: NetworkIcon,
    title: 'AI superforecasting',
    desc: "A team of agents weighs evidence, identifies key factors, and translates uncertainty into a reasoned view.",
  },
  {
    icon: PeopleIcon,
    title: '900+ human contributors',
    desc: "Contributors review forecasts, surface context, and help sharpen Q's reasoning.",
  },
]

interface WhatPowersQProps {
  variant?: WhatPowersQVariant
}

export default function WhatPowersQ({ variant = 'home' }: WhatPowersQProps) {
  const isAbout = variant === 'about'
  const cards = isAbout ? ABOUT_CARDS : HOME_CARDS

  return (
    <section className="section-shell bg-tb-cream rounded-tb-card py-16 sm:py-20 lg:py-tb-section-y">
      <div className="max-w-content mx-auto">
        <span className="block uppercase mb-3 font-mono text-tb-primary text-[11px] tracking-[0.08em]">
          {isAbout ? 'The system' : 'What Powers Q'}
        </span>

        <h2 className="font-headline font-bold text-tb-dark text-[24px] lg:text-[36px] leading-[0.95] tracking-[-0.02em] mb-3 uppercase">
          Built to find what others miss.
        </h2>

        <p className="text-[15px] leading-relaxed text-tb-dark/70 mb-8 max-w-[560px]">
          {isAbout
            ? 'Q groups related markets into narratives organized around a shared thesis. You get context, not just a probability.'
            : 'Three inputs work together so Q sees further, reasons better, and gets sharper over time.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[8px]">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-[10px] p-6 sm:p-7 flex flex-col bg-white"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-[6px] bg-tb-primary/10 flex items-center justify-center mb-4 text-tb-primary">
                <card.icon />
              </div>
              <h3 className="text-[16px] font-semibold mb-3 text-tb-dark">
                {card.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-tb-dark/60">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
