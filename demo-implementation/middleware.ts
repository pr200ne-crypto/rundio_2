import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Clerk のみ。Supabase のセッション更新は Edge で request.cookies を触る実装と相性が悪く、
 * Vercel で MIDDLEWARE_INVOCATION_FAILED になることがあるためミドルウェアから外す。
 * 本アプリの保護ルートは Clerk。DB はサーバー側で service role / server client を利用。
 */
const isPublicRoute = createRouteMatcher([
  '/',
  '/demo(.*)',
  '/lp-1(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/health',
])

export default clerkMiddleware(async (auth, request: NextRequest) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
  return NextResponse.next({ request })
})

export const config = {
  matcher: [
    '/((?!_next/|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
