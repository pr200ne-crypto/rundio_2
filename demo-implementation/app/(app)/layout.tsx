import Link from 'next/link'
import { AppBottomNav } from '@/components/AppBottomNav'
import { RundioLogoOptionA } from '@/components/RundioLogoOptionA'

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <header className="flex shrink-0 items-center border-b border-zinc-800 px-4 py-3">
        <Link
          href="/home"
          className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
        >
          <RundioLogoOptionA variant="compact" />
        </Link>
      </header>
      <div className="mx-auto w-full max-w-lg flex-1 px-4 py-6 pb-24">{children}</div>
      <AppBottomNav />
    </div>
  )
}
