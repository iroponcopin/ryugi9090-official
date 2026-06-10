'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import type { Locale, Dictionary } from '@/i18n'
import { upcomingContent } from '@/data/config'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollDrift from '@/components/ui/ScrollDrift'

interface Props {
  locale: Locale
  dict: Dictionary
}

const EASE = [0.16, 1, 0.3, 1] as const
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

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
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fffdf8 0%, #fff8ec 100%)' }}
    >
      <div className="section-gutter max-w-5xl mx-auto">
        <SectionHeading
          label={upcoming.sectionTitle}
          title={upcoming.heading}
          intro={upcoming.intro}
          className="mb-10"
        />

        <div className="space-y-5">
          {upcomingContent.map((item, i) => (
            <ScrollDrift key={item.key} y={[24 + i * 18, -14 - i * 10]}>
            <motion.div
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
                {/* City-light backdrop with the game icon settling into place */}
                <div className="relative h-40 md:h-auto min-h-[150px] overflow-hidden">
                  <CityGlow />
                  {item.icon && (
                    <ScrollDrift
                      mode="settle"
                      scale={[1.18, 1]}
                      y={[14, 0]}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div
                        className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden"
                        style={{
                          border: '1px solid rgba(255,255,255,0.65)',
                          boxShadow: '0 14px 36px rgba(31,31,31,0.22), 0 0 0 1px rgba(214,168,79,0.35)',
                        }}
                      >
                        <Image
                          src={`${BASE}${item.icon}`}
                          alt={isJa ? item.titleJa : item.titleEn}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      </div>
                    </ScrollDrift>
                  )}
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
            </ScrollDrift>
          ))}
        </div>
      </div>
    </section>
  )
}
