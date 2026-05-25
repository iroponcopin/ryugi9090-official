'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import type { Locale } from '@/i18n'

interface Props {
  youtubeId: string
  titleJa: string
  titleEn: string
  game: string
  gameEn: string
  type: string
  typeEn: string
  locale: Locale
  priority?: boolean
}

export default function VideoCard({
  youtubeId,
  titleJa,
  titleEn,
  game,
  gameEn,
  type,
  typeEn,
  locale,
  priority = false,
}: Props) {
  const shouldReduce = useReducedMotion()
  const title = locale === 'ja' ? titleJa : titleEn
  const gameLabel = locale === 'ja' ? game : gameEn
  const typeLabel = locale === 'ja' ? type : typeEn

  return (
    <motion.a
      href={`https://www.youtube.com/watch?v=${youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block glass-card rounded-2xl overflow-hidden"
      whileHover={shouldReduce ? undefined : { y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-video">
        <Image
          src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          priority={priority}
        />
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Type badge */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-crimson/90 text-white backdrop-blur-sm">
            {typeLabel}
          </span>
        </div>

        {/* Play icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs font-semibold text-gold mb-1.5 tracking-wide">{gameLabel}</p>
        <h3 className="text-sm font-medium text-text-primary leading-snug line-clamp-2">
          {title}
        </h3>
      </div>
    </motion.a>
  )
}
