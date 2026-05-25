'use client'

import { useState, useEffect } from 'react'

// Deterministic star positions using golden-angle + silver-ratio distribution
const STARS = Array.from({ length: 38 }, (_, i) => ({
  id: i,
  x: (i * 137.508 + 1.5) % 100,
  y: (i * 61.803 + 1.5) % 100,
  size: 1 + (i % 4) * 0.4,
  opacity: 0.12 + (i % 6) * 0.07,
  animVariant: i % 2 === 0 ? 'a' : 'b',
  delay: `${-(i * 0.62).toFixed(2)}s`,
  duration: `${14 + (i % 7) * 2.5}s`,
}))

const GLINTS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: (i * 157.3 + 23) % 100,
  y: (i * 97.7 + 15) % 100,
  color: i % 2 === 0 ? 'var(--color-crimson)' : 'var(--color-gold)',
  delay: `${-(i * 1.1).toFixed(2)}s`,
}))

export default function StarField() {
  const [mounted, setMounted] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    setMounted(true)
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  // Client-only: purely decorative, safe to skip SSR entirely
  if (!mounted) return null

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {STARS.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: 'rgba(249, 115, 22, 0.55)',
            opacity: star.opacity,
            animation: reduceMotion
              ? undefined
              : `star-drift-${star.animVariant} ${star.duration} ease-in-out ${star.delay} infinite`,
          }}
        />
      ))}

      {GLINTS.map((glint) => (
        <div
          key={glint.id}
          className="absolute rounded-full"
          style={{
            left: `${glint.x}%`,
            top: `${glint.y}%`,
            width: '2px',
            height: '2px',
            background: glint.color,
            opacity: 0,
            animation: reduceMotion
              ? undefined
              : `glow-pulse 5s ease-in-out ${glint.delay} infinite`,
          }}
        />
      ))}
    </div>
  )
}
