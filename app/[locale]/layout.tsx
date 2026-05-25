import type { Metadata } from 'next'
import type { Locale } from '@/i18n'
import { getDictionary, isValidLocale } from '@/i18n'
import { creator } from '@/data/config'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export async function generateStaticParams() {
  return [{ locale: 'ja' }, { locale: 'en' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isJa = locale === 'ja'

  return {
    title: {
      default: `${creator.name} | ${isJa ? 'ゆっくり実況' : 'Yukkuri Commentary'}`,
      template: `%s | ${creator.name}`,
    },
    description: isJa
      ? '崩壊：スターレイル、テイルズシリーズ、League of Legends ほか多数のゲームをゆっくり実況中。'
      : 'Yukkuri gameplay commentary on Honkai: Star Rail, Tales series, League of Legends, and more.',
    alternates: {
      canonical: `/${locale}`,
      languages: { ja: '/ja', en: '/en' },
    },
    openGraph: {
      siteName: creator.name,
      locale: isJa ? 'ja_JP' : 'en_US',
      alternateLocale: isJa ? 'en_US' : 'ja_JP',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const safeLocale: Locale = isValidLocale(locale) ? locale : 'ja'
  const dict = getDictionary(safeLocale)

  return (
    <>
      <Header locale={safeLocale} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer locale={safeLocale} dict={dict} />
    </>
  )
}
