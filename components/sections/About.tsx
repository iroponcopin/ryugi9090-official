'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import type { Locale, Dictionary } from '@/i18n'
import { series as gameSeries } from '@/data/config'

interface Props {
  locale: Locale
  dict: Dictionary
}

const EASE = [0.16, 1, 0.3, 1] as const

export default function About({ locale, dict }: Props) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [shouldReduce, setShouldReduce] = useState(false)
  useEffect(() => {
    setShouldReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  const { about } = dict
  const isJa = locale === 'ja'

  const fadeUp = (delay: number) => ({
    initial: shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, ease: EASE, delay },
  })

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #fffdf8 0%, #faf3e7 50%, #fffdf8 100%)',
      }}
    >
      {/* Section glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(ellipse, rgba(242,154,63,0.12) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
      />

      <div className="section-gutter max-w-5xl mx-auto">
        <motion.span className="section-label block mb-4" {...fadeUp(0)} suppressHydrationWarning>
          {about.sectionTitle}
        </motion.span>

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-start">

          {/* Avatar */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col items-center md:items-start gap-4" suppressHydrationWarning>
            {/* Avatar */}
            <div
              className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0"
              style={{
                border: '1px solid rgba(214,168,79,0.50)',
                boxShadow: '0 8px 32px rgba(168,117,24,0.22)',
              }}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/about/avatar.png`}
                alt="竜義9090"
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
            </div>

            {/* Name under avatar */}
            <div className="text-center md:text-left">
              <p className="text-text-primary font-semibold">竜義9090</p>
              <p className="text-text-muted text-xs mt-0.5">Ryugi9090</p>
            </div>
          </motion.div>

          {/* Text content */}
          <div className="space-y-6">
            <motion.p
              className="text-text-secondary text-base sm:text-lg leading-relaxed"
              style={{ whiteSpace: 'pre-line' }}
              {...fadeUp(0.2)}
              suppressHydrationWarning
            >
              {about.bio}
            </motion.p>

            {/* Sparkle note — slightly elevated treatment */}
            <motion.div
              className="glass-card rounded-xl p-4 border-l-2 border-crimson/60"
              {...fadeUp(0.3)}
              suppressHydrationWarning
            >
              <p
                className="text-text-secondary text-sm leading-relaxed"
                style={{ whiteSpace: 'pre-line' }}
              >
                {about.sparkleNote}
              </p>
            </motion.div>

            {/* Games */}
            <motion.div {...fadeUp(0.4)} suppressHydrationWarning>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-3">
                {about.gamesLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {gameSeries.map((g) => (
                  <span
                    key={g.nameJa}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150"
                    style={{
                      background: g.accent
                        ? 'rgba(214,168,79,0.16)'
                        : 'rgba(31,27,22,0.04)',
                      border: g.accent
                        ? '1px solid rgba(214,168,79,0.45)'
                        : '1px solid rgba(31,27,22,0.10)',
                      color: g.accent
                        ? 'var(--color-crimson-light)'
                        : 'var(--color-text-secondary)',
                    }}
                  >
                    {isJa ? g.nameJa : g.nameEn}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
