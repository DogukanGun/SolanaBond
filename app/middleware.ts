import { NextRequest, NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import { getCookie } from 'cookies-next'
import Negotiator from 'negotiator'

let locales = ['en', 'tr', 'de']
export const defaultLocale = 'en'

const protectedRoutes = ['/arbswap/dashboard']
const authRoutes = [
  '/arbswap/login',
  '/arbswap/register',
  '/arbswap/register-wallet',
  '/arbswap/forgot-password'
]

const getLocale = (request: Request): string => {
  const headers = new Headers(request.headers)
  const acceptLanguage = headers.get('accept-language')

  if (acceptLanguage) {
    headers.set('accept-language', acceptLanguage.replaceAll('_', '-'))
  }

  const headersObject = Object.fromEntries(headers.entries())
  const languages = new Negotiator({ headers: headersObject }).languages()
  return match(languages, locales, defaultLocale)
}

export const middleware = (req: NextRequest) => {
  const cookie = getCookie('authToken')

  const pathname = req.nextUrl.pathname
  let locale = getLocale(req) ?? defaultLocale

  // Redirect logged-in users trying to access auth routes to the dashboard
  if (cookie && authRoutes.includes(pathname)) {
    const dashboardURL = new URL(`/arbswap/dashboard`, req.nextUrl.origin)
    return NextResponse.redirect(dashboardURL.toString())
  }

  // Redirect non-logged-in users trying to access protected routes to the home page
  if (cookie && protectedRoutes.includes(pathname)) {
    const absoluteURL = new URL('/arbswap', req.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }

  // Do not rewrite URLs for static assets
  if (pathname.startsWith('/_next/') || pathname.startsWith('/public/')) {
    return null
  }

  // Rewrite the URL to include the locale
  const newUrl = new URL(`/${locale}${pathname}`, req.nextUrl)
  return NextResponse.rewrite(newUrl)
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
