'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { Locale, Dictionary } from '@/i18n'
import { series, upcomingContent, creator } from '@/data/config'

const EASE = [0.16, 1, 0.3, 1] as const
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export interface VideoMenuItem {
  key: string
  name: string
  desc: string
  tag?: string
  icon: string | null
  href: string
  external?: boolean
  accent?: boolean
}

/** Compose the Video menu: game series + NTE (future) + Other Games. */
export function buildVideoMenuItems(locale: Locale, dict: Dictionary): VideoMenuItem[] {
  const isJa = locale === 'ja'

  const games: VideoMenuItem[] = series.map((s) => ({
    key: s.nameEn,
    name: isJa ? s.nameJa : s.nameEn,
    desc: isJa ? s.descJa : s.descEn,
    tag: isJa ? s.tagJa : s.tagEn,
    icon: s.icon,
    href: '#videos',
    accent: s.accent,
  }))

  const nte = upcomingContent[0]
  const future: VideoMenuItem = {
    key: nte.key,
    name: isJa ? nte.titleJa : nte.titleEn,
    desc: isJa ? nte.shortJa : nte.shortEn,
    tag: isJa ? nte.statusJa : nte.statusEn,
    icon: null,
    href: '#upcoming',
  }

  const other: VideoMenuItem = {
    key: 'other',
    name: dict.videoMenu.otherTitle,
    desc: dict.videoMenu.otherDesc,
    icon: null,
    href: creator.youtubeUrl,
    external: true,
  }

  return [...games, future, other]
}

/** Abstract gold / city-light visual used when an item has no game icon. */
function AbstractTile() {
  return (
    <div
      aria-hidden="true"
      className="w-full h-full rounded-lg"
      style={{
        background:
          'radial-gradient(circle at 30% 25%, rgba(242,154,63,0.55) 0%, transparent 45%), ' +
          'radial-gradient(circle at 75% 70%, rgba(214,168,79,0.55) 0%, transparent 45%), ' +
          'linear-gradient(135deg, #fff6e6 0%, #f4e3c2 100%)',
      }}
    />
  )
}

function MenuCard({ item, onSelect }: { item: VideoMenuItem; onSelect: () => void }) {
  return (
    <a
      href={item.href}
      onClick={onSelect}
      role="menuitem"
      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group/card flex items-start gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-[rgba(214,168,79,0.10)] focus-visible:bg-[rgba(214,168,79,0.12)]"
    >
      <div
        className="relative w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 transition-transform duration-200 group-hover/card:scale-[1.04]"
        style={{ border: '1px solid rgba(214,168,79,0.30)' }}
      >
        {item.icon ? (
          <Image src={`${BASE}${item.icon}`} alt={item.name} fill sizes="44px" className="object-cover" />
        ) : (
          <AbstractTile />
        )}
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p
            className="text-sm font-semibold leading-tight truncate"
            style={{ color: item.accent ? 'var(--color-crimson-light)' : 'var(--color-text-primary)' }}
          >
            {item.name}
          </p>
          {item.tag && (
            <span
              className="flex-shrink-0 text-[0.625rem] font-semibold px-1.5 py-0.5 rounded-full leading-none"
              style={{
                background: 'rgba(242,154,63,0.14)',
                color: '#b9791e',
                border: '1px solid rgba(242,154,63,0.30)',
              }}
            >
              {item.tag}
            </span>
          )}
        </div>
        <p className="text-xs text-text-muted leading-snug mt-1 line-clamp-2">{item.desc}</p>
      </div>
    </a>
  )
}

interface Props {
  locale: Locale
  dict: Dictionary
  shouldReduce: boolean
}

export default function VideoMenu({ locale, dict, shouldReduce }: Props) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const items = buildVideoMenuItems(locale, dict)

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  const scheduleClose = useCallback(() => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 140)
  }, [cancelClose])

  // Close on Escape (return focus to trigger) and on outside click.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  useEffect(() => () => cancelClose(), [cancelClose])

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose()
        setOpen(true)
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="video-mega-menu"
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        className="flex items-center gap-1 text-sm transition-colors duration-150"
        style={{ color: open ? 'var(--color-crimson-light)' : 'var(--color-text-muted)' }}
      >
        {dict.nav.videos}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-3.5 h-3.5 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : undefined }}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="video-mega-menu"
            role="menu"
            aria-label={dict.nav.videos}
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="absolute left-0 top-full pt-3 z-50"
            suppressHydrationWarning
          >
            <div
              className="glass-card rounded-2xl p-4 w-[min(42rem,calc(100vw-2rem))]"
              style={{ boxShadow: '0 18px 50px rgba(168,117,24,0.18), 0 4px 12px rgba(31,31,31,0.06)' }}
            >
              <p className="section-label block mb-3 px-1">{dict.videoMenu.heading}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {items.map((item) => (
                  <MenuCard key={item.key} item={item} onSelect={() => setOpen(false)} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
