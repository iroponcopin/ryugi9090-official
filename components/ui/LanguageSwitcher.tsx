'use client'

import { useRouter } from 'next/navigation'
import type { Locale } from '@/i18n'

interface Props {
  locale: Locale
}

export default function LanguageSwitcher({ locale }: Props) {
  const router = useRouter()

  const switchTo = (next: Locale) => {
    document.cookie = `preferred-lang=${next};path=/;max-age=31536000;samesite=lax`
    router.push(`/${next}`)
  }

  return (
    <div className="flex items-center gap-1 text-sm" aria-label="Language selector">
      <button
        onClick={() => switchTo('ja')}
        className={`px-2 py-1 rounded transition-colors duration-150 ${
          locale === 'ja'
            ? 'text-text-primary font-semibold'
            : 'text-text-muted hover:text-text-secondary'
        }`}
        aria-current={locale === 'ja' ? 'true' : undefined}
      >
        JA
      </button>
      <span className="text-border-subtle select-none">|</span>
      <button
        onClick={() => switchTo('en')}
        className={`px-2 py-1 rounded transition-colors duration-150 ${
          locale === 'en'
            ? 'text-text-primary font-semibold'
            : 'text-text-muted hover:text-text-secondary'
        }`}
        aria-current={locale === 'en' ? 'true' : undefined}
      >
        EN
      </button>
    </div>
  )
}
