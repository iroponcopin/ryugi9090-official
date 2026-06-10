'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Locale, Dictionary } from '@/i18n'
import SectionHeading from '@/components/ui/SectionHeading'

interface Props {
  locale: Locale
  dict: Dictionary
}

const EASE = [0.16, 1, 0.3, 1] as const

/** Abstract gold stroke icons — no game assets. */
function StyleIcon({ index }: { index: number }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'w-6 h-6',
    'aria-hidden': true,
  }
  if (index === 0) {
    // Speech bubbles — the Yukkuri banter format
    return (
      <svg {...common}>
        <path d="M4 5h9a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H8l-4 3V7a2 2 0 0 1 2-2z" />
        <path d="M19 11v6l-3-2h-3" />
      </svg>
    )
  }
  if (index === 1) {
    // Heart — passion for favourites
    return (
      <svg {...common}>
        <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
      </svg>
    )
  }
  // Winding path — own pace
  return (
    <svg {...common}>
      <path d="M3 16c4 0 4-9 8-9s4 9 8 9" />
      <circle cx="3" cy="16" r="1" />
      <circle cx="21" cy="16" r="1" />
    </svg>
  )
}

export default function CreatorStyle({ locale: _locale, dict }: Props) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [shouldReduce, setShouldReduce] = useState(false)
  useEffect(() => {
    setShouldReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  const { creatorStyle } = dict

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduce ? 0 : 0.1, delayChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: shouldReduce ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
  }

  return (
    <section
      id="style"
      ref={ref}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fff8ec 0%, #fffdf8 100%)' }}
    >
      <div className="section-gutter max-w-5xl mx-auto">
        <SectionHeading label={creatorStyle.sectionTitle} title={creatorStyle.heading} />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          suppressHydrationWarning
        >
          {creatorStyle.items.map((item, i) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={shouldReduce ? undefined : { y: -6, transition: { duration: 0.25, ease: EASE } }}
              className="glass-card rounded-2xl p-6"
              suppressHydrationWarning
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: 'rgba(214,168,79,0.14)',
                  border: '1px solid rgba(214,168,79,0.35)',
                  color: '#b9791e',
                }}
              >
                <StyleIcon index={i} />
              </div>
              <h3 className="text-base font-bold text-text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
