'use client'

import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  ariaLabel?: string
}

export default function MagneticButton({
  href,
  children,
  variant = 'primary',
  className = '',
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const shouldReduce = useReducedMotion()

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduce) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.22,
      y: (e.clientY - rect.top - rect.height / 2) * 0.22,
    })
  }

  const handleMouseLeave = () => setPos({ x: 0, y: 0 })

  const base =
    'relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-shadow duration-200 select-none'

  const styles =
    variant === 'primary'
      ? `${base} bg-crimson text-[#2a1f08] hover:bg-[#e6bd6b] glow-crimson`
      : `${base} glass-card text-text-primary hover:border-[rgba(168,117,24,0.45)]`

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 320, damping: 28, mass: 0.5 }}
      whileTap={{ scale: 0.97 }}
      className={`${styles} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </motion.a>
  )
}
