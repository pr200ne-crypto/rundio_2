import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { tryGetSupabasePublicConfig } from '@/lib/supabase/env'

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

  const supabaseConfig = tryGetSupabasePublicConfig()
  if (!supabaseConfig) {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  try {
    const supabase = createServerClient(supabaseConfig.url, supabaseConfig.key, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: object }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    })

    await supabase.auth.getUser()
  } catch {
    return NextResponse.next({ request })
  }

  return supabaseResponse
})

export const config = {
  matcher: [
    // _next（画像最適化 /static 含む）は除外 — ミドルウェアが走ると画像が壊れることがある
    '/((?!_next/|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
