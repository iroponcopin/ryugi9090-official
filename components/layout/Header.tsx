'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { Locale, Dictionary } from '@/i18n'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import VideoMenu, { buildVideoMenuItems } from '@/components/layout/VideoMenu'

interface Props {
  locale: Locale
  dict: Dictionary
}

const EASE = [0.16, 1, 0.3, 1] as const

export default function Header({ locale, dict }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [shouldReduce, setShouldReduce] = useState(false)
  const { nav } = dict

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    setShouldReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Simple links shown on either side of the Video mega menu
  const leadLinks = [
    { href: '#home', label: nav.home },
    { href: '#about', label: nav.about },
  ]
  const tailLinks = [
    { href: '#upcoming', label: nav.future },
    { href: '#links', label: nav.links },
  ]

  const videoItems = buildVideoMenuItems(locale, dict)

  const closeMobile = () => {
    setMenuOpen(false)
    setVideoOpen(false)
  }

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,253,248,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : undefined,
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : undefined,
        borderBottom: scrolled ? '1px solid rgba(214,168,79,0.28)' : undefined,
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
          {leadLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-text-primary transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}

          <VideoMenu locale={locale} dict={dict} shouldReduce={shouldReduce} />

          {tailLinks.map((link) => (
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
            transition={{ duration: 0.25, ease: EASE }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(255,253,248,0.97)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(214,168,79,0.28)',
            }}
          >
            <nav className="section-gutter py-4 flex flex-col gap-3" aria-label="Mobile navigation">
              <a href="#home" onClick={closeMobile} className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 py-1">
                {nav.home}
              </a>
              <a href="#about" onClick={closeMobile} className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 py-1">
                {nav.about}
              </a>

              {/* Video accordion */}
              <button
                type="button"
                onClick={() => setVideoOpen((v) => !v)}
                aria-expanded={videoOpen}
                className="flex items-center justify-between text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 py-1"
              >
                {nav.videos}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4 transition-transform duration-200"
                  style={{ transform: videoOpen ? 'rotate(180deg)' : undefined }}
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {videoOpen && (
                  <motion.div
                    initial={shouldReduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                    animate={shouldReduce ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
                    exit={shouldReduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="overflow-hidden"
                    suppressHydrationWarning
                  >
                    <div className="pl-3 flex flex-col gap-2 border-l" style={{ borderColor: 'rgba(214,168,79,0.30)' }}>
                      {videoItems.map((item) => (
                        <a
                          key={item.key}
                          href={item.href}
                          onClick={closeMobile}
                          {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="flex items-center gap-2 text-sm py-1 transition-colors duration-150"
                          style={{ color: item.accent ? 'var(--color-crimson-light)' : 'var(--color-text-secondary)' }}
                        >
                          {item.name}
                          {item.tag && (
                            <span
                              className="text-[0.625rem] font-semibold px-1.5 py-0.5 rounded-full leading-none"
                              style={{
                                background: 'rgba(242,154,63,0.14)',
                                color: '#b9791e',
                                border: '1px solid rgba(242,154,63,0.30)',
                              }}
                            >
                              {item.tag}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <a href="#upcoming" onClick={closeMobile} className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 py-1">
                {nav.future}
              </a>
              <a href="#links" onClick={closeMobile} className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 py-1">
                {nav.links}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
