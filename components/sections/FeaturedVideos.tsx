'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Locale, Dictionary } from '@/i18n'
import type { featuredVideos } from '@/data/config'
import VideoCard from '@/components/ui/VideoCard'
import { creator } from '@/data/config'

interface Props {
  locale: Locale
  dict: Dictionary
  videos: typeof featuredVideos
}

const EASE = [0.16, 1, 0.3, 1] as const

export default function FeaturedVideos({ locale, dict, videos }: Props) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [shouldReduce, setShouldReduce] = useState(false)
  useEffect(() => {
    setShouldReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  const { videos: v } = dict

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduce ? 0 : 0.12, delayChildren: 0.1 },
    },
  }

  const cardVariants = {
    hidden: shouldReduce ? { opacity: 0 } : { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  }

  return (
    <section
      id="videos"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ background: 'linear-gradient(180deg, #0a0120 0%, #06020f 100%)' }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[500px] h-[300px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse, rgba(76,201,240,0.08) 0%, transparent 70%)',
          transform: 'translate(-20%, 20%)',
        }}
      />

      <div className="section-gutter max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12"
          suppressHydrationWarning
        >
          <span className="section-label block mb-3">{v.sectionTitle}</span>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              {locale === 'ja' ? '注目動画' : 'Featured Videos'}
            </h2>
            <a
              href={creator.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-crimson-light hover:text-crimson transition-colors duration-150 whitespace-nowrap"
            >
              {v.youtubeLabel} →
            </a>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          suppressHydrationWarning
        >
          {videos.map((video, i) => (
            <motion.div key={video.id} variants={cardVariants} suppressHydrationWarning>
              <VideoCard
                youtubeId={video.id}
                titleJa={video.titleJa}
                titleEn={video.titleEn}
                game={video.game}
                gameEn={video.gameEn}
                type={video.type}
                typeEn={video.typeEn}
                locale={locale}
                priority={i === 0}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
