'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { Locale, Dictionary } from '@/i18n'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

interface Props {
  locale: Locale
  dict: Dictionary
}

export default function Header({ locale, dict }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [shouldReduce, setShouldReduce] = useState(false)
  const { nav } = dict

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    setShouldReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: `#about`, label: nav.about },
    { href: `#videos`, label: nav.videos },
    { href: `#series`, label: nav.series },
    { href: `#links`, label: nav.links },
  ]

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(6,2,15,0.88)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : undefined,
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : undefined,
        borderBottom: scrolled ? '1px solid rgba(247,37,133,0.18)' : undefined,
      }}
    >
      <div className="section-gutter max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="font-bold text-lg text-text-primary hover:text-crimson-light transition-colors duration-150 tracking-tight"
        >
          竜義9090
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-text-primary transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Language switcher + mobile menu */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1.5 rounded text-text-muted hover:text-text-primary transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className="block w-5 h-px bg-current transition-transform duration-200 origin-center"
              style={{ transform: menuOpen ? 'rotate(45deg) translate(0, 5px)' : undefined }}
            />
            <span
              className="block w-5 h-px bg-current transition-opacity duration-200"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-px bg-current transition-transform duration-200 origin-center"
              style={{ transform: menuOpen ? 'rotate(-45deg) translate(0, -5px)' : undefined }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(6,2,15,0.95)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(247,37,133,0.18)',
            }}
          >
            <nav className="section-gutter py-4 flex flex-col gap-4" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
