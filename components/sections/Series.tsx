'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Locale, Dictionary } from '@/i18n'
import type { series } from '@/data/config'

interface Props {
  locale: Locale
  dict: Dictionary
  seriesList: typeof series
}

const EASE = [0.16, 1, 0.3, 1] as const

export default function Series({ locale, dict, seriesList }: Props) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [shouldReduce, setShouldReduce] = useState(false)
  useEffect(() => {
    setShouldReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  const { series: s } = dict
  const isJa = locale === 'ja'

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduce ? 0 : 0.07, delayChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 14 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  }

  return (
    <section
      id="series"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #06020f 0%, #0e0030 50%, #06020f 100%)',
      }}
    >
      <div className="section-gutter max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12"
          suppressHydrationWarning
        >
          <span className="section-label block mb-3">{s.sectionTitle}</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">{s.description}</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          suppressHydrationWarning
        >
          {seriesList.map((item) => (
            <motion.div
              key={item.nameJa}
              variants={itemVariants}
              className="group"
              suppressHydrationWarning
            >
              <div
                className="glass-card rounded-xl p-4 text-center transition-all duration-300 cursor-default"
                style={{
                  ...(item.accent && {
                    borderColor: 'rgba(247,37,133,0.30)',
                    background: 'rgba(247,37,133,0.08)',
                  }),
                }}
              >
                {/* Decorative icon — small geometric shape */}
                <div
                  className="w-8 h-8 rounded-lg mx-auto mb-3 flex items-center justify-center"
                  style={{
                    background: item.accent
                      ? 'rgba(247,37,133,0.18)'
                      : 'rgba(255,255,255,0.06)',
                    border: item.accent
                      ? '1px solid rgba(247,37,133,0.35)'
                      : '1px solid rgba(255,255,255,0.10)',
                  }}
                >
                  {item.accent ? (
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                      <path d="M8 2L9.5 6.5H14L10.5 9L11.8 13.5L8 11L4.2 13.5L5.5 9L2 6.5H6.5L8 2Z" fill="rgba(247,37,133,0.90)" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                      <rect x="3" y="3" width="10" height="10" rx="2" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
                    </svg>
                  )}
                </div>

                <p
                  className="text-xs font-medium leading-snug"
                  style={{
                    color: item.accent ? 'var(--color-crimson-light)' : 'var(--color-text-secondary)',
                  }}
                >
                  {isJa ? item.nameJa : item.nameEn}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
