'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
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
        background: 'linear-gradient(180deg, #fffdf8 0%, #faf3e7 50%, #fffdf8 100%)',
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
                    borderColor: 'rgba(214,168,79,0.45)',
                    background: 'rgba(214,168,79,0.10)',
                  }),
                }}
              >
                {/* Game icon */}
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${item.icon}`}
                    alt={isJa ? item.nameJa : item.nameEn}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
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
