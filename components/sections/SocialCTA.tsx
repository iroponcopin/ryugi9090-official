'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Locale, Dictionary } from '@/i18n'
import MagneticButton from '@/components/ui/MagneticButton'
import { creator } from '@/data/config'

interface Props {
  locale: Locale
  dict: Dictionary
}

const EASE = [0.16, 1, 0.3, 1] as const

export default function SocialCTA({ locale, dict }: Props) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [shouldReduce, setShouldReduce] = useState(false)
  useEffect(() => {
    setShouldReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  const { social } = dict

  const fadeUp = (delay: number) => ({
    initial: shouldReduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, ease: EASE, delay },
  })

  return (
    <section
      id="links"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(247,37,133,0.10) 0%, transparent 70%), ' +
          'linear-gradient(180deg, #06020f 0%, #0a0120 100%)',
      }}
    >
      {/* Top divider glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(247,37,133,0.30), transparent)' }}
      />

      <div className="section-gutter max-w-4xl mx-auto text-center">
        <motion.span className="section-label block mb-4" {...fadeUp(0)} suppressHydrationWarning>
          {social.sectionTitle}
        </motion.span>

        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4"
          {...fadeUp(0.1)}
          suppressHydrationWarning
        >
          {locale === 'ja' ? '竜義9090を応援する' : 'Support 竜義9090'}
        </motion.h2>

        <motion.p className="text-text-secondary text-base max-w-md mx-auto mb-12" {...fadeUp(0.2)} suppressHydrationWarning>
          {locale === 'ja'
            ? 'チャンネル登録・フォローで最新動画を見逃さずに。'
            : 'Subscribe and follow to stay up to date with new videos.'}
        </motion.p>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12 max-w-xl mx-auto"
          {...fadeUp(0.3)}
          suppressHydrationWarning
        >
          {/* YouTube */}
          <div className="glass-card rounded-2xl p-6 text-left group">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(247,37,133,0.15)', border: '1px solid rgba(247,37,133,0.35)' }}
              >
                <svg viewBox="0 0 24 24" fill="var(--color-crimson-light)" className="w-5 h-5" aria-hidden="true">
                  <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.2 5 12 5 12 5s-4.2 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.2.8 1.6.2 6.8.2 6.8.2s4.2 0 7-.1c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM9.7 14.5V9.1l5.6 2.7-5.6 2.7z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-text-primary">{social.youtubeDesc}</span>
            </div>
            <a
              href={creator.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-crimson-light hover:text-crimson transition-colors duration-150"
            >
              {social.ctaYoutube} →
            </a>
          </div>

          {/* X */}
          <div className="glass-card rounded-2xl p-6 text-left group">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <svg viewBox="0 0 24 24" fill="var(--color-text-secondary)" className="w-4.5 h-4.5" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-text-primary">{social.xDesc}</span>
            </div>
            <a
              href={creator.xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-muted hover:text-text-secondary transition-colors duration-150"
            >
              @{creator.xHandle} →
            </a>
          </div>
        </motion.div>

        {/* Main CTAs */}
        <motion.div className="flex flex-wrap justify-center gap-4" {...fadeUp(0.4)} suppressHydrationWarning>
          <MagneticButton href={creator.youtubeUrl} variant="primary">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.2 5 12 5 12 5s-4.2 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.2.8 1.6.2 6.8.2 6.8.2s4.2 0 7-.1c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM9.7 14.5V9.1l5.6 2.7-5.6 2.7z" />
            </svg>
            {social.ctaYoutube}
          </MagneticButton>

          <MagneticButton href={creator.xUrl} variant="secondary">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
            {social.ctaX}
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
