'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Locale, Dictionary } from '@/i18n'
import { upcomingContent } from '@/data/config'

interface Props {
  locale: Locale
  dict: Dictionary
}

const EASE = [0.16, 1, 0.3, 1] as const

/** Abstract "city-light" bokeh — no official game artwork. */
function CityGlow() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(circle at 22% 30%, rgba(242,154,63,0.55) 0%, transparent 22%), ' +
          'radial-gradient(circle at 70% 22%, rgba(214,168,79,0.45) 0%, transparent 18%), ' +
          'radial-gradient(circle at 50% 70%, rgba(255,210,160,0.55) 0%, transparent 26%), ' +
          'radial-gradient(circle at 85% 65%, rgba(242,154,63,0.40) 0%, transparent 20%), ' +
          'linear-gradient(135deg, #fff6e6 0%, #f3e1bf 100%)',
        filter: 'blur(2px)',
      }}
    />
  )
}

export default function UpcomingContent({ locale, dict }: Props) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [shouldReduce, setShouldReduce] = useState(false)
  useEffect(() => {
    setShouldReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  const { upcoming } = dict
  const isJa = locale === 'ja'

  return (
    <section
      id="upcoming"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fffdf8 0%, #fff8ec 100%)' }}
    >
      <div className="section-gutter max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-10"
          suppressHydrationWarning
        >
          <span className="section-label block mb-3">{upcoming.sectionTitle}</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">{upcoming.heading}</h2>
          <p className="text-text-secondary text-sm sm:text-base mt-3 max-w-2xl">{upcoming.intro}</p>
        </motion.div>

        <div className="space-y-5">
          {upcomingContent.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.1 }}
              whileHover={shouldReduce ? undefined : { y: -6, transition: { duration: 0.25, ease: EASE } }}
              className="relative"
              suppressHydrationWarning
            >
              {/* Soft glow behind the card */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(242,154,63,0.12) 0%, transparent 70%)' }}
              />

              <div
                className="relative glass-card rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[220px_1fr]"
                style={{ border: '1px solid rgba(214,168,79,0.45)' }}
              >
                {/* Abstract city-light visual */}
                <div className="relative h-36 md:h-auto min-h-[140px] overflow-hidden">
                  <CityGlow />
                </div>

                {/* Content */}
                <div className="p-6 md:p-7">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-[0.6875rem] font-semibold px-2.5 py-1 rounded-full leading-none uppercase tracking-wide"
                      style={{
                        background: 'rgba(242,154,63,0.16)',
                        color: '#b9791e',
                        border: '1px solid rgba(242,154,63,0.38)',
                      }}
                    >
                      {isJa ? item.statusJa : item.statusEn}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">
                    {isJa ? item.titleJa : item.titleEn}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {isJa ? item.descJa : item.descEn}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="font-semibold">{upcoming.formatLabel}:</span>
                    <span>{isJa ? item.formatJa : item.formatEn}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
