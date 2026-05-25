import type { Metadata } from 'next'
import Link from 'next/link'
import type { Locale } from '@/i18n'
import { getDictionary, isValidLocale } from '@/i18n'

export async function generateStaticParams() {
  return [{ locale: 'ja' }, { locale: 'en' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(isValidLocale(locale) ? locale : 'ja')
  return { title: dict.legal.title }
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const safeLocale: Locale = isValidLocale(locale) ? locale : 'ja'
  const dict = getDictionary(safeLocale)
  const { legal } = dict

  return (
    <div className="section-gutter py-24 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-12 text-text-primary">{legal.title}</h1>
      <div className="space-y-10">
        {legal.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold mb-3 text-text-primary">{section.heading}</h2>
            <p className="text-text-secondary leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>
      <div className="mt-16 pt-8 border-t border-border-subtle">
        <Link
          href={`/${safeLocale}`}
          className="text-crimson-light hover:text-crimson transition-colors duration-150"
        >
          {legal.backHome}
        </Link>
      </div>
    </div>
  )
}
