'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { APP_HREF } from '@/lib/links'

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()

  let isActive = pathname === href

  if (pathname?.startsWith(href + '/')) {
    isActive = true
  }

  return (
    <Link
      href={href}
      className={`relative flex items-center px-4 font-mono text-[13px] uppercase tracking-[0.08em] transition-colors ${
        isActive
          ? 'text-tb-dark'
          : 'text-tb-dark/70 hover:text-tb-dark'
      }`}
    >
      {children}
      {/* Orange underline indicator */}
      {isActive && (
        <span
          className="absolute bottom-[6px] left-4 right-4 h-[3px] bg-tb-primary rounded-full"
        />
      )}
    </Link>
  )
}

function CaseStudiesDropdown() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const menuId = 'case-studies-menu'
  const isActive = pathname?.startsWith('/case-studies')

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      ref={dropdownRef}
      className="relative flex items-stretch"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`relative flex items-center px-4 font-mono text-[13px] uppercase tracking-[0.08em] transition-colors ${
          isActive
            ? 'text-tb-dark'
            : 'text-tb-dark/70 hover:text-tb-dark'
        }`}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="menu"
      >
        Case Studies
        <svg
          className={`ml-1 w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        {isActive && (
          <span className="absolute bottom-[6px] left-4 right-4 h-[3px] bg-tb-primary rounded-full" />
        )}
      </button>

      {isOpen && (
        <div
          id={menuId}
          role="menu"
          className="absolute top-full left-0 mt-0 bg-tb-page border border-tb-border/30 rounded-tb-card shadow-sm min-w-[180px] overflow-hidden"
        >
          <Link
            href="/case-studies/geopolitical"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-2 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors ${
              pathname === '/case-studies/geopolitical'
                ? 'text-tb-primary bg-tb-primary/5 border-l-[3px] border-tb-primary pl-[13px]'
                : 'text-tb-dark/70 hover:text-tb-dark hover:bg-tb-dark/5'
            }`}
          >
            Geopolitical
          </Link>
        </div>
      )}
    </div>
  )
}

function MobileNavLink({ href, onClick, children, indent = false }: { href: string; onClick: () => void; children: React.ReactNode; indent?: boolean }) {
  const pathname = usePathname()

  let isActive = pathname === href
  if (pathname?.startsWith(href + '/')) {
    isActive = true
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative py-3 font-mono text-[13px] uppercase tracking-[0.08em] transition-colors ${
        indent ? 'pl-10 pr-6' : 'px-6'
      } ${
        isActive
          ? 'text-tb-dark bg-tb-dark/5'
          : 'text-tb-dark/70 hover:text-tb-dark hover:bg-tb-dark/5'
      }`}
    >
      {/* Orange left bar indicator for mobile */}
      {isActive && (
        <span
          className="absolute left-0 top-2 bottom-2 w-[2px] bg-tb-primary"
        />
      )}
      {children}
    </Link>
  )
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileMenuId = 'primary-mobile-menu'

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-tb-page h-[44px] flex items-stretch px-4 border-b border-tb-border/30">
        <Link href="/" className="flex items-center">
          <img
            src="/logos/quotient-wordmark.svg"
            alt="Quotient"
            className="h-5 w-auto"
          />
        </Link>
        <div className="flex-1" />
        {/* Desktop nav */}
        <div className="hidden lg:flex items-stretch gap-0">
          <CaseStudiesDropdown />
          <NavLink href="/build-with-q">Build with Q</NavLink>
          <NavLink href="/about">About</NavLink>
          <Link
            href={APP_HREF}
            className="flex items-center px-7 bg-tb-primary text-white font-mono text-[13px] uppercase tracking-[0.08em] rounded-tb-card hover:bg-tb-cta-hover transition-colors"
          >
            App
          </Link>
        </div>
        {/* Mobile: hamburger + CTA */}
        <div className="lg:hidden flex items-stretch gap-0">
          <Link
            href={APP_HREF}
            className="flex items-center px-4 sm:px-5 bg-tb-primary text-white font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] rounded-tb-card"
          >
            App
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center w-11 h-11 text-tb-dark/70"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls={mobileMenuId}
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>
      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          id={mobileMenuId}
          className="fixed top-[44px] left-0 right-0 bottom-0 z-40 bg-tb-page border-t border-tb-border/30 overflow-y-auto lg:hidden"
        >
          <div className="flex flex-col py-3 pb-6">
            <span className="px-6 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-tb-dark/50">
              Case Studies
            </span>
            <MobileNavLink href="/case-studies/geopolitical" onClick={() => setMobileOpen(false)} indent>
              Geopolitical
            </MobileNavLink>
            <MobileNavLink href="/build-with-q" onClick={() => setMobileOpen(false)}>
              Build with Q
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setMobileOpen(false)}>
              About
            </MobileNavLink>
          </div>
        </div>
      )}
    </>
  )
}
