'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/home', label: 'ホーム' },
  { href: '/user', label: 'ユーザー' },
  { href: '/run/new', label: 'ラン' },
] as const

export function AppBottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-zinc-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
      aria-label="メインメニュー"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-2 pt-1">
        {tabs.map(({ href, label }) => {
          const active =
            href === '/home'
              ? pathname === '/home' || pathname === '/onboarding'
              : href === '/user'
                ? pathname === '/user' || pathname.startsWith('/user/')
                : href === '/run/new'
                  ? pathname.startsWith('/run')
                  : pathname === href || pathname.startsWith(`${href}/`)
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex flex-col items-center gap-0.5 py-2 text-xs font-medium transition ${
                  active ? 'text-cyan-400' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span
                  className={`h-1 w-8 rounded-full ${active ? 'bg-cyan-400' : 'bg-transparent'}`}
                  aria-hidden
                />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
