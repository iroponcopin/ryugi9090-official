'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

interface Props {
  label: string
  title: string
  intro?: string
  trailing?: React.ReactNode
  align?: 'left' | 'center'
  titleClassName?: string
  className?: string
}

/**
 * Shared section header: label fade, masked title reveal,
 * and a gold line that draws in left-to-right on scroll.
 */
export default function SectionHeading({
  label,
  title,
  intro,
  trailing,
  align = 'left',
  titleClassName = 'text-2xl sm:text-3xl font-bold text-text-primary',
  className = 'mb-12',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [shouldReduce, setShouldReduce] = useState(false)
  useEffect(() => {
    setShouldReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const centered = align === 'center'

  return (
    <div ref={ref} className={`${className} ${centered ? 'text-center' : ''}`}>
      <motion.span
        className="section-label block mb-3"
        initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE }}
        suppressHydrationWarning
      >
        {label}
      </motion.span>

      <div className={`flex items-end gap-4 ${centered ? 'justify-center' : 'justify-between'}`}>
        <div className="line-mask">
          <motion.h2
            className={titleClassName}
            initial={{ y: '112%' }}
            animate={isInView ? { y: '0%' } : {}}
            transition={{
              duration: shouldReduce ? 0.01 : 0.7,
              ease: EASE,
              delay: shouldReduce ? 0 : 0.08,
            }}
            suppressHydrationWarning
          >
            {title}
          </motion.h2>
        </div>

        {trailing && (
          <motion.div
            className="flex-shrink-0 pb-1"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            suppressHydrationWarning
          >
            {trailing}
          </motion.div>
        )}
      </div>

      {intro && (
        <motion.p
          className={`text-text-secondary text-sm sm:text-base mt-3 ${centered ? 'max-w-md mx-auto' : 'max-w-2xl'}`}
          initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE, delay: 0.18 }}
          suppressHydrationWarning
        >
          {intro}
        </motion.p>
      )}

      {/* Gold line draw */}
      <motion.div
        aria-hidden="true"
        className={`h-px mt-6 ${centered ? 'w-24 mx-auto origin-center' : 'origin-left'}`}
        style={{
          background: centered
            ? 'linear-gradient(90deg, transparent, rgba(214,168,79,0.70), transparent)'
            : 'linear-gradient(90deg, rgba(214,168,79,0.55) 0%, rgba(242,154,63,0.22) 45%, transparent 80%)',
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.55, ease: EASE, delay: 0.3 }}
        suppressHydrationWarning
      />
    </div>
  )
}
