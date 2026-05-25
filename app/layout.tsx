import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '竜義9090',
  description: 'ゆっくり実況者 竜義9090 の公式サイト',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Determine lang from cookie for the html[lang] attribute (Japan-first default)
  const cookieStore = await cookies()
  const lang = cookieStore.get('preferred-lang')?.value === 'en' ? 'en' : 'ja'

  return (
    <html lang={lang} className={inter.variable} suppressHydrationWarning>
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  )
}
