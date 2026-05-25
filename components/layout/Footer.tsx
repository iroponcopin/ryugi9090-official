import Link from 'next/link'
import type { Locale, Dictionary } from '@/i18n'
import { creator } from '@/data/config'

interface Props {
  locale: Locale
  dict: Dictionary
}

export default function Footer({ locale, dict }: Props) {
  const { footer } = dict

  return (
    <footer
      className="relative"
      style={{
        background: '#fff7ee',
        borderTop: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <div className="section-gutter max-w-6xl mx-auto py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          {/* Left: name + disclaimer */}
          <div className="space-y-2 max-w-xl">
            <p className="text-xs font-semibold text-text-muted">{creator.name}</p>
            <p className="text-xs text-text-muted leading-relaxed">{footer.disclaimer}</p>
          </div>

          {/* Right: links */}
          <div className="flex flex-col items-start md:items-end gap-2 text-xs text-text-muted">
            <div className="flex items-center gap-4">
              <a
                href={creator.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-secondary transition-colors duration-150"
              >
                YouTube
              </a>
              <a
                href={creator.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-secondary transition-colors duration-150"
              >
                X / Twitter
              </a>
              <Link
                href={`/${locale}/legal`}
                className="hover:text-text-secondary transition-colors duration-150"
              >
                {footer.legalLink}
              </Link>
            </div>
            <p className="text-text-muted opacity-60">{footer.copyright}</p>
          </div>

        </div>
      </div>
    </footer>
  )
}
