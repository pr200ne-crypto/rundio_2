import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { RundioLogoOptionA } from '@/components/RundioLogoOptionA'

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
        <div className="flex items-center gap-4">
          <Link
            href="/home"
            className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
          >
            <RundioLogoOptionA variant="compact" />
          </Link>
          <nav className="flex gap-3 text-xs text-zinc-400">
            <Link href="/home" className="hover:text-zinc-200">
              ホーム
            </Link>
            <Link href="/posts" className="hover:text-zinc-200">
              投稿
            </Link>
            <Link href="/run/new" className="hover:text-zinc-200">
              ラン
            </Link>
          </nav>
        </div>
        <UserButton afterSignOutUrl="/" />
      </header>
      <div className="mx-auto max-w-lg px-4 py-6">{children}</div>
    </div>
  )
}
