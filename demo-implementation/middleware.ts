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
 * 第2引数で secretKey を渡すと、本番では CLERK_ENCRYPTION_KEY が必須になり、
 * 未設定だと Edge で暗号化処理が落ち MIDDLEWARE_INVOCATION_FAILED になる。
 * キーは Vercel の環境変数（CLERK_SECRET_KEY 等）だけに任せる。
 */
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
