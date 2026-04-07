import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/demo(.*)',
  '/lp-1(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/health',
])

/**
 * オプションは「リクエストごと」に返す（ビルド時に CLERK_SECRET_KEY が空で束縛されるのを防ぐ）。
 * authorizedParties に実際のオリジンを入れ、本番 URL とセッションの azp のズレによる Handshake 失敗を抑える。
 */
export default clerkMiddleware(
  async (auth, request: NextRequest) => {
    if (!isPublicRoute(request)) {
      await auth.protect()
    }
    return NextResponse.next({ request })
  },
  (request) => {
    const origin = new URL(request.url).origin
    return {
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
      signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
      signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
      authorizedParties: [origin],
    }
  }
)

export const config = {
  matcher: [
    '/((?!_next/|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
