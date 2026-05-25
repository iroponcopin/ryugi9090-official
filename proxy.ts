import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files, _next internals, favicon
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next()
  }

  // Already on a locale route — respect it
  if (pathname.startsWith('/ja') || pathname.startsWith('/en')) {
    return NextResponse.next()
  }

  // 1. Check language preference cookie
  const langCookie = request.cookies.get('preferred-lang')?.value
  if (langCookie === 'ja' || langCookie === 'en') {
    return NextResponse.redirect(
      new URL(`/${langCookie}${pathname === '/' ? '' : pathname}`, request.url)
    )
  }

  // 2. Vercel edge geolocation header
  const country = request.headers.get('x-vercel-ip-country')
  if (country) {
    const locale = country === 'JP' ? 'ja' : 'en'
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  // 3. Accept-Language fallback
  const acceptLang = request.headers.get('accept-language') ?? ''
  const preferJa =
    acceptLang.startsWith('ja') ||
    acceptLang.includes('ja-') ||
    acceptLang.includes(',ja')
  const locale = preferJa ? 'ja' : 'en'

  return NextResponse.redirect(new URL(`/${locale}`, request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
