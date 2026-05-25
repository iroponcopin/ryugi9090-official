'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Locale, Dictionary } from '@/i18n'
import type { featuredVideos } from '@/data/config'
import MagneticButton from '@/components/ui/MagneticButton'
import StarField from '@/components/ui/StarField'
import { creator } from '@/data/config'

interface Props {
  locale: Locale
  dict: Dictionary
  featuredVideo: (typeof featuredVideos)[number]
}

const EASE_SPRING = [0.16, 1, 0.3, 1] as const

function AnimatedLine({
  children,
  delay,
  className,
  shouldReduce,
}: {
  children: React.ReactNode
  delay: number
  className?: string
  shouldReduce: boolean
}) {
  return (
    <motion.span
      className={`block ${className ?? ''}`}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: EASE_SPRING, delay }}
      suppressHydrationWarning
    >
      {children}
    </motion.span>
  )
}

export default function Hero({ locale, dict, featuredVideo }: Props) {
  const [shouldReduce, setShouldReduce] = useState(false)
  useEffect(() => {
    setShouldReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  const { hero } = dict
  const isJa = locale === 'ja'

  const videoTitle = isJa ? featuredVideo.titleJa : featuredVideo.titleEn
  const videoGame = isJa ? featuredVideo.game : featuredVideo.gameEn
  const videoType = isJa ? featuredVideo.type : featuredVideo.typeEn

  return (
    <section
      id="home"
      className="relative min-h-dvh flex items-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(249,115,22,0.08) 0%, transparent 55%), ' +
          'radial-gradient(ellipse 50% 40% at 85% 60%, rgba(196,125,15,0.06) 0%, transparent 50%), ' +
          'linear-gradient(180deg, #fffbf7 0%, #fff7ee 60%, #fef3e4 100%)',
      }}
    >
      <StarField />

      {/* Subtle radial glow behind content */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.06) 0%, transparent 70%)' }}
      />

      <div className="section-gutter relative z-10 w-full max-w-7xl mx-auto py-32 pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-12 xl:gap-16 items-center">

          {/* Left: Text content */}
          <div className="space-y-8">
            {/* Creator name */}
            <div>
              <motion.span
                className="section-label block mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                suppressHydrationWarning
              >
                {isJa ? 'ゆっくり実況者' : 'Yukkuri Commentator'}
              </motion.span>

              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight leading-none">
                <AnimatedLine delay={0.55} className="text-text-primary" shouldReduce={shouldReduce}>
                  竜義9090
                </AnimatedLine>
              </h1>
            </div>

            {/* Tagline */}
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl xl:text-3xl font-medium text-text-primary leading-snug">
                <AnimatedLine delay={0.72} shouldReduce={shouldReduce}>{hero.tagline}</AnimatedLine>
              </h2>
              <p className="text-base sm:text-lg text-gold font-medium">
                <AnimatedLine delay={0.84} shouldReduce={shouldReduce}>{hero.subtitle}</AnimatedLine>
              </p>
            </div>

            {/* Description */}
            <motion.p
              className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-xl"
              style={{ whiteSpace: 'pre-line' }}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_SPRING, delay: 1.0 }}
              suppressHydrationWarning
            >
              {hero.description}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_SPRING, delay: 1.15 }}
              suppressHydrationWarning
            >
              <MagneticButton href={creator.youtubeUrl} variant="primary" ariaLabel="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.2 5 12 5 12 5s-4.2 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.2.8 1.6.2 6.8.2 6.8.2s4.2 0 7-.1c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM9.7 14.5V9.1l5.6 2.7-5.6 2.7z" />
                </svg>
                {hero.ctaYoutube}
              </MagneticButton>

              <MagneticButton href={creator.xUrl} variant="secondary" ariaLabel="X (Twitter)">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
                {hero.ctaX}
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right: Featured video card */}
          <motion.div
            className="w-full"
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: 40, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.0, ease: EASE_SPRING, delay: 1.1 }}
            suppressHydrationWarning
          >
            <div className="relative">
              {/* Glow behind card */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.10) 0%, transparent 70%)' }}
              />

              <a
                href={`https://www.youtube.com/watch?v=${featuredVideo.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block glass-card rounded-2xl overflow-hidden"
              >
                {/* Label */}
                <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                  <span className="section-label">{hero.featuredLabel}</span>
                  <span className="text-xs text-text-muted">YouTube</span>
                </div>

                {/* Thumbnail */}
                <div className="relative overflow-hidden mx-4 mb-4 rounded-xl aspect-video">
                  <Image
                    src={`https://img.youtube.com/vi/${featuredVideo.id}/maxresdefault.jpg`}
                    alt={videoTitle}
                    fill
                    sizes="460px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 ml-0.5" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="px-4 pb-4">
                  <p className="text-xs font-semibold text-gold mb-1">{videoGame}</p>
                  <p className="text-sm text-text-primary font-medium leading-snug line-clamp-2">{videoTitle}</p>
                </div>
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
        aria-hidden="true"
        suppressHydrationWarning
      >
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/40" />
        <span className="text-xs text-text-muted tracking-widest uppercase" style={{ writingMode: 'horizontal-tb' }}>
          scroll
        </span>
      </motion.div>
    </section>
  )
}
