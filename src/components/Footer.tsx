'use client'

import Link from 'next/link'
import { CONTACT_HREF } from '@/lib/links'
import HeroAnimation from './HeroAnimation'

function FooterLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase mb-1 tracking-[0.08em] text-white/50">
      {children}
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith('mailto:')) {
    return (
      <a href={href} className="text-[12px] leading-none transition-colors text-white/60 hover:text-tb-primary">
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className="text-[12px] leading-none transition-colors text-white/60 hover:text-tb-primary">
      {children}
    </Link>
  )
}

function SubstackSubscribe() {
  return (
    <a
      href="https://quotient.substack.com/subscribe"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] px-4 py-2 whitespace-nowrap transition-colors bg-transparent border border-white/20 text-white/70 hover:border-white/50 hover:text-white rounded-tb-card group"
    >
      Subscribe on Substack
      <span className="transition-transform group-hover:translate-x-[3px]">&rarr;</span>
    </a>
  )
}

export default function Footer() {
  return (
    <footer className='section-shell bg-tb-dark rounded-tb-card pt-12 sm:pt-14 pb-10 relative overflow-hidden'>
      {/* Particle animation background - forms the divider line */}
      <div className="absolute inset-0 pointer-events-none">
        <HeroAnimation footerMode />
      </div>
      <div className="max-w-content mx-auto relative z-10">
        {/* Main grid with generous gap between brand block and nav columns */}
        <div className="grid md:grid-cols-[200px_1fr] gap-10 lg:gap-24 pb-10 max-md:pb-8 mb-8">
          {/* Left: Brand block */}
          <div>
            {/* White SVG wordmark - preserves negative space in Q */}
            <img
              src="/logos/quotient-wordmark-white.svg"
              alt="Quotient"
              className="h-5 w-auto mb-2"
            />
            <div className="font-mono text-white/60 text-[12px] uppercase tracking-[0.04em] leading-relaxed mb-5">
              Superforecasting for<br />prediction market traders.
            </div>
            <SubstackSubscribe />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10 ml-auto max-md:ml-0">
            <div className="flex flex-col gap-3">
              <FooterLabel>Product</FooterLabel>
              <FooterLink href="https://app.quotient.social">App</FooterLink>
            </div>

            <div className="flex flex-col gap-3">
              <FooterLabel>Developers</FooterLabel>
              <FooterLink href="/build-with-q">Build with Q</FooterLink>
              <FooterLink href="https://dev.quotient.social/docs#tag/markets/GET/api/v1/markets">API Docs</FooterLink>
              <FooterLink href="https://dev.quotient.social/dashboard">Get API Key</FooterLink>
              <FooterLink href="https://skills.bankr.bot/skills/quotient">Bankr Skill</FooterLink>
            </div>

            <div className="flex flex-col gap-3">
              <FooterLabel>Case Studies</FooterLabel>
              <FooterLink href="/case-studies/geopolitical">Geopolitical</FooterLink>
            </div>

            <div className="flex flex-col gap-3">
              <FooterLabel>Contributors</FooterLabel>
              <FooterLink href="https://signal.quotient.social">Signal</FooterLink>
              <FooterLink href="https://farcaster.xyz/miniapps/i0_1abYbjySF/signal-by-quotient">Farcaster</FooterLink>
              <FooterLink href="https://world.org/mini-app?app_id=app_fcc649404ebe858f0e95cf53a800ec3e">World App</FooterLink>
            </div>

            <div className="flex flex-col gap-3">
              <FooterLabel>Company</FooterLabel>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/team">Team</FooterLink>
              <FooterLink href={CONTACT_HREF}>Contact</FooterLink>
            </div>

            <div className="flex flex-col gap-3">
              <FooterLabel>Social</FooterLabel>
              <FooterLink href="https://x.com/QuotientHQ">X</FooterLink>
              <FooterLink href="https://farcaster.xyz/quotient">Farcaster</FooterLink>
              <FooterLink href="https://quotient.substack.com/">Substack</FooterLink>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10">
          <span className="font-mono text-[11px] text-white/40">&copy; 2026 Quotient</span>
        </div>
      </div>
    </footer>
  )
}
