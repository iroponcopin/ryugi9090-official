'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  /** Vertical movement in px, mapped over scroll progress. */
  y?: [number, number]
  /** Scale, mapped over scroll progress. */
  scale?: [number, number]
  /**
   * drift  — continuous parallax for the whole time the element crosses the viewport.
   * settle — finishes as the element reaches viewport centre (Apple product-page feel).
   */
  mode?: 'drift' | 'settle'
}

/**
 * Scroll-scrubbed motion wrapper: transforms are bound to scroll position
 * (scrub), unlike the one-time in-view reveals. transform/opacity only,
 * disabled under prefers-reduced-motion.
 */
export default function ScrollDrift({
  children,
  className,
  y = [0, 0],
  scale = [1, 1],
  mode = 'drift',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [shouldReduce, setShouldReduce] = useState(false)
  useEffect(() => {
    setShouldReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: mode === 'settle' ? ['start end', 'center center'] : ['start end', 'end start'],
  })
  const yValue = useTransform(scrollYProgress, [0, 1], y)
  const scaleValue = useTransform(scrollYProgress, [0, 1], scale)

  return (
    <motion.div
      ref={ref}
      className={className}
      style={shouldReduce ? undefined : { y: yValue, scale: scaleValue }}
    >
      {children}
    </motion.div>
  )
}
