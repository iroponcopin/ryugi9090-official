import type { Locale } from '@/i18n'
import { getDictionary, isValidLocale } from '@/i18n'
import { featuredVideos, series } from '@/data/config'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import FeaturedVideos from '@/components/sections/FeaturedVideos'
import Series from '@/components/sections/Series'
import UpcomingContent from '@/components/sections/UpcomingContent'
import SocialCTA from '@/components/sections/SocialCTA'

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const safeLocale: Locale = isValidLocale(locale) ? locale : 'ja'
  const dict = getDictionary(safeLocale)

  return (
    <>
      <Hero locale={safeLocale} dict={dict} featuredVideo={featuredVideos[0]} />
      <About locale={safeLocale} dict={dict} />
      <FeaturedVideos locale={safeLocale} dict={dict} videos={featuredVideos} />
      <Series locale={safeLocale} dict={dict} seriesList={series} />
      <UpcomingContent locale={safeLocale} dict={dict} />
      <SocialCTA locale={safeLocale} dict={dict} />
    </>
  )
}
